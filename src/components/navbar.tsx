import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Code className="h-6 w-6 text-primary" />
          <span>CodeCompete</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/problems"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Problems
          </Link>
          <Link
            href="/leaderboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Leaderboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!userId ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">Sign up</Button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </div>
    </nav>
  );
}
