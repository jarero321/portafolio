import { registry } from './registry';
import { mainCommands } from './main';
import { linuxCommands } from './linux';
import { funCommands } from './fun';
import { devJokesCommands } from './devJokes';
import { languageCommands } from './language';

const allCommands = [
  ...mainCommands,
  ...linuxCommands,
  ...funCommands,
  ...devJokesCommands,
  ...languageCommands,
];

allCommands.forEach(cmd => registry.register(cmd));

export { registry } from './registry';
export { parseCommand, parseCommand as parse } from './parser';
