import type { MetadataRoute } from 'next';
import { CANONICAL_SITE_URL } from '@/lib/seo-schema';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin',
          '/admin/',
          '/_next/',
          '/request',
          '/start',
          '/work-with-us',
          '/work-with-zaqvoro',
        ],
      },
    ],
    sitemap: `${CANONICAL_SITE_URL}/sitemap.xml`,
  };
}
