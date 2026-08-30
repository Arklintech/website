import ArklintechWordmark from '@/components/brand/ArklintechWordmark';
'use client';
import { ChevronA } from '@/components/brand/KeystoneLogo';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowRight,
  Database,
  Globe,
  Bot,
  Zap,
} from 'lucide-react';

const PROCESS_STAGES = [
  {
    id: 'stage-01',
    number: '01',
    title: 'UNDERSTAND',
    tagline: "First, we understand what's really happening.",
    copy: "We dig into your business, your challenges, your systems, and the gaps you feel every day.",
    svgPath: '/How%20we%20help%20images/01-understand.svg',
  },
  {
    id: 'stage-02',
    number: '02',
    title: 'ARCHITECT',
    tagline: "Then we design the right system for the right outcomes.",
    copy: "We map the structure, the flow, the connections, and the intelligence that will drive it.",
    svgPath: '/How%20we%20help%20images/02-architect.svg',
  },
  {
    id: 'stage-03',
    number: '03',
    title: 'ENGINEER',
    tagline: "Then we build it. Clean. Reliable. Scalable.",
    copy: "We develop the software, the automation, the interfaces, and the intelligence that power the system.",
    svgPath: '/How%20we%20help%20images/03-engineer.svg',
  },
  {
    id: 'stage-04',
    number: '04',
    title: 'INTEGRATE',
    tagline: "Then we connect everything that needs to work together.",
    copy: "Your tools, your data, your people, your processes — all working as one seamless system.",
    svgPath: '/How%20we%20help%20images/04-integrate.svg',
  },
  {
    id: 'stage-05',
    number: '05',
    title: 'DEPLOY',
    tagline: "Then we launch it where it matters.",
    copy: "We deploy with precision, test with real scenarios, and make sure it performs in the real world.",
    svgPath: '/How%20we%20help%20images/05-deploy.svg',
  },
  {
    id: 'stage-06',
    number: '06',
    title: 'EVOLVE',
    tagline: "And once it's live, we keep making it better.",
    copy: "We monitor, learn, adapt, and evolve the system as your business grows.",
    svgPath: '/How%20we%20help%20images/06-evolve.svg',
  },
];

export default function ProcessSection() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reversible active stage detection via card viewport positioning
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const targetMid = windowHeight * 0.45;

      let closestIdx = 0;
      let minDistance = Infinity;

      stageRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - targetMid);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveStageIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-[#F5F1E8] border-b border-[#D8D4C9] relative overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. OPENING STATE (Clean & Typography-Led)                                  */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mx-auto text-center space-y-6 pt-4 pb-16 sm:pb-24 select-none">
          {/* Main Headline */}
          <div className="space-y-1">
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] uppercase tracking-tight leading-[1.05]"
              style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif" }}
            >
              HOW <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: "0.08em" }} className="font-extrabold text-[#1463FF]"><span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span></span>
            </h2>
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] uppercase tracking-tight leading-[1.05] relative inline-block"
              style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif" }}
            >
              ACTUALLY WORKS
              {/* Blue Brush Accent Underline */}
              <svg className="w-full h-3.5 text-[#1463FF] -mt-1" viewBox="0 0 300 12" fill="none">
                <path d="M 5 8 Q 150 2 295 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </h2>
          </div>

          {/* Conversational Sentence Structure with Black Handwriting Font */}
          <div className="text-sm sm:text-base lg:text-lg text-[#536070] font-body max-w-xl mx-auto space-y-3 leading-relaxed">
            <p>We don&#39;t start with the technology. We start with what needs to change.</p>

            {/* Introductory 4 lines rendered in BLACK color with Caveat Handwriting Font */}
            <div
              className="text-[#111827] font-semibold text-2xl sm:text-3xl space-y-1 py-1"
              style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
            >
              <p>What&#39;s slowing things down.</p>
              <p>What&#39;s still being done by hand.</p>
              <p>What&#39;s disconnected.</p>
              <p>What should work better.</p>
            </div>

            <p className="pt-2 font-semibold text-[#1463FF]">
              Then we build the system around the answers.
            </p>
          </div>

          {/* Action Cue */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D8D4C9] bg-white/80 text-[11px] font-mono font-bold text-[#536070] uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1463FF] animate-ping" />
              <span>SCROLL TO SEE THE PROCESS</span>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Stepper (Mobile Only) */}
        <div className="lg:hidden sticky top-20 z-30 mb-8 py-3 px-4 bg-[#F5F1E8]/95 backdrop-blur-md border-y border-[#D8D4C9] flex items-center justify-between overflow-x-auto gap-3 text-xs font-mono">
          {PROCESS_STAGES.map((stg, i) => {
            const isActive = activeStageIndex === i;
            return (
              <a
                key={stg.number}
                href={`#${stg.id}`}
                className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#1463FF] text-white font-bold'
                    : 'text-[#536070] hover:text-[#111827]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#94A3B8]'}`} />
                <span>{stg.number} {isActive ? stg.title : ''}</span>
              </a>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 2. CONTINUOUS 6-STAGE PROCESS WITH FULL-LENGTH CONTINUOUS VERTICAL SPINE   */}
        {/* ========================================================================= */}
        <div className="relative">
          
          {/* Continuous Architectural Vertical Line running down the right side */}
          <div className="hidden lg:block absolute right-[8%] top-12 bottom-12 w-[1.5px] bg-[#D8D4C9] z-0" />

          {/* 6 Stage Cards Stack */}
          <div className="space-y-12 sm:space-y-16">
            
            {/* STAGE 01 — UNDERSTAND */}
            <div
              id="stage-01"
              ref={(el) => { stageRefs.current[0] = el; }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-32 relative"
            >
              <div className="lg:col-span-9 p-6 sm:p-10 rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#1463FF]">01</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase">UNDERSTAND</h3>
                  <p
                    className="text-xl sm:text-2xl text-[#1463FF] font-semibold tracking-wide"
                    style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
                  >
                    &quot;First, we understand what&#39;s really happening.&quot;
                  </p>
                  <p className="text-sm text-[#536070] font-body leading-relaxed">
                    We dig into your business, your challenges, your systems, and the gaps you feel every day.
                  </p>
                </div>
                <div className="md:col-span-6 flex items-center justify-center p-2">
                  <img
                    src="/How%20we%20help%20images/01-understand.svg"
                    alt="01 Understand Visual"
                    className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Node 01 on the Right Vertical Line */}
              <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-4 z-10 select-none">
                <a href="#stage-01" className="flex items-center gap-3.5 group focus-visible:outline-none">
                  <div className="flex flex-col text-right">
                    <span className={`font-display text-sm font-extrabold transition-colors ${activeStageIndex === 0 ? 'text-[#1463FF]' : 'text-[#94A3B8]'}`}>01</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStageIndex === 0 ? 'text-[#111827]' : 'text-[#536070]'}`}>UNDERSTAND</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${activeStageIndex === 0 ? 'bg-white ring-4 ring-[#1463FF]/25 shadow-sm' : 'bg-[#F5F1E8]'}`}>
                    <div className={`rounded-full transition-all ${activeStageIndex === 0 ? 'w-2.5 h-2.5 bg-[#1463FF]' : 'w-2 h-2 bg-[#94A3B8]'}`} />
                  </div>
                </a>
              </div>
            </div>

            {/* STAGE 02 — ARCHITECT */}
            <div
              id="stage-02"
              ref={(el) => { stageRefs.current[1] = el; }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-32 relative"
            >
              <div className="lg:col-span-9 p-6 sm:p-10 rounded-3xl bg-[#EAF2FF] border border-[#D8D4C9] shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#1463FF]">02</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase">ARCHITECT</h3>
                  <p
                    className="text-xl sm:text-2xl text-[#1463FF] font-semibold tracking-wide"
                    style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
                  >
                    &quot;Then we design the right system for the right outcomes.&quot;
                  </p>
                  <p className="text-sm text-[#536070] font-body leading-relaxed">
                    We map the structure, the flow, the connections, and the intelligence that will drive it.
                  </p>
                </div>
                <div className="md:col-span-6 flex items-center justify-center p-2">
                  <img
                    src="/How%20we%20help%20images/02-architect.svg"
                    alt="02 Architect Visual"
                    className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Node 02 on the Right Vertical Line */}
              <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-4 z-10 select-none">
                <a href="#stage-02" className="flex items-center gap-3.5 group focus-visible:outline-none">
                  <div className="flex flex-col text-right">
                    <span className={`font-display text-sm font-extrabold transition-colors ${activeStageIndex === 1 ? 'text-[#1463FF]' : 'text-[#94A3B8]'}`}>02</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStageIndex === 1 ? 'text-[#111827]' : 'text-[#536070]'}`}>ARCHITECT</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${activeStageIndex === 1 ? 'bg-white ring-4 ring-[#1463FF]/25 shadow-sm' : 'bg-[#F5F1E8]'}`}>
                    <div className={`rounded-full transition-all ${activeStageIndex === 1 ? 'w-2.5 h-2.5 bg-[#1463FF]' : 'w-2 h-2 bg-[#94A3B8]'}`} />
                  </div>
                </a>
              </div>
            </div>

            {/* STAGE 03 — ENGINEER */}
            <div
              id="stage-03"
              ref={(el) => { stageRefs.current[2] = el; }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-32 relative"
            >
              <div className="lg:col-span-9 p-6 sm:p-10 rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#1463FF]">03</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase">ENGINEER</h3>
                  <p
                    className="text-xl sm:text-2xl text-[#1463FF] font-semibold tracking-wide"
                    style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
                  >
                    &quot;Then we build it. Clean. Reliable. Scalable.&quot;
                  </p>
                  <p className="text-sm text-[#536070] font-body leading-relaxed">
                    We develop the software, the automation, the interfaces, and the intelligence that power the system.
                  </p>
                </div>
                <div className="md:col-span-6 flex items-center justify-center p-2">
                  <img
                    src="/How%20we%20help%20images/03-engineer.svg"
                    alt="03 Engineer Visual"
                    className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Node 03 on the Right Vertical Line */}
              <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-4 z-10 select-none">
                <a href="#stage-03" className="flex items-center gap-3.5 group focus-visible:outline-none">
                  <div className="flex flex-col text-right">
                    <span className={`font-display text-sm font-extrabold transition-colors ${activeStageIndex === 2 ? 'text-[#1463FF]' : 'text-[#94A3B8]'}`}>03</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStageIndex === 2 ? 'text-[#111827]' : 'text-[#536070]'}`}>ENGINEER</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${activeStageIndex === 2 ? 'bg-white ring-4 ring-[#1463FF]/25 shadow-sm' : 'bg-[#F5F1E8]'}`}>
                    <div className={`rounded-full transition-all ${activeStageIndex === 2 ? 'w-2.5 h-2.5 bg-[#1463FF]' : 'w-2 h-2 bg-[#94A3B8]'}`} />
                  </div>
                </a>
              </div>
            </div>

            {/* STAGE 04 — INTEGRATE */}
            <div
              id="stage-04"
              ref={(el) => { stageRefs.current[3] = el; }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-32 relative"
            >
              <div className="lg:col-span-9 p-6 sm:p-10 rounded-3xl bg-[#EAF2FF] border border-[#D8D4C9] shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#1463FF]">04</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase">INTEGRATE</h3>
                  <p
                    className="text-xl sm:text-2xl text-[#1463FF] font-semibold tracking-wide"
                    style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
                  >
                    &quot;Then we connect everything that needs to work together.&quot;
                  </p>
                  <p className="text-sm text-[#536070] font-body leading-relaxed">
                    Your tools, your data, your people, your processes — all working as one seamless system.
                  </p>
                </div>
                <div className="md:col-span-6 flex items-center justify-center p-2">
                  <img
                    src="/How%20we%20help%20images/04-integrate.svg"
                    alt="04 Integrate Visual"
                    className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Node 04 on the Right Vertical Line */}
              <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-4 z-10 select-none">
                <a href="#stage-04" className="flex items-center gap-3.5 group focus-visible:outline-none">
                  <div className="flex flex-col text-right">
                    <span className={`font-display text-sm font-extrabold transition-colors ${activeStageIndex === 3 ? 'text-[#1463FF]' : 'text-[#94A3B8]'}`}>04</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStageIndex === 3 ? 'text-[#111827]' : 'text-[#536070]'}`}>INTEGRATE</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${activeStageIndex === 3 ? 'bg-white ring-4 ring-[#1463FF]/25 shadow-sm' : 'bg-[#F5F1E8]'}`}>
                    <div className={`rounded-full transition-all ${activeStageIndex === 3 ? 'w-2.5 h-2.5 bg-[#1463FF]' : 'w-2 h-2 bg-[#94A3B8]'}`} />
                  </div>
                </a>
              </div>
            </div>

            {/* STAGE 05 — DEPLOY */}
            <div
              id="stage-05"
              ref={(el) => { stageRefs.current[4] = el; }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-32 relative"
            >
              <div className="lg:col-span-9 p-6 sm:p-10 rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-6 space-y-3">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#1463FF]">05</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase">DEPLOY</h3>
                  <p
                    className="text-xl sm:text-2xl text-[#1463FF] font-semibold tracking-wide"
                    style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
                  >
                    &quot;Then we launch it where it matters.&quot;
                  </p>
                  <p className="text-sm text-[#536070] font-body leading-relaxed">
                    We deploy with precision, test with real scenarios, and make sure it performs in the real world.
                  </p>
                </div>
                <div className="md:col-span-6 flex items-center justify-center p-2">
                  <img
                    src="/How%20we%20help%20images/05-deploy.svg"
                    alt="05 Deploy Visual"
                    className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Node 05 on the Right Vertical Line */}
              <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-4 z-10 select-none">
                <a href="#stage-05" className="flex items-center gap-3.5 group focus-visible:outline-none">
                  <div className="flex flex-col text-right">
                    <span className={`font-display text-sm font-extrabold transition-colors ${activeStageIndex === 4 ? 'text-[#1463FF]' : 'text-[#94A3B8]'}`}>05</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStageIndex === 4 ? 'text-[#111827]' : 'text-[#536070]'}`}>DEPLOY</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${activeStageIndex === 4 ? 'bg-white ring-4 ring-[#1463FF]/25 shadow-sm' : 'bg-[#F5F1E8]'}`}>
                    <div className={`rounded-full transition-all ${activeStageIndex === 4 ? 'w-2.5 h-2.5 bg-[#1463FF]' : 'w-2 h-2 bg-[#94A3B8]'}`} />
                  </div>
                </a>
              </div>
            </div>

            {/* STAGE 06 — EVOLVE */}
            <div
              id="stage-06"
              ref={(el) => { stageRefs.current[5] = el; }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center scroll-mt-32 relative"
            >
              <div className="lg:col-span-9 p-6 sm:p-10 rounded-3xl bg-[#070D1D] border border-[#1E293B] shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-white relative overflow-hidden">
                <div className="md:col-span-6 space-y-3 relative z-10">
                  <span className="font-display text-4xl sm:text-5xl font-black text-[#38BDF8]">06</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase">EVOLVE</h3>
                  <p
                    className="text-xl sm:text-2xl text-[#38BDF8] font-semibold tracking-wide"
                    style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
                  >
                    &quot;And once it&#39;s live, we keep making it better.&quot;
                  </p>
                  <p className="text-sm text-[#94A3B8] font-body leading-relaxed">
                    We monitor, learn, adapt, and evolve the system as your business grows.
                  </p>
                </div>
                <div className="md:col-span-6 flex items-center justify-center p-2 relative z-10">
                  <img
                    src="/How%20we%20help%20images/06-evolve.svg"
                    alt="06 Evolve Visual"
                    className="w-full h-auto max-h-[340px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>

              {/* Node 06 on the Right Vertical Line */}
              <div className="hidden lg:flex lg:col-span-3 items-center justify-end pr-4 z-10 select-none">
                <a href="#stage-06" className="flex items-center gap-3.5 group focus-visible:outline-none">
                  <div className="flex flex-col text-right">
                    <span className={`font-display text-sm font-extrabold transition-colors ${activeStageIndex === 5 ? 'text-[#1463FF]' : 'text-[#94A3B8]'}`}>06</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-wider transition-colors ${activeStageIndex === 5 ? 'text-[#111827]' : 'text-[#536070]'}`}>EVOLVE</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${activeStageIndex === 5 ? 'bg-white ring-4 ring-[#1463FF]/25 shadow-sm' : 'bg-[#F5F1E8]'}`}>
                    <div className={`rounded-full transition-all ${activeStageIndex === 5 ? 'w-2.5 h-2.5 bg-[#1463FF]' : 'w-2 h-2 bg-[#94A3B8]'}`} />
                  </div>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. FINAL CTA HANDOFF                                                      */}
        {/* ========================================================================= */}
        <div className="pt-12 sm:pt-16">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D8D4C9] shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/30 flex items-center justify-center text-[#1463FF] shrink-0">
                <svg width="24" height="20" viewBox="0 0 135 110" fill="none">
                  <path d="M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z" fill="#1463FF" />
                </svg>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-display font-bold text-[#111827] uppercase">
                  READY TO BUILD SOMETHING EXTRAORDINARY?
                </h4>
                <p className="text-xs sm:text-sm text-[#536070] font-body">
                  Let&#39;s engineer the right system for your business.
                </p>
              </div>
            </div>

            <Link
              href="/start-a-system"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1463FF] hover:bg-[#0B2E73] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-md shrink-0"
            >
              <span>START A PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
