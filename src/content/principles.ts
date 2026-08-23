export interface Principle {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  details: string;
  systemImpact: string;
  icon: string;
}

export const HUMAN_TECH_STATEMENT = {
  title: 'HUMAN + TECHNOLOGY',
  category: 'PHILOSOPHY & FOUNDATION',
  headline: 'We combine human intelligence with advanced technology to create systems that empower people, not replace them.',
  narrative: 'Maximum systemic leverage is achieved when intelligent software absorbs repetitive operational friction, liberating human command to focus on high-value strategic execution.',
  visual: '/visuals/zaqvoro/human-technology.webp',
  focalPoint: 'object-center md:object-right',
  vocabulary: ['HUMAN COMMAND', 'SYSTEMIC LEVERAGE', 'AUGMENTED INTELLIGENCE', 'EMPOWERMENT', 'OPERATIONAL FREEDOM'],
};

export const PRINCIPLES: Principle[] = [
  {
    id: 'system-first',
    number: '01',
    title: 'SYSTEM-FIRST',
    tagline: 'We think in systems, not isolated features.',
    description: 'Every software component, data schema, and workflow is engineered as an interconnected node within a broader architecture.',
    details: 'Isolated features introduce technical debt and operational silos. Coherent systems compound leverage and accelerate organizational velocity.',
    systemImpact: 'Eliminates fragmented codebases and ensures all software components share unified data models and execution boundaries.',
    icon: 'Network',
  },
  {
    id: 'engineering-excellence',
    number: '02',
    title: 'ENGINEERING EXCELLENCE',
    tagline: 'We build with precision, discipline, and quality.',
    description: 'We engineer for zero-compromise reliability, strict performance budgets, type safety, and hardened operational integrity.',
    details: 'Disciplined software engineering guarantees deterministic execution, zero-regression deployments, and sub-millisecond data throughput.',
    systemImpact: 'Guarantees 99.99% system uptime, resilient fault tolerance, and sub-second execution across all operational modules.',
    icon: 'Cpu',
  },
  {
    id: 'outcome-driven',
    number: '03',
    title: 'OUTCOME DRIVEN',
    tagline: 'Technology exists to produce measurable outcomes.',
    description: 'We engineer systems to solve tangible operational bottlenecks and generate clear, verifiable business impact.',
    details: 'Technology is never valuable simply because it is complex; its value lies in eliminating friction, accelerating speed, and securing control.',
    systemImpact: 'Directly links software execution to operational speed, reduced costs, and measurable throughput improvements.',
    icon: 'Target',
  },
  {
    id: 'long-term-thinking',
    number: '04',
    title: 'LONG-TERM THINKING',
    tagline: 'We build architectures designed to evolve.',
    description: 'Architectures engineered not merely for current constraints, but structured to gracefully absorb future scale and new technologies.',
    details: 'Modular decoupling, strict contract-driven APIs, and isolated service perimeters ensure systems scale without requiring total rewrites.',
    systemImpact: 'Protects technical investment and ensures systems can scale reliably across years of organizational growth.',
    icon: 'ShieldCheck',
  },
];
