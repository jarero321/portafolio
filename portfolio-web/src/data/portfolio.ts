import type { PortfolioData } from '@/types';

export const portfolio: PortfolioData = {
  name: 'Carlos',
  title: 'Software Engineer | Full Stack Developer | Testing & Architecture',
  bio: 'Software Engineer con +5 años en fintech de alto impacto. Especializado en Testing (TDD/BDD), Clean Architecture y escalamiento de productos. Escalé sistemas de México a 8 países LATAM. Growth mindset y ownership de productos.',
  location: 'León, Guanajuato, México | Remote',

  contact: {
    email: 'jareroluis@gmail.com',
    github: 'github.com/jarero321',
    linkedin: 'linkedin.com/in/luis-carlos-jarero-martínez-195855337',
    website: 'portafolio-six-amber.vercel.app',
  },

  skills: [
    // Languages & Frontend
    { name: 'TypeScript', level: 95, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'React', level: 95, category: 'frontend' },
    { name: 'Next.js', level: 90, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },

    // Backend
    { name: 'Node.js', level: 95, category: 'backend' },
    { name: 'NestJS', level: 90, category: 'backend' },
    { name: 'Express.js', level: 90, category: 'backend' },
    { name: 'C# / .NET', level: 85, category: 'backend' },
    { name: '.NET MVC', level: 80, category: 'backend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'Ruby', level: 70, category: 'backend' },
    { name: 'Go', level: 70, category: 'backend' },

    // Testing (Especialidad)
    { name: 'TDD', level: 95, category: 'testing' },
    { name: 'BDD', level: 95, category: 'testing' },
    { name: 'Playwright', level: 90, category: 'testing' },
    { name: 'Cypress', level: 90, category: 'testing' },
    { name: 'Jest', level: 90, category: 'testing' },
    { name: 'Cucumber/Gherkin', level: 85, category: 'testing' },
    { name: 'RSpec', level: 75, category: 'testing' },

    // Architecture (Especialidad)
    { name: 'Clean Architecture', level: 95, category: 'architecture' },
    { name: 'SOLID Principles', level: 95, category: 'architecture' },
    { name: 'Microservices', level: 90, category: 'architecture' },
    { name: 'Event-Driven', level: 90, category: 'architecture' },
    { name: 'REST APIs', level: 95, category: 'architecture' },
    { name: 'GraphQL', level: 80, category: 'architecture' },
    { name: 'Circuit Breaker', level: 85, category: 'architecture' },
    { name: 'Feature Flags', level: 85, category: 'architecture' },

    // Cloud & DevOps
    { name: 'AWS', level: 90, category: 'cloud' },
    { name: 'AWS Lambda', level: 90, category: 'cloud' },
    { name: 'API Gateway', level: 85, category: 'cloud' },
    { name: 'Docker', level: 90, category: 'cloud' },
    { name: 'Kubernetes', level: 80, category: 'cloud' },
    { name: 'GitHub Actions', level: 90, category: 'cloud' },
    { name: 'Azure DevOps', level: 85, category: 'cloud' },
    { name: 'CI/CD', level: 90, category: 'cloud' },

    // Databases
    { name: 'PostgreSQL', level: 90, category: 'database' },
    { name: 'MySQL', level: 85, category: 'database' },
    { name: 'MongoDB', level: 85, category: 'database' },
    { name: 'SQL Server', level: 80, category: 'database' },
    { name: 'Redis', level: 85, category: 'database' },

    // Tools & Version Control
    { name: 'Git', level: 95, category: 'tools' },
    { name: 'GitHub', level: 95, category: 'tools' },
    { name: 'GitLab', level: 85, category: 'tools' },
    { name: 'Linux', level: 85, category: 'tools' },

    // Soft Skills & Leadership
    { name: 'Tech Leadership', level: 95, category: 'soft' },
    { name: 'Team Mentoring', level: 90, category: 'soft' },
    { name: 'Product Ownership', level: 90, category: 'soft' },
    { name: 'Code Reviews', level: 95, category: 'soft' },
    { name: 'Agile/Scrum', level: 90, category: 'soft' },
  ],

  projects: [
    {
      id: 'mcp-repo-monitor',
      name: 'MCP Repo Monitor',
      description: 'GitHub repository monitoring server for Claude AI with real-time CI/CD status, PR tracking, and automated rollback capabilities',
      tech: ['TypeScript', 'MCP SDK', 'GitHub API'],
      github: 'github.com/jarero321/mcp-repo-monitor',
      npm: 'npmjs.com/package/mcp-repo-monitor',
      featured: true,
      category: 'ai-tools',
    },
    {
      id: 'claude-skills',
      name: 'Claude Skills',
      description: 'Collection of custom skills and slash commands for Claude Code, enhancing AI-assisted development workflows',
      tech: ['Markdown', 'Claude Code'],
      github: 'github.com/jarero321/claude-skills',
      featured: true,
      category: 'ai-tools',
    },
    {
      id: 'create-clean-app',
      name: 'Create Clean App',
      description: 'CLI tool to scaffold Node.js projects with Clean Architecture, DDD patterns, and best practices baked in',
      tech: ['Node.js', 'TypeScript', 'CLI'],
      github: 'github.com/jarero321/create-clean-app',
      npm: 'npmjs.com/package/create-clean-app',
      featured: true,
      category: 'cli',
    },
    {
      id: 'cli-builder',
      name: 'CLI Builder',
      description: 'Framework for building beautiful command-line interfaces with TypeScript, featuring prompts, spinners, and colors',
      tech: ['TypeScript', 'Node.js'],
      github: 'github.com/jarero321/cli-builder',
      category: 'cli',
    },
    {
      id: 'portfolio-web',
      name: 'Terminal Portfolio',
      description: 'This interactive terminal-style portfolio with 50+ commands, i18n support, and glassmorphism UI',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
      github: 'github.com/jarero321/portafolio',
      url: 'portafolio-six-amber.vercel.app',
      featured: true,
      category: 'web',
    },
    {
      id: 'transaction-events-api',
      name: 'Transaction Events API',
      description: 'Event-driven microservice for processing financial transactions with CQRS pattern and real-time notifications',
      tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'RabbitMQ'],
      github: 'github.com/jarero321/transaction-events-api',
      category: 'fintech',
    },
  ],

  experience: [
    {
      company: 'PAYCASH',
      role: 'Senior Fullstack Developer',
      period: 'Ene 2025 - Present',
      description: 'Plataforma de pagos LATAM | Remoto',
      highlights: [
        'Ownership completo del módulo de facturación escalando de México a 8 países LATAM',
        'Resolución de problema crítico de connection pooling que bloqueaba escalamiento',
        'Implementación de circuit breakers con métricas y documentación de trade-offs',
        'Desarrollo de packages internos reutilizables y arquitectura de referencia',
        'Participación activa en definición de producto y mejora continua',
      ],
      tech: ['Node.js', 'TypeScript', 'AWS Lambda', 'API Gateway', 'C#/.NET MVC', 'PostgreSQL', 'GitHub Actions'],
    },
    {
      company: 'KUSPIT Casa de Bolsa',
      role: 'Frontend Lead',
      period: 'Feb 2024 - Dic 2024',
      description: 'Plataforma bursátil regulada | Remoto',
      highlights: [
        'Liderazgo de equipo frontend para migración de plataforma de pagos y wallet digital',
        'Definición de arquitectura con Clean Architecture y principios SOLID',
        'Implementación de estrategia de testing con Playwright para E2E cross-browser',
        'Diseño de pipelines CI/CD en Azure DevOps con gates de calidad automatizados',
      ],
      tech: ['Next.js', 'TypeScript', 'React', 'Zustand', 'Playwright', 'Azure DevOps'],
    },
    {
      company: 'FORTE Innovation Consulting',
      role: 'Frontend Lead',
      period: 'Ene 2023 - Feb 2024',
      description: 'Consultoría de innovación | Remoto',
      highlights: [
        'Implementación de BDD con Cucumber y Gherkin para specs compartidas entre QA, desarrollo y negocio',
        'Definición de estándares de código y mejores prácticas para equipo de 5 desarrolladores',
        'Colaboración directa con Product Owners en análisis y priorización',
        'Mentoría técnica y code reviews enfocados en mejora continua',
      ],
      tech: ['React', 'TypeScript', 'Cucumber', 'BDD', 'Git', 'Scrum'],
    },
    {
      company: 'DD360',
      role: 'Frontend Developer',
      period: 'Ene 2022 - Ene 2023',
      description: 'Fintech hipotecaria | Remoto',
      highlights: [
        'Desarrollo de features core en plataforma con arquitectura de microservicios',
        'Aplicación de TDD en componentes críticos e integration testing para KYC',
        'Implementación de flujos UX complejos: stepper multi-paso y formularios dinámicos',
        'Trabajo en equipo de 15+ personas con ex-CTO de Rappi LATAM',
      ],
      tech: ['React', 'TypeScript', 'Cypress', 'Jest', 'Microservices'],
    },
    {
      company: 'ThinkCare Technologies',
      role: 'Tech Lead',
      period: 'Ene 2021 - Dic 2022',
      description: 'Plataforma de tecnología | Remoto',
      highlights: [
        'Definición de arquitectura frontend con Clean Architecture y SOLID desde cero',
        'Establecimiento de cultura de testing: unit, integration y E2E como práctica estándar',
        'Migración de SPAs a Next.js mejorando SEO y tiempos de carga',
        'Liderazgo de equipos con metodología Scrum y Agile',
      ],
      tech: ['React', 'Next.js', 'TypeScript', 'Testing', 'Git', 'Scrum'],
    },
  ],

  education: [
    {
      institution: 'CECyTE Plantel Purísima',
      degree: 'Bachillerato Técnico en Computación',
      period: '2018',
      description: 'Formación técnica en programación y sistemas computacionales.',
    },
    {
      institution: 'Platzi & Continuous Learning',
      degree: 'Formación Continua en Software',
      period: '2019 - Present',
      description: 'Arquitectura de Software, Kafka, Kubernetes, AWS, Clean Code, Testing.',
    },
  ],
};

export const asciiArt = {
  logo: `
   ___   __   ____  __    __   ____
  / __) / _\\ (  _ \\(  )  /  \\ / ___)
 ( (__ /    \\ )   // (_/\\(  O )\\___ \\
  \\___)\\_ / (__\\_)\\____/ \\__/ (____/
`,
  logoMobile: `
   ___   __   ____  __    __   ____
  / __) / _\\ (  _ \\(  )  /  \\ / ___)
 ( (__ /    \\ )   // (_/\\(  O )\\___ \\
  \\___)\\_ / (__\\_)\\____/ \\__/ (____/
`,
  coffee: `
      ( (
       ) )
    .______.
    |      |]
    \\      /
     '----'
`,
  welcome: `
  Welcome to my interactive portfolio!
  Type 'help' to see available commands.
`,
};
