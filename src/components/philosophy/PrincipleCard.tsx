'use client';

import React from 'react';
import { Network, Cpu, Target, ShieldCheck } from 'lucide-react';
import { Principle } from '@/content/principles';

interface PrincipleCardProps {
  principle: Principle;
}

const icons: Record<string, React.ReactNode> = {
  'Network': <Network className="w-5 h-5 text-z-blue-400" />,
  'Cpu': <Cpu className="w-5 h-5 text-z-blue-400" />,
  'Target': <Target className="w-5 h-5 text-z-blue-400" />,
  'ShieldCheck': <ShieldCheck className="w-5 h-5 text-z-blue-400" />,
};

export default function PrincipleCard({ principle }: PrincipleCardProps) {
  return (
    <div className="z-card light-sweep-container p-5 sm:p-6 flex flex-col justify-between h-full bg-z-surface border-z-border hover:border-z-blue-500/70 transition-all">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="p-2 rounded bg-z-surface-2 border border-z-border">
            {icons[principle.icon]}
          </div>
          <span className="font-mono text-xs text-z-dim font-semibold">
            {principle.number}
          </span>
        </div>

        <h4 className="font-display text-base font-semibold text-z-white mb-1">
          {principle.title}
        </h4>

        <div className="font-mono text-[10px] text-z-blue-400 mb-2">
          {principle.tagline}
        </div>

        <p className="text-xs sm:text-sm text-z-muted font-body leading-relaxed">
          {principle.description}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-z-border/40 font-mono text-[10px] text-z-dim leading-normal">
        {principle.details}
      </div>
    </div>
  );
}
