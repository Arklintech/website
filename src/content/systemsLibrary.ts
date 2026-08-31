export interface SystemConcept {
  id: string;
  number: string;
  name: string;
  tagline: string;
  whatItIs: string;
  whyItMatters: string;
  howItWorks: string;
  whereItApplies: string[];
  relatedCapabilities: string[];
  relatedProjects: string[];
}

export const SYSTEMS_LIBRARY: SystemConcept[] = [
  {
    id: 'workflow-engines',
    number: '01',
    name: 'Workflow Engines',
    tagline: 'Systems that coordinate multi-step processes, recover from interruptions, and keep work moving reliably.',
    whatItIs: 'Stateful execution software that guarantees multi-step business processes progress deterministically, tracking state transitions and retrying failures gracefully.',
    whyItMatters: 'Prevents dropped tasks, uncompleted customer transactions, and untracked human delays across mission-critical workflows.',
    howItWorks: 'Accepts trigger payloads, transitions through defined state machine nodes, evaluates conditional logic gates, executes idempotent workers, and logs complete audit trails.',
    whereItApplies: ['Student Admissions & Verification', 'Loan Approval & Underwriting', 'Order Fulfillment & RMA', 'Vendor Onboarding'],
    relatedCapabilities: ['Automation & Orchestration', 'Software & Platforms'],
    relatedProjects: ['neominds', 'daarayn'],
  },
  {
    id: 'intelligent-layers',
    number: '02',
    name: 'Intelligent Layers',
    tagline: 'Embedded intelligence that helps systems interpret context and support better decisions.',
    whatItIs: 'Domain-trained AI microservices that parse unstructured text, understand operational context, and generate structured recommendations or decisions.',
    whyItMatters: 'Bridges raw enterprise databases with contextual understanding, unlocking automated document parsing, triage, and assistance at scale.',
    howItWorks: 'Vectorizes organizational records into high-dimensional embeddings, performs sub-100ms semantic similarity queries, applies prompt guards, and generates typed schema outputs.',
    whereItApplies: ['Document Verification & OCR', 'Contextual Customer Support', 'Predictive Resource Scheduling', 'Automated Triage'],
    relatedCapabilities: ['AI & Intelligence', 'Software & Platforms'],
    relatedProjects: ['neominds', 'daarayn'],
  },
  {
    id: 'integration-fabric',
    number: '03',
    name: 'Integration Fabric',
    tagline: 'A connected foundation that allows different applications and services to communicate without forcing teams to work across isolated systems.',
    whatItIs: 'Resilient middleware that unifies third-party SaaS APIs, legacy ERPs, payment gateways, and bespoke internal databases into a single synchronized data bus.',
    whyItMatters: 'Eliminates data silos and redundant manual data entry, ensuring real-time consistency across every tool the company relies on.',
    howItWorks: 'Standardizes disparate API protocols (REST, GraphQL, gRPC, Webhooks) into unified schema contracts with automated retry queues, rate-limit backoffs, and cryptographic verification.',
    whereItApplies: ['Payment Gateway Harmonization', 'CRM to Accounting Sync', 'POS to ERP Ledger Linking', 'Multi-Carrier Logistics'],
    relatedCapabilities: ['Business Systems', 'Automation & Orchestration'],
    relatedProjects: ['daarayn', 'parivar'],
  },
  {
    id: 'data-pipelines',
    number: '04',
    name: 'Data Pipelines',
    tagline: 'Reliable pathways that collect, prepare, and move information into the places where it can be used.',
    whatItIs: 'Continuous streaming data infrastructure that ingests operational event telemetry, cleanses and normalizes records, and populates analytical ledgers in sub-second latency.',
    whyItMatters: 'Powers real-time executive dashboards, enables instant anomaly detection, and ensures business leaders see current reality rather than delayed reports.',
    howItWorks: 'Captures CDC (Change Data Capture) logs or direct event streams into distributed queues, applies stream transformations, and delivers to column-oriented analytical stores.',
    whereItApplies: ['Real-Time Sales Telemetry', 'Multi-Store Inventory Velocity', 'Financial Audit Ledgers', 'User Activity Tracking'],
    relatedCapabilities: ['Business Systems', 'Software & Platforms'],
    relatedProjects: ['parivar', 'daarayn'],
  },
  {
    id: 'decision-engines',
    number: '05',
    name: 'Decision Engines',
    tagline: 'Configurable rules that help organizations apply consistent decisions across recurring business situations.',
    whatItIs: 'Rule evaluation software that separates complex business logic from application code, allowing automated policy evaluation at high frequency and scale.',
    whyItMatters: 'Allows business rules, pricing matrices, and risk thresholds to evolve quickly without requiring risky code refactors in core applications.',
    howItWorks: 'Parses incoming context against deterministic rule matrices, evaluates conditional constraints, and returns immediate pass/fail or scored outcomes.',
    whereItApplies: ['Dynamic Pricing & Discount Rules', 'Fraud & Risk Detection', 'Admissions Eligibility Scoring', 'Automated Lead Routing'],
    relatedCapabilities: ['AI & Intelligence', 'Automation & Orchestration'],
    relatedProjects: ['neominds', 'daarayn'],
  },
  {
    id: 'event-orchestration',
    number: '06',
    name: 'Event Orchestration',
    tagline: 'The infrastructure that allows systems to respond to events quickly and coordinate the right actions.',
    whatItIs: 'Distributed messaging backbone that decouples frontend user interactions from long-running backend computations and external API calls.',
    whyItMatters: 'Maintains sub-500ms user interface responsiveness even when triggering complex multi-step background operations.',
    howItWorks: 'Publishes lightweight event payloads to partitioned message brokers, dispatching tasks to scalable worker pools with dead-letter recovery handling.',
    whereItApplies: ['Kitchen Station Dispatch', 'PDF Generation & Tax Invoicing', 'Batch Customer Notifications', 'Media Asset Processing'],
    relatedCapabilities: ['Automation & Orchestration', 'Software & Platforms'],
    relatedProjects: ['parivar', 'daarayn'],
  },
  {
    id: 'operational-systems',
    number: '07',
    name: 'Operational Systems',
    tagline: 'Interfaces and command environments designed around the people who use them every day.',
    whatItIs: 'High-density command portals, point-of-sale clients, and administrative workstations specifically architected for operational staff speed and accuracy.',
    whyItMatters: 'Replaces confusing generic software with high-contrast, keyboard-friendly, role-specific tools that dramatically accelerate employee throughput.',
    howItWorks: 'Pairs optimistic UI state management with local caches and strict backend data validations, providing zero-latency interactions and offline fault tolerance.',
    whereItApplies: ['Restaurant POS & KDS', 'Trust & Donor Command Desks', 'Admissions Counselor Workstations', 'Warehouse Inventory Handhelds'],
    relatedCapabilities: ['Business Systems', 'Software & Platforms'],
    relatedProjects: ['parivar', 'daarayn', 'neominds'],
  },
  {
    id: 'knowledge-systems',
    number: '08',
    name: 'Knowledge Systems',
    tagline: 'Structured organizational knowledge that can be retrieved in the right context by the right people.',
    whatItIs: 'Domain-indexed repositories that transform complex documentation, standard operating procedures (SOPs), and operational histories into structured context for staff and AI agents.',
    whyItMatters: 'Prevents institutional knowledge from disappearing into lost folders, giving teams and automation pipelines instant access to verified facts.',
    howItWorks: 'Parses domain assets into semantic chunks, creates searchable knowledge graphs, and applies role-based access controls to contextual query endpoints.',
    whereItApplies: ['SOP & Compliance Retrieval', 'Technical Support Knowledge Desks', 'Clinical Guideline Reference', 'Employee Onboarding Knowledge Bases'],
    relatedCapabilities: ['AI & Intelligence', 'Software & Platforms'],
    relatedProjects: ['neominds', 'holistic-edge'],
  },
];
