export interface Project {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  problem: string;
  system: string;
  architecture: string;
  engineering: string;
  integration: string;
  outcome: string;
  visual: string;
  focalPoint: string;
  stack: string[];
  features: string[];
  href: string;
  // Optional compatibility fields used by newer components
  systemType?: string;
  summary?: string;
  tagline?: string;
  metrics?: { label: string; value: string }[];
  qualitativeOutcomes?: string[];
  statusMarker?: string;
  number?: string;
  capabilities?: string[];
  // Full 10-point engineering dossier (optional — only present on detailed project entries)
  dossier?: {
    context: { title: string; content: string; environment: string; scale: string };
    challenge: { title: string; content: string; frictionPoints: string[] };
    objective: { title: string; content: string; keyGoals: string[] };
    system: { title: string; content: string; coreComponents: string[] };
    architecture: {
      title: string; content: string;
      diagramNodes: { name: string; type: string; role: string }[];
      flowDescription: string;
    };
    experience: { title: string; content: string; interfaceHighlights: string[] };
    intelligence: { title: string; content: string; automationRules: string[] };
    engineering: { title: string; content: string; technicalStandards: string[] };
    outcome: { title: string; content: string; verifiedImpact: string[] };
    technology: { title: string; stack: string[]; integrations: string[]; infrastructure: string[] };
  };
}

export type ProjectDossier = Project;

export const PROJECTS: Project[] = [
  {
    id: 'daarayn',
    name: 'DAARAYN',
    type: 'Trust & Operations System',
    category: 'DIGITAL PLATFORM',
    description: 'A unified operating platform connecting donor records, fund allocations, field execution, and real-time reporting across the trust ecosystem.',
    problem: 'Disconnected donor records and manual spreadsheets made field activity difficult to see, track, and manage accurately.',
    system: 'Architected a connected operating environment bringing donors, allocations, field teams, and reporting together in real time.',
    architecture: 'Edge Next.js frontend integrated with high-concurrency Node.js backend microservices, Redis transactional cache, and PostgreSQL database.',
    engineering: 'Built optimistic UI rendering, strict TypeScript schemas across API endpoints, and sub-500ms server-side catalog generation.',
    integration: 'Connected Stripe payment gateways, real-time inventory webhooks, and automated order fulfillment telemetry streams.',
    outcome: 'Delivered sub-500ms page load times, 100% accurate real-time inventory ledger synchronization, and streamlined automated order dispatch.',
    visual: '/visuals/work/daarayn.webp',
    focalPoint: 'object-top',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe API', 'Redis'],
    features: ['Real-time Inventory Sync', 'Sub-500ms Checkout Flow', 'Bespoke Design System', 'Automated Sales Telemetry'],
    href: '#daarayn',
  },
  {
    id: 'neominds-enrollment',
    name: 'NEOMINDS ENROLLMENT',
    type: 'Enrollment & Education Platform',
    category: 'EDUCATION TECHNOLOGY PLATFORM',
    description: 'An end-to-end admissions and course enrollment workflow engine with document validation and dynamic applicant state tracking.',
    problem: 'Paper-heavy admissions, manual verification bottlenecks, and lost applicant handoffs slowed down admissions response by weeks.',
    system: 'Engineered a multi-stage admissions state machine that automates document intake, validation scoring, and reviewer assignment.',
    architecture: 'React micro-frontend architecture paired with Express API services, Prisma ORM, and AWS S3 secure document vaults.',
    engineering: 'Constructed deterministic applicant state transition models, automated PDF verification handlers, and role-based review boards.',
    integration: 'Integrated institutional SIS databases, automated email notification dispatch, and cloud file storage webhooks.',
    outcome: 'Reduced student enrollment processing time from weeks to minutes, eliminated manual document verification errors, and unified institutional admissions.',
    visual: '/visuals/work/neominds.webp',
    focalPoint: 'object-top',
    stack: ['React', 'TypeScript', 'Express', 'Prisma', 'AWS S3'],
    features: ['Multi-Stage Application Pipeline', 'Automated Document Verification', 'Role-Based Counselor Dashboard', 'Instant Notification Engine'],
    href: '#neominds-enrollment',
  },
  {
    id: 'parivar-restaurant',
    name: 'PARIVAR RESTAURANT',
    type: 'Restaurant Operations & POS',
    category: 'HOSPITALITY POS & OPERATIONS',
    description: 'Unified restaurant POS, kitchen display system (KDS), and live table management architecture for multi-terminal ordering.',
    problem: 'Delays between tables and kitchens created missed orders, waste, and severe operational pressure during busy dining periods.',
    system: 'Designed a real-time local WebSocket event mesh linking offline-tolerant POS terminals with kitchen display queues and cloud analytics.',
    architecture: 'Electron/React desktop POS client operating over a localized WebSocket event bus, backed by dynamic GraphQL query schemas.',
    engineering: 'Engineered sub-50ms local order routing, offline-first transaction queues, and real-time kitchen station state displays.',
    integration: 'Connected kitchen display screens, thermal receipt printer hardware, table status sensors, and cloud management dashboards.',
    outcome: 'Eliminated order ticket loss, reduced kitchen preparation dispatch latency by 40%, and provided management with live table turnover analytics.',
    visual: '/visuals/work/parivar.webp',
    focalPoint: 'object-top',
    stack: ['React', 'Electron', 'WebSockets', 'GraphQL', 'Tailwind CSS'],
    features: ['Live Kitchen Queue Display', 'Interactive Floor Map', 'Instant Table Billing', 'Zero-Latency Order Dispatch'],
    href: '#parivar-restaurant',
  },
];
