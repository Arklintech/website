'use client';

import React from 'react';
import { MORPH_CHECKPOINTS } from './ParticleMorphHeroCanvas';

interface HeroMatrixPanelProps {
  activeStageIndex: number;
}

export default function HeroMatrixPanel({ activeStageIndex }: HeroMatrixPanelProps) {
  const stageNum = activeStageIndex + 1;
  const progressPercent = (stageNum / 6) * 100;
  const currentCheckpoint = MORPH_CHECKPOINTS[activeStageIndex] || MORPH_CHECKPOINTS[0];

  return (
    <div className="w-full max-w-[260px] sm:max-w-[280px] p-5 sm:p-6 rounded-xl bg-z-black/75 backdrop-blur-xl border border-z-border/80 shadow-[0_0_40px_rgba(2,4,7,0.8)] text-left space-y-4">
      {/* 3-Line Mission Statement */}
      <div className="space-y-0.5 font-display font-bold text-sm sm:text-base text-z-white uppercase tracking-wider leading-tight">
        <div>ONE MACHINE</div>
        <div>ONE JOURNEY</div>
        <div className="text-z-blue-400">ONE PURPOSE</div>
      </div>

      {/* Subtext */}
      <p className="text-xs text-z-muted font-body leading-relaxed">
        Building the future of <br />
        intelligent operations.
      </p>

      {/* Progress Bar & Stage Indicator */}
      <div className="pt-2 space-y-2">
        <div className="w-full h-1 bg-z-surface-2 rounded-full overflow-hidden border border-z-border/50">
          <div
            className="h-full bg-gradient-to-r from-z-blue-500 to-z-cyan-400 transition-all duration-300 shadow-[0_0_8px_#00E5FF]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between font-mono text-[11px] text-z-dim">
          <span className="text-z-cyan-300 font-semibold uppercase">
            {currentCheckpoint.label}
          </span>
          <span className="font-bold text-z-white">
            0{stageNum} / 06
          </span>
        </div>
      </div>
    </div>
  );
}
