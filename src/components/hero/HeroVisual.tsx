'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] mx-auto flex items-center justify-center will-change-transform">
      {/* Ambient Blue & Amber Energy Atmosphere */}
      <div className="absolute inset-0 rounded-full bg-radial from-z-blue-500/25 via-z-blue-900/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute w-3/4 h-3/4 rounded-full bg-radial from-z-amber/15 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* Rotating Precision Mechanical HUD Rings */}
      <div className="absolute inset-2 sm:inset-4 rounded-full border border-z-blue-400/15 pointer-events-none animate-spin-slow" />
      <div className="absolute inset-8 sm:inset-12 rounded-full border border-dashed border-z-blue-500/20 pointer-events-none" />
      <div className="absolute inset-16 sm:inset-20 rounded-full border border-z-amber/15 pointer-events-none" />

      {/* Main Z-Core Mechanical Target */}
      <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center p-2 sm:p-3">
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(8,120,201,0.35)] border border-z-border/80">
          <Image
            src="/visuals/zaqvoro/hero-zcore.webp"
            alt="ZAQVORO Core - Advanced Intelligent System Target"
            fill
            priority
            sizes="(max-width: 640px) 260px, (max-width: 1024px) 420px, 540px"
            className="object-cover object-center scale-100 hover:scale-[1.02] transition-transform duration-500 ease-out"
          />

          {/* Environmental Dark Vignette Blend on the Core Perimeter */}
          <div className="absolute inset-0 bg-radial from-transparent via-z-black/10 to-z-black/55 pointer-events-none" />
        </div>
      </div>

      {/* Technical HUD Corner Targeting Brackets */}
      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-l-2 border-z-blue-400/50 pointer-events-none" />
      <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-3 sm:w-4 h-3 sm:h-4 border-t-2 border-r-2 border-z-blue-400/50 pointer-events-none" />
      <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-l-2 border-z-blue-400/50 pointer-events-none" />
      <div className="absolute bottom-1 sm:bottom-2 right-1 sm:right-2 w-3 sm:w-4 h-3 sm:h-4 border-b-2 border-r-2 border-z-blue-400/50 pointer-events-none" />

      {/* Future 3D Living Machine Container Hook */}
      <div id="living-machine-container" className="hidden" aria-hidden="true" />
    </div>
  );
}
