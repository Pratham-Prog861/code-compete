import { db } from "@/db";
import { userStats } from "@/db/schema";
import { desc, sql, asc } from "drizzle-orm";
import Navbar from "@/components/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, Medal } from "lucide-react";
import { clerkClient } from "@clerk/nextjs/server";
import { type PaginatedResponse, type LeaderboardEntry } from "@/types";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(params.limit || "20", 10)));
  const offset = (page - 1) * pageSize;

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(userStats);
  const total = countResult[0]?.count || 0;
  const totalPages = Math.ceil(total / pageSize);

  const leaderboard = await db
    .select()
    .from(userStats)
    .orderBy(desc(userStats.totalPoints), asc(userStats.userId))
    .limit(pageSize)
    .offset(offset);

  const client = await clerkClient();
  const userIds = leaderboard.map((entry) => entry.userId);
  const users = await client.users.getUserList({ userId: userIds });

  const userMap = new Map(
    users.data.map((user) => [
      user.id,
      {
        name:
          user.firstName ||
          user.username ||
          user.emailAddresses[0]?.emailAddress.split("@")[0] ||
          "Anonymous",
        imageUrl: user.imageUrl,
      },
    ])
  );

  const entries: LeaderboardEntry[] = leaderboard.map((entry, index) => {
    const userInfo = userMap.get(entry.userId);
    const displayName = userInfo?.name || "Anonymous";
    const initials = displayName.substring(0, 2).toUpperCase();

    return {
      rank: offset + index + 1,
      userId: entry.userId,
      displayName,
      imageUrl: userInfo?.imageUrl || null,
      problemsSolved: entry.problemsSolved,
      totalPoints: entry.totalPoints,
    };
  });

  const response: PaginatedResponse<LeaderboardEntry> = {
    data: entries,
    total,
    page,
    pageSize,
    totalPages,
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return <Medal className={`h-5 w-5 ${getRankColor(rank)}`} />;
    }
    return null;
  };

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
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No submissions yet. Be the first to solve a problem!
                  </TableCell>
                </TableRow>
              ) : (
                response.data.map((entry) => (
                  <TableRow key={entry.userId}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <span className={getRankColor(entry.rank)}>#{entry.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {entry.imageUrl ? (
                          <img
                            src={entry.imageUrl}
                            alt={entry.displayName}
                            className="h-8 w-8 rounded-full"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {entry.displayName.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-sm">
                          {entry.displayName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {entry.problemsSolved}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-primary">
                        {entry.totalPoints}
                      </span>
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
              <a
                href={`/leaderboard?page=${response.page - 1}`}
                className="px-3 py-1 border rounded hover:bg-muted"
              >
                Previous
              </a>
            )}
            {response.page < response.totalPages && (
              <a
                href={`/leaderboard?page=${response.page + 1}`}
                className="px-3 py-1 border rounded hover:bg-muted"
              >
                Next
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
