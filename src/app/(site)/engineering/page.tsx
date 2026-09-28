import type { Metadata } from 'next';
import EngineeringView from '@/components/engineering/EngineeringView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Engineering | ${COMPANY_NAME} Technology Systems`,
  description:
    'Our 6-stage engineering lifecycle: from discovery and architecture design to precision coding, integration, and continuous telemetry monitoring.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/engineering`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/engineering`,
    title: `Engineering | ${COMPANY_NAME} Technology Systems`,
    description:
      'Our 6-stage engineering lifecycle: from discovery and architecture design to precision coding, integration, and continuous telemetry monitoring.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Engineering | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Engineering | ${COMPANY_NAME} Technology Systems`,
    description:
      'Our 6-stage engineering lifecycle: from discovery and architecture design to precision coding, integration, and continuous telemetry monitoring.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function EngineeringPage() {
  const pageSchema = getWebPageSchema({
    title: `Engineering | ${COMPANY_NAME} Technology Systems`,
    description:
      'Our 6-stage engineering lifecycle: from discovery and architecture design to precision coding, integration, and continuous telemetry monitoring.',
    url: '/engineering',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Engineering', url: '/engineering' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <EngineeringView />
    </>
  );
}
