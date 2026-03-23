import { db } from "@/db";
import { problems, solvedProblems, submissions } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { type ProblemStatus, type ProblemListItem, type PaginatedResponse } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}

export default async function ProblemsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(params.limit || "20", 10)));
  const offset = (page - 1) * pageSize;
  const search = params.search?.toLowerCase().trim() || "";

  const { userId } = await auth();

  const allProblemsFromDb = await db
    .select()
    .from(problems);

  const filteredProblems = search
    ? allProblemsFromDb.filter(p => 
        p.title.toLowerCase().includes(search) ||
        p.slug.toLowerCase().includes(search) ||
        p.difficulty.toLowerCase().includes(search)
      )
    : allProblemsFromDb;

  const total = filteredProblems.length;
  const totalPages = Math.ceil(total / pageSize);

  const allProblems = filteredProblems.slice(offset, offset + pageSize);

  const problemList: ProblemListItem[] = allProblems.map((problem) => ({
    id: problem.id,
    title: problem.title,
    slug: problem.slug,
    difficulty: problem.difficulty,
    points: problem.points,
    status: "unsolved" as ProblemStatus,
  }));

  if (userId && problemList.length > 0) {
    for (const problem of problemList) {
      const solved = await db
        .select({ problemId: solvedProblems.problemId })
        .from(solvedProblems)
        .where(and(
          eq(solvedProblems.userId, userId),
          eq(solvedProblems.problemId, problem.id)
        ))
        .limit(1);

      if (solved.length > 0) {
        problem.status = "solved";
        continue;
      }

      const attempted = await db
        .select({ problemId: submissions.problemId })
        .from(submissions)
        .where(and(
          eq(submissions.userId, userId),
          eq(submissions.problemId, problem.id),
          sql`${submissions.status} != 'AC'`
        ))
        .limit(1);

      if (attempted.length > 0) {
        problem.status = "attempted";
      }
    }
  }

  const response: PaginatedResponse<ProblemListItem> = {
    data: problemList,
    total,
    page,
    pageSize,
    totalPages,
  };

  const getStatusColor = (status: ProblemStatus) => {
    if (status === "solved") return "bg-green-500";
    if (status === "attempted") return "bg-yellow-500";
    return "bg-muted";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-10 px-4 md:px-6 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <form className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search problems..."
              defaultValue={search}
              className="px-3 py-2 border rounded-md"
            />
            <Button type="submit" variant="secondary">Search</Button>
          </form>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No problems found.
                  </TableCell>
                </TableRow>
              ) : (
                response.data.map((problem) => (
                  <TableRow key={problem.id}>
                    <TableCell>
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(problem.status)}`} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {problem.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          problem.difficulty === "Easy"
                            ? "secondary"
                            : problem.difficulty === "Medium"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          problem.difficulty === "Easy"
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            : problem.difficulty === "Medium"
                            ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        }
                      >
                        {problem.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{problem.points}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/problems/${problem.slug}`}>
                        <Button variant="ghost" size="sm">
                          Solve
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Page {response.page} of {response.totalPages} ({response.total} total)
          </div>
          <div className="flex gap-2">
            {response.page > 1 && (
              <Link
                href={`/problems?page=${response.page - 1}${search ? `&search=${search}` : ""}`}
                className="px-3 py-1 border rounded hover:bg-muted"
              >
                Previous
              </Link>
            )}
            {response.page < response.totalPages && (
              <Link
                href={`/problems?page=${response.page + 1}${search ? `&search=${search}` : ""}`}
                className="px-3 py-1 border rounded hover:bg-muted"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
