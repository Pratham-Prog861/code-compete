import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import {
  testCases,
  problems,
  submissions,
  solvedProblems,
  userStats,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { runPiston } from "@/lib/piston";
import { submitRequestSchema, type TestResult } from "@/types";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

async function checkRateLimit(userId: string) {
  try {
    await rateLimiter.consume(userId);
    return true;
  } catch {
    return false;
  }
}

function deepEqual(a: unknown, b: unknown, tolerance = 1e-6): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return a === b;

  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) < tolerance;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    const aSorted = [...a].sort();
    const bSorted = [...b].sort();
    return aSorted.every((val, i) => deepEqual(val, bSorted[i], tolerance));
  }

  if (typeof a === "object" && typeof b === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEqual(aObj[key], bObj[key], tolerance));
  }

  return false;
}

function compareOutput(
  actual: string,
  expected: string,
  rule: "strict" | "unordered" | "numeric"
): boolean {
  const actualTrim = actual.trim();
  const expectedTrim = expected.trim();

  if (actualTrim === expectedTrim) return true;

  try {
    const actualJson = JSON.parse(actualTrim);
    const expectedJson = JSON.parse(expectedTrim);

    if (rule === "unordered") {
      return deepEqual(actualJson, expectedJson);
    }

    if (rule === "numeric") {
      return deepEqual(actualJson, expectedJson, 1e-3);
    }

    return JSON.stringify(actualJson) === JSON.stringify(expectedJson);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!(await checkRateLimit(userId))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parseResult = submitRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parseResult.error.issues },
      { status: 400 }
    );
  }

  const { problemId, code, language } = parseResult.data;

  const problem = await db.query.problems.findFirst({
    where: eq(problems.id, problemId),
  });

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  const tests = await db.query.testCases.findMany({
    where: eq(testCases.problemId, problemId),
  });

  if (tests.length === 0) {
    return NextResponse.json({ error: "No test cases found" }, { status: 404 });
  }

  const functionParams = (problem.functionParams || []) as string[];
  const comparisonRule = (problem.comparisonRule || "strict") as "strict" | "unordered" | "numeric";

  let finalStatus: "AC" | "WA" | "RE" | "CE" | "TLE" = "AC";
  let debugOutput = "";
  const testResults: TestResult[] = [];

  for (const test of tests) {
    try {
      let fullCode = code;
      const stdin = test.input;

      if (language === "javascript") {
        const paramList = functionParams.length > 0 
          ? functionParams.join(", ") 
          : "...args";
        
        fullCode = `
${code}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8');
const args = JSON.parse(input);
const params = ${JSON.stringify(functionParams)};
const result = ${problem.functionName}(${paramList});
console.log(JSON.stringify(result));
`;
      } else if (language === "python") {
        const paramList = functionParams.length > 0
          ? functionParams.join(", ")
          : "*args";
        
        fullCode = `
import sys
import json
from typing import *

${code}

if __name__ == '__main__':
    input_str = sys.stdin.read()
    args = json.loads(input_str)
    sol = Solution()
    param_keys = ${JSON.stringify(functionParams)};
    if (param_keys && all(k in args for k in param_keys)):
        result = sol.${problem.functionName}(*[args[k] for k in param_keys])
    else:
        result = sol.${problem.functionName}(*args.values())
    print(json.dumps(result))
`;
      }

      const result = await runPiston(language, fullCode, stdin);

      if (result.compile && result.compile.code !== 0) {
        finalStatus = "CE";
        debugOutput = result.compile.output;
        testResults.push({
          input: test.isHidden ? "" : test.input,
          expected: test.isHidden ? "" : test.expectedOutput,
          actual: "",
          passed: false,
          isHidden: test.isHidden,
        });
        break;
      }

      if (result.run.code !== 0) {
        finalStatus = "RE";
        debugOutput = result.run.stderr || result.run.output;
        testResults.push({
          input: test.isHidden ? "" : test.input,
          expected: test.isHidden ? "" : test.expectedOutput,
          actual: result.run.stderr || result.run.output,
          passed: false,
          isHidden: test.isHidden,
        });
        break;
      }

      const actualOutput = result.run.stdout.trim();
      const expectedOutput = test.expectedOutput.trim();
      const match = compareOutput(actualOutput, expectedOutput, comparisonRule);

      testResults.push({
        input: test.isHidden ? "" : test.input,
        expected: test.isHidden ? "" : expectedOutput,
        actual: test.isHidden ? "" : actualOutput,
        passed: match,
        isHidden: test.isHidden,
      });

      if (!match) {
        finalStatus = "WA";
        break;
      }
    } catch (error) {
      console.error("Execution error:", error);
      finalStatus = "RE";
      break;
    }
  }

  let isFirstSolve = false;
  let pointsEarned = 0;

  try {
    await db.transaction(async (tx) => {
      await tx.insert(submissions).values({
        userId,
        problemId,
        code,
        language,
        status: finalStatus,
      });

      if (finalStatus === "AC") {
        const existingSolve = await tx.query.solvedProblems.findFirst({
          where: and(
            eq(solvedProblems.userId, userId),
            eq(solvedProblems.problemId, problemId)
          ),
        });

        if (!existingSolve) {
          isFirstSolve = true;
          await tx.insert(solvedProblems).values({
            userId,
            problemId,
          });

          pointsEarned = problem.points || 10;

          const existingStats = await tx.query.userStats.findFirst({
            where: eq(userStats.userId, userId),
          });

          if (existingStats) {
            await tx
              .update(userStats)
              .set({
                totalPoints: existingStats.totalPoints + pointsEarned,
                problemsSolved: existingStats.problemsSolved + 1,
                updatedAt: new Date(),
              })
              .where(eq(userStats.userId, userId));
          } else {
            await tx.insert(userStats).values({
              userId,
              totalPoints: pointsEarned,
              problemsSolved: 1,
            });
          }
        }
      }
    });
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: finalStatus,
    output: debugOutput,
    testResults,
    isFirstSolve,
    pointsEarned,
  });
}
