'use client';

import { useRef, useEffect } from 'react';
import { useTerminal } from '@/lib/hooks/useTerminal';
import { TerminalHeader } from './TerminalHeader';
import { TerminalLine } from './TerminalLine';
import { TerminalInput } from './TerminalInput';

export function Terminal() {
  const { lines, input, setInput, isProcessing, handleKeyDown } = useTerminal();
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="terminal-window w-full max-w-4xl">
      <TerminalHeader />
      <div ref={bodyRef} className="terminal-body">
        {lines.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}
        <TerminalInput
          value={input}
          onChange={setInput}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
}
