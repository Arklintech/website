export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string;
  systemRole: string;
  inputs: string[];
  outputs: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'UNDERSTAND',
    tagline: 'We study how the business works today, identify friction, and find leverage.',
    description: 'We audit current operational workflows, map existing technical assets, and isolate core architectural leverage points before selecting tools.',
    details: 'Before writing code, we systematically inspect data flows, security perimeters, legacy boundaries, and operational throughput to establish a clear engineering specification.',
    systemRole: 'Diagnostic discovery phase that converts business requirements and operational realities into precise technical boundaries.',
    inputs: ['Operational Audits', 'Data Topologies', 'Constraint Matrix', 'Legacy Schemas'],
    outputs: ['System Architecture Spec', 'Security Boundary Model', 'Data Flow Diagram'],
  },
  {
    number: '02',
    title: 'CONNECT',
    tagline: 'We create the system blueprint and connect people, software, and data.',
    description: 'We construct modular system blueprints, state transition machines, and contract-driven API schemas so information moves reliably.',
    details: 'Designing deterministic distributed architectures that bridge operational business logic with high-throughput backend services and secure database models.',
    systemRole: 'Structural design phase establishing system boundaries, API schemas, and component relationships.',
    inputs: ['Domain Models', 'Scalability Specs', 'Contract Schemas', 'Integration Schemas'],
    outputs: ['Interface Protocols', 'Database Topology', 'State Transition Blueprint'],
  },
  {
    number: '03',
    title: 'ORCHESTRATE',
    tagline: 'We engineer the core software, rules, and services that coordinate behavior.',
    description: 'We engineer production software with strict type safety, modular boundaries, and hardened backend infrastructure.',
    details: 'Disciplined engineering practices guarantee sub-millisecond execution, high-concurrency event handling, and modular service maintainability across all system layers.',
    systemRole: 'Implementation phase constructing production software, intelligence microservices, and automated logic.',
    inputs: ['Architecture Spec', 'Component Designs', 'Database Topologies', 'API Schemas'],
    outputs: ['Production Services', 'Distributed APIs', 'Hardened Core Code', 'Intelligence Engine'],
  },
  {
    number: '04',
    title: 'BUILD',
    tagline: 'We bring databases, external tools, and services into one structure.',
    description: 'We connect databases, third-party platforms, event queues, and legacy systems into one unified operational fabric.',
    details: 'Eliminating organizational data silos through bi-directional data synchronization, real-time message brokers, and resilient webhook pipelines.',
    systemRole: 'Interconnection phase linking isolated software modules into a unified, responsive operating organism.',
    inputs: ['Legacy Systems', 'Third-Party APIs', 'Event Pipelines', 'Database Nodes'],
    outputs: ['Synchronized Event Bus', 'Unified Middleware', 'Live Telemetry Fabric'],
  },
  {
    number: '05',
    title: 'EXECUTE',
    tagline: 'We test under demanding conditions and verify reliability before launch.',
    description: 'We subject systems to rigorous validation protocols under real-world and peak load stress scenarios.',
    details: 'Verifying deterministic execution, zero-regression behavior, edge-case fault-tolerance, and end-to-end security integrity before production release.',
    systemRole: 'Quality assurance and attestation phase proving system resilience prior to live operational deployment.',
    inputs: ['Stress Scenarios', 'Edge-Case Vectors', 'Security Audits', 'Load Models'],
    outputs: ['Validation Attestation', 'Performance Benchmarks', 'Zero-Downtime Deployment'],
  },
  {
    number: '06',
    title: 'EVOLVE',
    tagline: 'We monitor real-world performance and expand the system as you grow.',
    description: 'We audit live telemetry, optimize operational yield, and evolve system capabilities as organizational scale expands.',
    details: 'Continuous automated telemetry tracking isolates latency shifts, throughput bottlenecks, and model drift to maintain peak systemic performance.',
    systemRole: 'Continuous adaptation phase ensuring system architecture gracefully absorbs future volume and capability growth.',
    inputs: ['Live Telemetry', 'Operational Metrics', 'System Logs', 'Yield Reports'],
    outputs: ['Autonomous Optimizations', 'Refined System Schemas', 'Sustained Scale'],
  },
];
