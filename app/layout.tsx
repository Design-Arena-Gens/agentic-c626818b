import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AcePrep Mock Tests',
  description:
    'Prepare for competitive exams with expertly curated mock tests, instant feedback, and deep analytics.',
  metadataBase: new URL('https://agentic-c626818b.vercel.app'),
  openGraph: {
    title: 'AcePrep Mock Tests',
    description:
      'Adaptive mock test platform with smart analytics and progress tracking.',
    url: 'https://agentic-c626818b.vercel.app',
    siteName: 'AcePrep Mock Tests'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-surface">
      <body className={`${inter.className} text-slate-900`}>{children}</body>
    </html>
  );
}
