'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

interface HeroContentProps {
  onOpenProjectModal?: () => void;
}

const STEPS = [
  { num: '01', title: 'UNDERSTAND', desc: 'We study how the business works' },
  { num: '02', title: 'CONNECT', desc: 'We connect systems, data & people' },
  { num: '03', title: 'ORCHESTRATE', desc: 'We coordinate intelligent workflows' },
  { num: '04', title: 'BUILD', desc: 'We build dependable digital systems' },
  { num: '05', title: 'EXECUTE', desc: 'We deploy, monitor & optimize' },
  { num: '06', title: 'EVOLVE', desc: 'The system evolves for impact' },
];

export default function HeroContent({ onOpenProjectModal }: HeroContentProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setActiveStepIndex(-1);
        return;
      }
    }

    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center text-center justify-center space-y-7 max-w-4xl mx-auto z-20 relative">
      {/* Primary Headline */}
      <div className="space-y-1">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black uppercase tracking-tight text-[#111827] leading-[0.98]">
          <span className="block text-[#111827]">WE ARCHITECT</span>
          <span className="block text-[#1463FF]">INTELLIGENT SYSTEMS</span>
        </h1>
      </div>

      {/* Subheading & Operating Philosophy */}
      <div className="space-y-2.5 max-w-2xl mx-auto">
        <p className="text-base sm:text-lg lg:text-xl font-semibold text-[#111827] font-body leading-snug">
          Software. Automation. Intelligence. Connected operations.
        </p>
        <p
          className="text-base sm:text-lg md:text-xl text-[#0F172A] font-semibold leading-relaxed max-w-xl mx-auto"
          style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}
        >
          We design and engineer intelligent systems that connect technology, data, and operations to solve real business problems.
        </p>
      </div>

      {/* Hero Action Buttons */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        {/* Primary CTA: Solid Blue Button */}
        <Link
          href="/what-we-do"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded bg-[#1463FF] hover:bg-[#0050E6] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF]"
        >
          <span>EXPLORE WHAT WE DO</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* Secondary Action: Watch System Button */}
        <button
          type="button"
          onClick={onOpenProjectModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-white hover:bg-[#FBF9F3] border border-[#D8D4C9] hover:border-[#1463FF] text-[#111827] hover:text-[#1463FF] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF]"
        >
          <span>WATCH THE SYSTEM</span>
          <Play className="w-3.5 h-3.5 text-[#1463FF] fill-[#1463FF]/20" />
        </button>
      </div>

      {/* Horizontal Process Steps Bar */}
      <div className="w-full pt-8 sm:pt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 p-3 rounded-xl bg-[#FBF9F3] border border-[#D8D4C9] text-left">
          {STEPS.map((step, idx) => {
            const isLit = idx === activeStepIndex;
            return (
              <div
                key={step.num}
                className={`p-2.5 rounded-lg border transition-all duration-700 ease-in-out ${
                  isLit
                    ? 'bg-[#EDF4FF] border-[#1463FF]/40 shadow-[0_2px_12px_rgba(20,99,255,0.12)]'
                    : 'bg-transparent border-transparent hover:bg-white/80'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`font-mono text-[10px] font-bold transition-colors duration-700 ${
                      isLit ? 'text-[#1463FF]' : 'text-[#768494]'
                    }`}
                  >
                    — {step.num}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold uppercase transition-colors duration-700 ${
                      isLit ? 'text-[#1463FF]' : 'text-[#111827]'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <p className="text-[10px] text-[#536070] font-body mt-1 line-clamp-2 leading-tight">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
