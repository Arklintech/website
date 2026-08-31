'use client';

import React from 'react';
import {
  Brain,
  Monitor,
  Workflow,
  Zap,
  Database,
  Cog,
  Target,
} from 'lucide-react';

export default function SystemArchitectureFlow() {
  const pathWire1 = "M 260 180 L 285 180 C 320 180, 320 95, 350 95";
  const pathWire2 = "M 650 95 L 680 95 C 710 95, 710 180, 740 180";
  const pathWire3 = "M 500 160 L 500 200";
  const pathWire4 = "M 500 320 L 500 360";
  const pathWire5 = "M 260 440 L 285 440 C 315 440, 315 420, 350 420";
  const pathWire6 = "M 850 240 L 850 405 C 850 420, 835 420, 820 420 L 650 420";
  const pathWire7 = "M 500 480 L 500 520";

  return (
    <div className="w-full rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
      {/* ========================================================================= */}
      {/* TOP HEADER ROW                                                            */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#D8D4C9]/70 relative z-20">
        <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold text-[#111827] tracking-wider uppercase">
          <span className="text-[#1463FF] font-black text-base">&gt;.</span>
          <span>SYSTEM ARCHITECTURE FLOW</span>
          <span className="text-[#536070] font-normal text-xs">// v4.2</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
          <span className="text-[#536070]">STATUS:</span>
          <span className="text-[#1463FF] flex items-center gap-1.5 font-semibold">
            OPERATIONAL
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP INTEGRATED 100% ALIGNED SVG VECTOR CANVAS                         */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full select-none">
        <svg
          viewBox="0 0 1000 670"
          className="w-full h-auto overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="flowWireGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1463FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1463FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#0050E6" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="intelCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F6FAFF" />
              <stop offset="100%" stopColor="#EDF4FF" />
            </linearGradient>

            {/* Glow and Drop Shadows */}
            <filter id="wireGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="125%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#111827" floodOpacity="0.04" />
            </filter>

            <filter id="intelShadow" x="-10%" y="-10%" width="120%" height="125%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#1463FF" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Blueprint Matrix Dots */}
          <g opacity="0.25">
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3, 4, 5].map((col) => (
                <circle key={`dot1-${row}-${col}`} cx={50 + col * 12} cy={40 + row * 12} r="1.5" fill="#1463FF" />
              ))
            )}
            {[0, 1, 2, 3].map((row) =>
              [0, 1, 2, 3, 4, 5].map((col) => (
                <circle key={`dot2-${row}-${col}`} cx={900 + col * 12} cy={560 + row * 12} r="1.5" fill="#1463FF" />
              ))
            )}
          </g>

          {/* ===================================================================== */}
          {/* 7 LIVING BLUE VECTOR CONDUITS                                         */}
          {/* ===================================================================== */}

          {/* WIRE 1: SOFTWARE (260, 180) -> INTELLIGENCE (350, 95) */}
          <g>
            <path d={pathWire1} stroke="#1463FF" strokeWidth="12" opacity="0.22" filter="url(#wireGlow)" />
            <path d={pathWire1} stroke="#DCEAFF" strokeWidth="6" opacity="0.9" />
            <path d={pathWire1} stroke="url(#flowWireGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d={pathWire1} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 12" style={{ animation: 'dash 1.4s linear infinite' }} />
            <path d="M 338 89 L 350 95 L 338 101" stroke="#1463FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="260" cy="180" r="4.5" fill="#1463FF" />
            <circle cx="260" cy="180" r="2" fill="#FFFFFF" />
            <circle cx="285" cy="180" r="4" fill="#1463FF" opacity="0.85" />
            <circle cx="285" cy="180" r="1.8" fill="#FFFFFF" />
            <circle r="5.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="2s" repeatCount="indefinite" path={pathWire1} /></circle>
            <circle r="2.2" fill="#FFFFFF"><animateMotion dur="2s" repeatCount="indefinite" path={pathWire1} /></circle>
          </g>

          {/* WIRE 2: INTELLIGENCE (650, 95) -> AUTOMATION (740, 180) */}
          <g>
            <path d={pathWire2} stroke="#1463FF" strokeWidth="12" opacity="0.22" filter="url(#wireGlow)" />
            <path d={pathWire2} stroke="#DCEAFF" strokeWidth="6" opacity="0.9" />
            <path d={pathWire2} stroke="url(#flowWireGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d={pathWire2} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 12" style={{ animation: 'dash 1.4s linear infinite' }} />
            <path d="M 728 174 L 740 180 L 728 186" stroke="#1463FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="650" cy="95" r="4.5" fill="#1463FF" />
            <circle cx="650" cy="95" r="2" fill="#FFFFFF" />
            <circle cx="680" cy="95" r="4" fill="#1463FF" opacity="0.85" />
            <circle cx="680" cy="95" r="1.8" fill="#FFFFFF" />
            <circle r="5.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="2s" repeatCount="indefinite" path={pathWire2} /></circle>
            <circle r="2.2" fill="#FFFFFF"><animateMotion dur="2s" repeatCount="indefinite" path={pathWire2} /></circle>
          </g>

          {/* WIRE 3: INTELLIGENCE (500, 160) -> ORCHESTRATION (500, 200) */}
          <g>
            <path d={pathWire3} stroke="#1463FF" strokeWidth="10" opacity="0.2" filter="url(#wireGlow)" />
            <path d={pathWire3} stroke="#DCEAFF" strokeWidth="5" opacity="0.9" />
            <path d={pathWire3} stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" />
            <path d={pathWire3} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 8" style={{ animation: 'dash 1.2s linear infinite' }} />
            <path d="M 494 192 L 500 200 L 506 192" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="500" cy="160" r="4" fill="#1463FF" />
            <circle cx="500" cy="160" r="1.8" fill="#FFFFFF" />
            <circle cx="500" cy="180" r="3.5" fill="#1463FF" opacity="0.85" />
            <circle cx="500" cy="180" r="1.5" fill="#FFFFFF" />
            <circle r="4.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="1.4s" repeatCount="indefinite" path={pathWire3} /></circle>
            <circle r="1.8" fill="#FFFFFF"><animateMotion dur="1.4s" repeatCount="indefinite" path={pathWire3} /></circle>
          </g>

          {/* WIRE 4: ORCHESTRATION (500, 320) -> OPERATIONS (500, 360) */}
          <g>
            <path d={pathWire4} stroke="#1463FF" strokeWidth="10" opacity="0.2" filter="url(#wireGlow)" />
            <path d={pathWire4} stroke="#DCEAFF" strokeWidth="5" opacity="0.9" />
            <path d={pathWire4} stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" />
            <path d={pathWire4} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 8" style={{ animation: 'dash 1.2s linear infinite' }} />
            <path d="M 494 352 L 500 360 L 506 352" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="500" cy="320" r="4" fill="#1463FF" />
            <circle cx="500" cy="320" r="1.8" fill="#FFFFFF" />
            <circle cx="500" cy="340" r="3.5" fill="#1463FF" opacity="0.85" />
            <circle cx="500" cy="340" r="1.5" fill="#FFFFFF" />
            <circle r="4.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="1.4s" repeatCount="indefinite" path={pathWire4} /></circle>
            <circle r="1.8" fill="#FFFFFF"><animateMotion dur="1.4s" repeatCount="indefinite" path={pathWire4} /></circle>
          </g>

          {/* WIRE 5: DATA SOURCES (260, 440) -> OPERATIONS (350, 420) */}
          <g>
            <path d={pathWire5} stroke="#1463FF" strokeWidth="12" opacity="0.22" filter="url(#wireGlow)" />
            <path d={pathWire5} stroke="#DCEAFF" strokeWidth="6" opacity="0.9" />
            <path d={pathWire5} stroke="url(#flowWireGrad)" strokeWidth="3" strokeLinecap="round" />
            <path d={pathWire5} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 12" style={{ animation: 'dash 1.4s linear infinite' }} />
            <path d="M 338 414 L 350 420 L 338 426" stroke="#1463FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="260" cy="440" r="4.5" fill="#1463FF" />
            <circle cx="260" cy="440" r="2" fill="#FFFFFF" />
            <circle cx="285" cy="440" r="4" fill="#1463FF" opacity="0.85" />
            <circle cx="285" cy="440" r="1.8" fill="#FFFFFF" />
            <circle r="5.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="1.8s" repeatCount="indefinite" path={pathWire5} /></circle>
            <circle r="2.2" fill="#FFFFFF"><animateMotion dur="1.8s" repeatCount="indefinite" path={pathWire5} /></circle>
          </g>

          {/* WIRE 6: AUTOMATION (850, 240) -> OPERATIONS (650, 420) */}
          <g>
            <path d={pathWire6} stroke="#1463FF" strokeWidth="12" opacity="0.22" filter="url(#wireGlow)" />
            <path d={pathWire6} stroke="#DCEAFF" strokeWidth="6" opacity="0.9" />
            <path d={pathWire6} stroke="url(#flowWireGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d={pathWire6} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 14" style={{ animation: 'dash 1.6s linear infinite' }} />
            <path d="M 662 414 L 650 420 L 662 426" stroke="#1463FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="850" cy="240" r="4.5" fill="#1463FF" />
            <circle cx="850" cy="240" r="2" fill="#FFFFFF" />
            <circle cx="850" cy="330" r="4" fill="#1463FF" opacity="0.85" />
            <circle cx="850" cy="330" r="1.8" fill="#FFFFFF" />
            <circle cx="740" cy="420" r="4" fill="#1463FF" opacity="0.85" />
            <circle cx="740" cy="420" r="1.8" fill="#FFFFFF" />
            <circle r="5.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="2.4s" repeatCount="indefinite" path={pathWire6} /></circle>
            <circle r="2.2" fill="#FFFFFF"><animateMotion dur="2.4s" repeatCount="indefinite" path={pathWire6} /></circle>
          </g>

          {/* WIRE 7: OPERATIONS (500, 480) -> OUTCOME (500, 520) */}
          <g>
            <path d={pathWire7} stroke="#1463FF" strokeWidth="10" opacity="0.2" filter="url(#wireGlow)" />
            <path d={pathWire7} stroke="#DCEAFF" strokeWidth="5" opacity="0.9" />
            <path d={pathWire7} stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" />
            <path d={pathWire7} stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 8" style={{ animation: 'dash 1.2s linear infinite' }} />
            <path d="M 494 512 L 500 520 L 506 512" stroke="#1463FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="500" cy="480" r="4" fill="#1463FF" />
            <circle cx="500" cy="480" r="1.8" fill="#FFFFFF" />
            <circle cx="500" cy="500" r="3.5" fill="#1463FF" opacity="0.85" />
            <circle cx="500" cy="500" r="1.5" fill="#FFFFFF" />
            <circle r="4.5" fill="#1463FF" filter="url(#wireGlow)"><animateMotion dur="1.4s" repeatCount="indefinite" path={pathWire7} /></circle>
            <circle r="1.8" fill="#FFFFFF"><animateMotion dur="1.4s" repeatCount="indefinite" path={pathWire7} /></circle>
          </g>

          {/* ===================================================================== */}
          {/* 7 EXACTLY POSITIONED ARCHITECTURAL MODULE CARDS                       */}
          {/* ===================================================================== */}

          {/* 1. NODE: INTELLIGENCE (x=350, y=30, w=300, h=130) */}
          <g transform="translate(350, 30)">
            <rect width="300" height="130" rx="16" fill="url(#intelCardGrad)" stroke="#1463FF" strokeWidth="2" filter="url(#intelShadow)" />
            <rect x="127" y="14" width="46" height="38" rx="10" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.4" />
            {/* Brain Icon */}
            <g transform="translate(140, 23)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <path d="M 10 3 C 7 3, 4 5, 4 9 C 4 10.5, 4.5 12, 5.5 13 C 3.5 14, 2 16, 2 18.5 C 2 21.5, 4.5 24, 7.5 24 C 8 24, 8.5 23.9, 9 23.7" />
              <path d="M 10 3 C 13 3, 16 5, 16 9 C 16 10.5, 15.5 12, 14.5 13 C 16.5 14, 18 16, 18 18.5 C 18 21.5, 15.5 24, 12.5 24 C 12 24, 11.5 23.9, 11 23.7" />
              <path d="M 10 3 L 10 24" />
            </g>
            <text x="150" y="74" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="17" fontWeight="bold" letterSpacing="0.04em">INTELLIGENCE</text>
            <text x="150" y="93" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="11">Central Decision System</text>
            <line x1="20" y1="113" x2="280" y2="113" stroke="#1463FF" strokeOpacity="0.25" strokeWidth="1" />
            <text x="150" y="123" textAnchor="middle" fill="#1463FF" fontFamily="monospace" fontSize="9.5" fontWeight="600">Inference · Analysis · Optimization</text>
          </g>

          {/* 2. NODE: SOFTWARE (x=40, y=120, w=220, h=120) */}
          <g transform="translate(40, 120)">
            <rect width="220" height="120" rx="16" fill="#FFFFFF" stroke="#D8D4C9" strokeWidth="1.2" filter="url(#cardShadow)" />
            <rect x="91" y="12" width="38" height="32" rx="8" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.25" />
            {/* Monitor Icon */}
            <g transform="translate(100, 18)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <rect x="1" y="1" width="18" height="13" rx="2" />
              <line x1="6" y1="18" x2="14" y2="18" />
              <line x1="10" y1="14" x2="10" y2="18" />
            </g>
            <text x="110" y="66" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="14.5" fontWeight="bold" letterSpacing="0.04em">SOFTWARE</text>
            <text x="110" y="84" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="10.5">Interfaces &amp; Platforms</text>
            <line x1="15" y1="101" x2="205" y2="101" stroke="#D8D4C9" strokeOpacity="0.8" strokeWidth="1" />
            <text x="110" y="112" textAnchor="middle" fill="#768494" fontFamily="monospace" fontSize="9">Applications · APIs · Data</text>
          </g>

          {/* 3. NODE: ORCHESTRATION (x=350, y=200, w=300, h=120) */}
          <g transform="translate(350, 200)">
            <rect width="300" height="120" rx="16" fill="#FFFFFF" stroke="#D8D4C9" strokeWidth="1.2" filter="url(#cardShadow)" />
            <rect x="131" y="12" width="38" height="32" rx="8" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.25" />
            {/* Workflow Icon */}
            <g transform="translate(141, 18)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="11" y="11" width="6" height="6" rx="1" />
              <rect x="1" y="11" width="6" height="6" rx="1" />
              <path d="M 4 7 L 4 11" />
              <path d="M 7 4 L 14 4 L 14 11" />
            </g>
            <text x="150" y="66" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="bold" letterSpacing="0.04em">ORCHESTRATION</text>
            <text x="150" y="84" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="10.5">Coordination Layer</text>
            <line x1="20" y1="101" x2="280" y2="101" stroke="#D8D4C9" strokeOpacity="0.8" strokeWidth="1" />
            <text x="150" y="112" textAnchor="middle" fill="#768494" fontFamily="monospace" fontSize="9.5">Rules · Logic · Scheduling</text>
          </g>

          {/* 4. NODE: AUTOMATION (x=740, y=120, w=220, h=120) */}
          <g transform="translate(740, 120)">
            <rect width="220" height="120" rx="16" fill="#FFFFFF" stroke="#D8D4C9" strokeWidth="1.2" filter="url(#cardShadow)" />
            <rect x="91" y="12" width="38" height="32" rx="8" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.25" />
            {/* Zap Icon */}
            <g transform="translate(101, 18)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <polygon points="11 2 4 11 9 11 7 18 14 9 9 9 11 2" strokeLinejoin="round" />
            </g>
            <text x="110" y="66" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="14.5" fontWeight="bold" letterSpacing="0.04em">AUTOMATION</text>
            <text x="110" y="84" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="10.5">Execution Engine</text>
            <line x1="15" y1="101" x2="205" y2="101" stroke="#D8D4C9" strokeOpacity="0.8" strokeWidth="1" />
            <text x="110" y="112" textAnchor="middle" fill="#768494" fontFamily="monospace" fontSize="9">Workflows · Actions · Integrations</text>
          </g>

          {/* 5. NODE: DATA SOURCES (x=40, y=380, w=220, h=120) */}
          <g transform="translate(40, 380)">
            <rect width="220" height="120" rx="16" fill="#FFFFFF" stroke="#D8D4C9" strokeWidth="1.2" filter="url(#cardShadow)" />
            <rect x="91" y="12" width="38" height="32" rx="8" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.25" />
            {/* Database Icon */}
            <g transform="translate(101, 18)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <ellipse cx="9" cy="4" rx="8" ry="3" />
              <path d="M 1 4 L 1 12 C 1 13.7 4.6 15 9 15 C 13.4 15 17 13.7 17 12 L 17 4" />
              <path d="M 1 8 C 1 9.7 4.6 11 9 11 C 13.4 11 17 9.7 17 8" />
            </g>
            <text x="110" y="70" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" letterSpacing="0.04em">DATA SOURCES</text>
            <text x="110" y="88" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="10.5">Internal &amp; External Data</text>
            <line x1="15" y1="99" x2="205" y2="99" stroke="#D8D4C9" strokeOpacity="0.8" strokeWidth="1" />
            <text x="110" y="111" textAnchor="middle" fill="#768494" fontFamily="monospace" fontSize="8.5">Structured · Unstructured · Streams</text>
          </g>

          {/* 6. NODE: OPERATIONS (x=350, y=360, w=300, h=120) */}
          <g transform="translate(350, 360)">
            <rect width="300" height="120" rx="16" fill="#FFFFFF" stroke="#D8D4C9" strokeWidth="1.2" filter="url(#cardShadow)" />
            <rect x="131" y="12" width="38" height="32" rx="8" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.25" />
            {/* Cog Icon */}
            <g transform="translate(141, 18)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <circle cx="9" cy="9" r="3.5" />
              <path d="M 9 1 L 9 3 M 9 15 L 9 17 M 1 9 L 3 9 M 15 9 L 17 9 M 3.3 3.3 L 4.7 4.7 M 13.3 13.3 L 14.7 14.7 M 3.3 14.7 L 4.7 13.3 M 13.3 4.7 L 14.7 3.3" />
            </g>
            <text x="150" y="66" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="bold" letterSpacing="0.04em">OPERATIONS</text>
            <text x="150" y="84" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="10.5">Operational Management</text>
            <line x1="20" y1="101" x2="280" y2="101" stroke="#D8D4C9" strokeOpacity="0.8" strokeWidth="1" />
            <text x="150" y="112" textAnchor="middle" fill="#768494" fontFamily="monospace" fontSize="9.5">Monitoring · Control · Governance</text>
          </g>

          {/* 7. NODE: OUTCOME (x=350, y=520, w=300, h=120) */}
          <g transform="translate(350, 520)">
            <rect width="300" height="120" rx="16" fill="#FFFFFF" stroke="#D8D4C9" strokeWidth="1.2" filter="url(#cardShadow)" />
            <rect x="131" y="12" width="38" height="32" rx="8" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1" strokeOpacity="0.25" />
            {/* Target Icon */}
            <g transform="translate(141, 18)" stroke="#1463FF" strokeWidth="1.8" fill="none">
              <circle cx="9" cy="9" r="7.5" />
              <circle cx="9" cy="9" r="4.5" />
              <circle cx="9" cy="9" r="1.5" fill="#1463FF" />
            </g>
            <text x="150" y="66" textAnchor="middle" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="15" fontWeight="bold" letterSpacing="0.04em">OUTCOME</text>
            <text x="150" y="84" textAnchor="middle" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="10.5">Measured Operational Result</text>
            <line x1="20" y1="101" x2="280" y2="101" stroke="#D8D4C9" strokeOpacity="0.8" strokeWidth="1" />
            <text x="150" y="112" textAnchor="middle" fill="#768494" fontFamily="monospace" fontSize="9.5">Impact · Value · Continuous Improvement</text>
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET COMPACT VERTICAL CONNECTED TOPOLOGY (below lg)            */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex flex-col items-center space-y-0 w-full py-2">
        {/* Node: SOFTWARE */}
        <div className="w-full p-5 rounded-2xl bg-white border border-[#D8D4C9] text-center flex flex-col items-center shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-2">
            <Monitor className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#1463FF]">SOFTWARE</span>
          <h3 className="text-base font-display font-bold text-[#111827] uppercase">Interfaces &amp; Platforms</h3>
          <p className="text-[11px] text-[#768494] font-mono mt-1">Applications · APIs · Data</p>
        </div>

        <div className="h-12 w-full flex items-center justify-center relative">
          <svg viewBox="0 0 40 50" className="h-full w-10 overflow-visible" fill="none">
            <path d="M 20 0 L 20 40" stroke="#DCEAFF" strokeWidth="5" />
            <path d="M 20 0 L 20 40" stroke="#1463FF" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 15 35 L 20 45 L 25 35" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle r="4.5" fill="#1463FF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
            <circle r="2" fill="#FFFFFF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
          </svg>
        </div>

        {/* Node: INTELLIGENCE */}
        <div className="w-full p-5 rounded-2xl bg-[#F6FAFF] border-2 border-[#1463FF]/50 text-center flex flex-col items-center shadow-md">
          <div className="w-11 h-11 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/40 flex items-center justify-center text-[#1463FF] mb-2 shadow-[0_0_10px_rgba(20,99,255,0.15)]">
            <Brain className="w-6 h-6" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#1463FF]">INTELLIGENCE</span>
          <h3 className="text-lg font-display font-bold text-[#111827] uppercase">Central Decision System</h3>
          <p className="text-[11px] text-[#1463FF] font-mono mt-1 font-semibold">Inference · Analysis · Optimization</p>
        </div>

        <div className="h-12 w-full flex items-center justify-center relative">
          <svg viewBox="0 0 40 50" className="h-full w-10 overflow-visible" fill="none">
            <path d="M 20 0 L 20 40" stroke="#DCEAFF" strokeWidth="5" />
            <path d="M 20 0 L 20 40" stroke="#1463FF" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 15 35 L 20 45 L 25 35" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle r="4.5" fill="#1463FF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
            <circle r="2" fill="#FFFFFF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
          </svg>
        </div>

        {/* Node: ORCHESTRATION */}
        <div className="w-full p-5 rounded-2xl bg-white border border-[#D8D4C9] text-center flex flex-col items-center shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-2">
            <Workflow className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#1463FF]">ORCHESTRATION</span>
          <h3 className="text-base font-display font-bold text-[#111827] uppercase">Coordination Layer</h3>
          <p className="text-[11px] text-[#768494] font-mono mt-1">Rules · Logic · Scheduling</p>
        </div>

        <div className="h-12 w-full flex items-center justify-center relative">
          <svg viewBox="0 0 40 50" className="h-full w-10 overflow-visible" fill="none">
            <path d="M 20 0 L 20 40" stroke="#DCEAFF" strokeWidth="5" />
            <path d="M 20 0 L 20 40" stroke="#1463FF" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 15 35 L 20 45 L 25 35" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle r="4.5" fill="#1463FF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
            <circle r="2" fill="#FFFFFF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
          </svg>
        </div>

        {/* Node: AUTOMATION */}
        <div className="w-full p-5 rounded-2xl bg-white border border-[#D8D4C9] text-center flex flex-col items-center shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#1463FF]">AUTOMATION</span>
          <h3 className="text-base font-display font-bold text-[#111827] uppercase">Execution Engine</h3>
          <p className="text-[11px] text-[#768494] font-mono mt-1">Workflows · Actions · Integrations</p>
        </div>

        <div className="h-12 w-full flex items-center justify-center relative">
          <svg viewBox="0 0 40 50" className="h-full w-10 overflow-visible" fill="none">
            <path d="M 20 0 L 20 40" stroke="#DCEAFF" strokeWidth="5" />
            <path d="M 20 0 L 20 40" stroke="#1463FF" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 15 35 L 20 45 L 25 35" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle r="4.5" fill="#1463FF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
            <circle r="2" fill="#FFFFFF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
          </svg>
        </div>

        {/* Data Sources */}
        <div className="w-full p-5 rounded-2xl bg-white border border-[#D8D4C9] text-center flex flex-col items-center shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-2">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-base font-display font-bold text-[#111827] uppercase">DATA SOURCES</h3>
          <p className="text-[11px] text-[#768494] font-mono mt-1">Structured · Unstructured · Streams</p>
        </div>

        <div className="h-12 w-full flex items-center justify-center relative">
          <svg viewBox="0 0 40 50" className="h-full w-10 overflow-visible" fill="none">
            <path d="M 20 0 L 20 40" stroke="#DCEAFF" strokeWidth="5" />
            <path d="M 20 0 L 20 40" stroke="#1463FF" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 15 35 L 20 45 L 25 35" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle r="4.5" fill="#1463FF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
            <circle r="2" fill="#FFFFFF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
          </svg>
        </div>

        {/* Node: OPERATIONS */}
        <div className="w-full p-5 rounded-2xl bg-white border border-[#D8D4C9] text-center flex flex-col items-center shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-2">
            <Cog className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#1463FF]">OPERATIONS</span>
          <h3 className="text-base font-display font-bold text-[#111827] uppercase">Operational Management</h3>
          <p className="text-[11px] text-[#768494] font-mono mt-1">Monitoring · Control · Governance</p>
        </div>

        <div className="h-12 w-full flex items-center justify-center relative">
          <svg viewBox="0 0 40 50" className="h-full w-10 overflow-visible" fill="none">
            <path d="M 20 0 L 20 40" stroke="#DCEAFF" strokeWidth="5" />
            <path d="M 20 0 L 20 40" stroke="#1463FF" strokeWidth="2.5" strokeDasharray="4 4" />
            <path d="M 15 35 L 20 45 L 25 35" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle r="4.5" fill="#1463FF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
            <circle r="2" fill="#FFFFFF"><animateMotion dur="1.5s" repeatCount="indefinite" path="M 20 0 L 20 40" /></circle>
          </svg>
        </div>

        {/* Node: OUTCOME */}
        <div className="w-full p-5 rounded-2xl bg-white border border-[#D8D4C9] text-center flex flex-col items-center shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] mb-2">
            <Target className="w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] font-bold text-[#1463FF]">OUTCOME</span>
          <h3 className="text-base font-display font-bold text-[#111827] uppercase">Measured Operational Result</h3>
          <p className="text-[11px] text-[#768494] font-mono mt-1">Impact · Value · Continuous Improvement</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LEGEND / SYSTEM FLOW FOOTER BAR MATCHING REFERENCE                        */}
      {/* ========================================================================= */}
      <div className="mt-8 pt-6 border-t border-[#D8D4C9]/70 flex flex-wrap items-center justify-center gap-6 sm:gap-10 font-mono text-[10.5px] font-bold text-[#536070] select-none uppercase tracking-wider relative z-20">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-0.5 bg-[#1463FF] rounded-full" />
          <span className="text-[#111827]">SYSTEM FLOW</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center w-12">
            <span className="w-4 h-0.5 bg-[#1463FF]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#1463FF] shadow-[0_0_8px_#1463FF] border border-white" />
            <span className="w-4 h-0.5 bg-[#1463FF]" />
          </div>
          <span className="text-[#111827]">ACTIVE SIGNAL</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full border border-dashed border-[#1463FF] animate-spin" />
          <span className="text-[#111827]">PROCESSING NODE</span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs text-[#1463FF] tracking-widest">······</span>
          <span className="text-[#111827]">CONTINUOUS FLOW</span>
        </div>
      </div>
    </div>
  );
}
