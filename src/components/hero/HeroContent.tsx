'use client';

import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import TelemetryTicker from './TelemetryTicker';

interface HeroContentProps {
  onOpenProjectModal: () => void;
}

export default function HeroContent({ onOpenProjectModal }: HeroContentProps) {
  return (
    <div className="flex flex-col justify-center max-w-2xl">
      {/* 01 Section Tag & Eyebrow */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <span className="font-mono text-xs font-semibold tracking-wider text-z-blue-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2/80">
          01
        </span>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-z-blue-500/30 bg-z-blue-900/40 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-z-blue-400 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-z-blue-300 uppercase">
            CORE CAPABILITIES
          </span>
        </div>
      </div>

      {/* Main Headline in Space Grotesk */}
      <h1 className="text-display-xl font-display font-medium text-z-white uppercase tracking-tight">
        BUILD WHAT <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-z-white via-z-text to-z-blue-300">
          DOESN&apos;T EXIST.
        </span>
      </h1>

      {/* Supporting Narrative using User's Exact Specification */}
      <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-z-muted font-body leading-relaxed max-w-xl">
        We architect intelligent systems, automate complex operations, and build software that drives real outcomes across four core engineering disciplines.
      </p>

      {/* Primary & Secondary Action CTAs */}
      <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
        <button
          onClick={onOpenProjectModal}
          className="z-btn-primary group text-xs sm:text-sm py-3 px-6"
        >
          <span>START A PROJECT</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        <a
          href="#capabilities"
          className="z-btn-secondary text-xs sm:text-sm py-3 px-6 flex items-center gap-2 group backdrop-blur-md bg-z-surface/60"
        >
          <span>EXPLORE THE SYSTEM</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 text-z-dim group-hover:text-z-blue-400" />
        </a>
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="mt-8 sm:mt-12 pt-4 border-t border-z-border/40 max-w-xl">
        <TelemetryTicker />
      </div>
    </div>
  );
}
