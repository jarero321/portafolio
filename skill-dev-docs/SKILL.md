---
name: dev-docs
description: Generate visually compelling README files using capsule-render headers, skillicons.dev tech stacks, for-the-badge action badges, and HTML showcase grids. Automatically commits, pushes, and creates PRs.
license: MIT
metadata:
  author: carlos
  version: "2.0.0"
  tags:
    - documentation
    - readme
    - badges
    - markdown
    - developer-experience
    - visual
---

# Dev Docs Skill

Generate visually compelling, developer-friendly README files using modern visual tools. Every generated README should look polished on GitHub out of the box.

## Commands

### /docs readme

Analyze the current project and generate a visual-first README.md:

1. **Detect project type** — Use the decision table below
2. **Generate README** — Using the visual toolkit and structure template
3. **Commit & push** — Follow the post-generation workflow

### /docs readme --profile

Generate a GitHub profile README (for `username/username` repos).

---

## Step 1: Project Detection Rules

Before generating, identify the project type and apply the correct elements:

| Project Type | Detect By | Header | Status Badges | Tech Stack | Install | API Ref | Showcase Grid |
|:------------|:----------|:------:|:-------------:|:----------:|:-------:|:-------:|:-------------:|
| **npm library** | `package.json` with `main`/`exports` | capsule-render | npm version, build, license | skillicons | `npm install` | Yes | No |
| **CLI tool** | `package.json` with `bin` | capsule-render | npm version, build | skillicons | `npx` command | No | No |
| **API/Backend** | `src/main.ts`, Dockerfile, routes | capsule-render | build, coverage, license | skillicons | docker/npm | Yes | No |
| **Monorepo** | `packages/` or `apps/` dir, workspaces | capsule-render | build, license | skillicons | Per-package | No | Yes |
| **GitHub Profile** | Repo name matches username | SVG/figlet | for-the-badge social | skillicons | N/A | No | Yes |
| **Frontend app** | `index.html`, framework config | capsule-render | build, license | skillicons | `npm run dev` | No | No |

**Rule**: If unsure, default to **npm library** style.

---

## Step 2: Visual Toolkit Reference

Use these services — never fall back to plain text when a visual equivalent exists.

### capsule-render — Wave Headers & Footers

Use for ALL project types except GitHub Profile (which uses custom SVG/figlet).

**Header** (place at very top of README):
```html
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=180&section=header&text=Project%20Name&fontSize=36&fontColor=fff&animation=fadeIn&fontAlignY=32" />
```

**Footer** (place at very bottom of README):
```html
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=120&section=footer" />
```

**Parameters to customize**:
- `text=` — URL-encoded project name
- `fontSize=` — 36 for projects, 42 for profiles
- `customColorList=` — keep `0,2,5,30` for consistency
- `height=` — 180 for header, 120 for footer

### skillicons.dev — Tech Stack Icons

**ALWAYS** use this instead of individual shields.io tech badges.

```html
<img src="https://skillicons.dev/icons?i=ts,nodejs,nestjs,docker&perline=8" alt="tech stack" />
```

Common icon IDs: `ts`, `js`, `go`, `rust`, `python`, `cs`, `java`, `nodejs`, `nestjs`, `react`, `nextjs`, `vue`, `angular`, `svelte`, `docker`, `kubernetes`, `aws`, `gcp`, `azure`, `postgres`, `mongodb`, `redis`, `kafka`, `graphql`, `tailwind`, `sass`, `linux`, `git`, `githubactions`, `figma`, `vscode`

**Rules**:
- Max 8 icons per line (`perline=8`)
- Group by category: Languages & Frameworks, Infrastructure & Tools
- Only include technologies actually used in the project

### shields.io — Status & Action Badges

**ALWAYS use `style=for-the-badge`** for action badges (CODE, LIVE, DOCS, npm links).

**Action badges** (link to repo/npm/live site):
```html
<a href="https://github.com/{owner}/{repo}">
  <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="code" />
</a>
<a href="https://www.npmjs.com/package/{package}">
  <img src="https://img.shields.io/npm/v/{package}?style=for-the-badge&color=CB3837&logo=npm&logoColor=white" alt="npm" />
</a>
<a href="{live-url}">
  <img src="https://img.shields.io/badge/LIVE-FF5722?style=for-the-badge&logo=vercel&logoColor=white" alt="live" />
</a>
```

**Status badges** (build, coverage, license — place below header):
```markdown
![Build](https://img.shields.io/github/actions/workflow/status/{owner}/{repo}/{workflow}.yml?branch=main&style=for-the-badge)
![npm](https://img.shields.io/npm/v/{package}?style=for-the-badge)
![License](https://img.shields.io/github/license/{owner}/{repo}?style=for-the-badge)
```

### readme-typing-svg — Animated Taglines (Profile READMEs ONLY)

```html
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=70A5FD&center=true&vCenter=true&width=435&lines=First+tagline;Second+tagline;Third+tagline" alt="typing" />
</a>
```

### komarev.com — Profile View Counter (Profile READMEs ONLY)

```markdown
![Views](https://komarev.com/ghpvc/?username={username}&color=70A5FD&style=for-the-badge&label=PROFILE+VIEWS)
```

---

## Step 3: README Structure Template

Use this structure for all project types. Omit sections that don't apply (see detection table).

````markdown
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=180&section=header&text={Project%20Name}&fontSize=36&fontColor=fff&animation=fadeIn&fontAlignY=32" />

<div align="center">

![Build](https://img.shields.io/github/actions/workflow/status/{owner}/{repo}/{workflow}.yml?branch=main&style=for-the-badge)
![npm](https://img.shields.io/npm/v/{package}?style=for-the-badge)
![License](https://img.shields.io/github/license/{owner}/{repo}?style=for-the-badge)

**Short, compelling one-line description of what this project does.**

[Getting Started](#getting-started) •
[Usage](#usage) •
[API Reference](#api-reference) •
[Contributing](#contributing)

</div>

---

## Features

| Feature | Description |
|:--------|:------------|
| **Feature 1** | What it does |
| **Feature 2** | What it does |
| **Feature 3** | What it does |

## Tech Stack

<div align="center">

**Languages & Frameworks**

<img src="https://skillicons.dev/icons?i=ts,nestjs,react&perline=8" alt="languages" />

**Infrastructure & Tools**

<img src="https://skillicons.dev/icons?i=docker,postgres,githubactions&perline=8" alt="infra" />

</div>

## Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
npm install {package}
```

## Usage

```typescript
import { example } from '{package}';

const result = example();
```

## API Reference

| Endpoint | Method | Description |
|:---------|:------:|:------------|
| `/api/resource` | GET | Get all resources |
| `/api/resource/:id` | GET | Get resource by ID |
| `/api/resource` | POST | Create new resource |

## Configuration

| Variable | Description | Default |
|:---------|:------------|:--------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=120&section=footer" />
````

---

## Step 4: Project Showcase Grid (Monorepo & Profile READMEs)

Use HTML `<table>` with 2 columns. Each cell includes: project name, description, action badges, and tech icons.

```html
<table>
<tr>
  <td width="50%">
    <h3 align="center">Project Name</h3>
    <div align="center">
      <p>Short description of the project</p>
      <a href="https://github.com/{owner}/{repo}/tree/main/{path}">
        <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="code" />
      </a>
      <a href="https://www.npmjs.com/package/{package}">
        <img src="https://img.shields.io/npm/v/{package}?style=for-the-badge&color=CB3837&logo=npm&logoColor=white" alt="npm" />
      </a>
      <br><br>
      <img src="https://skillicons.dev/icons?i=ts,nodejs" alt="tech" />
    </div>
  </td>
  <td width="50%">
    <h3 align="center">Another Project</h3>
    <div align="center">
      <p>Short description</p>
      <a href="https://github.com/{owner}/{repo}/tree/main/{path}">
        <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" alt="code" />
      </a>
      <br><br>
      <img src="https://skillicons.dev/icons?i=go" alt="tech" />
    </div>
  </td>
</tr>
</table>
```

**Rules**:
- Always 2 columns per row (`width="50%"`)
- If odd number of projects, leave last cell empty or span full width
- Include CODE badge for every project
- Include npm badge only if published to npm
- Include LIVE badge only if there's a deployed URL
- Tech icons should reflect only that specific project's stack

---

## Step 5: Post-Generation — Commit & PR Automation

After generating or updating the README, **always** execute the following workflow:

### 1. Commit the changes

```bash
git add README.md
git commit -m "docs: format README with dev-docs visual style"
```

### 2. Detect branching strategy

Check if the repo uses Git Flow (has a `develop` branch) or pushes directly to `main`:

```bash
git branch -a | grep -q develop
```

### 3. Push and create PR

**If Git Flow (develop branch exists):**
- Push to current branch (usually `develop`)
- Create a PR from `develop` → `main` using `gh`:

```bash
git push
gh pr create --base main --head develop --title "docs: update README with dev-docs visual format" --body "$(cat <<'EOF'
## Summary
- Formatted README with dev-docs visual style (capsule-render, skillicons, for-the-badge)

## Test plan
- [ ] CI passes
- [ ] README renders correctly on GitHub
EOF
)"
```

**If single branch (main only):**
- Push directly to `main`:

```bash
git push
```

### 4. Verify CI status

After pushing, use the MCP `repo_check_ci` tool to verify the CI pipeline was triggered:

```
mcp__repo-monitor__repo_check_ci(repo: "owner/repo")
```

Report the CI status and PR URL back to the user.

---

## Best Practices

1. **Visual first** — Use capsule-render headers, skillicons tech stacks, and for-the-badge action badges. Never use plain text where a visual exists.
2. **Center the hero** — The header, badges, tagline, and nav links must be inside `<div align="center">`.
3. **Keep badges relevant** — 3-5 status badges max. Only show badges that provide real info (build status, npm version, license).
4. **Use real data** — Replace ALL placeholders (`{owner}`, `{repo}`, `{package}`) with actual project values.
5. **Tables over lists** — Use tables for features, config, API endpoints, and commands.
6. **Include code examples** — Real, working examples from the actual codebase.
7. **Tech stack must be visual** — Always use `skillicons.dev` icons grouped by category, never plain text lists.
8. **Consistent color scheme** — Use `customColorList=0,2,5,30` for capsule-render across all projects.

---

## Good vs Bad Examples

### Tech Stack

```
✅ Good:
<img src="https://skillicons.dev/icons?i=ts,react,nodejs,docker" />

❌ Bad:
Built with TypeScript, React, Node.js, and Docker
```

### Action Badges

```
✅ Good:
<a href="https://github.com/user/repo">
  <img src="https://img.shields.io/badge/CODE-2ea44f?style=for-the-badge&logo=github&logoColor=white" />
</a>

❌ Bad:
[View source code](https://github.com/user/repo)
```

### Header

```
✅ Good:
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,5,30&height=180&section=header&text=My%20Project&fontSize=36&fontColor=fff&animation=fadeIn&fontAlignY=32" />

❌ Bad:
# My Project
```

### Layout

```
✅ Good:
<div align="center">
  <img src="badges..." />
  <p><strong>Tagline here</strong></p>
</div>

❌ Bad:
![badge1] ![badge2] ![badge3]
Some description here
```

### Badge Style

```
✅ Good:
![License](https://img.shields.io/github/license/user/repo?style=for-the-badge)

❌ Bad:
![License](https://img.shields.io/github/license/user/repo)
```
