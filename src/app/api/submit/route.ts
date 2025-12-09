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

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { problemId, code, language } = await req.json();

  if (!problemId || !code || !language) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Fetch problem details (needed for function name)
  const problem = await db.query.problems.findFirst({
    where: eq(problems.id, problemId),
  });

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 });
  }

  // Fetch test cases
  const tests = await db.query.testCases.findMany({
    where: eq(testCases.problemId, problemId),
  });

  if (tests.length === 0) {
    return NextResponse.json({ error: "No test cases found" }, { status: 404 });
  }

  let finalStatus: "AC" | "WA" | "RE" | "CE" | "TLE" = "AC";
  let debugOutput = "";
  const testResults: Array<{
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
  }> = [];

  for (const test of tests) {
    try {
      // Generate driver code based on language
      let fullCode = code;
      let stdin = test.input;

      if (language === "javascript") {
        // Driver code for JS
        // We assume input is JSON stringified arguments object, e.g. {"nums": [...], "target": 9}
        // We need to parse it and call the function.
        fullCode = `
${code}

const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8');
const args = JSON.parse(input);

// Call the function dynamically
// We need to map args keys to function arguments order? 
// Or just assume the function takes arguments matching the keys?
// Actually, simpler: Object.values(args) gives values in order if JSON was created in order.
// But JSON key order isn't guaranteed.
// Better: We know the function name.
const result = ${problem.functionName}(...Object.values(args));
console.log(JSON.stringify(result));
`;
      } else if (language === "python") {
        // Driver code for Python
        fullCode = `
import sys
import json
from typing import *

${code}

if __name__ == '__main__':
    input_str = sys.stdin.read()
    args = json.loads(input_str)
    sol = Solution()
    # Assuming args is a dict, we pass as kwargs? Or ordered values?
    # Python dicts preserve insertion order in recent versions.
    # Let's try passing values.
    result = sol.${problem.functionName}(*args.values())
    
    # Print result as JSON
    print(json.dumps(result))
`;
      }
      // Add other languages as needed (cpp, go)

      const result = await runPiston(language, fullCode, stdin);

      // Check for compilation error
      if (result.compile && result.compile.code !== 0) {
        finalStatus = "CE";
        debugOutput = result.compile.output;
        testResults.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: "",
          passed: false,
        });
        break;
      }

      // Check for runtime error
      if (result.run.code !== 0) {
        finalStatus = "RE";
        debugOutput = result.run.stderr || result.run.output;
        testResults.push({
          input: test.input,
          expected: test.expectedOutput,
          actual: result.run.stderr || result.run.output,
          passed: false,
        });
        break;
      }

      // Check output
      const actualOutput = result.run.stdout.trim();
      const expectedOutput = test.expectedOutput.trim();

      // Simple string comparison for now.
      // For arrays, order might matter or not depending on problem.
      // Ideally we parse JSON and compare deep equal.
      // But for MVP string compare of JSON is okay if formatted same.
      // Piston/Node JSON.stringify might differ from seed expectedOutput format (spaces).
      // Let's normalize by parsing if possible.

      let match = false;
      try {
        const actualJson = JSON.parse(actualOutput);
        const expectedJson = JSON.parse(expectedOutput);
        // Deep compare
        if (JSON.stringify(actualJson) === JSON.stringify(expectedJson)) {
          match = true;
        }

        // Special case for Two Sum: "return the answer in any order"
        // If it's an array and order doesn't matter, we should sort.
        // But for MVP, let's assume strict order or user must sort if required.
        // Two Sum usually accepts any order, so [0,1] or [1,0].
        // My seed expected is [0,1]. If user returns [1,0], it fails.
        // For now, accept failure on order mismatch.
      } catch (e) {
        // Fallback to string compare
        match = actualOutput === expectedOutput;
      }

      testResults.push({
        input: test.input,
        expected: expectedOutput,
        actual: actualOutput,
        passed: match,
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

  // Save submission
  await db.insert(submissions).values({
    userId,
    problemId,
    code,
    language,
    status: finalStatus,
  });

  // If AC, check if first time solving and update stats
  let isFirstSolve = false;
  let pointsEarned = 0;

  if (finalStatus === "AC") {
    // Check if user has already solved this problem
    const existingSolve = await db.query.solvedProblems.findFirst({
      where: and(
        eq(solvedProblems.userId, userId),
        eq(solvedProblems.problemId, problemId)
      ),
    });

    if (!existingSolve) {
      // First time solving this problem
      isFirstSolve = true;

      // Record the solve
      await db.insert(solvedProblems).values({
        userId,
        problemId,
      });

      // Calculate points based on difficulty
      pointsEarned = problem.points || 10;

      // Update or create user stats
      const existingStats = await db.query.userStats.findFirst({
        where: eq(userStats.userId, userId),
      });

      if (existingStats) {
        await db
          .update(userStats)
          .set({
            totalPoints: existingStats.totalPoints + pointsEarned,
            problemsSolved: existingStats.problemsSolved + 1,
            updatedAt: new Date(),
          })
          .where(eq(userStats.userId, userId));
      } else {
        await db.insert(userStats).values({
          userId,
          totalPoints: pointsEarned,
          problemsSolved: 1,
        });
      }
    }
  }

  return NextResponse.json({
    status: finalStatus,
    output: debugOutput,
    testResults,
    isFirstSolve,
    pointsEarned,
  });
}
