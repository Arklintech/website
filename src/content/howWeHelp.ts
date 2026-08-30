export interface HowWeHelpItem {
  id: string;
  number: string;
  title: string;
  problemStatement: string;
  solutionNarrative: string;
  businessImpact: string;
  architectureHighlight: string;
  relevantCapabilities: string[];
  relevantProjects: string[];
  iconName: string;
  href: string;
}

export const HOW_WE_HELP_ITEMS: HowWeHelpItem[] = [
  {
    id: 'connected-operations',
    number: '01',
    title: 'CONNECTED OPERATIONS',
    problemStatement: 'Disconnected applications force information, decisions and handoffs to occur across manual email threads and spreadsheets.',
    solutionNarrative: 'The architecture unifies transactional records, operational workflows and system states into one shared data topology across departments.',
    businessImpact: 'Eliminates duplicate record reconciliation, reduces inter-departmental communication latency, and establishes clear operational lineage.',
    architectureHighlight: 'Bi-directional integration fabric, event streaming brokers, master data governance, and contract-tested schemas.',
    relevantCapabilities: ['Business Systems', 'Automation & Orchestration'],
    relevantProjects: ['daarayn', 'parivar-restaurant'],
    iconName: 'Network',
    href: '/how-we-help#connected-operations',
  },
  {
    id: 'intelligent-automation',
    number: '02',
    title: 'INTELLIGENT AUTOMATION',
    problemStatement: 'High-frequency administrative handoffs and manual data transfers create bottlenecks that slow down overall execution speed.',
    solutionNarrative: 'Multi-stage operational tasks are engineered into deterministic digital workflows that process, validate and route information autonomously.',
    businessImpact: 'Eliminates repetitive data entry errors, shortens processing cycle times, and provides auditable execution logs.',
    architectureHighlight: 'State machine orchestration, asynchronous worker queues, automated rules engines, and exception handling circuits.',
    relevantCapabilities: ['Automation & Orchestration', 'AI & Intelligence'],
    relevantProjects: ['neominds-enrollment', 'daarayn'],
    iconName: 'Cpu',
    href: '/how-we-help#intelligent-automation',
  },
  {
    id: 'digital-platform-engineering',
    number: '03',
    title: 'DIGITAL PLATFORM ENGINEERING',
    problemStatement: 'Off-the-shelf commercial tools are often too rigid to support exact domain workflows or unique operating models.',
    solutionNarrative: 'Custom software platforms, client portals and core applications are architected specifically around the way your organization operates.',
    businessImpact: 'Establishes proprietary digital infrastructure, aligns software behavior with operational reality, and guarantees total technology asset ownership.',
    architectureHighlight: 'Modular full-stack architectures, high-performance edge rendering, scalable relational databases, and contract-tested APIs.',
    relevantCapabilities: ['Software & Platforms', 'Business Systems'],
    relevantProjects: ['daarayn', 'neominds-enrollment', 'parivar-restaurant'],
    iconName: 'Layers',
    href: '/how-we-help#digital-platform-engineering',
  },
  {
    id: 'systems-modernization',
    number: '04',
    title: 'SYSTEMS MODERNIZATION',
    problemStatement: 'Fragile legacy databases and monolithic applications impede operational speed and increase maintenance overhead.',
    solutionNarrative: 'Existing infrastructure is modernized incrementally using strangler patterns, decoupling legacy components without interrupting active operations.',
    businessImpact: 'Lowers ongoing technical debt, improves system availability and fault isolation, and enables modern integration patterns.',
    architectureHighlight: 'Microservice decoupling, API wrapping around legacy databases, database schema migration pipelines, and automated fallback safety.',
    relevantCapabilities: ['Software & Platforms', 'Automation & Orchestration'],
    relevantProjects: ['parivar-restaurant', 'daarayn'],
    iconName: 'RefreshCw',
    href: '/how-we-help#systems-modernization',
  },
  {
    id: 'operational-intelligence',
    number: '05',
    title: 'OPERATIONAL INTELLIGENCE',
    problemStatement: 'Leadership has access to high volumes of raw transactional data, but lacks immediate clarity into operational performance.',
    solutionNarrative: 'Operational telemetry, inventory status and transaction streams are synthesized into structured real-time decision support dashboards.',
    businessImpact: 'Enables proactive operational management, eliminates blind spots in cash flow and inventory, and accelerates decision cycles.',
    architectureHighlight: 'Real-time telemetry ingestion pipelines, analytical data warehouses, dynamic dashboard rendering, and predictive heuristics.',
    relevantCapabilities: ['AI & Intelligence', 'Business Systems'],
    relevantProjects: ['daarayn', 'parivar-restaurant'],
    iconName: 'BarChart3',
    href: '/how-we-help#operational-intelligence',
  },
  {
    id: 'ai-enabled-operations',
    number: '06',
    title: 'AI-ENABLED OPERATIONS',
    problemStatement: 'Experimental AI chat interfaces operate in isolation without secure access to organizational memory or system permissions.',
    solutionNarrative: 'Machine intelligence engines are embedded directly into business workflows, equipped with domain context, strict boundaries and human oversight.',
    businessImpact: 'Accelerates unstructured document processing, automates contextual routing, and reduces triage latency safely.',
    architectureHighlight: 'Domain-specific RAG knowledge graphs, localized LLM inference microservices, structured schema outputs, and human-in-the-loop validation.',
    relevantCapabilities: ['AI & Intelligence', 'Software & Platforms'],
    relevantProjects: ['neominds-enrollment', 'daarayn'],
    iconName: 'Bot',
    href: '/how-we-help#ai-enabled-operations',
  },
];
