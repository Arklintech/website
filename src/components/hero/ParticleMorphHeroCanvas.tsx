'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

export interface MorphCheckpoint {
  id: string;
  number: string;
  label: string;
  tagline: string;
  color: string;
}

export const MORPH_CHECKPOINTS: MorphCheckpoint[] = [
  {
    id: 'understand',
    number: '01',
    label: 'UNDERSTAND',
    tagline: 'We understand the problem, constraints and operational landscape.',
    color: '#00E5FF',
  },
  {
    id: 'connect',
    number: '02',
    label: 'CONNECT',
    tagline: 'We connect systems, data and people into unified dataflows.',
    color: '#149BFF',
  },
  {
    id: 'orchestrate',
    number: '03',
    label: 'ORCHESTRATE',
    tagline: 'We orchestrate intelligent workflows and decision automation.',
    color: '#0878C9',
  },
  {
    id: 'build',
    number: '04',
    label: 'BUILD',
    tagline: 'We build robust digital platforms and software for scale.',
    color: '#149BFF',
  },
  {
    id: 'execute',
    number: '05',
    label: 'EXECUTE',
    tagline: 'We deploy, monitor and optimize live production systems.',
    color: '#00E5FF',
  },
  {
    id: 'evolve',
    number: '06',
    label: 'EVOLVE',
    tagline: 'The system evolves for long-term impact and scale.',
    color: '#70EFFF',
  },
];

interface ParticleMorphHeroCanvasProps {
  currentStage?: number;
  activeStageIndex?: number;
  onStageSelect?: (stage: number) => void;
  className?: string;
}

export default function ParticleMorphHeroCanvas({
  currentStage,
  activeStageIndex,
  onStageSelect,
  className = '',
}: ParticleMorphHeroCanvasProps) {
  const stage = activeStageIndex !== undefined ? activeStageIndex : (currentStage !== undefined ? currentStage : 2);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const stageLerpRef = useRef<number>(stage);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // Keep target stage synced
  useEffect(() => {
    stageLerpRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }
    } catch {
      setWebGlAvailable(false);
      return;
    }

    // Determine particle count based on device performance & screen size
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
    const particleCount = isMobile ? 3500 : isTablet ? 7500 : 12000;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Generate Particle Coordinates for 6 Morph Stages
    // Target 1: Robot Head / Face Profile facing left
    // We construct geometric profiles for:
    // - Cranium & Forehead
    // - Visor / Optic Sensor Array
    // - Jaw & Chin Profile
    // - Neck & Collar Matrix
    // - Volumetric Particle Core & Surrounding Stream

    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);

    // Target positions for each of the 6 stages
    const targets: Float32Array[] = [];
    for (let s = 0; s < 6; s++) {
      targets.push(new Float32Array(particleCount * 3));
    }

    // Color definitions (Electric Blue, Cool Cyan, Pure White)
    const colorBlue = new THREE.Color('#0878C9');
    const colorElectric = new THREE.Color('#149BFF');
    const colorCyan = new THREE.Color('#00E5FF');
    const colorWhite = new THREE.Color('#F5F8FC');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random seeds for particle personality
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const rRandom = 3.5 * Math.cbrt(Math.random());

      // 1. STAGE 0: UNDERSTAND (Field dispersion / cosmic cloud)
      targets[0][i3] = (Math.random() - 0.5) * 8.0;
      targets[0][i3 + 1] = (Math.random() - 0.5) * 6.5;
      targets[0][i3 + 2] = (Math.random() - 0.5) * 4.0;

      // Construct Robot Head Profile Coordinates (Stages 1-5 converge onto this)
      let headX = 0;
      let headY = 0;
      let headZ = 0;

      const pType = i % 5;
      if (pType === 0) {
        // Cranium Dome (upper head)
        const rad = 1.35 + Math.random() * 0.15;
        const lat = Math.random() * Math.PI * 0.55;
        const lon = (Math.random() - 0.5) * Math.PI * 1.3 - 0.2;
        headX = rad * Math.sin(lat) * Math.cos(lon) + 0.35;
        headY = rad * Math.cos(lat) + 0.3;
        headZ = rad * Math.sin(lat) * Math.sin(lon);
      } else if (pType === 1) {
        // Optic Visor / Eye Sensor (facing left at x ~ -0.4, y ~ 0.55)
        const t = Math.random();
        headX = -0.65 + t * 0.45;
        headY = 0.52 + (Math.random() - 0.5) * 0.18;
        headZ = (t - 0.5) * 1.4;
      } else if (pType === 2) {
        // Jaw & Chin profile (tapering downwards towards x ~ -0.4, y ~ -0.6)
        const t = Math.random();
        headX = 0.4 - t * 0.95;
        headY = 0.2 - t * 0.85;
        headZ = (Math.random() - 0.5) * (1.2 - t * 0.6);
      } else if (pType === 3) {
        // Neck & Spinal Collar Matrix
        const t = Math.random();
        headX = 0.55 - t * 0.3;
        headY = -0.55 - t * 0.85;
        headZ = (Math.random() - 0.5) * 0.9;
      } else {
        // Volumetric Core & Surrounding Flow Particles
        const rad = 0.9 * Math.random();
        const angle = Math.random() * Math.PI * 2;
        headX = Math.cos(angle) * rad + 0.25;
        headY = Math.sin(angle) * rad + 0.2;
        headZ = (Math.random() - 0.5) * 1.1;
      }

      // 2. STAGE 1: CONNECT (Recognizable outline + connecting stream)
      const connectFactor = 0.45;
      targets[1][i3] = THREE.MathUtils.lerp(targets[0][i3] * 0.7, headX, connectFactor) + Math.sin(i) * 0.2;
      targets[1][i3 + 1] = THREE.MathUtils.lerp(targets[0][i3 + 1] * 0.7, headY, connectFactor);
      targets[1][i3 + 2] = THREE.MathUtils.lerp(targets[0][i3 + 2] * 0.7, headZ, connectFactor);

      // 3. STAGE 2: ORCHESTRATE (Organized conduits & swirling particles around head)
      const streamAngle = (i / particleCount) * Math.PI * 8;
      const streamRadius = 1.8 + Math.sin(i * 0.1) * 0.4;
      const streamX = Math.cos(streamAngle) * streamRadius + 0.2;
      const streamY = Math.sin(streamAngle * 0.5) * 1.2 + 0.1;
      const streamZ = Math.sin(streamAngle) * streamRadius;

      targets[2][i3] = i % 4 === 0 ? streamX : THREE.MathUtils.lerp(headX, streamX, 0.25);
      targets[2][i3 + 1] = i % 4 === 0 ? streamY : THREE.MathUtils.lerp(headY, streamY, 0.25);
      targets[2][i3 + 2] = i % 4 === 0 ? streamZ : THREE.MathUtils.lerp(headZ, streamZ, 0.25);

      // 4. STAGE 3: BUILD (Crystallizing structural plates & dense silhouette)
      targets[3][i3] = headX + (Math.random() - 0.5) * 0.08;
      targets[3][i3 + 1] = headY + (Math.random() - 0.5) * 0.08;
      targets[3][i3 + 2] = headZ + (Math.random() - 0.5) * 0.08;

      // 5. STAGE 4: EXECUTE (Fully formed high-definition robot head & visor)
      targets[4][i3] = headX;
      targets[4][i3 + 1] = headY;
      targets[4][i3 + 2] = headZ;

      // 6. STAGE 5: EVOLVE (Active operational robot with gentle breathing & outer particle corona)
      const coronaOffset = i % 6 === 0 ? (Math.random() - 0.5) * 0.6 : 0;
      targets[5][i3] = headX + coronaOffset;
      targets[5][i3 + 1] = headY + coronaOffset;
      targets[5][i3 + 2] = headZ + coronaOffset;

      // Initial positions set to current stage
      const sInit = Math.floor(stage);
      const sNext = Math.min(5, sInit + 1);
      const tInit = stage - sInit;

      posArray[i3] = THREE.MathUtils.lerp(targets[sInit][i3], targets[sNext][i3], tInit);
      posArray[i3 + 1] = THREE.MathUtils.lerp(targets[sInit][i3 + 1], targets[sNext][i3 + 1], tInit);
      posArray[i3 + 2] = THREE.MathUtils.lerp(targets[sInit][i3 + 2], targets[sNext][i3 + 2], tInit);

      // Assign Cool Colors (Electric Blue / Cyan / White)
      let pColor = colorBlue;
      if (pType === 1) {
        pColor = colorCyan; // Bright Cyan for visor/sensor array
      } else if (i % 7 === 0) {
        pColor = colorWhite; // Sparkle white
      } else if (i % 3 === 0) {
        pColor = colorElectric;
      }

      colorArray[i3] = pColor.r;
      colorArray[i3 + 1] = pColor.g;
      colorArray[i3 + 2] = pColor.b;

      sizeArray[i] = pType === 1 ? 4.5 : Math.random() * 2.8 + 1.8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    // Custom Shader / Points Material for glowing circular particles
    const particleTexture = createCircularParticleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(0.4, -0.1, 0); // Center robot in right viewport half
    scene.add(points);
    pointsRef.current = points;

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x0878c9, 0.8);
    scene.add(ambientLight);

    // Dynamic Animation Loop
    let currentAnimStage = stage;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate current animated stage towards target stage
      currentAnimStage += (stageLerpRef.current - currentAnimStage) * 0.05;

      const sFloor = Math.floor(currentAnimStage);
      const sCeil = Math.min(5, sFloor + 1);
      const progress = currentAnimStage - sFloor;

      const positions = geometry.attributes.position.array as Float32Array;

      // Subtle breathing rotation & wave motion
      points.rotation.y = Math.sin(elapsedTime * 0.3) * 0.08 - 0.15;
      points.rotation.x = Math.cos(elapsedTime * 0.25) * 0.04;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base target position interpolated between two bounding stage snapshots
        const p1x = targets[sFloor][i3];
        const p1y = targets[sFloor][i3 + 1];
        const p1z = targets[sFloor][i3 + 2];

        const p2x = targets[sCeil][i3];
        const p2y = targets[sCeil][i3 + 1];
        const p2z = targets[sCeil][i3 + 2];

        const targetX = THREE.MathUtils.lerp(p1x, p2x, progress);
        const targetY = THREE.MathUtils.lerp(p1y, p2y, progress);
        const targetZ = THREE.MathUtils.lerp(p1z, p2z, progress);

        // Add subtle harmonic flutter to live operational particles
        const wave = Math.sin(elapsedTime * 1.5 + i * 0.05) * 0.025;

        positions[i3] += (targetX - positions[i3]) * 0.08;
        positions[i3 + 1] += (targetY + wave - positions[i3 + 1]) * 0.08;
        positions[i3 + 2] += (targetZ - positions[i3 + 2]) * 0.08;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (particleTexture) particleTexture.dispose();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Helper to generate soft circular glow particle texture
  function createCircularParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.25, 'rgba(0, 229, 255, 0.9)');
    gradient.addColorStop(0.6, 'rgba(20, 155, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* 3D WebGL Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing pointer-events-auto"
        aria-label="ARKLINTECH Living Machine real-time particulate robot morph interface"
      />

      {/* Fallback Static Visual (for reduced motion or unsupported WebGL) */}
      {!webGlAvailable && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <img
            src="/visuals/zaqvoro/hero-zcore.webp"
            alt="ARKLINTECH Living Machine Architecture"
            className="w-full h-full object-contain max-w-md opacity-90 filter drop-shadow-[0_0_35px_rgba(20,155,255,0.4)]"
          />
        </div>
      )}

      {/* HUD Metadata Overlay (Strictly Matched to Reference Image) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none z-10 font-mono text-[10px] sm:text-[11px] text-right space-y-1">
        <div className="text-z-blue-400 font-semibold tracking-widest uppercase">
          ONE MACHINE / ONE JOURNEY / ONE PURPOSE
        </div>
        <div className="text-z-muted text-[9px] sm:text-[10px] tracking-wider max-w-[200px]">
          Building the future of intelligent operations.
        </div>
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-z-surface-2/90 border border-z-border text-z-white font-mono text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-z-cyan-400 animate-pulse" />
          <span>0{stage + 1} / 06</span>
        </div>
      </div>

      {/* Subtle radial aura behind the particulate robot */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-z-blue-500/15 via-transparent to-transparent -z-10" />
    </div>
  );
}
