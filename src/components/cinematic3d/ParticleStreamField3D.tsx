'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleStreamFieldProps {
  progressRef: React.MutableRefObject<number>;
  count?: number;
}

export default function ParticleStreamField3D({
  progressRef,
  count = 900,
}: ParticleStreamFieldProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  // Generate initial particle coordinates and random velocity vectors
  const [positions, initialData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const data: { radius: number; angle: number; speed: number; ySpeed: number; baseY: number }[] = [];

    for (let i = 0; i < count; i++) {
      const radius = 0.8 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.0;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.4;

      data.push({
        radius,
        angle,
        speed: 0.005 + Math.random() * 0.015,
        ySpeed: (Math.random() - 0.5) * 0.008,
        baseY: y,
      });
    }

    return [pos, data];
  }, [count]);

  const geom = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [positions]);

  useFrame(() => {
    const p = progressRef.current;
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    // Progress drives particle angular velocity and convergence
    const velocityMultiplier = 1.0 + p * 6.0;

    for (let i = 0; i < count; i++) {
      const d = initialData[i];
      d.angle += d.speed * velocityMultiplier;

      // In EXECUTE / CONVERGE, particles converge toward the core
      let currentRadius = d.radius;
      if (p > 0.75) {
        const convergenceFactor = (p - 0.75) / 0.25;
        currentRadius = THREE.MathUtils.lerp(d.radius, 0.4 + Math.sin(i) * 0.5, convergenceFactor);
      }

      array[i * 3] = Math.cos(d.angle) * currentRadius;
      array[i * 3 + 1] = d.baseY + Math.sin(d.angle * 2) * 0.3;
      array[i * 3 + 2] = Math.sin(d.angle) * currentRadius * 0.4;
    }

    posAttr.needsUpdate = true;

    // Color shift based on energy progression
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.size = 0.035 + p * 0.025;
    mat.opacity = 0.4 + p * 0.5;
  });

  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial
        color="#5BC3FF"
        size={0.04}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
