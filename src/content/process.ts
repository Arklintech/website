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
    tagline: 'Map problem, system state, and constraints.',
    description: 'We audit current operational workflows, map existing technical assets, and isolate core architectural leverage points.',
    details: 'Before writing code, we systematically inspect data topologies, security perimeters, legacy boundaries, and operational throughput to establish a deterministic engineering specification.',
    systemRole: 'Diagnostic discovery phase that converts unstructured business requirements into precise technical boundaries.',
    inputs: ['Operational Audits', 'Data Topologies', 'Constraint Matrix', 'Legacy Schemas'],
    outputs: ['System Architecture Spec', 'Security Boundary Model', 'Data Flow Diagram'],
  },
  {
    number: '02',
    title: 'ARCHITECT',
    tagline: 'Define system boundaries and data flows.',
    description: 'We construct modular system blueprints, state transition machines, and contract-driven API schemas.',
    details: 'Designing deterministic distributed architectures that bridge operational business logic with high-throughput backend services and secure database models.',
    systemRole: 'Structural design phase establishing system boundaries, API schemas, and component relationships.',
    inputs: ['Domain Models', 'Scalability Specs', 'Contract Schemas', 'Integration Schemas'],
    outputs: ['Interface Protocols', 'Database Topology', 'State Transition Blueprint'],
  },
  {
    number: '03',
    title: 'ENGINEER',
    tagline: 'Build software, intelligence, and business logic.',
    description: 'We engineer production software with strict type safety, modular boundaries, and hardened backend infrastructure.',
    details: 'Disciplined engineering practices guarantee sub-millisecond execution, high-concurrency event handling, and modular service maintainability across all system layers.',
    systemRole: 'Implementation phase constructing production software, intelligence microservices, and automated logic.',
    inputs: ['Architecture Spec', 'Component Designs', 'Database Topologies', 'API Schemas'],
    outputs: ['Production Services', 'Distributed APIs', 'Hardened Core Code', 'Intelligence Engine'],
  },
  {
    number: '04',
    title: 'INTEGRATE',
    tagline: 'Connect APIs, data sources, and workflows.',
    description: 'We connect databases, third-party platforms, event queues, and legacy systems into one unified operational fabric.',
    details: 'Eliminating organizational data silos through bi-directional data synchronization, real-time message brokers, and resilient webhook pipelines.',
    systemRole: 'Interconnection phase linking isolated software modules into a unified, responsive organism.',
    inputs: ['Legacy Systems', 'Third-Party APIs', 'Event Pipelines', 'Database Nodes'],
    outputs: ['Synchronized Event Bus', 'Unified Middleware', 'Live Telemetry Fabric'],
  },
  {
    number: '05',
    title: 'VALIDATE',
    tagline: 'Test functionality, security, and real behavior.',
    description: 'We subject systems to rigorous multi-stage validation protocols under real-world and peak load stress scenarios.',
    details: 'Verifying deterministic execution, zero-regression behavior, edge-case fault-tolerance, and end-to-end security integrity before production release.',
    systemRole: 'Quality assurance and attestation phase proving system resilience prior to live operational deployment.',
    inputs: ['Stress Scenarios', 'Edge-Case Vectors', 'Security Audits', 'Load Models'],
    outputs: ['Validation Attestation', 'Performance Benchmarks', 'Zero-Downtime Deployment'],
  },
  {
    number: '06',
    title: 'EVOLVE',
    tagline: 'Improve, extend, optimize, and scale.',
    description: 'We audit live telemetry, optimize operational yield, and evolve system capabilities as organizational scale expands.',
    details: 'Continuous automated telemetry tracking isolates latency shifts, throughput bottlenecks, and model drift to maintain peak systemic performance.',
    systemRole: 'Continuous adaptation phase ensuring system architecture gracefully absorbs future volume and capability growth.',
    inputs: ['Live Telemetry', 'Operational Metrics', 'System Logs', 'Yield Reports'],
    outputs: ['Autonomous Optimizations', 'Refined System Schemas', 'Sustained Scale'],
  },
];
