import { db } from "@/db";
import { problems } from "@/db/schema";
import Link from "next/link";
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

export default async function ProblemsPage() {
  const allProblems = await db.select().from(problems);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-10 px-4 md:px-6 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProblems.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No problems found.
                  </TableCell>
                </TableRow>
              ) : (
                allProblems.map((problem) => (
                  <TableRow key={problem.id}>
                    <TableCell>
                      <div className="h-2 w-2 rounded-full bg-muted" />
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
      </main>
    </div>
  );
}
