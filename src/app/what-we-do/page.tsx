import type { Metadata } from 'next';
import WhatWeDoView from '@/components/capabilities/WhatWeDoView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `What We Do | ${COMPANY_NAME} Technology Systems`,
  description:
    'Explore our core capabilities across AI & intelligence, bespoke software engineering, workflow automation orchestration, and connected business systems.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/what-we-do`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/what-we-do`,
    title: `What We Do | ${COMPANY_NAME} Technology Systems`,
    description:
      'Explore our core capabilities across AI & intelligence, bespoke software engineering, workflow automation orchestration, and connected business systems.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `What We Do | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `What We Do | ${COMPANY_NAME} Technology Systems`,
    description:
      'Explore our core capabilities across AI & intelligence, bespoke software engineering, workflow automation orchestration, and connected business systems.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function WhatWeDoPage() {
  const pageSchema = getWebPageSchema({
    title: `What We Do | ${COMPANY_NAME} Technology Systems`,
    description:
      'Explore our core capabilities across AI & intelligence, bespoke software engineering, workflow automation orchestration, and connected business systems.',
    url: '/what-we-do',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'What We Do', url: '/what-we-do' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <WhatWeDoView />
    </>
  );
}
