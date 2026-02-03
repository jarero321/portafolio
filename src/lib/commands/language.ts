import type { Command } from '@/types';
import { setLanguage, getLanguage, t, type Language } from '@/lib/i18n';

export const lang: Command = {
  name: 'lang',
  description: 'Change language / Cambiar idioma',
  usage: 'lang [en|es|bin]',
  execute: (args) => {
    const validLangs = ['en', 'es', 'bin'];
    const current = getLanguage();

    if (!args[0]) {
      return {
        output: [
          `\x1b[36m${t('langCurrent')}:\x1b[0m ${current}`,
          '',
          `\x1b[90m${t('langAvailable')}: en (English), es (Español), bin (Binary)\x1b[0m`,
          '',
          'Usage: lang [en|es|bin]',
        ].join('\n'),
      };
    }

    const newLang = args[0].toLowerCase();
    if (!validLangs.includes(newLang)) {
      return {
        output: `\x1b[31mInvalid language.\x1b[0m Available: en, es, bin`,
        isError: true,
      };
    }

    setLanguage(newLang as Language);

    const messages: Record<string, string> = {
      en: '🇺🇸 Language changed to English',
      es: '🇪🇸 Idioma cambiado a Español',
      bin: '🤖 01001100 01100001 01101110 01100111 00111010 01000010 01101001 01101110',
    };

    return { output: `\x1b[32m${messages[newLang]}\x1b[0m` };
  },
};

export const language: Command = {
  name: 'language',
  description: 'Alias for lang',
  execute: (args) => lang.execute(args),
};

export const languageCommands = [lang, language];
