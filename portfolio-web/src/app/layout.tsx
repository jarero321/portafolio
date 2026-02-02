import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Carlos Developer | Portfolio',
  description: 'Interactive CLI portfolio with Apple-inspired design. Explore my projects, skills, and experience through a terminal interface.',
  keywords: ['developer', 'portfolio', 'cli', 'terminal', 'react', 'nextjs'],
  authors: [{ name: 'Carlos Developer' }],
  openGraph: {
    title: 'Carlos Developer | Portfolio',
    description: 'Interactive CLI portfolio with Apple-inspired design',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
