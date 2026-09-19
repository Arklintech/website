import type { Metadata } from 'next';
import LabView from '@/components/lab/LabView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Lab & R&D | ${COMPANY_NAME} Technology Systems`,
  description:
    'The future-facing engineering layer of ARKLINTECH. Exploring emerging protocols, autonomous multi-agent systems, and hardware-accelerated edge inference.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/lab`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/lab`,
    title: `Lab & R&D | ${COMPANY_NAME} Technology Systems`,
    description:
      'The future-facing engineering layer of ARKLINTECH. Exploring emerging protocols, autonomous multi-agent systems, and hardware-accelerated edge inference.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Lab & R&D | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Lab & R&D | ${COMPANY_NAME} Technology Systems`,
    description:
      'The future-facing engineering layer of ARKLINTECH. Exploring emerging protocols, autonomous multi-agent systems, and hardware-accelerated edge inference.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function LabPage() {
  const pageSchema = getWebPageSchema({
    title: `Lab & R&D | ${COMPANY_NAME} Technology Systems`,
    description:
      'The future-facing engineering layer of ARKLINTECH. Exploring emerging protocols, autonomous multi-agent systems, and hardware-accelerated edge inference.',
    url: '/lab',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Lab', url: '/lab' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <LabView />
    </>
  );
}
