import { db } from "@/db";
import { problems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import CodeEditor from "@/components/code-editor";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import DOMPurify from "isomorphic-dompurify";
import { Star } from "lucide-react";

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Medium": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Hard": return "bg-red-500/10 text-red-400 border-red-500/30";
      default: return "bg-zinc-500/10 text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16 h-[calc(100vh-64px)] overflow-hidden">
        <div className="h-full flex flex-col lg:flex-row">
          {/* Description Panel */}
          <div className="w-full lg:w-1/2 border-r border-zinc-800 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl font-display font-bold">{problem.title}</h1>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {problem.points} points
                </span>
              </div>

              <div className="prose prose-invert max-w-none 
                prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
                prose-code:text-cyan-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-headings:font-display prose-headings:font-bold
                prose-p:text-zinc-300 prose-p:leading-relaxed
                prose-li:text-zinc-300 prose-strong:text-white">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {DOMPurify.sanitize(problem.description)}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Editor Panel */}
          <div className="w-full lg:w-1/2 bg-zinc-950">
            <CodeEditor
              problemId={problem.id}
              starterCode={problem.starterCode as Record<string, string>}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
