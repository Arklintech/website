import { CinematicResolvedState, CinematicStateName } from './cinematic-types';

interface StateConfig {
  name: CinematicStateName;
  stageNumber: string;
  headline: string;
  subheadline: string;
  range: [number, number];
  coreStatus: string;
  networkStatus: string;
  systemThroughput: string;
  activeNodes: number;
  mode: string;
  baseEnergy: number;
}

const STATES: StateConfig[] = [
  {
    name: 'DORMANT',
    stageNumber: '01',
    headline: 'INTELLIGENT SYSTEM AT REST',
    subheadline: 'The central ZAQVORO machine is physically stable. Core illumination restrained. Awaiting user-directed activation.',
    range: [0.0, 0.125],
    coreStatus: 'STANDBY // READY',
    networkStatus: 'OFFLINE',
    systemThroughput: '0.00 GB/s',
    activeNodes: 1,
    mode: 'IDLE MACHINE',
    baseEnergy: 10,
  },
  {
    name: 'AWAKEN',
    stageNumber: '02',
    headline: 'CORE ILLUMINATION & PROPAGATION',
    subheadline: 'Internal rings spin with purpose. Blue photonic energy propagates outward through precision mechanical conduits.',
    range: [0.125, 0.25],
    coreStatus: 'ACTIVE // ENERGIZED',
    networkStatus: 'INITIALIZING',
    systemThroughput: '18.40 GB/s',
    activeNodes: 1,
    mode: 'IGNITION SEQUENCE',
    baseEnergy: 28,
  },
  {
    name: 'UNDERSTAND',
    stageNumber: '03',
    headline: 'DATA → KNOWLEDGE → INTELLIGENCE',
    subheadline: 'Directional event streams emerge from the central core. Telemetry signals synthesize into contextual domain logic.',
    range: [0.25, 0.375],
    coreStatus: 'PROCESSING INTELLIGENCE',
    networkStatus: 'SYNTHESIS ACTIVE',
    systemThroughput: '64.20 GB/s',
    activeNodes: 1,
    mode: 'DEEP COGNITION',
    baseEnergy: 45,
  },
  {
    name: 'CONNECT',
    stageNumber: '04',
    headline: 'SYSTEM ELEMENT RELEASE & TOPOLOGY FORMATION',
    subheadline: 'All 12 subsystem nodes release from the central machine, travel to their exact coordinates, and establish the connected network.',
    range: [0.375, 0.5],
    coreStatus: 'CORE HUB LOCKED',
    networkStatus: 'TOPOLOGY LOCKED',
    systemThroughput: '240.50 GB/s',
    activeNodes: 12,
    mode: 'NETWORK COMPLETE',
    baseEnergy: 62,
  },
  {
    name: 'ORCHESTRATE',
    stageNumber: '05',
    headline: 'COORDINATED MULTI-SYSTEM OPERATION',
    subheadline: 'High-frequency data pulses travel across active vector pathways. Workflows synchronize across distributed subsystems.',
    range: [0.5, 0.625],
    coreStatus: 'ORCHESTRATING',
    networkStatus: 'SYNCHRONIZED',
    systemThroughput: '580.00 GB/s',
    activeNodes: 12,
    mode: 'EVENT-DRIVEN FLOW',
    baseEnergy: 75,
  },
  {
    name: 'BUILD',
    stageNumber: '06',
    headline: 'ENGINEERED PLATFORM EXPANSION',
    subheadline: 'The connected architecture evolves into structural software, microservices, databases, and operational infrastructure.',
    range: [0.625, 0.75],
    coreStatus: 'PLATFORM DEPLOYED',
    networkStatus: 'INFRASTRUCTURE SCALED',
    systemThroughput: '940.00 GB/s',
    activeNodes: 12,
    mode: 'STRUCTURAL SYNTHESIS',
    baseEnergy: 88,
  },
  {
    name: 'EXECUTE',
    stageNumber: '07',
    headline: 'SYSTEM → OPERATION → OUTCOME',
    subheadline: 'Maximum operational throughput. Enterprise transactions, automated workflows, and verified yields execute in real time.',
    range: [0.75, 0.875],
    coreStatus: 'MAXIMUM YIELD',
    networkStatus: 'FULL PRODUCTION',
    systemThroughput: '1.85 TB/s',
    activeNodes: 12,
    mode: 'LIVE RUNTIME',
    baseEnergy: 96,
  },
  {
    name: 'CONVERGE',
    stageNumber: '08',
    headline: 'SYSTEM CONTINUITY & CONVERGENCE',
    subheadline: 'The operational machine resolves into the permanent platform matrix. One continuous journey across all disciplines.',
    range: [0.875, 1.0],
    coreStatus: 'CONVERGED MATRIX',
    networkStatus: 'CONNECTED ENTERPRISE',
    systemThroughput: '2.40 TB/s',
    activeNodes: 12,
    mode: 'PERMANENT ARCHITECTURE',
    baseEnergy: 100,
  },
];

/**
 * Deterministically resolves cinematic state from progress (0 to 1)
 */
export function resolveCinematicState(progress: number, totalFrames: number = 240): CinematicResolvedState {
  const clampedProgress = Math.min(1, Math.max(0, progress));
  
  // Find state index
  let stateIndex = Math.floor(clampedProgress * 8);
  if (stateIndex >= 8) stateIndex = 7;
  
  const cfg = STATES[stateIndex];
  
  // Calculate deterministic frame index
  const frameIndex = Math.min(
    totalFrames - 1,
    Math.max(0, Math.round(clampedProgress * (totalFrames - 1)))
  );

  // Smooth derived energy level
  const energyLevel = Math.round(cfg.baseEnergy + (clampedProgress * 15));

  return {
    progress: clampedProgress,
    stateIndex,
    name: cfg.name,
    stageNumber: cfg.stageNumber,
    headline: cfg.headline,
    subheadline: cfg.subheadline,
    telemetry: {
      coreStatus: cfg.coreStatus,
      networkStatus: cfg.networkStatus,
      systemThroughput: cfg.systemThroughput,
      activeNodes: cfg.activeNodes,
      mode: cfg.mode,
      energyLevel: Math.min(100, energyLevel),
    },
    frameIndex,
  };
}
