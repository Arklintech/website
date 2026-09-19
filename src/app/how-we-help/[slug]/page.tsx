import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HOW_WE_HELP_ITEMS } from '@/content/howWeHelp';
import HowWeHelpDetailView from '@/components/process/HowWeHelpDetailView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getServiceSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

interface HowWeHelpPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return HOW_WE_HELP_ITEMS.map((item) => ({
    slug: item.id,
  }));
}

export function generateMetadata({ params }: HowWeHelpPageProps): Metadata {
  const item = HOW_WE_HELP_ITEMS.find((h) => h.id === params.slug);
  if (!item) {
    return {
      title: `Solution Not Found | ${COMPANY_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${item.title} | How We Help | ${COMPANY_NAME}`;
  const description = item.solutionNarrative;
  const canonicalUrl = `${CANONICAL_SITE_URL}/how-we-help/${item.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: COMPANY_NAME,
      images: [
        {
          url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${item.title} — ${COMPANY_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
    },
  };
}

export default function HowWeHelpDetailPage({ params }: HowWeHelpPageProps) {
  const item = HOW_WE_HELP_ITEMS.find((h) => h.id === params.slug);
  if (!item) {
    return notFound();
  }

  const serviceSchema = getServiceSchema({
    name: item.title,
    description: item.solutionNarrative,
    url: `/how-we-help/${item.id}`,
    serviceType: 'Operational Business Solution',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How We Help', url: '/how-we-help' },
    { name: item.title, url: `/how-we-help/${item.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      <HowWeHelpDetailView item={item} />
    </>
  );
}
