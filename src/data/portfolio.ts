import type { PortfolioData } from '@/types';

export const portfolio: PortfolioData = {
  name: 'Luis Carlos Jarero',
  title: 'Senior Software Engineer | Fintech Specialist',
  bio: 'Software Engineer with 5+ years in fintech building scalable systems across 8 LATAM countries.',
  location: 'Mexico | Remote',

  contact: {
    email: 'jarero321@gmail.com',
    github: 'github.com/jarero321',
    linkedin: 'linkedin.com/in/jarero',
    website: 'jarero.dev',
  },

  skills: [
    // Frontend
    { name: 'TypeScript', level: 95, category: 'frontend' },
    { name: 'React', level: 95, category: 'frontend' },
    { name: 'Next.js', level: 90, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 85, category: 'frontend' },

    // Backend
    { name: 'Node.js', level: 95, category: 'backend' },
    { name: 'NestJS', level: 90, category: 'backend' },
    { name: 'C# / .NET', level: 80, category: 'backend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'Go', level: 70, category: 'backend' },

    // Testing
    { name: 'Jest', level: 90, category: 'testing' },
    { name: 'Playwright', level: 90, category: 'testing' },
    { name: 'Cypress', level: 85, category: 'testing' },
    { name: 'TDD/BDD', level: 90, category: 'testing' },

    // Architecture
    { name: 'Clean Architecture', level: 90, category: 'architecture' },
    { name: 'SOLID Principles', level: 95, category: 'architecture' },
    { name: 'Microservices', level: 90, category: 'architecture' },
    { name: 'Event-Driven', level: 85, category: 'architecture' },
    { name: 'DDD', level: 80, category: 'architecture' },

    // Cloud & DevOps
    { name: 'AWS', level: 85, category: 'cloud' },
    { name: 'Docker', level: 90, category: 'cloud' },
    { name: 'Kubernetes', level: 75, category: 'cloud' },
    { name: 'CI/CD', level: 85, category: 'cloud' },

    // Databases
    { name: 'PostgreSQL', level: 90, category: 'database' },
    { name: 'MongoDB', level: 85, category: 'database' },
    { name: 'Redis', level: 80, category: 'database' },

    // Tools
    { name: 'Git', level: 95, category: 'tools' },
    { name: 'Linux', level: 85, category: 'tools' },

    // Soft Skills
    { name: 'Tech Leadership', level: 90, category: 'soft' },
    { name: 'Problem Solving', level: 95, category: 'soft' },
    { name: 'Mentoring', level: 85, category: 'soft' },
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
      description: 'This interactive terminal-style portfolio with 20+ commands, i18n support, and glassmorphism UI',
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind'],
      github: 'github.com/jarero321/portafolio',
      url: 'jarero.dev',
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
      role: 'Senior Software Engineer',
      period: '2023 - Present',
      description: 'Leading fintech platform development for LATAM expansion',
      highlights: [
        'Scaled payment systems to 8 LATAM countries',
        'Architected event-driven microservices processing millions of transactions',
        'Led team of 5 engineers, mentoring junior developers',
      ],
      tech: ['TypeScript', 'NestJS', 'AWS', 'PostgreSQL', 'RabbitMQ'],
    },
    {
      company: 'KUSPIT',
      role: 'Software Engineer',
      period: '2022 - 2023',
      description: 'Investment platform development for retail traders',
      highlights: [
        'Built real-time trading interfaces with React',
        'Implemented secure authentication with multi-factor auth',
        'Reduced API response times by 40%',
      ],
      tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
    {
      company: 'FORTE',
      role: 'Full Stack Developer',
      period: '2021 - 2022',
      description: 'E-commerce and inventory management solutions',
      highlights: [
        'Developed inventory management system handling 50k+ SKUs',
        'Built admin dashboard with real-time analytics',
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Docker'],
    },
    {
      company: 'DD360',
      role: 'Frontend Developer',
      period: '2020 - 2021',
      description: 'Real estate investment platform',
      highlights: [
        'Built property investment flows with complex form wizards',
        'Implemented responsive design system',
      ],
      tech: ['React', 'TypeScript', 'Styled Components'],
    },
    {
      company: 'ThinkCare',
      role: 'Junior Developer',
      period: '2019 - 2020',
      description: 'Healthcare management platform',
      highlights: [
        'Developed patient management modules',
        'Contributed to HIPAA-compliant data handling',
      ],
      tech: ['JavaScript', 'React', 'Node.js'],
    },
  ],

  education: [
    {
      institution: 'Universidad Autónoma de México',
      degree: 'B.S. Computer Science',
      period: '2015 - 2019',
      description: 'Focus on software engineering and distributed systems.',
    },
    {
      institution: 'Professional Certifications',
      degree: 'AWS & Cloud Technologies',
      period: '2020 - Present',
      description: 'AWS Cloud Practitioner, Kubernetes Fundamentals.',
    },
  ],
};

export const asciiArt = {
  logo: `
 ██████╗ █████╗ ██████╗ ██╗      ██████╗ ███████╗
██╔════╝██╔══██╗██╔══██╗██║     ██╔═══██╗██╔════╝
██║     ███████║██████╔╝██║     ██║   ██║███████╗
██║     ██╔══██║██╔══██╗██║     ██║   ██║╚════██║
╚██████╗██║  ██║██║  ██║███████╗╚██████╔╝███████║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝
`,
  logoMobile: `[ CARLOS ]`,
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
