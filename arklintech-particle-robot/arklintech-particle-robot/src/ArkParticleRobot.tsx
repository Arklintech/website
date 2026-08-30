import { useEffect, useRef } from 'react';

export interface ArkParticleRobotProps {
  /** Path to the particle source image asset */
  source?: string;
  className?: string;
  /** Normalized dissolution progress (0.0 fully formed to 1.0 dispersed). If undefined, driven by page scroll */
  dissolve?: number;
  /** Breathing oscillation speed multiplier (default: 1.0) */
  speed?: number;
  /** Whether page scroll drives the particle transformation (default: true) */
  enableScrollDrive?: boolean;
  /** Callback notifying parent when dissolution progress changes */
  onProgressChange?: (progress: number) => void;
}

const DEFAULT_SOURCE = '/assets/arklintech-robot-particle-source.png';

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function hash(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function ArkParticleRobot({
  source = DEFAULT_SOURCE,
  className = '',
  dissolve,
  speed = 1,
  enableScrollDrive = true,
  onProgressChange,
}: ArkParticleRobotProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let last = performance.now();
    let imageReady = false;
    let resizeObserver: ResizeObserver | null = null;

    let particleCount = 0;
    let p_nx: Float32Array;
    let p_ny: Float32Array;
    let p_dispX: Float32Array;
    let p_dispY: Float32Array;
    let p_cohesion: Float32Array;
    let p_seed: Float32Array;
    let p_size: Uint8Array;
    let p_r: Uint8Array;
    let p_g: Uint8Array;
    let p_b: Uint8Array;

    let imgData: ImageData | null = null;
    let buf32: Uint32Array | null = null;

    // Pure Scroll Progress Calculation
    const getScrollProgress = () => {
      if (typeof dissolve === 'number') {
        return clamp(dissolve, 0, 1);
      }
      if (!enableScrollDrive || !track) {
        return 0;
      }
      const rect = track.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      return totalScrollable > 0 ? clamp(-rect.top / totalScrollable, 0, 1) : 0;
    };

    const img = new Image();
    img.decoding = 'async';
    img.src = source;

    const buildParticles = () => {
      if (!img.naturalWidth) return;
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;

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
        seed: number;
        size: number;
        r: number;
        g: number;
        b: number;
      }[] = [];

      for (let y = 0; y < srcH; y++) {
        for (let x = 0; x < srcW; x++) {
          const i = (y * srcW + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 30) continue;

          const maxC = Math.max(r, Math.max(g, b));
          if (maxC < 12) continue;

          const lum = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255.0;
          const isBlue = b > r * 1.15 && b > 60;

          const nx = x / srcW;
          const ny = y / srcH;

          let cohesion = 0.35;
          const dEyeL = Math.hypot(nx - 0.39, ny - 0.44);
          const dEyeR = Math.hypot(nx - 0.61, ny - 0.44);
          const dCrest = Math.hypot(nx - 0.50, ny - 0.22);
          const dMouth = Math.hypot(nx - 0.50, ny - 0.65);
          const seed = hash(x * 17.17 + y * 41.41);

          if (dEyeL < 0.09 || dEyeR < 0.09) {
            cohesion = 0.88 + seed * 0.08;
          } else if (dCrest < 0.09) {
            cohesion = 0.84 + seed * 0.08;
          } else if (dMouth < 0.09) {
            cohesion = 0.76 + seed * 0.08;
          } else if (Math.hypot(nx - 0.5, ny - 0.46) < 0.28) {
            cohesion = 0.60 + seed * 0.15;
          } else if (ny > 0.82 || nx < 0.22 || nx > 0.78) {
            cohesion = 0.15 + seed * 0.15;
          } else {
            cohesion = 0.38 + seed * 0.20;
          }

          const angle = Math.atan2(ny - 0.46, nx - 0.50) + (seed - 0.5) * 1.4;
          const dispRadius = 0.45 + seed * 0.65;
          const dispX = Math.cos(angle) * dispRadius;
          const dispY = Math.sin(angle) * dispRadius * 0.85;
          const size = lum > 0.45 || isBlue ? 2 : 1;

          rawList.push({
            nx, ny, dispX, dispY, cohesion, seed, size, r, g, b,
          });
        }
      }

      particleCount = rawList.length;
      p_nx = new Float32Array(particleCount);
      p_ny = new Float32Array(particleCount);
      p_dispX = new Float32Array(particleCount);
      p_dispY = new Float32Array(particleCount);
      p_cohesion = new Float32Array(particleCount);
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
        p_seed[i] = pt.seed;
        p_size[i] = pt.size;
        p_r[i] = pt.r;
        p_g[i] = pt.g;
        p_b[i] = pt.b;
      }

      imageReady = true;
      resize();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width;
      canvas.height = height;

      imgData = ctx.createImageData(width, height);
      buf32 = new Uint32Array(imgData.data.buffer);
    };

    const draw = (t: number) => {
      last = t;
      const time = t * 0.001;

      const currentDissolve = getScrollProgress();
      onProgressChange?.(currentDissolve);

      if (!imageReady || particleCount === 0 || !buf32 || !imgData) {
        raf = requestAnimationFrame(draw);
        return;
      }

      buf32.fill(0xFF000000);

      const imgAspect = 1448 / 900;
      const canvasAspect = width / height;
      let renderW: number, renderH: number, ox: number, oy: number;

      if (canvasAspect > imgAspect) {
        renderH = height * 0.92;
        renderW = renderH * imgAspect;
        ox = (width - renderW) * 0.5;
        oy = (height - renderH) * 0.5;
      } else {
        renderW = width * 0.94;
        renderH = renderW / imgAspect;
        ox = (width - renderW) * 0.5;
        oy = (height - renderH) * 0.5;
      }

      const pGlobal = currentDissolve;
      const sinT1 = Math.sin(time * 1.37 * speed);
      const cosT1 = Math.cos(time * 1.11 * speed);
      const sinT2 = Math.sin(time * 0.80 * speed);
      const cosT2 = Math.cos(time * 0.70 * speed);

      const minDimension = Math.min(width, height);
      const wInt = width;
      const hInt = height;

      for (let i = 0; i < particleCount; i++) {
        const s = p_seed[i];
        const c = p_cohesion[i];

        const baseX = ox + p_nx[i] * renderW;
        const baseY = oy + p_ny[i] * renderH;

        const startP = c * 0.42;
        let easeLocal = 0;
        if (pGlobal > startP) {
          const endP = 0.60 + c * 0.40;
          const pLocal = Math.min(1.0, (pGlobal - startP) / (endP - startP));
          easeLocal = pLocal * pLocal * (3.0 - 2.0 * pLocal);
        }

        const breatheAmp = (0.6 + 1.2 * (1.0 - c)) * (1.0 - easeLocal * 0.4);
        const breatheX = sinT1 * breatheAmp;
        const breatheY = cosT1 * (breatheAmp * 0.8);

        const turbSpeed = 1.0 + s * 0.5;
        const turbX = sinT2 * (38.0 * easeLocal * turbSpeed);
        const turbY = cosT2 * (32.0 * easeLocal * turbSpeed);

        const dispDist = minDimension * easeLocal;
        const targetDispX = p_dispX[i] * dispDist + turbX;
        const targetDispY = p_dispY[i] * dispDist + turbY;

        const curX = (baseX + targetDispX + breatheX + 0.5) | 0;
        const curY = (baseY + targetDispY + breatheY + 0.5) | 0;

        if (curX < 0 || curX >= wInt || curY < 0 || curY >= hInt) continue;

        const fade = Math.max(0.1, 1.0 - easeLocal * 0.85);
        const rVal = (p_r[i] * fade) | 0;
        const gVal = (p_g[i] * fade) | 0;
        const bVal = (p_b[i] * fade) | 0;
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
      raf = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    img.addEventListener('load', buildParticles, { once: true });
    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      resizeObserver?.disconnect();
    };
  }, [source, dissolve, speed, enableScrollDrive, onProgressChange]);

  return (
    <div
      ref={trackRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '350vh',
        backgroundColor: '#000000',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
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
      </div>
    </div>
  );
}
