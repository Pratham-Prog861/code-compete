import { db } from "@/db";
import { problems, solvedProblems, submissions } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { type ProblemStatus, type ProblemListItem, type PaginatedResponse } from "@/types";
import { 
  Terminal, 
  Search, 
  Filter,
  CheckCircle,
  Circle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string; search?: string; difficulty?: string }>;
}

export default async function ProblemsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(params.limit || "20", 10)));
  const offset = (page - 1) * pageSize;
  const search = params.search?.toLowerCase().trim() || "";
  const difficultyFilter = params.difficulty || "";

  const { userId } = await auth();

  const allProblemsFromDb = await db
    .select()
    .from(problems)
    .orderBy(problems.id);

  const filteredProblems = allProblemsFromDb.filter(p => {
    const matchesSearch = !search || 
      p.title.toLowerCase().includes(search) ||
      p.slug.toLowerCase().includes(search);
    const matchesDifficulty = !difficultyFilter || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

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

  const paginatedResponse: PaginatedResponse<ProblemListItem> = {
    data: problemList,
    total,
    page,
    pageSize,
    totalPages,
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Medium": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Hard": return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-zinc-500/10 text-zinc-400";
    }
  };

  const getStatusIcon = (status: ProblemStatus) => {
    switch (status) {
      case "solved": return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case "attempted": return <AlertCircle className="h-5 w-5 text-amber-400" />;
      default: return <Circle className="h-5 w-5 text-zinc-600" />;
    }
  };

  const getStatusLabel = (status: ProblemStatus) => {
    switch (status) {
      case "solved": return "Solved";
      case "attempted": return "Attempted";
      default: return "Unsolved";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container px-4 py-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Problems</h1>
              <p className="text-zinc-400 mt-1">{total} challenges available</p>
            </div>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search problems..."
                  defaultValue={search}
                  className="h-10 pl-10 pr-4 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-full sm:w-64"
                />
              </div>
              <div className="flex gap-2">
                <select
                  name="difficulty"
                  defaultValue={difficultyFilter}
                  className="h-10 px-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <Button type="submit" size="sm" className="bg-cyan-500 hover:bg-cyan-400 text-black">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div className="flex gap-2 mb-6">
            <Link 
              href="/problems"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${!difficultyFilter ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-zinc-400 hover:text-white'}`}
            >
              All
            </Link>
            <Link 
              href="/problems?difficulty=Easy"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${difficultyFilter === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'text-zinc-400 hover:text-white'}`}
            >
              Easy
            </Link>
            <Link 
              href="/problems?difficulty=Medium"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${difficultyFilter === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'text-zinc-400 hover:text-white'}`}
            >
              Medium
            </Link>
            <Link 
              href="/problems?difficulty=Hard"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${difficultyFilter === 'Hard' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'text-zinc-400 hover:text-white'}`}
            >
              Hard
            </Link>
          </div>

          {paginatedResponse.data.length === 0 ? (
            <div className="text-center py-20">
              <Terminal className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No problems found</h3>
              <p className="text-zinc-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-2">
              {paginatedResponse.data.map((problem: ProblemListItem) => (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.slug}`}
                  className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-cyan-500/30 hover:bg-zinc-900 transition-all group"
                >
                  <div className="flex-shrink-0">
                    {getStatusIcon(problem.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium truncate group-hover:text-cyan-400 transition-colors">
                        {problem.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {problem.points} pts
                      </span>
                      <span className={`flex items-center gap-1 ${problem.status === 'solved' ? 'text-emerald-400' : problem.status === 'attempted' ? 'text-amber-400' : ''}`}>
                        {getStatusLabel(problem.status)}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400"
                  >
                    Solve
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500">
                Page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`/problems?page=${page - 1}${search ? `&search=${search}` : ''}${difficultyFilter ? `&difficulty=${difficultyFilter}` : ''}`}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm hover:border-zinc-700 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/problems?page=${page + 1}${search ? `&search=${search}` : ''}${difficultyFilter ? `&difficulty=${difficultyFilter}` : ''}`}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm hover:border-zinc-700 transition-colors"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
