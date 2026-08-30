export type LabStatus = 'EXPLORING' | 'IN DEVELOPMENT' | 'PROTOTYPE' | 'CONCEPT';

export interface LabExperiment {
  id: string;
  number: string;
  name: string;
  category: 'Experiments' | 'Prototypes' | 'Concepts' | 'Emerging Platforms';
  status: LabStatus;
  tagline: string;
  description: string;
  technicalThesis: string;
  explorationStage: string;
  tags: string[];
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'autonomous-reconciliation-agent',
    number: 'LAB-01',
    name: 'Self-Healing Financial Ledger Agent',
    category: 'Prototypes',
    status: 'IN DEVELOPMENT',
    tagline: 'Autonomous AI agent monitoring double-entry bookkeeping ledgers for automated anomaly mitigation.',
    description: 'Investigating autonomous background agents capable of auditing multi-gateway banking webhooks, identifying non-matching transaction traces, and drafting correction records for human review.',
    technicalThesis: 'Can localized LLMs with constrained SQL toolchains reduce financial reconciliation audit time by 90% while maintaining 100% deterministic safety?',
    explorationStage: 'Benchmarking deterministic SQL mutation guards against synthetic accounting discrepancy benchmarks.',
    tags: ['AUTONOMOUS AGENTS', 'FINANCIAL LEDGERS', 'ANOMALY MITIGATION'],
  },
  {
    id: 'local-first-mesh-sync',
    number: 'LAB-02',
    name: 'Zero-Cloud Offline State Mesh',
    category: 'Experiments',
    status: 'PROTOTYPE',
    tagline: 'Peer-to-peer CRDT state synchronization across local POS terminals without centralized LAN routers.',
    description: 'Prototyping Conflict-Free Replicated Data Types (CRDTs) over BLE and localized WebRTC mesh networks for zero-infrastructure restaurant and warehouse operations.',
    technicalThesis: 'Evaluating merge latency and partition recovery when 10+ operational handhelds exchange state without internet or local WiFi router dependency.',
    explorationStage: 'Prototype testing with Electron client nodes simulating intermittent packet drop scenarios.',
    tags: ['CRDT', 'LOCAL-FIRST', 'OFFLINE MESH', 'WEBRTC'],
  },
  {
    id: 'contextual-sop-reasoning',
    number: 'LAB-03',
    name: 'Dynamic SOP Reasoning Engine',
    category: 'Concepts',
    status: 'CONCEPT',
    tagline: 'Translating natural language standard operating procedures into executable workflow state machines.',
    description: 'Conceptual architecture for taking company policy PDFs and automatically generating typed BPMN state machines with validation test suites.',
    technicalThesis: 'Validating whether AST compilation techniques combined with LLM semantic parsers can eliminate manual workflow setup for complex operations.',
    explorationStage: 'Theoretical schema mapping and AST grammar definitions.',
    tags: ['SOP TO CODE', 'STATE MACHINES', 'AST COMPILER'],
  },
  {
    id: 'edge-inference-hardware',
    number: 'LAB-04',
    name: 'Sub-10ms Edge Inference Appliance',
    category: 'Emerging Platforms',
    status: 'EXPLORING',
    tagline: 'Hardware micro-appliance running quantized vision and decision models at the operational edge.',
    description: 'Exploring low-power NPU hardware acceleration for real-time kitchen item inspection and physical inventory tracking without cloud streaming bandwidth.',
    technicalThesis: 'Assessing inference yield and thermal stability of 3B parameter quantized models on localized edge appliances.',
    explorationStage: 'Evaluating silicon developer kits and ONNX Runtime NPU execution providers.',
    tags: ['EDGE HARDWARE', 'NPU INFERENCE', 'COMPUTER VISION'],
  },
];
