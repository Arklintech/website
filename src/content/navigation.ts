export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuType?: 'what-we-do' | 'how-we-help' | 'industries' | 'work';
}

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { id: 'what-we-do', label: 'WHAT WE DO', href: '/what-we-do', hasMegaMenu: true, megaMenuType: 'what-we-do' },
  { id: 'how-we-help', label: 'HOW WE HELP', href: '/how-we-help', hasMegaMenu: true, megaMenuType: 'how-we-help' },
  { id: 'industries', label: 'INDUSTRIES', href: '/industries', hasMegaMenu: true, megaMenuType: 'industries' },
  { id: 'work', label: 'WORK', href: '/work', hasMegaMenu: true, megaMenuType: 'work' },
  { id: 'about', label: 'ABOUT', href: '/about' },
];

export const SECONDARY_NAV_ITEMS = [
  { label: 'Engineering', href: '/engineering' },
  { label: 'Technology & Architecture', href: '/technology-architecture' },
  { label: 'Systems Library', href: '/systems-library' },
  { label: 'Lab', href: '/lab' },
  { label: 'Trust & Security', href: '/trust-security' },
  { label: 'Start a System', href: '/start-a-system' },
];

export const SYSTEM_STATUS = {
  status: 'ALL SYSTEMS OPERATIONAL',
  region: 'GLOBAL (IN / UAE / UK / SG)',
  version: '2026.4 CORE',
};
