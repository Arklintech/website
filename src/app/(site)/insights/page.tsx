import type { Metadata } from 'next';
import InsightsView from '@/components/insights/InsightsView';
import JsonLd from '@/components/seo/JsonLd';
import { INSIGHTS_ARTICLES } from '@/content/insights';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
  getArticleSchema,
} from '@/lib/seo-schema';

export const metadata: Metadata = {
  title: `Insights & Engineering Notes | ${COMPANY_NAME}`,
  description:
    'Technical writings, system architecture analyses, and engineering research papers authored by the ARKLINTECH engineering team.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/insights`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/insights`,
    title: `Insights & Engineering Notes | ${COMPANY_NAME}`,
    description:
      'Technical writings, system architecture analyses, and engineering research papers authored by the ARKLINTECH engineering team.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Insights & Engineering Notes | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Insights & Engineering Notes | ${COMPANY_NAME}`,
    description:
      'Technical writings, system architecture analyses, and engineering research papers authored by the ARKLINTECH engineering team.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function InsightsPage() {
  const pageSchema = getWebPageSchema({
    title: `Insights & Engineering Notes | ${COMPANY_NAME}`,
    description:
      'Technical writings, system architecture analyses, and engineering research papers authored by the ARKLINTECH engineering team.',
    url: '/insights',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
  ]);

  const articleSchemas = INSIGHTS_ARTICLES.map((art) =>
    getArticleSchema({
      headline: art.title,
      description: art.excerpt,
      url: `/insights#${art.category.toLowerCase().replace(/\s+/g, '-')}`,
      datePublished: '2026-06-01',
      dateModified: '2026-08-01',
      authorName: art.author,
    })
  );

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema, ...articleSchemas]} />
      <InsightsView />
    </>
  );
}
