'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles, Boxes, Truck, Users, BarChart3, GraduationCap,
  Layers, TrendingUp, UtensilsCrossed, HeartPulse, ShieldCheck,
  Landmark, ArrowRight, Mouse
} from 'lucide-react';

interface IndustryContext {
  id: string;
  number: string;
  line1: string;
  line2?: string;
  name: string;
  svgPath: string;
  headline: string;
  tagline: string;
  adaptations: { title: string; desc: string; icon: string }[];
}

const INDUSTRIES: IndustryContext[] = [
  {
    id: 'commerce',
    number: '01',
    line1: 'COMMERCE &',
    line2: 'RETAIL',
    name: 'COMMERCE & RETAIL',
    svgPath: '/Industry%20images/industry-01-commerce-retail.svg',
    headline: 'High volume demands systems that never drop an order.',
    tagline: 'Engineering resilient transactional backbones that scale under peak loads without latency or friction. Unified real-time stock sync and intelligent fulfillment.',
    adaptations: [
      { title: 'REAL-TIME INVENTORY MESH', desc: 'Zero-latency sync across stores and warehouses.', icon: 'Boxes' },
      { title: 'FULFILLMENT PIPELINES', desc: 'Automated order routing and dispatch engines.', icon: 'Truck' },
      { title: 'UNIFIED CUSTOMER GRAPH', desc: 'Single customer view across all channels.', icon: 'Users' },
      { title: 'PREDICTIVE REORDERING', desc: 'Automated stock triggers based on velocity.', icon: 'TrendingUp' },
      { title: 'TRANSACTION ANALYTICS', desc: 'Live basket metrics and conversion telemetry.', icon: 'BarChart3' },
    ],
  },
  {
    id: 'education',
    number: '02',
    line1: 'EDUCATION &',
    line2: 'INSTITUTIONS',
    name: 'EDUCATION & INSTITUTIONS',
    svgPath: '/Industry%20images/industry-02-education-institutions.svg',
    headline: 'Admissions shouldn’t feel like a chain of forms.',
    tagline: 'Architecting intelligent intake engines and academic operational suites that eliminate bureaucratic drag and connect faculty, students, and administration.',
    adaptations: [
      { title: 'INTAKE & ADMISSIONS FLOW', desc: 'Frictionless multi-stage applicant pipelines.', icon: 'GraduationCap' },
      { title: 'PROGRAM SCHEDULER', desc: 'Conflict-free faculty, room and course allocation.', icon: 'Layers' },
      { title: 'STUDENT LIFECYCLE LEDGER', desc: 'Unified academic progress and milestone tracking.', icon: 'TrendingUp' },
      { title: 'FACULTY WORKBENCH', desc: 'Simplified grading, curricula and attendance.', icon: 'Users' },
      { title: 'INSTITUTIONAL REPORTING', desc: 'Accreditation-ready metrics and compliance audits.', icon: 'BarChart3' },
    ],
  },
  {
    id: 'hospitality',
    number: '03',
    line1: 'HOSPITALITY &',
    line2: 'FOODSERVICE',
    name: 'HOSPITALITY & FOODSERVICE',
    svgPath: '/Industry%20images/industry-03-hospitality-foodservice.svg',
    headline: 'When the dinner rush hits, every second counts.',
    tagline: 'Creating low-latency restaurant operations suites connecting front-of-house orders, kitchen pipelines, inventory depletion, and franchise analytics.',
    adaptations: [
      { title: 'KITCHEN WORKFLOW ENGINE', desc: 'Intelligent ticket routing and cook timing.', icon: 'UtensilsCrossed' },
      { title: 'DYNAMIC TABLE MESH', desc: 'Real-time floor seating and turnaround sync.', icon: 'Layers' },
      { title: 'LIVE RECIPE DEVIATION', desc: 'Portion control and automated waste telemetry.', icon: 'Boxes' },
      { title: 'FRANCHISE REPORTING', desc: 'Multi-location consolidation and P&L metrics.', icon: 'BarChart3' },
      { title: 'GUEST ENGAGEMENT', desc: 'Integrated loyalty and preference profiles.', icon: 'Users' },
    ],
  },
  {
    id: 'healthcare',
    number: '04',
    line1: 'HEALTHCARE &',
    line2: 'CLINICAL SYSTEMS',
    name: 'HEALTHCARE & CLINICAL SYSTEMS',
    svgPath: '/Industry%20images/industry-04-healthcare-clinical-systems.svg',
    headline: 'In healthcare, a broken workflow can become a real delay.',
    tagline: 'Constructing clinical operating platforms built for patients and practitioners. Frictionless intake from first contact to clinical review.',
    adaptations: [
      { title: 'CLINICAL CARE MESH', desc: 'Seamless practitioner handoffs and intake routing.', icon: 'HeartPulse' },
      { title: 'PATIENT RECORD SYNC', desc: 'Interoperable clinical records with audit readiness.', icon: 'ShieldCheck' },
      { title: 'INTELLIGENT SCHEDULING', desc: 'Conflict-free practitioner and room dispatch.', icon: 'Layers' },
      { title: 'COMPLIANCE ENGINE', desc: 'HIPAA-aligned data pipelines and security controls.', icon: 'ShieldCheck' },
      { title: 'CLINICAL ANALYTICS', desc: 'Outcome metrics and treatment continuity insights.', icon: 'BarChart3' },
    ],
  },
  {
    id: 'civic',
    number: '05',
    line1: 'NON-PROFIT &',
    line2: 'CIVIC ORGANIZATIONS',
    name: 'NON-PROFIT & CIVIC ORGANIZATIONS',
    svgPath: '/Industry%20images/industry-05-nonprofit-civic-organizations.svg',
    headline: 'When impact depends on trust, every donation and field action must line up.',
    tagline: 'An interconnected platform that unifies donors, causes, allocations, field operations, communications and reporting into one transparent operational ecosystem.',
    adaptations: [
      { title: 'PROGRAM MANAGEMENT', desc: 'Unified tracking from donor contribution to delivery.', icon: 'Layers' },
      { title: 'RESOURCE ALLOCATION', desc: 'Real-time funding, asset and grant distribution.', icon: 'TrendingUp' },
      { title: 'FIELD OPERATIONS', desc: 'Offline-capable field team tracking and reporting.', icon: 'Users' },
      { title: 'STAKEHOLDER TRANSPARENCY', desc: 'Audit-ready lineage for donors and partners.', icon: 'ShieldCheck' },
      { title: 'CIVIC ANALYTICS', desc: 'Impact verification and outcome measurement.', icon: 'BarChart3' },
    ],
  },
];

function IconRenderer({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const map: Record<string, React.ReactNode> = {
    Sparkles: <Sparkles className={className} />,
    Boxes: <Boxes className={className} />,
    Truck: <Truck className={className} />,
    Users: <Users className={className} />,
    BarChart3: <BarChart3 className={className} />,
    GraduationCap: <GraduationCap className={className} />,
    Layers: <Layers className={className} />,
    TrendingUp: <TrendingUp className={className} />,
    UtensilsCrossed: <UtensilsCrossed className={className} />,
    HeartPulse: <HeartPulse className={className} />,
    ShieldCheck: <ShieldCheck className={className} />,
    Landmark: <Landmark className={className} />,
  };
  return <>{map[name] ?? <Sparkles className={className} />}</>;
}

interface IndustriesExperienceProps {
  onOpenProjectModal?: () => void;
}

export default function IndustriesExperience({ onOpenProjectModal }: IndustriesExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Preload all 5 SVGs in memory on initial mount for 0-buffer instant switching
  useEffect(() => {
    INDUSTRIES.forEach((ind) => {
      const img = new window.Image();
      img.src = ind.svgPath;
    });
  }, []);

  // Instant scroll scrub mapping across 5 industry contexts with zero artificial delay
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) return;
        const rect = scrollContainerRef.current.getBoundingClientRect();
        const navbarHeight = 80;
        const totalHeight = rect.height - (window.innerHeight - navbarHeight);
        if (totalHeight <= 0) return;

        const progress = Math.max(0, Math.min(1, (navbarHeight - rect.top) / totalHeight));
        const targetIndex = Math.min(
          INDUSTRIES.length - 1,
          Math.floor(progress * INDUSTRIES.length)
        );

        if (targetIndex !== activeIndex) {
          setActiveIndex(targetIndex);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeIndex]);

  const handleSelectIndustry = useCallback((index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);

    if (scrollContainerRef.current) {
      const navbarHeight = 80;
      const totalHeight = scrollContainerRef.current.offsetHeight - (window.innerHeight - navbarHeight);
      const targetScroll = window.scrollY + scrollContainerRef.current.getBoundingClientRect().top - navbarHeight + (index / (INDUSTRIES.length - 1)) * totalHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }, [activeIndex]);

  const activeIndustry = INDUSTRIES[activeIndex] ?? INDUSTRIES[0];

  return (
    <div
      ref={scrollContainerRef}
      className="relative bg-[#F5F1E8] text-[#0B132B] antialiased"
      style={{ fontFamily: "'Inter', var(--font-inter), sans-serif", height: '320vh' }}
    >
      {/* Sticky Viewport locked below fixed Navbar (80px / 5rem) */}
      <div className="sticky top-16 sm:top-20 flex flex-col justify-between bg-[#F5F1E8]"
        style={{ height: 'calc(100vh - 5rem)', overflow: 'hidden' }}>

        {/* ── TOP BADGE STRIP ── */}
        <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#F5F1E8]">
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[9px] font-bold text-[#556375]">02</span>
            <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#1463FF]">
              PROVEN INDUSTRY SYSTEMS
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[8px] font-bold text-[#7A889B] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#1463FF] animate-pulse" />
            <span>STAGE {activeIndustry.number} / 05</span>
          </div>
        </div>

        {/* ── MOBILE HORIZONTAL SELECTOR (< lg SCREEN) ── */}
        <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-2 scrollbar-none shrink-0 bg-white/50 border-b border-[#D8D4C9]/40">
          {INDUSTRIES.map((ind, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={ind.id}
                onClick={() => handleSelectIndustry(i)}
                className={`px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase shrink-0 flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#1463FF] text-white shadow-sm'
                    : 'bg-white text-[#556375]'
                }`}
              >
                <span>{ind.number}</span>
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── MAIN COMPOSITION GRID ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr] overflow-hidden min-h-0">

          {/* ═══ LEFT COLUMN — Timeline Sidebar (Matching Image 2 Reference) ═══ */}
          <div className="hidden lg:flex flex-col bg-[#F5F1E8] overflow-hidden select-none pl-10 pr-4">
            
            {/* Timeline List */}
            <div className="flex-1 overflow-y-auto py-6 relative flex flex-col justify-between" style={{ scrollbarWidth: 'none' }}>
              
              {/* Continuous Vertical Timeline Axis Line */}
              <div className="absolute left-[11.25px] top-4 bottom-4 w-[1.5px] bg-[#E2DDD3]" />

              <div className="flex flex-col justify-between h-full relative z-10 py-1 space-y-6">
                {INDUSTRIES.map((ind, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => handleSelectIndustry(i)}
                      className="w-full flex items-start gap-4 text-left group transition-all relative"
                    >
                      {/* Active Blue Line Segment Overlay */}
                      {isActive && (
                        <div className="absolute left-[11.25px] -top-3 -bottom-3 w-[1.5px] bg-[#1463FF] z-0 pointer-events-none" />
                      )}

                      {/* Timeline Node Ring / Target Dot (Matching Image 2 Reference) */}
                      <div className="shrink-0 relative flex items-center justify-center w-6 h-6 mt-0.5 z-10">
                        {isActive ? (
                          <div className="w-6 h-6 rounded-full border-2 border-[#1463FF]/50 bg-[#EDF4FF] flex items-center justify-center shadow-md shadow-[#1463FF]/25">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1463FF]" />
                          </div>
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#536070] group-hover:bg-[#1463FF] transition-colors" />
                        )}
                      </div>

                      {/* Industry Label (Matching Image 2 Clean Typography) */}
                      <div className="min-w-0 flex-1 z-10">
                        <span className={`font-mono text-xs sm:text-[13px] font-bold block leading-none ${
                          isActive ? 'text-[#1463FF]' : 'text-[#334155]'
                        }`}>
                          {ind.number}
                        </span>
                        <span
                          className={`font-bold uppercase tracking-wider block mt-1 leading-tight text-[11px] sm:text-[11.5px] font-sans ${
                            isActive ? 'text-[#1463FF]' : 'text-[#475569] group-hover:text-[#1463FF]'
                          }`}
                        >
                          {ind.line1}
                          {ind.line2 && <><br />{ind.line2}</>}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Scroll Cue */}
            <div className="shrink-0 pb-3 flex items-center gap-2 font-mono text-[6.5px] text-[#7A889B] font-bold uppercase">
              <Mouse className="w-3.5 h-3.5 text-[#1463FF] animate-bounce shrink-0" />
              <span className="leading-tight">SCROLL TO EXPLORE<br />DIFFERENT CONTEXTS</span>
            </div>
          </div>

          {/* ═══ MAIN FEATURE AREA — Right Visual & Content Composition ═══ */}
          <div className="flex flex-col overflow-y-auto lg:overflow-hidden min-h-0 bg-[#F5F1E8]">

            {/* Upper Composition: Editorial Headline (Left) & Active Visual Stage (Right) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 items-center overflow-hidden min-h-0">
              
              {/* Left Column: Headline & Statement */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-2 sm:space-y-3 pr-2">
                <div>
                  <h2
                    className="text-lg sm:text-2xl xl:text-3xl font-black text-[#0B132B] uppercase tracking-tight leading-[0.92]"
                    style={{ fontFamily: "'Syncopate', sans-serif" }}
                  >
                    THE CONTEXT<br />CHANGES.
                  </h2>
                  <h2
                    className="text-lg sm:text-2xl xl:text-3xl font-black text-[#1463FF] uppercase tracking-tight leading-[0.92] mt-1"
                    style={{ fontFamily: "'Syncopate', sans-serif" }}
                  >
                    THE SYSTEM<br />ADAPTS.
                  </h2>
                  <div className="w-8 h-[2px] bg-[#1463FF] mt-2 sm:mt-2.5" />
                </div>

                <p className="text-[9.5px] sm:text-[10px] text-[#4A5568] leading-relaxed max-w-xs">
                  {activeIndustry.tagline}
                </p>
              </div>

              {/* Right Column: Visual Stage & Feature Header */}
              <div className="lg:col-span-8 flex flex-col justify-center h-full min-h-0 overflow-hidden">
                
                {/* Active Industry Heading & Link Bar */}
                <div className="shrink-0 flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[#1463FF]">{activeIndustry.number} —</span>
                      <h3
                        className="text-xs sm:text-sm lg:text-base font-black text-[#0B132B] uppercase tracking-wider"
                        style={{ fontFamily: "'Syncopate', sans-serif", letterSpacing: '0.04em' }}
                      >
                        {activeIndustry.name}
                      </h3>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-[#556375] font-medium leading-tight mt-0.5">
                      {activeIndustry.headline}
                    </p>
                  </div>

                  <button
                    onClick={onOpenProjectModal}
                    className="shrink-0 inline-flex items-center gap-1 font-mono text-[8px] sm:text-[8.5px] font-bold text-[#1463FF] hover:text-[#004AD6] transition-colors mt-0.5 group"
                  >
                    <span>EXPLORE THIS CONTEXT</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>

                {/* Feature SVG Visual Viewport Container — Pre-rendered Stacks for 0ms Zero-Buffer Switch */}
                <div className="flex-1 relative flex items-center justify-center p-2 overflow-hidden min-h-[180px] sm:min-h-[220px] max-h-[360px]">
                  {INDUSTRIES.map((ind, idx) => {
                    const isVisible = idx === activeIndex;
                    return (
                      <div
                        key={ind.id}
                        className="absolute inset-0 flex items-center justify-center transition-opacity duration-150 ease-out pointer-events-none"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          zIndex: isVisible ? 10 : 1,
                        }}
                      >
                        <img
                          src={ind.svgPath}
                          alt={ind.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                          }}
                          className="select-none pointer-events-none"
                          loading="eager"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ═══ LOWER SECTION — What ARKLINTECH Adapts in this Industry Card ═══ */}
            <div className="shrink-0 px-4 sm:px-6 pb-3 pt-1">
              <div className="rounded-2xl border border-[#D8D4C9]/70 bg-[#FBF9F3] p-3 sm:p-4 shadow-xs">
                
                {/* Micro Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1463FF]" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] font-bold text-[#1463FF]">
                      WHAT ARKLINTECH ADAPTS IN {activeIndustry.name}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-[#7A889B] font-bold">5 CORE ADAPTATIONS</span>
                </div>

                {/* 5-Column Responsive Adaptations Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                  {activeIndustry.adaptations.map((adapt, i) => (
                    <div key={i} className="flex flex-col justify-start">
                      <div className="flex items-center gap-1.5 text-[#1463FF] mb-1">
                        <IconRenderer name={adapt.icon} className="w-3.5 h-3.5" />
                        <span className="font-mono text-[8px] font-bold text-[#0B132B] leading-none truncate">
                          {adapt.title}
                        </span>
                      </div>
                      <p className="text-[7.5px] text-[#556375] leading-relaxed line-clamp-2">
                        {adapt.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}