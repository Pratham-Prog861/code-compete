import { z } from "zod";

export const SUBMISSION_MAX_CODE_SIZE = 50000;

export const SUPPORTED_LANGUAGES = ["javascript", "python"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const languageDisplayNames: Record<SupportedLanguage, string> = {
  javascript: "JavaScript",
  python: "Python",
};

export const submitRequestSchema = z.object({
  problemId: z.number().int().positive(),
  code: z.string().max(SUBMISSION_MAX_CODE_SIZE),
  language: z.enum(SUPPORTED_LANGUAGES),
});

export type SubmitRequest = z.infer<typeof submitRequestSchema>;

export type TestResult = {
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  isHidden: boolean;
};

export type SubmitResponse = {
  status: "AC" | "WA" | "RE" | "CE" | "TLE";
  output: string;
  testResults: TestResult[];
  isFirstSolve: boolean;
  pointsEarned: number;
};

export type ProblemStatus = "solved" | "attempted" | "unsolved";

export type ProblemListItem = {
  id: number;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  points: number;
  status: ProblemStatus;
};

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  displayName: string;
  imageUrl: string | null;
  problemsSolved: number;
  totalPoints: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ComparisonRule = "strict" | "unordered" | "numeric";

export const comparisonRuleSchema = z.enum(["strict", "unordered", "numeric"]);
