import type { Metadata } from 'next';
import SystemsLibraryView from '@/components/systems/SystemsLibraryView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Systems Library | ${COMPANY_NAME} Technology Systems`,
  description:
    'A technical repository of reusable system concepts, architectural building blocks, and execution primitives that power ARKLINTECH implementations.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/systems-library`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/systems-library`,
    title: `Systems Library | ${COMPANY_NAME} Technology Systems`,
    description:
      'A technical repository of reusable system concepts, architectural building blocks, and execution primitives that power ARKLINTECH implementations.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Systems Library | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Systems Library | ${COMPANY_NAME} Technology Systems`,
    description:
      'A technical repository of reusable system concepts, architectural building blocks, and execution primitives that power ARKLINTECH implementations.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function SystemsLibraryPage() {
  const pageSchema = getWebPageSchema({
    title: `Systems Library | ${COMPANY_NAME} Technology Systems`,
    description:
      'A technical repository of reusable system concepts, architectural building blocks, and execution primitives that power ARKLINTECH implementations.',
    url: '/systems-library',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Systems Library', url: '/systems-library' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <SystemsLibraryView />
    </>
  );
}
