'use client';

export function TerminalHeader() {
  return (
    <div className="terminal-header">
      <div className="terminal-btn terminal-btn-close" />
      <div className="terminal-btn terminal-btn-minimize" />
      <div className="terminal-btn terminal-btn-maximize" />
      <span className="terminal-title">carlos@portfolio — bash</span>
    </div>
  );
}
