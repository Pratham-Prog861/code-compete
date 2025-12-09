# Code Compete 🏆

A competitive coding platform built with Next.js, featuring real-time code execution, problem tracking, and leaderboard rankings.

## Features ✨

- **Problem Solving**: Solve coding problems with multiple difficulty levels (Easy, Medium, Hard)
- **Multi-Language Support**: Write solutions in JavaScript, Python, C++, and Go
- **Real-Time Code Execution**: Execute code using Piston API with instant feedback
- **Test Case Validation**: Detailed test results showing input, expected output, and actual output
- **Progress Tracking**: Track solved problems and earn points for each solution
- **Leaderboard**: Compete with other users and climb the rankings
- **Authentication**: Secure user authentication with Clerk
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and shadcn/ui

## Tech Stack 🛠️

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Neon
- **ORM**: Drizzle ORM
- **Authentication**: Clerk
- **Code Editor**: Monaco Editor (VS Code editor)
- **Code Execution**: Piston API
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Markdown Rendering**: react-markdown with syntax highlighting

## Getting Started 🚀

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Installation

1.Clone the repository:

```bash
git clone https://github.com/Pratham-Prog861/code-compete.git
cd code-compete
```

2.Install dependencies:

```bash
npm install
```

3.Set up environment variables:
   Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_neon_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

4.Push the database schema:

```bash
npx drizzle-kit push
```

5.Seed the database with sample problems:

```bash
npx tsx src/db/seed.ts
```

6.Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure 📁

```bash
code-compete/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   │   └── submit/        # Code submission endpoint
│   │   ├── leaderboard/       # Leaderboard page
│   │   ├── problems/          # Problems listing and detail pages
│   │   └── profile/           # User profile page
│   ├── components/            # React components
│   │   ├── code-editor.tsx    # Monaco code editor component
│   │   ├── navbar.tsx         # Navigation bar
│   │   └── ui/                # shadcn/ui components
│   ├── db/                    # Database configuration
│   │   ├── schema.ts          # Drizzle schema definitions
│   │   ├── index.ts           # Database connection
│   │   └── seed.ts            # Database seeding script
│   └── lib/                   # Utility functions
│       ├── piston.ts          # Piston API integration
│       └── utils.ts           # Helper functions
├── public/                    # Static assets
└── drizzle.config.ts          # Drizzle ORM configuration
```

## Database Schema 📊

- **problems**: Coding problems with descriptions, test cases, and starter code
- **testCases**: Input/output test cases for each problem
- **submissions**: User code submissions with status and timestamps
- **solvedProblems**: Tracks which problems each user has solved
- **userStats**: User statistics including points and problems solved

## Features in Detail 🔍

### Problem Solving

- View problem descriptions with markdown formatting
- Write code in an integrated Monaco editor
- Select from multiple programming languages
- Run code and see detailed test results

### Points System

- Earn points by solving problems (10 points for Easy problems)
- Points are awarded only on first successful solve
- Track your total points and rank on the leaderboard

### Leaderboard

- Real-time rankings based on total points
- Displays user names, profile pictures, and email
- Special badges for top 3 users
- Shows problems solved count and total points

## Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx drizzle-kit push` - Push database schema changes
- `npx tsx src/db/seed.ts` - Seed database with problems

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Piston](https://github.com/engineer-man/piston) for code execution
- [Clerk](https://clerk.com) for authentication
- [shadcn/ui](https://ui.shadcn.com) for UI components
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for the code editor
