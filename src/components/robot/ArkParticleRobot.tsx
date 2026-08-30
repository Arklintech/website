'use client';

import React, { useEffect, useRef } from 'react';

interface ArkParticleRobotProps {
  source?: string;
  className?: string;
  onProgressChange?: (progress: number) => void;
}

export default function ArkParticleRobot({
  source = '/assets/arklintech-robot-particle-source.png',
  className = '',
  onProgressChange,
}: ArkParticleRobotProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const indicator = indicatorRef.current;
    if (!track || !canvas) return;

    // Reset scroll position on refresh to ensure the particle robot is always visible on reload
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // Match original standalone options for optimal performance and browser compatibility
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let width = Math.max(1, window.innerWidth);
    let height = Math.max(1, window.innerHeight);
    canvas.width = width;
    canvas.height = height;

    let imgData = ctx.createImageData(width, height);
    let buf32 = new Uint32Array(imgData.data.buffer);

    let particleCount = 0;
    let p_nx: Float32Array;
    let p_ny: Float32Array;
    let p_dispX: Float32Array;
    let p_dispY: Float32Array;
    let p_cohesion: Float32Array;
    let p_depth: Float32Array;
    let p_seed: Float32Array;
    let p_size: Uint8Array;
    let p_r: Uint8Array;
    let p_g: Uint8Array;
    let p_b: Uint8Array;

    let naturalW = 1448;
    let naturalH = 900;
    let imgReady = false;
    let rafId: number | null = null;
    let dissolve = 0;
    let targetDissolve = 0;

    // Smooth virtual camera look angles (normalized -1 to +1)
    let lookTargetX = 0;
    let lookTargetY = 0;
    let lookCurrentX = 0;
    let lookCurrentY = 0;

    const hash = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    // Scroll Handler
    const onScroll = () => {
      const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const total = track.offsetHeight - window.innerHeight;
      if (total > 0) {
        targetDissolve = Math.max(0, Math.min(1, top / total));
      } else {
        targetDissolve = 0;
      }

      // Resume render loop if user scrolls back into view
      if (rafId === null && targetDissolve < 0.995) {
        rafId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Desktop Mouse Tracking (Virtual Camera Yaw & Pitch — Parallax Only)
    const onMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth * 0.5;
      const halfH = window.innerHeight * 0.5;
      if (halfW > 0 && halfH > 0) {
        lookTargetX = Math.max(-1, Math.min(1, (e.clientX - halfW) / halfW));
        lookTargetY = Math.max(-1, Math.min(1, (e.clientY - halfH) / halfH));
      }
    };

    const onMouseLeave = () => {
      lookTargetX = 0;
      lookTargetY = 0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Mobile Device Orientation Sensor (Physical Tilt Parallax)
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;
      const gamma = Math.max(-35, Math.min(35, e.gamma || 0));
      const beta = Math.max(15, Math.min(75, e.beta || 45)) - 45;
      lookTargetX = gamma / 35;
      lookTargetY = beta / 30;
    };

    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      const DeviceOrientationEventAny = window.DeviceOrientationEvent as any;
      if (typeof DeviceOrientationEventAny.requestPermission === 'function') {
        const handleFirstTouch = () => {
          DeviceOrientationEventAny.requestPermission()
            .then((res: string) => {
              if (res === 'granted') {
                window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
              }
            })
            .catch(() => {});
          window.removeEventListener('touchstart', handleFirstTouch);
        };
        window.addEventListener('touchstart', handleFirstTouch, { passive: true, once: true });
      } else {
        window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
      }
    }

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width || window.innerWidth));
      height = Math.max(1, Math.floor(rect.height || window.innerHeight));
      canvas.width = width;
      canvas.height = height;

      try {
        imgData = ctx.createImageData(width, height);
        buf32 = new Uint32Array(imgData.data.buffer);
      } catch (err) {
        console.warn('Canvas resize buffer error:', err);
      }
    };

    // Load Master Image and Build Depth-Aware Particle Model
    const initParticleModel = () => {
      const img = new Image();
      img.onload = () => {
        const srcW = img.naturalWidth || 1448;
        const srcH = img.naturalHeight || 900;
        naturalW = srcW;
        naturalH = srcH;

        const off = document.createElement('canvas');
        off.width = srcW;
        off.height = srcH;
        const octx = off.getContext('2d', { willReadFrequently: true });
        if (!octx) return;
        octx.drawImage(img, 0, 0, srcW, srcH);
        const data = octx.getImageData(0, 0, srcW, srcH).data;

        const rawList: {
          nx: number;
          ny: number;
          dispX: number;
          dispY: number;
          cohesion: number;
          depth: number;
          seed: number;
          size: number;
          r: number;
          g: number;
          b: number;
        }[] = [];

        // Sample particles from source
        const step = srcW > 1600 ? 2 : 1;
        for (let y = 0; y < srcH; y += step) {
          for (let x = 0; x < srcW; x += step) {
            const i = (y * srcW + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < 20) continue;

            const maxC = Math.max(r, Math.max(g, b));
            if (maxC < 12) continue;

            const lum = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255.0;
            const isBlue = b > r * 1.12 && b > 50;

            const nx = x / srcW;
            const ny = y / srcH;
            const isLogo = ny >= 0.80;

            let cohesion = 0.35;
            let depth = 1.0;
            const seed = hash(x * 17.17 + y * 41.41);

            const dEyeL = Math.hypot(nx - 0.40, ny - 0.44);
            const dEyeR = Math.hypot(nx - 0.60, ny - 0.44);
            const dCrest = Math.hypot(nx - 0.50, ny - 0.22);
            const dMouth = Math.hypot(nx - 0.50, ny - 0.65);

            if (isLogo) {
              cohesion = 0.86 + seed * 0.08;
              depth = 0.8;
            } else if (dEyeL < 0.08 || dEyeR < 0.08) {
              cohesion = 0.88 + seed * 0.08;
              depth = 1.45;
            } else if (dCrest < 0.09) {
              cohesion = 0.84 + seed * 0.08;
              depth = 1.2;
            } else if (dMouth < 0.09) {
              cohesion = 0.76 + seed * 0.08;
              depth = 1.1;
            } else if (Math.hypot(nx - 0.5, ny - 0.46) < 0.28) {
              cohesion = 0.60 + seed * 0.15;
              depth = 1.0;
            } else if (nx < 0.18 || nx > 0.82 || ny < 0.10) {
              cohesion = 0.18 + seed * 0.15;
              depth = 0.6;
            } else {
              cohesion = 0.38 + seed * 0.20;
              depth = 0.9;
            }

            let angle: number;
            if (isLogo) {
              angle = Math.PI * 0.5 + (nx - 0.5) * 0.8 + (seed - 0.5) * 0.6;
            } else {
              angle = Math.atan2(ny - 0.44, nx - 0.50) + (seed - 0.5) * 1.4;
            }

            const dispRadius = isLogo ? (0.35 + seed * 0.50) : (0.45 + seed * 0.65);
            const dispX = Math.cos(angle) * dispRadius;
            const dispY = Math.sin(angle) * dispRadius * 0.85;
            const size = lum > 0.40 || isBlue ? 2 : 1;

            rawList.push({
              nx,
              ny,
              dispX,
              dispY,
              cohesion,
              depth,
              seed,
              size,
              r,
              g,
              b,
            });
          }
        }

        particleCount = rawList.length;
        p_nx = new Float32Array(particleCount);
        p_ny = new Float32Array(particleCount);
        p_dispX = new Float32Array(particleCount);
        p_dispY = new Float32Array(particleCount);
        p_cohesion = new Float32Array(particleCount);
        p_depth = new Float32Array(particleCount);
        p_seed = new Float32Array(particleCount);
        p_size = new Uint8Array(particleCount);
        p_r = new Uint8Array(particleCount);
        p_g = new Uint8Array(particleCount);
        p_b = new Uint8Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
          const pt = rawList[i];
          p_nx[i] = pt.nx;
          p_ny[i] = pt.ny;
          p_dispX[i] = pt.dispX;
          p_dispY[i] = pt.dispY;
          p_cohesion[i] = pt.cohesion;
          p_depth[i] = pt.depth;
          p_seed[i] = pt.seed;
          p_size[i] = pt.size;
          p_r[i] = pt.r;
          p_g[i] = pt.g;
          p_b[i] = pt.b;
        }

        imgReady = true;
        resize();
        if (rafId === null) {
          rafId = requestAnimationFrame(render);
        }
      };
      img.onerror = () => {
        console.warn('Failed to load particle robot source image:', source);
      };
      img.src = source;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    resize();
    initParticleModel();

    // 60FPS Direct-Pixel Render Loop on Deep Black Canvas
    function render(t: number) {
      if (!track || !ctx) return;
      const time = t * 0.001;

      // Smooth scroll interpolation
      const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const total = track.offsetHeight - window.innerHeight;
      if (total > 0) {
        targetDissolve = Math.max(0, Math.min(1, top / total));
      }

      dissolve += (targetDissolve - dissolve) * 0.15;
      if (Math.abs(targetDissolve - dissolve) < 0.0001) {
        dissolve = targetDissolve;
      }

      onProgressChange?.(dissolve);

      // Spring-damped virtual camera look interpolation
      lookCurrentX += (lookTargetX - lookCurrentX) * 0.08;
      lookCurrentY += (lookTargetY - lookCurrentY) * 0.08;

      // Fade out top-right scroll indicator on scroll
      if (indicator) {
        const opacity = Math.max(0, 1 - dissolve * 12);
        indicator.style.opacity = opacity.toFixed(3);
        indicator.style.transform = 'translateY(' + ((1 - opacity) * 8).toFixed(1) + 'px)';
        indicator.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none';
      }

      if (!imgReady || particleCount === 0 || !buf32 || !imgData) {
        rafId = requestAnimationFrame(render);
        return;
      }

      // Exact pristine black clear (0xFF000000)
      buf32.fill(0xFF000000);

      const imgAspect = naturalW / naturalH;
      const canvasAspect = width / height;
      let renderW: number, renderH: number, ox: number, oy: number;

      const isMobile = width < 768;

      if (isMobile) {
        const maxMobileW = width * 1.62;
        const maxMobileH = height * 0.72;

        renderW = maxMobileW;
        renderH = renderW / imgAspect;
        if (renderH > maxMobileH) {
          renderH = maxMobileH;
          renderW = renderH * imgAspect;
        }

        ox = (width - renderW) * 0.5;
        oy = (height - renderH) * 0.48;
      } else {
        if (canvasAspect > imgAspect) {
          renderH = height * 0.94;
          renderW = renderH * imgAspect;
        } else {
          renderW = width * 0.96;
          renderH = renderW / imgAspect;
        }
        ox = (width - renderW) * 0.5;
        oy = (height - renderH) * 0.5;
      }

      const pGlobal = dissolve;
      const speed = 1.0;

      const sinT1 = Math.sin(time * 1.37 * speed);
      const cosT1 = Math.cos(time * 1.11 * speed);
      const sinT2 = Math.sin(time * 0.80 * speed);
      const cosT2 = Math.cos(time * 0.70 * speed);

      const minDimension = Math.min(width, height);
      const wInt = width;
      const hInt = height;

      // Parallax amplitude
      const parallaxFade = Math.max(0, 1.0 - pGlobal * 2.5);
      const maxParallaxX = isMobile ? 18.0 : 15.0;
      const maxParallaxY = isMobile ? 12.0 : 10.0;
      const baseLookOffsetX = lookCurrentX * maxParallaxX * parallaxFade;
      const baseLookOffsetY = lookCurrentY * maxParallaxY * parallaxFade;

      for (let i = 0; i < particleCount; i++) {
        const s = p_seed[i];
        const c = p_cohesion[i];
        const d = p_depth[i];

        // 1. EXACT 1:1 Image Pixel Mapping
        const baseX = ox + p_nx[i] * renderW;
        const baseY = oy + p_ny[i] * renderH;

        // 2. Dissolution Progress (Forward camera travels straight through center)
        const startP = c * 0.42;
        let easeLocal = 0;
        if (pGlobal > startP) {
          const endP = 0.60 + c * 0.40;
          const pLocal = Math.min(1.0, (pGlobal - startP) / (endP - startP));
          easeLocal = pLocal * pLocal * (3.0 - 2.0 * pLocal);
        }

        // 3. Depth-aware parallax projection
        const parallaxX = baseLookOffsetX * d;
        const parallaxY = baseLookOffsetY * d;

        // 4. Micro-breathing oscillation
        const breatheAmp = (0.6 + 1.2 * (1.0 - c)) * (1.0 - easeLocal * 0.4);
        const breatheX = sinT1 * breatheAmp;
        const breatheY = cosT1 * (breatheAmp * 0.8);

        // 5. Volumetric turbulence & outward dispersion from the exact optical center
        const turbSpeed = 1.0 + s * 0.5;
        const turbX = sinT2 * (38.0 * easeLocal * turbSpeed);
        const turbY = cosT2 * (32.0 * easeLocal * turbSpeed);

        const dispDist = minDimension * easeLocal;
        const targetDispX = p_dispX[i] * dispDist + turbX;
        const targetDispY = p_dispY[i] * dispDist + turbY;

        const curX = (baseX + targetDispX + breatheX + parallaxX + 0.5) | 0;
        const curY = (baseY + targetDispY + breatheY + parallaxY + 0.5) | 0;

        if (curX < 0 || curX >= wInt || curY < 0 || curY >= hInt) continue;

        // Colors
        const origR = p_r[i];
        const origG = p_g[i];
        const origB = p_b[i];

        // Direct ABGR Uint32 color packing
        const fade = Math.max(0.08, 1.0 - easeLocal * 0.85);
        const rVal = (origR * fade) | 0;
        const gVal = (origG * fade) | 0;
        const bVal = (origB * fade) | 0;
        const col32 = 0xFF000000 | (bVal << 16) | (gVal << 8) | rVal;

        const idx = curY * wInt + curX;
        buf32[idx] = col32;

        if (p_size[i] > 1 && curX + 1 < wInt && curY + 1 < hInt) {
          buf32[idx + 1] = col32;
          buf32[idx + wInt] = col32;
          buf32[idx + wInt + 1] = col32;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      
      // Speed Optimization: Pause 60FPS loop when particles are fully dissolved offstage
      if (!(dissolve >= 0.995 && targetDissolve >= 0.995)) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    // Start render loop immediately
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      resizeObserver.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [source, onProgressChange]);

  return (
    <div
      ref={trackRef}
      id="scroll-track"
      className={`relative w-full ${className}`}
      style={{
        width: '100%',
        height: '350vh',
        backgroundColor: '#000000',
      }}
      aria-label="ARKLINTECH Particle Robot"
    >
      <div
        id="canvas-container"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          backgroundColor: '#000000',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Top-Right Scroll Down Indicator */}
        <div
          ref={indicatorRef}
          className="absolute top-5 right-5 sm:top-8 sm:right-8 z-20 flex items-center gap-2.5 sm:gap-3 transition-opacity duration-300 pointer-events-none select-none"
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="flex flex-col items-end">
            <span
              className="text-[9px] sm:text-[10px] font-mono tracking-[0.24em] sm:tracking-[0.28em] text-[#CBD5E1] uppercase font-bold leading-none"
              style={{ letterSpacing: '0.26em' }}
            >
              SCROLL DOWN
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-mono tracking-[0.2em] text-[#00E5FF] uppercase mt-1 leading-none font-bold">
              TO ENTER SYSTEM
            </span>
          </div>

          <div className="relative w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 backdrop-blur-sm flex items-start justify-center p-1 shadow-[0_0_12px_rgba(0,229,255,0.25)]">
            <div className="w-1 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-bounce mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
