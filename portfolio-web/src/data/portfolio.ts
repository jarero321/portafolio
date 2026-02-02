import type { PortfolioData } from '@/types';

export const portfolio: PortfolioData = {
  name: 'Carlos Developer',
  title: 'Full Stack Developer',
  bio: 'Passionate developer focused on creating elegant solutions. I love clean code, good UX, and learning new technologies.',
  location: 'Remote',

  contact: {
    email: 'hello@example.com',
    github: 'github.com/username',
    linkedin: 'linkedin.com/in/username',
    twitter: '@username',
    website: 'example.com',
  },

  skills: [
    // Frontend
    { name: 'TypeScript', level: 90, category: 'frontend' },
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 85, category: 'frontend' },
    { name: 'CSS/Tailwind', level: 85, category: 'frontend' },
    { name: 'Vue.js', level: 70, category: 'frontend' },

    // Backend
    { name: 'Node.js', level: 85, category: 'backend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'PostgreSQL', level: 80, category: 'backend' },
    { name: 'GraphQL', level: 70, category: 'backend' },
    { name: 'REST APIs', level: 90, category: 'backend' },

    // Tools
    { name: 'Git', level: 90, category: 'tools' },
    { name: 'Docker', level: 75, category: 'tools' },
    { name: 'Linux', level: 80, category: 'tools' },
    { name: 'CI/CD', level: 70, category: 'tools' },

    // Soft skills
    { name: 'Problem Solving', level: 90, category: 'soft' },
    { name: 'Communication', level: 85, category: 'soft' },
    { name: 'Team Work', level: 90, category: 'soft' },
  ],

  projects: [
    {
      id: 'cli-portfolio',
      name: 'CLI Portfolio',
      description: 'Interactive terminal-style portfolio with Apple-inspired design',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      github: 'github.com/username/cli-portfolio',
      url: 'portfolio.example.com',
      featured: true,
    },
    {
      id: 'task-manager',
      name: 'Task Manager Pro',
      description: 'Full-stack task management app with real-time collaboration',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
      github: 'github.com/username/task-manager',
      featured: true,
    },
    {
      id: 'weather-app',
      name: 'Weather Dashboard',
      description: 'Beautiful weather app with forecasts and location tracking',
      tech: ['Vue.js', 'OpenWeather API', 'Chart.js'],
      github: 'github.com/username/weather-app',
      url: 'weather.example.com',
    },
    {
      id: 'blog-platform',
      name: 'Dev Blog Platform',
      description: 'Markdown-based blog with syntax highlighting and comments',
      tech: ['Next.js', 'MDX', 'Prisma'],
      github: 'github.com/username/blog-platform',
    },
  ],

  experience: [
    {
      company: 'Tech Corp',
      role: 'Senior Frontend Developer',
      period: '2022 - Present',
      description: 'Leading frontend architecture and mentoring junior developers. Building scalable React applications.',
      tech: ['React', 'TypeScript', 'GraphQL'],
    },
    {
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Built core product features from scratch. Implemented CI/CD pipelines and improved performance by 40%.',
      tech: ['Node.js', 'React', 'PostgreSQL'],
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      period: '2018 - 2020',
      description: 'Delivered 20+ projects for clients across various industries. Specialized in e-commerce solutions.',
      tech: ['JavaScript', 'PHP', 'WordPress'],
    },
  ],

  education: [
    {
      institution: 'University of Technology',
      degree: 'B.S. Computer Science',
      period: '2014 - 2018',
      description: 'Focus on software engineering and algorithms. Graduated with honors.',
    },
    {
      institution: 'Online Certifications',
      degree: 'Various Tech Certifications',
      period: '2018 - Present',
      description: 'AWS Cloud Practitioner, Google Analytics, Meta Frontend Developer.',
    },
  ],
};

export const asciiArt = {
  logo: `
 ╔═══════════════════════════════╗
 ║   ▄████▄   ▄▄▄       ██▀███   ║
 ║  ▒██▀ ▀█  ▒████▄    ▓██ ▒ ██▒ ║
 ║  ▒▓█    ▄ ▒██  ▀█▄  ▓██ ░▄█ ▒ ║
 ║  ▒▓▓▄ ▄██▒░██▄▄▄▄██ ▒██▀▀█▄   ║
 ║  ▒ ▓███▀ ░ ▓█   ▓██▒░██▓ ▒██▒ ║
 ║  ░ ░▒ ▒  ░ ▒▒   ▓▒█░░ ▒▓ ░▒▓░ ║
 ╚═══════════════════════════════╝
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
