'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { INDUSTRIES } from '@/content/industries';
import { ArrowLeft, ArrowRight, ShoppingBag, GraduationCap, UtensilsCrossed, HeartPulse, Globe, CheckCircle2 } from 'lucide-react';

interface IndustryDetailPageProps {
  params: { slug: string };
}

export default function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const slug = params?.slug || '';
  const ind = INDUSTRIES.find((i) => i.id === slug);

  if (!ind) {
    return notFound();
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-z-cyan-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-z-blue-400" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-z-cyan-300" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-z-blue-300" />;
      case 'Globe': return <Globe className="w-6 h-6 text-z-cyan-400" />;
      default: return <ShoppingBag className="w-6 h-6 text-z-cyan-400" />;
    }
  };

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Back to All Industries */}
            <div className="mb-6">
              <Link
                href="/industries"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-z-muted hover:text-z-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL INDUSTRIES</span>
              </Link>
            </div>

            {/* Industry Deep Dive Card */}
            <div className="bg-z-surface border border-z-border rounded-xl p-6 sm:p-8 md:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-z-border/80">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-z-surface-2 border border-z-border">
                    {getIcon(ind.iconName)}
                  </div>
                  <div>
                    <h1 className="text-display-m font-display font-bold text-z-white uppercase">
                      {ind.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-z-cyan-300 font-mono mt-1">
                      {ind.tagline}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/work/${ind.realWorkId}`}
                  className="font-mono text-xs text-z-blue-400 hover:text-z-cyan-300 flex items-center gap-1 font-semibold group self-start sm:self-auto"
                >
                  <span>RELEVANT SYSTEM: {ind.realWorkName}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Context & Challenges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-1.5">
                    <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-widest block">
                      INDUSTRY CONTEXT
                    </span>
                    <p className="text-sm text-z-text font-body leading-relaxed">
                      {ind.context}
                    </p>
                  </div>

                  <div className="pt-2 font-mono text-xs text-z-dim flex flex-wrap gap-1.5 items-center">
                    <span className="text-z-muted">RELEVANT CAPABILITIES:</span>
                    {ind.capabilities.map((c) => (
                      <span key={c} className="bg-z-surface-2 px-2 py-0.5 rounded border border-z-border text-z-blue-300 font-semibold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-2">
                    <span className="font-mono text-xs font-bold text-z-blue-400 uppercase tracking-widest block">
                      CORE DOMAIN CHALLENGES
                    </span>
                    <div className="space-y-1.5">
                      {ind.challenges.map((ch, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-z-muted font-body">
                          <span className="text-z-cyan-400 font-mono">▸</span>
                          <span>{ch}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineered Solutions */}
              <div className="pt-4 border-t border-z-border/60">
                <span className="font-mono text-xs font-bold text-z-white uppercase tracking-widest block mb-3">
                  PROVEN SYSTEM SOLUTIONS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ind.solutions.map((sol, i) => (
                    <div key={i} className="p-3.5 rounded bg-z-surface-2 border border-z-border flex items-start gap-2 text-xs font-mono text-z-text">
                      <CheckCircle2 className="w-4 h-4 text-z-cyan-400 shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <span className="text-z-dim">READY TO ENGINEER FOR THIS INDUSTRY?</span>
                <button
                  onClick={onOpenProjectModal}
                  className="z-btn-primary text-xs py-2.5 px-5 self-start sm:self-auto"
                >
                  <span>START A SYSTEM</span>
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
