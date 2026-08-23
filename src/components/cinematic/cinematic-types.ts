export type CinematicStateName =
  | 'DORMANT'
  | 'AWAKEN'
  | 'UNDERSTAND'
  | 'CONNECT'
  | 'ORCHESTRATE'
  | 'BUILD'
  | 'EXECUTE'
  | 'CONVERGE';

export interface CinematicTelemetry {
  coreStatus: string;
  networkStatus: string;
  systemThroughput: string;
  activeNodes: number;
  mode: string;
  energyLevel: number; // 0 to 100
}

export interface CinematicResolvedState {
  progress: number;
  stateIndex: number;
  name: CinematicStateName;
  stageNumber: string;
  headline: string;
  subheadline: string;
  telemetry: CinematicTelemetry;
  frameIndex: number;
}

export type DeviceMode =
  | 'ULTRA_WIDE'
  | 'DESKTOP'
  | 'LAPTOP'
  | 'TABLET'
  | 'MOBILE'
  | 'COMPACT_MOBILE';

export interface FocalPoint {
  x: number; // normalized 0 to 1
  y: number; // normalized 0 to 1
}

export interface ResponsiveComposition {
  deviceMode: DeviceMode;
  dpr: number;
  focalPoint: FocalPoint;
  safeMarginTop: number;
  safeMarginBottom: number;
  scaleModifier: number;
  maxDpr: number;
}

export interface CinematicDiagnosticsData {
  scrollProgress: number;
  masterProgress: number;
  requestedFrame: number;
  renderedFrame: number;
  delta: number;
  stateName: CinematicStateName;
  frameIndex: number;
  totalFrames: number;
  fps: number;
  direction: 'DOWN' | 'UP' | 'HOLD';
  velocity: number;
  canvasWidth: number;
  canvasHeight: number;
  dpr: number;
  deviceMode: DeviceMode;
  cachedFrameCount: number;
  isLagging: boolean;
  frameDecodeTimeMs: number;
  frameRenderTimeMs: number;
  cacheHits: number;
  cacheMisses: number;
  scrollHeightVh: number;
}
