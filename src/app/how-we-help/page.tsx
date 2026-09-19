import type { Metadata } from 'next';
import HowWeHelpView from '@/components/process/HowWeHelpView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `How We Help | ${COMPANY_NAME} Technology Systems`,
  description:
    'From connected operations to intelligent automation and systems modernization, discover how ARKLINTECH engineers solutions for complex operational friction.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/how-we-help`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/how-we-help`,
    title: `How We Help | ${COMPANY_NAME} Technology Systems`,
    description:
      'From connected operations to intelligent automation and systems modernization, discover how ARKLINTECH engineers solutions for complex operational friction.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `How We Help | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `How We Help | ${COMPANY_NAME} Technology Systems`,
    description:
      'From connected operations to intelligent automation and systems modernization, discover how ARKLINTECH engineers solutions for complex operational friction.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function HowWeHelpPage() {
  const pageSchema = getWebPageSchema({
    title: `How We Help | ${COMPANY_NAME} Technology Systems`,
    description:
      'From connected operations to intelligent automation and systems modernization, discover how ARKLINTECH engineers solutions for complex operational friction.',
    url: '/how-we-help',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How We Help', url: '/how-we-help' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <HowWeHelpView />
    </>
  );
}
