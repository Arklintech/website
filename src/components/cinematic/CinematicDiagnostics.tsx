'use client';

import React from 'react';
import { CinematicDiagnosticsData } from './cinematic-types';

export type CinematicRendererMode = 'CANVAS_SEQUENCE';

interface CinematicDiagnosticsProps {
  data: CinematicDiagnosticsData;
}

/**
 * ZAQVORO Development-Only Diagnostics HUD
 *
 * Activation:
 *   - URL param:      ?debug=1
 *   - localStorage:   cinematic_debug = '1'
 *   - Keyboard:       Ctrl + Shift + D  (toggle)
 *
 * Displays every metric required by the scrolltelling spec:
 * scroll progress, master progress, requested frame, rendered frame,
 * state, FPS, decode time, render time, DPR, canvas size, device class,
 * cache size, cache hit/miss, scroll direction.
 *
 * Hidden entirely in production (NODE_ENV !== 'development').
 */
export default function CinematicDiagnostics({ data }: CinematicDiagnosticsProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1' || localStorage.getItem('cinematic_debug') === '1') {
      setVisible(true);
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        setVisible((prev) => {
          const next = !prev;
          if (next) localStorage.setItem('cinematic_debug', '1');
          else localStorage.removeItem('cinematic_debug');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!visible || process.env.NODE_ENV !== 'development') return null;

  const Row = ({
    label,
    value,
    color = 'text-zinc-100',
    accent = false,
  }: {
    label: string;
    value: string | number;
    color?: string;
    accent?: boolean;
  }) => (
    <div className={`flex justify-between gap-4 ${accent ? 'border-t border-zinc-700/50 pt-1 mt-1' : ''}`}>
      <span className="text-zinc-500 shrink-0">{label}</span>
      <span className={`font-semibold tabular-nums ${color}`}>{value}</span>
    </div>
  );

  const hitRate =
    data.cacheHits + data.cacheMisses > 0
      ? Math.round((data.cacheHits / (data.cacheHits + data.cacheMisses)) * 100)
      : 100;

  const isLagging = data.isLagging;
  const fpsColor = data.fps >= 55 ? 'text-emerald-400' : data.fps >= 40 ? 'text-amber-400' : 'text-red-400';
  const cacheColor =
    data.cachedFrameCount >= 200
      ? 'text-emerald-400'
      : data.cachedFrameCount >= 100
      ? 'text-amber-400'
      : 'text-red-400';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        fontFamily: '"JetBrains Mono", "Cascadia Code", "Fira Code", monospace',
        fontSize: '11px',
        lineHeight: '1.6',
        width: '360px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(0,0,0,0.92)',
          border: '1px solid rgba(100,150,255,0.3)',
          borderLeft: '3px solid rgb(100,150,255)',
          borderRadius: '8px',
          padding: '12px 14px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ color: 'white', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '10px' }}>
            ◈ CINEMATIC ENGINE HUD
          </span>
          <span style={{ color: isLagging ? '#f59e0b' : '#10b981', fontSize: '10px' }}>
            {isLagging ? '⚠ LAG' : '● LIVE'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {/* Input */}
          <div style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', marginTop: '2px' }}>INPUT</div>
          <Row label="SCROLL PROGRESS" value={data.scrollProgress.toFixed(5)} color="text-blue-300" />
          <Row label="MASTER PROGRESS" value={data.masterProgress.toFixed(5)} color="text-blue-400" />
          <Row label="SCROLL DIRECTION" value={data.direction} color={data.direction === 'DOWN' ? 'text-emerald-400' : data.direction === 'UP' ? 'text-amber-400' : 'text-zinc-400'} />
          <Row label="VELOCITY" value={Math.abs(data.velocity).toFixed(1)} />
          <Row label="SCROLL HEIGHT" value={`${data.scrollHeightVh}vh`} />

          {/* Frames */}
          <div style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', marginTop: '6px' }}>FRAMES</div>
          <Row label="REQUESTED FRAME" value={String(data.requestedFrame).padStart(4, '0')} color="text-blue-300" />
          <Row label="RENDERED FRAME" value={String(data.renderedFrame).padStart(4, '0')} color={data.requestedFrame !== data.renderedFrame ? 'text-amber-400' : 'text-emerald-400'} />
          <Row label="FRAME / TOTAL" value={`${String(data.frameIndex).padStart(4, '0')} / ${data.totalFrames}`} />
          <Row label="STATE" value={data.stateName} color="text-purple-300" />

          {/* Performance */}
          <div style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', marginTop: '6px' }}>PERFORMANCE</div>
          <Row label="FPS" value={`${data.fps} fps`} color={fpsColor} />
          <Row label="DECODE TIME" value={`${data.frameDecodeTimeMs.toFixed(1)} ms`} color={data.frameDecodeTimeMs > 50 ? 'text-amber-400' : 'text-emerald-400'} />
          <Row label="RENDER TIME" value={`${data.frameRenderTimeMs.toFixed(2)} ms`} color={data.frameRenderTimeMs > 16 ? 'text-amber-400' : 'text-emerald-400'} />

          {/* Cache */}
          <div style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', marginTop: '6px' }}>CACHE</div>
          <Row label="CACHED FRAMES" value={`${data.cachedFrameCount} / ${data.totalFrames}`} color={cacheColor} />
          <Row label="CACHE HITS" value={data.cacheHits.toString()} color="text-emerald-400" />
          <Row label="CACHE MISSES" value={data.cacheMisses.toString()} color={data.cacheMisses > 0 ? 'text-amber-400' : 'text-zinc-400'} />
          <Row label="HIT RATE" value={`${hitRate}%`} color={hitRate === 100 ? 'text-emerald-400' : hitRate > 90 ? 'text-amber-400' : 'text-red-400'} />

          {/* Display */}
          <div style={{ color: '#6b7280', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', marginTop: '6px' }}>DISPLAY</div>
          <Row label="DPR" value={data.dpr.toFixed(2)} />
          <Row label="CANVAS SIZE" value={`${data.canvasWidth} × ${data.canvasHeight}`} color="text-blue-300" />
          <Row label="DEVICE CLASS" value={data.deviceMode} />

          {/* Source */}
          <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#4b5563', fontSize: '9px' }}>
            SOURCE: 8K MASTER → LANCZOS → 2560×1440 WEBP
          </div>
        </div>

        <div style={{ marginTop: '6px', color: '#374151', fontSize: '9px', textAlign: 'right' }}>
          [Ctrl+Shift+D] toggle
        </div>
      </div>
    </div>
  );
}
