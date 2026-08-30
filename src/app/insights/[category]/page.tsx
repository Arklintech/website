'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { INSIGHTS_ARTICLES } from '@/content/insights';
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface InsightCategoryPageProps {
  params: { category: string };
}

export default function InsightCategoryPage({ params }: InsightCategoryPageProps) {
  const rawCategory = params?.category || '';

  const categoryMap: Record<string, string> = {
    'articles': 'Articles',
    'engineering-notes': 'Engineering Notes',
    'research': 'Research',
  };

  const categoryName = categoryMap[rawCategory.toLowerCase()];
  if (!categoryName) {
    return notFound();
  }

  const filteredArticles = INSIGHTS_ARTICLES.filter((a) => a.category === categoryName);

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            {/* Back to All Insights */}
            <div className="mb-6">
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-z-muted hover:text-z-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL INSIGHTS</span>
              </Link>
            </div>

            {/* Page Header */}
            <div className="max-w-3xl mb-12 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-z-cyan-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2 uppercase">
                  {categoryName}
                </span>
              </div>
              <h1 className="text-display-l font-display font-bold text-z-white uppercase tracking-tight">
                {categoryName.toUpperCase()}
              </h1>
              <p className="text-base sm:text-lg text-z-muted font-body leading-relaxed">
                Technical publications, analyses, and architectural documentation under {categoryName}.
              </p>
            </div>

            {/* Filtered Articles List */}
            <div className="space-y-6">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-6 sm:p-8 rounded-lg bg-z-surface border border-z-border space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-z-border/60 font-mono text-[10px]">
                    <span className="font-bold text-z-cyan-400 uppercase tracking-widest bg-z-blue-900/50 px-2 py-0.5 rounded border border-z-blue-500/30">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-4 text-z-dim">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-z-muted" />
                        {art.publishDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-z-muted" />
                        {art.readTime}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-lg sm:text-2xl font-display font-bold text-z-white uppercase hover:text-z-cyan-300 transition-colors">
                    {art.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-z-text font-body leading-relaxed">
                    {art.excerpt}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="font-mono text-[10px] text-z-dim uppercase font-semibold block">
                      KEY ARCHITECTURAL TAKEAWAYS:
                    </span>
                    {art.keyTakeaways.map((tk, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-z-muted font-body">
                        <CheckCircle2 className="w-3.5 h-3.5 text-z-cyan-400 shrink-0 mt-0.5" />
                        <span>{tk}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-z-border/50 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px]">
                    <div className="flex flex-wrap gap-1 text-z-dim">
                      {art.tags.map((t) => (
                        <span key={t} className="bg-z-surface-2 px-1.5 py-0.5 rounded border border-z-border/40 text-z-blue-300">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="text-z-dim">
                      AUTHORED BY <span className="text-z-white">{art.author}</span>
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
