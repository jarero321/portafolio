import type { Command, CommandResult } from '@/types';
import { portfolio, asciiArt } from '@/data/portfolio';
import { registry } from './registry';

// Helper to format skill bar
function skillBar(level: number, width = 20): string {
  const filled = Math.round((level / 100) * width);
  const empty = width - filled;
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${level}%`;
}

// Helper to format table
function formatTable(headers: string[], rows: string[][]): string {
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => (r[i] || '').length))
  );

  const separator = colWidths.map(w => '─'.repeat(w + 2)).join('┼');
  const formatRow = (row: string[]) =>
    row.map((cell, i) => ` ${(cell || '').padEnd(colWidths[i])} `).join('│');

  return [
    formatRow(headers),
    separator,
    ...rows.map(formatRow),
  ].join('\n');
}

// Commands
const help: Command = {
  name: 'help',
  description: 'Show available commands',
  usage: 'help [command]',
  execute: (args) => {
    if (args[0]) {
      const cmd = registry.get(args[0]);
      if (cmd) {
        return {
          output: `${cmd.name} - ${cmd.description}\n${cmd.usage ? `Usage: ${cmd.usage}` : ''}`,
        };
      }
      return { output: `Unknown command: ${args[0]}`, isError: true };
    }

    const commands = registry.getAll();
    const lines = [
      '\x1b[1mAvailable Commands:\x1b[0m',
      '',
      ...commands.map(c => `  \x1b[36m${c.name.padEnd(12)}\x1b[0m ${c.description}`),
      '',
      'Type \x1b[36mhelp <command>\x1b[0m for more info',
    ];
    return { output: lines.join('\n') };
  },
};

const about: Command = {
  name: 'about',
  description: 'About me',
  execute: () => {
    const lines = [
      `\x1b[36m${asciiArt.logo}\x1b[0m`,
      '',
      `\x1b[1m${portfolio.name}\x1b[0m`,
      `\x1b[90m${portfolio.title}\x1b[0m`,
      '',
      portfolio.bio,
      '',
      `\x1b[90m📍 ${portfolio.location}\x1b[0m`,
    ];
    return { output: lines.join('\n') };
  },
};

const projects: Command = {
  name: 'projects',
  description: 'View my projects',
  usage: 'projects [--featured]',
  execute: (args) => {
    let items = portfolio.projects;

    if (args.includes('--featured')) {
      items = items.filter(p => p.featured);
    }

    const lines = [
      '\x1b[1mProjects:\x1b[0m',
      '',
    ];

    items.forEach(p => {
      lines.push(`\x1b[36m${p.name}\x1b[0m ${p.featured ? '⭐' : ''}`);
      lines.push(`  ${p.description}`);
      lines.push(`  \x1b[90mTech: ${p.tech.join(', ')}\x1b[0m`);
      if (p.github) lines.push(`  \x1b[90m🔗 ${p.github}\x1b[0m`);
      if (p.url) lines.push(`  \x1b[90m🌐 ${p.url}\x1b[0m`);
      lines.push('');
    });

    return { output: lines.join('\n') };
  },
};

const skills: Command = {
  name: 'skills',
  description: 'View my skills',
  usage: 'skills [--category=frontend|backend|tools|soft]',
  execute: (args) => {
    let items = portfolio.skills;
    const categoryFlag = args.find(a => a.startsWith('--category='));

    if (categoryFlag) {
      const category = categoryFlag.split('=')[1];
      items = items.filter(s => s.category === category);
    }

    const categories = ['frontend', 'backend', 'tools', 'soft'] as const;
    const lines: string[] = ['\x1b[1mSkills:\x1b[0m', ''];

    categories.forEach(cat => {
      const catSkills = items.filter(s => s.category === cat);
      if (catSkills.length === 0) return;

      const title = cat.charAt(0).toUpperCase() + cat.slice(1);
      lines.push(`\x1b[33m${title}:\x1b[0m`);
      catSkills.forEach(s => {
        lines.push(`  ${s.name.padEnd(16)} ${skillBar(s.level)}`);
      });
      lines.push('');
    });

    return { output: lines.join('\n') };
  },
};

const experience: Command = {
  name: 'experience',
  description: 'View my work experience',
  execute: () => {
    const lines = ['\x1b[1mExperience:\x1b[0m', ''];

    portfolio.experience.forEach((exp, i) => {
      const isLast = i === portfolio.experience.length - 1;
      const prefix = isLast ? '└' : '├';
      const line = isLast ? ' ' : '│';

      lines.push(`${prefix}─ \x1b[36m${exp.role}\x1b[0m @ \x1b[1m${exp.company}\x1b[0m`);
      lines.push(`${line}   \x1b[90m${exp.period}\x1b[0m`);
      lines.push(`${line}   ${exp.description}`);
      if (exp.tech) {
        lines.push(`${line}   \x1b[90mTech: ${exp.tech.join(', ')}\x1b[0m`);
      }
      lines.push(isLast ? '' : '│');
    });

    return { output: lines.join('\n') };
  },
};

const education: Command = {
  name: 'education',
  description: 'View my education',
  execute: () => {
    const lines = ['\x1b[1mEducation:\x1b[0m', ''];

    portfolio.education.forEach((edu, i) => {
      const isLast = i === portfolio.education.length - 1;
      const prefix = isLast ? '└' : '├';
      const line = isLast ? ' ' : '│';

      lines.push(`${prefix}─ \x1b[36m${edu.degree}\x1b[0m`);
      lines.push(`${line}   \x1b[1m${edu.institution}\x1b[0m`);
      lines.push(`${line}   \x1b[90m${edu.period}\x1b[0m`);
      if (edu.description) {
        lines.push(`${line}   ${edu.description}`);
      }
      lines.push(isLast ? '' : '│');
    });

    return { output: lines.join('\n') };
  },
};

const contact: Command = {
  name: 'contact',
  description: 'Get my contact info',
  execute: () => {
    const c = portfolio.contact;
    const lines = [
      '\x1b[1mContact:\x1b[0m',
      '',
      `  \x1b[36m📧 Email:\x1b[0m    ${c.email}`,
      c.github   ? `  \x1b[36m🐙 GitHub:\x1b[0m   ${c.github}` : '',
      c.linkedin ? `  \x1b[36m💼 LinkedIn:\x1b[0m ${c.linkedin}` : '',
      c.twitter  ? `  \x1b[36m🐦 Twitter:\x1b[0m  ${c.twitter}` : '',
      c.website  ? `  \x1b[36m🌐 Website:\x1b[0m  ${c.website}` : '',
    ].filter(Boolean);

    return { output: lines.join('\n') };
  },
};

const clear: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => ({ output: '', clear: true }),
};

const welcome: Command = {
  name: 'welcome',
  description: 'Show welcome message',
  execute: () => {
    const lines = [
      `\x1b[36m${asciiArt.logo}\x1b[0m`,
      '',
      `\x1b[1mWelcome to ${portfolio.name}'s Terminal Portfolio\x1b[0m`,
      '',
      `Type \x1b[36mhelp\x1b[0m to see available commands.`,
      '',
    ];
    return { output: lines.join('\n') };
  },
};

// Easter eggs
const coffee: Command = {
  name: 'coffee',
  description: 'Get some coffee',
  execute: () => ({ output: `\x1b[33m${asciiArt.coffee}\x1b[0m\nHere's a virtual coffee for you!` }),
};

const whoami: Command = {
  name: 'whoami',
  description: 'Who are you?',
  execute: () => ({ output: 'You are a curious visitor exploring this portfolio. Welcome!' }),
};

const sudo: Command = {
  name: 'sudo',
  description: 'Try to get root access',
  execute: () => ({ output: '\x1b[31mNice try! But you don\'t have permission here.\x1b[0m', isError: true }),
};

const exitCmd: Command = {
  name: 'exit',
  description: 'Exit the terminal',
  execute: () => ({ output: '\x1b[90mGoodbye! Thanks for visiting.\x1b[0m\n\n[Process completed]' }),
};

// Register all commands
[help, about, projects, skills, experience, education, contact, clear, welcome, coffee, whoami, sudo, exitCmd]
  .forEach(cmd => registry.register(cmd));

export { registry, parseCommand } from './registry';
export { parseCommand as parse } from './parser';
