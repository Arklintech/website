export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'capabilities', label: 'WHAT WE BUILD', href: '#capabilities' },
  { id: 'process', label: 'HOW WE BUILD', href: '#process' },
  { id: 'systems', label: 'SYSTEMS', href: '#systems' },
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'future', label: 'INNOVATION', href: '#future' },
  { id: 'about', label: 'WHY ZAQVORO', href: '#about' },
];

export const SYSTEM_STATUS = {
  status: 'ACTIVE',
  environment: 'ONLINE',
  coreTemp: '36.7°C',
  uptime: '99.99%',
  protocolVersion: 'v4.2.0',
};
