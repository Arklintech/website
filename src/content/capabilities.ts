export interface Capability {
  id: string;
  number: string;
  category: string;
  title: string;
  positioning: string;
  description: string;
  whatWeBuild: string[];
  systemFlow: string[];
  problemSolved: string;
  systemRole: string;
  outcomeProduced: string;
  visual: string;
  focalPoint: string;
  tags: string[];
  vocabulary: string[];
  href: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'ai-intelligence',
    number: '01',
    category: 'INTELLIGENCE LAYER',
    title: 'AI & INTELLIGENCE',
    positioning: 'Engineering autonomous intelligence layers that transform complex data into operational decisions and execution.',
    description: 'We architect intelligence layers that synthesize raw event streams, build contextual domain knowledge, and execute autonomous decisions at scale.',
    whatWeBuild: [
      'Intelligent Agents & Autonomous Execution Threads',
      'Domain-Specific Knowledge & RAG Pipelines',
      'Real-Time Predictive Inference Microservices',
      'Automated Executive Decision-Support Systems',
    ],
    systemFlow: ['DATA', 'KNOWLEDGE', 'INTELLIGENCE', 'DECISION', 'ACTION'],
    problemSolved: 'Eliminates manual data analysis bottlenecks, decision latency, and unexploited organizational telemetry across high-velocity operational environments.',
    systemRole: 'Positioned at the upper cognitive layer of the system architecture, constantly auditing event streams to fire deterministic operational actions.',
    outcomeProduced: 'Autonomous decisioning capability, sub-second inference response times, and continuous self-optimizing operational intelligence.',
    visual: '/visuals/zaqvoro/ai-intelligence.webp',
    focalPoint: 'object-center',
    tags: ['INTELLIGENCE', 'REASON', 'DECIDE', 'EXECUTE'],
    vocabulary: ['INTELLIGENCE LAYER', 'REASONING ENGINE', 'DATA PIPELINE', 'DECISION MODEL', 'AUTONOMOUS ACTION'],
    href: '#ai-intelligence',
  },
  {
    id: 'software-platforms',
    number: '02',
    category: 'ENGINEERING CORE',
    title: 'SOFTWARE & PLATFORMS',
    positioning: 'Production software engineered around strict architecture, security boundaries, and high-throughput execution.',
    description: 'We engineer custom platform architectures, distributed microservices, and resilient API gateways built for zero-downtime execution and long-term scale.',
    whatWeBuild: [
      'Distributed Backend Microservices & API Fabrics',
      'Custom Web & Mobile Software Platforms',
      'High-Concurrency Transactional Databases',
      'Secure Multi-Tenant Cloud Architecture',
    ],
    systemFlow: ['REQUIREMENT', 'ARCHITECTURE', 'ENGINEERING', 'INTEGRATION', 'VALIDATION', 'DEPLOYMENT', 'EVOLUTION'],
    problemSolved: 'Solves monolithic technical debt, unscalable software architectures, fragile legacy codebases, and high latency under peak operational load.',
    systemRole: 'Serves as the core application engine, governing data persistence, business logic enforcement, and contract-driven API boundaries.',
    outcomeProduced: 'Sub-millisecond data transactions, complete service isolation, 99.99% operational uptime, and modular software longevity.',
    visual: '/visuals/zaqvoro/software-engineering.webp',
    focalPoint: 'object-top',
    tags: ['ARCHITECT', 'ENGINEER', 'DEPLOY', 'SCALE'],
    vocabulary: ['SOFTWARE CORE', 'PLATFORM ARCHITECTURE', 'MICROSERVICES', 'CONTRACT SCHEMAS', 'HARDENED DEPLOYMENT'],
    href: '#software-platforms',
  },
  {
    id: 'automation-orchestration',
    number: '03',
    category: 'ORCHESTRATION ENGINE',
    title: 'AUTOMATION & ORCHESTRATION',
    positioning: 'Coordinating multi-system operations, event-driven workflows, and business processes into one synchronized flow.',
    description: 'We engineer event-driven orchestration engines that eliminate operational friction, synchronize multi-system data flows, and automate complex workflows.',
    whatWeBuild: [
      'Event-Driven Workflow Orchestration Engines',
      'Cross-Platform API & Middleware Integration Fabrics',
      'Automated Business Logic & Rule Systems',
      'Real-Time Asynchronous Message Queues',
    ],
    systemFlow: ['TRIGGER', 'DATA', 'PROCESS', 'DECISION', 'ACTION', 'OUTCOME'],
    problemSolved: 'Removes manual human handoffs, fragmented application silos, lost data state during process handoffs, and operational execution delay.',
    systemRole: 'Operates as the systemic nervous system, listening for events across software boundaries to trigger automated multi-step operations.',
    outcomeProduced: '100% deterministic process execution, zero lost workflow events, automated cross-departmental coordination, and maximum operational throughput.',
    visual: '/visuals/zaqvoro/automation-core.webp',
    focalPoint: 'object-center',
    tags: ['ORCHESTRATE', 'AUTOMATE', 'SYNCHRONIZE', 'FLOW'],
    vocabulary: ['ORCHESTRATION ENGINE', 'EVENT TRIGGER', 'WORKFLOW PIPELINE', 'BUSINESS RULES', 'OPERATIONAL EXECUTION'],
    href: '#automation-orchestration',
  },
  {
    id: 'business-systems',
    number: '04',
    category: 'ENTERPRISE ARCHITECTURE',
    title: 'BUSINESS SYSTEMS',
    positioning: 'Architecting connected operational infrastructure that unifies people, systems, data, and workflows into one system of record and action.',
    description: 'We construct unified business operating environments integrating POS, CRM, ERP, inventory ledgers, and financial pipelines into a single source of truth.',
    whatWeBuild: [
      'Connected Enterprise POS & Operations Engines',
      'Integrated CRM/ERP & Financial Ledger Architectures',
      'Real-Time Multi-Location Inventory Systems',
      'Executive Telemetry & Command Dashboards',
    ],
    systemFlow: ['PEOPLE + SYSTEMS', 'DATA + PROCESS', 'CONNECTED SYSTEM', 'VISIBILITY', 'CONTROL', 'PERFORMANCE', 'OUTCOME'],
    problemSolved: 'Fixes fragmented operations, blind spots in organizational data, manual reconciliation chaos, and disconnected operational management.',
    systemRole: 'Functions as the overarching enterprise infrastructure layer establishing single-source-of-truth governance and executive control.',
    outcomeProduced: 'Complete operational visibility, real-time command control, streamlined organizational speed, and predictable business performance.',
    visual: '/visuals/zaqvoro/business-systems.webp',
    focalPoint: 'object-center',
    tags: ['SYSTEMS', 'OPERATIONS', 'CONTROL', 'VISIBILITY'],
    vocabulary: ['BUSINESS SYSTEMS', 'OPERATIONAL INFRASTRUCTURE', 'SINGLE SOURCE OF TRUTH', 'SYSTEM OF RECORD', 'ENTERPRISE CONTROL'],
    href: '#business-systems',
  },
];
