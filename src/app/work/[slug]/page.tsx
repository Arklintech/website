import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { WORK_REVEAL_PROJECTS } from '@/content/workReveal';
import WorkView from '@/components/work/WorkView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getSoftwareApplicationSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';

interface WorkDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return WORK_REVEAL_PROJECTS.map((proj) => ({
    slug: proj.id,
  }));
}

export function generateMetadata({ params }: WorkDetailPageProps): Metadata {
  let slug = params.slug;
  if (slug === 'neominds-enrollment') slug = 'neominds';
  if (slug === 'parivar-restaurant') slug = 'parivar';

  const proj = WORK_REVEAL_PROJECTS.find((p) => p.id === slug);
  if (!proj) {
    return {
      title: `System Not Found | ${COMPANY_NAME}`,
      robots: { index: false, follow: false },
    };
  }

  const title = `${proj.name} — ${proj.systemType} | ${COMPANY_NAME}`;
  const description = `${proj.description} Architected and engineered by ARKLINTECH.`;
  const canonicalUrl = `${CANONICAL_SITE_URL}/work/${proj.id}`;

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
          alt: `${proj.name} — ${COMPANY_NAME}`,
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

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = params;

  // Handle legacy alias redirects
  if (slug === 'neominds-enrollment') {
    permanentRedirect('/work/neominds');
  }
  if (slug === 'parivar-restaurant') {
    permanentRedirect('/work/parivar');
  }

  const proj = WORK_REVEAL_PROJECTS.find((p) => p.id === slug);
  if (!proj) {
    return notFound();
  }

  const softwareSchema = getSoftwareApplicationSchema({
    name: proj.name,
    description: proj.description,
    url: `/work/${proj.id}`,
    applicationCategory: proj.shortCategory,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: proj.name, url: `/work/${proj.id}` },
  ]);

  return (
    <>
      <JsonLd schema={[softwareSchema, breadcrumbSchema]} />
      <WorkView initialProjectId={proj.id} />
    </>
  );
}
