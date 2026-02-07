// Terminal types
export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: number;
}

export interface TerminalState {
  lines: TerminalLine[];
  isProcessing: boolean;
  currentInput: string;
}

// Command types
export interface CommandResult {
  output: string;
  isError?: boolean;
  clear?: boolean;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandResult | Promise<CommandResult>;
}

export interface ParsedCommand {
  name: string;
  args: string[];
  flags: Record<string, string | boolean>;
}

// Portfolio data types
export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
  npm?: string;
  featured?: boolean;
  category?: 'ai-tools' | 'cli' | 'web' | 'fintech';
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'testing' | 'architecture' | 'cloud' | 'database' | 'tools' | 'soft';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  tech?: string[];
  highlights?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Contact {
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  location: string;
  contact: Contact;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}
