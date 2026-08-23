export interface SystemLayer {
  id: string;
  title: string;
  category: string;
  positioning: string;
  description: string;
  systemRole: string;
  visual: string;
  focalPoint: string;
  tags: string[];
  vocabulary: string[];
  specs: { label: string; value: string }[];
}

export const SYSTEMS_OVERVIEW = {
  headline: 'ONE CONNECTED INTELLIGENT SYSTEM.',
  eyebrow: 'SYSTEMS ARCHITECTURE & MATRIX',
  subheading: 'Connecting data, software, intelligence, and business operations into a unified technological fabric.',
  narrative: 'We integrate isolated software, data pipelines, operational rules, and executive workflows into one coherent, self-sustaining technological organism.',
  macroFlow: ['DATA', 'INTELLIGENCE', 'BUSINESS LOGIC', 'ORCHESTRATION', 'OPERATIONS', 'OUTCOME'],
  visual: '/visuals/zaqvoro/connected-network.webp',
  focalPoint: 'object-center',
};

export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: 'data-analytics',
    title: 'DATA & ANALYTICS',
    category: 'INTELLIGENCE PIPELINE',
    positioning: 'Transform raw operational telemetry into actionable intelligence and real-time decisions.',
    description: 'High-throughput event ingestion, real-time data streaming, and predictive analytics engines providing continuous operational visibility.',
    systemRole: 'Harvests telemetry across all system nodes to generate structured insights and trigger intelligent operational responses.',
    visual: '/visuals/zaqvoro/data-analytics.webp',
    focalPoint: 'object-center',
    tags: ['DATA', 'INSIGHT', 'TELEMETRY', 'DECIDE', 'OPTIMIZE'],
    vocabulary: ['DATA PIPELINE', 'EVENT STREAMING', 'TELEMETRY', 'PREDICTIVE INFERENCE', 'DECISION MODEL'],
    specs: [
      { label: 'Latency', value: '<12ms Streaming' },
      { label: 'Throughput', value: '100K+ Events/sec' },
      { label: 'Synthesis', value: 'Automated Insight' },
    ],
  },
  {
    id: 'infrastructure',
    title: 'INFRASTRUCTURE',
    category: 'CLOUD FOUNDATION',
    positioning: 'Resilient, edge-distributed cloud and backend engineering built for 99.99% operational uptime.',
    description: 'Containerized microservice clusters, automated failover networks, and edge data routing engineered for zero-latency execution.',
    systemRole: 'Provides the high-performance computing substrate and storage layer that powers all upper software and intelligence modules.',
    visual: '/visuals/zaqvoro/infrastructure.webp',
    focalPoint: 'object-center',
    tags: ['FOUNDATION', 'INFRASTRUCTURE', 'RELIABILITY', 'SCALE', 'PERFORMANCE'],
    vocabulary: ['EDGE INFRASTRUCTURE', 'MICROSERVICE CLUSTER', 'SELF-HEALING NODES', 'ZERO-DOWNTIME', 'SYSTEM SCALABILITY'],
    specs: [
      { label: 'Architecture', value: 'Edge-Distributed' },
      { label: 'Resilience', value: 'Self-Healing Nodes' },
      { label: 'Uptime', value: '99.99% Guaranteed' },
    ],
  },
  {
    id: 'security',
    title: 'SECURITY',
    category: 'SECURITY & INTEGRITY',
    positioning: 'Zero-trust architecture and cryptographic integrity embedded directly into the system fabric.',
    description: 'Cryptographic data verification, strict access control governance, and continuous automated attestation protocols protecting systemic operations.',
    systemRole: 'Enforces security perimeters across all API endpoints, database queries, and system handoffs without reducing execution speed.',
    visual: '/visuals/zaqvoro/security-system.webp',
    focalPoint: 'object-center',
    tags: ['SECURE', 'PROTECT', 'VERIFY', 'TRUST', 'INTEGRITY'],
    vocabulary: ['ZERO-TRUST SECURITY', 'CRYPTOGRAPHIC VERIFICATION', 'ATTESTATION PROTOCOL', 'ACCESS GOVERNANCE', 'SYSTEM INTEGRITY'],
    specs: [
      { label: 'Encryption', value: 'AES-256 / TLS 1.3' },
      { label: 'Access', value: 'Zero-Trust Protocol' },
      { label: 'Auditing', value: 'Continuous Attestation' },
    ],
  },
];
