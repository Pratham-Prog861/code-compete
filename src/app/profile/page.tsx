import { db } from "@/db";
import { submissions, problems } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const userSubmissions = await db
    .select({
      id: submissions.id,
      problemTitle: problems.title,
      status: submissions.status,
      language: submissions.language,
      createdAt: submissions.createdAt,
    })
    .from(submissions)
    .leftJoin(problems, eq(submissions.problemId, problems.id))
    .where(eq(submissions.userId, userId))
    .orderBy(desc(submissions.createdAt));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-10 px-4 md:px-6 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">Your submission history</p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Problem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No submissions yet.
                  </TableCell>
                </TableRow>
              ) : (
                userSubmissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">
                      {sub.problemTitle || "Unknown Problem"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sub.status === "AC" ? "default" : "destructive"
                        }
                        className={
                          sub.status === "AC"
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            : sub.status === "WA"
                            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                        }
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{sub.language}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {sub.createdAt.toLocaleDateString()}
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
