'use client';

import { useEffect } from 'react';
import { setLanguage, type Language } from '@/lib/i18n';

const validLocales = ['en', 'es', 'bin'];

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  useEffect(() => {
    params.then(({ locale }) => {
      if (validLocales.includes(locale)) {
        setLanguage(locale as Language);
        // Set cookie for middleware
        document.cookie = `locale=${locale};path=/;max-age=31536000`;
      }
    });
  }, [params]);

  return <>{children}</>;
}
