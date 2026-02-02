'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { TerminalLine } from '@/types';
import { registry } from '@/lib/commands/registry';
import { parseCommand } from '@/lib/commands/parser';

// Initialize commands
import '@/lib/commands';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const commandHistory = useRef<string[]>([]);
  const initialized = useRef(false);

  // Show welcome message on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const welcomeResult = registry.get('welcome')?.execute([]);
    if (welcomeResult && 'output' in welcomeResult) {
      addLine('system', welcomeResult.output);
    }
  }, []);

  const addLine = useCallback((type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: generateId(),
      type,
      content,
      timestamp: Date.now(),
    };
    setLines(prev => [...prev, newLine]);
  }, []);

  const executeCommand = useCallback(async (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Add input line
    addLine('input', trimmed);

    // Add to history
    commandHistory.current = [trimmed, ...commandHistory.current.slice(0, 49)];
    setHistoryIndex(-1);

    setIsProcessing(true);

    const { name, args } = parseCommand(trimmed);
    const result = await registry.execute(name, args);

    if (result.clear) {
      setLines([]);
    } else if (result.output) {
      addLine(result.isError ? 'error' : 'output', result.output);
    }

    setIsProcessing(false);
    setInput('');
  }, [addLine]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // History navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const history = commandHistory.current;
      if (history.length === 0) return;

      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || '');
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory.current[newIndex] || '');
      }
    }

    // Autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      const commands = registry.getNames();
      const matches = commands.filter(c => c.startsWith(input.toLowerCase()));

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1 && input) {
        // Find common prefix
        const common = matches.reduce((a, b) => {
          let i = 0;
          while (i < a.length && i < b.length && a[i] === b[i]) i++;
          return a.slice(0, i);
        });
        if (common.length > input.length) {
          setInput(common);
        } else {
          addLine('system', matches.join('  '));
        }
      }
    }

    // Submit
    if (e.key === 'Enter' && !isProcessing) {
      executeCommand(input);
    }

    // Clear shortcut
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }

    // Cancel
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setInput('');
      addLine('system', '^C');
    }
  }, [input, historyIndex, isProcessing, executeCommand, addLine]);

  const clear = useCallback(() => {
    setLines([]);
  }, []);

  return {
    lines,
    input,
    setInput,
    isProcessing,
    executeCommand,
    handleKeyDown,
    clear,
  };
}
