/**
 * Formatting utilities for terminal output
 */

export function skillBar(level: number, width = 20): string {
  const filled = Math.round((level / 100) * width);
  const empty = width - filled;
  return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${level}%`;
}

export function padEnd(str: string, length: number): string {
  return str.padEnd(length);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
