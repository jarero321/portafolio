import { registry } from './registry';

// Import command modules
import { mainCommands } from './main';
import { linuxCommands } from './linux';
import { funCommands } from './fun';
import { devJokesCommands } from './devJokes';
import { languageCommands } from './language';

// Register all commands
const allCommands = [
  ...mainCommands,
  ...linuxCommands,
  ...funCommands,
  ...devJokesCommands,
  ...languageCommands,
];

allCommands.forEach(cmd => registry.register(cmd));

// Re-export utilities
export { registry } from './registry';
export { parseCommand, parseCommand as parse } from './parser';
