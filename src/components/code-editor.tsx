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
import { Loader2, Play, Send } from "lucide-react";

interface CodeEditorProps {
  problemId: number;
  starterCode: any;
}

const LANGUAGES = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "cpp", name: "C++" },
  { id: "go", name: "Go" },
];

export default function CodeEditor({
  problemId,
  starterCode,
}: CodeEditorProps) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(
    starterCode["javascript"] || "// Write your code here"
  );
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(starterCode[value] || "// Write your code here");
  };

  const handleSubmit = async () => {
    setIsRunning(true);
    setOutput("Running...");
    setStatus(null);

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

      const data = await res.json();

      if (data.error) {
        setOutput(`Error: ${data.error}`);
        return;
      }

      setStatus(data.status);
      setOutput(data.output || "No output");
    } catch (error) {
      setOutput("Failed to submit code");
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
                  ? "text-green-500"
                  : status === "WA"
                  ? "text-red-500"
                  : "text-yellow-500"
              }
            >
              Status: {status}
            </span>
          )}
        </div>
        <div className="p-4 font-mono text-sm overflow-auto flex-1 whitespace-pre-wrap">
          {output || "Run your code to see output..."}
        </div>
      </div>
    </div>
  );
}
