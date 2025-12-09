import { db } from "@/db";
import { problems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import CodeEditor from "@/components/code-editor";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;

  const problem = await db.query.problems.findFirst({
    where: eq(problems.slug, slug),
  });

  if (!problem) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* Left Panel: Description */}
        <div className="w-full lg:w-1/2 p-6 overflow-y-auto border-r">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-bold">{problem.title}</h1>
              <Badge
                variant={
                  problem.difficulty === "Easy"
                    ? "secondary"
                    : problem.difficulty === "Medium"
                    ? "default"
                    : "destructive"
                }
              >
                {problem.difficulty}
              </Badge>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              {/* Simple markdown rendering for now, or just text */}
              <div className="whitespace-pre-wrap">{problem.description}</div>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="w-full lg:w-1/2 bg-muted/10">
          <CodeEditor
            problemId={problem.id}
            starterCode={problem.starterCode}
          />
        </div>
      </main>
    </div>
  );
}
