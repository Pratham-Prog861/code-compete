import { db } from "@/db";
import { userStats } from "@/db/schema";
import { desc } from "drizzle-orm";
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

export default async function LeaderboardPage() {
  // Get user stats ordered by points
  const leaderboard = await db
    .select()
    .from(userStats)
    .orderBy(desc(userStats.totalPoints))
    .limit(50);

  // Fetch user details from Clerk
  const client = await clerkClient();
  const userIds = leaderboard.map((entry) => entry.userId);
  const users = await client.users.getUserList({ userId: userIds });

  // Create a map of userId to user details
  const userMap = new Map(
    users.data.map((user) => [
      user.id,
      {
        name: user.firstName || user.username || user.emailAddresses[0]?.emailAddress.split("@")[0] || "Anonymous",
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0]?.emailAddress,
      },
    ])
  );

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
              {leaderboard.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No submissions yet. Be the first to solve a problem!
                  </TableCell>
                </TableRow>
              ) : (
                leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const userInfo = userMap.get(entry.userId);
                  const displayName = userInfo?.name || "Anonymous";
                  const initials = displayName.substring(0, 2).toUpperCase();
                  
                  return (
                    <TableRow key={entry.userId}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getRankIcon(rank)}
                          <span className={getRankColor(rank)}>#{rank}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {userInfo?.imageUrl ? (
                            <img
                              src={userInfo.imageUrl}
                              alt={displayName}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-bold">
                                {initials}
                              </span>
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {displayName}
                            </span>
                            {userInfo?.email && (
                              <span className="text-xs text-muted-foreground">
                                {userInfo.email}
                              </span>
                            )}
                          </div>
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
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
