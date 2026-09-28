import type { Metadata } from 'next';
import TechnologyArchitectureView from '@/components/architecture/TechnologyArchitectureView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Technology Architecture | ${COMPANY_NAME}`,
  description:
    'Technical specifications for our 4-tier architectural framework: edge presentation layers, distributed service meshes, secure data vaults, and cloud infrastructure.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/technology-architecture`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/technology-architecture`,
    title: `Technology Architecture | ${COMPANY_NAME}`,
    description:
      'Technical specifications for our 4-tier architectural framework: edge presentation layers, distributed service meshes, secure data vaults, and cloud infrastructure.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Technology Architecture | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Technology Architecture | ${COMPANY_NAME}`,
    description:
      'Technical specifications for our 4-tier architectural framework: edge presentation layers, distributed service meshes, secure data vaults, and cloud infrastructure.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function TechnologyArchitecturePage() {
  const pageSchema = getWebPageSchema({
    title: `Technology Architecture | ${COMPANY_NAME}`,
    description:
      'Technical specifications for our 4-tier architectural framework: edge presentation layers, distributed service meshes, secure data vaults, and cloud infrastructure.',
    url: '/technology-architecture',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Technology Architecture', url: '/technology-architecture' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <TechnologyArchitectureView />
    </>
  );
}
