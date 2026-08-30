'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { SYSTEMS_LIBRARY } from '@/content/systemsLibrary';
import { ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function SystemsLibraryPage() {
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
                  06
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-z-blue-400 font-semibold">
                  TECHNICAL REFERENCE
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                SYSTEMS LIBRARY
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                A technical repository of reusable system concepts, architectural building blocks, and execution primitives that power <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> implementations.
              </p>
            </div>

            {/* 8 System Concepts Grid */}
            <div className="space-y-8">
              {SYSTEMS_LIBRARY.map((concept) => (
                <div
                  key={concept.id}
                  id={concept.id}
                  className="bg-z-surface border border-z-border rounded-lg p-6 sm:p-8 space-y-5 scroll-mt-28"
                >
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-z-border/80">
                    <div>
                      <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-widest block mb-0.5">
                        {concept.number} • SYSTEM CONCEPT
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-z-white uppercase">
                        {concept.name}
                      </h2>
                    </div>
                    <span className="text-xs sm:text-sm text-z-blue-200 font-mono">
                      {concept.tagline}
                    </span>
                  </div>

                  {/* 4 Core Dimensions: What, Why, How, Where */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* WHAT IT IS */}
                    <div className="p-4 rounded bg-z-surface-2 border border-z-border space-y-1.5">
                      <span className="font-mono text-[10px] text-z-cyan-400 uppercase font-bold block">
                        WHAT IT IS
                      </span>
                      <p className="text-xs text-z-text font-body leading-relaxed">
                        {concept.whatItIs}
                      </p>
                    </div>

                    {/* WHY IT MATTERS */}
                    <div className="p-4 rounded bg-z-surface-2 border border-z-border space-y-1.5">
                      <span className="font-mono text-[10px] text-z-blue-400 uppercase font-bold block">
                        WHY IT MATTERS
                      </span>
                      <p className="text-xs text-z-text font-body leading-relaxed">
                        {concept.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* HOW IT WORKS */}
                  <div className="p-4 rounded bg-z-surface-2/70 border border-z-border space-y-1.5">
                    <span className="font-mono text-[10px] text-z-white uppercase font-bold block">
                      HOW IT WORKS & EXECUTES
                    </span>
                    <p className="text-xs text-z-muted font-body leading-relaxed">
                      {concept.howItWorks}
                    </p>
                  </div>

                  {/* WHERE IT APPLIES & RELATIONSHIPS */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px]">
                    <div>
                      <span className="text-z-dim uppercase block mb-1">WHERE IT APPLIES:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {concept.whereItApplies.map((app) => (
                          <span key={app} className="bg-z-surface-2 px-2 py-0.5 rounded border border-z-border text-z-blue-200">
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-z-dim">RELATED:</span>
                      {concept.relatedProjects.map((rp) => (
                        <Link
                          key={rp}
                          href={`/work/${rp}`}
                          className="text-z-cyan-400 hover:text-z-white transition-colors font-semibold"
                        >
                          {rp.toUpperCase()} →
                        </Link>
                      ))}
                    </div>
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
