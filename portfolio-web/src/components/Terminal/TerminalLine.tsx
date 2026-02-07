'use client';

import type { TerminalLine as TerminalLineType } from '@/types';

interface Props {
  line: TerminalLineType;
}

// URL regex pattern - matches URLs with or without protocol
// Includes support for accented characters in paths (common in LinkedIn URLs)
const urlRegex = /(https?:\/\/[^\s]+|(?:github\.com|linkedin\.com|twitter\.com|npmjs\.com|[a-zA-Z0-9-]+\.vercel\.app)[^\s\u0000-\u001F]*)/g;

// Parse text and convert URLs to clickable links
function parseUrls(text: string, baseKey: number, className: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = baseKey;
  let match;

  // Reset regex state
  urlRegex.lastIndex = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    // Add text before the URL
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} className={className}>
          {text.slice(lastIndex, match.index)}
        </span>
      );
    }

    // Add the URL as a clickable link
    const url = match[0];
    const href = url.startsWith('http') ? url : `https://${url}`;
    parts.push(
      <a
        key={key++}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`terminal-link ${className}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {url}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(
      <span key={key++} className={className}>
        {text.slice(lastIndex)}
      </span>
    );
  }

  return parts.length > 0 ? parts : [<span key={key} className={className}>{text}</span>];
}

// Parse ANSI escape codes and convert to spans with URL support
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
        const urlParts = parseUrls(content, key, currentStyle.join(' '));
        parts.push(...urlParts);
        key += urlParts.length;
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
      const urlParts = parseUrls(content, key, currentStyle.join(' '));
      parts.push(...urlParts);
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
