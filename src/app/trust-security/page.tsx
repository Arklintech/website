import type { Metadata } from 'next';
import TrustSecurityView from '@/components/trust/TrustSecurityView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Trust & Security | ${COMPANY_NAME}`,
  description:
    'Security, reliability, zero-trust perimeters, and data privacy are foundational constraints built into every layer of our systems architecture.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/trust-security`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/trust-security`,
    title: `Trust & Security | ${COMPANY_NAME}`,
    description:
      'Security, reliability, zero-trust perimeters, and data privacy are foundational constraints built into every layer of our systems architecture.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Trust & Security | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Trust & Security | ${COMPANY_NAME}`,
    description:
      'Security, reliability, zero-trust perimeters, and data privacy are foundational constraints built into every layer of our systems architecture.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function TrustSecurityPage() {
  const pageSchema = getWebPageSchema({
    title: `Trust & Security | ${COMPANY_NAME}`,
    description:
      'Security, reliability, zero-trust perimeters, and data privacy are foundational constraints built into every layer of our systems architecture.',
    url: '/trust-security',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Trust & Security', url: '/trust-security' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <TrustSecurityView />
    </>
  );
}
