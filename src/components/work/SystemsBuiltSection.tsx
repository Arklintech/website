'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WORK_REVEAL_PROJECTS, WorkRevealProject } from '@/content/workReveal';
import {
  ArrowRight,
  Heart,
  BookOpen,
  UtensilsCrossed,
  Activity,
  Moon,
  Cpu,
  Pen,
  Eye,
  BarChart3,
  ShieldCheck,
  Mouse,
  GraduationCap,
  ChevronDown,
  Layers as LayersIcon,
} from 'lucide-react';

interface SystemsBuiltSectionProps {
  onOpenProjectModal?: () => void;
}

function ProjectNavIcon({ projectId, className = 'w-4 h-4' }: { projectId?: string; className?: string }) {
  if (projectId === 'daarayn') return <Heart className={className} />;
  if (projectId === 'neominds') return <GraduationCap className={className} />;
  if (projectId === 'parivar') return <UtensilsCrossed className={className} />;
  if (projectId === 'holistic-edge') return <Activity className={className} />;
  if (projectId === 'peaceful-deen') return <Moon className={className} />;
  if (projectId === 'ai-co-teacher') return <Cpu className={className} />;
  if (projectId === 'calligraphy-by-aqsa') return <Pen className={className} />;
  if (projectId === 'sakura-montessori') return <BookOpen className={className} />;
  return <Cpu className={className} />;
}

function ValueBlockIcon({ iconName, className = 'w-4 h-4 text-[#1463FF]' }: { iconName: string; className?: string }) {
  if (iconName === 'Eye') return <Eye className={className} />;
  if (iconName === 'BarChart3') return <BarChart3 className={className} />;
  if (iconName === 'ShieldCheck') return <ShieldCheck className={className} />;
  return <ShieldCheck className={className} />;
}

export default function SystemsBuiltSection({ onOpenProjectModal }: SystemsBuiltSectionProps) {
  const [activeProjectId, setActiveProjectId] = useState('daarayn');
  const [layerProgress, setLayerProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Read URL query param ?project=
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const proj = params.get('project');
      if (proj && WORK_REVEAL_PROJECTS.some((p) => p.id === proj)) {
        setActiveProjectId(proj);
        setLayerProgress(0);
      }
    }
  }, []);

  const activeProject = WORK_REVEAL_PROJECTS.find((p) => p.id === activeProjectId) ?? WORK_REVEAL_PROJECTS[0];
  const activeLayers = activeProject.layers;
  const totalLayers = activeLayers.length;

  // Calculate active layer index from scroll progress (shared across mobile & desktop)
  const activeLayerIndex = Math.min(totalLayers - 1, Math.floor(layerProgress * totalLayers));
  const currentLayerIndex = activeLayerIndex;
  const currentLayer = activeLayers[currentLayerIndex] ?? activeLayers[0];

  // Dynamic scroll scrub height per project based on layer count
  const scrollTrackHeightVh = (totalLayers + 1) * 75;

  // Scroll listener mapping scroll progress to layers
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const navbarHeight = window.innerWidth < 640 ? 64 : 80;
        const totalHeight = rect.height - (window.innerHeight - navbarHeight);
        if (totalHeight <= 0) return;

        const progress = Math.max(0, Math.min(0.999, (navbarHeight - rect.top) / totalHeight));
        setLayerProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [activeProjectId, totalLayers]);

  const handleSelectProject = useCallback((projectId: string) => {
    if (projectId === activeProjectId) return;
    setActiveProjectId(projectId);
    setLayerProgress(0);

    // Scroll smoothly to top of the work showcase
    if (containerRef.current) {
      const navbarHeight = window.innerWidth < 640 ? 64 : 80;
      const targetTop = window.scrollY + containerRef.current.getBoundingClientRect().top - navbarHeight;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  }, [activeProjectId]);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#F5F1E8] text-[#0B132B] antialiased"
      style={{
        fontFamily: "'Inter', var(--font-inter), sans-serif",
        height: `${scrollTrackHeightVh}vh`,
      }}
    >
      {/* ═══ STICKY WORK EXPERIENCE VIEWPORT ═══ */}
      <div
        className="sticky top-16 sm:top-20 flex flex-col justify-between bg-[#F5F1E8] h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-hidden"
      >
        {/* ── MOBILE HORIZONTAL PROJECT SELECTOR (< lg) ── */}
        <div className="flex lg:hidden overflow-x-auto gap-2 px-4 py-2 scrollbar-none shrink-0 bg-white/70 border-b border-[#D8D4C9] touch-pan-x">
          {WORK_REVEAL_PROJECTS.map((p) => {
            const isActive = p.id === activeProjectId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p.id)}
                className={`px-3 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase shrink-0 flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-[#1463FF] text-white shadow-xs'
                    : 'bg-white text-[#556375] border border-[#D8D4C9]'
                }`}
              >
                <span>{p.number}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── MAIN 3-COLUMN EDITORIAL COMPOSITION (MATCHING REFERENCE IMAGE) ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[240px_1fr_240px] xl:grid-cols-[260px_1fr_260px] gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 overflow-hidden min-h-0">

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* 1. LEFT COLUMN: SYSTEMS WE'VE BUILT + VERTICAL 8-PROJECT INDEX          */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex flex-col justify-between select-none h-full overflow-hidden pr-2">
            
            {/* Header Block */}
            <div className="shrink-0 space-y-2 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-[#1463FF] border border-[#D8D4C9] bg-[#EDF4FF] px-1.5 py-0.5 rounded">
                  04
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] font-bold text-[#1463FF]">
                  PROVEN PRODUCTION EVIDENCE
                </span>
              </div>

              <h1
                className="text-xl sm:text-2xl font-black text-[#0B132B] uppercase tracking-tight leading-[0.92]"
                style={{ fontFamily: "'Syncopate', sans-serif" }}
              >
                SYSTEMS<br />WE&apos;VE BUILT.
              </h1>

              <p className="text-[9.5px] sm:text-[10px] text-[#475569] leading-relaxed max-w-xs">
                Real problems. Real impact. Engineered systems built to perform where it matters most.
              </p>
            </div>

            {/* 8-Project Vertical List */}
            <div className="flex-1 flex flex-col justify-between py-2 space-y-1.5 overflow-hidden">
              {WORK_REVEAL_PROJECTS.map((proj) => {
                const isActive = proj.id === activeProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => handleSelectProject(proj.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-[#E8F1FD] border border-[#1463FF]/30 shadow-xs'
                        : 'hover:bg-white/60 border border-transparent'
                    }`}
                  >
                    {/* Icon / Active Target Dot */}
                    <div className="shrink-0 flex items-center justify-center w-6 h-6">
                      {isActive ? (
                        <div className="w-5 h-5 rounded-full border-2 border-[#1463FF] bg-white flex items-center justify-center shadow-xs">
                          <div className="w-2 h-2 rounded-full bg-[#1463FF]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 flex items-center justify-center text-[#64748B]">
                          <ProjectNavIcon projectId={proj.id} className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    {/* Project Information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-mono text-[10px] font-bold ${
                          isActive ? 'text-[#1463FF]' : 'text-[#64748B]'
                        }`}>
                          {proj.number}
                        </span>
                        <span
                          className={`font-black uppercase tracking-wider text-[9.5px] truncate ${
                            isActive ? 'text-[#0B132B]' : 'text-[#334155]'
                          }`}
                          style={{ fontFamily: "'Syncopate', sans-serif" }}
                        >
                          {proj.name}
                        </span>
                      </div>
                      <p className={`text-[8px] font-medium leading-tight truncate ${
                        isActive ? 'text-[#1463FF]' : 'text-[#64748B]'
                      }`}>
                        {proj.systemType}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Link */}
            <div className="shrink-0 pt-2 border-t border-[#D8D4C9]/60">
              <button
                onClick={() => {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 font-mono text-[9px] font-bold text-[#1463FF] hover:text-[#004AD6] transition-colors group"
              >
                <span>VIEW ALL SYSTEMS</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* 2. CENTER STAGE: SINGLE STABLE SURFACE + SEQUENTIAL ACTIVE LAYER SVG   */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col justify-between overflow-hidden min-h-0 bg-[#F5F1E8]">

            {/* Project Header & Metadata Bar */}
            <div className="shrink-0 pb-2">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                
                {/* Left: Active System Tag + Title */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#1463FF] text-white font-mono text-[7.5px] font-bold uppercase tracking-[0.16em] px-2.5 py-[2px] rounded-full shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ACTIVE SYSTEM
                    </span>
                    <button
                      onClick={onOpenProjectModal}
                      className="inline-flex items-center gap-1 font-mono text-[8px] font-bold text-[#1463FF] hover:text-[#004AD6] transition-colors group"
                    >
                      <span>WHY WE BUILT THIS SYSTEM</span>
                      <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-[#0B132B] tracking-tight shrink-0 leading-none">
                      {activeProject.number}
                    </span>
                    <h2
                      className="text-2xl sm:text-3xl font-black text-[#0B132B] uppercase leading-none tracking-tight truncate"
                      style={{ fontFamily: "'Syncopate', sans-serif" }}
                    >
                      {activeProject.name}
                    </h2>
                  </div>

                  <p className="font-mono text-[8.5px] sm:text-[9px] font-bold text-[#1463FF] uppercase tracking-[0.14em]">
                    {activeProject.systemType}
                  </p>

                  <p className="text-[9.5px] sm:text-[10px] text-[#475569] font-medium leading-tight max-w-xl line-clamp-1">
                    {activeProject.tagline}
                  </p>
                </div>

                {/* Right: Metadata Matrix (STATUS, DOMAIN, TYPE, YEAR) */}
                <div className="shrink-0 grid grid-cols-4 gap-3 sm:gap-4 text-left pt-1 sm:pt-0">
                  {[
                    { label: 'STATUS', value: activeProject.status, live: true },
                    { label: 'DOMAIN', value: activeProject.domain },
                    { label: 'TYPE', value: activeProject.type },
                    { label: 'YEAR', value: activeProject.year },
                  ].map(({ label, value, live }) => (
                    <div key={label} className="min-w-[50px]">
                      <span className="font-mono text-[7px] uppercase tracking-widest text-[#64748B] font-bold block">
                        {label}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        {live && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />}
                        <span className="font-mono text-[8.5px] sm:text-[9px] font-bold text-[#0B132B] leading-tight truncate">
                          {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* ═══ CENTRAL SYSTEM STAGE VIEWPORT (MAXIMIZED, UNDISTORTED, CLEAN) ═══ */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden min-h-[220px] sm:min-h-[300px] lg:min-h-[360px] max-h-[520px]">
              
              {/* Stacked Layer SVGs with 0ms instantaneous crossfade transitions */}
              {activeLayers.map((layer, idx) => {
                const isVisible = idx === currentLayerIndex;
                return (
                  <div
                    key={layer.number}
                    className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 transition-all duration-200 ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.985) translateY(12px)',
                      pointerEvents: isVisible ? 'auto' : 'none',
                      zIndex: isVisible ? 10 : 1,
                    }}
                  >
                    <img
                      src={layer.assetPath}
                      alt={`${activeProject.name} — ${layer.name}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                      }}
                      className="select-none pointer-events-none drop-shadow-md"
                      loading="eager"
                    />
                  </div>
                );
              })}

            </div>

            {/* Bottom Scroll Cue */}
            <div className="shrink-0 pt-2 flex items-center justify-center gap-2 font-mono text-[8px] sm:text-[8.5px] font-bold text-[#556375] uppercase tracking-wider select-none">
              <Mouse className="w-3 h-3 text-[#1463FF] animate-bounce shrink-0" />
              <span>SCROLL TO EXPLORE THE SYSTEM</span>
              <ChevronDown className="w-3 h-3 text-[#1463FF]" />
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* 3. RIGHT COLUMN: PHILOSOPHY STATEMENT + VALUE BLOCKS + LAYER INDICATOR */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex flex-col justify-between select-none h-full overflow-hidden pl-2">
            
            {/* Top Statement & 3 Value Blocks */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0B132B] tracking-tight leading-snug">
                  The screen is only the part you can see.
                </h3>
                <h3 className="text-sm font-bold text-[#1463FF] tracking-tight leading-snug">
                  The real work is everything underneath it.
                </h3>
                <div className="w-8 h-[2px] bg-[#1463FF] mt-2" />
              </div>

              {/* 3 Value Blocks */}
              <div className="space-y-3 pt-1">
                {activeProject.valueBlocks.map((block, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="shrink-0 w-6 h-6 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/30 flex items-center justify-center text-[#1463FF] mt-0.5">
                      <ValueBlockIcon iconName={block.icon} className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-mono text-[8.5px] font-bold text-[#0B132B] leading-tight">
                        {block.title}
                      </h4>
                      <p className="text-[8px] text-[#556375] leading-relaxed mt-0.5">
                        {block.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Active Layer Progress Display */}
            <div className="pt-4 border-t border-[#D8D4C9]/60 space-y-1">
              <span className="font-mono text-[8px] font-bold text-[#64748B] uppercase tracking-wider block">
                LAYER {currentLayer.number} OF {String(totalLayers).padStart(2, '0')}
              </span>

              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="font-mono text-3xl font-black text-[#0B132B]">
                  {currentLayer.number}
                </span>
                <span className="font-mono text-lg font-bold text-[#64748B]">
                  / {String(totalLayers).padStart(2, '0')}
                </span>
              </div>

              <span className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-wider block pt-0.5">
                {currentLayer.name}
              </span>

              <p className="text-[8.5px] text-[#556375] font-medium leading-tight">
                {currentLayer.description}
              </p>
            </div>

          </div>

        </div>

        {/* ── MOBILE LAYER PROGRESS & INFO BAR (< lg) ── */}
        <div className="flex lg:hidden flex-col items-center justify-center bg-white/95 backdrop-blur-md border-t border-[#D8D4C9] text-xs font-mono shrink-0 px-4 py-2.5 space-y-1 text-center z-20">
          <span className="text-[#1463FF] font-bold text-[11px] sm:text-xs uppercase tracking-wider">
            LAYER {currentLayer.number} / {String(totalLayers).padStart(2, '0')} · {currentLayer.name}
          </span>
          <p className="text-[9.5px] sm:text-[10px] text-[#475569] font-sans font-medium line-clamp-1">
            {currentLayer.description}
          </p>
        </div>

      </div>
    </div>
  );
}
