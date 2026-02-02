import type { Command, CommandResult } from '@/types';

class CommandRegistry {
  private commands: Map<string, Command> = new Map();

  register(command: Command): void {
    this.commands.set(command.name.toLowerCase(), command);
  }

  get(name: string): Command | undefined {
    return this.commands.get(name.toLowerCase());
  }

  getAll(): Command[] {
    return Array.from(this.commands.values());
  }

  getNames(): string[] {
    return Array.from(this.commands.keys());
  }

  async execute(name: string, args: string[]): Promise<CommandResult> {
    const command = this.get(name);

    if (!command) {
      return {
        output: `Command not found: ${name}. Type 'help' for available commands.`,
        isError: true,
      };
    }

    try {
      return await command.execute(args);
    } catch (error) {
      return {
        output: `Error executing '${name}': ${error instanceof Error ? error.message : 'Unknown error'}`,
        isError: true,
      };
    }
  }
}

export const registry = new CommandRegistry();
