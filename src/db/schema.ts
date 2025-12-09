import { pgTable, serial, text, integer, boolean, jsonb, timestamp, pgEnum, varchar } from 'drizzle-orm/pg-core';

export const difficultyEnum = pgEnum('difficulty', ['Easy', 'Medium', 'Hard']);
export const statusEnum = pgEnum('status', ['AC', 'WA', 'RE', 'CE', 'TLE']);

export const problems = pgTable('problems', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description').notNull(), // markdown text
  starterCode: jsonb('starter_code').notNull(), // { python: "...", javascript: "..." }
  functionName: text('function_name').notNull(), // e.g. "twoSum"
});

export const testCases = pgTable('test_cases', {
  id: serial('id').primaryKey(),
  problemId: integer('problem_id').references(() => problems.id).notNull(),
  input: text('input').notNull(),
  expectedOutput: text('expected_output').notNull(),
  isHidden: boolean('is_hidden').default(false).notNull(),
});

export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id').notNull(), // From Clerk
  problemId: integer('problem_id').references(() => problems.id).notNull(),
  code: text('code').notNull(),
  language: varchar('language').notNull(),
  status: statusEnum('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
