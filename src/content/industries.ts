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
    tagline: 'High-volume transaction pipelines, dynamic catalog orchestration, and multi-channel synchronization.',
    context: 'Modern retail demands zero-latency stock updates, omnichannel POS harmony, and instant inventory settlement across disparate online and in-store channels.',
    challenges: [
      'Inventory race conditions during flash promotional spikes',
      'Fragmented POS terminals failing to synchronize with central ERPs',
      'Return reconciliation latency causing balance mismatches',
      'Disjointed loyalty and checkout experiences across web and mobile',
    ],
    capabilities: ['Software & Platforms', 'Automation & Orchestration', 'Business Systems'],
    solutions: [
      'Distributed inventory lock engine preventing overselling',
      'Real-time omnichannel order routing and warehouse dispatch',
      'Sub-second payment settlement and unified ledger tracking',
      'Dynamic automated pricing and customer replenishment flows',
    ],
    realWorkId: 'daarayn',
    realWorkName: 'DAARAYN Commerce Engine',
    iconName: 'ShoppingBag',
  },
  {
    id: 'education',
    name: 'Education & Institutions',
    tagline: 'Adaptive student lifecycles, institutional data unification, and multi-campus operational systems.',
    context: 'Academic institutions and modern educational platforms struggle with disjointed legacy student databases, manual gradebook verification, and fragmented admissions pipelines.',
    challenges: [
      'Multi-campus operational silos with zero real-time reporting',
      'Manual paper-heavy admissions, credit transfers, and grading cycles',
      'Poor student retention visibility and absence of early-warning signals',
      'Vulnerable student record data stored in unencrypted silos',
    ],
    capabilities: ['AI & Intelligence', 'Software & Platforms', 'Business Systems'],
    solutions: [
      'Unified student lifecycle & admissions processing fabric',
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
    tagline: 'Real-time kitchen display routing, multi-location POS, and predictive procurement automation.',
    context: 'Multi-outlet hospitality venues face extreme operational pressure during rush hours, where disconnected order dispatch and slow POS synchronization directly damage guest satisfaction.',
    challenges: [
      'POS outages during peak dining windows causing total service breakdown',
      'Kitchen station desynchronization leading to food waste and delayed orders',
      'Unpredictable supplier ingredient shortages and inaccurate inventory counts',
      'Disjointed floor management, reservation tables, and billing stations',
    ],
    capabilities: ['Software & Platforms', 'Automation & Orchestration', 'Business Systems'],
    solutions: [
      'Local-first offline-tolerant POS terminals with instant cloud catchup',
      'Sub-50ms Kitchen Display System (KDS) order routing across cook stations',
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
    tagline: 'Secure patient workflows, interoperable clinical records, and real-time medical logistics.',
    context: 'Healthcare providers require absolute data integrity, strict HIPAA/GDPR regulatory compliance, and seamless telemetry between diagnostic devices and patient care workflows.',
    challenges: [
      'Fragmented Electronic Health Record (EHR) systems with poor interoperability',
      'Manual scheduling bottlenecks causing delayed patient triage and clinic queues',
      'Compliance risks associated with patient telemetry transmission',
      'Disjointed medical inventory and emergency pharmacy procurement',
    ],
    capabilities: ['AI & Intelligence', 'Software & Platforms', 'Business Systems'],
    solutions: [
      'HL7/FHIR compliant interoperability middleware for clinical workflows',
      'Automated patient appointment triage and intelligent resource scheduling',
      'Zero-trust encrypted patient data vaults with granular consent management',
      'Real-time medication inventory tracking and cold-chain monitoring',
    ],
    realWorkId: 'daarayn',
    realWorkName: 'Healthcare Telemetry Layer',
    iconName: 'HeartPulse',
  },
  {
    id: 'non-profit',
    name: 'Non-Profit & Civic Organizations',
    tagline: 'Transparent fund tracking, donor engagement orchestration, and impact telemetry.',
    context: 'Global NGOs and non-profit institutions require rigorous grant accountability, verifiable audit trails, and multi-region volunteer and aid dispatch systems.',
    challenges: [
      'Lack of real-time auditability across distributed humanitarian grant disbursements',
      'High administrative overhead in manual donor reporting and tax reconciliation',
      'Fragmented field communication in bandwidth-constrained regions',
      'Difficulties quantifying and presenting verified societal impact metrics',
    ],
    capabilities: ['Software & Platforms', 'Automation & Orchestration', 'Business Systems'],
    solutions: [
      'Immutable cryptographic fund tracking and automated donor reporting',
      'Low-bandwidth mobile field dispatch for humanitarian aid distribution',
      'Automated donor lifecycle engagement and multi-currency gift reconciliation',
      'Real-time public impact telemetry dashboards with verified audit logs',
    ],
    realWorkId: 'neominds',
    realWorkName: 'Civic Impact Architecture',
    iconName: 'Globe',
  },
];
