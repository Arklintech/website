'use client';

import React from 'react';
import Image from 'next/image';
import { UserCheck } from 'lucide-react';
import { HUMAN_TECH_STATEMENT } from '@/content/principles';
import { cn } from '@/lib/utils';

export default function HumanTechBanner() {
  return (
    <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:min-h-[400px] rounded-lg overflow-hidden border border-z-border bg-z-surface group shadow-[0_0_50px_rgba(8,120,201,0.2)] mb-8 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
      {/* Visual Asset 14: Human + Technology */}
      <Image
        src={HUMAN_TECH_STATEMENT.visual}
        alt="Human + Technology Philosophy"
        fill
        loading="lazy"
        sizes="100vw"
        className={cn(
          'object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out z-0',
          HUMAN_TECH_STATEMENT.focalPoint || 'object-center'
        )}
      />

      {/* Atmospheric Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-z-black/95 via-z-black/65 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-z-black/85 via-transparent to-transparent z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between h-full flex-grow max-w-2xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-z-black/80 border border-z-border font-mono text-[10px] sm:text-xs text-z-blue-400 backdrop-blur-md self-start mb-6">
          <UserCheck className="w-3.5 h-3.5" />
          <span>{HUMAN_TECH_STATEMENT.category}</span>
        </div>

        <div>
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-z-white uppercase tracking-tight">
            {HUMAN_TECH_STATEMENT.title}
          </h3>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-z-text font-body leading-relaxed max-w-xl">
            {HUMAN_TECH_STATEMENT.headline}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
            {HUMAN_TECH_STATEMENT.vocabulary.slice(0, 4).map((vocab) => (
              <span
                key={vocab}
                className="font-mono text-[9px] sm:text-[10px] px-2 py-0.5 rounded bg-z-blue-950/80 border border-z-blue-500/40 text-z-blue-300 font-medium"
              >
                {vocab}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
