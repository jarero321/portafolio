'use client';

import { useRef, useEffect, useCallback } from 'react';

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

  // Re-focus when clicking on the terminal body (not on links or selected text)
  const handleTerminalClick = useCallback((e: MouseEvent) => {
    if (disabled) return;

    // Don't focus if clicking on a link
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) {
      return;
    }

    // Don't focus if user has selected text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    inputRef.current?.focus();
  }, [disabled]);

  // Attach listener to the terminal wrapper instead of document
  useEffect(() => {
    const terminalWrapper = document.querySelector('.terminal-body');
    if (terminalWrapper) {
      terminalWrapper.addEventListener('click', handleTerminalClick as EventListener);
      return () => terminalWrapper.removeEventListener('click', handleTerminalClick as EventListener);
    }
  }, [handleTerminalClick]);

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
