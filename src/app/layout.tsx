import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'ARKLINTECH — Technology Systems & Engineering',
  description:
    'We architect intelligent systems, automate complex operations, and build software that drives real outcomes.',
  keywords: [
    'Systems Architecture',
    'Full-Stack Engineering',
    'AI & Automation',
    'Cloud & DevOps',
    'Business Systems',
    'Enterprise Software',
    'ARKLINTECH',
  ],
  authors: [{ name: 'ARKLINTECH' }],
  creator: 'ARKLINTECH',
  publisher: 'ARKLINTECH',
  metadataBase: new URL('https://www.arklintech.com'),
  alternates: {
    canonical: 'https://www.arklintech.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.arklintech.com',
    siteName: 'ARKLINTECH',
    title: 'ARKLINTECH — Technology Systems & Engineering',
    description:
      'We architect intelligent systems, automate complex operations, and build software that drives real outcomes.',
    images: [
      {
        url: 'https://www.arklintech.com/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ARKLINTECH — Technology Systems & Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARKLINTECH — Technology Systems & Engineering',
    description:
      'We architect intelligent systems, automate complex operations, and build software that drives real outcomes.',
    images: ['https://www.arklintech.com/brand/og-image.png'],
  },
};

import VisitorTracker from '@/components/VisitorTracker';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F5F1E8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ backgroundColor: '#F5F1E8', color: '#111827' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className="bg-[#F5F1E8] text-[#111827] font-body antialiased min-h-screen"
        style={{ backgroundColor: '#F5F1E8', color: '#111827', margin: 0 }}
      >
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
