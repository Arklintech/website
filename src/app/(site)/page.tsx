import type { Metadata } from 'next';
import HomeView from '@/components/home/HomeView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  getWebPageSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `${COMPANY_NAME} — Technology Systems`,
  description: COMPANY_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: CANONICAL_SITE_URL,
    title: `${COMPANY_NAME} — Technology Systems`,
    description: COMPANY_DESCRIPTION,
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${COMPANY_NAME} — Technology Systems`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_NAME} — Technology Systems`,
    description: COMPANY_DESCRIPTION,
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function HomePage() {
  const pageSchema = getWebPageSchema({
    title: `${COMPANY_NAME} — Technology Systems`,
    description: COMPANY_DESCRIPTION,
    url: '/',
  });

  return (
    <>
      <JsonLd schema={pageSchema} />
      <HomeView />
    </>
  );
}
