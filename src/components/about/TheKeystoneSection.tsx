import KeystoneLogo from '@/components/brand/KeystoneLogo';
'use client';

import React from 'react';
import {
  ShieldCheck,
  Crosshair,
  Maximize2,
  TrendingUp,
} from 'lucide-react';

export default function TheKeystoneSection() {
  return (
    <section
      id="keystone"
      className="py-16 md:py-24 border-b border-[#D8D4C9] bg-[#F5F1E8] relative overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION TITLE & ORNAMENT                                                  */}
        {/* ========================================================================= */}
        <div className="text-center space-y-2 mb-10 sm:mb-14 select-none">
          <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-[0.25em]">
            08 — THE KEYSTONE
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#111827] uppercase tracking-tight">
            THE STRUCTURE BEHIND THE SYSTEM
          </h2>

          {/* Precision Blueprint Coordinate Ornament */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-[#1463FF]/50" />
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1463FF]" />
              <span className="w-2.5 h-2.5 rotate-45 border border-[#1463FF] bg-[#F5F1E8]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#1463FF]" />
            </div>
            <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-[#1463FF]/50" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP 1:1 EXACT ARCHITECTURAL CENTERPIECE (Vector SVG Canvas)          */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative w-full max-w-[1120px] mx-auto aspect-[1120/620] select-none">
          <svg
            viewBox="0 0 1120 620"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Outer Plate Shadow */}
              <filter id="keystoneShadow" x="-20%" y="-20%" width="140%" height="145%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#070D1D" floodOpacity="0.16" />
                <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#070D1D" floodOpacity="0.08" />
              </filter>

              <filter id="cardElevation" x="-10%" y="-10%" width="120%" height="125%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#111827" floodOpacity="0.08" />
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#111827" floodOpacity="0.04" />
              </filter>

              <filter id="innerNavyPlateShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
              </filter>

              {/* Linear Gradients */}
              <linearGradient id="bevelRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#EDE8DD" />
                <stop offset="100%" stopColor="#D8D1C2" />
              </linearGradient>

              <linearGradient id="bevelInsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E4DDD0" />
                <stop offset="100%" stopColor="#FBF9F3" />
              </linearGradient>

              <linearGradient id="diagonalMitreBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1463FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0B2E73" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* ----------------------------------------------------------------- */}
            {/* 1. BLUEPRINT BACKGROUND GUIDES & MEASUREMENT LINES                */}
            {/* ----------------------------------------------------------------- */}
            <g opacity="0.4">
              {/* Outer Blueprint Box */}
              <rect x="20" y="20" width="1080" height="580" stroke="#D8D4C9" strokeWidth="0.8" strokeDasharray="3 4" fill="none" />

              {/* Corner Registration Ticks */}
              <g stroke="#1463FF" strokeWidth="1.2">
                <path d="M 12 20 L 28 20 M 20 12 L 20 28" />
                <path d="M 1100 20 L 1108 20 M 1100 12 L 1100 28" />
                <path d="M 12 600 L 28 600 M 20 592 L 20 608" />
                <path d="M 1100 600 L 1108 600 M 1100 592 L 1100 608" />
              </g>

              {/* Center Crosshairs */}
              <line x1="560" y1="10" x2="560" y2="610" stroke="#1463FF" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.35" />
              <line x1="10" y1="300" x2="1110" y2="300" stroke="#1463FF" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.35" />

              {/* Blue Registration Circles */}
              <circle cx="560" cy="55" r="3" fill="#1463FF" />
              <circle cx="560" cy="545" r="3" fill="#1463FF" />
              <circle cx="20" cy="300" r="3" fill="#1463FF" />
              <circle cx="1100" cy="300" r="3" fill="#1463FF" />
            </g>

            {/* ----------------------------------------------------------------- */}
            {/* 2. UNDERLYING ARCHITECTURAL BEVEL TRAY & DIAGONAL BLUE MITRES     */}
            {/* ----------------------------------------------------------------- */}
            <g>
              {/* Underlying Bevel Frame Layer */}
              <path
                d="M 330 75 L 790 75 L 810 95 L 810 505 L 790 525 L 330 525 L 310 505 L 310 95 Z"
                fill="#EDE7DB"
                stroke="#D8D4C9"
                strokeWidth="1.2"
              />

              {/* 4 Diagonal Blue Mitre Conduits connecting to Keystone */}
              {/* Top-Left to Keystone */}
              <line x1="335" y1="180" x2="415" y2="245" stroke="url(#diagonalMitreBlue)" strokeWidth="3" strokeLinecap="round" />
              <line x1="330" y1="185" x2="410" y2="250" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

              {/* Top-Right to Keystone */}
              <line x1="785" y1="180" x2="705" y2="245" stroke="url(#diagonalMitreBlue)" strokeWidth="3" strokeLinecap="round" />
              <line x1="790" y1="185" x2="710" y2="250" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

              {/* Bottom-Left to Keystone */}
              <line x1="335" y1="420" x2="415" y2="355" stroke="url(#diagonalMitreBlue)" strokeWidth="3" strokeLinecap="round" />
              <line x1="330" y1="415" x2="410" y2="350" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

              {/* Bottom-Right to Keystone */}
              <line x1="785" y1="420" x2="705" y2="355" stroke="url(#diagonalMitreBlue)" strokeWidth="3" strokeLinecap="round" />
              <line x1="790" y1="415" x2="710" y2="350" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

              {/* Keystone Left/Right Registration Interlock Tabs */}
              <path d="M 335 295 L 375 295 L 375 305 L 335 305 Z" fill="#1463FF" />
              <path d="M 745 295 L 785 295 L 785 305 L 745 305 Z" fill="#1463FF" />
            </g>

            {/* ----------------------------------------------------------------- */}
            {/* 3. FOUR ARCHITECTURAL PRINCIPLE MODULE CARDS                      */}
            {/* ----------------------------------------------------------------- */}

            {/* CARD 01: STRUCTURE (Top Left: x=40, y=55, w=330, h=190) */}
            <g transform="translate(40, 55)" filter="url(#cardElevation)">
              {/* Chamfered Card Base (Cut on bottom-right corner) */}
              <path
                d="M 12 0 L 330 0 L 330 135 L 275 190 L 0 190 L 0 12 Z"
                fill="#FFFFFF"
                stroke="#D8D4C9"
                strokeWidth="1.5"
              />
              <path
                d="M 12 2 L 328 2 L 328 134 L 274 188 L 2 188 L 2 12 Z"
                fill="#FBF9F3"
              />

              {/* Icon Container Circle */}
              <circle cx="48" cy="95" r="26" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1.2" strokeOpacity="0.35" />
              {/* Isometric 3D Cube Icon */}
              <g transform="translate(33, 80)" stroke="#1463FF" strokeWidth="1.8" fill="none" strokeLinejoin="round">
                <polygon points="15 2 27 9 15 16 3 9" />
                <polygon points="3 9 15 16 15 30 3 23" />
                <polygon points="27 9 27 23 15 30 15 16" />
                <circle cx="15" cy="16" r="2" fill="#1463FF" />
              </g>

              {/* Text Block */}
              <g transform="translate(90, 48)">
                <text x="0" y="0" fill="#1463FF" fontFamily="monospace" fontSize="13" fontWeight="bold" letterSpacing="0.1em">01</text>
                <text x="0" y="24" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.04em">STRUCTURE</text>
                <line x1="0" y1="36" x2="32" y2="36" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" />
                <text x="0" y="58" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="normal">
                  <tspan x="0" dy="0">Organized architecture that</tspan>
                  <tspan x="0" dy="18">brings clarity, scalability, and</tspan>
                  <tspan x="0" dy="18">systematic order.</tspan>
                </text>
              </g>
            </g>

            {/* CARD 02: FOUNDATION (Bottom Left: x=40, y=355, w=330, h=190) */}
            <g transform="translate(40, 355)" filter="url(#cardElevation)">
              {/* Chamfered Card Base (Cut on top-right corner) */}
              <path
                d="M 0 0 L 275 0 L 330 55 L 330 178 L 318 190 L 0 190 Z"
                fill="#FFFFFF"
                stroke="#D8D4C9"
                strokeWidth="1.5"
              />
              <path
                d="M 2 2 L 274 2 L 328 56 L 328 177 L 317 188 L 2 188 Z"
                fill="#FBF9F3"
              />

              {/* Icon Container Circle */}
              <circle cx="48" cy="95" r="26" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1.2" strokeOpacity="0.35" />
              {/* Stacked Layers / Foundation Icon */}
              <g transform="translate(33, 80)" stroke="#1463FF" strokeWidth="1.8" fill="none" strokeLinejoin="round">
                <polygon points="15 4 27 10 15 16 3 10" />
                <path d="M 3 16 L 15 22 L 27 16" />
                <path d="M 3 22 L 15 28 L 27 22" />
              </g>

              {/* Text Block */}
              <g transform="translate(90, 48)">
                <text x="0" y="0" fill="#1463FF" fontFamily="monospace" fontSize="13" fontWeight="bold" letterSpacing="0.1em">02</text>
                <text x="0" y="24" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.04em">FOUNDATION</text>
                <line x1="0" y1="36" x2="32" y2="36" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" />
                <text x="0" y="58" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="normal">
                  <tspan x="0" dy="0">Robust digital foundations built</tspan>
                  <tspan x="0" dy="18">on reliable infrastructure, data,</tspan>
                  <tspan x="0" dy="18">and core platforms.</tspan>
                </text>
              </g>
            </g>

            {/* CARD 03: CONNECTION (Top Right: x=750, y=55, w=330, h=190) */}
            <g transform="translate(750, 55)" filter="url(#cardElevation)">
              {/* Chamfered Card Base (Cut on bottom-left corner) */}
              <path
                d="M 0 0 L 318 0 L 330 12 L 330 190 L 55 190 L 0 135 Z"
                fill="#FFFFFF"
                stroke="#D8D4C9"
                strokeWidth="1.5"
              />
              <path
                d="M 2 2 L 317 2 L 328 13 L 328 188 L 56 188 L 2 134 Z"
                fill="#FBF9F3"
              />

              {/* Icon Container Circle */}
              <circle cx="48" cy="95" r="26" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1.2" strokeOpacity="0.35" />
              {/* Connected Triangle Nodes Icon */}
              <g transform="translate(33, 80)" stroke="#1463FF" strokeWidth="1.8" fill="none" strokeLinejoin="round">
                <circle cx="15" cy="7" r="3.5" fill="#EDF4FF" />
                <circle cx="7" cy="23" r="3.5" fill="#EDF4FF" />
                <circle cx="23" cy="23" r="3.5" fill="#EDF4FF" />
                <line x1="12" y1="10" x2="9" y2="20" />
                <line x1="18" y1="10" x2="21" y2="20" />
                <line x1="10.5" y1="23" x2="19.5" y2="23" />
              </g>

              {/* Text Block */}
              <g transform="translate(90, 48)">
                <text x="0" y="0" fill="#1463FF" fontFamily="monospace" fontSize="13" fontWeight="bold" letterSpacing="0.1em">03</text>
                <text x="0" y="24" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.04em">CONNECTION</text>
                <line x1="0" y1="36" x2="32" y2="36" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" />
                <text x="0" y="58" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="normal">
                  <tspan x="0" dy="0">Seamless integration that</tspan>
                  <tspan x="0" dy="18">connects systems, data, and</tspan>
                  <tspan x="0" dy="18">people across every boundary.</tspan>
                </text>
              </g>
            </g>

            {/* CARD 04: ENGINEERING (Bottom Right: x=750, y=355, w=330, h=190) */}
            <g transform="translate(750, 355)" filter="url(#cardElevation)">
              {/* Chamfered Card Base (Cut on top-left corner) */}
              <path
                d="M 55 0 L 330 0 L 330 190 L 0 190 L 0 55 Z"
                fill="#FFFFFF"
                stroke="#D8D4C9"
                strokeWidth="1.5"
              />
              <path
                d="M 56 2 L 328 2 L 328 188 L 2 188 L 2 56 Z"
                fill="#FBF9F3"
              />

              {/* Icon Container Circle */}
              <circle cx="48" cy="95" r="26" fill="#EDF4FF" stroke="#1463FF" strokeWidth="1.2" strokeOpacity="0.35" />
              {/* Engineering Gear Icon */}
              <g transform="translate(33, 80)" stroke="#1463FF" strokeWidth="1.8" fill="none">
                <circle cx="15" cy="15" r="5" />
                <path d="M 15 4 L 15 7 M 15 23 L 15 26 M 4 15 L 7 15 M 23 15 L 26 15 M 7.2 7.2 L 9.3 9.3 M 20.7 20.7 L 22.8 22.8 M 7.2 22.8 L 9.3 20.7 M 20.7 9.3 L 22.8 7.2" strokeLinecap="round" />
              </g>

              {/* Text Block */}
              <g transform="translate(90, 48)">
                <text x="0" y="0" fill="#1463FF" fontFamily="monospace" fontSize="13" fontWeight="bold" letterSpacing="0.1em">04</text>
                <text x="0" y="24" fill="#111827" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" letterSpacing="0.04em">ENGINEERING</text>
                <line x1="0" y1="36" x2="32" y2="36" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" />
                <text x="0" y="58" fill="#536070" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="normal">
                  <tspan x="0" dy="0">Disciplined engineering that</tspan>
                  <tspan x="0" dy="18">designs, builds, and evolves</tspan>
                  <tspan x="0" dy="18">intelligent systems for future.</tspan>
                </text>
              </g>
            </g>

            {/* ----------------------------------------------------------------- */}
            {/* 4. CENTRAL <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> KEYSTONE (Architectural Anchor)             */}
            {/* ----------------------------------------------------------------- */}
            <g transform="translate(365, 175)" filter="url(#keystoneShadow)">
              {/* Layer 1: Stepped Bevel Outer Frame (Octagon with heavy bevel) */}
              <path
                d="M 55 0 L 335 0 L 390 55 L 390 195 L 335 250 L 55 250 L 0 195 L 0 55 Z"
                fill="url(#bevelRimGrad)"
                stroke="#CFC6B4"
                strokeWidth="2"
              />

              {/* Layer 2: Inset Cream Step */}
              <path
                d="M 52 8 L 338 8 L 382 52 L 382 198 L 338 242 L 52 242 L 8 198 L 8 52 Z"
                fill="url(#bevelInsetGrad)"
                stroke="#D8D1C2"
                strokeWidth="1.5"
              />

              {/* Layer 3: Deep Dark Navy Center Plate */}
              <path
                d="M 46 16 L 344 16 L 374 46 L 374 204 L 344 234 L 46 234 L 16 204 L 16 46 Z"
                fill="#070D1D"
                stroke="#1B294B"
                strokeWidth="1.8"
                filter="url(#innerNavyPlateShadow)"
              />

              {/* Brand Chevron Logo Glyph "Λ" */}
              <g transform="translate(162, 42)">
                <svg width="66" height="54" viewBox="0 0 135 110" fill="none">
                  <path
                    d="M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z"
                    fill="#1463FF"
                  />
                </svg>
              </g>

              {/* <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> Wordmark in Syncopate */}
              <text
                x="195"
                y="142"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="'Syncopate', var(--font-syncopate), sans-serif"
                fontSize="22"
                fontWeight="700"
                letterSpacing="0.16em"
              >
                <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>
              </text>

              {/* TECHNOLOGY SYSTEMS Accent Sub-Bar */}
              <g transform="translate(195, 172)">
                <line x1="-130" y1="0" x2="-75" y2="0" stroke="#1463FF" strokeWidth="1.5" strokeLinecap="round" />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#80B3FF"
                  fontFamily="monospace"
                  fontSize="10"
                  fontWeight="bold"
                  letterSpacing="0.22em"
                >
                  TECHNOLOGY SYSTEMS
                </text>
                <line x1="75" y1="0" x2="130" y2="0" stroke="#1463FF" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Registration Edge Markers */}
              <circle cx="195" cy="4" r="3" fill="#1463FF" />
              <circle cx="195" cy="246" r="3" fill="#1463FF" />
              <circle cx="4" cy="125" r="3" fill="#1463FF" />
              <circle cx="386" cy="125" r="3" fill="#1463FF" />
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET RESPONSIVE VIEW (<lg)                                     */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col items-center space-y-6">
          {/* Central Keystone Plate */}
          <div className="w-full max-w-sm aspect-[1.4/1] relative flex items-center justify-center p-2">
            <div
              style={{
                clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
              }}
              className="absolute inset-0 bg-[#EDE7DB] border-2 border-[#D8D4C9] shadow-xl"
            />
            <div
              style={{
                clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)',
              }}
              className="relative w-[calc(100%-16px)] h-[calc(100%-16px)] bg-[#070D1D] flex flex-col items-center justify-center p-6 text-center shadow-inner"
            >
              <div className="mb-2">
                <svg width="44" height="36" viewBox="0 0 135 110" fill="none">
                  <path
                    d="M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z"
                    fill="#1463FF"
                  />
                </svg>
              </div>
              <div
                className="text-lg sm:text-xl font-bold text-white uppercase tracking-[0.14em]"
                style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif" }}
              >
                <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="w-5 h-px bg-[#1463FF]" />
                <span className="font-mono text-[9px] font-bold text-[#80B3FF] uppercase tracking-[0.2em]">
                  TECHNOLOGY SYSTEMS
                </span>
                <span className="w-5 h-px bg-[#1463FF]" />
              </div>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* 01 STRUCTURE */}
            <div className="p-5 rounded-2xl bg-white border border-[#D8D4C9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" stroke="#1463FF" strokeWidth="2">
                  <polygon points="15 2 27 9 15 16 3 9" />
                  <polygon points="3 9 15 16 15 30 3 23" />
                  <polygon points="27 9 27 23 15 30 15 16" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#1463FF]">01</span>
                <h3 className="text-base font-display font-bold text-[#111827] uppercase">STRUCTURE</h3>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Organized architecture that brings clarity, scalability, and systematic order.
                </p>
              </div>
            </div>

            {/* 02 FOUNDATION */}
            <div className="p-5 rounded-2xl bg-white border border-[#D8D4C9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" stroke="#1463FF" strokeWidth="2">
                  <polygon points="15 4 27 10 15 16 3 10" />
                  <path d="M 3 16 L 15 22 L 27 16" />
                  <path d="M 3 22 L 15 28 L 27 22" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#1463FF]">02</span>
                <h3 className="text-base font-display font-bold text-[#111827] uppercase">FOUNDATION</h3>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Robust digital foundations built on reliable infrastructure, data, and core platforms.
                </p>
              </div>
            </div>

            {/* 03 CONNECTION */}
            <div className="p-5 rounded-2xl bg-white border border-[#D8D4C9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" stroke="#1463FF" strokeWidth="2">
                  <circle cx="15" cy="7" r="3.5" fill="#EDF4FF" />
                  <circle cx="7" cy="23" r="3.5" fill="#EDF4FF" />
                  <circle cx="23" cy="23" r="3.5" fill="#EDF4FF" />
                  <line x1="12" y1="10" x2="9" y2="20" />
                  <line x1="18" y1="10" x2="21" y2="20" />
                  <line x1="10.5" y1="23" x2="19.5" y2="23" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#1463FF]">03</span>
                <h3 className="text-base font-display font-bold text-[#111827] uppercase">CONNECTION</h3>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Seamless integration that connects systems, data, and people across every boundary.
                </p>
              </div>
            </div>

            {/* 04 ENGINEERING */}
            <div className="p-5 rounded-2xl bg-white border border-[#D8D4C9] shadow-sm flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
                <svg width="20" height="20" viewBox="0 0 30 30" fill="none" stroke="#1463FF" strokeWidth="2">
                  <circle cx="15" cy="15" r="5" />
                  <path d="M 15 4 L 15 7 M 15 23 L 15 26 M 4 15 L 7 15 M 23 15 L 26 15" strokeLinecap="round" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#1463FF]">04</span>
                <h3 className="text-base font-display font-bold text-[#111827] uppercase">ENGINEERING</h3>
                <p className="text-xs text-[#536070] font-body leading-relaxed">
                  Disciplined engineering that designs, builds, and evolves intelligent systems for the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER EXPLANATORY STATEMENT                                              */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 text-center max-w-2xl mx-auto space-y-2 select-none">
          <div className="flex justify-center">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#1463FF]" />
          </div>
          <p className="text-xs sm:text-sm text-[#536070] font-body leading-relaxed max-w-xl mx-auto">
            The Keystone represents the fundamental architectural anchor of <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>: building unshakeable digital foundations that bind intelligence, software, and real-world operations.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM 4 SUPPORTING PRINCIPLES BAR                                        */}
        {/* ========================================================================= */}
        <div className="mt-12 pt-8 border-t border-[#D8D4C9]/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
          {/* 1. STABLE BY DESIGN */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/50 border border-[#D8D4C9]/60 hover:bg-white transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider">
                STABLE BY DESIGN
              </h4>
              <p className="text-[11.5px] text-[#536070] font-body">
                Built for reliability and scale.
              </p>
            </div>
          </div>

          {/* 2. INTELLIGENT BY NATURE */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/50 border border-[#D8D4C9]/60 hover:bg-white transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
              <Crosshair className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider">
                INTELLIGENT BY NATURE
              </h4>
              <p className="text-[11.5px] text-[#536070] font-body">
                Designed for context and insight.
              </p>
            </div>
          </div>

          {/* 3. CONNECTED BY PURPOSE */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/50 border border-[#D8D4C9]/60 hover:bg-white transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
              <Maximize2 className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider">
                CONNECTED BY PURPOSE
              </h4>
              <p className="text-[11.5px] text-[#536070] font-body">
                Unified for impact and flow.
              </p>
            </div>
          </div>

          {/* 4. ENGINEERED TO EVOLVE */}
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/50 border border-[#D8D4C9]/60 hover:bg-white transition-colors shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/25 flex items-center justify-center text-[#1463FF] shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider">
                ENGINEERED TO EVOLVE
              </h4>
              <p className="text-[11.5px] text-[#536070] font-body">
                Continuously improved, always future-ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
