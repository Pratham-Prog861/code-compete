"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { 
  Code2, 
  Menu, 
  X, 
  Terminal, 
  Trophy, 
  User,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/problems", label: "Problems", icon: Terminal },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Code2 className="h-7 w-7 text-cyan-400 transition-transform group-hover:scale-110" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-cyan-400/60 animate-pulse" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              Code<span className="text-cyan-400">Compete</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    active 
                      ? "bg-cyan-500/10 text-cyan-400" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                  {active && (
                    <ChevronRight className="h-3 w-3 ml-1 opacity-60" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!isLoaded ? (
              <div className="h-8 w-20 bg-zinc-800 animate-pulse rounded" />
            ) : !user ? (
              <>
                <SignInButton mode="modal">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-zinc-400 hover:text-white"
                  >
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button 
                    size="sm"
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            ) : (
              <Link href="/profile">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.username || "User"}
                      className="h-6 w-6 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4 text-zinc-400" />
                  )}
                  <span className="text-sm font-medium text-zinc-300">
                    {user.username || user.firstName || "Profile"}
                  </span>
                </div>
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 py-4 animate-fade-in">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      active 
                        ? "bg-cyan-500/10 text-cyan-400" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="pt-4 border-t border-white/5 space-y-3">
                {!isLoaded ? (
                  <div className="h-10 bg-zinc-800 animate-pulse rounded" />
                ) : !user ? (
                  <>
                    <SignInButton mode="modal">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start text-zinc-400"
                      >
                        Log in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button 
                        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
                      >
                        Get Started
                      </Button>
                    </SignUpButton>
                  </>
                ) : (
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-zinc-400"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
