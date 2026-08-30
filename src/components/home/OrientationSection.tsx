import ArklintechWordmark from '@/components/brand/ArklintechWordmark';
'use client';

import React from 'react';
import Link from 'next/link';
import PageContainer from '@/components/layout/PageContainer';
import { ArrowRight, Shield, Layers, Cpu } from 'lucide-react';

export default function OrientationSection() {
  return (
    <section className="py-14 sm:py-18 md:py-20 border-b border-[#D8D4C9] bg-[#F5F1E8] relative">
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Core Positioning Narrative */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
                01
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1463FF]">
                COMPANY ORIENTATION
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#111827] tracking-tight leading-tight">
              Established technology company. <br />
              <span className="text-[#1463FF]">
                Extraordinary interface.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
              <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: "0.08em" }} className="font-extrabold text-[#1463FF]"><span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span></span> approaches technology as a systems engineering problem. Disconnected software tools create disconnected operational work. We design and build unified digital platforms, automated workflow state machines and business systems that establish clear operational lineage across an enterprise.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#1463FF] hover:text-[#0050E6] transition-colors group"
              >
                <span>READ ABOUT OUR OPERATING MODEL</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Core Answers */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. What We Build */}
            <div className="p-5 rounded-xl bg-white border border-[#D8D4C9] hover:border-[#1463FF] shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/30 flex items-center justify-center text-[#1463FF] mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#1463FF] font-bold mb-1">
                  WHAT WE ENGINEER
                </div>
                <div className="font-bold text-[#111827] text-sm mb-1.5">
                  Connected Systems
                </div>
                <p className="text-xs text-[#536070] leading-relaxed font-body">
                  Custom software platforms, state machine pipelines and business infrastructure engineered around your operating model.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8D4C9]/60 font-mono text-[10px] font-bold text-[#768494]">
                PROPRIETARY ASSETS
              </div>
            </div>

            {/* 2. What Problems We Solve */}
            <div className="p-5 rounded-xl bg-white border border-[#D8D4C9] hover:border-[#1463FF] shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/30 flex items-center justify-center text-[#1463FF] mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#1463FF] font-bold mb-1">
                  PROBLEMS WE ADDRESS
                </div>
                <div className="font-bold text-[#111827] text-sm mb-1.5">
                  Operational Friction
                </div>
                <p className="text-xs text-[#536070] leading-relaxed font-body">
                  Fragmented application silos, manual data transfer bottlenecks, legacy debt, and operational blind spots.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8D4C9]/60 font-mono text-[10px] font-bold text-[#768494]">
                OPERATIONAL LINEAGE
              </div>
            </div>

            {/* 3. Who We Help */}
            <div className="p-5 rounded-xl bg-white border border-[#D8D4C9] hover:border-[#1463FF] shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/30 flex items-center justify-center text-[#1463FF] mb-3">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#1463FF] font-bold mb-1">
                  WHO WE SUPPORT
                </div>
                <div className="font-bold text-[#111827] text-sm mb-1.5">
                  Decision Makers
                </div>
                <p className="text-xs text-[#536070] leading-relaxed font-body">
                  Founders, CEOs, COOs and technical leaders seeking reliable systems engineering execution without fluff.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#D8D4C9]/60 font-mono text-[10px] font-bold text-[#768494]">
                EXECUTIVE PARTNERSHIP
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
