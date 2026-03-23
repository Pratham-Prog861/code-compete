import { db } from "@/db";
import { submissions, problems, solvedProblems, userStats } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { 
  Trophy, 
  Target, 
  Code2, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ArrowRight,
  Zap,
  User
} from "lucide-react";
import { clerkClient } from "@clerk/nextjs/server";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const [userSubmissions, userStatsData, solvedList] = await Promise.all([
    db
      .select({
        id: submissions.id,
        problemId: submissions.problemId,
        problemTitle: problems.title,
        problemSlug: problems.slug,
        status: submissions.status,
        language: submissions.language,
        createdAt: submissions.createdAt,
      })
      .from(submissions)
      .leftJoin(problems, eq(submissions.problemId, problems.id))
      .where(eq(submissions.userId, userId))
      .orderBy(desc(submissions.createdAt))
      .limit(20),
    
    db.query.userStats.findFirst({
      where: eq(userStats.userId, userId),
    }),

    db
      .select({
        difficulty: problems.difficulty,
      })
      .from(solvedProblems)
      .leftJoin(problems, eq(solvedProblems.problemId, problems.id))
      .where(eq(solvedProblems.userId, userId)),
  ]);

  const client = await clerkClient();
  let userName = "User";
  let userImage = "";
  
  try {
    const user = await client.users.getUser(userId);
    userName = user.firstName || user.username || user.emailAddresses[0]?.emailAddress.split("@")[0] || "User";
    userImage = user.imageUrl || "";
  } catch {
    // Fallback
  }

  const totalSubmissions = userSubmissions.length;
  const solvedCount = solvedList.length;
  const totalPoints = userStatsData?.totalPoints || 0;

  const easyCount = solvedList.filter(s => s.difficulty === "Easy").length;
  const mediumCount = solvedList.filter(s => s.difficulty === "Medium").length;
  const hardCount = solvedList.filter(s => s.difficulty === "Hard").length;

  const languageStats = userSubmissions.reduce((acc, sub) => {
    acc[sub.language] = (acc[sub.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusStats = userSubmissions.reduce((acc, sub) => {
    acc[sub.status] = (acc[sub.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const acceptedCount = statusStats["AC"] || 0;
  const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedCount / totalSubmissions) * 100) : 0;

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 7) return date.toLocaleDateString();
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "AC": return <CheckCircle className="h-4 w-4 text-emerald-400" />;
      case "WA": return <XCircle className="h-4 w-4 text-red-400" />;
      case "RE": return <AlertCircle className="h-4 w-4 text-orange-400" />;
      case "CE": return <AlertCircle className="h-4 w-4 text-amber-400" />;
      case "TLE": return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <AlertCircle className="h-4 w-4 text-zinc-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AC": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "WA": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "RE": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "CE": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "TLE": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="container px-4 py-8 max-w-6xl mx-auto">
          {/* Header with user info and logout */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center overflow-hidden">
                {userImage ? (
                  <img src={userImage} alt={userName} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">{userName}</h1>
                <p className="text-zinc-400 text-sm">{solvedCount} problems solved</p>
              </div>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                <Target className="h-4 w-4" />
                Problems Solved
              </div>
              <div className="text-3xl font-display font-bold">{solvedCount}</div>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                Total Points
              </div>
              <div className="text-3xl font-display font-bold text-amber-400">{totalPoints}</div>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                <Code2 className="h-4 w-4 text-purple-400" />
                Submissions
              </div>
              <div className="text-3xl font-display font-bold">{totalSubmissions}</div>
            </div>
            
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                Acceptance
              </div>
              <div className="text-3xl font-display font-bold text-emerald-400">{acceptanceRate}%</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Submission History */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
                  <h2 className="font-display font-bold text-lg">Recent Submissions</h2>
                  <Link href="/problems">
                    <Button variant="ghost" size="sm" className="text-cyan-400">
                      Solve More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                
                {userSubmissions.length === 0 ? (
                  <div className="text-center py-16">
                    <Target className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">No submissions yet</h3>
                    <p className="text-zinc-500 text-sm mb-4">Start solving problems to see your progress</p>
                    <Link href="/problems">
                      <Button className="bg-cyan-500 hover:bg-cyan-400 text-black">
                        Browse Problems
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-800">
                    {userSubmissions.map((sub) => (
                      <Link 
                        key={sub.id} 
                        href={sub.problemSlug ? `/problems/${sub.problemSlug}` : "#"}
                        className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon(sub.status)}
                          <div>
                            <div className="font-medium">{sub.problemTitle || "Unknown Problem"}</div>
                            <div className="text-sm text-zinc-500 capitalize">{sub.language}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sub.status)}`}>
                            {sub.status}
                          </span>
                          <span className="text-sm text-zinc-500 w-20 text-right">
                            {formatDate(sub.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Language Distribution */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-display font-bold mb-4 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-purple-400" />
                  Languages Used
                </h3>
                {Object.keys(languageStats).length === 0 ? (
                  <p className="text-zinc-500 text-sm">No submissions yet</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(languageStats).map(([lang, count]) => (
                      <div key={lang} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-zinc-300">{lang}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                              style={{ width: `${(count / totalSubmissions) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-zinc-400 w-6">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-display font-bold mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-cyan-400" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Accepted</span>
                    <span className="font-bold text-emerald-400">{acceptedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Wrong Answer</span>
                    <span className="font-bold text-red-400">{statusStats["WA"] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Runtime Error</span>
                    <span className="font-bold text-orange-400">{statusStats["RE"] || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Compilation Error</span>
                    <span className="font-bold text-amber-400">{statusStats["CE"] || 0}</span>
                  </div>
                </div>
              </div>

              {/* Problems by Difficulty */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="font-display font-bold mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4 text-cyan-400" />
                  Solved by Difficulty
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      Easy
                    </span>
                    <span className="font-bold text-emerald-400">{easyCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      Medium
                    </span>
                    <span className="font-bold text-amber-400">{mediumCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      Hard
                    </span>
                    <span className="font-bold text-red-400">{hardCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
