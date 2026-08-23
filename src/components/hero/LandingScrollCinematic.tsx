'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageContainer from '@/components/layout/PageContainer';
import HeroContent from './HeroContent';
import { CINEMATIC_STAGES } from '@/content/cinematic';
import { cn } from '@/lib/utils';
import { Radio } from 'lucide-react';

interface LandingScrollCinematicProps {
  onOpenProjectModal: () => void;
}

const TOTAL_FRAMES = 240;

export default function LandingScrollCinematic({
  onOpenProjectModal,
}: LandingScrollCinematicProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [progress, setProgress] = useState(0);

  // Preload and cache ultra-high clarity 2560x1440 2K frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/frames/frame_${frameNum}.webp`;
      images.push(img);
    }

    imagesRef.current = images;

    // Draw initial frame 0 once loaded
    images[0].onload = () => {
      drawFrame(0);
    };
  }, []);

  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Set maximum rendering clarity and precision
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate aspect ratio cover
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const renderX = (canvasWidth - renderWidth) / 2;
    const renderY = (canvasHeight - renderHeight) / 2;

    ctx.drawImage(img, renderX, renderY, renderWidth, renderHeight);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      const pinned = pinnedRef.current;
      if (!canvas || !pinned) return;

      const dpr = Math.max(window.devicePixelRatio || 1, 2);
      // Guarantee at least 2560x1440 internal buffer resolution for razor-sharp rendering
      canvas.width = Math.max(2560, pinned.clientWidth * dpr);
      canvas.height = Math.max(1440, pinned.clientHeight * dpr);

      drawFrame(currentFrameRef.current);
    };

    updateCanvasSize();

    // Accelerated, snappy scroll trigger (height 220vh with end +=120% for responsive speed)
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=120%',
      pin: pinnedRef.current,
      scrub: 0.05, // Instantaneous, zero-lag response
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setProgress(p);

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(p * (TOTAL_FRAMES - 1)))
        );

        if (targetFrame !== currentFrameRef.current) {
          currentFrameRef.current = targetFrame;
          drawFrame(targetFrame);
        }
      },
    });

    const handleResize = () => {
      updateCanvasSize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      trigger.kill();
    };
  }, [drawFrame]);

  // Determine current active cinematic stage based on scroll progress
  const currentStage =
    CINEMATIC_STAGES.find(
      (stage) => progress >= stage.range[0] && progress <= stage.range[1]
    ) || CINEMATIC_STAGES[0];

  const progressPercent = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <section
      id="landing"
      ref={containerRef}
      className="relative w-full bg-z-black border-b border-z-border"
      style={{ height: '220vh' }}
    >
      {/* Pinned Viewport Container (Locked to viewport during fast scrub) */}
      <div
        ref={pinnedRef}
        className="sticky top-0 left-0 w-full h-[100vh] h-[100dvh] overflow-hidden bg-z-black flex flex-col justify-between select-none"
      >
        {/* ==========================================
            LAYER 01: 2560x1440 2K HIGH-DEFINITION CANVAS BACKGROUND
            ========================================== */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          style={{
            filter: 'contrast(1.05) brightness(1.02)',
          }}
        />

        {/* ==========================================
            LAYER 02: RESTRAINED READABILITY OVERLAY (PRESERVES 100% VIDEO CLARITY)
            ========================================== */}
        <div className="absolute inset-0 bg-gradient-to-r from-z-black/65 via-z-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-z-black/45 via-transparent to-z-black/55 pointer-events-none" />

        {/* ==========================================
            LAYER 03: FOREGROUND LANDING CONTENT & TELEMETRY HUD
            ========================================== */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-8">
          {/* Top Status & Telemetry Header */}
          <PageContainer className="w-full">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Active Cinematic Phase Readout */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-z-black/75 border border-z-border/80 backdrop-blur-sm shadow-md">
                <span className="w-2 h-2 rounded-full bg-z-blue-400 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs text-z-dim font-bold">
                  PHASE {currentStage.number} //
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-z-blue-300 font-bold tracking-wider">
                  {currentStage.name}
                </span>
              </div>

              {/* Right: Scroll Control Status & Progress Percentage */}
              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-z-black/75 border border-z-border/80 font-mono text-[10px] text-z-muted backdrop-blur-sm">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SCROLL CONTROL</span>
                </div>
                <div className="px-3 py-1 rounded bg-z-black/75 border border-z-blue-500/50 font-mono text-xs text-z-blue-300 font-bold backdrop-blur-sm shadow-[0_0_12px_rgba(20,155,255,0.2)]">
                  {String(progressPercent).padStart(3, '0')}%
                </div>
              </div>
            </div>
          </PageContainer>

          {/* Center: Main Landing Content */}
          <PageContainer className="w-full my-auto">
            <div className="max-w-2xl">
              <HeroContent onOpenProjectModal={onOpenProjectModal} />
            </div>
          </PageContainer>

          {/* Bottom: Milestone Scrub Bar */}
          <PageContainer className="w-full">
            <div className="p-2 sm:p-2.5 rounded bg-z-black/75 border border-z-border/80 backdrop-blur-sm max-w-2xl shadow-lg">
              <div className="relative w-full h-1 bg-z-surface-2 rounded-full overflow-hidden mb-1.5">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-z-blue-600 via-z-blue-400 to-z-blue-300 transition-all duration-75 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-8 gap-1 text-center font-mono text-[8px] sm:text-[9px]">
                {CINEMATIC_STAGES.map((stage) => {
                  const isStageActive =
                    progress >= stage.range[0] && progress <= stage.range[1];
                  const isPassed = progress > stage.range[1];

                  return (
                    <div
                      key={stage.id}
                      className={cn(
                        'py-0.5 rounded transition-colors',
                        isStageActive
                          ? 'text-z-blue-300 font-bold bg-z-blue-500/25 border border-z-blue-500/40'
                          : isPassed
                          ? 'text-z-muted'
                          : 'text-z-dim'
                      )}
                    >
                      <span className="block truncate">{stage.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </PageContainer>
        </div>
      </div>
    </section>
  );
}
