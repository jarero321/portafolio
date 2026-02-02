import type { Command } from '@/types';
import { portfolio, asciiArt } from '@/data/portfolio';
import { registry } from './registry';

// Check if mobile
function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 640;
}

// Get appropriate logo
function getLogo(): string {
  return isMobile() ? asciiArt.logoMobile : asciiArt.logo;
}

// Helper to format skill bar
function skillBar(level: number, width = 20): string {
  const filled = Math.round((level / 100) * width);
  const empty = width - filled;
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${level}%`;
}

// ============================================
// MAIN COMMANDS
// ============================================

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

    const mainCmds = ['help', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'clear'];
    const lines = [
      '\x1b[1mAvailable Commands:\x1b[0m',
      '',
      ...mainCmds.map(name => {
        const c = registry.get(name);
        return c ? `  \x1b[36m${c.name.padEnd(12)}\x1b[0m ${c.description}` : '';
      }).filter(Boolean),
      '',
      '\x1b[90mTip: Try some Linux commands too... 👀\x1b[0m',
    ];
    return { output: lines.join('\n') };
  },
};

const about: Command = {
  name: 'about',
  description: 'About me',
  execute: () => {
    const logo = getLogo();
    const lines = [
      `\x1b[36m${logo}\x1b[0m`,
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

    const lines = ['\x1b[1mProjects:\x1b[0m', ''];

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
      c.github ? `  \x1b[36m🐙 GitHub:\x1b[0m   ${c.github}` : '',
      c.linkedin ? `  \x1b[36m💼 LinkedIn:\x1b[0m ${c.linkedin}` : '',
      c.twitter ? `  \x1b[36m🐦 Twitter:\x1b[0m  ${c.twitter}` : '',
      c.website ? `  \x1b[36m🌐 Website:\x1b[0m  ${c.website}` : '',
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
    const logo = getLogo();
    const lines = [
      `\x1b[36m${logo}\x1b[0m`,
      '',
      `\x1b[1mWelcome to ${portfolio.name}'s Terminal Portfolio\x1b[0m`,
      '',
      `Type \x1b[36mhelp\x1b[0m to see available commands.`,
      '',
    ];
    return { output: lines.join('\n') };
  },
};

// ============================================
// LINUX COMMANDS (Easter Eggs)
// ============================================

const ls: Command = {
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

const pwd: Command = {
  name: 'pwd',
  description: 'Print working directory',
  execute: () => ({ output: '/home/visitor/carlos-portfolio' }),
};

const cd: Command = {
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

const cat: Command = {
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

const echo: Command = {
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

const whoami: Command = {
  name: 'whoami',
  description: 'Print current user',
  execute: () => ({ output: 'visitor\n\x1b[90m(But the real question is... who are you really? 🤔)\x1b[0m' }),
};

const date: Command = {
  name: 'date',
  description: 'Print current date and time',
  execute: () => {
    const now = new Date();
    return { output: now.toString() };
  },
};

const uptime: Command = {
  name: 'uptime',
  description: 'Show system uptime',
  execute: () => {
    const start = new Date('2024-01-01');
    const now = new Date();
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return { output: `\x1b[32m${days} days\x1b[0m of coding, learning, and building cool stuff` };
  },
};

const sudo: Command = {
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
      return { output: '\x1b[33m🥪 Here\'s your mass sandwich. You\'re welcome.\x1b[0m' };
    }
    return { output: '\x1b[31mvisitor is not in the sudoers file.\x1b[0m This incident will be reported. 📝' };
  },
};

const rm: Command = {
  name: 'rm',
  description: 'Remove files',
  execute: (args) => {
    if (args.includes('-rf') && (args.includes('/') || args.includes('/*'))) {
      return { output: '\x1b[31m🛡️ System protected.\x1b[0m Nice try though!' };
    }
    return { output: '\x1b[33mRead-only filesystem.\x1b[0m This portfolio is immutable!' };
  },
};

const mkdir: Command = {
  name: 'mkdir',
  description: 'Make directories',
  execute: () => ({ output: '\x1b[33mRead-only filesystem.\x1b[0m But I appreciate the creativity!' }),
};

const touch: Command = {
  name: 'touch',
  description: 'Create empty files',
  execute: () => ({ output: '\x1b[33mRead-only filesystem.\x1b[0m Try touching grass instead 🌱' }),
};

const man: Command = {
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
          '       Side effects may include mass coffee consumption.',
          '',
          '\x1b[1mBUGS\x1b[0m',
          '       Too many to list. We ship anyway.',
        ].join('\n'),
      };
    }
    return { output: `No manual entry for ${args[0]}` };
  },
};

const history: Command = {
  name: 'history',
  description: 'Command history',
  execute: () => ({
    output: [
      '    1  npm init',
      '    2  git init',
      '    3  code .',
      '    4  npm run dev',
      '    5  // mass googling',
      '    6  git add .',
      '    7  git commit -m "it works"',
      '    8  git push',
      '    9  // repeat',
    ].join('\n'),
  }),
};

const ping: Command = {
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

const curl: Command = {
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

const top: Command = {
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

const htop: Command = {
  name: 'htop',
  description: 'Interactive process viewer',
  execute: () => top.execute([]),
};

const vim: Command = {
  name: 'vim',
  description: 'Vi IMproved',
  execute: () => ({
    output: '\x1b[33m🚪 You have entered Vim.\x1b[0m\nTo exit, try: :q!\n\n\x1b[90m(Just kidding, this is a browser)\x1b[0m',
  }),
};

const nano: Command = {
  name: 'nano',
  description: 'Nano editor',
  execute: () => ({
    output: '\x1b[32mAh, a person of culture!\x1b[0m Nano > Vim (fight me)',
  }),
};

const neofetch: Command = {
  name: 'neofetch',
  description: 'System information',
  execute: () => {
    const info = [
      `\x1b[36m       _____          \x1b[0m   \x1b[36m${portfolio.name}\x1b[0m`,
      `\x1b[36m      /     \\         \x1b[0m   ──────────────────`,
      `\x1b[36m     | () () |        \x1b[0m   \x1b[36mOS:\x1b[0m Portfolio OS v2.0`,
      `\x1b[36m      \\  ^  /         \x1b[0m   \x1b[36mHost:\x1b[0m Next.js 15`,
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

const grep: Command = {
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

const exit: Command = {
  name: 'exit',
  description: 'Exit the terminal',
  execute: () => ({
    output: [
      '\x1b[90mLogout...\x1b[0m',
      '',
      'Thanks for visiting! 👋',
      '',
      '\x1b[36mConnection closed.\x1b[0m',
    ].join('\n'),
  }),
};

// ============================================
// FUN EASTER EGGS
// ============================================

const coffee: Command = {
  name: 'coffee',
  description: 'Get some coffee',
  execute: () => ({ output: `\x1b[33m${asciiArt.coffee}\x1b[0m\nHere's a mass virtual coffee for you! ☕` }),
};

const matrix: Command = {
  name: 'matrix',
  description: 'Enter the Matrix',
  execute: () => ({
    output: [
      '\x1b[32m',
      '  01001000 01100101 01101100 01101100 01101111',
      '  ╔═══════════════════════════════════════════╗',
      '  ║  Wake up, Neo...                          ║',
      '  ║  The Matrix has you...                    ║',
      '  ║  Follow the white rabbit. 🐰              ║',
      '  ╚═══════════════════════════════════════════╝',
      '\x1b[0m',
    ].join('\n'),
  }),
};

const cowsay: Command = {
  name: 'cowsay',
  description: 'Cow says...',
  execute: (args) => {
    const msg = args.length > 0 ? args.join(' ') : 'Hire this developer!';
    const line = '─'.repeat(msg.length + 2);
    return {
      output: [
        ` ┌${line}┐`,
        ` │ ${msg} │`,
        ` └${line}┘`,
        '        \\   ^__^',
        '         \\  (oo)\\_______',
        '            (__)\\       )\\/\\',
        '                ||----w |',
        '                ||     ||',
      ].join('\n'),
    };
  },
};

const fortune: Command = {
  name: 'fortune',
  description: 'Random fortune',
  execute: () => {
    const fortunes = [
      '"First, solve the problem. Then, write the code." – John Johnson',
      '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
      '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." – Martin Fowler',
      '"The best error message is the one that never shows up." – Thomas Fuchs',
      '"Talk is cheap. Show me the code." – Linus Torvalds',
      '"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live."',
      '"It works on my machine!" – Every developer ever',
      '"99 little bugs in the code, 99 bugs in the code. Take one down, patch it around... 127 bugs in the code."',
    ];
    const random = fortunes[Math.floor(Math.random() * fortunes.length)];
    return { output: `\x1b[33m${random}\x1b[0m` };
  },
};

const sl: Command = {
  name: 'sl',
  description: 'Steam locomotive',
  execute: () => ({
    output: [
      '\x1b[90mYou typed sl instead of ls!\x1b[0m',
      '',
      '      ====        ________                ___________',
      '  _D _|  |_______/        \\__I_I_____===__|_________|',
      '   |(_)---  |   H\\________/ |   |        =|___ ___|',
      '   /     |  |   H  |  |     |   |         ||_| |_||',
      '  |      |  |   H  |__--------------------| [___] |',
      '  | ________|___H__/__|_____/[][]~\\_______|       |',
      '  |/ |   |-----------I_____I [][] []  D   |=======|__',
      '',
      '\x1b[33m🚂 Choo choo! Try "ls" next time!\x1b[0m',
    ].join('\n'),
  }),
};

const lol: Command = {
  name: 'lol',
  description: 'Laugh out loud',
  execute: () => ({ output: '\x1b[35m😂 LMAO 🤣\x1b[0m' }),
};

const hello: Command = {
  name: 'hello',
  description: 'Say hello',
  execute: () => ({ output: '\x1b[32mHello, World! 👋\x1b[0m Welcome to my portfolio!' }),
};

const hi: Command = {
  name: 'hi',
  description: 'Say hi',
  execute: () => hello.execute([]),
};

const hack: Command = {
  name: 'hack',
  description: 'Hack the mainframe',
  execute: () => ({
    output: [
      '\x1b[32mInitializing hack sequence...\x1b[0m',
      '████████████████████ 100%',
      '',
      '\x1b[31mACCESS DENIED\x1b[0m',
      '',
      '\x1b[90mJust kidding! This is a portfolio, not a bank 😄\x1b[0m',
    ].join('\n'),
  }),
};

// ============================================
// DEV JOKES & MEMES
// ============================================

const git: Command = {
  name: 'git',
  description: 'Git commands',
  execute: (args) => {
    if (args[0] === 'push' && args[1] === '--force') {
      return { output: '\x1b[31m🔥 You monster.\x1b[0m The senior dev is crying somewhere.' };
    }
    if (args[0] === 'commit' && args.includes('-m')) {
      const msgs = [
        '"fix"',
        '"fixed it"',
        '"final fix"',
        '"final fix v2"',
        '"why isnt this working"',
        '"asdfasdf"',
        '"please work"',
      ];
      const random = msgs[Math.floor(Math.random() * msgs.length)];
      return { output: `Typical commit message: \x1b[33m${random}\x1b[0m` };
    }
    if (args[0] === 'blame') {
      return { output: '\x1b[31m👀 It was you. It\'s always you.\x1b[0m' };
    }
    if (args[0] === 'stash') {
      return { output: '\x1b[33m📦 Code goes in... and never comes out.\x1b[0m\nRIP those changes.' };
    }
    return { output: 'git: I have mass conflicts with myself too.' };
  },
};

const npm: Command = {
  name: 'npm',
  description: 'Node package manager',
  execute: (args) => {
    if (args[0] === 'install' || args[0] === 'i') {
      return {
        output: [
          '\x1b[33mInstalling node_modules...\x1b[0m',
          '',
          'added 1,847 packages',
          'found 69 vulnerabilities (42 moderate, 27 high)',
          '',
          '\x1b[90m📁 node_modules: 2.3 GB\x1b[0m',
          '\x1b[90m🌍 Heavier than the universe itself\x1b[0m',
        ].join('\n'),
      };
    }
    if (args[0] === 'audit') {
      return { output: '\x1b[31m🔓 547 vulnerabilities found.\x1b[0m\n\x1b[90mJust like my mental health.\x1b[0m' };
    }
    return { output: 'npm: \x1b[33mHave you tried deleting node_modules?\x1b[0m' };
  },
};

const stackoverflow: Command = {
  name: 'stackoverflow',
  description: 'The holy grail',
  execute: () => ({
    output: [
      '\x1b[33m🙏 Our Lord and Savior\x1b[0m',
      '',
      '┌─────────────────────────────────┐',
      '│  "Marked as duplicate"          │',
      '│  "Closed for not being specific"│',
      '│  "Works for me"                 │',
      '│  Answer from 2009 saves the day │',
      '└─────────────────────────────────┘',
      '',
      '\x1b[90mWhere copy-paste dreams come true.\x1b[0m',
    ].join('\n'),
  }),
};

const deploy: Command = {
  name: 'deploy',
  description: 'Deploy to production',
  execute: () => {
    const day = new Date().getDay();
    if (day === 5) {
      return {
        output: [
          '\x1b[31m🚨 FRIDAY DETECTED 🚨\x1b[0m',
          '',
          'Deploying on Friday? You brave soul.',
          '',
          '\x1b[33m"What could possibly go wrong?"\x1b[0m',
          '  - Last words before mass outage',
        ].join('\n'),
      };
    }
    return {
      output: [
        '\x1b[32mDeploying...\x1b[0m',
        '',
        '✓ Build passed',
        '✓ Tests passed (the 3 that exist)',
        '✓ Deployed to prod',
        '',
        '\x1b[33m🤞 Fingers crossed...\x1b[0m',
      ].join('\n'),
    };
  },
};

const css: Command = {
  name: 'css',
  description: 'Cascading Style Sheets',
  execute: () => ({
    output: [
      '\x1b[36mCSS be like:\x1b[0m',
      '',
      '  display: flex;',
      '  justify-content: center;',
      '  align-items: center;',
      '',
      '\x1b[32m✓ Finally centered the div\x1b[0m',
      '',
      '\x1b[90m...after mass hours of suffering\x1b[0m',
      '',
      '\x1b[33mAlso: !important !important !important\x1b[0m',
    ].join('\n'),
  }),
};

const js: Command = {
  name: 'js',
  description: 'JavaScript moment',
  execute: () => {
    const jokes = [
      '[] + [] = "" \x1b[90m// empty string, obviously\x1b[0m',
      '[] + {} = "[object Object]"',
      '{} + [] = 0 \x1b[90m// wait what\x1b[0m',
      'typeof NaN = "number" \x1b[90m// Not a Number is a number\x1b[0m',
      '0.1 + 0.2 = 0.30000000000000004',
      '"11" + 1 = "111" but "11" - 1 = 10',
      'null == undefined \x1b[90m// true\x1b[0m',
      'null === undefined \x1b[90m// false, obviously\x1b[0m',
    ];
    const random = jokes[Math.floor(Math.random() * jokes.length)];
    return { output: `\x1b[33mJavaScript moment:\x1b[0m\n\n${random}\n\n\x1b[90m"It\'s not a bug, it\'s a feature"\x1b[0m` };
  },
};

const docker: Command = {
  name: 'docker',
  description: 'Containers go brrr',
  execute: () => ({
    output: [
      '\x1b[36m🐳 Docker\x1b[0m',
      '',
      '"Works on my machine"',
      '"Then we\'ll ship your machine"',
      '',
      '\x1b[90mAnd that\'s how containers were born.\x1b[0m',
      '',
      '\x1b[33mAlso: Your disk space has mass left the chat.\x1b[0m',
    ].join('\n'),
  }),
};

const regex: Command = {
  name: 'regex',
  description: 'Regular expressions',
  execute: () => ({
    output: [
      '\x1b[35mRegex:\x1b[0m',
      '',
      'Problem: Validate an email',
      'Solution: /^(?:[a-z0-9!#$%&\'*+/=?^_\\`{|}~-]+(?:\\.[a-z0-9...',
      '',
      '\x1b[31mNow you have mass two problems.\x1b[0m',
      '',
      '\x1b[90mPro tip: Just copy from StackOverflow\x1b[0m',
    ].join('\n'),
  }),
};

const debug: Command = {
  name: 'debug',
  description: 'Debug mode',
  execute: () => ({
    output: [
      '\x1b[33m🔍 Debugging Process:\x1b[0m',
      '',
      '1. console.log("here")',
      '2. console.log("here2")',
      '3. console.log("wtf")',
      '4. console.log("WHY")',
      '5. // comment everything out',
      '6. // uncomment one by one',
      '7. Realize it was a typo',
      '',
      '\x1b[90mTime spent: 4 hours\x1b[0m',
      '\x1b[90mActual bug: missing semicolon\x1b[0m',
    ].join('\n'),
  }),
};

const meeting: Command = {
  name: 'meeting',
  description: 'Schedule a meeting',
  execute: () => ({
    output: [
      '\x1b[31m📅 Meeting Scheduled\x1b[0m',
      '',
      '"This could have been an email"',
      '  - Everyone, always',
      '',
      '\x1b[90mAgenda:\x1b[0m',
      '  • Sync about syncing',
      '  • Align on alignment',
      '  • Circle back to circling back',
      '  • Take this offline (never happens)',
      '',
      '\x1b[33mDuration: 1 hour of mass your life\x1b[0m',
    ].join('\n'),
  }),
};

const typescript: Command = {
  name: 'typescript',
  description: 'Type safety',
  execute: () => ({
    output: [
      '\x1b[36mTypeScript:\x1b[0m',
      '',
      'const x: any = "I give up"',
      '// @ts-ignore',
      '// @ts-expect-error',
      'as unknown as WhateverType',
      '',
      '\x1b[32m"Strictly typed"\x1b[0m \x1b[90m(in theory)\x1b[0m',
    ].join('\n'),
  }),
};

const chatgpt: Command = {
  name: 'chatgpt',
  description: 'AI assistant',
  execute: () => ({
    output: [
      '\x1b[35m🤖 ChatGPT:\x1b[0m',
      '',
      '"Here\'s a solution that looks correct',
      ' but will subtly break your app',
      ' in production at 3 AM."',
      '',
      '\x1b[90mAlso known as: Mass Confident Hallucination\x1b[0m',
      '',
      '\x1b[33mBut hey, this portfolio was built with AI 😄\x1b[0m',
    ].join('\n'),
  }),
};

const leetcode: Command = {
  name: 'leetcode',
  description: 'Coding interviews',
  execute: () => ({
    output: [
      '\x1b[33m💀 LeetCode:\x1b[0m',
      '',
      'Interviewer: "Reverse a binary tree"',
      'Me: *mass mass mass sweating*',
      '',
      'Reality: You\'ll never do this at work.',
      '',
      '\x1b[90mBut congrats on mass memorizing',
      'algorithms you\'ll forget in a week.\x1b[0m',
    ].join('\n'),
  }),
};

const error: Command = {
  name: 'error',
  description: 'Common errors',
  execute: () => {
    const errors = [
      'undefined is not a function',
      'Cannot read property of undefined',
      'CORS policy blocked',
      'Module not found',
      'Maximum call stack exceeded',
      'Segmentation fault (core dumped)',
      'Error: Success',
      'Task failed successfully',
    ];
    const random = errors[Math.floor(Math.random() * errors.length)];
    return { output: `\x1b[31m❌ ${random}\x1b[0m\n\n\x1b[90mClassic.\x1b[0m` };
  },
};

const production: Command = {
  name: 'production',
  description: 'Production environment',
  execute: () => ({
    output: [
      '\x1b[31m🔥 PRODUCTION 🔥\x1b[0m',
      '',
      'Where bugs go to party.',
      '',
      'Features:',
      '  • Works differently than staging',
      '  • Logs? What logs?',
      '  • Users find all the bugs',
      '  • Always breaks at 5 PM Friday',
      '',
      '\x1b[33m"It worked on localhost!"\x1b[0m',
    ].join('\n'),
  }),
};

// ============================================
// REGISTER ALL COMMANDS
// ============================================

const allCommands = [
  // Main
  help, about, projects, skills, experience, education, contact, clear, welcome,
  // Linux
  ls, pwd, cd, cat, echo, whoami, date, uptime, sudo, rm, mkdir, touch,
  man, history, ping, curl, top, htop, vim, nano, neofetch, grep, exit,
  // Fun
  coffee, matrix, cowsay, fortune, sl, lol, hello, hi, hack,
  // Dev jokes
  git, npm, stackoverflow, deploy, css, js, docker, regex, debug,
  meeting, typescript, chatgpt, leetcode, error, production,
];

allCommands.forEach(cmd => registry.register(cmd));

export { registry, parseCommand } from './registry';
export { parseCommand as parse } from './parser';
