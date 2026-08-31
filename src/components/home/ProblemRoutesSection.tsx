'use client';

import React from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import { ArrowRight, Box, Cog, Cpu, RefreshCw, Disc, Sparkles } from 'lucide-react';

const HOW_WE_HELP_CARDS = [
  {
    id: 'connected-operations',
    title: 'Connected Operations',
    tagline: 'Unify systems and data',
    icon: Box,
    href: '/how-we-help#connected-operations',
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    tagline: 'Automate repetitive work',
    icon: Cog,
    href: '/how-we-help#intelligent-automation',
  },
  {
    id: 'digital-platform-engineering',
    title: 'Digital Platform Engineering',
    tagline: 'Build what you need',
    icon: Cpu,
    href: '/how-we-help#digital-platform-engineering',
  },
  {
    id: 'systems-modernization',
    title: 'Systems Modernization',
    tagline: 'Evolve without disruption',
    icon: RefreshCw,
    href: '/how-we-help#systems-modernization',
  },
  {
    id: 'operational-intelligence',
    title: 'Operational Intelligence',
    tagline: 'Turn data into insight',
    icon: Disc,
    href: '/how-we-help#operational-intelligence',
  },
  {
    id: 'ai-enabled-operations',
    title: 'AI-Enabled Operations',
    tagline: 'Embed intelligence into operations',
    icon: Sparkles,
    href: '/how-we-help#ai-enabled-operations',
  },
];

export default function ProblemRoutesSection() {
  return (
    <section className="py-14 sm:py-18 md:py-20 border-b border-[#D8D4C9] bg-[#F5F1E8] relative">
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      <PageContainer>
        {/* Section Header with Top-Right Action */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D8D4C9]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
                04
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1463FF] font-bold">
                PROBLEM-FIRST SOLUTIONS
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
              HOW WE HELP
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#536070] font-body">
              Practical ways we help organizations improve how they operate.
            </p>
          </div>

          <Link
            href="/how-we-help"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#1463FF] hover:text-[#0050E6] font-bold uppercase tracking-wider transition-colors group shrink-0"
          >
            <span>VIEW ALL SOLUTIONS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Problem Route Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {HOW_WE_HELP_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="p-6 sm:p-7 rounded-xl bg-white border border-[#D8D4C9] hover:border-[#1463FF] shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center text-center group space-y-3.5 min-h-[180px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF]"
              >
                {/* Clean Blue Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/20 flex items-center justify-center text-[#1463FF] group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-[#111827] group-hover:text-[#1463FF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#536070] font-body">
                    {card.tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
