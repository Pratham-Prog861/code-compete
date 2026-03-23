import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "CodeCompete - Master Algorithms. Compete Globally.",
  description: "The ultimate platform for developers to master algorithmic problem-solving. Code in multiple languages, compete on leaderboards, and level up your skills.",
  keywords: ["coding", "algorithms", "programming", "competetive programming", "leetcode", "code challenges"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="antialiased min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
