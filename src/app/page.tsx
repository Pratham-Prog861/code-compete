"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { 
  Terminal, 
  Trophy, 
  Zap, 
  Code2, 
  CheckCircle,
  ArrowRight,
  Flame,
  Target,
  Crown
} from "lucide-react";

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden ${className}`}>
      <div className="pt-6 px-6">
        <div className="h-12 w-12 rounded-xl bg-zinc-800 animate-pulse mb-4" />
        <div className="h-6 w-32 bg-zinc-800 rounded animate-pulse mb-2" />
        <div className="h-4 w-full bg-zinc-800/50 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-zinc-800/50 rounded animate-pulse mt-1" />
      </div>
    </div>
  );
}

function SkeletonStep({ className = "" }: { className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      <div className="h-16 w-16 rounded-2xl bg-zinc-800 animate-pulse mx-auto mb-4" />
      <div className="h-5 w-28 bg-zinc-800 rounded animate-pulse mx-auto mb-2" />
      <div className="h-3 w-48 bg-zinc-800/50 rounded animate-pulse mx-auto" />
    </div>
  );
}

function AnimatedConnectorLines({ 
  stepCount 
}: { 
  stepCount: number 
}) {
  if (stepCount < 2) return null;

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
        <defs>
          <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path
          d="M 16.66% 50% L 50% 50% L 83.33% 50%"
          fill="none"
          stroke="url(#connectorGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="200"
          strokeDashoffset="200"
          className="animate-draw-lines"
          style={{ 
            transformOrigin: 'center',
            animation: 'drawLines 1.5s ease-out 0.5s forwards'
          }}
        />
      </svg>
    </div>
  );
}

function StepCard({ 
  number, 
  title, 
  description, 
  gradient, 
  shadowColor, 
  delay,
  className = "" 
}: { 
  number: number; 
  title: string; 
  description: string;
  gradient: string;
  shadowColor: string;
  delay: number;
  className?: string;
}) {
  return (
    <div 
      className={`relative text-center opacity-0 animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div 
        className={`h-16 w-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 ${gradient} shadow-lg ${shadowColor} animate-glow-pulse`}
      >
        <span className="text-2xl font-display font-bold text-black">{number}</span>
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  borderColor, 
  delay,
  className = "" 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  gradient: string;
  borderColor: string;
  delay: number;
  className?: string;
}) {
  return (
    <Card 
      className={`bg-zinc-900/50 border-zinc-800 hover:${borderColor} transition-all duration-500 group opacity-0 animate-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <CardContent className="pt-6">
        <div className={`h-12 w-12 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 group-hover:animate-icon-glow`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setShowContent(true), 100);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern" />
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
          
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8 animate-fade-up">
                <Flame className="h-4 w-4" />
                <span>25+ algorithmic challenges</span>
                <span className="text-zinc-600">•</span>
                <span>Real-time code execution</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-up stagger-1">
                Master algorithms.
                <br />
                <span className="text-gradient">Compete globally.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up stagger-2">
                Build problem-solving skills through hands-on coding challenges. 
                Submit solutions in Python or JavaScript, compete on leaderboards, 
                and level up your developer career.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
                <Link href="/problems">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold gap-2 hover:animate-button-press"
                  >
                    <Target className="h-5 w-5" />
                    Start Solving
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="h-14 px-8 text-base border-zinc-700 text-zinc-300 hover:bg-white/5 hover:text-white"
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    View Rankings
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-zinc-500 animate-fade-up stagger-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>Free forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>No setup required</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-y border-white/5">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-6">
              {!showContent ? (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              ) : (
                <>
                  <FeatureCard 
                    icon={Zap}
                    title="Instant Execution"
                    description="Code runs in milliseconds in secure sandboxes. No waiting, no setup."
                    gradient="bg-cyan-500/10"
                    borderColor="hover:border-cyan-500/30"
                    delay={0}
                  />
                  <FeatureCard 
                    icon={Code2}
                    title="Multi-Language"
                    description="Write in Python or JavaScript. More languages coming soon."
                    gradient="bg-purple-500/10"
                    borderColor="hover:border-purple-500/30"
                    delay={150}
                  />
                  <FeatureCard 
                    icon={Trophy}
                    title="Global Rankings"
                    description="Compete with developers worldwide. Climb the leaderboard."
                    gradient="bg-amber-500/10"
                    borderColor="hover:border-amber-500/30"
                    delay={300}
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 relative">
          {/* Connector lines for desktop */}
          {showContent && (
            <div className="absolute top-48 left-0 w-full pointer-events-none hidden lg:block">
              <svg className="w-full h-32" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                {/* Line from step 1 to step 2 */}
                <path
                  d="M 200 100 L 450 100"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-draw"
                  style={{ strokeDasharray: 250, strokeDashoffset: 250, animation: 'drawLine 0.8s ease-out 0.8s forwards' }}
                />
                {/* Line from step 1 to step 3 */}
                <path
                  d="M 200 100 C 300 100, 450 100, 450 100 L 800 100"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="animate-draw"
                  style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'drawLine 0.8s ease-out 1s forwards' }}
                />
              </svg>
            </div>
          )}

          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                How it works
              </h2>
              <p className="text-zinc-400 max-w-lg mx-auto">
                Three simple steps to start competing
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
              {/* Mobile connector lines */}
              {showContent && (
                <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-amber-500 lg:hidden opacity-30" />
              )}
              
              {!showContent ? (
                <>
                  <SkeletonStep />
                  <SkeletonStep />
                  <SkeletonStep />
                </>
              ) : (
                <>
                  <StepCard
                    number={1}
                    title="Pick a Challenge"
                    description="Browse problems by difficulty. Start with Easy, progress to Hard."
                    gradient="bg-gradient-to-br from-cyan-500 to-cyan-600"
                    shadowColor="shadow-cyan-500/20"
                    delay={400}
                    className="group"
                  />
                  <StepCard
                    number={2}
                    title="Write & Submit"
                    description="Code in-browser with syntax highlighting. Run against test cases."
                    gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                    shadowColor="shadow-purple-500/20"
                    delay={600}
                    className="group"
                  />
                  <StepCard
                    number={3}
                    title="Earn Points"
                    description="Pass all tests, earn points, and climb the leaderboard."
                    gradient="bg-gradient-to-br from-amber-500 to-amber-600"
                    shadowColor="shadow-amber-500/20"
                    delay={800}
                    className="group"
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-white/5">
          <div className="container px-4 md:px-6">
            <div className="relative rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 p-8 md:p-16 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30" />
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-cyan-500/20 mb-6 border border-cyan-500/30">
                  <Crown className="h-10 w-10 text-cyan-400" />
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  Ready to prove your skills?
                </h2>
                <p className="text-lg text-zinc-400 mb-8 max-w-lg mx-auto">
                  Join thousands of developers mastering algorithms. 
                  Start solving challenges today — completely free.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/problems">
                    <Button 
                      size="lg" 
                      className="h-14 px-10 text-base bg-cyan-500 hover:bg-cyan-400 text-black font-bold gap-2"
                    >
                      <Target className="h-5 w-5" />
                      Start Solving Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="h-14 px-10 text-base border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500"
                    >
                      <Trophy className="h-5 w-5 mr-2" />
                      See Leaderboard
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950">
        <div className="container px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Code2 className="h-6 w-6 text-cyan-400" />
                <span className="font-display text-lg font-bold">CodeCompete</span>
              </Link>
              <p className="text-sm text-zinc-500 mb-4 max-w-xs">
                The ultimate platform for developers to master algorithmic problem-solving. 
                Code, compete, and level up.
              </p>
              <div className="flex items-center gap-3">
                <a href="#" className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.206-6.086 8.206-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.013 3.013 0 0 0 .502 6.186C0 8.346 0 12 0 12s0 3.654.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.654 24 12 24 12s0-3.654-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3621 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link href="/problems" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Problems</Link></li>
                <li><Link href="/leaderboard" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Leaderboard</Link></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Contests</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Discuss</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Status</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-display font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors">Terms</a></li>
              </ul>
            </div>

            {/* Difficulty Categories */}
            <div className="hidden lg:block">
              <h4 className="font-display font-bold text-white mb-4">Difficulty</h4>
              <ul className="space-y-3">
                <li><a href="/problems?difficulty=Easy" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">Easy Problems</a></li>
                <li><a href="/problems?difficulty=Medium" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">Medium Problems</a></li>
                <li><a href="/problems?difficulty=Hard" className="text-sm text-red-400 hover:text-red-300 transition-colors">Hard Problems</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © 2024 CodeCompete. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
          }
          50% {
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.5);
          }
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }
        
        .animate-icon-glow {
          animation: icon-glow 2s ease-in-out infinite;
        }
        
        @keyframes icon-glow {
          0%, 100% {
            box-shadow: 0 0 10px currentColor;
          }
          50% {
            box-shadow: 0 0 20px currentColor;
          }
        }
        
        .animate-button-press {
          transform: scale(0.98);
        }
        
        .animate-button-press:hover {
          transform: scale(1);
        }
        
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
