import type { Metadata } from 'next';
import StartASystemView from '@/components/contact/StartASystemView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Start a System | ${COMPANY_NAME} Technology Systems`,
  description:
    'Initiate a technology system engagement. Submit your project requirements to ARKLINTECH for architectural evaluation and direct response within 24 hours.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/start-a-system`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/start-a-system`,
    title: `Start a System | ${COMPANY_NAME} Technology Systems`,
    description:
      'Initiate a technology system engagement. Submit your project requirements to ARKLINTECH for architectural evaluation and direct response within 24 hours.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Start a System | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Start a System | ${COMPANY_NAME} Technology Systems`,
    description:
      'Initiate a technology system engagement. Submit your project requirements to ARKLINTECH for architectural evaluation and direct response within 24 hours.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function StartASystemPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Start a System | ${COMPANY_NAME} Technology Systems`,
    description:
      'Initiate a technology system engagement. Submit your project requirements to ARKLINTECH for architectural evaluation and direct response within 24 hours.',
    url: `${CANONICAL_SITE_URL}/start-a-system`,
    mainEntity: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      email: 'work@arklintech.com',
      url: CANONICAL_SITE_URL,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Start a System', url: '/start-a-system' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <StartASystemView />
    </>
  );
}
