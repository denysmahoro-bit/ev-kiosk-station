import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://selavolt.rw'),
  title: 'SELAVOLT | EV Charging Network Rwanda',
  description: 'SELAVOLT is building reliable electric vehicle charging infrastructure across Rwanda.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  openGraph: {
    title: 'SELAVOLT | EV Charging Network Rwanda',
    description: 'Powering Rwanda\'s Electric Future.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-brand-bg font-sans text-brand-text antialiased`}>{children}</body>
    </html>
  );
}
