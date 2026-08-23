'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Cpu, Layers, Workflow, Building2 } from 'lucide-react';
import { Capability } from '@/content/capabilities';
import { cn } from '@/lib/utils';

interface CapabilityCardProps {
  capability: Capability;
  onSelect: (cap: Capability) => void;
}

const icons: Record<string, React.ReactNode> = {
  'ai-intelligence': <Cpu className="w-3.5 h-3.5 text-z-blue-400" />,
  'software-platforms': <Layers className="w-3.5 h-3.5 text-z-blue-400" />,
  'automation-orchestration': <Workflow className="w-3.5 h-3.5 text-z-blue-400" />,
  'business-systems': <Building2 className="w-3.5 h-3.5 text-z-blue-400" />,
};

export default function CapabilityCard({ capability, onSelect }: CapabilityCardProps) {
  return (
    <div
      onClick={() => onSelect(capability)}
      className="z-card light-sweep-container flex flex-col h-full cursor-pointer group overflow-hidden bg-z-surface border-z-border hover:border-z-blue-500/70 transition-all duration-200"
    >
      {/* Visual Image Header */}
      <div className="relative w-full aspect-[16/8] sm:aspect-[16/8.5] bg-z-deep overflow-hidden border-b border-z-border/60 shrink-0">
        <Image
          src={capability.visual}
          alt={capability.title}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            'object-cover group-hover:scale-105 transition-transform duration-300 ease-out',
            capability.focalPoint || 'object-center'
          )}
        />

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Category Number Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-z-black/85 border border-z-border/80 font-mono text-[10px] text-z-blue-300 backdrop-blur-md">
          {icons[capability.id]}
          <span>{capability.number}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-z-blue-400 block mb-1 font-semibold">
            {capability.category}
          </span>

          <h3 className="font-display text-sm sm:text-base font-semibold text-z-white group-hover:text-z-blue-300 transition-colors">
            {capability.title}
          </h3>

          <p className="mt-1.5 text-xs text-z-muted font-body leading-relaxed line-clamp-2">
            {capability.description}
          </p>

          {/* System Flow Pills */}
          {capability.systemFlow && capability.systemFlow.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-z-border/40">
              <span className="font-mono text-[9px] uppercase tracking-widest text-z-dim block mb-1 font-semibold">
                SYSTEM FLOW:
              </span>
              <div className="flex flex-wrap items-center gap-1">
                {capability.systemFlow.slice(0, 3).map((step, idx) => (
                  <React.Fragment key={step}>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-z-surface-2 border border-z-border/70 text-z-blue-300 font-medium">
                      {step}
                    </span>
                    {idx < Math.min(capability.systemFlow.length, 3) - 1 && (
                      <span className="text-[9px] text-z-dim font-mono">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Explore CTA */}
        <div className="mt-4 pt-2.5 border-t border-z-border/40 flex items-center justify-between">
          <span className="font-mono text-[9px] text-z-dim uppercase tracking-wider">
            MATRIX 0{capability.number}
          </span>

          <div className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-z-blue-400 group-hover:text-z-blue-300 font-medium">
            <span>EXPLORE</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
