'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Cinematic3DCameraProps {
  progressRef: React.MutableRefObject<number>;
  onCameraUpdate?: (fov: number, cameraZ: number) => void;
}

export default function Cinematic3DCamera({
  progressRef,
  onCameraUpdate,
}: Cinematic3DCameraProps) {
  const { camera, size } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const p = progressRef.current;
    const isMobile = size.width < 768;
    const isPortrait = size.height > size.width;

    // Base distance modifier for responsive aspect ratios
    const distanceModifier = isPortrait ? 1.45 : isMobile ? 1.2 : 1.0;

    let targetX = 0;
    let targetY = 0;
    let targetZ = 7.5;
    let targetFov = 45;
    let lookY = 0;

    if (p < 0.125) {
      // DORMANT: Distant, restrained
      const t = p / 0.125;
      targetX = THREE.MathUtils.lerp(0, 0, t);
      targetY = THREE.MathUtils.lerp(0.3, 0.2, t);
      targetZ = THREE.MathUtils.lerp(8.0, 7.5, t);
      targetFov = 45;
      lookY = 0;
    } else if (p < 0.25) {
      // AWAKEN: Dolly into core
      const t = (p - 0.125) / 0.125;
      targetX = THREE.MathUtils.lerp(0, 0, t);
      targetY = THREE.MathUtils.lerp(0.2, 0.05, t);
      targetZ = THREE.MathUtils.lerp(7.5, 6.2, t);
      targetFov = 44;
      lookY = 0;
    } else if (p < 0.375) {
      // UNDERSTAND: Slight orbital perspective to show depth
      const t = (p - 0.25) / 0.125;
      targetX = THREE.MathUtils.lerp(0, 0.45, t);
      targetY = THREE.MathUtils.lerp(0.05, 0.2, t);
      targetZ = THREE.MathUtils.lerp(6.2, 6.4, t);
      targetFov = 45;
      lookY = THREE.MathUtils.lerp(0, 0.05, t);
    } else if (p < 0.5) {
      // CONNECT: Pull back to reveal radiating network
      const t = (p - 0.375) / 0.125;
      targetX = THREE.MathUtils.lerp(0.45, 0, t);
      targetY = THREE.MathUtils.lerp(0.2, 0.0, t);
      targetZ = THREE.MathUtils.lerp(6.4, 8.6, t);
      targetFov = 46;
      lookY = 0;
    } else if (p < 0.625) {
      // ORCHESTRATE: Wide matrix topology
      const t = (p - 0.5) / 0.125;
      targetX = THREE.MathUtils.lerp(0, 0, t);
      targetY = THREE.MathUtils.lerp(0, 0.1, t);
      targetZ = THREE.MathUtils.lerp(8.6, 8.8, t);
      targetFov = 47;
      lookY = 0;
    } else if (p < 0.75) {
      // BUILD: Dynamic structural angle
      const t = (p - 0.625) / 0.125;
      targetX = THREE.MathUtils.lerp(0, -0.35, t);
      targetY = THREE.MathUtils.lerp(0.1, -0.2, t);
      targetZ = THREE.MathUtils.lerp(8.8, 7.4, t);
      targetFov = 46;
      lookY = 0;
    } else if (p < 0.875) {
      // EXECUTE: Low-angle dramatic speed
      const t = (p - 0.75) / 0.125;
      targetX = THREE.MathUtils.lerp(-0.35, 0, t);
      targetY = THREE.MathUtils.lerp(-0.2, -0.4, t);
      targetZ = THREE.MathUtils.lerp(7.4, 6.2, t);
      targetFov = 45;
      lookY = THREE.MathUtils.lerp(0, 0.1, t);
    } else {
      // CONVERGE: Symmetrical final alignment
      const t = (p - 0.875) / 0.125;
      targetX = THREE.MathUtils.lerp(0, 0, t);
      targetY = THREE.MathUtils.lerp(-0.4, 0, t);
      targetZ = THREE.MathUtils.lerp(6.2, 7.2, t);
      targetFov = 45;
      lookY = 0;
    }

    targetPos.current.set(targetX, targetY, targetZ * distanceModifier);
    lookAtTarget.current.set(0, lookY, 0);

    // Direct synchronous application with micro-spring for buttery responsiveness
    camera.position.lerp(targetPos.current, 0.18);
    camera.lookAt(lookAtTarget.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - targetFov) > 0.1) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    }

    if (onCameraUpdate) {
      onCameraUpdate(targetFov, camera.position.z);
    }
  });

  return null;
}
