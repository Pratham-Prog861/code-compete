export type PistonExecuteResult = {
  language: string;
  version: string;
  run: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
  compile?: {
    stdout: string;
    stderr: string;
    output: string;
    code: number;
    signal: string | null;
  };
};

export async function runPiston(language: string, code: string, stdin: string): Promise<PistonExecuteResult> {
  const response = await fetch('https://emkc.org/api/v2/piston/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language,
      version: '*', // Use latest available
      files: [
        {
          content: code,
        },
      ],
      stdin,
    }),
  });

  if (!response.ok) {
    throw new Error(`Piston API error: ${response.statusText}`);
  }

  return response.json();
}
