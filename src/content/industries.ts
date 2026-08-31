export interface IndustryFramework {
  id: string;
  name: string;
  tagline: string;
  context: string;
  challenges: string[];
  capabilities: string[];
  solutions: string[];
  realWorkId: string;
  realWorkName: string;
  iconName: string;
}

export const INDUSTRIES: IndustryFramework[] = [
  {
    id: 'commerce',
    name: 'Commerce & Retail',
    tagline: 'Connected inventory, order movement, checkout, and payment reconciliation designed to keep commerce moving with clarity and speed.',
    context: 'Modern retail demands synchronized stock updates, omnichannel POS harmony, and instant inventory settlement across online and physical channels.',
    challenges: [
      'Inventory race conditions and overselling during promotional traffic surges',
      'Fragmented POS terminals failing to synchronize with central inventory ledgers',
      'Return and exchange reconciliation delays causing accounting mismatches',
      'Disjointed customer profiles and checkout experiences across web and mobile',
    ],
    capabilities: ['Software & Platforms', 'Automation & Orchestration', 'Business Systems'],
    solutions: [
      'Distributed inventory lock engine preventing overselling across channels',
      'Real-time omnichannel order routing and warehouse fulfillment dispatch',
      'Sub-second payment settlement and unified financial ledger tracking',
      'Dynamic automated pricing updates and automated replenishment workflows',
    ],
    realWorkId: 'daarayn',
    realWorkName: 'DAARAYN Commerce Engine',
    iconName: 'ShoppingBag',
  },
  {
    id: 'education',
    name: 'Education & Institutions',
    tagline: 'Connected student journeys, admissions, document verification, and fee management that reduce administrative friction.',
    context: 'Academic institutions struggle with disjointed applicant databases, manual verification bottlenecks, and fragmented multi-campus records.',
    challenges: [
      'Multi-campus operational silos with fragmented reporting visibility',
      'Manual, paper-heavy admissions, credit evaluations, and grading cycles',
      'Limited visibility into student retention and absence of early-intervention signals',
      'Student records and credentials stored in insecure, unintegrated silos',
    ],
    capabilities: ['AI & Intelligence', 'Software & Platforms', 'Business Systems'],
    solutions: [
      'Unified student lifecycle & multi-stage admissions processing fabric',
      'Predictive academic progress monitoring and automated intervention flags',
      'Institutional ERP integration connecting fee ledgers and registrar records',
      'Encrypted role-based credential verification and transcript issuance',
    ],
    realWorkId: 'neominds',
    realWorkName: 'NEOMINDS Education Platform',
    iconName: 'GraduationCap',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Foodservice',
    tagline: 'Reliable ordering, kitchen coordination, inventory awareness, and operational insight built for fast-moving environments.',
    context: 'Multi-outlet venues face intense operational pressure during peak rush hours, where disconnected order dispatch directly impacts guest satisfaction.',
    challenges: [
      'POS disruptions during peak dining windows causing service breakdowns',
      'Kitchen station desynchronization leading to food waste and delayed orders',
      'Inaccurate ingredient stock counts and unpredictable supply shortages',
      'Disconnected floor management, table status, and billing terminals',
    ],
    capabilities: ['Software & Platforms', 'Automation & Orchestration', 'Business Systems'],
    solutions: [
      'Local-first offline-tolerant POS terminals with instant cloud catchup',
      'Sub-50ms Kitchen Display System (KDS) order routing across preparation stations',
      'Automated predictive ingredient replenishment based on historical table velocity',
      'Unified floor management and multi-tender contactless guest payment',
    ],
    realWorkId: 'parivar',
    realWorkName: 'PARIVAR Operations System',
    iconName: 'UtensilsCrossed',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinical Systems',
    tagline: 'Connected patient journeys, protected information, clinical workflows, and operational visibility built around trust and continuity.',
    context: 'Healthcare providers require absolute data integrity, strict regulatory compliance, and seamless coordination across diagnostic and patient care workflows.',
    challenges: [
      'Fragmented Electronic Health Record (EHR) systems with poor interoperability',
      'Manual scheduling bottlenecks causing delayed patient triage and clinic queues',
      'Compliance and security risks associated with clinical data transmission',
      'Disjointed medical inventory tracking and clinic supply procurement',
    ],
    capabilities: ['AI & Intelligence', 'Software & Platforms', 'Business Systems'],
    solutions: [
      'HL7/FHIR compliant interoperability middleware for clinical workflows',
      'Automated patient appointment triage and intelligent resource scheduling',
      'Zero-trust encrypted patient data vaults with granular consent management',
      'Real-time medication inventory tracking and cold-chain monitoring',
    ],
    realWorkId: 'holistic-edge',
    realWorkName: 'HOLISTIC EDGE Clinical Platform',
    iconName: 'Activity',
  },
];
