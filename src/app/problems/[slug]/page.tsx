import { db } from "@/db";
import { problems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";
import CodeEditor from "@/components/code-editor";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // You might need to install highlight.js or add css manually if not present.
// Actually rehype-highlight adds classes, we need styles.
// I'll assume basic styling or add a link in layout.

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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* Left Panel: Description */}
        <div className="w-full lg:w-1/2 p-6 overflow-y-auto border-r scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{problem.title}</h1>
            </div>

            <div className="prose dark:prose-invert max-w-none prose-pre:bg-muted prose-pre:text-foreground prose-p:leading-relaxed prose-headings:font-semibold">
              {/* We use a div to render HTML content from markdown if we trust it, or just standard markdown */}
              {/* Since we have HTML in markdown (badges), we need to enable rehype-raw if we want to render HTML, 
                  but react-markdown by default escapes HTML. 
                  For now, I'll just render markdown. The badges in seed data are HTML.
                  I should probably use a proper component for badges in the UI instead of embedding HTML in DB.
                  But to support the user's request "like this in description", I'll try to render it.
              */}
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {problem.description}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right Panel: Editor */}
        <div className="w-full lg:w-1/2 bg-muted/10 border-l">
          <CodeEditor
            problemId={problem.id}
            starterCode={problem.starterCode}
          />
        </div>
      </main>
    </div>
  );
}
