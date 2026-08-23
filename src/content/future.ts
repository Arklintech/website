export interface FutureCard {
  id: string;
  number: string;
  title: string;
  category: string;
  status: 'AVAILABLE' | 'IN DEVELOPMENT' | 'CONCEPT';
  statusColor: string;
  description: string;
  details: string;
  visual: string;
  focalPoint: string;
  vocabulary: string[];
}

export const FUTURE_CARDS: FutureCard[] = [
  {
    id: 'platform-concepts',
    number: '01',
    title: 'PLATFORM CONCEPTS',
    category: 'PROPRIETARY SYSTEMS',
    status: 'IN DEVELOPMENT',
    statusColor: 'text-z-blue-400 border-z-blue-500/40 bg-z-blue-900/40',
    description: 'Modular software infrastructure designed to solve repetitive system engineering bottlenecks.',
    details: 'Pre-architected system frameworks that provide turnkey data pipelines, multi-tenant authentication, and orchestration engines for rapid enterprise deployment.',
    visual: '/visuals/zaqvoro/platform-cube.webp',
    focalPoint: 'object-center',
    vocabulary: ['BUILD', 'PRODUCTIZE', 'PLATFORM', 'SYSTEM', 'SCALE'],
  },
  {
    id: 'future-vision',
    number: '02',
    title: 'FUTURE VISION',
    category: 'EMERGING ARCHITECTURE',
    status: 'CONCEPT',
    statusColor: 'text-z-amber border-z-amber/40 bg-z-amber-soft/20',
    description: 'Investigating autonomous workflows, distributed state synchronization, and self-orchestrating machine topologies.',
    details: 'Researching decentralized computing primitives where human intent directly translates into distributed autonomous micro-actions.',
    visual: '/visuals/zaqvoro/future-vision.webp',
    focalPoint: 'object-center',
    vocabulary: ['ENVISION', 'EXPLORE', 'INNOVATE', 'DISCOVER', 'FUTURE'],
  },
  {
    id: 'innovation-lab',
    number: '03',
    title: 'INNOVATION LAB',
    category: 'EXPERIMENTAL R&D',
    status: 'AVAILABLE',
    statusColor: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
    description: 'Research. Prototype. Validate. Evolve. Subjecting emergent neural models and protocols to stress testing.',
    details: 'Our dedicated engineering sandbox where experimental intelligence models, cryptographic protocols, and bespoke interfaces are subjected to real-world edge stress.',
    visual: '/visuals/zaqvoro/innovation-lab.webp',
    focalPoint: 'object-center',
    vocabulary: ['EXPLORE', 'EXPERIMENT', 'PROTOTYPE', 'ITERATE', 'DISCOVER'],
  },
];
