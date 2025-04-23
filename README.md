# Stratum

Stratum is a **community-driven learning platform** where users (with help from the AI assistant **Spark**) can generate, fork, and refine actionable tech guides.

---

## ✨ Features (MVP)

- **AI-assisted guide creation** – Spark asks clarifying questions and drafts **Overview → Architecture → Steps → Notes**.
- **Section-aware suggestions** – AI outputs land in the correct tab via Model-Context-Protocol (MCP) tools.
- **Markdown editor** – Edit / Preview modes with smart focus toggle.
- **Authentication via Clerk** – Secure sign-in/sign-up and user management.
- **Supabase backend** – PostgreSQL + Auth with row-level security.
- **Instant deploy** – Runs on Vercel; AI streaming via Vercel AI SDK.

---

## 🛠 Tech Stack

| Layer    | Tech                                             |
| -------- | ------------------------------------------------ |
| Frontend | Next.js (App Router) · TypeScript · Tailwind CSS |
| AI       | Vercel AI SDK · GPT-4.1-mini (Spark)             |
| Auth     | Clerk                                            |
| Backend  | Supabase (PostgreSQL + Auth)                     |
| State    | Zustand                                          |
| Styling  | ShadCN UI                                        |

---

## Local Setup

```bash
# 1. Clone & install
git clone https://github.com/your-handle/stratum.git
cd stratum
bun install

# 2. Add environment variables to .env.local
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# OPENAI_API_KEY=...

# 3. Run dev server
bun dev
```

## 📅 Roadmap

### ✏️ Granular section edits

- Update or replace individual paragraphs / list items
- Inline diff view with **accept / reject** controls
- Per-guide **undo / redo** history

### 🖼️ Multimedia blocks

- Embed videos, images, diagrams
- Extended markdown shortcodes or block-based content

### 🤝 Real-time collaboration

- Live cursors & presence indicators
- Inline comments and suggestions

### 🌐 Public guide gallery

- Browse, search, and up-vote community guides
- One-click fork into your workspace

### 📱 Mobile-friendly UI

- Responsive layouts for small screens
- Touch-optimized editor controls

## License & Attribution

_Stratum_ is licensed under **Apache 2.0**.  
Derivative works must retain the accompanying **NOTICE** file to acknowledge the original author.
