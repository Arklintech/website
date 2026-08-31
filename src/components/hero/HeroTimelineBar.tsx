'use client';

import React from 'react';

export interface ProgressionStage {
  id: string;
  step: string;
  label: string;
  description: string;
}

export const HERO_PROGRESSION_STAGES: ProgressionStage[] = [
  {
    id: 'understand',
    step: '01',
    label: 'UNDERSTAND',
    description: 'We understand the problem',
  },
  {
    id: 'connect',
    step: '02',
    label: 'CONNECT',
    description: 'We connect systems, data and people',
  },
  {
    id: 'orchestrate',
    step: '03',
    label: 'ORCHESTRATE',
    description: 'We orchestrate intelligent workflows',
  },
  {
    id: 'build',
    step: '04',
    label: 'BUILD',
    description: 'We build robust digital systems',
  },
  {
    id: 'execute',
    step: '05',
    label: 'EXECUTE',
    description: 'We deploy, monitor and optimize',
  },
  {
    id: 'evolve',
    step: '06',
    label: 'EVOLVE',
    description: 'The system evolves for long-term impact',
  },
];

interface HeroTimelineBarProps {
  activeStageIndex?: number;
  onSelectStage?: (index: number) => void;
}

export default function HeroTimelineBar({
  activeStageIndex = -1, // Default neutral state
  onSelectStage,
}: HeroTimelineBarProps) {
  return (
    <div className="w-full pt-4 pb-2 relative z-20 border-t border-white/[0.06]">
      {/* 6-Stage Horizontal Progression matching approved blueprint */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
        {HERO_PROGRESSION_STAGES.map((stage, index) => {
          const isActive = activeStageIndex === index;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectStage?.(index)}
              className="group text-left focus:outline-none transition-all flex flex-col items-start cursor-pointer relative"
            >
              {/* Active Indicator Top Accent Bar */}
              <div
                className={`h-[2px] w-full mb-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0066FF] shadow-[0_0_12px_#0066FF]'
                    : 'bg-white/[0.06] group-hover:bg-white/[0.15]'
                }`}
              />

              {/* Step Number & Label */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-mono text-[10px] font-bold tracking-wider transition-colors ${
                    isActive ? 'text-[#0094F2]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                  }`}
                >
                  {stage.step}
                </span>
                <span
                  className={`font-mono text-[11px] font-bold tracking-wider transition-colors uppercase ${
                    isActive ? 'text-white' : 'text-[#94A3B8] group-hover:text-white'
                  }`}
                >
                  {stage.label}
                </span>
              </div>

              {/* Step Subtitle / Description */}
              <p
                className={`text-[10px] font-body leading-tight mt-0.5 transition-colors line-clamp-2 ${
                  isActive
                    ? 'text-[#94A3B8]'
                    : 'text-[#64748B] group-hover:text-[#94A3B8]'
                }`}
              >
                {stage.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
