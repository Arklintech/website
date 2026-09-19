import type { Metadata } from 'next';
import WorkView from '@/components/work/WorkView';
import JsonLd from '@/components/seo/JsonLd';
import {
  CANONICAL_SITE_URL,
  COMPANY_NAME,
  getWebPageSchema,
  getBreadcrumbSchema,
} from '@/lib/seo-schema';
import { WORK_REVEAL_PROJECTS } from '@/content/workReveal';

export const metadata: Metadata = {
  title: `Our Work | ${COMPANY_NAME} Technology Systems`,
  description:
    'Proven production evidence: explore systems engineered by ARKLINTECH, including trust operations platforms, admissions state machines, and restaurant POS meshes.',
  alternates: {
    canonical: `${CANONICAL_SITE_URL}/work`,
  },
  openGraph: {
    type: 'website',
    url: `${CANONICAL_SITE_URL}/work`,
    title: `Our Work | ${COMPANY_NAME} Technology Systems`,
    description:
      'Proven production evidence: explore systems engineered by ARKLINTECH, including trust operations platforms, admissions state machines, and restaurant POS meshes.',
    siteName: COMPANY_NAME,
    images: [
      {
        url: `${CANONICAL_SITE_URL}/brand/og-image.png`,
        width: 1200,
        height: 630,
        alt: `Our Work | ${COMPANY_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Our Work | ${COMPANY_NAME} Technology Systems`,
    description:
      'Proven production evidence: explore systems engineered by ARKLINTECH, including trust operations platforms, admissions state machines, and restaurant POS meshes.',
    images: [`${CANONICAL_SITE_URL}/brand/og-image.png`],
  },
};

export default function WorkPage() {
  const pageSchema = getWebPageSchema({
    title: `Our Work | ${COMPANY_NAME} Technology Systems`,
    description:
      'Proven production evidence: explore systems engineered by ARKLINTECH, including trust operations platforms, admissions state machines, and restaurant POS meshes.',
    url: '/work',
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Engineered Systems by ARKLINTECH',
    itemListElement: WORK_REVEAL_PROJECTS.map((proj, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: proj.name,
      url: `${CANONICAL_SITE_URL}/work/${proj.id}`,
    })),
  };

  return (
    <>
      <JsonLd schema={[pageSchema, breadcrumbSchema, itemListSchema]} />
      <WorkView />
    </>
  );
}
