import { db } from "@/db";
import { submissions } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import Navbar from "@/components/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";

export default async function LeaderboardPage() {
  // Count unique AC problems per user
  const leaderboard = await db
    .select({
      userId: submissions.userId,
      solvedCount:
        sql<number>`count(distinct ${submissions.problemId})`.mapWith(Number),
    })
    .from(submissions)
    .where(eq(submissions.status, "AC"))
    .groupBy(submissions.userId)
    .orderBy(desc(sql`count(distinct ${submissions.problemId})`))
    .limit(50);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-10 px-4 md:px-6 flex-1">
        <div className="flex items-center gap-4 mb-8">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Problems Solved</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No submissions yet. Be the first to solve a problem!
                  </TableCell>
                </TableRow>
              ) : (
                leaderboard.map((entry, index) => (
                  <TableRow key={entry.userId}>
                    <TableCell className="font-medium">#{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20" />
                        <span className="font-mono text-sm">
                          {entry.userId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {entry.solvedCount}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
