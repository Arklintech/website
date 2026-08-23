'use client';

import React, { useState, useEffect } from 'react';
import { Diagnostics3DMetrics } from './Cinematic3DTypes';

interface Cinematic3DDiagnosticsHUDProps {
  metrics: Diagnostics3DMetrics;
}

export default function Cinematic3DDiagnosticsHUD({ metrics }: Cinematic3DDiagnosticsHUDProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('debug') === '1' || localStorage.getItem('cinematic_debug') === '1') {
        setVisible(true);
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
          setVisible((prev) => {
            const next = !prev;
            if (next) localStorage.setItem('cinematic_debug', '1');
            else localStorage.removeItem('cinematic_debug');
            return next;
          });
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] bg-z-black/90 border border-z-border p-4 rounded-lg backdrop-blur-xl shadow-2xl font-mono text-[11px] text-z-text min-w-[280px] pointer-events-none select-none border-l-4 border-l-z-blue-400">
      <div className="flex items-center justify-between border-b border-z-border/60 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-z-white uppercase tracking-wider">3D WEBGL ENGINE HUD</span>
        </div>
        <span className="text-[9px] text-z-dim">[Ctrl+Shift+D]</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-z-dim">SCROLL PROGRESS:</span>
          <span className="text-z-blue-300 font-bold">{metrics.progress.toFixed(4)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-z-dim">SYSTEM STATE:</span>
          <span className="text-z-amber font-bold">{metrics.stateName}</span>
        </div>

        <div className="flex justify-between border-t border-z-border/40 pt-1">
          <span className="text-z-dim">FPS / REFRESH:</span>
          <span className={metrics.fps < 45 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
            {metrics.fps} FPS
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-z-dim">CAMERA FOV / DIST:</span>
          <span className="text-z-white">
            {metrics.fov.toFixed(1)}° / {metrics.cameraZ.toFixed(2)}m
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-z-dim">DEVICE / DPR:</span>
          <span className="text-z-white">
            {metrics.deviceTier} (DPR {metrics.dpr.toFixed(2)})
          </span>
        </div>

        <div className="flex justify-between border-t border-z-border/40 pt-1">
          <span className="text-z-dim">PARTICLES ACTIVE:</span>
          <span className="text-z-blue-300">{metrics.particleCount} GPU POINTS</span>
        </div>

        <div className="flex justify-between">
          <span className="text-z-dim">PIPELINE:</span>
          <span className="text-emerald-400 font-semibold">THREE.JS / WEBGL 2.0</span>
        </div>
      </div>
    </div>
  );
}
