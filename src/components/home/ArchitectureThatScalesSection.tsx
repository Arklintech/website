'use client';

import React from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import SystemArchitectureDiagram from '@/components/architecture/SystemArchitectureDiagram';
import { ArrowRight } from 'lucide-react';

export default function ArchitectureThatScalesSection() {
  return (
    <section
      id="architecture"
      className="py-14 sm:py-18 md:py-20 border-b border-[#D8D4C9] bg-[#F5F1E8] relative overflow-hidden"
    >
      <PageContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#D8D4C9] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
                08
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[#1463FF] font-bold">
                SYSTEM TOPOLOGY
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
              ARCHITECTURE THAT SCALES
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#536070] font-body max-w-2xl">
              Modular, decoupled layers engineered for operational throughput, fault isolation, and systemic resilience.
            </p>
          </div>

          <Link
            href="/technology-architecture"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1463FF] hover:text-[#0050E6] font-bold uppercase tracking-wider transition-colors group shrink-0"
          >
            <span>VIEW FULL ARCHITECTURE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Primary 3-Card Architecture with Bold Living Blue Vector Wires (Image 1) */}
        <SystemArchitectureDiagram />
      </PageContainer>
    </section>
  );
}
