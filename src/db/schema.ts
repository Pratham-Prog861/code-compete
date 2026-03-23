import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["Easy", "Medium", "Hard"]);
export const statusEnum = pgEnum("status", ["AC", "WA", "RE", "CE", "TLE"]);

export const comparisonRuleEnum = pgEnum("comparison_rule", ["strict", "unordered", "numeric"]);

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  starterCode: jsonb("starter_code").notNull(),
  functionName: text("function_name").notNull(),
  functionParams: jsonb("function_params").$type<string[]>().default([]),
  comparisonRule: comparisonRuleEnum("comparison_rule").default("strict").notNull(),
  points: integer("points").default(10).notNull(),
});

export const testCases = pgTable("test_cases", {
  id: serial("id").primaryKey(),
  problemId: integer("problem_id")
    .references(() => problems.id)
    .notNull(),
  input: text("input").notNull(),
  expectedOutput: text("expected_output").notNull(),
  isHidden: boolean("is_hidden").default(false).notNull(),
});

export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(), // From Clerk
  problemId: integer("problem_id")
    .references(() => problems.id)
    .notNull(),
  code: text("code").notNull(),
  language: varchar("language").notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const solvedProblems = pgTable("solved_problems", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  problemId: integer("problem_id")
    .references(() => problems.id)
    .notNull(),
  solvedAt: timestamp("solved_at").defaultNow().notNull(),
}, (table) => ({
  uniqueUserProblem: { columns: [table.userId, table.problemId], name: "unique_user_problem" },
}));

export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").unique().notNull(),
  totalPoints: integer("total_points").default(0).notNull(),
  problemsSolved: integer("problems_solved").default(0).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
