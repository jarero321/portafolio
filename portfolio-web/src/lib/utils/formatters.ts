export function skillBar(level: number): string {
  if (level >= 90) return '\x1b[32m★ Expert\x1b[0m';
  if (level >= 75) return '\x1b[36m● Advanced\x1b[0m';
  return '\x1b[90m○ Proficient\x1b[0m';
}
