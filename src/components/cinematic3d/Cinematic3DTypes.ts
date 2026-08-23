export type Cinematic3DStateName =
  | 'DORMANT'
  | 'AWAKEN'
  | 'UNDERSTAND'
  | 'CONNECT'
  | 'ORCHESTRATE'
  | 'BUILD'
  | 'EXECUTE'
  | 'CONVERGE';

export interface Cinematic3DTelemetry {
  coreStatus: string;
  networkStatus: string;
  systemThroughput: string;
  activeNodes: number;
  mode: string;
  energyIntensity: number; // 0 to 1
  ringSpeed: number;
  laserIntensity: number;
}

export interface Cinematic3DResolvedState {
  progress: number;
  stateIndex: number;
  name: Cinematic3DStateName;
  stageNumber: string;
  headline: string;
  subheadline: string;
  telemetry: Cinematic3DTelemetry;
}

export type DeviceTier = 'ULTRA_WIDE' | 'DESKTOP' | 'LAPTOP' | 'TABLET' | 'MOBILE';

export interface Diagnostics3DMetrics {
  progress: number;
  stateName: Cinematic3DStateName;
  fps: number;
  drawCalls: number;
  triangles: number;
  dpr: number;
  fov: number;
  cameraZ: number;
  particleCount: number;
  deviceTier: DeviceTier;
}
