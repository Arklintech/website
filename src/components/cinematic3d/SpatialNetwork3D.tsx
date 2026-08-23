'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { CINEMATIC_NODES, CinematicNode } from '@/content/cinematic';

interface SpatialNetwork3DProps {
  progressRef: React.MutableRefObject<number>;
}

export default function SpatialNetwork3D({ progressRef }: SpatialNetwork3DProps) {
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const connectionsRef = useRef<THREE.LineSegments | null>(null);
  const pulsesRef = useRef<THREE.InstancedMesh | null>(null);

  // Map 12 nodes with 3D target coordinates
  const nodeSpatialData = useMemo(() => {
    return CINEMATIC_NODES.map((node, idx) => {
      // Convert normalized 2D desktop pos to 3D spatial pos
      const targetX = node.desktopPos.x * 9.5;
      const targetY = -node.desktopPos.y * 7.5;
      const targetZ = (idx % 3 - 1) * 0.4;

      return {
        ...node,
        targetPos: new THREE.Vector3(targetX, targetY, targetZ),
        originPos: new THREE.Vector3(0, 0, 0),
        currentPos: new THREE.Vector3(0, 0, 0),
      };
    });
  }, []);

  // Pre-calculate line connections between nodes and core
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    nodeSpatialData.forEach((node) => {
      // Core to Node
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(node.targetPos.clone());

      // Secondary targets
      node.secondaryTargets.forEach((secId) => {
        const secNode = nodeSpatialData.find((n) => n.id === secId);
        if (secNode) {
          points.push(node.targetPos.clone());
          points.push(secNode.targetPos.clone());
        }
      });
    });

    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [nodeSpatialData]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const p = progressRef.current;

    // Release threshold: CONNECT begins at 0.375
    const releaseStart = 0.35;
    const releaseEnd = 0.60;

    let networkProgress = 0;
    if (p > releaseStart) {
      networkProgress = Math.min(1, (p - releaseStart) / (releaseEnd - releaseStart));
    }

    // Update node positions based on staggered release
    nodeSpatialData.forEach((node, idx) => {
      const nodeStagger = node.releaseOrder / 12;
      const nodeProgress = Math.min(1, Math.max(0, (networkProgress - nodeStagger * 0.4) / 0.6));
      
      // Smooth cubic ease out
      const eased = 1 - Math.pow(1 - nodeProgress, 3);
      node.currentPos.lerpVectors(node.originPos, node.targetPos, eased);
    });

    // Update line connections opacity / visibility
    if (connectionsRef.current) {
      const mat = connectionsRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = Math.max(0, (p - 0.38) * 2.2);
    }

    // Update traveling data pulse packets
    if (pulsesRef.current) {
      const pulseCount = nodeSpatialData.length;
      for (let i = 0; i < pulseCount; i++) {
        const node = nodeSpatialData[i];
        if (networkProgress > 0.1) {
          const t = ((p * 8 + i * 0.15) % 1);
          const px = node.currentPos.x * t;
          const py = node.currentPos.y * t;
          const pz = node.currentPos.z * t;
          dummy.position.set(px, py, pz);
          const scale = (0.04 + Math.sin(t * Math.PI) * 0.05) * networkProgress;
          dummy.scale.set(scale, scale, scale);
        } else {
          dummy.scale.set(0, 0, 0);
        }
        dummy.updateMatrix();
        pulsesRef.current.setMatrixAt(i, dummy.matrix);
      }
      pulsesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={nodesGroupRef}>
      {/* 3D Network Vector Connection Lines */}
      <lineSegments ref={connectionsRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color="#149BFF"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Traveling Data Pulse Packets (Instanced for 60+ FPS) */}
      <instancedMesh
        ref={pulsesRef}
        args={[undefined, undefined, nodeSpatialData.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#5BC3FF" blending={THREE.AdditiveBlending} />
      </instancedMesh>

      {/* 12 Spatial Subsystem Nodes */}
      {nodeSpatialData.map((node) => (
        <SpatialNodeItem key={node.id} node={node} progressRef={progressRef} />
      ))}
    </group>
  );
}

function SpatialNodeItem({
  node,
  progressRef,
}: {
  node: {
    id: string;
    name: string;
    number: string;
    currentPos: THREE.Vector3;
    releaseOrder: number;
  };
  progressRef: React.MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    const p = progressRef.current;
    if (meshRef.current) {
      meshRef.current.position.copy(node.currentPos);

      // Visibility scale starts during CONNECT
      const releaseStart = 0.35 + (node.releaseOrder / 12) * 0.12;
      const nodeScale = p > releaseStart ? Math.min(1, (p - releaseStart) * 8) : 0;
      meshRef.current.scale.set(nodeScale, nodeScale, nodeScale);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Glow Ring */}
      <mesh>
        <ringGeometry args={[0.22, 0.26, 32]} />
        <meshBasicMaterial
          color="#149BFF"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Core Node Sphere */}
      <mesh>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial
          color="#0878C9"
          emissive="#149BFF"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Precise Spatial HTML Label (Screen-Oriented) */}
      <Html
        position={[0, 0.38, 0]}
        center
        distanceFactor={10}
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center">
          <div className="px-2 py-0.5 rounded bg-z-black/85 border border-z-blue-400/60 backdrop-blur-md whitespace-nowrap shadow-[0_0_12px_rgba(20,155,255,0.4)]">
            <span className="font-mono text-[9px] font-bold text-z-white tracking-widest uppercase">
              {node.name}
            </span>
          </div>
          <span className="font-mono text-[7px] text-z-blue-400 font-semibold mt-0.5">
            NODE {node.number}
          </span>
        </div>
      </Html>
    </group>
  );
}
