'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphericEnvironmentProps {
  progressRef: React.MutableRefObject<number>;
}

export default function AtmosphericEnvironment3D({ progressRef }: AtmosphericEnvironmentProps) {
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const coreLightRef = useRef<THREE.PointLight | null>(null);
  const floorGridRef = useRef<THREE.GridHelper | null>(null);

  useFrame(() => {
    const p = progressRef.current;

    // Core point light grows in intensity as system awakens
    if (coreLightRef.current) {
      const baseIntensity = 1.5 + p * 8.5;
      coreLightRef.current.intensity = baseIntensity;
      coreLightRef.current.color.setHSL(0.58, 0.9, 0.45 + p * 0.2);
    }

    if (dirLightRef.current) {
      dirLightRef.current.intensity = 1.2 + p * 1.8;
    }
  });

  return (
    <>
      {/* Deep Space Fog */}
      <fog attach="fog" args={['#020407', 8, 28]} />

      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.4} color="#062B4A" />
      <directionalLight
        ref={dirLightRef}
        position={[5, 10, 7]}
        intensity={1.8}
        color="#DCE5EE"
        castShadow={false}
      />
      <directionalLight position={[-6, -4, -4]} intensity={0.6} color="#0878C9" />

      {/* Dynamic Central Core Point Light */}
      <pointLight
        ref={coreLightRef}
        position={[0, 0, 0.2]}
        distance={15}
        decay={2}
        color="#149BFF"
      />

      {/* Reflective Industrial Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.8, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#03070D"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Precision Grid Floor Visuals */}
      <gridHelper
        ref={floorGridRef}
        args={[60, 60, '#149BFF', '#1B2A38']}
        position={[0, -2.78, 0]}
      />

      {/* Background Architectural Columns / Panels */}
      {[-8, -4, 4, 8].map((x) => (
        <mesh key={x} position={[x, 0, -6]}>
          <boxGeometry args={[0.6, 12, 0.8]} />
          <meshStandardMaterial
            color="#080F17"
            metalness={0.85}
            roughness={0.4}
            emissive="#03111F"
          />
        </mesh>
      ))}
    </>
  );
}
