'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { HOW_WE_HELP_ITEMS } from '@/content/howWeHelp';
import { ArrowLeft, ArrowRight, Box, Cog, Cpu, RefreshCw, Disc, Sparkles } from 'lucide-react';

interface HowWeHelpDetailPageProps {
  params: { slug: string };
}

export default function HowWeHelpDetailPage({ params }: HowWeHelpDetailPageProps) {
  const slug = params?.slug || '';
  const item = HOW_WE_HELP_ITEMS.find((h) => h.id === slug);

  if (!item) {
    return notFound();
  }

  const getIcon = (name: string) => {
    switch (name) {
      case 'Network': return <Box className="w-6 h-6 text-z-cyan-400" />;
      case 'Cpu': return <Cog className="w-6 h-6 text-z-blue-400" />;
      case 'Layers': return <Cpu className="w-6 h-6 text-z-blue-300" />;
      case 'RefreshCw': return <RefreshCw className="w-6 h-6 text-z-cyan-300" />;
      case 'BarChart3': return <Disc className="w-6 h-6 text-z-cyan-400" />;
      case 'Bot': return <Sparkles className="w-6 h-6 text-z-blue-400" />;
      default: return <Box className="w-6 h-6 text-z-cyan-400" />;
    }
  };

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Back to All Solutions */}
            <div className="mb-6">
              <Link
                href="/how-we-help"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-z-muted hover:text-z-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL SOLUTIONS</span>
              </Link>
            </div>

            {/* Solution Deep Dive Card */}
            <div className="bg-z-surface border border-z-border rounded-xl p-6 sm:p-8 md:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-z-border/80">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-z-surface-2 border border-z-border">
                    {getIcon(item.iconName)}
                  </div>
                  <div>
                    <span className="font-mono text-xs font-bold text-z-cyan-400 uppercase tracking-widest block">
                      {item.number} • BUSINESS SOLUTION
                    </span>
                    <h1 className="text-display-m font-display font-bold text-z-white uppercase">
                      {item.title}
                    </h1>
                  </div>
                </div>

                <span className="font-mono text-xs text-z-blue-300 bg-z-surface-2 px-3 py-1 rounded border border-z-border self-start sm:self-auto">
                  PRODUCTION READY
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-1.5">
                    <span className="font-mono text-xs text-z-blue-400 font-bold uppercase block">
                      THE OPERATIONAL PROBLEM
                    </span>
                    <p className="text-sm text-z-text font-body leading-relaxed">
                      {item.problemStatement}
                    </p>
                  </div>

                  <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-1.5">
                    <span className="font-mono text-xs text-z-cyan-300 font-bold uppercase block">
                      BUSINESS IMPACT & VERIFIED OUTCOME
                    </span>
                    <p className="text-sm text-z-text font-body leading-relaxed">
                      {item.businessImpact}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-1.5">
                    <span className="font-mono text-xs text-z-white font-bold uppercase block">
                      OUR ARCHITECTED SOLUTION
                    </span>
                    <p className="text-sm text-z-muted font-body leading-relaxed">
                      {item.solutionNarrative}
                    </p>
                  </div>

                  <div className="p-4 rounded bg-z-surface-2/60 border border-z-border space-y-1.5 font-mono text-xs">
                    <span className="text-z-blue-400 font-bold uppercase block">
                      ARCHITECTURE HIGHLIGHT
                    </span>
                    <p className="text-z-text leading-relaxed">
                      {item.architectureHighlight}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-z-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-z-dim">
                  <span>RELEVANT CAPABILITIES:</span>
                  <span className="text-z-cyan-300 font-bold">{item.relevantCapabilities.join(' • ')}</span>
                </div>

                <button
                  onClick={onOpenProjectModal}
                  className="z-btn-primary text-xs py-2.5 px-5 self-start sm:self-auto"
                >
                  <span>ARCHITECT THIS SOLUTION</span>
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
