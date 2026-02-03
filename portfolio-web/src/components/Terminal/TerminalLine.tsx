'use client';

import type { TerminalLine as TerminalLineType } from '@/types';

interface Props {
  line: TerminalLineType;
}

// Parse ANSI escape codes and convert to spans
function parseAnsi(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let currentStyle: string[] = [];
  let key = 0;

  const regex = /\x1b\[(\d+)m/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the escape code
    if (match.index > currentIndex) {
      const content = text.slice(currentIndex, match.index);
      if (content) {
        parts.push(
          <span key={key++} className={currentStyle.join(' ')}>
            {content}
          </span>
        );
      }
    }

    // Process the escape code
    const code = parseInt(match[1], 10);
    currentStyle = updateStyle(currentStyle, code);
    currentIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    const content = text.slice(currentIndex);
    if (content) {
      parts.push(
        <span key={key++} className={currentStyle.join(' ')}>
          {content}
        </span>
      );
    }
  }

  return parts.length > 0 ? parts : text;
}

function updateStyle(current: string[], code: number): string[] {
  if (code === 0) return []; // Reset
  if (code === 1) return [...current, 'ansi-bold'];
  if (code === 2) return [...current, 'ansi-dim'];
  if (code === 3) return [...current, 'ansi-italic'];
  if (code === 4) return [...current, 'ansi-underline'];

  // Colors
  const colorMap: Record<number, string> = {
    30: 'ansi-black',
    31: 'ansi-red',
    32: 'ansi-green',
    33: 'ansi-yellow',
    34: 'ansi-blue',
    35: 'ansi-magenta',
    36: 'ansi-cyan',
    37: 'ansi-white',
    90: 'ansi-bright-black',
    91: 'ansi-bright-red',
    92: 'ansi-bright-green',
    93: 'ansi-bright-yellow',
    94: 'ansi-bright-blue',
    95: 'ansi-bright-magenta',
    96: 'ansi-bright-cyan',
    97: 'ansi-bright-white',
  };

  if (colorMap[code]) {
    // Remove any existing color class and add new one
    const filtered = current.filter(c => !c.startsWith('ansi-') || c.startsWith('ansi-bold') || c.startsWith('ansi-dim'));
    return [...filtered, colorMap[code]];
  }

  return current;
}

export function TerminalLine({ line }: Props) {
  const typeClass = {
    input: 'terminal-line-input',
    output: '',
    error: 'terminal-line-error',
    system: 'terminal-line-system',
  }[line.type];

  return (
    <div className={`terminal-line ${typeClass}`}>
      {parseAnsi(line.content)}
    </div>
  );
}
