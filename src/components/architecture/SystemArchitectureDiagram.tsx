'use client';

import React from 'react';
import {
  Server,
  Cpu,
  Cog,
  Monitor,
  Layers,
  Database,
  Share2,
  TrendingUp,
  BarChart3,
  Crosshair,
  FileText,
  Workflow,
  CheckCircle2,
  Activity,
} from 'lucide-react';

const ARCHITECTURE_LAYERS = [
  {
    id: 'layer-01',
    number: 'LAYER 01',
    title: 'SOFTWARE',
    subtitle: 'Interfaces & Platforms',
    icon: Server,
    modules: [
      { name: 'User Interfaces', icon: Monitor },
      { name: 'Application Platforms', icon: Layers },
      { name: 'Data & Services', icon: Database },
      { name: 'APIs & Integrations', icon: Share2 },
    ],
  },
  {
    id: 'layer-02',
    number: 'LAYER 02',
    title: 'INTELLIGENCE',
    subtitle: 'AI Decision Engines',
    icon: Cpu,
    modules: [
      { name: 'Machine Learning', icon: TrendingUp },
      { name: 'Predictive Analytics', icon: BarChart3 },
      { name: 'Optimization Engines', icon: Crosshair },
      { name: 'Knowledge Systems', icon: FileText },
    ],
  },
  {
    id: 'layer-03',
    number: 'LAYER 03',
    title: 'AUTOMATION',
    subtitle: 'Workflows & Operations',
    icon: Cog,
    modules: [
      { name: 'Workflow Automation', icon: Workflow },
      { name: 'Process Orchestration', icon: Share2 },
      { name: 'Task Execution', icon: CheckCircle2 },
      { name: 'Monitoring & Control', icon: Activity },
    ],
  },
];

function BoldDesktopConnectorWire({ id }: { id: string }) {
  const pathD = "M 0 22 C 45 22, 55 58, 105 58 L 146 58";

  return (
    <div className="hidden lg:flex items-center justify-center w-28 xl:w-36 2xl:w-44 shrink-0 relative px-1 select-none pointer-events-none">
      {/* Decorative Blueprint Matrix Dots matching reference */}
      <div className="absolute top-2 left-3 grid grid-cols-4 gap-1 opacity-30">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#1463FF]" />
        ))}
      </div>

      <svg
        viewBox="0 0 160 80"
        className="w-full h-20 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`wireGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1463FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#1463FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0050E6" stopOpacity="1" />
          </linearGradient>

          <filter id={`auraGlow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. WIDE LUMINOUS AMBIENT GLOW TUBE */}
        <path
          d={pathD}
          stroke="#1463FF"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
          filter={`url(#auraGlow-${id})`}
        />

        {/* 2. TRANSLUCENT DATA CONDUIT PIPE */}
        <path
          d={pathD}
          stroke="#DCEAFF"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* 3. CORE ARCHITECTURAL HIGH-PRECISION BLUE WIRE */}
        <path
          d={pathD}
          stroke={`url(#wireGrad-${id})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. ACTIVE FLOWING ELECTRICAL DASH PULSE */}
        <path
          d={pathD}
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 16"
          opacity="0.9"
          style={{ animation: 'dash 1.4s linear infinite' }}
        />

        {/* 5. CONNECTION PORT NODES */}
        <g transform="translate(0, 22)">
          <circle cx="0" cy="0" r="6" fill="#1463FF" opacity="0.35" className="animate-ping" />
          <circle cx="0" cy="0" r="4.5" fill="#1463FF" />
          <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
        </g>

        <g transform="translate(75, 40)">
          <circle cx="0" cy="0" r="3.5" fill="#1463FF" opacity="0.6" />
          <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
        </g>

        {/* 6. HIGH-PRECISION VECTOR ARROW TERMINAL HEAD */}
        <path
          d="M 134 49 L 148 58 L 134 67"
          stroke="#1463FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 7. CONTINUOUS TRAVELING PRIMARY PHOTON */}
        <circle r="6" fill="#1463FF" filter={`url(#auraGlow-${id})`}>
          <animateMotion dur="2s" repeatCount="indefinite" path={pathD} />
        </circle>
        <circle r="2.8" fill="#FFFFFF">
          <animateMotion dur="2s" repeatCount="indefinite" path={pathD} />
        </circle>

        {/* 8. CONTINUOUS TRAVELING SECONDARY PHOTON */}
        <circle r="5" fill="#1463FF" opacity="0.85" filter={`url(#auraGlow-${id})`}>
          <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path={pathD} />
        </circle>
        <circle r="2.2" fill="#FFFFFF">
          <animateMotion dur="2s" begin="1s" repeatCount="indefinite" path={pathD} />
        </circle>
      </svg>

      <div className="absolute bottom-2 right-3 grid grid-cols-4 gap-1 opacity-30">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-[#1463FF]" />
        ))}
      </div>
    </div>
  );
}

function BoldMobileConnectorWire({ id }: { id: string }) {
  const pathD = "M 30 0 L 30 68";

  return (
    <div className="lg:hidden flex items-center justify-center h-20 w-full my-2 select-none pointer-events-none">
      <svg
        viewBox="0 0 60 84"
        className="h-full w-14 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`glow-mob-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur1" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path d={pathD} stroke="#1463FF" strokeWidth="12" opacity="0.25" filter={`url(#glow-mob-${id})`} />
        <path d={pathD} stroke="#DCEAFF" strokeWidth="6" opacity="0.9" />
        <path d={pathD} stroke="#1463FF" strokeWidth="3.5" />
        <path
          d={pathD}
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeDasharray="6 12"
          opacity="0.9"
          style={{ animation: 'dash 1.4s linear infinite' }}
        />

        <g transform="translate(30, 4)">
          <circle cx="0" cy="0" r="5" fill="#1463FF" opacity="0.35" className="animate-ping" />
          <circle cx="0" cy="0" r="4" fill="#1463FF" />
          <circle cx="0" cy="0" r="1.8" fill="#FFFFFF" />
        </g>

        <path d="M 21 58 L 30 70 L 39 58" stroke="#1463FF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        <circle r="5.5" fill="#1463FF" filter={`url(#glow-mob-${id})`}>
          <animateMotion dur="1.6s" repeatCount="indefinite" path={pathD} />
        </circle>
        <circle r="2.5" fill="#FFFFFF">
          <animateMotion dur="1.6s" repeatCount="indefinite" path={pathD} />
        </circle>

        <circle r="4.5" fill="#1463FF" opacity="0.85" filter={`url(#glow-mob-${id})`}>
          <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path={pathD} />
        </circle>
        <circle r="1.8" fill="#FFFFFF">
          <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path={pathD} />
        </circle>
      </svg>
    </div>
  );
}

export default function SystemArchitectureDiagram() {
  return (
    <div className="rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] p-5 sm:p-7 lg:p-10 shadow-sm relative overflow-hidden">
      {/* Top Panel Technical Metadata Row */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#D8D4C9]/70">
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#111827] tracking-wider uppercase">
          <span className="text-[#1463FF] font-black text-sm">&gt;_</span>
          <span>SYSTEM ARCHITECTURE DIAGRAM // v4.2</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <span className="text-[#536070]">STATUS:</span>
          <span className="text-[#1463FF] flex items-center gap-1.5 font-semibold">
            OPERATIONAL
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_6px_#10B981]" />
          </span>
        </div>
      </div>

      {/* 3 Connected Architecture Layer Cards + Bold Living Blue Vector Connector Wires */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-0 relative">
        {/* LAYER 01: SOFTWARE */}
        <div className="flex-1 rounded-2xl bg-white border border-[#D8D4C9] p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all hover:border-[#1463FF]/50 hover:shadow-md group">
          <div className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-3 group-hover:scale-105 transition-transform shadow-xs">
                <Server className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1463FF]">
                LAYER 01
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#111827] uppercase tracking-tight mt-0.5">
                SOFTWARE
              </h3>
              <div className="w-8 h-0.5 bg-[#1463FF] my-2" />
              <p className="text-xs text-[#536070] font-body">
                Interfaces &amp; Platforms
              </p>
            </div>

            <div className="pt-2 space-y-2">
              {ARCHITECTURE_LAYERS[0].modules.map((mod) => {
                const ModIcon = mod.icon;
                return (
                  <div
                    key={mod.name}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FBF9F3] border border-[#D8D4C9]/60 hover:bg-[#EDF4FF] hover:border-[#1463FF]/30 transition-colors shadow-2xs"
                  >
                    <ModIcon className="w-4 h-4 text-[#1463FF] shrink-0" />
                    <span className="font-mono text-xs text-[#111827] font-semibold">
                      {mod.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOLD LIVING CONNECTOR WIRE 1 (Software -> Intelligence) */}
        <BoldDesktopConnectorWire id="bold-wire-1" />
        <BoldMobileConnectorWire id="bold-wire-1-mob" />

        {/* LAYER 02: INTELLIGENCE (Central Processing Role) */}
        <div className="flex-1 rounded-2xl bg-white border-2 border-[#1463FF]/50 p-6 sm:p-7 flex flex-col justify-between shadow-md transition-all hover:border-[#1463FF] hover:shadow-lg group relative">
          <div className="absolute inset-0 bg-[#EDF4FF]/35 rounded-2xl pointer-events-none -z-10" />

          <div className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/40 flex items-center justify-center text-[#1463FF] mb-3 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(20,99,255,0.18)]">
                <Cpu className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1463FF]">
                LAYER 02
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#111827] uppercase tracking-tight mt-0.5">
                INTELLIGENCE
              </h3>
              <div className="w-8 h-0.5 bg-[#1463FF] my-2" />
              <p className="text-xs text-[#536070] font-body">
                AI Decision Engines
              </p>
            </div>

            <div className="pt-2 space-y-2">
              {ARCHITECTURE_LAYERS[1].modules.map((mod) => {
                const ModIcon = mod.icon;
                return (
                  <div
                    key={mod.name}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FBF9F3] border border-[#D8D4C9]/60 hover:bg-[#EDF4FF] hover:border-[#1463FF]/30 transition-colors shadow-2xs"
                  >
                    <ModIcon className="w-4 h-4 text-[#1463FF] shrink-0" />
                    <span className="font-mono text-xs text-[#111827] font-semibold">
                      {mod.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOLD LIVING CONNECTOR WIRE 2 (Intelligence -> Automation) */}
        <BoldDesktopConnectorWire id="bold-wire-2" />
        <BoldMobileConnectorWire id="bold-wire-2-mob" />

        {/* LAYER 03: AUTOMATION */}
        <div className="flex-1 rounded-2xl bg-white border border-[#D8D4C9] p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all hover:border-[#1463FF]/50 hover:shadow-md group">
          <div className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-3 group-hover:scale-105 transition-transform shadow-xs">
                <Cog className="w-6 h-6 stroke-[1.75]" />
              </div>
              <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#1463FF]">
                LAYER 03
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-[#111827] uppercase tracking-tight mt-0.5">
                AUTOMATION
              </h3>
              <div className="w-8 h-0.5 bg-[#1463FF] my-2" />
              <p className="text-xs text-[#536070] font-body">
                Workflows &amp; Operations
              </p>
            </div>

            <div className="pt-2 space-y-2">
              {ARCHITECTURE_LAYERS[2].modules.map((mod) => {
                const ModIcon = mod.icon;
                return (
                  <div
                    key={mod.name}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#FBF9F3] border border-[#D8D4C9]/60 hover:bg-[#EDF4FF] hover:border-[#1463FF]/30 transition-colors shadow-2xs"
                  >
                    <ModIcon className="w-4 h-4 text-[#1463FF] shrink-0" />
                    <span className="font-mono text-xs text-[#111827] font-semibold">
                      {mod.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Topology Footnote Caption */}
      <div className="mt-8 pt-6 border-t border-[#D8D4C9]/70 flex items-center justify-center gap-3 select-none">
        <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#1463FF]/50" />
        <div className="grid grid-cols-3 gap-1">
          <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
          <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
          <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
          <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
          <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
          <span className="w-1 h-1 rounded-full bg-[#1463FF]" />
        </div>
        <span className="font-mono text-[11px] font-bold text-[#111827] uppercase tracking-[0.2em] text-center">
          INTEGRATED OPERATIONAL SYSTEM TOPOLOGY
        </span>
        <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#1463FF]/50" />
      </div>
    </div>
  );
}
