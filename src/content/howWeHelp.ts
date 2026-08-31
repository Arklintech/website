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
    problemStatement: 'When software, data, and teams operate in isolation, information moves slowly and decisions become harder to coordinate.',
    solutionNarrative: 'Bring the records, workflows, and systems that run the organization into one connected operating environment, so teams can work from clearer information.',
    businessImpact: 'Eliminates duplicate reconciliation, reduces inter-departmental delay, and establishes clear operational lineage across the business.',
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
    problemStatement: 'High-frequency manual handoffs and repetitive data transfers create bottlenecks that slow down overall execution speed.',
    solutionNarrative: 'Replace repetitive manual handoffs with reliable workflows that can process, validate, route, and respond without constant human intervention.',
    businessImpact: 'Eliminates repetitive data entry errors, shortens processing cycle times, and provides auditable execution records.',
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
    solutionNarrative: 'Build custom software, portals, and core platforms around the organization\'s specific operating model rather than forcing the business into a generic product.',
    businessImpact: 'Establishes proprietary digital assets, aligns software behavior with operational reality, and guarantees total technology ownership.',
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
    problemStatement: 'Fragile legacy databases and monolithic software impede operational speed and increase maintenance overhead.',
    solutionNarrative: 'Improve older technology progressively—modernizing the parts that need attention without disrupting the operation that already depends on them.',
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
    problemStatement: 'Leadership often has access to large volumes of raw transactional data, but lacks immediate clarity into real-time operational performance.',
    solutionNarrative: 'Turn live operational information into practical visibility, so leaders can understand what is happening across areas such as inventory, cash flow, and fulfilment.',
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
    problemStatement: 'Isolated AI experiments often operate without access to organizational context or the systems where decisions need to be executed.',
    solutionNarrative: 'Place useful AI inside real workflows, giving teams intelligent assistance where better context, faster analysis, or more informed decisions can create value.',
    businessImpact: 'Accelerates unstructured document processing, automates contextual routing, and reduces triage latency safely.',
    architectureHighlight: 'Domain-specific RAG knowledge graphs, localized LLM inference microservices, structured schema outputs, and human-in-the-loop validation.',
    relevantCapabilities: ['AI & Intelligence', 'Software & Platforms'],
    relevantProjects: ['neominds-enrollment', 'daarayn'],
    iconName: 'Bot',
    href: '/how-we-help#ai-enabled-operations',
  },
];
