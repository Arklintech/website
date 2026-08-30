'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { CAPABILITIES } from '@/content/capabilities';
import { ArrowRight, CheckCircle2, Activity, ArrowLeft } from 'lucide-react';

interface CapabilityDetailPageProps {
  params: { slug: string };
}

export default function CapabilityDetailPage({ params }: CapabilityDetailPageProps) {
  const slug = params?.slug || '';
  const cap = CAPABILITIES.find((c) => c.id === slug);
  const [disclosureLevel, setDisclosureLevel] = useState<'business' | 'system' | 'engineering'>('business');

  if (!cap) {
    return notFound();
  }

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Back to Overview */}
            <div className="mb-6">
              <Link
                href="/what-we-do"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-z-muted hover:text-z-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL CAPABILITIES</span>
              </Link>
            </div>

            {/* Capability Deep Dive Card */}
            <div className="bg-z-surface border border-z-border rounded-xl p-6 sm:p-8 md:p-10 space-y-8">
              {/* Header Row */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-z-border/80">
                <div>
                  <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-widest block mb-1">
                    {cap.number} — {cap.category}
                  </span>
                  <h1 className="text-display-m font-display font-bold text-z-white uppercase">
                    {cap.title}
                  </h1>
                  <p className="text-sm sm:text-base text-z-blue-200 font-medium mt-1">
                    {cap.subheading}
                  </p>
                </div>

                {/* Progressive Disclosure Switcher */}
                <div className="flex items-center gap-1.5 p-1.5 rounded bg-z-surface-2 border border-z-border font-mono text-xs">
                  {(['business', 'system', 'engineering'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDisclosureLevel(lvl)}
                      className={`px-3 py-1 rounded uppercase font-semibold text-[11px] transition-colors ${
                        disclosureLevel === lvl
                          ? 'bg-z-blue-900/90 text-z-cyan-300 border border-z-blue-500/60 shadow-[0_0_12px_rgba(21,155,215,0.25)]'
                          : 'text-z-muted hover:text-z-white'
                      }`}
                    >
                      {lvl} View
                    </button>
                  ))}
                </div>
              </div>

              {/* System Flow Visualization Bar */}
              <div className="p-4 rounded bg-z-surface-2 border border-z-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-z-dim font-semibold">
                  SYSTEM EXECUTION FLOW:
                </span>
                <div className="font-mono text-xs font-bold text-z-cyan-300 tracking-wider flex flex-wrap items-center gap-2">
                  {cap.systemFlow.map((node, i) => (
                    <React.Fragment key={i}>
                      <span className="bg-z-blue-900/70 px-2.5 py-1 rounded border border-z-blue-500/40 text-z-white">
                        {node}
                      </span>
                      {i < cap.systemFlow.length - 1 && (
                        <span className="text-z-blue-400">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Dynamic Content by Disclosure Level */}
              {disclosureLevel === 'business' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-150">
                  <div className="space-y-4">
                    <div className="font-mono text-xs font-bold text-z-white uppercase tracking-wider">
                      POSITIONING & BUSINESS IMPACT
                    </div>
                    <p className="text-sm text-z-text font-body leading-relaxed">
                      {cap.description}
                    </p>
                    <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-1">
                      <span className="font-mono text-[10px] text-z-cyan-400 uppercase font-semibold block">
                        PROBLEM SOLVED:
                      </span>
                      <p className="text-xs text-z-muted leading-relaxed font-body">
                        {cap.businessView.problemSolved}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="font-mono text-xs font-bold text-z-white uppercase tracking-wider">
                      KEY DELIVERABLES
                    </div>
                    <div className="space-y-2">
                      {cap.businessView.keyDeliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 rounded bg-z-surface-2 border border-z-border text-xs text-z-white font-body">
                          <CheckCircle2 className="w-4 h-4 text-z-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {disclosureLevel === 'system' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-150">
                  <div className="space-y-4">
                    <div className="font-mono text-xs font-bold text-z-white uppercase tracking-wider">
                      SYSTEM ROLE & ARCHITECTURE
                    </div>
                    <p className="text-sm text-z-text font-body leading-relaxed">
                      {cap.systemView.systemRole}
                    </p>
                    <p className="text-xs text-z-muted font-body leading-relaxed">
                      {cap.systemView.architectureOverview}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="font-mono text-xs font-bold text-z-white uppercase tracking-wider">
                      DISTRIBUTED SYSTEM NODES
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                      {cap.systemView.systemNodes.map((node, i) => (
                        <div key={i} className="p-3 rounded bg-z-surface-2 border border-z-border text-z-cyan-300 font-semibold">
                          {node}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {disclosureLevel === 'engineering' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-150 font-mono text-xs">
                  <div className="space-y-4">
                    <div className="font-bold text-z-white uppercase tracking-wider">
                      TECHNOLOGY STACK & PROTOCOLS
                    </div>
                    <div>
                      <span className="text-[10px] text-z-dim uppercase block mb-1">CORE STACK:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.engineeringView.stackAndIntegrations.map((st) => (
                          <span key={st} className="px-2 py-0.5 rounded bg-z-surface-2 border border-z-border text-z-blue-300">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-z-dim uppercase block mb-1">SCHEMAS & PROTOCOLS:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.engineeringView.contractsAndProtocols.map((cp) => (
                          <span key={cp} className="px-2 py-0.5 rounded bg-z-surface-2 border border-z-border text-z-text">
                            {cp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="font-bold text-z-white uppercase tracking-wider">
                      SECURITY & OBSERVABILITY
                    </div>
                    <div className="p-3 rounded bg-z-surface-2 border border-z-border text-[11px] text-z-muted leading-relaxed">
                      {cap.engineeringView.securityAndReliability}
                    </div>

                    <div className="space-y-1">
                      {cap.engineeringView.observabilityMetrics.map((om, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                          <Activity className="w-3.5 h-3.5" />
                          <span>{om}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Vocabulary Footer */}
              <div className="pt-6 border-t border-z-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-z-dim uppercase">TECHNICAL VOCABULARY:</span>
                  {cap.technicalVocabulary.map((v) => (
                    <span key={v} className="bg-z-surface-2 px-2 py-0.5 rounded border border-z-border text-z-blue-300 font-semibold">
                      {v}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenProjectModal}
                  className="z-btn-primary text-xs py-2.5 px-5 self-start sm:self-auto"
                >
                  <span>ARCHITECT THIS CAPABILITY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
