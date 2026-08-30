export interface CinematicStage {
  id: string;
  number: string;
  name: string;
  range: [number, number];
  headline: string;
  subheadline: string;
  telemetry: {
    coreStatus: string;
    networkStatus: string;
    systemThroughput: string;
    activeNodes: number;
    mode: string;
  };
}

export interface CinematicNode {
  id: string;
  name: string;
  category: string;
  number: string;
  iconType: 'code' | 'cloud' | 'z' | 'database' | 'shield' | 'chart' | 'network' | 'gear';
  // Exact normalized coordinates matching connected-network.png [-1 to 1]
  desktopPos: { x: number; y: number };
  tabletPos: { x: number; y: number };
  mobilePos: { x: number; y: number };
  primaryTarget: string;
  secondaryTargets: string[];
  releaseOrder: number; // Staggered release from core during CONNECT (0.375 → 0.50)
}

export const CINEMATIC_STAGES: CinematicStage[] = [
  {
    id: 'dormant',
    number: '01',
    name: 'DORMANT',
    range: [0.000, 0.125],
    headline: 'INTELLIGENT SYSTEM AT REST',
    subheadline: 'The central ARKLINTECH machine is physically stable. Core illumination restrained. Awaiting user-directed activation.',
    telemetry: {
      coreStatus: 'STANDBY // READY',
      networkStatus: 'OFFLINE',
      systemThroughput: '0.00 GB/s',
      activeNodes: 1,
      mode: 'IDLE MACHINE',
    },
  },
  {
    id: 'awaken',
    number: '02',
    name: 'AWAKEN',
    range: [0.125, 0.250],
    headline: 'CORE ILLUMINATION & PROPAGATION',
    subheadline: 'Internal rings spin with purpose. Blue photonic energy propagates outward through precision mechanical conduits.',
    telemetry: {
      coreStatus: 'ACTIVE // ENERGIZED',
      networkStatus: 'INITIALIZING',
      systemThroughput: '18.40 GB/s',
      activeNodes: 1,
      mode: 'IGNITION SEQUENCE',
    },
  },
  {
    id: 'understand',
    number: '03',
    name: 'UNDERSTAND',
    range: [0.250, 0.375],
    headline: 'DATA → KNOWLEDGE → INTELLIGENCE',
    subheadline: 'Directional event streams emerge from the central core. Telemetry signals synthesize into contextual domain logic.',
    telemetry: {
      coreStatus: 'PROCESSING INTELLIGENCE',
      networkStatus: 'SYNTHESIS ACTIVE',
      systemThroughput: '64.20 GB/s',
      activeNodes: 1,
      mode: 'DEEP COGNITION',
    },
  },
  {
    id: 'connect',
    number: '04',
    name: 'CONNECT',
    range: [0.375, 0.500],
    headline: 'SYSTEM ELEMENT RELEASE & TOPOLOGY FORMATION',
    subheadline: 'All 12 subsystem nodes release from the central machine, travel to their exact coordinates, and establish the connected network.',
    telemetry: {
      coreStatus: 'CORE HUB LOCKED',
      networkStatus: 'TOPOLOGY LOCKED',
      systemThroughput: '240.50 GB/s',
      activeNodes: 12,
      mode: 'NETWORK COMPLETE',
    },
  },
  {
    id: 'orchestrate',
    number: '05',
    name: 'ORCHESTRATE',
    range: [0.500, 0.625],
    headline: 'COORDINATED MULTI-SYSTEM OPERATION',
    subheadline: 'High-frequency data pulses travel across active vector pathways. Workflows synchronize across distributed subsystems.',
    telemetry: {
      coreStatus: 'ORCHESTRATING',
      networkStatus: 'SYNCHRONIZED',
      systemThroughput: '580.00 GB/s',
      activeNodes: 12,
      mode: 'EVENT-DRIVEN FLOW',
    },
  },
  {
    id: 'build',
    number: '06',
    name: 'BUILD',
    range: [0.625, 0.750],
    headline: 'ENGINEERED PLATFORM EXPANSION',
    subheadline: 'The connected architecture evolves into structural software, microservices, databases, and operational infrastructure.',
    telemetry: {
      coreStatus: 'PLATFORM DEPLOYED',
      networkStatus: 'INFRASTRUCTURE SCALED',
      systemThroughput: '940.00 GB/s',
      activeNodes: 12,
      mode: 'STRUCTURAL SYNTHESIS',
    },
  },
  {
    id: 'execute',
    number: '07',
    name: 'EXECUTE',
    range: [0.750, 0.875],
    headline: 'SYSTEM → OPERATION → OUTCOME',
    subheadline: 'Maximum operational throughput. Enterprise transactions, automated workflows, and verified yields execute in real time.',
    telemetry: {
      coreStatus: 'MAXIMUM YIELD',
      networkStatus: 'FULL PRODUCTION',
      systemThroughput: '1.85 TB/s',
      activeNodes: 12,
      mode: 'LIVE RUNTIME',
    },
  },
  {
    id: 'converge',
    number: '08',
    name: 'CONVERGE',
    range: [0.875, 1.000],
    headline: 'SYSTEM CONTINUITY & CONVERGENCE',
    subheadline: 'The operational machine resolves into the permanent platform matrix. One continuous journey across all disciplines.',
    telemetry: {
      coreStatus: 'CONVERGED MATRIX',
      networkStatus: 'CONNECTED ENTERPRISE',
      systemThroughput: '2.40 TB/s',
      activeNodes: 12,
      mode: 'PERMANENT ARCHITECTURE',
    },
  },
];

// EXACT 12 SYSTEM NODES AS SPECIFIED IN SOURCE A (connected-network.png)
export const CINEMATIC_NODES: CinematicNode[] = [
  {
    id: 'node-apis',
    name: 'APIS',
    category: 'INTERFACE PROTOCOL',
    number: '01',
    iconType: 'code',
    desktopPos: { x: -0.38, y: -0.38 },
    tabletPos: { x: -0.36, y: -0.36 },
    mobilePos: { x: -0.34, y: -0.36 },
    primaryTarget: 'core',
    secondaryTargets: ['node-apps', 'node-cloud'],
    releaseOrder: 0,
  },
  {
    id: 'node-cloud',
    name: 'CLOUD SERVICES',
    category: 'CLOUD FABRIC',
    number: '02',
    iconType: 'cloud',
    desktopPos: { x: -0.08, y: -0.44 },
    tabletPos: { x: -0.08, y: -0.42 },
    mobilePos: { x: -0.10, y: -0.40 },
    primaryTarget: 'core',
    secondaryTargets: ['node-apis', 'node-microservices'],
    releaseOrder: 1,
  },
  {
    id: 'node-microservices',
    name: 'MICROSERVICES',
    category: 'DISTRIBUTED COMPUTE',
    number: '03',
    iconType: 'z',
    desktopPos: { x: 0.30, y: -0.42 },
    tabletPos: { x: 0.28, y: -0.40 },
    mobilePos: { x: 0.26, y: -0.38 },
    primaryTarget: 'core',
    secondaryTargets: ['node-cloud', 'node-automation'],
    releaseOrder: 2,
  },
  {
    id: 'node-apps',
    name: 'APPLICATIONS',
    category: 'CLIENT PLATFORMS',
    number: '04',
    iconType: 'z',
    desktopPos: { x: -0.46, y: -0.20 },
    tabletPos: { x: -0.44, y: -0.20 },
    mobilePos: { x: -0.40, y: -0.20 },
    primaryTarget: 'core',
    secondaryTargets: ['node-apis', 'node-databases'],
    releaseOrder: 3,
  },
  {
    id: 'node-automation',
    name: 'AUTOMATION',
    category: 'ORCHESTRATION ENGINE',
    number: '05',
    iconType: 'gear',
    desktopPos: { x: 0.46, y: -0.22 },
    tabletPos: { x: 0.42, y: -0.22 },
    mobilePos: { x: 0.38, y: -0.20 },
    primaryTarget: 'core',
    secondaryTargets: ['node-microservices', 'node-streams', 'node-partners'],
    releaseOrder: 4,
  },
  {
    id: 'node-databases',
    name: 'DATABASES',
    category: 'PERSISTENCE ENGINE',
    number: '06',
    iconType: 'database',
    desktopPos: { x: -0.48, y: 0.04 },
    tabletPos: { x: -0.44, y: 0.04 },
    mobilePos: { x: -0.40, y: 0.04 },
    primaryTarget: 'core',
    secondaryTargets: ['node-apps', 'node-third-party'],
    releaseOrder: 5,
  },
  {
    id: 'node-streams',
    name: 'DATA STREAMS',
    category: 'EVENT PIPELINE',
    number: '07',
    iconType: 'database',
    desktopPos: { x: 0.36, y: 0.02 },
    tabletPos: { x: 0.34, y: 0.02 },
    mobilePos: { x: 0.30, y: 0.02 },
    primaryTarget: 'core',
    secondaryTargets: ['node-automation', 'node-analytics', 'node-partners'],
    releaseOrder: 6,
  },
  {
    id: 'node-partners',
    name: 'PARTNERS',
    category: 'ECOSYSTEM NETWORK',
    number: '08',
    iconType: 'z',
    desktopPos: { x: 0.52, y: 0.06 },
    tabletPos: { x: 0.48, y: 0.06 },
    mobilePos: { x: 0.44, y: 0.06 },
    primaryTarget: 'core',
    secondaryTargets: ['node-automation', 'node-streams'],
    releaseOrder: 7,
  },
  {
    id: 'node-third-party',
    name: 'THIRD-PARTY SERVICES',
    category: 'INTEGRATED SERVICES',
    number: '09',
    iconType: 'z',
    desktopPos: { x: -0.34, y: 0.28 },
    tabletPos: { x: -0.32, y: 0.26 },
    mobilePos: { x: -0.28, y: 0.24 },
    primaryTarget: 'core',
    secondaryTargets: ['node-databases', 'node-security'],
    releaseOrder: 8,
  },
  {
    id: 'node-security',
    name: 'SECURITY',
    category: 'PROTECTION SHIELD',
    number: '10',
    iconType: 'shield',
    desktopPos: { x: -0.18, y: 0.44 },
    tabletPos: { x: -0.18, y: 0.40 },
    mobilePos: { x: -0.16, y: 0.36 },
    primaryTarget: 'core',
    secondaryTargets: ['node-third-party', 'node-integrations'],
    releaseOrder: 9,
  },
  {
    id: 'node-integrations',
    name: 'INTEGRATIONS',
    category: 'MESH ADAPTER',
    number: '11',
    iconType: 'network',
    desktopPos: { x: 0.18, y: 0.42 },
    tabletPos: { x: 0.18, y: 0.38 },
    mobilePos: { x: 0.16, y: 0.36 },
    primaryTarget: 'core',
    secondaryTargets: ['node-security', 'node-analytics'],
    releaseOrder: 10,
  },
  {
    id: 'node-analytics',
    name: 'ANALYTICS',
    category: 'INTELLIGENCE METRICS',
    number: '12',
    iconType: 'chart',
    desktopPos: { x: 0.32, y: 0.32 },
    tabletPos: { x: 0.30, y: 0.28 },
    mobilePos: { x: 0.26, y: 0.26 },
    primaryTarget: 'core',
    secondaryTargets: ['node-integrations', 'node-streams'],
    releaseOrder: 11,
  },
];
