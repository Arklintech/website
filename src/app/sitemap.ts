import type { MetadataRoute } from 'next';
import { CANONICAL_SITE_URL } from '@/lib/seo-schema';
import { CAPABILITIES } from '@/content/capabilities';
import { HOW_WE_HELP_ITEMS } from '@/content/howWeHelp';
import { INDUSTRIES } from '@/content/industries';
import { WORK_REVEAL_PROJECTS } from '@/content/workReveal';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Core static pages
  const coreRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/what-we-do', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/how-we-help', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/industries', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/engineering', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/technology-architecture', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/systems-library', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/trust-security', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/insights', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/lab', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/start-a-system', priority: 0.9, changeFrequency: 'monthly' as const },
  ];

  // Dynamic capability pages
  const capabilityRoutes = CAPABILITIES.map((cap) => ({
    path: `/what-we-do/${cap.id}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  // Dynamic how-we-help pages
  const howWeHelpRoutes = HOW_WE_HELP_ITEMS.map((item) => ({
    path: `/how-we-help/${item.id}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  // Dynamic industry pages
  const industryRoutes = INDUSTRIES.map((ind) => ({
    path: `/industries/${ind.id}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  // Dynamic work case studies
  const workRoutes = WORK_REVEAL_PROJECTS.map((proj) => ({
    path: `/work/${proj.id}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  // Insights category pages
  const insightCategories = ['articles', 'engineering-notes', 'research'].map((cat) => ({
    path: `/insights/${cat}`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  }));

  const allEntries = [
    ...coreRoutes,
    ...capabilityRoutes,
    ...howWeHelpRoutes,
    ...industryRoutes,
    ...workRoutes,
    ...insightCategories,
  ];

  return allEntries.map((entry) => ({
    url: `${CANONICAL_SITE_URL}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
