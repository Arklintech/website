export interface Capability {
  id: string;
  number: string;
  category: string;
  title: string;
  subheading: string;
  positioning: string;
  description: string;
  technicalVocabulary: string[];
  systemFlow: string[];
  systemFlowString: string;
  businessView: {
    problemSolved: string;
    valueDelivered: string;
    whoItHelps: string[];
    keyDeliverables: string[];
  };
  systemView: {
    systemRole: string;
    dataFlow: string;
    architectureOverview: string;
    systemNodes: string[];
  };
  engineeringView: {
    stackAndIntegrations: string[];
    contractsAndProtocols: string[];
    securityAndReliability: string;
    observabilityMetrics: string[];
  };
  visual: string;
  focalPoint: string;
  tags: string[];
  href: string;
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'ai-intelligence',
    number: '01',
    category: 'INTELLIGENCE LAYER',
    title: 'AI & Intelligence',
    subheading: 'Intelligent Decision & Automation Systems',
    positioning: 'We apply AI, context, and business data to improve decisions, automate intelligent work, and help operations respond with greater speed and precision.',
    description: 'We turn business information into useful intelligence people can act on—helping teams understand what is happening, anticipate what comes next, and execute with confidence.',
    technicalVocabulary: [
      'AI',
      'Machine Learning',
      'Intelligent Systems',
      'Decision Systems',
      'Intelligent Agents',
      'Domain Knowledge RAG',
      'Context Graph',
      'Predictive Inference',
    ],
    systemFlow: ['DATA', 'CONTEXT', 'INTELLIGENCE', 'DECISION', 'ACTION'],
    systemFlowString: 'DATA → CONTEXT → INTELLIGENCE → DECISION → ACTION',
    businessView: {
      problemSolved: 'Eliminates information bottlenecks, manual data sorting, decision delays, and fragmented business reporting.',
      valueDelivered: 'Empowers organizations with real-time automated decisioning, predictive operational foresight, and reliable task triage.',
      whoItHelps: ['Founders & CEOs', 'Operations Leaders', 'Product Managers', 'Decision Intelligence Teams'],
      keyDeliverables: [
        'Domain-Specific Intelligent Execution Agents',
        'Automated Document & Unstructured Data Ingestion',
        'Contextual Decision-Support Dashboards',
        'Predictive Operational & Risk Forecasting Models',
      ],
    },
    systemView: {
      systemRole: 'Acts as the cognitive layer positioned atop existing databases and event pipelines, evaluating live operational state to dispatch deterministic actions.',
      dataFlow: 'Raw Event Ingestion → Vector & Contextual Embedding → Domain Reasoning Core → Deterministic Rule Validation → Orchestration Dispatch',
      architectureOverview: 'Hybrid LLM / ML microservices running with localized cache hierarchies, strict structured JSON schema enforcement, and sub-100ms vector lookup.',
      systemNodes: ['Vector Context Engine', 'Inference Gateway', 'Policy Enforcement Guard', 'Action Dispatch Node'],
    },
    engineeringView: {
      stackAndIntegrations: ['PyTorch', 'ONNX Runtime', 'pgvector', 'LangChain/LangGraph', 'FastAPI', 'Redis Semantic Cache'],
      contractsAndProtocols: ['gRPC Inter-service Mesh', 'JSON Schema Typed Actions', 'SSE Streaming Inference', 'OpenAPI 3.1'],
      securityAndReliability: 'Zero data leakage boundaries, local model residency options, AES-256 encrypted context vaults, and deterministic fallback circuits.',
      observabilityMetrics: ['Inference Latency P99 < 120ms', 'Decision Accuracy Benchmarks', 'Context Recall Precision', 'Model Drift Telemetry'],
    },
    visual: '/visuals/zaqvoro/ai-intelligence.webp',
    focalPoint: 'object-center',
    tags: ['AI', 'INTELLIGENCE', 'DECISION', 'AGENTS'],
    href: '/what-we-do/ai-intelligence',
  },
  {
    id: 'software-platforms',
    number: '02',
    category: 'SOFTWARE ENGINEERING CORE',
    title: 'Software & Platforms',
    subheading: 'Custom Digital Platforms & Software Engineering',
    positioning: 'We design and engineer applications, portals, platforms, and digital products around the way the business actually operates.',
    description: 'We build software around the business—not the other way around. Our platforms, portals, and distributed microservices are engineered for high concurrency, zero-downtime execution, and multi-tenant scale.',
    technicalVocabulary: [
      'Software Engineering',
      'Applications',
      'Platforms',
      'Product Engineering',
      'Microservices',
      'Distributed Systems',
      'Edge Infrastructure',
      'Cloud Architecture',
    ],
    systemFlow: ['INTERFACE', 'APPLICATION', 'SERVICES', 'DATA', 'INFRASTRUCTURE'],
    systemFlowString: 'INTERFACE → APPLICATION → SERVICES → DATA → INFRASTRUCTURE',
    businessView: {
      problemSolved: 'Replaces off-the-shelf software limitations, legacy technical debt, and fragmented user portals with purpose-built systems.',
      valueDelivered: 'Provides proprietary digital assets that perfectly align with operational workflows, customer touchpoints, and business models.',
      whoItHelps: ['Founders & Enterprise Buyers', 'CTOs & Engineering Heads', 'Product Leaders', 'Operations Managers'],
      keyDeliverables: [
        'Custom Web Applications & Client Portals',
        'High-Throughput Backend Service Meshes',
        'Mobile & Desktop Native Platforms',
        'Scalable Multi-Tenant Cloud Architecture',
      ],
    },
    systemView: {
      systemRole: 'Forms the core operational and user-facing substrate, governing data persistence, business logic execution, and contract-driven API boundaries.',
      dataFlow: 'Client UI Interaction → Edge Gateway / CDN → Application Service Layer → Transactional Database → Event Bus Dispatch',
      architectureOverview: 'Modular micro-frontend and distributed service mesh architecture with strict boundary isolation and automated autoscaling.',
      systemNodes: ['Edge Presentation Tier', 'Authentication/AuthZ Node', 'Core Application Services', 'Transactional Ledger DB'],
    },
    engineeringView: {
      stackAndIntegrations: ['TypeScript / Next.js', 'Go / Node.js Microservices', 'PostgreSQL / TimescaleDB', 'Redis Cluster', 'Docker & Kubernetes'],
      contractsAndProtocols: ['GraphQL Schemas', 'REST / OpenAPI 3.0', 'WebSocket Bilateral Feeds', 'Event-Driven Webhooks'],
      securityAndReliability: 'SOC2-aligned data architecture, automated CI/CD security scanning, multi-region database failover, and 99.99% uptime SLA.',
      observabilityMetrics: ['Sub-50ms API Latency', 'Zero-Downtime Rolling Deploys', 'Error Budget Burn Rate', 'Database Connection Pool Saturation'],
    },
    visual: '/visuals/zaqvoro/software-engineering.webp',
    focalPoint: 'object-top',
    tags: ['SOFTWARE', 'PLATFORMS', 'ENGINEERING', 'SCALE'],
    href: '/what-we-do/software-platforms',
  },
  {
    id: 'automation-orchestration',
    number: '03',
    category: 'WORKFLOW ORCHESTRATION',
    title: 'Automation & Orchestration',
    subheading: 'Intelligent Workflow Systems for Complex Operations',
    positioning: 'We connect events, rules, applications, and automated actions into coordinated workflows that remove repetitive manual handoffs.',
    description: 'We make routine work move automatically, accurately, and on time. Our event-driven systems coordinate multi-step operational logic across tool boundaries without human delay.',
    technicalVocabulary: [
      'Workflow Automation',
      'Orchestration',
      'Event-Driven Systems',
      'APIs',
      'Intelligent Execution',
      'Message Brokers',
      'State Machines',
      'Rule Engines',
    ],
    systemFlow: ['EVENT', 'RULE', 'WORKFLOW', 'ACTION', 'RESULT'],
    systemFlowString: 'EVENT → RULE → WORKFLOW → ACTION → RESULT',
    businessView: {
      problemSolved: 'Eliminates repetitive manual data entry, disconnected tool silos, missed handoffs, and slow operational cycle times.',
      valueDelivered: 'Translates complex operational requirements into automated, auditable workflows that run 24/7 with zero human latency.',
      whoItHelps: ['Operations VPs', 'COOs & General Managers', 'Finance & Logistics Teams', 'Customer Success Leaders'],
      keyDeliverables: [
        'Deterministic Multi-System Workflow Engines',
        'Automated Approval & Exception Escalation Pipelines',
        'Cross-Application Data Synchronization Handlers',
        'Real-Time Operational Alerting & Telemetry',
      ],
    },
    systemView: {
      systemRole: 'Operates as the central nervous system, listening to event triggers across disparate tools to coordinate deterministic multi-stage workflows.',
      dataFlow: 'Inbound Event Stream → Message Queue Buffer → Finite State Machine Evaluation → Automated Action Handlers → Audit Confirmation',
      architectureOverview: 'Asynchronous event mesh built with distributed worker pools, dead-letter recovery queues, and idempotent execution guarantees.',
      systemNodes: ['Event Ingestion Ingress', 'State Transition Engine', 'Worker Execution Pool', 'Telemetry & Audit Vault'],
    },
    engineeringView: {
      stackAndIntegrations: ['Temporal / BullMQ', 'Apache Kafka / RabbitMQ', 'Node.js / Python Workers', 'PostgreSQL State Store', 'OpenTelemetry'],
      contractsAndProtocols: ['CloudEvents Standard', 'Webhook Ingress/Egress', 'Idempotency Key Headers', 'AMQP 0-9-1'],
      securityAndReliability: 'At-least-once execution guarantees with idempotent handlers, cryptographic webhook verification, and automated retry backoffs.',
      observabilityMetrics: ['Workflow Execution Throughput', 'State Machine Step Latency', 'Queue Lag Time', 'Zero Dropped Events'],
    },
    visual: '/visuals/zaqvoro/automation-core.webp',
    focalPoint: 'object-center',
    tags: ['AUTOMATION', 'ORCHESTRATION', 'WORKFLOW', 'EVENTS'],
    href: '/what-we-do/automation-orchestration',
  },
  {
    id: 'business-systems',
    number: '04',
    category: 'ENTERPRISE OPERATIONAL ARCHITECTURE',
    title: 'Business Systems',
    subheading: 'Connected Operational Architecture',
    positioning: 'We connect the systems, data, and workflows that keep an organization running into one clearer operational environment.',
    description: 'We bring the systems running the business together so the organization can operate as one—unifying POS, CRM, ERP, inventory ledgers, and financial pipelines into a single synchronized source of truth.',
    technicalVocabulary: [
      'CRM',
      'ERP',
      'POS',
      'Data Integration',
      'Enterprise Architecture',
      'Operational Systems',
      'Inventory Ledgers',
      'Single Source of Truth',
    ],
    systemFlow: ['CRM', 'ERP', 'POS', 'DATA', 'OPERATIONS'],
    systemFlowString: 'CRM ↔ ERP ↔ POS ↔ DATA ↔ OPERATIONS',
    businessView: {
      problemSolved: 'Solves disconnected departmental databases, manual spreadsheet reconciliations, inventory discrepancies, and blind spots in executive visibility.',
      valueDelivered: 'Provides total organizational visibility, real-time financial & inventory integrity, and synchronized operational control.',
      whoItHelps: ['CEOs & Business Owners', 'CFOs & Financial Controllers', 'Supply Chain & Inventory Directors', 'IT & Systems Architects'],
      keyDeliverables: [
        'Unified ERP / CRM Data Integration Fabric',
        'Real-Time Multi-Location POS & Inventory Ledgers',
        'Executive Command & Real-Time KPI Dashboards',
        'Automated Financial Reconciliation Engines',
      ],
    },
    systemView: {
      systemRole: 'Acts as the unified enterprise data fabric connecting disparate commercial software and custom platforms into a single operational reality.',
      dataFlow: 'Terminal/POS & CRM Data → Real-Time Integration Bus → Master Data Validation & Ledger Reconciliation → Unified Data Warehouse → Operational Command UI',
      architectureOverview: 'Bi-directional ETL/ELT pipelines combined with localized offline-tolerant terminals and centralized cloud transactional stores.',
      systemNodes: ['Master Data Hub', 'Bi-Directional Sync Gateway', 'Transactional Ledger DB', 'Executive Telemetry Interface'],
    },
    engineeringView: {
      stackAndIntegrations: ['PostgreSQL', 'ClickHouse / BigQuery', 'Stripe / Adyen Integrations', 'SAP / Salesforce Connectors', 'GraphQL Unified Graph'],
      contractsAndProtocols: ['Two-Phase Commit Transactions', 'REST / GraphQL Interconnects', 'ISO 8583 Payment Protocols', 'OAuth 2.0 / MTLS'],
      securityAndReliability: 'ACID-compliant distributed transactions, role-based access control (RBAC), end-to-end data encryption at rest/transit.',
      observabilityMetrics: ['Ledger Reconciliation Divergence: 0.00%', 'Sync Latency < 250ms', 'Database Replication Lag', 'Terminal Uptime 99.99%'],
    },
    visual: '/visuals/zaqvoro/business-systems.webp',
    focalPoint: 'object-center',
    tags: ['BUSINESS SYSTEMS', 'ERP', 'CRM', 'OPERATIONS'],
    href: '/what-we-do/business-systems',
  },
];
