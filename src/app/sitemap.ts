import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arklintech.com';
  const routes = [
    '',
    '/what-we-do',
    '/what-we-do/ai-intelligence',
    '/what-we-do/software-platforms',
    '/what-we-do/automation-orchestration',
    '/what-we-do/business-systems',
    '/how-we-help',
    '/industries',
    '/work',
    '/work/daarayn',
    '/work/neominds',
    '/work/parivar',
    '/engineering',
    '/systems-library',
    '/lab',
    '/insights',
    '/technology-architecture',
    '/trust-security',
    '/about',
    '/start-a-system',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/what-we-do') || route.startsWith('/work') ? 0.9 : 0.8,
  }));
}
