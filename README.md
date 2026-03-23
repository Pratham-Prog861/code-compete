# CodeCompete 🏆

A modern competitive coding platform for mastering algorithmic problem-solving. Built with Next.js 16, featuring real-time code execution, 25+ curated problems, and global leaderboards.

## Features ✨

### Core Functionality

- **25+ Curated Problems** - From Easy to Hard difficulty levels
- **Real-Time Code Execution** - Powered by Piston API with instant feedback
- **Multi-Language Support** - Write in JavaScript and Python
- **Smart Test Validation** - Per-problem comparison rules (strict, unordered, numeric tolerance)
- **Hidden Test Cases** - Problems include hidden tests for fair evaluation

### Progress & Competition

- **Points System** - Earn points on first solve (10-20 points per problem)
- **Global Leaderboards** - Compete with developers worldwide
- **Profile Dashboard** - Track your submissions, solved problems, and language stats
- **Problem Status** - Visual indicators for Solved/Attempted/Unsolved

### Security & Performance

- **Rate Limiting** - 10 requests per minute per user on submissions
- **Input Sanitization** - DOMPurify for safe markdown rendering
- **Request Validation** - Zod schema validation with size limits
- **Database Transactions** - Atomic solve + points updates
- **Composite Unique Constraints** - Prevent duplicate solves

### Design System

- **Dark Theme** - Elegant dark UI with cyan accent colors
- **Responsive Design** - Mobile-first approach with tabs on smaller screens
- **Typography** - Custom display font (Syne) + body font (Instrument Sans)
- **Animations** - Skeleton loaders, staggered reveals, hover effects
- **Accessibility** - Focus states, reduced motion support

## Tech Stack 🛠️

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Database | PostgreSQL (Neon Serverless) |
| ORM | Drizzle ORM |
| Authentication | Clerk |
| Code Editor | Monaco Editor |
| Code Execution | Piston API |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui, Radix UI |
| Markdown | react-markdown + DOMPurify |
| Validation | Zod |
| Rate Limiting | rate-limiter-flexible |

## Getting Started 🚀

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### Environment Setup

1. Clone and install:

```bash
git clone https://github.com/Pratham-Prog861/code-compete.git
cd code-compete
npm install
```

2. Create `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

3. Initialize database:

```bash
npm run db:push
npm run db:seed
```

4. Run development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Available Scripts 📝

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to database |
| `npm run db:seed` | Seed database with problems |

## Project Structure 📁

```bash
code-compete/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/submit/        # Code submission API
│   │   ├── leaderboard/        # Global rankings page
│   │   ├── problems/           # Problems list & detail
│   │   ├── profile/            # User dashboard
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── navbar.tsx          # Navigation
│   │   ├── code-editor.tsx     # Monaco editor
│   │   └── ui/                # shadcn/ui components
│   ├── db/
│   │   ├── schema.ts           # Drizzle schema
│   │   ├── index.ts           # Database connection
│   │   └── seed.ts            # Problem seeder
│   ├── lib/
│   │   ├── piston.ts           # Code execution client
│   │   └── utils.ts           # Utilities
│   └── types/
│       └── index.ts            # Shared TypeScript types
├── drizzle.config.ts
└── package.json
```

## Database Schema 📊

### Tables

- **problems** - Title, description, difficulty, starter code, function params, comparison rules
- **testCases** - Input, expected output, hidden flag
- **submissions** - User submissions with status (AC/WA/RE/CE/TLE)
- **solvedProblems** - Tracks unique solves per user
- **userStats** - Total points, problems solved, timestamps

### Comparison Rules

Each problem has a `comparisonRule`:

- `strict` - Exact match required
- `unordered` - Array results can be in any order
- `numeric` - Floating point tolerance (1e-3)

## API Endpoints 🔌

### POST /api/submit

Submit code for evaluation.

**Request:**

```json
{
  "problemId": 1,
  "code": "function twoSum(nums, target) { ... }",
  "language": "javascript"
}
```

**Response:**

```json
{
  "status": "AC",
  "output": "",
  "testResults": [...],
  "isFirstSolve": true,
  "pointsEarned": 10
}
```

## Problem Difficulty & Points

| Difficulty | Points | Example |
|------------|--------|---------|
| Easy | 10 | Two Sum, Palindrome, Binary Search |
| Medium | 20 | Maximum Subarray, 3Sum, Merge Intervals |
| Hard | 30 | (Future problems) |

## Design Tokens 🎨

### Colors

- Background: `#0a0a0b`
- Primary Accent: `#06b6d4` (Cyan)
- Easy: `#10b981` (Emerald)
- Medium: `#f59e0b` (Amber)
- Hard: `#ef4444` (Red)

### Typography

- Display: Syne (headings)
- Body: Instrument Sans
- Code: JetBrains Mono

## Contributing 🤝

Contributions welcome! Please submit issues and pull requests.

## License 📄

MIT License - See [LICENSE](LICENSE) file.

## Acknowledgments 🙏

- [Piston](https://github.com/engineer-man/piston) - Code execution engine
- [Clerk](https://clerk.com) - Authentication
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
