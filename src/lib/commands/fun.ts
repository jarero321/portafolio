import type { Command } from '@/types';
import { asciiArt } from '@/data/portfolio';
import { t } from '@/lib/i18n';

export const coffee: Command = {
  name: 'coffee',
  description: 'Get some coffee',
  execute: () => ({ output: `\x1b[33m${asciiArt.coffee}\x1b[0m\n${t('coffeeMsg')} ☕` }),
};

export const matrix: Command = {
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

export const cowsay: Command = {
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

export const fortune: Command = {
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

export const sl: Command = {
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

export const lol: Command = {
  name: 'lol',
  description: 'Laugh out loud',
  execute: () => ({ output: '\x1b[35m😂 LMAO 🤣\x1b[0m' }),
};

export const hello: Command = {
  name: 'hello',
  description: 'Say hello',
  execute: () => ({ output: '\x1b[32mHello, World! 👋\x1b[0m Welcome to my portfolio!' }),
};

export const hi: Command = {
  name: 'hi',
  description: 'Say hi',
  execute: () => hello.execute([]),
};

export const hack: Command = {
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

export const funCommands = [
  coffee, matrix, cowsay, fortune, sl, lol, hello, hi, hack
];
