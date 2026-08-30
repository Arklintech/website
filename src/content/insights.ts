export type InsightCategory = 'Articles' | 'Engineering Notes' | 'Research';

export interface InsightArticle {
  id: string;
  title: string;
  slug: string;
  category: InsightCategory;
  publishDate: string;
  readTime: string;
  excerpt: string;
  keyTakeaways: string[];
  tags: string[];
  author: string;
  body: string[];
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'engineering-notes-deterministic-systems',
    slug: 'deterministic-systems-architecture',
    title: 'Architecting Deterministic State Machines for Distributed Commerce',
    category: 'Engineering Notes',
    publishDate: 'AUGUST 2026',
    readTime: '6 MIN READ',
    excerpt: 'Why traditional microservices fail under concurrent inventory contention, and how finite state machines with transactional outboxes guarantee exact-once execution.',
    keyTakeaways: [
      'Eliminating two-phase commit overhead with idempotent event logs',
      'Local-first optimistic state transitions with guaranteed rollback safety',
      'Benchmarking sub-15ms reconciliation across 100k distributed ledger mutations',
    ],
    tags: ['Distributed Systems', 'State Machines', 'Database Architecture'],
    author: 'Principal Systems Architect',
    body: [
      'In high-throughput transactional environments, distributed state desynchronization is the primary cause of inventory anomalies and financial drift.',
      'By decoupling business logic into explicit state transition machines governed by strict contracts, we replace implicit side-effects with verifiable deterministic transitions.',
    ],
  },
  {
    id: 'research-llm-edge-inference',
    slug: 'local-intelligence-edge-decision-latency',
    title: 'Evaluating Sub-50ms Edge AI Inference for Real-Time Kitchen Systems',
    category: 'Research',
    publishDate: 'JULY 2026',
    readTime: '8 MIN READ',
    excerpt: 'A technical benchmark comparing quantized small language models running on local POS edge hardware versus cloud-hosted frontier models for real-time order prioritization.',
    keyTakeaways: [
      'Edge-quantized 3B models achieve 99.2% intent extraction accuracy in noisy kitchen environments',
      'Cloud latency variance (200ms–2500ms) introduces operational bottlenecks during peak dinner rush',
      'Hybrid fallback topology: local edge execution with asynchronous cloud audit aggregation',
    ],
    tags: ['Edge AI', 'Hospitality Tech', 'Performance Benchmarks'],
    author: 'Head of Applied AI',
    body: [
      'Mission-critical operations cannot tolerate internet outages or cloud latency spikes. We conducted extensive benchmarking of local on-premise inference engines.',
      'Our findings show that specialized quantized models running on localized edge nodes deliver deterministic sub-50ms response times while operating completely disconnected from the public internet.',
    ],
  },
  {
    id: 'articles-enterprise-modernization',
    slug: 'strangler-pattern-legacy-modernization',
    title: 'Zero-Downtime Migration: Evolving Legacy Monoliths into Event-Driven Fabric',
    category: 'Articles',
    publishDate: 'JUNE 2026',
    readTime: '5 MIN READ',
    excerpt: 'How to modernize mission-critical legacy enterprise systems incrementally without disrupting active revenue-generating operations.',
    keyTakeaways: [
      'Using change-data-capture (CDC) to mirror production traffic in parallel',
      'Shadow validation pipelines to verify 100% data parity before cutting over',
      'De-risking multi-year ERP migration into 6-week continuous delivery milestones',
    ],
    tags: ['Modernization', 'Event-Driven', 'Enterprise Architecture'],
    author: 'Chief Technology Officer',
    body: [
      'Total system rewrites have a catastrophic failure rate. The most reliable pathway to modern infrastructure is continuous, incremental modernization via strangler architectures.',
      'By intercepting event streams at the database perimeter, we construct new intelligent services alongside existing legacy databases without touching legacy code.',
    ],
  },
];
