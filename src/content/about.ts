export interface SystemModelNode {
  id: string;
  label: string;
  category: string;
  description: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  technicalSpecs: string[];
}

export interface PhilosophyStage {
  number: string;
  stage: string;
  statement: string;
  deliverable: string;
}

export interface EngineeringCategory {
  title: string;
  items: string[];
}

export interface PrincipleItem {
  title: string;
  subtitle: string;
  description: string;
}

export interface EngineeringPrinciple {
  number: string;
  title: string;
  description: string;
  rule: string;
}

export interface AboutContent {
  meta: {
    title: string;
    descriptor: string;
    tagline: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    signal: string;
    narrative: string;
  };
  whoWeAre: {
    sectionNumber: string;
    title: string;
    primaryStatement: string;
    callout: string;
    narrative: string[];
  };
  systemModel: {
    sectionNumber: string;
    title: string;
    description: string;
    layers: {
      top: string;
      middle: string[];
      lower: string;
      bottom: string;
    };
  };
  whatWeEngineer: {
    sectionNumber: string;
    title: string;
    description: string;
    capabilities: CapabilityItem[];
  };
  corePhilosophy: {
    sectionNumber: string;
    title: string;
    stages: PhilosophyStage[];
  };
  systemsOverFeatures: {
    sectionNumber: string;
    headline: string;
    narrative: string;
    flow: string[];
  };
  engineeringPrinciples: EngineeringPrinciple[];
  engineeringDepth: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    disciplines: {
      label: string;
      description: string;
    }[];
  };
  proofThroughWork: {
    sectionNumber: string;
    title: string;
    subtitle: string;
  };
  whyAklintech: {
    sectionNumber: string;
    title: string;
    principles: PrincipleItem[];
  };
  keystone: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    pillars: string[];
    statement: string;
  };
  evolution: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    steps: string[];
  };
  cta: {
    sectionNumber: string;
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export const ABOUT_CONTENT: AboutContent = {
  meta: {
    title: 'ARKLINTECH',
    descriptor: 'TECHNOLOGY SYSTEMS',
    tagline: 'We architect intelligent systems, simplify complex operations, and build software that creates measurable value.',
  },
  hero: {
    badge: '01 // COMPANY DISCLOSURE • ARKLINTECH',
    title: 'WE ENGINEER WHAT COMES NEXT.',
    subtitle: 'ARKLINTECH architects intelligent systems that connect software, intelligence, automation, and operations into technology built to perform.',
    signal: 'SOFTWARE • INTELLIGENCE • AUTOMATION • ORCHESTRATION • SYSTEMS',
    narrative: 'We design and engineer enterprise technology centered around real operational outcomes rather than isolated feature development.',
  },
  whoWeAre: {
    sectionNumber: '02',
    title: 'WHO WE ARE',
    primaryStatement: 'ARKLINTECH is a technology systems company focused on designing and engineering intelligent digital infrastructure for modern organizations.',
    callout: 'WE DO MORE THAN BUILD PRODUCTS. WE BUILD THE SYSTEMS THAT HELP BUSINESSES, TEAMS, AND OPERATIONS WORK WITH GREATER CLARITY AND CONTROL.',
    narrative: [
      'When software, data, and teams operate in isolation, work becomes slower and harder to understand. ARKLINTECH was established to bring those moving parts into one connected system so information flows clearly, decisions happen faster, and operations can perform with confidence.',
      'We approach technology from a systems engineering perspective. By uniting custom software platforms, decision intelligence, and automated operational orchestration, we construct technology foundations engineered for long-term reliability and scale.',
    ],
  },
  systemModel: {
    sectionNumber: '03',
    title: 'THE ARKLINTECH SYSTEM MODEL',
    description: 'We start with the experience people use, connect it to the intelligence and workflows behind it, and build through to the operational result the business needs.',
    layers: {
      top: 'INTELLIGENCE',
      middle: ['SOFTWARE', 'ORCHESTRATION', 'AUTOMATION'],
      lower: 'OPERATIONS',
      bottom: 'OUTCOME',
    },
  },
  whatWeEngineer: {
    sectionNumber: '04',
    title: 'WHAT WE ENGINEER',
    description: 'Architectural disciplines designed for mission-critical operating environments.',
    capabilities: [
      {
        number: '01',
        title: 'INTELLIGENCE',
        tagline: 'AI systems & decision layers',
        description: 'We turn business information and context into useful predictions, recommendations, and decisions that people can act on.',
        technicalSpecs: ['Contextual RAG Pipelines', 'Decision Support Logic', 'Telemetry Analysis'],
      },
      {
        number: '02',
        title: 'SOFTWARE',
        tagline: 'Products, platforms & applications',
        description: 'We build digital platforms and applications around the way the business actually operates, engineered for high concurrency and sub-second response.',
        technicalSpecs: ['Responsive UI Engines', 'Real-Time State Topology', 'Edge-Optimized Assets'],
      },
      {
        number: '03',
        title: 'AUTOMATION',
        tagline: 'Repeatable intelligent workflows',
        description: 'We make routine work move automatically and accurately, removing repetitive manual handoffs across multi-stage processes.',
        technicalSpecs: ['Event-Driven Triggers', 'Fault-Tolerant Retries', 'Audit Telemetry Logs'],
      },
      {
        number: '04',
        title: 'ORCHESTRATION',
        tagline: 'Connected systems & processes',
        description: 'We coordinate the services, APIs, and workflows that need to work together, eliminating application silos across the organization.',
        technicalSpecs: ['Unified Schema Encoders', 'REST/GraphQL/gRPC Routing', 'Zero-Downtime Migration'],
      },
      {
        number: '05',
        title: 'BUSINESS SYSTEMS',
        tagline: 'Operational infrastructure',
        description: 'We bring the systems running the business together—including ERP, CRM, POS, and inventory ledgers—into a single operational reality.',
        technicalSpecs: ['Role-Based Access (RBAC)', 'Multi-Tenant Data Partitioning', 'Audit Trace Logs'],
      },
      {
        number: '06',
        title: 'PLATFORMS',
        tagline: 'Scalable digital foundations',
        description: 'We construct resilient cloud foundations capable of supporting the business today and scaling smoothly as demands expand.',
        technicalSpecs: ['Automated CI/CD Workflows', 'Multi-Region Failover', 'Zero-Trust Perimeters'],
      },
    ],
  },
  corePhilosophy: {
    sectionNumber: '05',
    title: 'HOW WE THINK & BUILD',
    stages: [
      {
        number: '01',
        stage: 'UNDERSTAND',
        statement: 'We study how the business works today, identify friction, and find where better structure creates the greatest leverage.',
        deliverable: 'Operational Friction Audit & Architectural Blueprint',
      },
      {
        number: '02',
        stage: 'CONNECT',
        statement: 'We create the system blueprint and connect people, software, data, and services so information moves clearly.',
        deliverable: 'Unified Data Topology & API Perimeters',
      },
      {
        number: '03',
        stage: 'ORCHESTRATE',
        statement: 'We engineer the core software, rules, and services that coordinate how the system behaves in real operating conditions.',
        deliverable: 'Deterministic Execution Protocol & State Matrix',
      },
      {
        number: '04',
        stage: 'BUILD',
        statement: 'We bring databases, external platforms, legacy tools, and connected services together into one dependable operating structure.',
        deliverable: 'Production Codebase & Hardened Staging Clusters',
      },
      {
        number: '05',
        stage: 'EXECUTE',
        statement: 'We test the system under demanding conditions, verify reliability and security, and ensure it performs as expected before launch.',
        deliverable: 'Attested Live Migration & Telemetry Validation',
      },
      {
        number: '06',
        stage: 'EVOLVE',
        statement: 'We monitor real-world performance, identify opportunities to improve, and expand the system as the business grows.',
        deliverable: 'Real-Time Telemetry & Progressive Feature Iteration',
      },
    ],
  },
  systemsOverFeatures: {
    sectionNumber: '04',
    headline: 'FEATURES ARE PIECES. SYSTEMS ARE RELATIONSHIPS.',
    narrative: 'A useful technology system does more than perform isolated actions. It connects people, information, automation, and decisions into one dependable operating model.',
    flow: ['DATA', 'LOGIC', 'AUTOMATION', 'ACTION', 'OUTCOME'],
  },
  engineeringPrinciples: [
    {
      number: '01',
      title: 'Deterministic Architecture Over Guesswork',
      description: 'Important workflows are engineered to behave predictably. Every state transition and database query is auditable and recoverable.',
      rule: 'Zero unhandled edge cases or opaque logic in mission-critical workflows.',
    },
    {
      number: '02',
      title: 'Real-World Operational Resilience',
      description: 'Critical operations are engineered to respond with minimal delay, performing reliably during peak demand surges and network fluctuations.',
      rule: 'Local-first fault tolerance, automated retry circuits, and sub-50ms user interface responsiveness.',
    },
    {
      number: '03',
      title: 'Security by Design & Data Governance',
      description: 'Encryption, controlled access, and zero-trust principles are built into database schemas and API perimeters rather than added after the fact.',
      rule: 'Zero-trust perimeters, encrypted credentials, and continuous automated attestation.',
    },
    {
      number: '04',
      title: 'Modular Longevity & Clean Code',
      description: 'We write strongly typed, well-factored code that can be maintained, extended, and evolved by internal teams for years to come.',
      rule: '100% strict TypeScript types, contract-driven schemas, and comprehensive documentation.',
    },
  ],
  engineeringDepth: {
    sectionNumber: '05',
    title: 'ENGINEERED FOR REAL OPERATIONS',
    subtitle: 'Proven technical capabilities across the entire digital stack.',
    disciplines: [
      { label: 'ARCHITECTURE', description: 'Defines how the system is structured and how its parts work together.' },
      { label: 'APIs', description: 'Enables different applications and services to communicate reliably.' },
      { label: 'DATABASES', description: 'Stores the information the business needs to operate and make decisions.' },
      { label: 'AUTHENTICATION', description: 'Ensures the right people have the right level of access.' },
      { label: 'WORKFLOWS', description: 'Controls how events, approvals, and actions move through the system.' },
      { label: 'AI', description: 'Turns data and context into useful predictions, recommendations, and decisions.' },
      { label: 'INTEGRATIONS', description: 'Connects existing tools, business platforms, and legacy systems into one operating environment.' },
      { label: 'DATA', description: 'Moves and prepares information so it is available where and when it is needed.' },
      { label: 'SECURITY', description: 'Protects data, access, and critical operations across all boundaries.' },
      { label: 'DEPLOYMENT', description: 'Delivers systems reliably across the infrastructure where they need to run.' },
      { label: 'OBSERVABILITY', description: 'Shows how the system is performing and helps teams identify issues early.' },
    ],
  },
  proofThroughWork: {
    sectionNumber: '06',
    title: "THE SYSTEMS WE'VE BUILT",
    subtitle: 'Selected production systems engineered for operational clarity, speed, and scale.',
  },
  whyAklintech: {
    sectionNumber: '07',
    title: 'WHY ARKLINTECH',
    principles: [
      {
        title: 'SYSTEMS, NOT SILOS',
        subtitle: 'Connected Digital Architecture',
        description: 'We design technology as interconnected systems where data, workflows, and interfaces operate in complete harmony.',
      },
      {
        title: 'ENGINEERING, NOT DECORATION',
        subtitle: 'Functional Architectural Rigor',
        description: 'The interface is only one layer of the product. True excellence lies in data integrity, security, and responsive execution speed.',
      },
      {
        title: 'INTELLIGENCE, WITH PURPOSE',
        subtitle: 'Practical AI & Automation',
        description: 'AI exists to improve decisions and operations, not to serve as an ungrounded gimmick or isolated experiment.',
      },
      {
        title: 'DESIGNED TO EVOLVE',
        subtitle: 'Modular Future Readiness',
        description: 'Technology should remain adaptable, maintainable, and clean as your organization grows and operational demands expand.',
      },
    ],
  },
  keystone: {
    sectionNumber: '08',
    title: 'THE KEYSTONE',
    subtitle: 'THE STRUCTURE BEHIND THE SYSTEM',
    pillars: ['STRUCTURE', 'FOUNDATION', 'CONNECTION', 'ENGINEERING'],
    statement: 'The Keystone represents the fundamental architectural anchor of ARKLINTECH: building dependable digital foundations that bind intelligence, software, and real-world operations.',
  },
  evolution: {
    sectionNumber: '08',
    title: 'CAPABILITY EVOLUTION',
    subtitle: 'The natural trajectory of modern technology engineering.',
    steps: [
      'DIGITAL EXPERIENCES',
      'SOFTWARE SYSTEMS',
      'AUTOMATION',
      'INTELLIGENT SYSTEMS',
      'CONNECTED TECHNOLOGY SYSTEMS',
    ],
  },
  cta: {
    sectionNumber: '09',
    title: 'START A SYSTEM',
    subtitle: 'Partner with ARKLINTECH to engineer your next technology infrastructure.',
    buttonText: 'START A SYSTEM',
  },
};
