<div align="center">

# Terminal Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/github/license/jarero321/portafolio)

**An interactive terminal-style portfolio with Apple-inspired design, command system, and multilingual support.**

[Features](#features) •
[Demo](#demo) •
[Installation](#installation) •
[Commands](#commands) •
[Customization](#customization)

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **Interactive Terminal** | Fully functional terminal with command parsing, history, and autocompletion |
| **Apple-Inspired Design** | Glassmorphism, macOS-style window controls, and premium aesthetics |
| **Command System** | Extensible registry supporting flags, arguments, and quoted strings |
| **Multilingual** | English, Spanish, and Binary (ASCII) language support |
| **Typewriter Effect** | Animated role titles with smooth transitions |
| **Keyboard Shortcuts** | Tab completion, Ctrl+L (clear), Ctrl+C (cancel), Arrow keys (history) |

## Demo

```
~/portfolio > main $ help

Available commands:
  help        Show available commands
  about       Display developer bio and ASCII logo
  projects    List projects (--featured for highlights)
  skills      Show skills by category (--category=frontend|backend|tools|soft)
  experience  Display work history in tree view
  education   Show academic background
  contact     Display contact information
  clear       Clear terminal screen

Fun commands:
  coffee      ASCII coffee art
  matrix      The Matrix quote
  cowsay      Speaking cow ASCII art
  fortune     Random developer wisdom
```

## Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

```bash
# Clone the repository
git clone https://github.com/jarero321/portafolio.git
cd portafolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

### Terminal Commands

| Command | Description | Example |
|---------|-------------|---------|
| `help` | List all available commands | `help` |
| `about` | Show developer bio | `about` |
| `projects` | List all projects | `projects --featured` |
| `skills` | Display skills | `skills --category=frontend` |
| `experience` | Work history | `experience` |
| `education` | Academic background | `education` |
| `contact` | Contact information | `contact` |
| `lang` | Change language | `lang es` |
| `clear` | Clear terminal | `clear` |
| `ls` | List files (simulated) | `ls -a` |
| `pwd` | Print working directory | `pwd` |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   └── [locale]/           # Dynamic locale routing
├── components/Terminal/    # Terminal UI components
│   ├── Terminal.tsx        # Main container
│   ├── TerminalInput.tsx   # Command input with prompt
│   ├── TerminalLine.tsx    # Output line with ANSI support
│   └── TerminalHeader.tsx  # macOS-style header
├── lib/
│   ├── commands/           # Command implementations
│   │   ├── registry.ts     # Command registry
│   │   ├── main.ts         # Core commands
│   │   ├── linux.ts        # Simulated Linux commands
│   │   └── fun.ts          # Easter egg commands
│   └── hooks/              # Custom React hooks
│       ├── useTerminal.ts  # Terminal orchestration
│       └── useTypewriter.ts # Typing animation
├── data/portfolio.ts       # Portfolio content
├── styles/                 # Modular CSS
└── types/                  # TypeScript interfaces
```

## Customization

### Updating Portfolio Data

Edit `src/data/portfolio.ts` to update your information:

```typescript
export const portfolio = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your bio...",
  contact: {
    email: "your@email.com",
    github: "yourusername",
    linkedin: "yourprofile"
  },
  skills: [
    { name: "TypeScript", level: 90, category: "frontend" }
  ],
  projects: [
    { name: "Project", description: "...", tech: ["Next.js"], featured: true }
  ]
}
```

### Adding New Commands

Create a new command in `src/lib/commands/`:

```typescript
import { registry } from './registry';

registry.register({
  name: 'mycommand',
  description: 'My custom command',
  execute: async (args) => ({
    output: 'Hello from my command!'
  })
});
```

### Supported Languages

| Code | Language | Description |
|------|----------|-------------|
| `en` | English | Default language |
| `es` | Español | Spanish translation |
| `bin` | Binary | ASCII binary encoding |

Change language via the terminal with `lang <code>` or using the header buttons.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI**: [React 19](https://react.dev/) with Server Components
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Font**: [Geist Mono](https://vercel.com/font)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jarero321/portafolio)

### Manual Deployment

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with Next.js and a terminal mindset**

</div>
