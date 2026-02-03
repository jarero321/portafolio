import type { Command } from '@/types';

export const git: Command = {
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
    return { output: 'git: I have conflicts with myself too.' };
  },
};

export const npm: Command = {
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

export const stackoverflow: Command = {
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

export const deploy: Command = {
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
          '  - Last words before outage',
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

export const css: Command = {
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
      '\x1b[90m...after hours of suffering\x1b[0m',
      '',
      '\x1b[33mAlso: !important !important !important\x1b[0m',
    ].join('\n'),
  }),
};

export const js: Command = {
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

export const docker: Command = {
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
      '\x1b[33mAlso: Your disk space has left the chat.\x1b[0m',
    ].join('\n'),
  }),
};

export const regex: Command = {
  name: 'regex',
  description: 'Regular expressions',
  execute: () => ({
    output: [
      '\x1b[35mRegex:\x1b[0m',
      '',
      'Problem: Validate an email',
      'Solution: /^(?:[a-z0-9!#$%&\'*+/=?^_\\`{|}~-]+(?:\\.[a-z0-9...',
      '',
      '\x1b[31mNow you have two problems.\x1b[0m',
      '',
      '\x1b[90mPro tip: Just copy from StackOverflow\x1b[0m',
    ].join('\n'),
  }),
};

export const debug: Command = {
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

export const meeting: Command = {
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
      '\x1b[33mDuration: 1 hour of your life\x1b[0m',
    ].join('\n'),
  }),
};

export const typescript: Command = {
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

export const chatgpt: Command = {
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
      '\x1b[90mAlso known as: Confident Hallucination\x1b[0m',
      '',
      '\x1b[33mBut hey, this portfolio was built with AI 😄\x1b[0m',
    ].join('\n'),
  }),
};

export const leetcode: Command = {
  name: 'leetcode',
  description: 'Coding interviews',
  execute: () => ({
    output: [
      '\x1b[33m💀 LeetCode:\x1b[0m',
      '',
      'Interviewer: "Reverse a binary tree"',
      'Me: *sweating intensifies*',
      '',
      'Reality: You\'ll never do this at work.',
      '',
      '\x1b[90mBut congrats on memorizing',
      'algorithms you\'ll forget in a week.\x1b[0m',
    ].join('\n'),
  }),
};

export const error: Command = {
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

export const production: Command = {
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

export const devJokesCommands = [
  git, npm, stackoverflow, deploy, css, js, docker, regex, debug,
  meeting, typescript, chatgpt, leetcode, error, production
];
