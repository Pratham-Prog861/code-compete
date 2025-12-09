import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { testCases, submissions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { runPiston } from '@/lib/piston';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { problemId, code, language } = await req.json();

  if (!problemId || !code || !language) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Fetch test cases
  const tests = await db.query.testCases.findMany({
    where: eq(testCases.problemId, problemId),
  });

  if (tests.length === 0) {
    return NextResponse.json({ error: 'No test cases found' }, { status: 404 });
  }

  let finalStatus: 'AC' | 'WA' | 'RE' | 'CE' | 'TLE' = 'AC';
  let debugOutput = '';

  for (const test of tests) {
    try {
      const result = await runPiston(language, code, test.input);

      // Check for compilation error
      if (result.compile && result.compile.code !== 0) {
        finalStatus = 'CE';
        debugOutput = result.compile.output;
        break;
      }

      // Check for runtime error
      if (result.run.code !== 0) {
        finalStatus = 'RE';
        debugOutput = result.run.output;
        break;
      }

      // Check output
      const actualOutput = result.run.stdout.trim();
      const expectedOutput = test.expectedOutput.trim();

      if (actualOutput !== expectedOutput) {
        finalStatus = 'WA';
        debugOutput = `Input: ${test.input}\nExpected: ${expectedOutput}\nActual: ${actualOutput}`;
        break;
      }
    } catch (error) {
      console.error('Execution error:', error);
      finalStatus = 'RE'; // Internal error treated as RE for now
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

  return NextResponse.json({
    status: finalStatus,
    output: debugOutput, // Return debug info for the first failed test or success
  });
}
