'use client';

import { useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function TerminalInput({ value, onChange, onKeyDown, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount and when enabled
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  // Re-focus when clicking anywhere in the terminal
  useEffect(() => {
    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [disabled]);

  return (
    <div className="terminal-input-wrapper">
      <span className="terminal-prompt">❯</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className="terminal-input"
        placeholder={disabled ? 'Processing...' : 'Type a command...'}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </div>
  );
}
