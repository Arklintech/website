'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

// ─── FRAME AUDIT (from visual inspection of all 240 frames) ──────────────────
//
//  000–020  DORMANT      Dark, static metallic ring + glowing Z logo, near-still
//  021–040  STIR         Barely visible particle drift, very LOW activity
//  041–060  AWAKEN       Electric arc ignites on inner ring — MEDIUM, first motion
//  061–100  ACTIVATE     Concentric rings expand, ray burst, tunnel effect — HIGH
//  101–130  CONNECT      Hexagonal node network forms, blue+gold colors — HIGH
//  131–160  ORCHESTRATE  Curved golden lines, orbital paths, complex loops — HIGH
//  161–195  BUILD        3D wireframe cube over digital city, binary rain — HIGH
//  196–215  EXECUTE      First-person drive down data highway, light trails — HIGH
//  216–240  CONVERGE     Return to Z logo + UI panels, city fades out — MEDIUM→LOW
//
// PROBLEM WITH LINEAR MAPPING:
//   frames 000–020 (DORMANT/STIR) = ~8.3% of frames → 8.3% of scroll
//   User has to scroll 8.3vh of 500vh seeing NOTHING before anything happens.
//   Better UX: compress dormant into 3-4% of scroll, expand active ranges.
//
// ─── NARRATIVE PROGRESS MAP ──────────────────────────────────────────────────
//
//  The function below maps user scroll progress [0,1] → frame index [0,239].
//  Active ranges get MORE scroll space. Static/dormant ranges get LESS.
//
//  USER %    →  FRAME RANGE    NARRATIVE STATE    WHY
//  0–4%      →  0–20           DORMANT            Quick intro reveal
//  4–10%     →  21–40          STIR               Compressed (near-static)
//  10–20%    →  41–60          AWAKEN             Normal (first real motion)
//  20–48%    →  61–100         ACTIVATE           Expanded (most dramatic)
//  48–65%    →  101–130        CONNECT            Normal
//  65–80%    →  131–160        ORCHESTRATE        Normal
//  80–91%    →  161–195        BUILD              Normal
//  91–97%    →  196–215        EXECUTE            Normal
//  97–100%   →  216–239        CONVERGE           Compressed (end lockup)
//
// ─────────────────────────────────────────────────────────────────────────────

// Narrative control points: [userProgress, frameIndex]
// Hermite-interpolated between these anchors.
const NAR_KEYPOINTS: [number, number][] = [
  [0.00,   0],   // Start: DORMANT
  [0.04,  20],   // 4%: end of dormant (compressed)
  [0.10,  40],   // 10%: end of stir (compressed)
  [0.20,  60],   // 20%: AWAKEN complete
  [0.48, 100],   // 48%: ACTIVATE complete — most scroll space
  [0.65, 130],   // 65%: CONNECT complete
  [0.80, 160],   // 80%: ORCHESTRATE complete
  [0.91, 195],   // 91%: BUILD complete
  [0.97, 215],   // 97%: EXECUTE complete
  [1.00, 239],   // 100%: CONVERGE / end
];

// Piecewise linear interpolation through narrative keypoints
function narrativeFrame(userProgress: number): number {
  const p = Math.max(0, Math.min(1, userProgress));
  for (let i = 0; i < NAR_KEYPOINTS.length - 1; i++) {
    const [p0, f0] = NAR_KEYPOINTS[i];
    const [p1, f1] = NAR_KEYPOINTS[i + 1];
    if (p >= p0 && p <= p1) {
      const t = (p - p0) / (p1 - p0);
      return Math.round(f0 + t * (f1 - f0));
    }
  }
  return 239;
}

// State label for debug HUD + §09 requirement
function narrativeState(frame: number): { state: string; activity: string } {
  if (frame <= 20)  return { state: 'DORMANT',      activity: 'LOW'    };
  if (frame <= 40)  return { state: 'STIR',         activity: 'LOW'    };
  if (frame <= 60)  return { state: 'AWAKEN',        activity: 'MEDIUM' };
  if (frame <= 100) return { state: 'ACTIVATE',     activity: 'HIGH'   };
  if (frame <= 130) return { state: 'CONNECT',      activity: 'HIGH'   };
  if (frame <= 160) return { state: 'ORCHESTRATE',  activity: 'HIGH'   };
  if (frame <= 195) return { state: 'BUILD',        activity: 'HIGH'   };
  if (frame <= 215) return { state: 'EXECUTE',      activity: 'HIGH'   };
  return              { state: 'CONVERGE',     activity: 'MEDIUM' };
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES     = 240;
const SCROLL_HEIGHT_VH = 500;
const CRITICAL_FRAMES  = 40;       // Covers DORMANT + AWAKEN before scroll
const MAX_DECODES      = 4;

const SHOW_HUD = process.env.NODE_ENV === 'development'; // Debug HUD dev-only

// ─── Frame URL ────────────────────────────────────────────────────────────────
function frameSrc(idx: number): string {
  const n = Math.max(1, Math.min(TOTAL_FRAMES, idx + 1));
  return `/cinematic/frames/frame_${String(n).padStart(4, '0')}.webp`;
}

// ─── Module-scope cache (survives Strict Mode double-mount) ───────────────────
const CACHE: (ImageBitmap | null)[] = new Array(TOTAL_FRAMES).fill(null);
const IN_FLIGHT = new Set<number>();

let _active = 0;
const _qHigh: Array<() => void> = [];
const _qLow:  Array<() => void> = [];

function _drain() {
  while (_active < MAX_DECODES) {
    const job = _qHigh.shift() ?? _qLow.shift();
    if (!job) break;
    _active++;
    job();
  }
}

function _decode(img: HTMLImageElement, idx: number, res: () => void, hi: boolean) {
  const run = () => {
    createImageBitmap(img, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' })
      .then((bm) => { CACHE[idx] = bm; IN_FLIGHT.delete(idx); _active--; _drain(); res(); })
      .catch(()   => {                  IN_FLIGHT.delete(idx); _active--; _drain(); res(); });
  };
  if (_active < MAX_DECODES) { _active++; run(); }
  else if (hi)  _qHigh.push(run);
  else          _qLow.push(run);
}

function preload(idx: number, hi = false): Promise<void> {
  if (idx < 0 || idx >= TOTAL_FRAMES) return Promise.resolve();
  if (CACHE[idx])         return Promise.resolve();
  if (IN_FLIGHT.has(idx)) return Promise.resolve();
  IN_FLIGHT.add(idx);
  return new Promise<void>((res) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = frameSrc(idx);
    const commit = () => _decode(img, idx, res, hi);
    if (img.complete && img.naturalWidth > 0) commit();
    else { img.onload = commit; img.onerror = () => { IN_FLIGHT.delete(idx); res(); }; }
  });
}

function nearestBitmap(idx: number): ImageBitmap | null {
  const c = Math.max(0, Math.min(TOTAL_FRAMES - 1, idx));
  if (CACHE[c]) return CACHE[c];
  for (let o = 1; o < 80; o++) {
    const p = c - o; if (p >= 0          && CACHE[p]) return CACHE[p];
    const n = c + o; if (n < TOTAL_FRAMES && CACHE[n]) return CACHE[n];
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CinematicIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const ctxRef       = useRef<CanvasRenderingContext2D | null>(null);

  const requestedFrameRef = useRef(0);
  const renderedFrameRef  = useRef(-1);
  const userProgressRef   = useRef(0);
  const rafRef            = useRef<number | null>(null);
  const isScrollingRef    = useRef(false);
  const scrollIdleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPreloadCenter = useRef(-99);

  const [criticalReady, setCriticalReady] = useState(false);
  const [loadPct, setLoadPct]             = useState(0);

  // Debug HUD state (dev only, updated via ref to avoid RAF re-renders)
  const hudRef = useRef<HTMLDivElement>(null);

  // ── Canvas helpers ────────────────────────────────────────────────────────
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w   = Math.round(window.innerWidth  * dpr);
    const h   = Math.round(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width  = w;
      canvas.height = h;
      ctxRef.current = null;
    }
    if (!ctxRef.current) {
      const ctx = canvas.getContext('2d', { alpha: false, desynchronized: false });
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctxRef.current = ctx;
      }
    }
    renderedFrameRef.current = -1;
  };

  const drawFrame = (frameIdx: number) => {
    const ctx = ctxRef.current;
    const cv  = canvasRef.current;
    if (!ctx || !cv) return;
    const bm = nearestBitmap(frameIdx);
    if (!bm) return;
    const cw = cv.width, ch = cv.height;
    const sc = Math.max(cw / bm.width, ch / bm.height);
    const dw = Math.round(bm.width  * sc);
    const dh = Math.round(bm.height * sc);
    ctx.drawImage(bm, Math.round((cw - dw) / 2), Math.round((ch - dh) / 2), dw, dh);
  };

  // ── Stage 1: Critical preload ─────────────────────────────────────────────
  useEffect(() => {
    initCanvas();

    let alive = true;
    let done  = 0;

    // Prioritize loading frames in narrative order (not sequential 0-29)
    // Load frames that the user will see first per the narrative map
    const criticalIndices: number[] = [];
    for (let i = 0; i < CRITICAL_FRAMES; i++) criticalIndices.push(i);

    const promises = criticalIndices.map((i) =>
      preload(i, true).then(() => {
        done++;
        if (alive) setLoadPct(Math.round((done / CRITICAL_FRAMES) * 100));
      })
    );

    Promise.all(promises).then(() => {
      if (!alive) return;
      setCriticalReady(true);

      // Background loader — low priority, pauses during active scroll
      let bgIdx = CRITICAL_FRAMES;
      const loadNext = () => {
        if (!alive || bgIdx >= TOTAL_FRAMES) return;
        if (isScrollingRef.current) { setTimeout(loadNext, 200); return; }
        while (bgIdx < TOTAL_FRAMES && CACHE[bgIdx]) bgIdx++;
        if (bgIdx >= TOTAL_FRAMES) return;
        preload(bgIdx++, false).then(() => {
          if (alive) setTimeout(loadNext, 120);
        });
      };
      setTimeout(loadNext, 800);
    });

    const onResize = () => requestAnimationFrame(initCanvas);
    window.addEventListener('resize',            onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    return () => {
      alive = false;
      window.removeEventListener('resize',            onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Stage 2: ScrollTrigger ────────────────────────────────────────────────
  useEffect(() => {
    if (!criticalReady) return;

    gsap.registerPlugin(ScrollTrigger);
    initCanvas();
    drawFrame(0);
    if (CACHE[0]) renderedFrameRef.current = 0;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const up  = self.progress;
        const dir = self.direction;
        userProgressRef.current = up;

        // Narrative mapping: user progress → frame index via keypoint table
        const frame = narrativeFrame(up);
        requestedFrameRef.current = frame;

        // Signal background loader to pause
        isScrollingRef.current = true;
        if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current);
        scrollIdleTimer.current = setTimeout(() => { isScrollingRef.current = false; }, 250);

        // Direction-aware HIGH priority preload (nearest first)
        if (Math.abs(frame - lastPreloadCenter.current) >= 3) {
          lastPreloadCenter.current = frame;
          const isDown = dir > 0;
          for (let i = 0; i < 20; i++) {
            const t = isDown ? frame + i : frame - i;
            if (t >= 0 && t < TOTAL_FRAMES && !CACHE[t]) preload(t, true);
          }
          for (let i = 1; i <= 5; i++) {
            const t = isDown ? frame - i : frame + i;
            if (t >= 0 && t < TOTAL_FRAMES && !CACHE[t]) preload(t, false);
          }
        }
      },
    });

    const onResize = () => requestAnimationFrame(() => { initCanvas(); ScrollTrigger.refresh(); });
    window.addEventListener('resize',            onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize',            onResize);
      window.removeEventListener('orientationchange', onResize);
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current);
      trigger.kill();
    };
  }, [criticalReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Stage 3: RAF render loop + HUD update ─────────────────────────────────
  useEffect(() => {
    if (!criticalReady) return;

    const loop = () => {
      const req = requestedFrameRef.current;
      const ren = renderedFrameRef.current;

      if (req !== ren) {
        drawFrame(req);
        if (CACHE[req]) renderedFrameRef.current = req;
      }

      // Update debug HUD via direct DOM (no React re-render overhead)
      if (SHOW_HUD && hudRef.current) {
        const { state, activity } = narrativeState(req);
        const up = userProgressRef.current;
        const np = NAR_KEYPOINTS.find(([p]) => up <= p)?.[0] ?? 1;
        hudRef.current.innerHTML =
          `<div>USER PROGRESS&nbsp;&nbsp;&nbsp;&nbsp;${(up * 100).toFixed(1)}%</div>` +
          `<div>NARRATIVE PROG&nbsp;&nbsp;${(req / 239 * 100).toFixed(1)}%</div>` +
          `<div>FRAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${String(req).padStart(3,' ')} / 240</div>` +
          `<div>STATE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${state}</div>` +
          `<div>ACTIVITY&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${activity}</div>` +
          `<div>CACHE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${CACHE.filter(Boolean).length} / 240</div>`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [criticalReady]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      id="cinematic"
      style={{ position: 'relative', width: '100%', height: `${SCROLL_HEIGHT_VH}vh`, background: '#000' }}
    >
      <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100dvh', overflow: 'hidden', background: '#000' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="ARKLINTECH Living Machine interactive scrolltelling cinematic sequence"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', imageRendering: 'auto', pointerEvents: 'none' }}
        >
          <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> Living Machine interactive scrolltelling visualization
        </canvas>

        {/* Loading veil */}
        {!criticalReady && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 20, background: '#000', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, margin: '0 auto 16px', border: '2px solid rgba(80,130,255,0.35)', borderTopColor: 'rgba(100,160,255,0.95)', borderRadius: '50%', animation: 'cin-spin 0.72s linear infinite' }} />
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(100,160,255,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                INITIALIZING CINEMATIC
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'rgba(255,255,255,0.18)', marginTop: 8 }}>{loadPct}%</div>
            </div>
          </div>
        )}

        {/* Scroll cue */}
        {criticalReady && (
          <div style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 999, background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(100,150,255,0.28)', color: 'rgba(140,175,255,0.85)', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', backdropFilter: 'blur(12px)' }}>
              <span>SCROLL TO OPERATE THE SYSTEM</span>
              <ChevronDown size={13} style={{ animation: 'cin-bounce 1.6s ease-in-out infinite' }} />
            </div>
          </div>
        )}

        {/* Debug HUD — dev only, updated via direct DOM to avoid re-renders */}
        {SHOW_HUD && (
          <div
            ref={hudRef}
            style={{
              position: 'absolute', top: 16, left: 16, zIndex: 50,
              fontFamily: 'monospace', fontSize: 10, lineHeight: 1.7,
              color: 'rgba(100,220,100,0.9)',
              background: 'rgba(0,0,0,0.75)',
              border: '1px solid rgba(100,220,100,0.3)',
              borderRadius: 4, padding: '8px 12px',
              pointerEvents: 'none',
              whiteSpace: 'pre',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes cin-spin   { to { transform: rotate(360deg); } }
        @keyframes cin-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
      `}</style>
    </section>
  );
}
