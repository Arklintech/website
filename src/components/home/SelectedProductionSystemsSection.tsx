'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WORK_REVEAL_PROJECTS, WorkRevealProject } from '@/content/workReveal';
import {
  ArrowRight, ChevronRight, Box, Users, BarChart3, ShieldCheck,
  Workflow, Database, User, Calendar, Zap, Sparkles, FileCode,
  Sliders, Eye, Search, ClipboardList, Clock, Globe, FileText
} from 'lucide-react';

function ValueBlockIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  const map: Record<string, React.ReactNode> = {
    Users: <Users className={className} />,
    BarChart3: <BarChart3 className={className} />,
    ShieldCheck: <ShieldCheck className={className} />,
    Workflow: <Workflow className={className} />,
    Database: <Database className={className} />,
    User: <User className={className} />,
    Calendar: <Calendar className={className} />,
    Zap: <Zap className={className} />,
    Sparkles: <Sparkles className={className} />,
    FileCode: <FileCode className={className} />,
    Sliders: <Sliders className={className} />,
    Eye: <Eye className={className} />,
    Search: <Search className={className} />,
    ClipboardList: <ClipboardList className={className} />,
    FileText: <FileText className={className} />,
  };
  return <>{map[name] ?? <Sparkles className={className} />}</>;
}

export default function SelectedProductionSystemsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string>('daarayn');
  const [isFading, setIsFading] = useState(false);

  const activeProject: WorkRevealProject =
    WORK_REVEAL_PROJECTS.find((p) => p.id === activeProjectId) ?? WORK_REVEAL_PROJECTS[0];

  const handleSelectProject = (id: string) => {
    if (id === activeProjectId) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveProjectId(id);
      setIsFading(false);
    }, 120);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#F7F4EC] text-[#0B132B] border-b border-[#D8D4C9] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ═══ TOP TWO-COLUMN MASTER COMPOSITION (LEFT: Index · RIGHT: Showcase) ═══ */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* ── LEFT COLUMN: Section Title & Vertical Project Index (4 cols) ── */}
          <div className="xl:col-span-4 flex flex-col justify-between space-y-6">
            
            {/* Header Block */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
                  02
                </span>
                <span className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-wider">
                  SELECTED PRODUCTION SYSTEMS
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0B132B] uppercase tracking-tight leading-[0.92]"
                style={{ fontFamily: "'Syncopate', sans-serif" }}
              >
                SYSTEMS<br />WE&apos;VE BUILT<span className="text-[#1463FF]">.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-sm">
                We engineer dependable systems that help businesses, teams, and operations work with greater clarity and control.
              </p>
              <div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#1463FF] hover:text-[#004AD6] transition-colors group mt-1"
                >
                  <span>EXPLORE ALL SYSTEMS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Mobile Horizontal Project Selector (< lg) */}
            <div className="flex xl:hidden overflow-x-auto gap-2 py-1 scrollbar-none">
              {WORK_REVEAL_PROJECTS.map((project) => {
                const isActive = project.id === activeProjectId;
                return (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(project.id)}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase shrink-0 flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-[#1463FF] text-white shadow-xs'
                        : 'bg-white text-[#556375] border border-[#D8D4C9]'
                    }`}
                  >
                    <span>{project.number}</span>
                    <span>{project.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Vertical Project Index (8 Projects on Desktop lg+) */}
            <div className="hidden xl:block space-y-1.5 pt-2">
              {WORK_REVEAL_PROJECTS.map((project) => {
                const isActive = project.id === activeProjectId;
                return (
                  <button
                    key={project.id}
                    onClick={() => handleSelectProject(project.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-[#E8F1FD] border border-[#1463FF]/30 shadow-xs'
                        : 'hover:bg-black/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs sm:text-sm font-bold ${
                        isActive ? 'text-[#1463FF]' : 'text-[#0B132B]'
                      }`}>
                        {project.number}
                      </span>
                      <span
                        className="font-black uppercase text-xs sm:text-sm tracking-wide text-[#0B132B]"
                        style={{ fontFamily: "'Syncopate', sans-serif" }}
                      >
                        {project.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? 'text-[#1463FF]' : 'text-[#64748B]'
                      }`}>
                        {project.shortCategory}
                      </span>
                      {isActive && <ChevronRight className="w-4 h-4 text-[#1463FF] shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Featured Interface Presentation (8 cols) ── */}
          <div className="xl:col-span-8 space-y-4">
            
            {/* Top Philosophy Eyebrow Strip */}
            <div className="flex items-center gap-3 pb-1 overflow-hidden">
              <Box className="w-4 h-4 text-[#1463FF] shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[#475569] truncate">
                08 SYSTEMS. DIFFERENT INDUSTRIES. ONE PHILOSOPHY.
              </span>
              <div className="flex-1 h-[1px] bg-[#D8D4C9]/70 hidden md:block shrink-0" />
            </div>

            {/* ═══ MASTER SHOWCASE CARD CONTAINER ═══ */}
            <div className="rounded-3xl border border-[#D8D4C9] bg-white overflow-hidden shadow-xl">
              
              {/* Top Viewport: Project Layer 01 Interface Visual */}
              <div className="relative bg-[#070B12] px-3 py-6 sm:p-8 flex items-center justify-center overflow-hidden">
                <div
                  className={`w-full h-full relative flex items-center justify-center transition-all duration-300 ${
                    isFading ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
                  }`}
                >
                  <img
                    src={activeProject.layers[0].assetPath}
                    alt={`${activeProject.name} System Interface`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '440px',
                      objectFit: 'contain',
                    }}
                    className="select-none pointer-events-none drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Bottom Information Panel (Project Identity + 3 Value Blocks + VIEW SYSTEM CTA) */}
              <div className="p-5 sm:p-6 lg:p-8 bg-white border-t border-[#E2E8F0]">
                {/* Top row: name + system type + description */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="font-mono text-[11px] font-bold text-[#1463FF] uppercase tracking-wider block">
                      {activeProject.name}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] tracking-tight leading-tight font-display">
                      {activeProject.systemType}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed max-w-lg">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* VIEW SYSTEM button — desktop top-right */}
                  <div className="hidden sm:flex shrink-0 items-start pt-0.5">
                    <Link
                      href={`/work?project=${activeProject.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#1463FF]/30 group whitespace-nowrap"
                    >
                      <span>VIEW SYSTEM</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Bottom row: 3 Value Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#F1F5F9]">
                  {activeProject.valueBlocks.map((block, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/20 flex items-center justify-center text-[#1463FF] shrink-0 mt-0.5">
                        <ValueBlockIcon name={block.icon} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-[#0B132B] block leading-tight">
                          {block.title}
                        </span>
                        <span className="text-[11px] text-[#64748B] leading-tight block mt-0.5">
                          {block.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* VIEW SYSTEM button — mobile full-width */}
                <div className="sm:hidden mt-4">
                  <Link
                    href={`/work?project=${activeProject.id}`}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#1463FF]/30 group"
                  >
                    <span>VIEW SYSTEM</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM SUPPORTING PROOF / STATISTICS SECTION ═══ */}
        <div className="rounded-3xl border border-[#D8D4C9] bg-white/70 backdrop-blur-xs p-6 sm:p-8 mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 items-center shadow-xs">
          
          {/* Left Headline */}
          <div className="xl:col-span-5 space-y-1">
            <span className="font-mono text-[10px] sm:text-xs font-bold text-[#1463FF] uppercase tracking-wider block">
              THE INTERFACE IS ONLY THE SURFACE.
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] tracking-tight leading-snug font-display">
              Every system has depth. Explore how we build what&apos;s underneath.
            </h3>
          </div>

          {/* Right 4-Column Statistics Strip */}
          <div className="xl:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: <Box className="w-5 h-5 text-[#1463FF]" />,
                stat: '08+',
                label: 'Systems Built',
                sub: 'Across Industries',
              },
              {
                icon: <Users className="w-5 h-5 text-[#1463FF]" />,
                stat: '50K+',
                label: 'Users Impacted',
                sub: 'Everyday',
              },
              {
                icon: <Clock className="w-5 h-5 text-[#1463FF]" />,
                stat: '99.9%',
                label: 'System Uptime',
                sub: 'Across Platforms',
              },
              {
                icon: <Globe className="w-5 h-5 text-[#1463FF]" />,
                stat: '05+',
                label: 'Years Building',
                sub: 'Intelligent Systems',
              },
            ].map((card, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#0B132B]">
                    {card.stat}
                  </span>
                </div>
                <div className="leading-tight">
                  <span className="font-bold text-xs text-[#0B132B] block">{card.label}</span>
                  <span className="text-[10px] text-[#64748B] block">{card.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
