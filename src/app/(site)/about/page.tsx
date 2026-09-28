import type { Metadata } from 'next';
import AboutView from '@/components/about/AboutView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `About ${COMPANY_NAME} | Technology Systems`,
  description:
    'Learn about ARKLINTECH’s systems engineering philosophy, architectural methodology, and commitment to building durable, high-impact technology assets.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/about`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/about`,
    title: `About ${COMPANY_NAME} | Technology Systems`,
    description:
      'Learn about ARKLINTECH’s systems engineering philosophy, architectural methodology, and commitment to building durable, high-impact technology assets.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `About ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${COMPANY_NAME} | Technology Systems`,
    description:
      'Learn about ARKLINTECH’s systems engineering philosophy, architectural methodology, and commitment to building durable, high-impact technology assets.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function AboutPage() {
  const pageSchema = getWebPageSchema({
    title: `About ${COMPANY_NAME} | Technology Systems`,
    description:
      'Learn about ARKLINTECH’s systems engineering philosophy, architectural methodology, and commitment to building durable, high-impact technology assets.',
    url: '/about',
    pageType: 'AboutPage',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema]} />
      <AboutView />
    </>
  );
}
