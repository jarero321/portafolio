'use client';

import { useRef, useEffect } from 'react';
import { useTerminal } from '@/lib/hooks/useTerminal';
import { TerminalHeader } from './TerminalHeader';
import { TerminalLine } from './TerminalLine';
import { TerminalInput } from './TerminalInput';

export function Terminal() {
  const { lines, input, setInput, isProcessing, thinkingMessage, handleKeyDown } = useTerminal();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, thinkingMessage]);

  return (
    <div className="terminal-window">
      <TerminalHeader />
      <div ref={bodyRef} className="terminal-body">
        {lines.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}

        {thinkingMessage && (
          <div className="thinking-indicator">
            <span className="thinking-dot" />
            <span className="thinking-text">{thinkingMessage}</span>
          </div>
        )}

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
