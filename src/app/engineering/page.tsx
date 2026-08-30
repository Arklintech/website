'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { PROCESS_STEPS } from '@/content/process';
import { ABOUT_CONTENT } from '@/content/about';
import { ArrowRight, CheckCircle2, Terminal, ShieldCheck, Layers, Cpu, Network } from 'lucide-react';

export default function EngineeringPage() {
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
                  05
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-z-blue-400 font-semibold">
                  ENGINEERING METHODOLOGY
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                ENGINEERING AT <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                We believe in deterministic architecture, strict boundary enforcement, and mathematical verification. Our 6-stage engineering process ensures every system is built to scale reliably without operational disruption.
              </p>
            </div>

            {/* 6-Stage Process Walkthrough */}
            <div className="space-y-6 mb-16">
              <div className="font-mono text-xs font-bold text-z-white uppercase tracking-widest pb-3 border-b border-z-border">
                THE 6-STAGE DETERMINISTIC METHODOLOGY
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROCESS_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="p-6 rounded-lg bg-z-surface border border-z-border space-y-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-z-border/60">
                        <span className="font-mono text-xs font-bold text-z-cyan-400">
                          {step.number} — {step.title}
                        </span>
                        <span className="font-mono text-[9px] text-z-dim uppercase">GATE {step.number}</span>
                      </div>
                      <div className="font-semibold text-z-white text-sm mt-2">
                        {step.tagline}
                      </div>
                      <p className="text-xs text-z-muted font-body mt-1.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-z-border/50 text-[11px] font-mono">
                      <div>
                        <span className="text-[9px] text-z-dim uppercase block">INPUTS:</span>
                        <div className="text-z-blue-200">{step.inputs.join(' • ')}</div>
                      </div>
                      <div>
                        <span className="text-[9px] text-z-dim uppercase block">DELIVERABLES:</span>
                        <div className="text-z-cyan-300 font-semibold">{step.outputs.join(' • ')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Principles */}
            <div className="bg-z-surface border border-z-border rounded-lg p-6 sm:p-8 md:p-10 space-y-6 mb-12">
              <div className="flex items-center justify-between pb-3 border-b border-z-border/80">
                <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  CORE ARCHITECTURAL PRINCIPLES
                </span>
                <span className="font-mono text-[9px] text-z-dim uppercase">HOW WE THINK & BUILD</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ABOUT_CONTENT.engineeringPrinciples.map((prin) => (
                  <div key={prin.number} className="p-5 rounded bg-z-surface-2 border border-z-border space-y-2">
                    <div className="flex items-center gap-2 font-mono text-xs text-z-cyan-400 font-bold">
                      <span>{prin.number}</span>
                      <span>•</span>
                      <span>{prin.title}</span>
                    </div>
                    <p className="text-xs text-z-text font-body leading-relaxed">
                      {prin.description}
                    </p>
                    <div className="pt-2 font-mono text-[10px] text-z-dim">
                      <span className="text-z-blue-300">RULE:</span> {prin.rule}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Bar */}
            <div className="p-6 rounded-lg bg-z-surface-2 border border-z-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-display font-semibold text-base text-z-white uppercase">
                  READY TO ENGAGE OUR SYSTEMS ARCHITECTS?
                </div>
                <div className="text-xs text-z-muted font-body mt-0.5">
                  Discuss constraints, legacy integrations, and platform specifications.
                </div>
              </div>

              <button
                onClick={onOpenProjectModal}
                className="z-btn-primary text-xs py-3 px-6 whitespace-nowrap"
              >
                <span>START A SYSTEM</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
