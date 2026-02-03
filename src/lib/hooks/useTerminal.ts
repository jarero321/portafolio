'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { TerminalLine } from '@/types';
import { registry } from '@/lib/commands/registry';
import { parseCommand } from '@/lib/commands/parser';
import { getLanguage } from '@/lib/i18n';

import '@/lib/commands';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

const thinkingMessages = {
  en: [
    'Copying from StackOverflow...',
    'Deleting node_modules...',
    'Mass googling...',
    'Clearing cache, just in case...',
    'Blaming the intern...',
    'Reticulating splines...',
    'Consulting ChatGPT...',
    'Hiding console.logs...',
    'Pretending to work...',
    'Adding !important everywhere...',
    'Praying to the demo gods...',
    'Turning it off and on again...',
    'Is it a cache issue?...',
    'Blaming DNS...',
    'git reset --hard...',
    'Reading the docs... just kidding...',
    'Mass Ctrl+Z\'ing...',
  ],
  es: [
    'Copiando de StackOverflow...',
    'Borrando node_modules...',
    'Googleando masivamente...',
    'Limpiando caché, por si acaso...',
    'Culpando al becario...',
    'Reticulando splines...',
    'Consultando a ChatGPT...',
    'Escondiendo console.logs...',
    'Fingiendo que trabajo...',
    'Añadiendo !important...',
    'Rezando a los dioses del deploy...',
    'Apagando y encendiendo...',
    '¿Será problema de caché?...',
    'Culpando al DNS...',
    'Volviendo al último commit...',
  ],
  bin: [
    '01000011 01101111 01110000 01111001 01101001 01101110 01100111...',
    '01000100 01100101 01101100 01100101 01110100 01101001 01101110 01100111...',
    '01010000 01110010 01101111 01100011 01100101 01110011 01110011...',
    '01000010 01100101 01100101 01110000 00100000 01100010 01101111 01101111 01110000...',
    '01001000 01100001 01100011 01101011 01101001 01101110 01100111...',
    '01010010 01100101 01100010 01101111 01101111 01110100 01101001 01101110 01100111...',
  ],
};

function getRandomThinkingMessage(): string {
  const lang = getLanguage();
  const messages = thinkingMessages[lang];
  return messages[Math.floor(Math.random() * messages.length)];
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
    // Split by lines and add each line with minimal delay (like a real terminal)
    const textLines = text.split('\n');

    for (let i = 0; i < textLines.length; i++) {
      const lineContent = textLines[i];
      const lineId = generateId();

      setLines(prev => [...prev, { id: lineId, type, content: lineContent, timestamp: Date.now() }]);

      // Very fast delay - just enough to see the streaming effect
      if (i < textLines.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 8));
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
