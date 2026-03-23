import { db } from "@/db";
import { userStats } from "@/db/schema";
import { desc, sql, asc } from "drizzle-orm";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { clerkClient } from "@clerk/nextjs/server";
import { type PaginatedResponse, type LeaderboardEntry } from "@/types";
import { 
  Trophy, 
  Medal, 
  Crown,
  ChevronLeft,
  ChevronRight,
  User,
  Star
} from "lucide-react";

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
  const users = userIds.length > 0 ? await client.users.getUserList({ userId: userIds }) : { data: [] };

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

    return {
      rank: offset + index + 1,
      userId: entry.userId,
      displayName,
      imageUrl: userInfo?.imageUrl || null,
      problemsSolved: entry.problemsSolved,
      totalPoints: entry.totalPoints,
    };
  });

  const paginatedResponse: PaginatedResponse<LeaderboardEntry> = {
    data: entries,
    total,
    page,
    pageSize,
    totalPages,
  };

  const topThree = paginatedResponse.data.slice(0, 3);
  const rest = paginatedResponse.data.slice(3);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1: return { bg: "bg-gradient-to-br from-amber-300 to-amber-500", text: "text-amber-900", icon: Crown };
      case 2: return { bg: "bg-gradient-to-br from-slate-300 to-slate-400", text: "text-slate-800", icon: Medal };
      case 3: return { bg: "bg-gradient-to-br from-orange-300 to-orange-400", text: "text-orange-900", icon: Medal };
      default: return { bg: "bg-zinc-800", text: "text-zinc-300", icon: null };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container px-4 py-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Leaderboard</h1>
            <p className="text-zinc-400">{total} developers competing</p>
          </div>

          {topThree.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[1, 0, 2].map((idx) => {
                const entry = topThree[idx];
                if (!entry) return null;
                
                const badge = getRankBadge(entry.rank);
                const isFirst = entry.rank === 1;
                
                return (
                  <div 
                    key={entry.userId}
                    className={`relative flex flex-col items-center p-6 rounded-2xl border ${
                      isFirst 
                        ? 'bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/30' 
                        : 'bg-zinc-900/50 border-zinc-800'
                    }`}
                  >
                    {entry.rank <= 3 && badge.icon && (
                      <div className={`absolute -top-3 ${badge.bg} rounded-full p-2`}>
                        <badge.icon className={`h-4 w-4 ${badge.text}`} />
                      </div>
                    )}
                    
                    <div className="relative mb-3">
                      {entry.imageUrl ? (
                        <img 
                          src={entry.imageUrl} 
                          alt={entry.displayName}
                          className={`h-16 w-16 rounded-full object-cover ${isFirst ? 'ring-4 ring-amber-500/50' : 'ring-2 ring-zinc-700'}`}
                        />
                      ) : (
                        <div className={`h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center ${isFirst ? 'ring-4 ring-amber-500/50' : 'ring-2 ring-zinc-700'}`}>
                          <User className="h-8 w-8 text-zinc-500" />
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 ${badge.bg} rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold ${badge.text}`}>
                        {entry.rank}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1">{entry.displayName}</h3>
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-amber-400" />
                        {entry.totalPoints}
                      </span>
                      <span>{entry.problemsSolved} solved</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-4 bg-zinc-800/50 p-4 text-sm font-medium text-zinc-400">
              <div className="col-span-1">Rank</div>
              <div className="col-span-2">Developer</div>
              <div className="col-span-1 text-right">Points</div>
            </div>
            
            {rest.length === 0 && topThree.length === 0 ? (
              <div className="text-center py-20">
                <Trophy className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No rankings yet</h3>
                <p className="text-zinc-500 mb-6">Be the first to solve a problem!</p>
                <Link href="/problems">
                  <Button className="bg-cyan-500 hover:bg-cyan-400 text-black">
                    Start Solving
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {rest.map((entry) => (
                  <div 
                    key={entry.userId}
                    className="grid grid-cols-4 items-center p-4 hover:bg-zinc-800/30 transition-colors"
                  >
                    <div className="col-span-1">
                      <span className="text-zinc-500 font-mono">#{entry.rank}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-3">
                      {entry.imageUrl ? (
                        <img 
                          src={entry.imageUrl} 
                          alt={entry.displayName}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <User className="h-4 w-4 text-zinc-500" />
                        </div>
                      )}
                      <span className="font-medium">{entry.displayName}</span>
                    </div>
                    <div className="col-span-1 text-right">
                      <span className="font-bold text-cyan-400">{entry.totalPoints}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
              <p className="text-sm text-zinc-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                {page > 1 && (
                  <Link
                    href={`/leaderboard?page=${page - 1}`}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm hover:border-zinc-700 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Link>
                )}
                {page < totalPages && (
                  <Link
                    href={`/leaderboard?page=${page + 1}`}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm hover:border-zinc-700 transition-colors"
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
