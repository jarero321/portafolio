import type { Command } from '@/types';
import { portfolio, asciiArt } from '@/data/portfolio';
import { registry } from './registry';
import { getLanguage, t } from '@/lib/i18n';
import { isMobile, skillBar } from '@/lib/utils';

function getLogo(): string {
  return isMobile() ? asciiArt.logoMobile : asciiArt.logo;
}

function getColoredLogo(): string {
  const logo = getLogo();
  return logo.split('\n').map(line => `\x1b[36m${line}\x1b[0m`).join('\n');
}

export const help: Command = {
  name: 'help',
  description: 'Show available commands',
  usage: 'help [command]',
  execute: (args) => {
    if (args[0]) {
      const cmd = registry.get(args[0]);
      if (cmd) {
        return {
          output: `${cmd.name} - ${cmd.description}\n${cmd.usage ? `Usage: ${cmd.usage}` : ''}`,
        };
      }
      return { output: `${t('commandNotFound')}: ${args[0]}`, isError: true };
    }

    const mainCmds = ['help', 'about', 'projects', 'skills', 'experience', 'education', 'contact', 'clear', 'lang'];
    const lines = [
      `\x1b[1m${t('availableCommands')}:\x1b[0m`,
      '',
      ...mainCmds.map(name => {
        const c = registry.get(name);
        return c ? `  \x1b[36m${c.name.padEnd(12)}\x1b[0m ${c.description}` : '';
      }).filter(Boolean),
      '',
      `\x1b[90m${t('tipLinux')}\x1b[0m`,
    ];
    return { output: lines.join('\n') };
  },
};

export const about: Command = {
  name: 'about',
  description: 'About me',
  execute: () => {
    const lang = getLanguage();

    const bioEn = `Software Engineer with 5+ years in high-impact fintech systems.

\x1b[33m→ Specialization:\x1b[0m
  Testing Expert: TDD, BDD, Cucumber, Playwright, Cypress
  Software Architecture: Clean Architecture, SOLID, Microservices
  Full Stack: TypeScript, Node.js, React, Next.js, .NET

\x1b[33m→ Leadership:\x1b[0m
  Frontend Lead & Tech Lead roles across multiple companies
  Team mentoring and code review culture
  Product ownership and continuous improvement

\x1b[33m→ Impact:\x1b[0m
  Scaled billing module from Mexico to 8 LATAM countries
  Solved critical connection pooling blocking system scale
  Banking integrations: NEQUI, PIX, Bancolombia, Transfiya`;

    const bioEs = `Ingeniero de Software con 5+ años en fintech de alto impacto.

\x1b[33m→ Especialización:\x1b[0m
  Testing Expert: TDD, BDD, Cucumber, Playwright, Cypress
  Arquitectura de Software: Clean Architecture, SOLID, Microservicios
  Full Stack: TypeScript, Node.js, React, Next.js, .NET

\x1b[33m→ Liderazgo:\x1b[0m
  Roles de Frontend Lead y Tech Lead en múltiples empresas
  Mentoría de equipos y cultura de code review
  Ownership de productos y mejora continua

\x1b[33m→ Impacto:\x1b[0m
  Escalé módulo de facturación de México a 8 países LATAM
  Resolví connection pooling crítico que bloqueaba escalamiento
  Integraciones bancarias: NEQUI, PIX, Bancolombia, Transfiya`;

    const bio = lang === 'es' ? bioEs : lang === 'bin'
      ? '01000100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010'
      : bioEn;

    const lines = [
      getColoredLogo(),
      '',
      `\x1b[1m${portfolio.name}\x1b[0m`,
      `\x1b[90m${portfolio.title}\x1b[0m`,
      '',
      bio,
      '',
      `\x1b[90m📍 ${portfolio.location}\x1b[0m`,
    ];
    return { output: lines.join('\n') };
  },
};

export const projects: Command = {
  name: 'projects',
  description: 'View my projects',
  usage: 'projects [--featured]',
  execute: (args) => {
    let items = portfolio.projects;

    if (args.includes('--featured')) {
      items = items.filter(p => p.featured);
    }

    const lines = [`\x1b[1m${t('projectsTitle')}:\x1b[0m`, ''];

    items.forEach((p, i) => {
      const isLast = i === items.length - 1;

      lines.push(`\x1b[36m${p.name}\x1b[0m ${p.featured ? '⭐' : ''}`);
      lines.push(`  ${p.description}`);
      lines.push(`  \x1b[90m${t('tech')}: ${p.tech.join(', ')}\x1b[0m`);
      if (p.github) lines.push(`  \x1b[90m🔗 ${p.github}\x1b[0m`);
      if (p.url) lines.push(`  \x1b[90m🌐 ${p.url}\x1b[0m`);
      if (!isLast) lines.push('');
    });

    return { output: lines.join('\n') };
  },
};

export const skills: Command = {
  name: 'skills',
  description: 'View my skills',
  usage: 'skills [--category=frontend|backend|testing|architecture|cloud|database|tools|soft]',
  execute: (args) => {
    let items = portfolio.skills;
    const categoryFlag = args.find(a => a.startsWith('--category='));

    if (categoryFlag) {
      const category = categoryFlag.split('=')[1];
      items = items.filter(s => s.category === category);
    }

    const categoryNames: Record<string, keyof typeof import('@/lib/i18n').translations.en> = {
      frontend: 'frontend',
      backend: 'backend',
      testing: 'testing',
      architecture: 'architecture',
      cloud: 'cloud',
      database: 'database',
      tools: 'tools',
      soft: 'soft',
    };

    const categories = ['frontend', 'backend', 'testing', 'architecture', 'cloud', 'database', 'tools', 'soft'] as const;
    const lines: string[] = [`\x1b[1m${t('skillsTitle')}:\x1b[0m`, ''];

    categories.forEach(cat => {
      const catSkills = items.filter(s => s.category === cat);
      if (catSkills.length === 0) return;

      lines.push(`\x1b[33m${t(categoryNames[cat])}:\x1b[0m`);
      catSkills.forEach(s => {
        lines.push(`  ${s.name.padEnd(16)} ${skillBar(s.level)}`);
      });
      lines.push('');
    });

    return { output: lines.join('\n') };
  },
};

export const experience: Command = {
  name: 'experience',
  description: 'View my work experience',
  execute: () => {
    const lines = [`\x1b[1m${t('experienceTitle')}:\x1b[0m`, ''];

    portfolio.experience.forEach((exp, i) => {
      const isLast = i === portfolio.experience.length - 1;

      lines.push(`\x1b[36m${exp.role}\x1b[0m @ \x1b[1m${exp.company}\x1b[0m`);
      lines.push(`  \x1b[90m${exp.period}\x1b[0m`);
      lines.push(`  ${exp.description}`);
      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach(h => {
          lines.push(`  \x1b[32m→\x1b[0m ${h}`);
        });
      }
      if (exp.tech) {
        lines.push(`  \x1b[90m${t('tech')}: ${exp.tech.join(', ')}\x1b[0m`);
      }
      if (!isLast) lines.push('');
    });

    return { output: lines.join('\n') };
  },
};

export const education: Command = {
  name: 'education',
  description: 'View my education',
  execute: () => {
    const lines = [`\x1b[1m${t('educationTitle')}:\x1b[0m`, ''];

    portfolio.education.forEach((edu, i) => {
      const isLast = i === portfolio.education.length - 1;

      lines.push(`\x1b[36m${edu.degree}\x1b[0m`);
      lines.push(`  \x1b[1m${edu.institution}\x1b[0m`);
      lines.push(`  \x1b[90m${edu.period}\x1b[0m`);
      if (edu.description) {
        lines.push(`  ${edu.description}`);
      }
      if (!isLast) lines.push('');
    });

    return { output: lines.join('\n') };
  },
};

export const contact: Command = {
  name: 'contact',
  description: 'Get my contact info',
  execute: () => {
    const c = portfolio.contact;
    const lines = [
      `\x1b[1m${t('contactTitle')}:\x1b[0m`,
      '',
      `  \x1b[36m📧 Email:\x1b[0m    ${c.email}`,
      c.github ? `  \x1b[36m🐙 GitHub:\x1b[0m   ${c.github}` : '',
      c.linkedin ? `  \x1b[36m💼 LinkedIn:\x1b[0m ${c.linkedin}` : '',
      c.twitter ? `  \x1b[36m🐦 Twitter:\x1b[0m  ${c.twitter}` : '',
      c.website ? `  \x1b[36m🌐 Website:\x1b[0m  ${c.website}` : '',
    ].filter(Boolean);

    return { output: lines.join('\n') };
  },
};

export const clear: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => ({ output: '', clear: true }),
};

export const welcome: Command = {
  name: 'welcome',
  description: 'Show welcome message',
  execute: () => {
    const lines = [
      getColoredLogo(),
      '',
      `\x1b[1m${t('welcomeTitle')} ${portfolio.name}'s ${t('welcomePortfolio')}\x1b[0m`,
      '',
      `${t('welcomeHelp')} \x1b[36m${t('welcomeHelpCmd')}\x1b[0m ${t('welcomeHelpEnd')}`,
      '',
    ];
    return { output: lines.join('\n') };
  },
};

export const mainCommands = [
  help, about, projects, skills, experience, education, contact, clear, welcome
];
