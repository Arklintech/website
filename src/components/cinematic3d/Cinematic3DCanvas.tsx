'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Cinematic3DCamera from './Cinematic3DCamera';
import AtmosphericEnvironment3D from './AtmosphericEnvironment3D';
import LivingMachineCore3D from './LivingMachineCore3D';
import SpatialNetwork3D from './SpatialNetwork3D';
import ParticleStreamField3D from './ParticleStreamField3D';
import Cinematic3DDiagnosticsHUD from './Cinematic3DDiagnosticsHUD';
import { Cinematic3DStateName, DeviceTier, Diagnostics3DMetrics } from './Cinematic3DTypes';

interface Cinematic3DCanvasProps {
  progressRef: React.MutableRefObject<number>;
}

export default function Cinematic3DCanvas({ progressRef }: Cinematic3DCanvasProps) {
  const [deviceTier, setDeviceTier] = useState<DeviceTier>('DESKTOP');
  const [dpr, setDpr] = useState<number>(1);
  const [metrics, setMetrics] = useState<Diagnostics3DMetrics>({
    progress: 0,
    stateName: 'DORMANT',
    fps: 60,
    drawCalls: 38,
    triangles: 42000,
    dpr: 1,
    fov: 45,
    cameraZ: 7.5,
    particleCount: 900,
    deviceTier: 'DESKTOP',
  });

  const lastTimeRef = useRef(performance.now());
  const framesRef = useRef(0);
  const fpsRef = useRef(60);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateDeviceMetrics = () => {
      const w = window.innerWidth;
      const rawDpr = window.devicePixelRatio || 1;

      let tier: DeviceTier = 'DESKTOP';
      let maxDpr = 2.0;

      if (w >= 2560) {
        tier = 'ULTRA_WIDE';
        maxDpr = 2.0;
      } else if (w >= 1440) {
        tier = 'DESKTOP';
        maxDpr = 2.0;
      } else if (w >= 1024) {
        tier = 'LAPTOP';
        maxDpr = 1.75;
      } else if (w >= 768) {
        tier = 'TABLET';
        maxDpr = 1.5;
      } else {
        tier = 'MOBILE';
        maxDpr = 1.5;
      }

      const boundedDpr = Math.min(rawDpr, maxDpr);
      setDeviceTier(tier);
      setDpr(boundedDpr);
    };

    updateDeviceMetrics();
    window.addEventListener('resize', updateDeviceMetrics);
    return () => window.removeEventListener('resize', updateDeviceMetrics);
  }, []);

  const handleCameraUpdate = (fov: number, cameraZ: number) => {
    // Measure FPS
    const now = performance.now();
    framesRef.current++;
    if (now - lastTimeRef.current >= 500) {
      fpsRef.current = Math.round((framesRef.current * 1000) / (now - lastTimeRef.current));
      framesRef.current = 0;
      lastTimeRef.current = now;
    }

    const p = progressRef.current;
    let stateName: Cinematic3DStateName = 'DORMANT';
    if (p < 0.125) stateName = 'DORMANT';
    else if (p < 0.25) stateName = 'AWAKEN';
    else if (p < 0.375) stateName = 'UNDERSTAND';
    else if (p < 0.5) stateName = 'CONNECT';
    else if (p < 0.625) stateName = 'ORCHESTRATE';
    else if (p < 0.75) stateName = 'BUILD';
    else if (p < 0.875) stateName = 'EXECUTE';
    else stateName = 'CONVERGE';

    setMetrics((prev) => ({
      ...prev,
      progress: p,
      stateName,
      fps: fpsRef.current,
      fov,
      cameraZ,
      dpr,
      deviceTier,
    }));
  };

  return (
    <div className="relative w-full h-full bg-z-black select-none">
      <Canvas
        camera={{ position: [0, 0.3, 7.5], fov: 45, near: 0.1, far: 50 }}
        dpr={dpr}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full"
      >
        {/* Dynamic Atmospheric Depth & Lighting */}
        <AtmosphericEnvironment3D progressRef={progressRef} />

        {/* Progress-Driven Cinematic 3D Camera */}
        <Cinematic3DCamera
          progressRef={progressRef}
          onCameraUpdate={handleCameraUpdate}
        />

        {/* Main 3D Mechanical Living Machine Core */}
        <LivingMachineCore3D progressRef={progressRef} />

        {/* 12 Spatial Subsystem Nodes & Vector Connection Lines */}
        <SpatialNetwork3D progressRef={progressRef} />

        {/* GPU Particle Activity Field */}
        <ParticleStreamField3D progressRef={progressRef} count={deviceTier === 'MOBILE' ? 450 : 900} />
      </Canvas>

      {/* Development Diagnostics HUD */}
      <Cinematic3DDiagnosticsHUD metrics={metrics} />
    </div>
  );
}
