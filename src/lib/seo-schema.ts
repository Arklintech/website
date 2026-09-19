/**
 * ARKLINTECH — Structured Data & Schema.org JSON-LD Generators
 * Strictly factual, authentic data without fabricated reviews, ratings, or claims.
 */

export const CANONICAL_SITE_URL = 'https://www.arklintech.com';
export const PUBLIC_BUSINESS_EMAIL = 'work@arklintech.com';
export const COMPANY_NAME = 'ARKLINTECH';
export const COMPANY_DESCRIPTOR = 'Technology Systems';
export const COMPANY_HEADLINE = 'WE ARCHITECT INTELLIGENT SYSTEMS.';
export const COMPANY_DESCRIPTION =
  'ARKLINTECH is a technology systems company that architects intelligent systems, builds software, connects operations, automates complex work, and creates practical intelligence around how businesses actually operate.';

/**
 * Global Organization Structured Data
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${CANONICAL_SITE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: ['Arklintech Technology Systems', 'ARKLINTECH Systems'],
    url: CANONICAL_SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${CANONICAL_SITE_URL}/brand/logo.png`,
      width: '512',
      height: '512',
    },
    image: `${CANONICAL_SITE_URL}/brand/og-image.png`,
    description: COMPANY_DESCRIPTION,
    slogan: COMPANY_HEADLINE,
    email: PUBLIC_BUSINESS_EMAIL,
    contactPoint: {
      '@type': 'ContactPoint',
      email: PUBLIC_BUSINESS_EMAIL,
      contactType: 'customer inquiries',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
    knowsAbout: [
      'Systems Architecture',
      'Software Engineering',
      'Intelligent Automation',
      'Connected Business Systems',
      'Event-Driven Distributed Architectures',
      'Decision Intelligence',
    ],
  };
}

/**
 * Global WebSite Structured Data
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${CANONICAL_SITE_URL}/#website`,
    name: COMPANY_NAME,
    url: CANONICAL_SITE_URL,
    description: COMPANY_DESCRIPTION,
    publisher: {
      '@id': `${CANONICAL_SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * BreadcrumbList Schema
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${CANONICAL_SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generic WebPage Schema
 */
export function getWebPageSchema({
  title,
  description,
  url,
  pageType = 'WebPage',
}: {
  title: string;
  description: string;
  url: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';
}) {
  const fullUrl = url.startsWith('http') ? url : `${CANONICAL_SITE_URL}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': `${fullUrl}#webpage`,
    url: fullUrl,
    name: title,
    description,
    isPartOf: {
      '@id': `${CANONICAL_SITE_URL}/#website`,
    },
    about: {
      '@id': `${CANONICAL_SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Service Schema for Capabilities & Solutions
 */
export function getServiceSchema({
  name,
  description,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  const fullUrl = url.startsWith('http') ? url : `${CANONICAL_SITE_URL}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${fullUrl}#service`,
    name,
    serviceType,
    description,
    url: fullUrl,
    provider: {
      '@id': `${CANONICAL_SITE_URL}/#organization`,
    },
    areaServed: 'Worldwide',
  };
}

/**
 * SoftwareApplication Schema for Verified Production Systems
 */
export function getSoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = 'Web, Cloud Infrastructure',
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
}) {
  const fullUrl = url.startsWith('http') ? url : `${CANONICAL_SITE_URL}${url}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${fullUrl}#software`,
    name,
    description,
    url: fullUrl,
    applicationCategory,
    operatingSystem,
    author: {
      '@id': `${CANONICAL_SITE_URL}/#organization`,
    },
    creator: {
      '@id': `${CANONICAL_SITE_URL}/#organization`,
    },
  };
}

/**
 * Article Schema for Insights & Engineering Notes
 */
export function getArticleSchema({
  title,
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'ARKLINTECH Engineering',
}: {
  title?: string;
  headline?: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  const fullUrl = url.startsWith('http') ? url : `${CANONICAL_SITE_URL}${url}`;
  const articleTitle = title || headline || '';
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${fullUrl}#article`,
    headline: articleTitle,
    name: articleTitle,
    description,
    url: fullUrl,
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    author: {
      '@type': 'Organization',
      name: authorName,
      url: CANONICAL_SITE_URL,
    },
    publisher: {
      '@id': `${CANONICAL_SITE_URL}/#organization`,
    },
    image: `${CANONICAL_SITE_URL}/brand/og-image.png`,
    mainEntityOfPage: fullUrl,
  };
}
