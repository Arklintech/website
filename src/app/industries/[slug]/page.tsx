import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { INDUSTRIES } from '@/content/industries';
import IndustryDetailView from '@/components/industries/IndustryDetailView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getServiceSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

interface IndustryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({
    slug: ind.id,
  }));
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const ind = INDUSTRIES.find((i) => i.id === params.slug);
  if (!ind) {
    return {
      title: `Industry Not Found | ${COMPANY_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${ind.name} Technology Systems | ${COMPANY_NAME}`;
  const description = ind.tagline;
  const canonicalUrl = `${CANONICAL_SITE_URL}/industries/${ind.id}`;

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
          alt: `${ind.name} — ${COMPANY_NAME}`,
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

export default function IndustryDetailPage({ params }: IndustryPageProps) {
  const ind = INDUSTRIES.find((i) => i.id === params.slug);
  if (!ind) {
    return notFound();
  }

  const serviceSchema = getServiceSchema({
    name: `${ind.name} Systems Architecture`,
    description: ind.tagline,
    url: `/industries/${ind.id}`,
    serviceType: 'Industry Systems Architecture',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/industries' },
    { name: ind.name, url: `/industries/${ind.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      <IndustryDetailView industry={ind} />
    </>
  );
}
