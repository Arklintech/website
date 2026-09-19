import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CAPABILITIES } from '@/content/capabilities';
import CapabilityDetailView from '@/components/capabilities/CapabilityDetailView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getServiceSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

interface CapabilityPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return CAPABILITIES.map((c) => ({
    slug: c.id,
  }));
}

export function generateMetadata({ params }: CapabilityPageProps): Metadata {
  const cap = CAPABILITIES.find((c) => c.id === params.slug);
  if (!cap) {
    return {
      title: `Capability Not Found | ${COMPANY_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${cap.title} | ${COMPANY_NAME} Technology Systems`;
  const description = cap.positioning;
  const canonicalUrl = `${CANONICAL_SITE_URL}/what-we-do/${cap.id}`;

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
          alt: `${cap.title} — ${COMPANY_NAME}`,
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

export default function CapabilityDetailPage({ params }: CapabilityPageProps) {
  const cap = CAPABILITIES.find((c) => c.id === params.slug);
  if (!cap) {
    return notFound();
  }

  const serviceSchema = getServiceSchema({
    name: `${cap.title} — ${cap.subheading}`,
    description: cap.description,
    url: `/what-we-do/${cap.id}`,
    serviceType: cap.category,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'What We Do', url: '/what-we-do' },
    { name: cap.title, url: `/what-we-do/${cap.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[serviceSchema, breadcrumbSchema]} />
      <CapabilityDetailView capability={cap} />
    </>
  );
}
