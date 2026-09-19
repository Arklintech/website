'use client';

import React from 'react';
import Link from 'next/link';
import GlobalPresenceMap from './GlobalPresenceMap';
import KeystoneLogo from '@/components/brand/KeystoneLogo';
import { ArrowRight, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#D8D4C9] bg-[#EDE8DD] text-[#536070] pt-16 pb-10 overflow-hidden">
      {/* Centered Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* ========================================================================= */}
        {/* GIANT ARKLINTECH WATERMARK LAYER (Bounded exactly within content margins)  */}
        {/* ========================================================================= */}
        <div
          className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-12 bottom-2 sm:bottom-4 md:bottom-6 pointer-events-none select-none z-0 overflow-hidden flex items-end justify-center"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1380 180"
            className="w-full h-auto max-h-[160px] sm:max-h-[200px] md:max-h-[240px]"
            preserveAspectRatio="xMidYMid meet"
          >
            <g fill="rgba(17, 24, 39, 0.11)">
              {/* Custom Vector Chevron "Λ" Glyph matching brand logo */}
              <path d="M 67.3,15 L 134.6,140 L 93.7,140 L 67.3,86.1 L 40.9,140 L 0,140 Z" />
              <text
                x="150"
                y="136"
                textLength="1230"
                lengthAdjust="spacing"
                fontFamily="'Syncopate', var(--font-syncopate), sans-serif"
                fontSize="145"
                fontWeight="700"
                letterSpacing="0.05em"
              >
                RKLINTECH
              </text>
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* FOREGROUND FOOTER CONTENT LAYER (z-10 relative)                           */}
        {/* ========================================================================= */}
        <div className="relative z-10">
          {/* Main Columns Grid - Exact to Master Reference Blueprint */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 pb-12 border-b border-[#D8D4C9]">
            {/* Brand & Mission Column (Span 2 on lg) */}
            <div className="col-span-2 space-y-4">
              <KeystoneLogo size="md" href="/" />

              <p className="text-xs text-[#536070] font-body leading-relaxed max-w-sm">
                Architecting intelligent systems. Driving real outcomes.
              </p>

              <div className="pt-2">
                <Link
                  href="/start-a-system"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#D8D4C9] hover:border-[#1677FF]/60 text-xs font-mono text-[#111827] hover:text-[#1463FF] transition-all group shadow-sm backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF]"
                >
                  <span>START A SYSTEM</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1463FF] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Direct Company Contact Email */}
              <div className="pt-1">
                <a
                  href="mailto:work@arklintech.com"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#536070] hover:text-[#1463FF] transition-colors group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1463FF] rounded"
                  aria-label="Send email to work@arklintech.com"
                >
                  <Mail className="w-3.5 h-3.5 text-[#1463FF] shrink-0" />
                  <span>work@arklintech.com</span>
                </a>
              </div>
            </div>

            {/* WHAT WE DO */}
            <div className="space-y-3 font-mono text-xs">
              <div className="font-bold text-[#111827] uppercase tracking-wider text-xs pb-1 border-b border-[#D8D4C9]">
                <Link href="/what-we-do" className="hover:text-[#1463FF] transition-colors">WHAT WE DO</Link>
              </div>
              <ul className="space-y-2 text-xs text-[#536070]">
                <li><Link href="/what-we-do/ai-intelligence" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">AI & Intelligence</Link></li>
                <li><Link href="/what-we-do/software-platforms" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Software & Platforms</Link></li>
                <li><Link href="/what-we-do/automation-orchestration" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Automation & Orchestration</Link></li>
                <li><Link href="/what-we-do/business-systems" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Business Systems</Link></li>
                <li className="pt-1 border-t border-[#D8D4C9]/50"><Link href="/about" className="text-[#0050E6] hover:text-[#0B2E73] transition-colors font-semibold">About ARKLINTECH →</Link></li>
              </ul>
            </div>

            {/* HOW WE HELP */}
            <div className="space-y-3 font-mono text-xs">
              <div className="font-bold text-[#111827] uppercase tracking-wider text-xs pb-1 border-b border-[#D8D4C9]">
                <Link href="/how-we-help" className="hover:text-[#1463FF] transition-colors">HOW WE HELP</Link>
              </div>
              <ul className="space-y-2 text-xs text-[#536070]">
                <li><Link href="/how-we-help/connected-operations" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Connected Operations</Link></li>
                <li><Link href="/how-we-help/intelligent-automation" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Intelligent Automation</Link></li>
                <li><Link href="/how-we-help/digital-platform-engineering" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Digital Platforms</Link></li>
                <li><Link href="/how-we-help/systems-modernization" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Systems Modernization</Link></li>
                <li><Link href="/how-we-help/operational-intelligence" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Operational Intelligence</Link></li>
                <li><Link href="/how-we-help/ai-enabled-operations" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">AI-Enabled Operations</Link></li>
              </ul>
            </div>

            {/* INDUSTRIES */}
            <div className="space-y-3 font-mono text-xs">
              <div className="font-bold text-[#111827] uppercase tracking-wider text-xs pb-1 border-b border-[#D8D4C9]">
                <Link href="/industries" className="hover:text-[#1463FF] transition-colors">INDUSTRIES</Link>
              </div>
              <ul className="space-y-2 text-xs text-[#536070]">
                <li><Link href="/industries/commerce" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Commerce & Retail</Link></li>
                <li><Link href="/industries/education" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Education & Academia</Link></li>
                <li><Link href="/industries/hospitality" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Hospitality & POS</Link></li>
                <li><Link href="/industries/healthcare" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Healthcare & Clinical</Link></li>
                <li><Link href="/industries" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Non-Profit & Civic</Link></li>
                <li className="pt-1 border-t border-[#D8D4C9]/50"><Link href="/trust-security" className="text-[#0050E6] hover:text-[#0B2E73] transition-colors font-semibold">Trust & Security →</Link></li>
              </ul>
            </div>

            {/* ARCHITECTURE & WORK */}
            <div className="space-y-3 font-mono text-xs">
              <div className="font-bold text-[#111827] uppercase tracking-wider text-xs pb-1 border-b border-[#D8D4C9]">
                <Link href="/work" className="hover:text-[#1463FF] transition-colors">WORK & SYSTEMS</Link>
              </div>
              <ul className="space-y-2 text-xs text-[#536070]">
                <li><Link href="/work" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Systems We&apos;ve Built</Link></li>
                <li><Link href="/work/daarayn" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">DAARAYN System</Link></li>
                <li><Link href="/work/neominds" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">NEOMINDS System</Link></li>
                <li><Link href="/work/parivar" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">PARIVAR System</Link></li>
                <li><Link href="/engineering" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Engineering Lifecycle</Link></li>
                <li><Link href="/technology-architecture" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Technology Architecture</Link></li>
                <li><Link href="/systems-library" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Systems Library</Link></li>
                <li><Link href="/insights" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Insights & Notes</Link></li>
                <li><Link href="/lab" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">ARKLINTECH Lab</Link></li>
              </ul>
            </div>

            {/* GLOBAL PRESENCE (Span 2 Columns) */}
            <div className="col-span-2">
              <GlobalPresenceMap />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM BAR & LEGAL (z-10 relative)                                        */}
          {/* ========================================================================= */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#475569]">
            <div>
              © 2026 <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: "0.1em" }} className="font-bold"><span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span></span> Technology Systems. All rights reserved.
            </div>

            <div className="flex items-center gap-4 text-[#475569]">
              <Link href="/trust-security" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Privacy Policy</Link>
              <span>•</span>
              <Link href="/trust-security" className="hover:text-[#111827] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1677FF] rounded">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
