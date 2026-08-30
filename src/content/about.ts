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
    tagline: 'A premium technology company that architects intelligent systems.',
  },
  hero: {
    badge: '01 // COMPANY DISCLOSURE • ARKLINTECH',
    title: 'WE ENGINEER WHAT COMES NEXT.',
    subtitle: 'ARKLINTECH architects intelligent systems that connect software, intelligence, automation and operations into technology built to perform.',
    signal: 'SOFTWARE • INTELLIGENCE • AUTOMATION • ORCHESTRATION • SYSTEMS',
    narrative: 'We design and engineer enterprise-grade digital infrastructure centered around real operational outcomes rather than isolated feature development.',
  },
  whoWeAre: {
    sectionNumber: '02',
    title: 'WHO WE ARE',
    primaryStatement: 'ARKLINTECH is a technology systems company focused on designing and engineering intelligent digital infrastructure for modern organizations.',
    callout: "WE DON'T JUST BUILD PRODUCTS. WE BUILD SYSTEMS THAT MAKE PRODUCTS, BUSINESSES AND OPERATIONS WORK BETTER.",
    narrative: [
      'ARKLINTECH was established to solve a fundamental challenge in enterprise technology: modern organizations are burdened by fragmented software tools, unintegrated databases, and superficial automation experiments.',
      'We approach technology from a systems engineering perspective. By uniting custom software platforms, decision intelligence, and automated operational orchestration, we construct technology foundations engineered for long-term reliability and scale.',
    ],
  },
  systemModel: {
    sectionNumber: '03',
    title: 'THE ARKLINTECH SYSTEM MODEL',
    description: 'Our architectural blueprint unifies decision layers, execution pipelines, and live operational feedback into one deterministic loop.',
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
    description: 'Architectural disciplines designed for high-density, mission-critical operational environments.',
    capabilities: [
      {
        number: '01',
        title: 'INTELLIGENCE',
        tagline: 'AI systems & decision layers',
        description: 'Predictive decision engines, custom LLM agents, and real-time contextual data processing integrated into core business logic.',
        technicalSpecs: ['Contextual RAG Pipelines', 'Decision Support Logic', 'Telemetry Analysis'],
      },
      {
        number: '02',
        title: 'SOFTWARE',
        tagline: 'Products, platforms & applications',
        description: 'High-performance web and mobile platforms engineered with sub-50ms interfaces and strict TypeScript type boundaries.',
        technicalSpecs: ['Responsive UI Engines', 'Real-Time State Topology', 'Edge-Optimized Assets'],
      },
      {
        number: '03',
        title: 'AUTOMATION',
        tagline: 'Repeatable intelligent workflows',
        description: 'Deterministic workflow pipelines that eliminate manual error and execute high-frequency tasks autonomously.',
        technicalSpecs: ['Event-Driven Triggers', 'Fault-Tolerant Retries', 'Audit Telemetry Logs'],
      },
      {
        number: '04',
        title: 'ORCHESTRATION',
        tagline: 'Connected systems & processes',
        description: 'API gateways and middleware layers connecting legacy databases with modern cloud microservices.',
        technicalSpecs: ['Unified Schema Encoders', 'REST/GraphQL/gRPC Routing', 'Zero-Downtime Migration'],
      },
      {
        number: '05',
        title: 'BUSINESS SYSTEMS',
        tagline: 'Operational infrastructure',
        description: 'Custom ERPs, command centers, and administrative control panels tailored to operational realities.',
        technicalSpecs: ['Role-Based Access (RBAC)', 'Multi-Tenant Data Partitioning', 'Audit Trace Logs'],
      },
      {
        number: '06',
        title: 'PLATFORMS',
        tagline: 'Scalable digital foundations',
        description: 'Resilient multi-tier cloud architectures capable of scaling to high concurrent traffic while preserving sub-second SLAs.',
        technicalSpecs: ['Automated CI/CD Workflows', 'Multi-Region Failover', 'Zero-Trust Perimeters'],
      },
    ],
  },
  corePhilosophy: {
    sectionNumber: '05',
    title: 'HOW WE THINK',
    stages: [
      {
        number: '01',
        stage: 'UNDERSTAND',
        statement: 'Understand the problem before selecting technology.',
        deliverable: 'Operational Friction Audit & Architectural Blueprint',
      },
      {
        number: '02',
        stage: 'CONNECT',
        statement: 'Connect the people, data and systems involved.',
        deliverable: 'Unified Data Topology & API Perimeters',
      },
      {
        number: '03',
        stage: 'ORCHESTRATE',
        statement: 'Make the system work as one.',
        deliverable: 'Deterministic Execution Protocol & State Matrix',
      },
      {
        number: '04',
        stage: 'BUILD',
        statement: 'Engineer the right architecture.',
        deliverable: 'Production Codebase & Hardened Staging Clusters',
      },
      {
        number: '05',
        stage: 'EXECUTE',
        statement: 'Put the system into operation.',
        deliverable: 'Attested Live Migration & Telemetry Validation',
      },
      {
        number: '06',
        stage: 'EVOLVE',
        statement: 'Improve it continuously.',
        deliverable: 'Real-Time Telemetry & Progressive Feature Iteration',
      },
    ],
  },
  systemsOverFeatures: {
    sectionNumber: '04',
    headline: 'FEATURES ARE PIECES. SYSTEMS ARE RELATIONSHIPS.',
    narrative: 'A useful technology system does more than perform individual isolated actions. It connects people, information, automation and decisions into one operating model.',
    flow: ['DATA', 'LOGIC', 'AUTOMATION', 'ACTION', 'OUTCOME'],
  },
  engineeringPrinciples: [
    {
      number: '01',
      title: 'Deterministic Architecture Over Guesswork',
      description: 'Every state transition, database query, and automated workflow must be predictable, auditable, and mathematically verifiable.',
      rule: 'Zero unhandled edge cases or opaque magic in mission-critical code paths.',
    },
    {
      number: '02',
      title: 'Real-World Operational Resilience',
      description: 'Systems must perform flawlessly during peak operational rushes, intermittent network drops, and unanticipated data volume surges.',
      rule: 'Local-first fault tolerance, automated retry circuits, and sub-50ms user interface responsiveness.',
    },
    {
      number: '03',
      title: 'Strict Security & Data Governance',
      description: 'Security is embedded into database schemas, API token perimeters, and role-based policies.',
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
      { label: 'ARCHITECTURE', description: 'Deterministic state topology & system boundary design.' },
      { label: 'APIs', description: 'Strongly-typed schemas, gRPC, REST, and GraphQL endpoints.' },
      { label: 'DATABASES', description: 'Relational & document data modeling with ACID compliance.' },
      { label: 'AUTHENTICATION', description: 'Zero-trust perimeters, OAuth2, and granular RBAC policies.' },
      { label: 'WORKFLOWS', description: 'Asynchronous event queues and state machine pipelines.' },
      { label: 'AI', description: 'Embedded model inferences and vector embedding search.' },
      { label: 'INTEGRATIONS', description: 'Third-party API connectors & legacy database adapters.' },
      { label: 'DATA', description: 'ETL processing pipelines & real-time telemetry streaming.' },
      { label: 'SECURITY', description: 'Encryption at rest and in transit with continuous attestation.' },
      { label: 'DEPLOYMENT', description: 'Containerized CI/CD builds & zero-downtime releases.' },
      { label: 'OBSERVABILITY', description: 'Real-time error tracking, latency metrics & log aggregation.' },
    ],
  },
  proofThroughWork: {
    sectionNumber: '06',
    title: "THE SYSTEMS WE'VE BUILT",
    subtitle: 'Selected production systems engineered for enterprise scale and operational clarity.',
  },
  whyAklintech: {
    sectionNumber: '07',
    title: 'WHY ARKLINTECH',
    principles: [
      {
        title: 'SYSTEMS, NOT SILOS',
        subtitle: 'Interconnected Digital Topology',
        description: 'We design technology as interconnected systems where data, workflows, and interfaces operate in complete harmony.',
      },
      {
        title: 'ENGINEERING, NOT DECORATION',
        subtitle: 'Functional Architectural Rigor',
        description: 'The interface is only one layer of the product. True excellence lies in data integrity, security, and sub-50ms execution speed.',
      },
      {
        title: 'INTELLIGENCE, WITH PURPOSE',
        subtitle: 'Deliberate AI & Automation',
        description: 'AI exists to improve decisions and operations, not to serve as an ungrounded marketing gimmick or endless experiment.',
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
    statement: 'The Keystone represents the fundamental architectural anchor of ARKLINTECH: building unshakeable digital foundations that bind intelligence, software, and real-world operations.',
  },
  evolution: {
    sectionNumber: '09',
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
    sectionNumber: '10',
    title: 'START A SYSTEM',
    subtitle: 'Partner with ARKLINTECH to engineer your next-generation technology infrastructure.',
    buttonText: 'START A SYSTEM',
  },
};
