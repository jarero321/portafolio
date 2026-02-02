'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { TerminalLine } from '@/types';
import { registry } from '@/lib/commands/registry';
import { parseCommand } from '@/lib/commands/parser';

import '@/lib/commands';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const thinkingMessages = [
  'Processing...',
  'Thinking...',
  'Computing...',
  'Analyzing...',
  'Loading data...',
  'Fetching info...',
  'Almost there...',
];

function getRandomThinkingMessage(): string {
  return thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)];
}

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [thinkingMessage, setThinkingMessage] = useState<string | null>(null);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const commandHistory = useRef<string[]>([]);
  const initialized = useRef(false);

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

  const typeText = useCallback(async (text: string, type: TerminalLine['type']) => {
    const lineId = generateId();
    const words = text.split(' ');
    let currentText = '';

    // Add empty line first
    setLines(prev => [...prev, { id: lineId, type, content: '', timestamp: Date.now() }]);

    // Type word by word
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      const finalText = currentText;

      setLines(prev =>
        prev.map(line =>
          line.id === lineId ? { ...line, content: finalText } : line
        )
      );

      // Small delay between words (faster for better UX)
      if (i < words.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 15));
      }
    }
  }, []);

  const executeCommand = useCallback(async (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    addLine('input', trimmed);
    commandHistory.current = [trimmed, ...commandHistory.current.slice(0, 49)];
    setHistoryIndex(-1);
    setInput('');
    setIsProcessing(true);

    // Show thinking message
    const thinking = getRandomThinkingMessage();
    setThinkingMessage(thinking);

    // Simulate processing delay (300-600ms)
    const delay = 300 + Math.random() * 300;
    await new Promise(resolve => setTimeout(resolve, delay));

    setThinkingMessage(null);

    const { name, args } = parseCommand(trimmed);
    const result = await registry.execute(name, args);

    if (result.clear) {
      setLines([]);
    } else if (result.output) {
      // Use typing effect for longer outputs
      if (result.output.length > 100) {
        await typeText(result.output, result.isError ? 'error' : 'output');
      } else {
        addLine(result.isError ? 'error' : 'output', result.output);
      }
    }

    setIsProcessing(false);
  }, [addLine, typeText]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
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

    if (e.key === 'Tab') {
      e.preventDefault();
      const commands = registry.getNames();
      const matches = commands.filter(c => c.startsWith(input.toLowerCase()));

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1 && input) {
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

    if (e.key === 'Enter' && !isProcessing) {
      executeCommand(input);
    }

    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }

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
    thinkingMessage,
    executeCommand,
    handleKeyDown,
    clear,
  };
}
