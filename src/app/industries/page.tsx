import type { Metadata } from 'next';
import IndustriesView from '@/components/industries/IndustriesView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Industries | ${COMPANY_NAME} Technology Systems`,
  description:
    'Purpose-built systems architecture for commerce, education, foodservice hospitality, and clinical healthcare operations.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/industries`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/industries`,
    title: `Industries | ${COMPANY_NAME} Technology Systems`,
    description:
      'Purpose-built systems architecture for commerce, education, foodservice hospitality, and clinical healthcare operations.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Industries | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Industries | ${COMPANY_NAME} Technology Systems`,
    description:
      'Purpose-built systems architecture for commerce, education, foodservice hospitality, and clinical healthcare operations.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function IndustriesPage() {
  const pageSchema = getWebPageSchema({
    title: `Industries | ${COMPANY_NAME} Technology Systems`,
    description:
      'Purpose-built systems architecture for commerce, education, foodservice hospitality, and clinical healthcare operations.',
    url: '/industries',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/industries' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <IndustriesView />
    </>
  );
}
