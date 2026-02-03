export type Language = 'en' | 'es' | 'bin';

// Listeners for language changes
type LanguageListener = (lang: Language) => void;
const listeners: LanguageListener[] = [];

let currentLanguage: Language = 'en';

export const translations = {
  en: {
    // Landing
    availableForWork: 'Available for work',
    heroGreeting: "Hi, I'm",
    heroName: 'Carlos',
    heroSubtitle: 'Full Stack Developer crafting digital experiences',
    tryHint: 'Try:',
    aboutHint: 'Who am I',
    projectsHint: 'My work',
    skillsHint: 'Tech stack',
    contactHint: 'Get in touch',
    footerBuilt: 'Built with Next.js · Inspired by the terminal',

    // Welcome & About
    welcomeTitle: 'Welcome to',
    welcomePortfolio: 'Terminal Portfolio',
    welcomeHelp: 'Type',
    welcomeHelpCmd: 'help',
    welcomeHelpEnd: 'to see available commands.',

    // Commands
    availableCommands: 'Available Commands',
    tipLinux: 'Tip: Try some Linux commands too... 👀',

    // Sections
    projectsTitle: 'Projects',
    skillsTitle: 'Skills',
    experienceTitle: 'Experience',
    educationTitle: 'Education',
    contactTitle: 'Contact',

    // Categories
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools',
    soft: 'Soft Skills',

    // Misc
    tech: 'Tech',
    coffeeMsg: "Here's a virtual coffee for you!",
    exitMsg: 'Thanks for visiting!',
    connectionClosed: 'Connection closed.',
    commandNotFound: 'Command not found',
    langChanged: 'Language changed to',
    langCurrent: 'Current language',
    langAvailable: 'Available',
  },
  es: {
    // Landing
    availableForWork: 'Disponible para trabajar',
    heroGreeting: 'Hola, soy',
    heroName: 'Carlos',
    heroSubtitle: 'Full Stack Developer creando experiencias digitales',
    tryHint: 'Prueba:',
    aboutHint: 'Quién soy',
    projectsHint: 'Mi trabajo',
    skillsHint: 'Stack técnico',
    contactHint: 'Contacto',
    footerBuilt: 'Hecho con Next.js · Inspirado en la terminal',

    // Welcome & About
    welcomeTitle: 'Bienvenido a',
    welcomePortfolio: 'Terminal Portfolio',
    welcomeHelp: 'Escribe',
    welcomeHelpCmd: 'help',
    welcomeHelpEnd: 'para ver los comandos.',

    // Commands
    availableCommands: 'Comandos Disponibles',
    tipLinux: 'Tip: Prueba comandos de Linux... 👀',

    // Sections
    projectsTitle: 'Proyectos',
    skillsTitle: 'Habilidades',
    experienceTitle: 'Experiencia',
    educationTitle: 'Educación',
    contactTitle: 'Contacto',

    // Categories
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Herramientas',
    soft: 'Habilidades Blandas',

    // Misc
    tech: 'Tech',
    coffeeMsg: '¡Aquí tienes un café virtual!',
    exitMsg: '¡Gracias por visitar!',
    connectionClosed: 'Conexión cerrada.',
    commandNotFound: 'Comando no encontrado',
    langChanged: 'Idioma cambiado a',
    langCurrent: 'Idioma actual',
    langAvailable: 'Disponibles',
  },
  bin: {
    // Landing
    availableForWork: '01000001 01110110 01100001 01101001 01101100',
    heroGreeting: '01001000 01101001',
    heroName: '01000011 01100001 01110010 01101100 01101111 01110011',
    heroSubtitle: '01000100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010',
    tryHint: '01010100 01110010 01111001:',
    aboutHint: '?',
    projectsHint: '{}',
    skillsHint: '[]',
    contactHint: '@',
    footerBuilt: '01001110 01100101 01111000 01110100 00101110 01101010 01110011',

    // Welcome & About
    welcomeTitle: '01010111 01100101 01101100 01100011 01101111 01101101 01100101',
    welcomePortfolio: '01010100 01100101 01110010 01101101 01101001 01101110 01100001 01101100',
    welcomeHelp: '01010100 01111001 01110000 01100101',
    welcomeHelpCmd: '01101000 01100101 01101100 01110000',
    welcomeHelpEnd: '...',

    // Commands
    availableCommands: '01000011 01101111 01101101 01101101 01100001 01101110 01100100 01110011',
    tipLinux: '01010100 01101001 01110000: 01001100 01101001 01101110 01110101 01111000 👀',

    // Sections
    projectsTitle: '01010000 01110010 01101111 01101010 01100101 01100011 01110100 01110011',
    skillsTitle: '01010011 01101011 01101001 01101100 01101100 01110011',
    experienceTitle: '01000101 01111000 01110000',
    educationTitle: '01000101 01100100 01110101',
    contactTitle: '01000011 01101111 01101110 01110100 01100001 01100011 01110100',

    // Categories
    frontend: '01000110 01110010 01101111 01101110 01110100',
    backend: '01000010 01100001 01100011 01101011',
    tools: '01010100 01101111 01101111 01101100 01110011',
    soft: '01010011 01101111 01100110 01110100',

    // Misc
    tech: '01010100 01100101 01100011 01101000',
    coffeeMsg: '01000011 01101111 01100110 01100110 01100101 01100101 ☕',
    exitMsg: '01000010 01111001 01100101!',
    connectionClosed: '01000100 01101001 01110011 01100011 01101111 01101110 01101110 01100101 01100011 01110100',
    commandNotFound: '01000101 01010010 01010010 00110100 00110000 00110100',
    langChanged: '01001100 01100001 01101110 01100111:',
    langCurrent: '01001100 01100001 01101110 01100111',
    langAvailable: ':',
  },
};

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  // Notify all listeners
  listeners.forEach(listener => listener(lang));
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function t(key: keyof typeof translations.en): string {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

// Subscribe to language changes
export function onLanguageChange(listener: LanguageListener): () => void {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
}
