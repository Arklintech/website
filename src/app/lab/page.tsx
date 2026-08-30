'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { LAB_EXPERIMENTS, LabStatus } from '@/content/lab';
import { ArrowRight, FlaskConical, Sparkles, Terminal } from 'lucide-react';

export default function LabPage() {
  const getStatusBadge = (status: LabStatus) => {
    switch (status) {
      case 'IN DEVELOPMENT':
        return 'bg-z-blue-900/80 text-z-cyan-300 border-z-blue-400';
      case 'PROTOTYPE':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/50';
      case 'CONCEPT':
        return 'bg-z-surface-2 text-z-blue-200 border-z-border';
      case 'EXPLORING':
        return 'bg-z-surface-2 text-z-muted border-z-border';
      default:
        return 'bg-z-surface-2 text-z-muted border-z-border';
    }
  };

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Page Header */}
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-z-cyan-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2">
                  07
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-z-blue-400 font-semibold">
                  R&D & INNOVATION
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> LAB
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                The future-facing engineering layer. We explore emerging protocols, autonomous agents, and hardware-accelerated edge inference with honest, clear state labels.
              </p>
            </div>

            {/* Lab Experiments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LAB_EXPERIMENTS.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 sm:p-7 rounded-lg bg-z-surface border border-z-border space-y-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-z-border/70">
                      <span className="font-mono text-[10px] font-bold text-z-cyan-400 uppercase">
                        {exp.number} • {exp.category}
                      </span>
                      <span
                        className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getStatusBadge(
                          exp.status
                        )}`}
                      >
                        {exp.status}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-display font-bold text-z-white uppercase mt-3">
                      {exp.name}
                    </h2>
                    <p className="text-xs text-z-blue-200 font-mono mt-1">
                      {exp.tagline}
                    </p>

                    <p className="text-xs text-z-text font-body mt-3 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mt-4 p-3 rounded bg-z-surface-2 border border-z-border space-y-1">
                      <span className="font-mono text-[9px] text-z-dim uppercase font-semibold block">
                        TECHNICAL THESIS:
                      </span>
                      <p className="text-xs text-z-muted font-body leading-relaxed">
                        {exp.technicalThesis}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-z-border/50 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px]">
                    <div className="flex flex-wrap gap-1 text-z-dim">
                      {exp.tags.map((t) => (
                        <span key={t} className="bg-z-surface-2 px-1.5 py-0.5 rounded border border-z-border/40 text-z-blue-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="text-z-dim">{exp.explorationStage}</span>
                  </div>
                </div>
              ))}
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
