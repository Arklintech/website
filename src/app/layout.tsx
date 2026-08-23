import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://zaqvoro.vercel.app'),
  title: 'ZAQVORO Technologies — Advanced Intelligent Systems & Engineering',
  description:
    'We architect intelligent systems, automate complex operations, and build software that drives real outcomes. Industrial intelligence, precision engineering, and connected platforms.',
  keywords: [
    'Intelligent Systems',
    'AI Software Engineering',
    'Automation Orchestration',
    'Business Systems Architecture',
    'ZAQVORO Technologies',
    'Custom Software Development',
    'Enterprise Cloud Infrastructure',
  ],
  authors: [{ name: 'ZAQVORO Technologies' }],
  alternates: {
    canonical: 'https://zaqvoro.vercel.app/',
  },
  icons: {
    icon: '/brand/logo.webp',
    shortcut: '/favicon.ico',
    apple: '/brand/logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'ZAQVORO Technologies — Advanced Intelligent Systems & Engineering',
    description:
      'We architect intelligent systems, automate complex operations, and build software that drives real outcomes.',
    url: 'https://zaqvoro.vercel.app/',
    siteName: 'ZAQVORO Technologies',
    images: [
      {
        url: '/brand/logo.png',
        width: 1200,
        height: 1200,
        alt: 'ZAQVORO Technologies Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZAQVORO Technologies — Advanced Intelligent Systems & Engineering',
    description:
      'We architect intelligent systems, automate complex operations, and build software that drives real outcomes.',
    images: ['/brand/logo.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020407',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/brand/logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/brand/logo.png" />
      </head>
      <body className="bg-z-black text-z-text font-body antialiased min-h-screen">
        {children}
      </body>
    </html >
  );
}
