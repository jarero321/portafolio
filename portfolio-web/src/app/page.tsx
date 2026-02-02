'use client';

import { Terminal } from '@/components/Terminal';

const commandHints = [
  { cmd: 'about', desc: 'Who am I' },
  { cmd: 'projects', desc: 'My work' },
  { cmd: 'skills', desc: 'Tech stack' },
  { cmd: 'contact', desc: 'Get in touch' },
];

export default function Home() {
  return (
    <div className="landing">
      {/* Subtle gradient background */}
      <div className="landing-bg" />

      {/* Header */}
      <header className="landing-header">
        <div className="header-badge">
          <span className="badge-dot" />
          <span>Available for work</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="landing-main">
        <div className="hero-text">
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name">Carlos</span>
          </h1>
          <p className="hero-subtitle">
            Full Stack Developer crafting digital experiences
          </p>
        </div>

        {/* Terminal */}
        <div className="terminal-container">
          <Terminal />
        </div>

        {/* Command hints */}
        <div className="command-hints">
          <span className="hints-label">Try:</span>
          {commandHints.map((hint, i) => (
            <span key={hint.cmd} className="hint-item">
              <code className="hint-cmd">{hint.cmd}</code>
              <span className="hint-desc">{hint.desc}</span>
              {i < commandHints.length - 1 && <span className="hint-separator">·</span>}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <span className="footer-separator">·</span>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <span className="footer-separator">·</span>
          <a href="mailto:hello@example.com" className="footer-link">
            Email
          </a>
        </div>
        <p className="footer-copy">
          Built with Next.js · Inspired by the terminal
        </p>
      </footer>
    </div>
  );
}
