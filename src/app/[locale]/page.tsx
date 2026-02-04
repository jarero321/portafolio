'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal } from '@/components/Terminal';
import { t, type Language } from '@/lib/i18n';
import { portfolio } from '@/data/portfolio';

const languages: { code: Language; flag: string }[] = [
  { code: 'en', flag: 'EN' },
  { code: 'es', flag: 'ES' },
  { code: 'bin', flag: '01' },
];

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const lang = locale as Language;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === lang || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      router.push(`/${newLang}`);
    }, 200);
  };

  const commandHints = [
    { cmd: 'about', desc: t('aboutHint') },
    { cmd: 'projects', desc: t('projectsHint') },
    { cmd: 'skills', desc: t('skillsHint') },
    { cmd: 'contact', desc: t('contactHint') },
  ];

  const landingClass = isTransitioning
    ? 'landing landing-transition-out'
    : isReady
      ? 'landing landing-transition-in'
      : 'landing';

  return (
    <div className={landingClass}>
      <div className="landing-bg" />

      <header className="landing-header">
        {/* Language Switcher - Segmented Control */}
        <div className="lang-switcher">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code)}
              className={`lang-btn ${lang === l.code ? 'lang-btn-active' : ''}`}
              disabled={isTransitioning}
            >
              <span className="lang-code">{l.flag}</span>
            </button>
          ))}
        </div>

        <div className="header-badge">
          <span className="badge-dot" />
          <span>{t('availableForWork')}</span>
        </div>
      </header>

      <main className="landing-main">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="hero-greeting">{t('heroGreeting')}</span>
            <span className="hero-name">{t('heroName')}</span>
          </h1>
          <p className="hero-subtitle">{t('heroSubtitle')}</p>
        </div>

        <div className="terminal-container">
          <Terminal key={lang} />
        </div>

        <div className="command-hints">
          <span className="hints-label">{t('tryHint')}</span>
          {commandHints.map((hint, i) => (
            <span key={hint.cmd} className="hint-item">
              <code className="hint-cmd">{hint.cmd}</code>
              <span className="hint-desc">{hint.desc}</span>
              {i < commandHints.length - 1 && <span className="hint-separator">·</span>}
            </span>
          ))}
        </div>
      </main>

      <footer className="landing-footer">
        <div className="footer-links">
          <a href={`https://${portfolio.contact.github}`} target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <span className="footer-separator">·</span>
          <a href={`https://${portfolio.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <span className="footer-separator">·</span>
          <a href={`mailto:${portfolio.contact.email}`} className="footer-link">
            Email
          </a>
        </div>
        <p className="footer-copy">{t('footerBuilt')}</p>
      </footer>
    </div>
  );
}
