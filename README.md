<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=180&section=header&text=Terminal%20Portfolio&fontSize=36&fontColor=fff&animation=fadeIn&fontAlignY=32" />

<div align="center">

![License](https://img.shields.io/github/license/jarero321/portafolio?style=for-the-badge)
![Commands](https://img.shields.io/badge/commands-58-7c3aed?style=for-the-badge)
![Languages](https://img.shields.io/badge/i18n-3%20languages-00d4ff?style=for-the-badge)

**CLI-style portfolio with 58 commands, ANSI colors, tab completion, i18n, and glassmorphism UI.**

<a href="https://jarero.dev">
  <img src="https://img.shields.io/badge/LIVE-FF5722?style=for-the-badge&logo=vercel&logoColor=white" alt="live" />
</a>
<a href="https://github.com/jarero321/portafolio">
  <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="code" />
</a>

[Commands](#commands) •
[How It Works](#how-it-works) •
[Quick Start](#quick-start) •
[Customization](#customization)

</div>

---

![Terminal Portfolio Hero](public/screenshots/terminal-hero.png)

## Features

| Feature | Description |
|:--------|:------------|
| **58 Commands** | Portfolio, Linux emulation, Easter eggs, and dev humor |
| **ANSI Colors** | 16-color parser with bold, dim, italic, underline support |
| **Tab Completion** | Common prefix matching across all registered commands |
| **Command History** | Up/Down arrows with 50 command buffer |
| **URL Auto-linking** | Detects and links GitHub, LinkedIn, npm URLs in output |
| **3 Languages** | English, Spanish, and Binary with live switching |
| **Glassmorphism UI** | `backdrop-filter: blur(40px)` + animated gradient border |
| **Typing Effect** | 8ms per line for realistic terminal output |

## Tech Stack

<div align="center">

**Languages & Frameworks**

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind&perline=8" alt="languages" />

**Infrastructure & Tools**

<img src="https://skillicons.dev/icons?i=vercel,nodejs,npm&perline=8" alt="infra" />

</div>

## Why I Built This

Traditional portfolios are boring. I wanted something that:

- Feels like an actual terminal session
- Has real commands with flags and arguments
- Parses ANSI escape codes for colors
- Supports tab completion and command history
- Works in 3 languages (including binary)

58 commands. One `index.tsx`.

---

## Demo

```
carlos@portfolio — bash

❯ help

  Portfolio        about, skills, projects, experience, education, contact
  System           ls, pwd, cat, echo, whoami, date, uptime, neofetch, top
  Fun              coffee, matrix, cowsay, fortune, hack
  Dev Humor        git, npm, docker, deploy, css, js, typescript

❯ skills --category=backend

  Node.js          ████████████████████░░  90  ★
  NestJS           █████████████████░░░░░  85  ★
  Go               ████████████████░░░░░░  80  ●
  C#/.NET          ██████████████░░░░░░░░  70  ○

❯ lang bin

  01001100 01100001 01101110 01100111 01110101 01100001 01100111 01100101
  01110011 01100101 01110100 00100000 01110100 01101111 00100000 01100010
```

---

## Commands

### Portfolio (9)

| Command | Description |
|:--------|:------------|
| `help [cmd]` | Show all commands or help for a specific command |
| `about` | Bio, specializations, leadership, and impact |
| `skills [--category=X]` | 82 skills across 8 categories with level bars |
| `projects [--featured]` | Portfolio projects with tech stack and links |
| `experience` | Work history (5 positions) |
| `education` | Academic background |
| `contact` | Email, GitHub, LinkedIn, website |
| `welcome` | Show welcome message |
| `clear` | Clear terminal |

<details>
<summary><strong>about</strong> — Bio, specializations, and impact</summary>

![Terminal About](public/screenshots/terminal-about.png)

</details>

<details>
<summary><strong>skills</strong> — 82 skills across 8 categories</summary>

![Terminal Skills](public/screenshots/terminal-skills.png)

Categories: `frontend`, `backend`, `testing`, `architecture`, `cloud`, `database`, `tools`, `soft`

</details>

<details>
<summary><strong>projects --featured</strong> — Featured projects with links</summary>

![Terminal Projects](public/screenshots/terminal-projects.png)

</details>

### Linux (23)

| Command | Description |
|:--------|:------------|
| `ls [-a]`, `pwd`, `cd` | File system navigation |
| `cat`, `echo`, `whoami` | Standard utilities |
| `date`, `uptime`, `history` | System info |
| `neofetch`, `top`, `htop` | System monitors |
| `ping`, `curl` | Network tools |
| `vim`, `nano`, `grep` | Editors & search |
| `sudo`, `rm`, `mkdir`, `touch`, `man`, `exit` | Admin & file ops |

### Fun (9)

| Command | Description |
|:--------|:------------|
| `coffee` | Virtual coffee break with ASCII art |
| `matrix` | Enter the Matrix |
| `cowsay [msg]` | ASCII cow says your message |
| `fortune` | Random dev wisdom |
| `hack` | Fake hacking sequence |
| `sl` | Steam locomotive (classic typo) |
| `hello`, `hi`, `lol` | Greetings |

### Dev Humor (15)

| Command | Description |
|:--------|:------------|
| `git`, `npm`, `docker` | Tool jokes |
| `deploy`, `production` | Deployment humor |
| `css`, `js`, `typescript` | Language jokes |
| `regex`, `debug`, `error` | Dev pain |
| `stackoverflow`, `chatgpt`, `leetcode`, `meeting` | Culture jokes |

### Language (2)

| Command | Description |
|:--------|:------------|
| `lang [en\|es\|bin]` | Switch language (English, Spanish, Binary) |
| `language` | Alias for `lang` |

---

## How It Works

### Terminal Architecture

```
src/
├── components/Terminal/     # UI layer
│   ├── Terminal.tsx          # Container with auto-scroll
│   ├── TerminalHeader.tsx   # macOS-style title bar (3 dots)
│   ├── TerminalInput.tsx    # Input with ❯ prompt, auto-focus
│   └── TerminalLine.tsx     # ANSI parser + URL auto-linker
├── lib/
│   ├── commands/            # 58 commands in 5 modules
│   │   ├── registry.ts      # Command registry (Map-based)
│   │   ├── parser.ts        # Tokenizer + flag parser
│   │   ├── main.ts          # Portfolio commands (9)
│   │   ├── linux.ts         # Linux commands (23)
│   │   ├── fun.ts           # Easter eggs (9)
│   │   ├── devJokes.ts      # Dev humor (15)
│   │   └── language.ts      # i18n switcher (2)
│   ├── hooks/useTerminal.ts # State: history, input, execution
│   └── i18n.ts              # 3 languages, 50+ keys, pub/sub
├── data/portfolio.ts        # All portfolio data lives here
└── app/[locale]/            # Next.js App Router with i18n
```

### Key Implementation Details

| Feature | How |
|:--------|:----|
| **ANSI Colors** | Regex parser for 16 colors + bold, dim, italic, underline |
| **Tab Completion** | Common prefix matching across all registered commands |
| **Command History** | Up/Down arrows, 50 command buffer |
| **URL Detection** | Auto-links GitHub, LinkedIn, npm URLs in output |
| **Typing Effect** | 8ms per line for outputs >100 chars |
| **Thinking Delay** | 300-600ms fake processing for realism |
| **Glassmorphism** | `backdrop-filter: blur(40px)` + animated gradient border |
| **3 Languages** | English, Spanish, Binary (01001...) with live switching |

### Keyboard Shortcuts

| Key | Action |
|:----|:-------|
| `Tab` | Auto-complete command |
| `↑` / `↓` | Navigate command history |
| `Ctrl+L` | Clear terminal |
| `Ctrl+C` | Cancel current input |
| `Enter` | Execute command |

---

## Quick Start

```bash
git clone https://github.com/jarero321/portafolio.git
cd portafolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Customization

### Edit Your Data

All content lives in `src/data/portfolio.ts`:

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

---

## Scripts

| Script | Description |
|:-------|:------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run screenshots` | Generate screenshots with Playwright |

---

## Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jarero321/portafolio)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**[Report Bug](https://github.com/jarero321/portafolio/issues)** · **[Request Feature](https://github.com/jarero321/portafolio/issues)**

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=120&section=footer" />
