import Navbar from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Terminal,
  Trophy,
  Zap,
  Code2,
  Globe,
  Users,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                  🎉 <span className="ml-2">v1.0 is now live!</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Code. Compete. <br />
                  <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Conquer.
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed leading-relaxed">
                  The ultimate platform for developers to showcase their skills.
                  Solve algorithmic challenges, run code in 5+ languages, and
                  climb the global leaderboard.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/problems">
                    <Button
                      size="lg"
                      className="w-full min-[400px]:w-auto h-12 px-8 text-base"
                    >
                      Start Solving Now
                    </Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full min-[400px]:w-auto h-12 px-8 text-base"
                    >
                      View Leaderboard
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Free to use</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>

              {/* Mock Editor */}
              <div className="relative rounded-xl border bg-card/50 backdrop-blur-sm p-4 shadow-2xl lg:p-6 ring-1 ring-border/50">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    solution.ts
                  </span>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      1
                    </span>
                    <span className="text-purple-500">function</span>{" "}
                    <span className="text-blue-500">twoSum</span>(nums:{" "}
                    <span className="text-yellow-500">number</span>[], target:{" "}
                    <span className="text-yellow-500">number</span>) {"{"}
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      2
                    </span>
                    <span className="ml-4 text-muted-foreground">
                      // Your optimized solution here
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      3
                    </span>
                    <span className="ml-4 text-purple-500">const</span> map ={" "}
                    <span className="text-purple-500">new</span>{" "}
                    <span className="text-yellow-500">Map</span>();
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      4
                    </span>
                    <span className="ml-4 text-purple-500">for</span> (
                    <span className="text-purple-500">let</span> i = 0; i &lt;
                    nums.length; i++) {"{"}
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      5
                    </span>
                    <span className="ml-8 text-purple-500">const</span> diff =
                    target - nums[i];
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      6
                    </span>
                    <span className="ml-8 animate-pulse bg-primary/20 h-4 w-4 rounded inline-block align-middle"></span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      7
                    </span>
                    <span className="ml-4">{"}"}</span>
                  </div>
                  <div className="flex">
                    <span className="text-muted-foreground w-8 select-none">
                      8
                    </span>
                    <span>{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything you need to improve
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Built for developers, by developers.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Lightning Fast Execution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Code is executed instantly in secure, isolated sandboxes
                    using the Piston API. No waiting times.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <Code2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Multi-Language Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Submit solutions in your favorite language. We support
                    Python, JavaScript, TypeScript, C++, and Go.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <Trophy className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Global Leaderboards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compete with developers worldwide. Earn points for every
                    problem solved and climb the ranks.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How it works
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold">Pick a Problem</h3>
                <p className="text-muted-foreground">
                  Choose from our curated list of algorithmic challenges ranging
                  from Easy to Hard.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold">Write Code</h3>
                <p className="text-muted-foreground">
                  Use our powerful in-browser Monaco editor with syntax
                  highlighting and auto-completion.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold">Get Ranked</h3>
                <p className="text-muted-foreground">
                  Submit your solution, pass all test cases, and see your name
                  rise on the leaderboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">
                Top Performers
              </h2>
              <p className="text-muted-foreground max-w-[600px]">
                Join the ranks of the best developers. Solve problems to climb
                the ladder.
              </p>
            </div>
            <div className="max-w-3xl mx-auto border rounded-lg overflow-hidden bg-background shadow-sm">
              <div className="grid grid-cols-3 bg-muted/50 p-4 font-medium text-sm">
                <div>Rank</div>
                <div>User</div>
                <div className="text-right">Solved</div>
              </div>
              {[1, 2, 3, 4, 5].map((rank) => (
                <div
                  key={rank}
                  className="grid grid-cols-3 p-4 border-t text-sm items-center hover:bg-muted/20 transition-colors"
                >
                  <div className="font-mono text-muted-foreground">#{rank}</div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-xs font-bold text-primary">
                      U{rank}
                    </div>
                    <span className="font-medium">User_{rank}</span>
                  </div>
                  <div className="text-right font-mono font-bold text-primary">
                    {150 - rank * 12}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/leaderboard">
                <Button variant="outline" className="min-w-[200px]">
                  View Full Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-16 text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-size-[24px_24px] opacity-20"></div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative z-10">
                Ready to start coding?
              </h2>
              <p className="text-primary-foreground/80 max-w-[600px] mx-auto md:text-xl relative z-10">
                Join thousands of developers solving problems every day. It's
                free and open source.
              </p>
              <div className="relative z-10 pt-4">
                <Link href="/problems">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 text-base font-bold"
                  >
                    Get Started for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container px-4 grid gap-8 md:grid-cols-4 text-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <Code2 className="h-6 w-6 text-primary" />
              <span>CodeCompete</span>
            </div>
            <p className="text-muted-foreground">
              The modern platform for competitive programming and algorithmic
              practice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/problems" className="hover:text-foreground">
                  Problems
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-foreground">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Contests
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  API
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container px-4 mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>© 2024 CodeCompete. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
