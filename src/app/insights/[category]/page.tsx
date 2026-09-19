import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InsightCategoryView from '@/components/insights/InsightCategoryView';
import JsonLd from '@/components/seo/JsonLd';
import { INSIGHTS_ARTICLES } from '@/content/insights';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
  getArticleSchema,
} from '@/lib/seo-schema';

interface InsightCategoryPageProps {
  params: { category: string };
}

const CATEGORY_MAP: Record<string, { name: string; description: string }> = {
  articles: {
    name: 'Articles',
    description:
      'Long-form technical essays and system architecture perspectives authored by the ARKLINTECH engineering team.',
  },
  'engineering-notes': {
    name: 'Engineering Notes',
    description:
      'Technical field notes, architecture blueprints, state machine specifications, and real-world system implementations.',
  },
  research: {
    name: 'Research',
    description:
      'Empirical benchmarks, edge AI latency evaluations, and experimental technology research from the ARKLINTECH team.',
  },
};

export function generateStaticParams() {
  return [
    { category: 'articles' },
    { category: 'engineering-notes' },
    { category: 'research' },
  ];
}

export function generateMetadata({ params }: InsightCategoryPageProps): Metadata {
  const categoryKey = params?.category?.toLowerCase() || '';
  const categoryInfo = CATEGORY_MAP[categoryKey];

  if (!categoryInfo) {
    return {
      title: `Insights | ${COMPANY_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${categoryInfo.name} | Insights | ${COMPANY_NAME}`;
  const canonicalUrl = `${CANONICAL_SITE_URL}/insights/${categoryKey}`;

  return {
    title,
    description: categoryInfo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description: categoryInfo.description,
      siteName: COMPANY_NAME,
      images: [
        {
          url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: categoryInfo.description,
      images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
    },
  };
}

export default function InsightCategoryPage({ params }: InsightCategoryPageProps) {
  const categoryKey = params?.category?.toLowerCase() || '';
  const categoryInfo = CATEGORY_MAP[categoryKey];

  if (!categoryInfo) {
    notFound();
  }

  const filteredArticles = INSIGHTS_ARTICLES.filter(
    (a) => a.category.toLowerCase() === categoryInfo.name.toLowerCase()
  );

  const pageSchema = getWebPageSchema({
    title: `${categoryInfo.name} | Insights | ${COMPANY_NAME}`,
    description: categoryInfo.description,
    url: `/insights/${categoryKey}`,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: categoryInfo.name, url: `/insights/${categoryKey}` },
  ]);

  const articleSchemas = filteredArticles.map((art) =>
    getArticleSchema({
      headline: art.title,
      description: art.excerpt,
      url: `/insights/${categoryKey}#${art.slug}`,
      datePublished: '2026-06-01',
      dateModified: '2026-08-01',
      authorName: art.author,
    })
  );

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema, ...articleSchemas]} />
      <InsightCategoryView
        categoryName={categoryInfo.name}
        articles={filteredArticles}
      />
    </>
  );
}
