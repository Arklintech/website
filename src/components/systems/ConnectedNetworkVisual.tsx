'use client';

import React from 'react';
import Image from 'next/image';
import { Network } from 'lucide-react';
import { SYSTEMS_OVERVIEW } from '@/content/systems';

export default function ConnectedNetworkVisual() {
  return (
    <div className="relative w-full min-h-[340px] sm:min-h-[380px] md:min-h-[420px] rounded-lg overflow-hidden border border-z-border bg-z-surface group shadow-[0_0_50px_rgba(8,120,201,0.2)] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
      {/* Primary Connected Network Visual Asset */}
      <Image
        src={SYSTEMS_OVERVIEW.visual}
        alt="ARKLINTECH Connected Network - One Unified Intelligence Fabric"
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1440px"
        className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out z-0"
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-z-black/95 via-z-black/60 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-z-black/90 via-transparent to-transparent z-0 pointer-events-none" />

      {/* Embedded Systems Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between h-full flex-grow max-w-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-z-black/80 border border-z-border font-mono text-[10px] sm:text-xs text-z-blue-400 backdrop-blur-md self-start mb-6">
          <Network className="w-3.5 h-3.5" />
          <span>{SYSTEMS_OVERVIEW.eyebrow}</span>
        </div>

        <div>
          <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-medium text-z-white uppercase tracking-tight">
            {SYSTEMS_OVERVIEW.headline}
          </h3>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-z-text font-body leading-relaxed max-w-xl">
            {SYSTEMS_OVERVIEW.subheading}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2">
            {SYSTEMS_OVERVIEW.macroFlow.map((item, idx) => (
              <React.Fragment key={item}>
                <span className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-z-blue-950/80 border border-z-blue-500/40 text-z-blue-300 font-medium">
                  {item}
                </span>
                {idx < SYSTEMS_OVERVIEW.macroFlow.length - 1 && (
                  <span className="text-[9px] text-z-dim font-mono">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
