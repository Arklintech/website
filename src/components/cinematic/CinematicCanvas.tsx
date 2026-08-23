'use client';

import React, { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { CinematicFrameLoader } from './CinematicFrameLoader';
import { resolveResponsiveComposition } from './CinematicResponsiveConfig';
import { ResponsiveComposition } from './cinematic-types';

export interface CinematicCanvasRef {
  renderFrame: (frameIndex: number) => void;
  updateDimensions: () => ResponsiveComposition;
  getCanvas: () => HTMLCanvasElement | null;
  getLastRenderedIndex: () => number;
  getLastRenderTimeMs: () => number;
}

interface CinematicCanvasProps {
  frameLoader: CinematicFrameLoader;
  onCompositionUpdated?: (comp: ResponsiveComposition) => void;
}

/**
 * ZAQVORO Cinematic Canvas Renderer
 *
 * Design:
 * - Internal buffer = CSS size × DPR (capped at 2.5 on mobile, 3.0 on HiDPI desktop)
 * - Source image (2560×1440 WebP from 8K master) drawn with cover-fit
 * - All coordinates integer-aligned — eliminates subpixel fractional blur
 * - RENDER GUARD: redraws only when frameIndex changes
 * - No clearRect before draw — eliminates 1-frame blank flash on pause
 * - imageSmoothingQuality 'high' for best downscaling
 * - No CSS filters on canvas element
 */
const CinematicCanvas = forwardRef<CinematicCanvasRef, CinematicCanvasProps>(
  ({ frameLoader, onCompositionUpdated }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const compRef = useRef<ResponsiveComposition | null>(null);
    const lastRenderedIndexRef = useRef<number>(-1);
    const lastRenderTimeMsRef = useRef<number>(0);
    const rafResizeRef = useRef<number | null>(null);

    // ── Dimension Updater ────────────────────────────────────────────────────
    const updateDimensions = useCallback((): ResponsiveComposition => {
      const canvas = canvasRef.current;
      const el = canvas?.parentElement;

      const cssWidth = Math.max(320, el?.clientWidth || window.innerWidth);
      const cssHeight = Math.max(240, el?.clientHeight || window.innerHeight);
      const rawDpr = window.devicePixelRatio || 1;

      const comp = resolveResponsiveComposition(cssWidth, cssHeight, rawDpr);
      compRef.current = comp;

      // Physical pixel buffer — exact integer match to device pixels
      const renderW = Math.round(cssWidth * comp.dpr);
      const renderH = Math.round(cssHeight * comp.dpr);

      if (canvas && (canvas.width !== renderW || canvas.height !== renderH)) {
        canvas.width = renderW;
        canvas.height = renderH;
        // Reset last rendered so we force a redraw on next render call
        lastRenderedIndexRef.current = -1;
      }

      onCompositionUpdated?.(comp);
      return comp;
    }, [onCompositionUpdated]);

    // ── Core Renderer ────────────────────────────────────────────────────────
    const renderFrame = useCallback((frameIndex: number): void => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = frameLoader.getFrame(frameIndex);
      if (!img) return;

      const t0 = performance.now();

      const ctx = canvas.getContext('2d', {
        alpha: false,           // Opaque composite — zero compositor overhead
        willReadFrequently: false,
        desynchronized: false,  // Sync to display refresh — prevents tearing
      });
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Source native dimensions
      let srcW: number;
      let srcH: number;
      if (img instanceof ImageBitmap) {
        srcW = img.width;
        srcH = img.height;
      } else {
        srcW = (img as HTMLImageElement).naturalWidth || 2560;
        srcH = (img as HTMLImageElement).naturalHeight || 1440;
      }

      const comp = compRef.current ?? resolveResponsiveComposition(canvasW, canvasH, 1);

      // Cover-fit: scale to fill entire canvas
      const coverScale = Math.max(canvasW / srcW, canvasH / srcH) * comp.scaleModifier;
      const drawW = Math.round(srcW * coverScale);
      const drawH = Math.round(srcH * coverScale);

      // Focal-point placement with integer alignment (no subpixel blur)
      const drawX = Math.round((canvasW - drawW) * comp.focalPoint.x);
      const drawY = Math.round((canvasH - drawH) * comp.focalPoint.y);

      // Draw over previous buffer — no clearRect prevents 1-frame blank flash
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      lastRenderedIndexRef.current = frameIndex;
      lastRenderTimeMsRef.current = performance.now() - t0;
    }, [frameLoader]);

    // ── Imperative Handle ────────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({
      renderFrame,
      updateDimensions,
      getCanvas: () => canvasRef.current,
      getLastRenderedIndex: () => lastRenderedIndexRef.current,
      getLastRenderTimeMs: () => lastRenderTimeMsRef.current,
    }));

    // ── Mount / Resize ───────────────────────────────────────────────────────
    useEffect(() => {
      updateDimensions();
      renderFrame(0);

      const handleResize = () => {
        if (rafResizeRef.current !== null) cancelAnimationFrame(rafResizeRef.current);
        rafResizeRef.current = requestAnimationFrame(() => {
          updateDimensions();
          const idx = lastRenderedIndexRef.current;
          if (idx >= 0) renderFrame(idx);
          rafResizeRef.current = null;
        });
      };

      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleResize, { passive: true });
      return () => {
        if (rafResizeRef.current !== null) cancelAnimationFrame(rafResizeRef.current);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      };
    }, [updateDimensions, renderFrame]);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          // 'auto' lets the browser use its best resampling when CSS-scaling
          imageRendering: 'auto',
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'block',
          // No CSS filters — all quality comes from the prepared 2560×1440 WebP asset
        }}
      />
    );
  }
);

CinematicCanvas.displayName = 'CinematicCanvas';
export default CinematicCanvas;
