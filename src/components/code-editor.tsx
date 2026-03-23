"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Play, Check, X, Trophy } from "lucide-react";
import { SUPPORTED_LANGUAGES, languageDisplayNames, type TestResult } from "@/types";

interface CodeEditorProps {
  problemId: number;
  starterCode: Record<string, string>;
}

const LANGUAGES = SUPPORTED_LANGUAGES.map((id) => ({
  id,
  name: languageDisplayNames[id],
}));

export default function CodeEditor({
  problemId,
  starterCode,
}: CodeEditorProps) {
  const [language, setLanguage] = useState<string>(SUPPORTED_LANGUAGES[0]);
  const [code, setCode] = useState(
    starterCode[language] || "// Write your code here"
  );
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(starterCode[value] || "// Write your code here");
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setOutput("Running...");
    setStatus(null);
    setTestResults([]);
    setShowSuccess(false);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId,
          code,
          language,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        setOutput(`Error: Server returned status ${res.status}`);
        setIsRunning(false);
        return;
      }

      if (!res.ok || data.error) {
        setOutput(data.error || `Request failed with status ${res.status}`);
        return;
      }

      setStatus(data.status);
      setTestResults(data.testResults || []);
      
      if (data.status === 'AC') {
        if (data.isFirstSolve) {
          setShowSuccess(true);
          setPointsEarned(data.pointsEarned);
        }
        setOutput('All test cases passed! ✓');
      } else if (data.status === 'CE') {
        setOutput(`Compilation Error:\n${data.output}`);
      } else if (data.status === 'RE') {
        setOutput(`Runtime Error:\n${data.output}`);
      } else if (data.status === 'WA') {
        setOutput('Wrong Answer - See test results below');
      } else if (data.status === 'TLE') {
        setOutput('Time Limit Exceeded');
      }
    } catch {
      setOutput("Failed to submit code - network error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <div className="flex items-center justify-between p-2 border-b bg-muted/50">
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.id} value={lang.id}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button size="sm" onClick={handleSubmit} disabled={isRunning}>
            {isRunning ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Run & Submit
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-[400px]">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="h-1/3 border-t bg-muted/30 flex flex-col">
        <div className="p-2 border-b text-xs font-semibold text-muted-foreground flex justify-between items-center">
          <span>Output</span>
          {status && (
            <span
              className={
                status === "AC"
                  ? "text-green-500 font-bold"
                  : status === "WA"
                  ? "text-red-500"
                  : status === "CE"
                  ? "text-orange-500"
                  : "text-yellow-500"
              }
            >
              Status: {status}
            </span>
          )}
        </div>
        
        {showSuccess && (
          <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 p-4">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Trophy className="h-5 w-5" />
              <div>
                <p className="font-bold">Congratulations! 🎉</p>
                <p className="text-sm">You solved this problem and earned {pointsEarned} points!</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 overflow-auto flex-1">
          <div className="font-mono text-sm whitespace-pre-wrap mb-4">
            {output || "Run your code to see output..."}
          </div>
          
          {testResults.length > 0 && (
            <div className="space-y-2">
              <p className="font-semibold text-sm mb-2">Test Results:</p>
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded border text-xs ${
                    result.passed
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className="font-semibold">
                      Test Case {index + 1}
                      {result.isHidden && " (Hidden)"}
                    </span>
                  </div>
                  {result.isHidden ? (
                    <div className="ml-6 text-muted-foreground italic">
                      Hidden test case - details not shown
                    </div>
                  ) : (
                    <div className="space-y-1 ml-6">
                      <div>
                        <span className="text-muted-foreground">Input: </span>
                        <span className="font-mono">{result.input}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expected: </span>
                        <span className="font-mono">{result.expected}</span>
                      </div>
                      {!result.passed && (
                        <div>
                          <span className="text-muted-foreground">Your Output: </span>
                          <span className="font-mono text-red-600 dark:text-red-400">
                            {result.actual || "(no output)"}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
