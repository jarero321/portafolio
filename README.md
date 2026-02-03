<div align="center">

# Terminal Portfolio

![Next.js](https://img.shields.io/badge/Next.js_16-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

**Interactive terminal-style portfolio with 20+ commands, i18n support, and glassmorphism UI.**

[Live Demo](https://jarero.dev) · [Features](#features) · [Commands](#commands) · [Customization](#customization)

</div>

---

## Features

| Feature | Description |
|---------|-------------|
| **Terminal UI** | Authentic terminal experience with typing effects |
| **20+ Commands** | `about`, `skills`, `projects`, `experience`, and easter eggs |
| **i18n Support** | English, Spanish, and Binary language modes |
| **Glassmorphism** | macOS-inspired design with blur effects |
| **Responsive** | Optimized for desktop and mobile |
| **Keyboard Shortcuts** | Tab completion, history navigation, Ctrl+L/C |

## Commands

### Portfolio Commands

| Command | Description |
|---------|-------------|
| `help` | Show available commands |
| `about` | Personal info and bio |
| `skills` | Technical skills with categories |
| `projects` | Portfolio projects |
| `experience` | Work history |
| `education` | Academic background |
| `contact` | Contact information |

### System Commands

| Command | Description |
|---------|-------------|
| `clear` | Clear terminal |
| `lang [en\|es\|bin]` | Change language |
| `ls`, `pwd`, `whoami` | Linux-style commands |

### Easter Eggs

| Command | Description |
|---------|-------------|
| `coffee` | Virtual coffee |
| `matrix` | Enter the Matrix |
| `cowsay [msg]` | ASCII cow |
| `fortune` | Random dev wisdom |
| `joke` | Dev jokes |

## Quick Start

```bash
# Clone
git clone https://github.com/jarero321/portafolio.git
cd portafolio

# Install
pnpm install

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/[locale]/        # Next.js App Router + i18n
├── components/Terminal/ # Terminal UI components
├── lib/
│   ├── commands/        # Command implementations
│   │   ├── main.ts      # Core commands
│   │   ├── linux.ts     # Linux commands
│   │   └── fun.ts       # Easter eggs
│   ├── hooks/           # useTerminal hook
│   └── i18n.ts          # Translations
├── data/portfolio.ts    # Your data here
└── types/               # TypeScript types
```

## Customization

### Edit Your Data

Update `src/data/portfolio.ts`:

```typescript
export const portfolio = {
  name: 'Your Name',
  title: 'Your Title',
  bio: 'Your bio...',

  skills: [
    { name: 'TypeScript', level: 90, category: 'frontend' }
  ],

  projects: [
    { name: 'Project', description: '...', tech: ['Next.js'], featured: true }
  ],

  experience: [
    { company: 'Company', role: 'Role', period: '2024', description: '...' }
  ]
}
```

### Add Custom Commands

Create `src/lib/commands/custom.ts`:

```typescript
import { registry } from './registry';

registry.register({
  name: 'hello',
  description: 'Say hello',
  execute: () => ({ output: 'Hello, World!' })
});
```

Import in `src/lib/commands/index.ts`.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Font**: Geist Mono

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jarero321/portafolio)

## License

MIT

---

<div align="center">

**Built with Next.js and a terminal mindset**

</div>
