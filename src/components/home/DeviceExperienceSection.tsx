'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';
import { KeystoneMark } from '@/components/brand/KeystoneLogo';
import { ArrowRight } from 'lucide-react';

export default function DeviceExperienceSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 border-b border-[rgba(148,163,184,0.12)] bg-[#030507] relative">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

      <PageContainer>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[rgba(148,163,184,0.12)] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-semibold text-[#1677FF] border border-[rgba(148,163,184,0.12)] px-2 py-0.5 rounded bg-[#0E1C28]">
                09
              </span>
              <span className="font-mono text-xs text-[#1677FF] font-bold uppercase tracking-wider">
                RESPONSIVE SYSTEM ARCHITECTURE
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#F4F7FA] uppercase tracking-tight">
              EXPERIENCE ON EVERY DEVICE
            </h2>
            <p className="mt-1 text-sm sm:text-base text-[#8FA1B5] font-body">
              Engineered with extreme precision from ultra-wide enterprise command centers to pocket-sized field devices.
            </p>
          </div>

          <Link
            href="/start-a-system"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1677FF] hover:text-[#38BDF8] font-semibold transition-colors group self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded px-1 -mx-1"
          >
            <span>DISCUSS YOUR INTERFACE</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Phone Mockup Frames - Wrapped in aria-hidden for accessibility */}
        <div
          aria-hidden="true"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto select-none pointer-events-none"
        >
          {/* Frame 1: Mobile Hero */}
          <div className="p-4 rounded-2xl bg-[#070B10] border border-[rgba(148,163,184,0.12)] shadow-2xl space-y-3 flex flex-col justify-between w-full">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(148,163,184,0.12)] font-mono text-xs text-[#5F7185]">
              <span className="text-[#1677FF] font-bold">01 • MOBILE HERO</span>
              <span>375px VIEWPORT</span>
            </div>
            
            <div className="p-4 rounded-xl bg-[#0B1621] border border-[rgba(148,163,184,0.08)] space-y-3 flex-1 flex flex-col justify-between">
              <div>
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 mb-3">
                  <KeystoneMark className="w-4 h-4" />
                  <span className="font-display font-bold text-xs text-[#F4F7FA] tracking-widest"><span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span></span>
                </div>

                {/* Robot visual banner */}
                <div className="w-full h-28 relative rounded-lg overflow-hidden border border-[rgba(148,163,184,0.08)] bg-[#030507] mb-3">
                  <Image
                    src="/visuals/zaqvoro/hero-zcore.webp"
                    alt="Mobile Hero Machine"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1621] via-transparent to-transparent opacity-60" />
                </div>

                <div>
                  <div className="font-display font-black text-xs text-[#F4F7FA] uppercase leading-snug">
                    WE ARCHITECT <span className="text-[#1677FF]">INTELLIGENT</span> SYSTEMS
                  </div>
                  <p className="text-xs text-[#8FA1B5] mt-1 leading-snug font-body">
                    Software. Automation. Intelligence. Connected operations.
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="w-full py-2 rounded bg-[#1677FF] text-center font-mono text-xs text-white font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(22,119,255,0.4)]">
                  EXPLORE WHAT WE DO
                </div>
                <div className="text-center font-mono text-xs text-[#5F7185] uppercase">
                  WHAT WE DO • Core capabilities
                </div>
              </div>
            </div>
          </div>

          {/* Frame 2: Mobile Systems We've Built */}
          <div className="p-4 rounded-2xl bg-[#070B10] border border-[rgba(148,163,184,0.12)] shadow-2xl space-y-3 flex flex-col justify-between w-full">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(148,163,184,0.12)] font-mono text-xs text-[#5F7185]">
              <span className="text-[#1677FF] font-bold">02 • MOBILE WORK</span>
              <span>375px VIEWPORT</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1621] border border-[rgba(148,163,184,0.08)] space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <div className="font-mono text-xs font-bold text-[#F4F7FA] uppercase pb-1 border-b border-[rgba(148,163,184,0.12)] flex items-center justify-between">
                  <span>SYSTEMS WE&apos;VE BUILT</span>
                  <span className="text-[#1677FF] text-xs">REAL IMPACT</span>
                </div>
                
                <div className="space-y-2 mt-2.5">
                  <div className="p-2.5 rounded-lg bg-[#091521] border border-[rgba(148,163,184,0.08)] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#F4F7FA]">DAARAYN</div>
                      <div className="text-xs text-[#8FA1B5]">Trust & Operations System</div>
                    </div>
                    <span className="text-xs text-[#1677FF] font-mono font-semibold">Case study →</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#091521] border border-[rgba(148,163,184,0.08)] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#F4F7FA]">NEOMINDS</div>
                      <div className="text-xs text-[#8FA1B5]">Enrollment & Education</div>
                    </div>
                    <span className="text-xs text-[#1677FF] font-mono font-semibold">Case study →</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#091521] border border-[rgba(148,163,184,0.08)] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#F4F7FA]">PARIVAR</div>
                      <div className="text-xs text-[#8FA1B5]">Hospitality Operations</div>
                    </div>
                    <span className="text-xs text-[#1677FF] font-mono font-semibold">Case study →</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(148,163,184,0.08)] text-center font-mono text-xs text-[#5F7185]">
                3 LIVE PRODUCTION PLATFORMS
              </div>
            </div>
          </div>

          {/* Frame 3: Mobile Start a System Intake (Issue 23 Fix: Visual-Only Representation) */}
          <div className="p-4 rounded-2xl bg-[#070B10] border border-[rgba(148,163,184,0.12)] shadow-2xl space-y-3 flex flex-col justify-between w-full">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(148,163,184,0.12)] font-mono text-xs text-[#5F7185]">
              <span className="text-[#38BDF8] font-bold">03 • MOBILE INTAKE</span>
              <span>375px VIEWPORT</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1621] border border-[rgba(148,163,184,0.08)] space-y-2.5 font-mono text-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="font-bold text-[#F4F7FA] uppercase pb-1 border-b border-[rgba(148,163,184,0.12)] text-xs">
                  START A SYSTEM
                </div>
                <p className="text-xs text-[#8FA1B5] font-body mt-1 leading-snug">
                  Tell us what you&apos;re looking to build, connect, automate or improve.
                </p>

                {/* Static Non-Interactive Visual Placeholders */}
                <div className="space-y-1.5 mt-2.5">
                  <div className="w-full px-2.5 py-1.5 rounded bg-[#091521] border border-[rgba(148,163,184,0.12)] text-xs text-[#8FA1B5]">
                    What are you looking to build?
                  </div>
                  <div className="w-full px-2.5 py-1.5 rounded bg-[#091521] border border-[rgba(148,163,184,0.12)] text-xs text-[#8FA1B5]">
                    Select project scope
                  </div>
                  <div className="w-full px-2.5 py-1.5 rounded bg-[#091521] border border-[rgba(148,163,184,0.12)] text-xs text-[#8FA1B5]">
                    Your work email
                  </div>
                </div>
              </div>

              <div className="w-full py-2 rounded bg-[#1677FF] text-center font-mono text-xs text-white font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(22,119,255,0.4)] mt-2">
                SUBMIT BRIEF →
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
