export interface RevealLayer {
  number: string;
  name: string;
  description: string;
  assetPath: string;
}

export interface ProjectValueBlock {
  title: string;
  desc: string;
  icon: string;
}

export interface WorkRevealProject {
  id: string;
  number: string;
  name: string;
  systemType: string;
  shortCategory: string;
  type: string;
  icon: string;
  tagline: string;
  status: string;
  year: string;
  domain: string;
  description: string;
  whyWeBuiltThis: string;
  whyItExisted: string;
  whatWeBuilt: string;
  benefits: string[];
  systemAnatomy: { label: string; icon: string; desc: string }[];
  valueBlocks: ProjectValueBlock[];
  layers: RevealLayer[];
}

export const WORK_REVEAL_PROJECTS: WorkRevealProject[] = [
  {
    id: 'daarayn',
    number: '01',
    name: 'DAARAYN',
    systemType: 'Trust & Operations System',
    shortCategory: 'TRUST & OPERATIONS',
    type: 'Digital Platform',
    icon: 'Heart',
    tagline: 'When trust depends on knowing where everything stands, scattered information becomes the problem.',
    status: 'LIVE',
    year: '2024',
    domain: 'Trust Operations',
    description: 'A unified donor and field operations platform connecting visibility, allocation, reporting, and intelligence.',
    whyWeBuiltThis: 'To eliminate manual spreadsheets and establish clear operational lineage across all field activities.',
    whyItExisted: 'Disconnected records and manual spreadsheets made field activity difficult to see, track, and manage accurately.',
    whatWeBuilt: 'A unified trust and operations system that brings donor activity, fund allocations, field execution, and reporting into one connected environment.',
    benefits: [
      'End-to-end visibility across donors, allocations, and field operations.',
      'Real-time reporting that everyone can act on with confidence.',
      'One connected system that unites the entire trust ecosystem.',
    ],
    systemAnatomy: [
      { label: 'Operations', icon: 'Box', desc: 'Field execution & tracking' },
      { label: 'Data', icon: 'Database', desc: 'Unified & validated' },
      { label: 'Workflows', icon: 'Workflow', desc: 'Approvals & actions in sync' },
      { label: 'Reporting', icon: 'BarChart3', desc: 'Real-time insights' },
      { label: 'Intelligence', icon: 'Sparkles', desc: 'Patterns & impact' }
    ],
    valueBlocks: [
      { title: 'Unified Operations', desc: 'Everyone connected in one shared environment.', icon: 'Users' },
      { title: 'Real-time Insights', desc: 'Clear operational data that drives confident decisions.', icon: 'BarChart3' },
      { title: 'Accountability', desc: 'Complete transparency across every layer of the organization.', icon: 'ShieldCheck' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'What users see and interact with.', assetPath: '/Layers/Daarayn layers/DAARAYN_LAYER_01_INTERFACE(1).svg' },
      { number: '02', name: 'WORKFLOWS', description: 'How processes move and connect.', assetPath: '/Layers/Daarayn layers/DAARAYN_LAYER_02_WORKFLOW.svg' },
      { number: '03', name: 'DATA', description: 'Structured, validated, and connected.', assetPath: '/Layers/Daarayn layers/DAARAYN_LAYER_03_DATA.svg' },
      { number: '04', name: 'OPERATIONS', description: 'Field execution and live tracking.', assetPath: '/Layers/Daarayn layers/DAARAYN_LAYER_04_OPERATIONS.svg' },
      { number: '05', name: 'REPORTING', description: 'Real-time reporting and audit lineage.', assetPath: '/Layers/Daarayn layers/DAARAYN_LAYER_05_REPORTING.svg' },
      { number: '06', name: 'INTELLIGENCE', description: 'Practical insights that support better decisions.', assetPath: '/Layers/Daarayn layers/DAARAYN_LAYER_06_INTELLIGENCE.svg' }
    ]
  },
  {
    id: 'neominds',
    number: '02',
    name: 'NEOMINDS',
    systemType: 'Enrollment & Education Platform',
    shortCategory: 'EDUCATION',
    type: 'Education Platform',
    icon: 'BookOpen',
    tagline: 'Admissions shouldn\'t feel like a chain of disconnected forms.',
    status: 'LIVE',
    year: '2024',
    domain: 'Education Operations',
    description: 'A connected admissions platform supporting applicant progression, document verification, communication, and reporting.',
    whyWeBuiltThis: 'To automate multi-stage counselor review pipelines during high-volume intake seasons.',
    whyItExisted: 'Paper-heavy admissions and manual reviews slowed the process and created avoidable bottlenecks.',
    whatWeBuilt: 'A workflow-based admissions and seat allocation platform with automated validation.',
    benefits: [
      'Automated multi-stage applicant workflows with zero paper bottlenecks.',
      'Real-time counselor visibility into every applicant\'s progression.',
      'One system connecting students, counselors, and academic administration.',
    ],
    systemAnatomy: [
      { label: 'Portal', icon: 'User', desc: 'Frictionless applicant entry' },
      { label: 'Workflow', icon: 'Workflow', desc: 'Counselor triage & review' },
      { label: 'Document', icon: 'FileText', desc: 'OCR & verification state' },
      { label: 'Allocator', icon: 'Sliders', desc: 'Quota control systems' }
    ],
    valueBlocks: [
      { title: 'Automated Triage', desc: 'Zero-bottleneck multi-stage counselor review.', icon: 'Users' },
      { title: 'Document Validation', desc: 'Live status tracking and automated verification.', icon: 'FileText' },
      { title: 'Institutional Clarity', desc: 'Real-time visibility into intake volumes and capacity.', icon: 'BarChart3' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'Student portals and counseling review queues.', assetPath: '/Layers/Neominds layers/NEOMINDS_LAYER_01_INTERFACE.svg' },
      { number: '02', name: 'WORKFLOW', description: 'Stages, counselor reviews, and status transitions.', assetPath: '/Layers/Neominds layers/NEOMINDS_LAYER_02_WORKFLOW.svg' },
      { number: '03', name: 'DATA', description: 'Student records, academic history, and credential stores.', assetPath: '/Layers/Neominds layers/NEOMINDS_LAYER_03_DATA.svg' },
      { number: '04', name: 'COMMUNICATION', description: 'Notification gateways and status updates.', assetPath: '/Layers/Neominds layers/NEOMINDS_LAYER_04_COMMUNICATION_COORDINATION.svg' },
      { number: '05', name: 'REPORTING', description: 'Intake volumes and admissions metrics dashboard.', assetPath: '/Layers/Neominds layers/NEOMINDS_LAYER_05_REPORTING_DECISION_SUPPORT.svg' }
    ]
  },
  {
    id: 'parivar',
    number: '03',
    name: 'PARIVAR',
    systemType: 'Restaurant Operations & POS',
    shortCategory: 'RESTAURANT OPERATIONS',
    type: 'Operations Platform',
    icon: 'Coffee',
    tagline: 'High-frequency order processing, inventory sync, and client management in one system.',
    status: 'LIVE',
    year: '2024',
    domain: 'Hospitality Operations',
    description: 'A fast restaurant operations system connecting ordering, kitchen workflows, inventory, and business insight.',
    whyWeBuiltThis: 'To replace paper tickets with real-time digital operational pipelines.',
    whyItExisted: 'Delays between tables and kitchens created missed orders, waste, and operational pressure during busy periods.',
    whatWeBuilt: 'Bespoke hospitality operations software mapping tables, ordering, and inventory.',
    benefits: [
      'Zero-lag order routing from table to kitchen in real time.',
      'Live inventory sync ensuring meals never exceed available stock.',
      'One system that connects front-of-house, kitchen, and management.',
    ],
    systemAnatomy: [
      { label: 'Ingress', icon: 'Tablet', desc: 'Table ordering terminal' },
      { label: 'Kitchen', icon: 'Workflow', desc: 'Visual prep status' },
      { label: 'Inventory', icon: 'Database', desc: 'Auto-depleting stock' }
    ],
    valueBlocks: [
      { title: 'Real-time Routing', desc: 'Zero-lag order dispatch from floor to kitchen.', icon: 'Workflow' },
      { title: 'Inventory Sync', desc: 'Automatic stock depletion with zero manual reconciliation.', icon: 'Database' },
      { title: 'Franchise Metrics', desc: 'Live table turnarounds and revenue telemetry.', icon: 'BarChart3' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'Table terminals and order displays.', assetPath: '/Layers/parivar layers/PARIVAR_LAYER_01_INTERFACE.svg' },
      { number: '02', name: 'ORDER FLOW', description: 'Active ticket pipelines and route controls.', assetPath: '/Layers/parivar layers/PARIVAR_LAYER_02_ORDER_FLOW.svg' },
      { number: '03', name: 'OPERATIONS', description: 'Kitchen preparation timers and queue logic.', assetPath: '/Layers/parivar layers/PARIVAR_LAYER_03_RESTAURANT_OPERATIONS.svg' },
      { number: '04', name: 'INSIGHTS', description: 'Daily sales, recipe margins, and stock levels.', assetPath: '/Layers/parivar layers/PARIVAR_LAYER_04_BUSINESS_INSIGHT.svg' }
    ]
  },
  {
    id: 'holistic-edge',
    number: '04',
    name: 'HOLISTIC EDGE',
    systemType: 'Clinical Healthcare Platform',
    shortCategory: 'HEALTHCARE',
    type: 'Healthcare Platform',
    icon: 'Activity',
    tagline: 'Constructing clinical operating platforms built for patients and practitioners.',
    status: 'LIVE',
    year: '2024',
    domain: 'Healthcare Operations',
    description: 'A connected healthcare experience spanning patient intake, care flow, clinical operations, and continuity of insight.',
    whyWeBuiltThis: 'To coordinate clinical intake pipelines and streamline patient appointment lifecycles.',
    whyItExisted: 'Fragmented intake and paper-based appointment processes created unnecessary administrative complexity.',
    whatWeBuilt: 'Patient-facing intake and clinical administration operating system.',
    benefits: [
      'Frictionless patient intake from first contact to clinical review.',
      'Real-time practitioner coordination with zero scheduling conflicts.',
      'One system connecting patients, clinicians, and health records.',
    ],
    systemAnatomy: [
      { label: 'Patient UI', icon: 'User', desc: 'Self-intake application' },
      { label: 'Scheduler', icon: 'Calendar', desc: 'Appointment engine' },
      { label: 'Clinical DB', icon: 'Database', desc: 'Patient records' }
    ],
    valueBlocks: [
      { title: 'Frictionless Intake', desc: 'Self-guided patient booking and medical history intake.', icon: 'User' },
      { title: 'Clinical Sync', desc: 'Interoperable records with complete audit readiness.', icon: 'ShieldCheck' },
      { title: 'Practitioner Dispatch', desc: 'Conflict-free appointment and room scheduling.', icon: 'Calendar' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'Booking, patient portals, and diagnostic logs.', assetPath: '/Layers/Holistic Edge layer/HOLISTIC_EDGE_LAYER_01_PATIENT_INTERFACE.svg' },
      { number: '02', name: 'CARE JOURNEY', description: 'Practitioner handoffs and appointment cycles.', assetPath: '/Layers/Holistic Edge layer/HOLISTIC_EDGE_LAYER_02_CARE_JOURNEY.svg' },
      { number: '03', name: 'CLINICAL SYSTEM', description: 'Patient records databases and validation stores.', assetPath: '/Layers/Holistic Edge layer/HOLISTIC_EDGE_LAYER_03_CLINICAL_PATIENT_SYSTEM.svg' },
      { number: '04', name: 'INSIGHT', description: 'Treatment results, follow-up alerts, and analytics.', assetPath: '/Layers/Holistic Edge layer/HOLISTIC_EDGE_LAYER_04_INSIGHT_CONTINUITY.svg' }
    ]
  },
  {
    id: 'peaceful-deen',
    number: '05',
    name: 'PEACEFUL DEEN',
    systemType: 'Islamic Self-Discipline App',
    shortCategory: 'SELF-DISCIPLINE',
    type: 'Mobile Application',
    icon: 'Moon',
    tagline: 'Mobile digital product built to reinforce spiritual discipline and habit routines.',
    status: 'LIVE',
    year: '2024',
    domain: 'Spiritual Productivity',
    description: 'A focused mobile experience connecting prayer, remembrance, reflection, accountability, intervention, and progress.',
    whyWeBuiltThis: 'To offer offline-first habit syncing paired with real-time notification triage.',
    whyItExisted: 'Generic productivity tools did not reflect the user\'s spiritual routines, prayer times, and reflective practices.',
    whatWeBuilt: 'A focused spiritual discipline companion with a behavioral intervention trigger engine.',
    benefits: [
      'Structured daily spiritual accountability with offline-first reliability.',
      'Context-aware notifications aligned to real prayer times and locations.',
      'One system connecting habits, reflection, and daily spiritual discipline.',
    ],
    systemAnatomy: [
      { label: 'Habits', icon: 'Sliders', desc: 'Offline-first sync' },
      { label: 'Triage', icon: 'Zap', desc: 'Spiritual alert system' },
      { label: 'Reflection', icon: 'BookOpen', desc: 'Digital journal' }
    ],
    valueBlocks: [
      { title: 'Spiritual Triage', desc: 'Context-aware notifications and prayer schedules.', icon: 'Zap' },
      { title: 'Offline Reliability', desc: 'Seamless sync across devices without internet dependency.', icon: 'Database' },
      { title: 'Behavioral Insights', desc: 'Progress metrics and reflective accountability.', icon: 'BarChart3' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'Mobile app layout, Dhikr counters, and dashboard.', assetPath: '/Layers/Peacefull deen layers/PEACEFUL_DEEN_LAYER_01_INTERFACE.svg' },
      { number: '02', name: 'ACCOUNTABILITY', description: 'Location-aware prayer timings and notification loops.', assetPath: '/Layers/Peacefull deen layers/PEACEFUL_DEEN_LAYER_02_REMINDER_ACCOUNTABILITY.svg' },
      { number: '03', name: 'INTERVENTION', description: 'Spiritual context analyzers and reflection logs.', assetPath: '/Layers/Peacefull deen layers/PEACEFUL_DEEN_LAYER_03_BEHAVIORAL_TRIAGE_INTERVENTION.svg' },
      { number: '04', name: 'PROGRESS', description: 'Long-term analytics and spiritual progress trackers.', assetPath: '/Layers/Peacefull deen layers/PEACEFUL_DEEN_LAYER_04_PERSONAL_REFLECTION_PROGRESS.svg' }
    ]
  },
  {
    id: 'ai-co-teacher',
    number: '06',
    name: 'AI CO-TEACHER',
    systemType: 'EdTech AI Platform',
    shortCategory: 'LEARNING ASSISTANT',
    type: 'AI Platform',
    icon: 'Cpu',
    tagline: 'Empowering teachers with lesson plan automation and dynamic content generation.',
    status: 'ADVANCED',
    year: '2024',
    domain: 'EdTech AI',
    description: 'An AI learning assistant that helps educators create curriculum-aligned content and adapt learning with greater efficiency.',
    whyWeBuiltThis: 'To save educators valuable time on repetitive curriculum design tasks.',
    whyItExisted: 'Educators spent significant time preparing lessons, materials, and assessments manually.',
    whatWeBuilt: 'Automated lesson creation suite powered by generative Large Language Models.',
    benefits: [
      'Lesson plans and presentations generated in seconds, not hours.',
      'Automated grading with adaptive difficulty based on class performance.',
      'One system connecting curriculum generation, assessment, and analytics.',
    ],
    systemAnatomy: [
      { label: 'AI Engine', icon: 'Sparkles', desc: 'Curriculum synthesizer' },
      { label: 'Exporter', icon: 'FileCode', desc: 'Dynamic slide layouts' },
      { label: 'Grader', icon: 'CheckSquare', desc: 'Assessment validator' }
    ],
    valueBlocks: [
      { title: 'Lesson Synthesis', desc: 'Automated curriculum planning in seconds.', icon: 'Sparkles' },
      { title: 'Dynamic Slide Deck', desc: 'Direct export to structured presentation slides.', icon: 'FileCode' },
      { title: 'Adaptive Grading', desc: 'Class progression analytics and skill verification.', icon: 'BarChart3' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'Generative input prompts and grading views.', assetPath: '/Layers/AI co techer layers/AI_CO_TEACHER_LAYER_01_INTERFACE.svg' },
      { number: '02', name: 'ENGINE', description: 'LLM orchestrator and presentation slide compilers.', assetPath: '/Layers/AI co techer layers/AI_CO_TEACHER_LAYER_02_ENGINE.svg' },
      { number: '03', name: 'ASSESSMENT', description: 'Dynamic grade verification and question paper generators.', assetPath: '/Layers/AI co techer layers/AI_CO_TEACHER_LAYER_03_ADAPTATION_ASSESSMENT.svg' },
      { number: '04', name: 'ANALYTICS', description: 'Class progression maps and student metrics dashboard.', assetPath: '/Layers/AI co techer layers/AI_CO_TEACHER_LAYER_04_TEACHER_INSIGHT_LEARNING_ANALYTICS.svg' }
    ]
  },
  {
    id: 'calligraphy-by-aqsa',
    number: '07',
    name: 'CALLIGRAPHY BY AQSA',
    systemType: 'Creative Commerce System',
    shortCategory: 'CREATIVE BUSINESS',
    type: 'Commerce Platform',
    icon: 'Pen',
    tagline: 'Unifying digital showcases with custom artwork commission pipelines.',
    status: 'LIVE',
    year: '2024',
    domain: 'Creative Commerce',
    description: 'A premium creative commerce experience with a structured commission journey.',
    whyWeBuiltThis: 'To replace unstructured messaging threads with an organized intake funnel.',
    whyItExisted: 'Commission details and fulfilment information were scattered across unstructured conversations.',
    whatWeBuilt: 'A high-end visual showcase and interactive commission builder pipeline.',
    benefits: [
      'Commission specifications captured with zero back-and-forth ambiguity.',
      'End-to-end status tracking from inquiry to delivery for every client.',
      'One platform connecting artwork showcase, clients, and fulfillment.',
    ],
    systemAnatomy: [
      { label: 'Showcase', icon: 'Eye', desc: 'Cinematic visual portfolio' },
      { label: 'Pipeline', icon: 'Workflow', desc: 'Commission workflow' }
    ],
    valueBlocks: [
      { title: 'Commission Engine', desc: 'Clear specification capture with zero ambiguity.', icon: 'Sliders' },
      { title: 'Client Transparency', desc: 'End-to-end status tracking from sketch to ship.', icon: 'Eye' },
      { title: 'Visual Showcase', desc: 'Cinematic digital gallery with high-res details.', icon: 'Sparkles' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'Artwork display galleries and commission forms.', assetPath: '/Layers/Calligraphy by aqsa layers/CALLIGRAPHY_BY_AQSA_LAYER_01_INTERFACE.svg' },
      { number: '02', name: 'COMMISSION', description: 'Client request validation and status tracking flow.', assetPath: '/Layers/Calligraphy by aqsa layers/CALLIGRAPHY_BY_AQSA_LAYER_02_COMMISSION_CREATIVE_PROCESS.svg' }
    ]
  },
  {
    id: 'sakura-montessori',
    number: '08',
    name: 'SAKURA MONTESSORI',
    systemType: 'School & Admissions Platform',
    shortCategory: 'SCHOOL & ADMISSIONS',
    type: 'School Platform',
    icon: 'Star',
    tagline: 'Multi-campus admissions experience built around parent discovery journeys.',
    status: 'LIVE',
    year: '2024',
    domain: 'Education & Schools',
    description: 'A connected school experience covering program discovery, classroom communication, enrollment, and child development insight.',
    whyWeBuiltThis: 'To manage admissions routing and program selection across multi-campus branches.',
    whyItExisted: 'Disconnected forms created record inconsistencies and made multi-campus coordination harder to manage.',
    whatWeBuilt: 'Montessori program discovery database and centralized admissions system.',
    benefits: [
      'Multi-campus discovery with instant branch routing and program matching.',
      'Unified admissions pipeline with zero sibling or data mismatch.',
      'One system connecting parent inquiry, enrollment, and classroom assignment.',
    ],
    systemAnatomy: [
      { label: 'Discovery', icon: 'Search', desc: 'Bilingual program search' },
      { label: 'Admissions', icon: 'ClipboardList', desc: 'Enrollment database' }
    ],
    valueBlocks: [
      { title: 'Campus Matching', desc: 'Interactive program search and branch selection.', icon: 'Search' },
      { title: 'Admissions Mesh', desc: 'Unified parent applicant intake and sibling sync.', icon: 'ClipboardList' },
      { title: 'Parent Insights', desc: 'Live discovery journey and enrollment progression.', icon: 'BarChart3' }
    ],
    layers: [
      { number: '01', name: 'INTERFACE', description: 'School maps, curriculum discoverers, and forms.', assetPath: '/Layers/Sakura montessori layer/SAKURA_MONTESSORI_LAYER_01_INTERFACE.svg' },
      { number: '02', name: 'LEARNING SYSTEM', description: 'Montessori learning metrics and campus activities logs.', assetPath: '/Layers/Sakura montessori layer/SAKURA_MONTESSORI_LAYER_02_LEARNING_CLASSROOM_SYSTEM.svg' },
      { number: '03', name: 'CHILD DEVELOPMENT', description: 'Enrollment progress boards and student profiles archives.', assetPath: '/Layers/Sakura montessori layer/SAKURA_MONTESSORI_LAYER_03_CHILD_DEVELOPMENT_PARENT_INSIGHT.svg' }
    ]
  }
];
