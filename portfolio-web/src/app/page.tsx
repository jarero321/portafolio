'use client';

import { Terminal } from '@/components/Terminal';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <Terminal />
    </main>
  );
}
