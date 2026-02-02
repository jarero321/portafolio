'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal } from '@/components/Terminal';
import { getLanguage, onLanguageChange, t, type Language } from '@/lib/i18n';

const languages: { code: Language; flag: string; label: string }[] = [
  { code: 'en', flag: '🇺🇸', label: 'EN' },
  { code: 'es', flag: '🇪🇸', label: 'ES' },
  { code: 'bin', flag: '🤖', label: '01' },
];

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const [lang, setLang] = useState<Language>((locale as Language) || 'en');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Sync with global state
    setLang(getLanguage());
    const unsubscribe = onLanguageChange((newLang) => {
      setLang(newLang);
    });
    return unsubscribe;
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    if (newLang === lang) return;

    // Start transition animation
    setIsTransitioning(true);

    // Navigate to new locale after fade out
    setTimeout(() => {
      router.push(`/${newLang}`);
      setIsTransitioning(false);
    }, 200);
  };

  const commandHints = [
    { cmd: 'about', desc: t('aboutHint') },
    { cmd: 'projects', desc: t('projectsHint') },
    { cmd: 'skills', desc: t('skillsHint') },
    { cmd: 'contact', desc: t('contactHint') },
  ];

  return (
    <div className={`landing ${isTransitioning ? 'landing-transition-out' : 'landing-transition-in'}`}>
      <div className="landing-bg" />

      <header className="landing-header">
        {/* Language Switcher */}
        <div className="lang-switcher">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => handleLanguageChange(l.code)}
              className={`lang-btn ${lang === l.code ? 'lang-btn-active' : ''}`}
              title={l.label}
              disabled={isTransitioning}
            >
              <span className="lang-flag">{l.flag}</span>
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
        <p className="footer-copy">{t('footerBuilt')}</p>
      </footer>
    </div>
  );
}
