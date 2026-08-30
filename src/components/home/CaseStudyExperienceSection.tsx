'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';
import { PROJECTS } from '@/content/projects';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const TABS = [
  'OVERVIEW',
  'CHALLENGE',
  'OBJECTIVE',
  'SOLUTION',
  'ARCHITECTURE',
  'EXPERIENCE',
  'INTEGRATIONS',
  'INTELLIGENCE',
  'OUTCOME',
  'TECHNOLOGY',
];

export default function CaseStudyExperienceSection() {
  const [activeTab, setActiveTab] = useState<string>('OVERVIEW');
  const project = PROJECTS[0]; // DAARAYN

  return (
    <section className="py-16 sm:py-20 md:py-24 border-b border-[#D8D4C9] bg-[#F5F1E8] relative">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

      <PageContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#D8D4C9] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
                07
              </span>
              <span className="font-mono text-xs text-[#1463FF] font-bold uppercase tracking-wider">
                PRODUCTION ARCHITECTURE DOSSIER
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
              CASE STUDY EXPERIENCE — {project.name}
            </h2>
          </div>

          <Link
            href="/work/daarayn"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1463FF] hover:text-[#1463FF] font-semibold transition-colors group self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded px-1 -mx-1"
          >
            <span>VIEW FULL RESULTS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Master Case Study Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Vertical Sub-Nav (2 cols) - Issue 26 Fix: No triangle glyph */}
          <div className="lg:col-span-2 p-3 rounded-xl bg-white border border-[#D8D4C9] space-y-1 font-mono text-xs">
            <div className="font-bold text-[#111827] uppercase px-2.5 py-1.5 mb-2 border-b border-[#D8D4C9] text-xs tracking-wider">
              {project.name}
            </div>
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] ${
                  activeTab === tab
                    ? 'bg-[#EDF4FF] text-[#1463FF] font-bold border border-[#1677FF]/40 shadow-[0_0_12px_rgba(22,119,255,0.25)]'
                    : 'text-[#536070] hover:text-[#111827] hover:bg-[#EDF4FF]'
                }`}
              >
                <span>{tab}</span>
              </button>
            ))}
          </div>

          {/* Center Case Study Detail Area (10 cols) - Issue 22 Fix: Clean vertical groups with space-y-8 */}
          <div className="lg:col-span-10 p-6 sm:p-8 rounded-xl bg-white border border-[#D8D4C9] space-y-8">
            {/* Group 1: Header & Meta Row */}
            <div className="space-y-3 pb-6 border-b border-[#D8D4C9]">
              <span className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-wider bg-[#EDF4FF] px-2.5 py-1 rounded border border-[#D8D4C9] inline-block">
                {activeTab}
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-[#111827] uppercase">
                Building Trust Through Connected Operations
              </h3>
              <p className="text-sm text-[#536070] font-body leading-relaxed max-w-3xl">
                A unified digital platform for charitable trust operations, connecting donors, projects, allocations, communication and real-time financial reporting.
              </p>

              {/* Metadata Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs text-[#536070]">
                <div>
                  <span className="text-[#768494] uppercase mr-1.5">INDUSTRY:</span>
                  <span className="text-[#111827] font-semibold">Non-Profit / Trust</span>
                </div>
                <div>
                  <span className="text-[#768494] uppercase mr-1.5">TYPE:</span>
                  <span className="text-[#111827] font-semibold">Digital Platform</span>
                </div>
                <div>
                  <span className="text-[#768494] uppercase mr-1.5">DURATION:</span>
                  <span className="text-[#111827] font-semibold">6 Months</span>
                </div>
                <div>
                  <span className="text-[#768494] uppercase mr-1.5">STATUS:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5 inline-flex">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Production
                  </span>
                </div>
              </div>
            </div>

            {/* Group 2: 5 Verified Numerical Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-bold text-[#111827]">100+</div>
                <div className="font-mono text-xs text-[#536070] uppercase mt-1">Projects Managed</div>
              </div>
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-bold text-[#111827]">25K+</div>
                <div className="font-mono text-xs text-[#536070] uppercase mt-1">Donors Connected</div>
              </div>
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-bold text-[#1463FF]">₹ 10Cr+</div>
                <div className="font-mono text-xs text-[#536070] uppercase mt-1">Funds Managed</div>
              </div>
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 text-center sm:text-left">
                <div className="text-xl sm:text-2xl font-display font-bold text-emerald-400">70%</div>
                <div className="font-mono text-xs text-[#536070] uppercase mt-1">Manual Reduction</div>
              </div>
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 text-center sm:text-left col-span-2 sm:col-span-1">
                <div className="text-xl sm:text-2xl font-display font-bold text-[#1463FF]">99.9%</div>
                <div className="font-mono text-xs text-[#536070] uppercase mt-1">System Uptime</div>
              </div>
            </div>

            {/* Group 3: 4 Architectural Columns (Issue 14 Fix: Consistent grammar for all 4 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* CHALLENGE */}
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 space-y-2">
                <span className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-wider block">
                  CHALLENGE
                </span>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Fragmented workflows, manual coordination and lack of visibility across trust operations.
                </p>
                <div className="pt-2 space-y-1 font-mono text-xs text-[#768494]">
                  <div>• Multiple disconnected tools</div>
                  <div>• Manual donor tracking</div>
                  <div>• No real-time reporting</div>
                  <div>• Communication gaps</div>
                </div>
              </div>

              {/* SOLUTION */}
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 space-y-2">
                <span className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-wider block">
                  SOLUTION
                </span>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  We built a unified platform that connects people, processes and financial data.
                </p>
                <div className="pt-2 space-y-1 font-mono text-xs text-[#768494]">
                  <div>• Centralized system</div>
                  <div>• Role-based workflows</div>
                  <div>• Real-time dashboards</div>
                  <div>• Automated alerts</div>
                </div>
              </div>

              {/* ARCHITECTURE (Issue 14 Fix) */}
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 space-y-2">
                <span className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider block">
                  ARCHITECTURE
                </span>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Modular decoupled layers engineered for high security and real-time auditability.
                </p>
                <div className="pt-2 space-y-1 font-mono text-xs text-[#768494]">
                  <div>• Services & APIs</div>
                  <div>• Real-time workflows</div>
                  <div>• Multi-tenant ledgers</div>
                  <div>• Telemetry & reporting</div>
                </div>
              </div>

              {/* OUTCOME */}
              <div className="p-4 rounded-lg bg-[#EDF4FF] border border-[#D8D4C9]/60 space-y-2">
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  OUTCOME
                </span>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Complete visibility, efficient operations and higher donor trust.
                </p>
                <div className="pt-2 space-y-1 font-mono text-xs text-[#768494]">
                  <div>• Unified operations</div>
                  <div>• Faster decision-making</div>
                  <div>• Complete transparency</div>
                  <div>• Better donor experience</div>
                </div>
              </div>
            </div>

            {/* Group 4: Dashboard UI Preview Graphic (Issue 25 Fix: Semantic Alt & Relevant DAARAYN visual) */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-[#D8D4C9] bg-[#F5F1E8] group">
              <Image
                src="/visuals/work/daarayn.webp"
                alt="DAARAYN donor management dashboard"
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover object-top opacity-95 group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1621] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
