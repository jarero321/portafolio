import type { Command } from '@/types';
import { portfolio, asciiArt } from '@/data/portfolio';
import { t } from '@/lib/i18n';
import { about, contact } from './main';

export const ls: Command = {
  name: 'ls',
  description: 'List directory contents',
  execute: (args) => {
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const files = [
      { name: 'about.md', color: '37' },
      { name: 'projects/', color: '34' },
      { name: 'skills.json', color: '33' },
      { name: 'experience.log', color: '37' },
      { name: 'contact.txt', color: '37' },
    ];
    const hidden = [
      { name: '.secrets', color: '90' },
      { name: '.coffee_addiction', color: '90' },
      { name: '.vim_config', color: '90' },
    ];

    const items = showAll ? [...hidden, ...files] : files;
    const output = items.map(f => `\x1b[${f.color}m${f.name}\x1b[0m`).join('  ');
    return { output };
  },
};

export const pwd: Command = {
  name: 'pwd',
  description: 'Print working directory',
  execute: () => ({ output: '/home/visitor/carlos-portfolio' }),
};

export const cd: Command = {
  name: 'cd',
  description: 'Change directory',
  execute: (args) => {
    if (!args[0] || args[0] === '~') {
      return { output: '\x1b[90m~\x1b[0m Welcome home!' };
    }
    if (args[0] === '..') {
      return { output: '\x1b[31mPermission denied:\x1b[0m You cannot leave this portfolio 😄' };
    }
    if (args[0] === 'projects' || args[0] === 'projects/') {
      return { output: '\x1b[90mEntering projects...\x1b[0m\nTry: \x1b[36mprojects\x1b[0m command instead!' };
    }
    return { output: `\x1b[31mcd:\x1b[0m ${args[0]}: No such directory` };
  },
};

export const cat: Command = {
  name: 'cat',
  description: 'Concatenate and print files',
  execute: (args) => {
    if (!args[0]) {
      return { output: '\x1b[31mcat:\x1b[0m missing file operand' };
    }
    const file = args[0].toLowerCase();
    if (file === 'about.md' || file === 'about') {
      return about.execute([]);
    }
    if (file === 'contact.txt' || file === 'contact') {
      return contact.execute([]);
    }
    if (file === 'skills.json' || file === 'skills') {
      return { output: '{\n  "hint": "Try the \'skills\' command for a better view!"\n}' };
    }
    if (file === '.secrets') {
      return { output: '\x1b[35m🔮 The secret is... there is no secret. Just hard work.\x1b[0m' };
    }
    if (file === '.coffee_addiction') {
      return { output: `${asciiArt.coffee}\n\x1b[33mCoffee consumed today: ∞\x1b[0m` };
    }
    return { output: `\x1b[31mcat:\x1b[0m ${args[0]}: No such file` };
  },
};

export const echo: Command = {
  name: 'echo',
  description: 'Display a line of text',
  execute: (args) => {
    if (args.length === 0) return { output: '' };
    const text = args.join(' ');
    if (text.includes('$USER') || text.includes('$user')) {
      return { output: text.replace(/\$USER|\$user/gi, 'visitor') };
    }
    if (text.includes('$HOME') || text.includes('$home')) {
      return { output: text.replace(/\$HOME|\$home/gi, '/home/visitor') };
    }
    return { output: text };
  },
};

export const whoami: Command = {
  name: 'whoami',
  description: 'Print current user',
  execute: () => ({ output: 'visitor\n\x1b[90m(But the real question is... who are you really? 🤔)\x1b[0m' }),
};

export const date: Command = {
  name: 'date',
  description: 'Print current date and time',
  execute: () => {
    const now = new Date();
    return { output: now.toString() };
  },
};

export const uptime: Command = {
  name: 'uptime',
  description: 'Show system uptime',
  execute: () => {
    const start = new Date('2024-01-01');
    const now = new Date();
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { output: `\x1b[32m${days} days\x1b[0m of coding, learning, and building cool stuff` };
  },
};

export const sudo: Command = {
  name: 'sudo',
  description: 'Execute as superuser',
  execute: (args) => {
    if (args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
      return { output: '\x1b[31m🚨 Nice try!\x1b[0m This portfolio is protected by plot armor.' };
    }
    if (args[0] === 'hire') {
      return { output: '\x1b[32m✨ sudo hire accepted!\x1b[0m\nSending carrier pigeon with resume... 🐦' };
    }
    if (args[0] === 'make' && args[1] === 'me' && args[2] === 'a' && args[3] === 'sandwich') {
      return { output: '\x1b[33m🥪 Here\'s your sandwich. You\'re welcome.\x1b[0m' };
    }
    return { output: '\x1b[31mvisitor is not in the sudoers file.\x1b[0m This incident will be reported. 📝' };
  },
};

export const rm: Command = {
  name: 'rm',
  description: 'Remove files',
  execute: (args) => {
    if (args.includes('-rf') && (args.includes('/') || args.includes('/*'))) {
      return { output: '\x1b[31m🛡️ System protected.\x1b[0m Nice try though!' };
    }
    return { output: '\x1b[33mRead-only filesystem.\x1b[0m This portfolio is immutable!' };
  },
};

export const mkdir: Command = {
  name: 'mkdir',
  description: 'Make directories',
  execute: () => ({ output: '\x1b[33mRead-only filesystem.\x1b[0m But I appreciate the creativity!' }),
};

export const touch: Command = {
  name: 'touch',
  description: 'Create empty files',
  execute: () => ({ output: '\x1b[33mRead-only filesystem.\x1b[0m Try touching grass instead 🌱' }),
};

export const man: Command = {
  name: 'man',
  description: 'Manual pages',
  execute: (args) => {
    if (!args[0]) {
      return { output: 'What manual page do you want?\nTry: \x1b[36mman life\x1b[0m' };
    }
    if (args[0] === 'life') {
      return {
        output: [
          '\x1b[1mLIFE(1)                   Developer Manual                   LIFE(1)\x1b[0m',
          '',
          '\x1b[1mNAME\x1b[0m',
          '       life - the ultimate debugging challenge',
          '',
          '\x1b[1mSYNOPSIS\x1b[0m',
          '       life [--coffee] [--code] [--repeat]',
          '',
          '\x1b[1mDESCRIPTION\x1b[0m',
          '       A continuous process of learning, failing, and growing.',
          '       Side effects may include coffee consumption.',
          '',
          '\x1b[1mBUGS\x1b[0m',
          '       Too many to list. We ship anyway.',
        ].join('\n'),
      };
    }
    return { output: `No manual entry for ${args[0]}` };
  },
};

export const history: Command = {
  name: 'history',
  description: 'Command history',
  execute: () => ({
    output: [
      '    1  npm init',
      '    2  git init',
      '    3  code .',
      '    4  npm run dev',
      '    5  // googling',
      '    6  git add .',
      '    7  git commit -m "it works"',
      '    8  git push',
      '    9  // repeat',
    ].join('\n'),
  }),
};

export const ping: Command = {
  name: 'ping',
  description: 'Ping a host',
  execute: (args) => {
    const host = args[0] || 'localhost';
    return {
      output: [
        `PING ${host}: 56 data bytes`,
        `64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.042 ms`,
        `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.038 ms`,
        `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.041 ms`,
        '',
        '\x1b[32m✓ Connection successful!\x1b[0m Feel free to reach out.',
      ].join('\n'),
    };
  },
};

export const curl: Command = {
  name: 'curl',
  description: 'Transfer data from URL',
  execute: (args) => {
    if (!args[0]) {
      return { output: 'curl: try \'curl --help\' for more information' };
    }
    return {
      output: [
        '{',
        '  "status": "success",',
        '  "message": "Thanks for your curiosity!",',
        '  "hire_me": true,',
        '  "coffee_needed": "always"',
        '}',
      ].join('\n'),
    };
  },
};

export const top: Command = {
  name: 'top',
  description: 'Display processes',
  execute: () => ({
    output: [
      '\x1b[1mPID   COMMAND          CPU%   MEM%\x1b[0m',
      '001   coding           99.9   ∞',
      '002   debugging        87.3   42.0',
      '003   coffee_intake    100.0  100.0',
      '004   stackoverflow    69.0   13.37',
      '005   procrastination  0.1    0.1',
    ].join('\n'),
  }),
};

export const htop: Command = {
  name: 'htop',
  description: 'Interactive process viewer',
  execute: () => top.execute([]),
};

export const vim: Command = {
  name: 'vim',
  description: 'Vi IMproved',
  execute: () => ({
    output: '\x1b[33m🚪 You have entered Vim.\x1b[0m\nTo exit, try: :q!\n\n\x1b[90m(Just kidding, this is a browser)\x1b[0m',
  }),
};

export const nano: Command = {
  name: 'nano',
  description: 'Nano editor',
  execute: () => ({
    output: '\x1b[32mAh, a person of culture!\x1b[0m Nano > Vim (fight me)',
  }),
};

export const neofetch: Command = {
  name: 'neofetch',
  description: 'System information',
  execute: () => {
    const info = [
      `\x1b[36m       _____          \x1b[0m   \x1b[36m${portfolio.name}\x1b[0m`,
      `\x1b[36m      /     \\         \x1b[0m   ──────────────────`,
      `\x1b[36m     | () () |        \x1b[0m   \x1b[36mOS:\x1b[0m Portfolio OS v2.0`,
      `\x1b[36m      \\  ^  /         \x1b[0m   \x1b[36mHost:\x1b[0m Next.js 16`,
      `\x1b[36m       |||||          \x1b[0m   \x1b[36mKernel:\x1b[0m React 19`,
      `\x1b[36m       |||||          \x1b[0m   \x1b[36mShell:\x1b[0m TypeScript`,
      `                       \x1b[36mTheme:\x1b[0m Apple Dark`,
      `                       \x1b[36mTerminal:\x1b[0m Custom CLI`,
      `                       \x1b[36mCPU:\x1b[0m Caffeine-powered`,
      `                       \x1b[36mMemory:\x1b[0m 99% (tabs open)`,
    ];
    return { output: info.join('\n') };
  },
};

export const grep: Command = {
  name: 'grep',
  description: 'Search for patterns',
  execute: (args) => {
    if (!args[0]) {
      return { output: 'Usage: grep PATTERN' };
    }
    const pattern = args[0].toLowerCase();
    if (pattern.includes('bug')) {
      return { output: '\x1b[31mFound 404 bugs.\x1b[0m It\'s a feature, not a bug!' };
    }
    if (pattern.includes('coffee') || pattern.includes('café')) {
      return { output: '\x1b[33mFound infinite matches.\x1b[0m ☕☕☕' };
    }
    return { output: `No matches found for "${args[0]}"` };
  },
};

export const exit: Command = {
  name: 'exit',
  description: 'Exit the terminal',
  execute: () => ({
    output: [
      '\x1b[90mLogout...\x1b[0m',
      '',
      `${t('exitMsg')} 👋`,
      '',
      `\x1b[36m${t('connectionClosed')}\x1b[0m`,
    ].join('\n'),
  }),
};

export const linuxCommands = [
  ls, pwd, cd, cat, echo, whoami, date, uptime, sudo, rm, mkdir, touch,
  man, history, ping, curl, top, htop, vim, nano, neofetch, grep, exit
];
