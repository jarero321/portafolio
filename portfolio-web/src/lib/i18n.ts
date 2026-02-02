export type Language = 'en' | 'es' | 'bin';

let currentLanguage: Language = 'en';

export const translations = {
  en: {
    // Welcome & About
    welcomeTitle: 'Welcome to',
    welcomePortfolio: 'Terminal Portfolio',
    welcomeHelp: 'Type',
    welcomeHelpCmd: 'help',
    welcomeHelpEnd: 'to see available commands.',
    aboutTitle: 'About me',
    location: 'Location',

    // Commands
    availableCommands: 'Available Commands',
    tipLinux: 'Tip: Try some Linux commands too... 👀',
    typeHelp: 'Type',
    forMoreInfo: 'for more info',

    // Projects
    projectsTitle: 'Projects',
    tech: 'Tech',

    // Skills
    skillsTitle: 'Skills',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools',
    soft: 'Soft Skills',

    // Experience
    experienceTitle: 'Experience',

    // Education
    educationTitle: 'Education',

    // Contact
    contactTitle: 'Contact',
    email: 'Email',

    // Errors
    commandNotFound: 'Command not found',
    unknownCommand: 'Unknown command',

    // Easter eggs
    coffeeMsg: 'Here\'s a virtual coffee for you!',
    exitMsg: 'Thanks for visiting!',
    goodbyeMsg: 'Goodbye!',
    connectionClosed: 'Connection closed.',

    // Language command
    langChanged: 'Language changed to',
    langCurrent: 'Current language',
    langAvailable: 'Available',
  },
  es: {
    // Welcome & About
    welcomeTitle: 'Bienvenido a',
    welcomePortfolio: 'Terminal Portfolio',
    welcomeHelp: 'Escribe',
    welcomeHelpCmd: 'help',
    welcomeHelpEnd: 'para ver los comandos disponibles.',
    aboutTitle: 'Sobre mí',
    location: 'Ubicación',

    // Commands
    availableCommands: 'Comandos Disponibles',
    tipLinux: 'Tip: Prueba algunos comandos de Linux... 👀',
    typeHelp: 'Escribe',
    forMoreInfo: 'para más info',

    // Projects
    projectsTitle: 'Proyectos',
    tech: 'Tech',

    // Skills
    skillsTitle: 'Habilidades',
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Herramientas',
    soft: 'Soft Skills',

    // Experience
    experienceTitle: 'Experiencia',

    // Education
    educationTitle: 'Educación',

    // Contact
    contactTitle: 'Contacto',
    email: 'Correo',

    // Errors
    commandNotFound: 'Comando no encontrado',
    unknownCommand: 'Comando desconocido',

    // Easter eggs
    coffeeMsg: '¡Aquí tienes un café virtual!',
    exitMsg: '¡Gracias por visitar!',
    goodbyeMsg: '¡Adiós!',
    connectionClosed: 'Conexión cerrada.',

    // Language command
    langChanged: 'Idioma cambiado a',
    langCurrent: 'Idioma actual',
    langAvailable: 'Disponibles',
  },
  bin: {
    // Welcome & About
    welcomeTitle: '01010111 01100101 01101100 01100011 01101111 01101101 01100101',
    welcomePortfolio: '01010100 01100101 01110010 01101101 01101001 01101110 01100001 01101100',
    welcomeHelp: '01010100 01111001 01110000 01100101',
    welcomeHelpCmd: '01101000 01100101 01101100 01110000',
    welcomeHelpEnd: '00101110 00101110 00101110',
    aboutTitle: '01000001 01100010 01101111 01110101 01110100',
    location: '01001100 01101111 01100011',

    // Commands
    availableCommands: '01000011 01101111 01101101 01101101 01100001 01101110 01100100 01110011',
    tipLinux: '01010100 01101001 01110000 00111010 00100000 01001100 01101001 01101110 01110101 01111000 👀',
    typeHelp: '01010100 01111001 01110000 01100101',
    forMoreInfo: '00101110 00101110 00101110',

    // Projects
    projectsTitle: '01010000 01110010 01101111 01101010 01100101 01100011 01110100 01110011',
    tech: '01010100 01100101 01100011 01101000',

    // Skills
    skillsTitle: '01010011 01101011 01101001 01101100 01101100 01110011',
    frontend: '01000110 01110010 01101111 01101110 01110100',
    backend: '01000010 01100001 01100011 01101011',
    tools: '01010100 01101111 01101111 01101100 01110011',
    soft: '01010011 01101111 01100110 01110100',

    // Experience
    experienceTitle: '01000101 01111000 01110000',

    // Education
    educationTitle: '01000101 01100100 01110101',

    // Contact
    contactTitle: '01000011 01101111 01101110 01110100 01100001 01100011 01110100',
    email: '01000101 01101101 01100001 01101001 01101100',

    // Errors
    commandNotFound: '01000101 01010010 01010010 01001111 01010010 00100000 00110100 00110000 00110100',
    unknownCommand: '00111111 00111111 00111111',

    // Easter eggs
    coffeeMsg: '01000011 01101111 01100110 01100110 01100101 01100101 ☕',
    exitMsg: '01000010 01111001 01100101 00100001',
    goodbyeMsg: '01000010 01111001 01100101',
    connectionClosed: '01000100 01101001 01110011 01100011 01101111 01101110 01101110 01100101 01100011 01110100',

    // Language command
    langChanged: '01001100 01100001 01101110 01100111 00111010',
    langCurrent: '01001100 01100001 01101110 01100111',
    langAvailable: '00111010',
  },
};

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

export function getLanguage(): Language {
  return currentLanguage;
}

export function t(key: keyof typeof translations.en): string {
  return translations[currentLanguage][key] || translations.en[key] || key;
}
