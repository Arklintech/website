'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LivingMachineCoreProps {
  progressRef: React.MutableRefObject<number>;
}

export default function LivingMachineCore3D({ progressRef }: LivingMachineCoreProps) {
  const outerRingRef = useRef<THREE.Group | null>(null);
  const middleRing1Ref = useRef<THREE.Group | null>(null);
  const middleRing2Ref = useRef<THREE.Group | null>(null);
  const innerRingRef = useRef<THREE.Group | null>(null);
  const zEmblemRef = useRef<THREE.Mesh | null>(null);
  const laserBeamsRef = useRef<THREE.Group | null>(null);
  const coreGlowRef = useRef<THREE.Mesh | null>(null);

  // Construct 3D Z Emblem Geometry
  const zShapeGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Precision geometric 3D Z profile
    const w = 0.55;
    const h = 0.65;
    const th = 0.14;

    shape.moveTo(-w, h);
    shape.lineTo(w, h);
    shape.lineTo(w, h - th);
    shape.lineTo(-w * 0.35, -h + th);
    shape.lineTo(w, -h + th);
    shape.lineTo(w, -h);
    shape.lineTo(-w, -h);
    shape.lineTo(-w, -h + th);
    shape.lineTo(w * 0.35, h - th);
    shape.lineTo(-w, h - th);
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Construct Outer Ring Gear Teeth (16 radial teeth)
  const gearTeeth = useMemo(() => {
    const teeth = [];
    const radius = 2.45;
    const count = 16;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      teeth.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: angle,
      });
    }
    return teeth;
  }, []);

  // Construct Optical Node Dots on Middle Ring (24 nodes)
  const ringNodes = useMemo(() => {
    const nodes = [];
    const radius = 1.75;
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      nodes.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        isAmber: i % 4 === 0,
      });
    }
    return nodes;
  }, []);

  useFrame(() => {
    const p = progressRef.current;

    // 1. Outer heavy gear ring rotates clockwise
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = p * Math.PI * 3.5;
    }

    // 2. Middle ring 1 rotates counter-clockwise
    if (middleRing1Ref.current) {
      middleRing1Ref.current.rotation.z = -p * Math.PI * 5.0;
    }

    // 3. Middle ring 2 rotates clockwise
    if (middleRing2Ref.current) {
      middleRing2Ref.current.rotation.z = p * Math.PI * 4.2;
    }

    // 4. Inner aperture ring rotates counter-clockwise
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -p * Math.PI * 6.0;
    }

    // 5. Central Z Emblem pulse & emissive brightness
    if (zEmblemRef.current) {
      const mat = zEmblemRef.current.material as THREE.MeshStandardMaterial;
      const energyPulse = 0.4 + p * 2.2;
      mat.emissiveIntensity = energyPulse;

      // Subtle breathing scale
      const scale = 1.0 + Math.sin(p * Math.PI * 4) * 0.03;
      zEmblemRef.current.scale.set(scale, scale, scale);
    }

    // 6. Core glow halo scale & opacity
    if (coreGlowRef.current) {
      const glowScale = 1.0 + p * 1.5;
      coreGlowRef.current.scale.set(glowScale, glowScale, 1);
      const mat = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + p * 0.45;
    }

    // 7. Photonic laser emitters extension
    if (laserBeamsRef.current) {
      const beamScale = Math.max(0.01, (p - 0.1) * 1.8);
      laserBeamsRef.current.scale.set(beamScale, beamScale, beamScale);
      laserBeamsRef.current.rotation.z = p * Math.PI * 2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* =========================================================
          LAYER 01: OUTER HEAVY GEAR RING (PBR GUNMETAL)
          ========================================================= */}
      <group ref={outerRingRef}>
        {/* Main Outer Torus */}
        <mesh position={[0, 0, -0.1]}>
          <torusGeometry args={[2.35, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#151D27"
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>

        {/* Outer Flange Rim */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[2.55, 0.04, 12, 64]} />
          <meshStandardMaterial
            color="#2A4055"
            metalness={0.88}
            roughness={0.3}
          />
        </mesh>

        {/* 16 Radial Gear Teeth */}
        {gearTeeth.map((tooth, idx) => (
          <mesh
            key={idx}
            position={[tooth.x, tooth.y, -0.08]}
            rotation={[0, 0, tooth.rotation]}
          >
            <boxGeometry args={[0.22, 0.1, 0.14]} />
            <meshStandardMaterial
              color="#1B2A38"
              metalness={0.95}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          LAYER 02: MIDDLE COUNTER-ROTATING TRACK RING 1
          ========================================================= */}
      <group ref={middleRing1Ref}>
        <mesh position={[0, 0, 0.0]}>
          <torusGeometry args={[1.75, 0.06, 16, 64]} />
          <meshStandardMaterial
            color="#0878C9"
            emissive="#03111F"
            emissiveIntensity={0.8}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>

        {/* 24 Optical Nodes on the Ring */}
        {ringNodes.map((node, idx) => (
          <mesh key={idx} position={[node.x, node.y, 0.05]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial
              color={node.isAmber ? '#F59A23' : '#5BC3FF'}
            />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          LAYER 03: MIDDLE TRACK RING 2 (CONCENTRIC AMBER CONDUITS)
          ========================================================= */}
      <group ref={middleRing2Ref}>
        <mesh position={[0, 0, 0.05]}>
          <torusGeometry args={[1.35, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#2A4055"
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Dashed Indicator Rings */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((rot, idx) => (
          <mesh key={idx} position={[0, 0, 0.07]} rotation={[0, 0, rot]}>
            <ringGeometry args={[1.32, 1.38, 16, 1, 0, Math.PI / 4]} />
            <meshBasicMaterial color="#F59A23" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>

      {/* =========================================================
          LAYER 04: INNER APERTURE CHAMBER
          ========================================================= */}
      <group ref={innerRingRef}>
        <mesh position={[0, 0, 0.08]}>
          <torusGeometry args={[0.95, 0.05, 16, 48]} />
          <meshStandardMaterial
            color="#062B4A"
            emissive="#149BFF"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Deep Core Aperture Disc */}
        <mesh position={[0, 0, -0.15]}>
          <cylinderGeometry args={[0.85, 0.85, 0.1, 32]} />
          <meshStandardMaterial
            color="#020407"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* =========================================================
          LAYER 05: CENTRAL 3D Z EMBLEM (WITH BACK-LIT CYAN GLOW)
          ========================================================= */}
      <mesh ref={zEmblemRef} geometry={zShapeGeometry} position={[0, 0, 0.12]}>
        <meshStandardMaterial
          color="#F5F8FC"
          emissive="#149BFF"
          emissiveIntensity={0.8}
          metalness={0.96}
          roughness={0.12}
        />
      </mesh>

      {/* Core Halo Backlight */}
      <mesh ref={coreGlowRef} position={[0, 0, 0.02]}>
        <circleGeometry args={[1.1, 32]} />
        <meshBasicMaterial
          color="#149BFF"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* =========================================================
          LAYER 06: 8 RADIAL PHOTONIC LASER EMITTERS
          ========================================================= */}
      <group ref={laserBeamsRef}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={deg}
              position={[Math.cos(rad) * 2.8, Math.sin(rad) * 2.8, 0]}
              rotation={[0, 0, rad + Math.PI / 2]}
            >
              <cylinderGeometry args={[0.015, 0.015, 2.2, 8]} />
              <meshBasicMaterial
                color="#5BC3FF"
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
