'use client';

import { use, useEffect } from 'react';
import { setLanguage, getLanguage, type Language } from '@/lib/i18n';

const validLocales = ['en', 'es', 'bin'];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  if (validLocales.includes(locale) && getLanguage() !== locale) {
    setLanguage(locale as Language);
  }

  useEffect(() => {
    if (validLocales.includes(locale)) {
      document.cookie = `locale=${locale};path=/;max-age=31536000`;
    }
  }, [locale]);

  return <>{children}</>;
}
