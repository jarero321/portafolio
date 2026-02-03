'use client';

interface Props {
  title?: string;
}

export function TerminalHeader({ title = 'portfolio — bash' }: Props) {
  return (
    <div className="terminal-header">
      <div className="terminal-btn terminal-btn-close" />
      <div className="terminal-btn terminal-btn-minimize" />
      <div className="terminal-btn terminal-btn-maximize" />
      <span className="terminal-title">{title}</span>
    </div>
  );
}
