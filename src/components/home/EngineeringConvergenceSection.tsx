'use client';

import React, { useState, useId } from 'react';
import { KeystoneMark } from '@/components/brand/KeystoneLogo';
import {
  Box,
  Code,
  Database,
  GitBranch,
  ShieldCheck,
  Lock,
  Cpu,
  BarChart3,
  Puzzle,
  Rocket,
  Activity,
  Layers,
  Zap,
  Target,
} from 'lucide-react';

interface EngineeringDiscipline {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  side: 'left' | 'right';
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  cp1x: number;
  cp1y: number;
  cp2x: number;
  cp2y: number;
  duration: number;
  delay: number;
}

const DISCIPLINES: EngineeringDiscipline[] = [
  // LEFT FLANK (6 Disciplines)
  {
    id: 'architecture',
    label: 'ARCHITECTURE',
    description: 'System structure, boundaries & services',
    icon: Box,
    side: 'left',
    x: 245,
    y: 35,
    targetX: 475,
    targetY: 185,
    cp1x: 350,
    cp1y: 35,
    cp2x: 395,
    cp2y: 185,
    duration: 2.1,
    delay: 0.0,
  },
  {
    id: 'apis',
    label: 'APIS',
    description: 'Interfaces that connect services & data',
    icon: Code,
    side: 'left',
    x: 245,
    y: 105,
    targetX: 465,
    targetY: 198,
    cp1x: 335,
    cp1y: 105,
    cp2x: 385,
    cp2y: 198,
    duration: 2.4,
    delay: 0.4,
  },
  {
    id: 'databases',
    label: 'DATABASES',
    description: 'Persistent models & system state',
    icon: Database,
    side: 'left',
    x: 245,
    y: 175,
    targetX: 465,
    targetY: 210,
    cp1x: 325,
    cp1y: 175,
    cp2x: 385,
    cp2y: 210,
    duration: 2.8,
    delay: 0.8,
  },
  {
    id: 'workflows',
    label: 'WORKFLOWS',
    description: 'Events, states & operational execution',
    icon: GitBranch,
    side: 'left',
    x: 245,
    y: 245,
    targetX: 465,
    targetY: 222,
    cp1x: 325,
    cp1y: 245,
    cp2x: 385,
    cp2y: 222,
    duration: 2.2,
    delay: 0.2,
  },
  {
    id: 'security',
    label: 'SECURITY',
    description: 'Access, integrity & data protection',
    icon: ShieldCheck,
    side: 'left',
    x: 245,
    y: 315,
    targetX: 465,
    targetY: 235,
    cp1x: 335,
    cp1y: 315,
    cp2x: 385,
    cp2y: 235,
    duration: 2.7,
    delay: 0.6,
  },
  {
    id: 'authentication',
    label: 'AUTHENTICATION',
    description: 'Identity, permissions & controlled access',
    icon: Lock,
    side: 'left',
    x: 245,
    y: 385,
    targetX: 475,
    targetY: 248,
    cp1x: 350,
    cp1y: 385,
    cp2x: 395,
    cp2y: 248,
    duration: 2.3,
    delay: 1.0,
  },

  // RIGHT FLANK (5 Disciplines)
  {
    id: 'ai-intelligence',
    label: 'AI & INTELLIGENCE',
    description: 'Analysis, inference & decision support',
    icon: Cpu,
    side: 'right',
    x: 955,
    y: 50,
    targetX: 725,
    targetY: 190,
    cp1x: 850,
    cp1y: 50,
    cp2x: 805,
    cp2y: 190,
    duration: 1.9,
    delay: 0.1,
  },
  {
    id: 'data-pipelines',
    label: 'DATA PIPELINES',
    description: 'Ingestion, processing & movement',
    icon: BarChart3,
    side: 'right',
    x: 955,
    y: 130,
    targetX: 735,
    targetY: 205,
    cp1x: 865,
    cp1y: 130,
    cp2x: 815,
    cp2y: 205,
    duration: 2.5,
    delay: 0.5,
  },
  {
    id: 'integrations',
    label: 'INTEGRATIONS',
    description: 'Connecting systems & external platforms',
    icon: Puzzle,
    side: 'right',
    x: 955,
    y: 210,
    targetX: 735,
    targetY: 218,
    cp1x: 875,
    cp1y: 210,
    cp2x: 815,
    cp2y: 218,
    duration: 2.6,
    delay: 0.9,
  },
  {
    id: 'deployment',
    label: 'DEPLOYMENT',
    description: 'Release, infrastructure & runtime delivery',
    icon: Rocket,
    side: 'right',
    x: 955,
    y: 290,
    targetX: 735,
    targetY: 230,
    cp1x: 865,
    cp1y: 290,
    cp2x: 815,
    cp2y: 230,
    duration: 2.2,
    delay: 0.3,
  },
  {
    id: 'observability',
    label: 'OBSERVABILITY',
    description: 'System health, logs & real-time signals',
    icon: Activity,
    side: 'right',
    x: 955,
    y: 370,
    targetX: 725,
    targetY: 245,
    cp1x: 850,
    cp1y: 370,
    cp2x: 805,
    cp2y: 245,
    duration: 2.0,
    delay: 0.7,
  },
];

const PILLARS = [
  {
    title: 'SECURE BY DESIGN',
    desc: 'Built around controlled access and protected data.',
    icon: ShieldCheck,
  },
  {
    title: 'BUILT TO SCALE',
    desc: 'Modular systems designed for changing requirements.',
    icon: Layers,
  },
  {
    title: 'REAL-TIME INSIGHT',
    desc: 'Operational signals remain visible across the system.',
    icon: Zap,
  },
  {
    title: 'OPERATIONAL FOCUS',
    desc: 'Engineering decisions tied to real operating conditions.',
    icon: Target,
  },
];

function buildPathD(node: EngineeringDiscipline): string {
  return `M ${node.x} ${node.y} C ${node.cp1x} ${node.cp1y}, ${node.cp2x} ${node.cp2y}, ${node.targetX} ${node.targetY}`;
}

export default function EngineeringConvergenceSection() {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const uniqueId = useId().replace(/:/g, '-');

  return (
    <section
      id="engineering-convergence"
      className="py-8 sm:py-10 md:py-12 border-b border-[#D8D4C9] bg-[#F5F1E8] relative overflow-hidden select-none text-[#536070]"
      aria-label="ARKLINTECH Technical Infrastructure Convergence Topology"
    >
      {/* CSS Keyframe Animations for Controlled Electrical Stream Flow */}
      <style jsx>{`
        @keyframes dashStreamLeft {
          0% {
            stroke-dashoffset: 240;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes dashStreamRight {
          0% {
            stroke-dashoffset: -240;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes hubPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.75;
          }
        }
        .anim-dash-left {
          animation: dashStreamLeft 2.2s linear infinite;
        }
        .anim-dash-right {
          animation: dashStreamRight 2.2s linear infinite;
        }
        .anim-hub-pulse {
          animation: hubPulse 3.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-dash-left,
          .anim-dash-right,
          .anim-hub-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Subtle Engineering Blueprint Grid */}
      <div className="absolute inset-0 technical-grid opacity-15 pointer-events-none" />

      {/* Center Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-[#1677FF]/15 blur-[80px] pointer-events-none transition-opacity duration-500 anim-hub-pulse ${
          activeNodeId ? 'opacity-90' : 'opacity-40'
        }`}
      />

      <div className="max-w-[1280px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* SECTION HEADER */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#1463FF] tracking-wider uppercase">
              05 — TECHNICAL INFRASTRUCTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#111827] tracking-tight uppercase">
            ENGINEERED FOR REAL OPERATIONS
          </h2>
          <p className="mt-1 text-[11px] sm:text-xs md:text-sm text-[#536070] font-body max-w-2xl leading-relaxed">
            Every system is part of a connected architecture. Designed to operate. Built to scale.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* UNIFIED RESPONSIVE CONVERGENCE TOPOLOGY (DESKTOP, TABLET & MOBILE)        */}
        {/* ========================================================================= */}
        <div className="relative w-full h-[380px] sm:h-[410px] md:h-[430px] lg:h-[450px] max-w-[1200px] mx-auto select-none my-1">
          {/* SVG Topology Vector Canvas (Scales proportionally across all viewports) */}
          <svg
            viewBox="0 0 1200 420"
            className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <filter id={`beamGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id={`pinGlow-${uniqueId}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id={`streamGradLeft-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0B2E73" stopOpacity="0.2" />
                <stop offset="40%" stopColor="#1463FF" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#1463FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id={`streamGradRight-${uniqueId}`} x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0B2E73" stopOpacity="0.2" />
                <stop offset="40%" stopColor="#1463FF" stopOpacity="0.85" />
                <stop offset="90%" stopColor="#1463FF" stopOpacity="1" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Faint Concentric Technical Center Rings */}
            <g transform="translate(600, 218)" className="opacity-25">
              <circle r="120" fill="none" stroke="#00A3FF" strokeWidth="0.75" strokeDasharray="3 9" />
              <circle r="150" fill="none" stroke="#00E5FF" strokeWidth="0.75" strokeDasharray="2 16" />
            </g>

            {/* Render 11 Dynamic Bézier Streams with Moving Signal Photons */}
            {DISCIPLINES.map((node) => {
              const pathD = buildPathD(node);
              const isHovered = activeNodeId === node.id;
              const hasActiveHover = activeNodeId !== null;
              const isDimmed = hasActiveHover && !isHovered;

              const streamGrad = node.side === 'left' ? `url(#streamGradLeft-${uniqueId})` : `url(#streamGradRight-${uniqueId})`;

              return (
                <g
                  key={node.id}
                  className="transition-opacity duration-300"
                  opacity={isDimmed ? 0.25 : 1}
                >
                  {/* Ambient Glow Trail */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#0B2E73"
                    strokeWidth={isHovered ? 4 : 2}
                    strokeOpacity={isHovered ? 0.6 : 0.25}
                    filter={`url(#beamGlow-${uniqueId})`}
                  />

                  {/* Sharp Core Circuit Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHovered ? '#00E5FF' : 'rgba(0, 163, 255, 0.45)'}
                    strokeWidth={isHovered ? 2.4 : 1.4}
                  />

                  {/* Traveling Electric Dash Pulse */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={streamGrad}
                    strokeWidth={isHovered ? 3.0 : 2.0}
                    strokeDasharray="45 150"
                    strokeLinecap="round"
                    className={node.side === 'left' ? 'anim-dash-left' : 'anim-dash-right'}
                    style={{
                      animationDuration: `${isHovered ? node.duration * 0.6 : node.duration}s`,
                    }}
                    filter={`url(#beamGlow-${uniqueId})`}
                  />

                  {/* Primary Luminous Signal Particle */}
                  <circle
                    r={isHovered ? 4.8 : 3.8}
                    fill="#1463FF"
                    filter={`url(#beamGlow-${uniqueId})`}
                  >
                    <animateMotion
                      dur={`${isHovered ? node.duration * 0.6 : node.duration}s`}
                      repeatCount="indefinite"
                      path={pathD}
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>

                  {/* Center White Photon Dot */}
                  <circle
                    r={isHovered ? 2.4 : 1.8}
                    fill="#FFFFFF"
                  >
                    <animateMotion
                      dur={`${isHovered ? node.duration * 0.6 : node.duration}s`}
                      repeatCount="indefinite"
                      path={pathD}
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>

                  {/* Trailing Secondary Micro Particle */}
                  <circle
                    r={isHovered ? 3.0 : 2.2}
                    fill="#38BDF8"
                    opacity={0.8}
                  >
                    <animateMotion
                      dur={`${isHovered ? node.duration * 0.6 : node.duration}s`}
                      begin={`${node.delay}s`}
                      repeatCount="indefinite"
                      path={pathD}
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>

                  {/* Source Node Pinpoint on Card */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 5.5 : 4}
                    fill="#1463FF"
                    filter={`url(#pinGlow-${uniqueId})`}
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={2}
                    fill="#FFFFFF"
                  />
                </g>
              );
            })}
          </svg>

          {/* ----------------------------------------------------------- */}
          {/* LEFT FLANK: 6 Discipline Nodes Stack                        */}
          {/* ----------------------------------------------------------- */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between w-[28%] sm:w-[24%] md:w-[22%] lg:w-[235px] z-10 py-1">
            {DISCIPLINES.filter((d) => d.side === 'left').map((node) => {
              const Icon = node.icon;
              const isHovered = activeNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  onMouseLeave={() => setActiveNodeId(null)}
                  onClick={() => setActiveNodeId(isHovered ? null : node.id)}
                  onFocus={() => setActiveNodeId(node.id)}
                  onBlur={() => setActiveNodeId(null)}
                  tabIndex={0}
                  className={`w-full px-1.5 sm:px-2 md:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF] ${
                    isHovered
                      ? 'bg-[#EDF4FF] border-[#1463FF] shadow-[0_0_18px_rgba(0,229,255,0.3)] translate-x-0.5 sm:translate-x-1'
                      : 'bg-white/95 border-[#D8D4C9] hover:border-[#1463FF]/50'
                  }`}
                  aria-label={`${node.label}: ${node.description}`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 pr-0.5 sm:pr-1">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        isHovered
                          ? 'bg-[#00E5FF] border-[#1463FF] text-[#03070E]'
                          : 'bg-[#EDF4FF] border-[#00A3FF]/25 text-[#1463FF] group-hover:border-[#1463FF]'
                      }`}
                    >
                      <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`font-display text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider truncate transition-colors ${
                          isHovered ? 'text-[#1463FF]' : 'text-[#111827]'
                        }`}
                      >
                        {node.label}
                      </div>
                      <div className="hidden sm:block text-[8.5px] md:text-[9.5px] text-[#536070] font-body truncate leading-none mt-0.5">
                        {node.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ----------------------------------------------------------- */}
          {/* CENTRAL CONVERGENCE HUB                                      */}
          {/* ----------------------------------------------------------- */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <div className="w-[125px] sm:w-[170px] md:w-[200px] lg:w-[230px] rounded-lg sm:rounded-xl bg-white/95 border border-[#1463FF] sm:border-2 sm:border-[#1463FF] shadow-[0_0_20px_rgba(0,229,255,0.25)] sm:shadow-[0_0_35px_rgba(0,229,255,0.35)] p-2 sm:p-3 lg:p-4 flex flex-col items-center justify-center text-center backdrop-blur-md">
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                <KeystoneMark className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 shrink-0" />
                <div
                  className="font-logo font-bold text-[#111827] uppercase text-[10px] sm:text-xs lg:text-sm tracking-[0.16em] sm:tracking-[0.2em] leading-none"
                  style={{ fontFamily: 'var(--font-syncopate), sans-serif' }}
                >
                  <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>
                </div>
              </div>

              <div className="mt-1 sm:mt-1.5 font-body font-medium text-[#536070] text-[6.5px] sm:text-[7.5px] lg:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.26em] leading-none">
                — TECHNOLOGY SYSTEMS —
              </div>

              <div className="mt-1.5 sm:mt-2.5 pt-1 sm:pt-1.5 border-t border-[#1463FF]/30 w-full text-center">
                <span className="font-body text-[7px] sm:text-[8px] lg:text-[8.5px] font-bold text-[#1463FF] tracking-[0.16em] sm:tracking-[0.2em] uppercase">
                  CONNECTED. SECURE. INTELLIGENT.
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* RIGHT FLANK: 5 Discipline Nodes Stack                        */}
          {/* ----------------------------------------------------------- */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around w-[28%] sm:w-[24%] md:w-[22%] lg:w-[235px] z-10 py-1">
            {DISCIPLINES.filter((d) => d.side === 'right').map((node) => {
              const Icon = node.icon;
              const isHovered = activeNodeId === node.id;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  onMouseLeave={() => setActiveNodeId(null)}
                  onClick={() => setActiveNodeId(isHovered ? null : node.id)}
                  onFocus={() => setActiveNodeId(node.id)}
                  onBlur={() => setActiveNodeId(null)}
                  tabIndex={0}
                  className={`w-full px-1.5 sm:px-2 md:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg border transition-all duration-200 flex items-center justify-between cursor-pointer group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00E5FF] ${
                    isHovered
                      ? 'bg-[#EDF4FF] border-[#1463FF] shadow-[0_0_18px_rgba(0,229,255,0.3)] -translate-x-0.5 sm:-translate-x-1'
                      : 'bg-white/95 border-[#D8D4C9] hover:border-[#1463FF]/50'
                  }`}
                  aria-label={`${node.label}: ${node.description}`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 pr-0.5 sm:pr-1">
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        isHovered
                          ? 'bg-[#00E5FF] border-[#1463FF] text-[#03070E]'
                          : 'bg-[#EDF4FF] border-[#00A3FF]/25 text-[#1463FF] group-hover:border-[#1463FF]'
                      }`}
                    >
                      <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`font-display text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider truncate transition-colors ${
                          isHovered ? 'text-[#1463FF]' : 'text-[#111827]'
                        }`}
                      >
                        {node.label}
                      </div>
                      <div className="hidden sm:block text-[8.5px] md:text-[9.5px] text-[#536070] font-body truncate leading-none mt-0.5">
                        {node.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM PILLAR BAR                                                         */}
        {/* ========================================================================= */}
        <div className="mt-5 sm:mt-6 pt-4 border-t border-[#D8D4C9]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-2.5 sm:p-3 rounded-lg bg-white border border-[#D8D4C9] flex items-center gap-2.5 hover:border-[#1463FF]/30 transition-colors"
                >
                  <div className="w-7 h-7 rounded-md bg-[#EDF4FF] border border-[#00A3FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-display text-[10.5px] font-bold text-[#111827] uppercase tracking-wider truncate">
                      {pillar.title}
                    </h4>
                    <p className="text-[9.5px] text-[#536070] font-body truncate mt-0.5">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
