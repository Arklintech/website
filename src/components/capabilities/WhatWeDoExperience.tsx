'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { KeystoneMark } from '@/components/brand/KeystoneLogo';
import {
  ArrowDown,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Database,
  BarChart3,
  Bot,
  Search,
  Code2,
  Users,
  Box,
  CheckCircle2,
  TrendingUp,
  Activity,
  Terminal,
  Zap,
} from 'lucide-react';

interface WhatWeDoExperienceProps {
  onOpenProjectModal?: () => void;
}

// Shared visual container styles
const lightVisualBox = "lg:col-span-7 relative flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-[#F5F1E8]/60 to-transparent rounded-2xl border border-[#D8D4C9]/40 min-h-[300px] sm:min-h-[360px]";
const blueVisualBox  = "lg:col-span-7 relative flex items-center justify-center p-6 sm:p-10 bg-white/70 rounded-2xl border border-[#D8D4C9]/60 min-h-[300px] sm:min-h-[360px]";
const darkVisualBox  = "lg:col-span-7 relative flex items-center justify-center p-6 sm:p-10 bg-[#0F172A]/80 rounded-2xl border border-[#334155]/60 min-h-[300px] sm:min-h-[360px] z-10";

export default function WhatWeDoExperience({ onOpenProjectModal }: WhatWeDoExperienceProps) {
  return (
    <section id="what-we-do" className="relative min-h-screen bg-[#F5F1E8] text-[#111827] overflow-x-hidden selection:bg-[#1463FF]/20 selection:text-[#111827] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 border-b border-[#D8D4C9]">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#1463FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-24">
        {/* Top Brand Identity Center Lockup (Matching Official Brand Visual) */}
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-14">
          
          {/* Row 1: Keystone Logo + ARKLINTECH Typography */}
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <KeystoneMark className="w-8 h-8 sm:w-11 sm:h-11 lg:w-13 lg:h-13" />

              {/* Main Wordmark: ARKLINTECH in Deep Navy */}
              <h1
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] uppercase tracking-[0.22em] flex items-center leading-none"
                style={{
                  fontFamily: "'Syncopate', var(--font-syncopate), sans-serif",
                  paddingLeft: '0.22em',
                }}
              >
                <span>ARKLINTECH</span>
              </h1>
            </div>

            {/* Row 2: TECHNOLOGY SYSTEMS Sub Descriptor with Blue Tapered Wings */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-2.5 sm:mt-3.5 w-full">
              {/* Left Tapered Wing */}
              <svg
                viewBox="0 0 100 6"
                className="h-[2px] sm:h-[3px] w-8 sm:w-16 shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="taperLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1463FF" stopOpacity="0.1" />
                    <stop offset="60%" stopColor="#1463FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <polygon points="0,3 100,0.5 100,5.5" fill="url(#taperLeft)" />
              </svg>

              <span
                className="font-mono text-[9px] sm:text-xs lg:text-sm font-bold text-[#536070] uppercase tracking-[0.26em] whitespace-nowrap"
                style={{ paddingLeft: '0.26em' }}
              >
                TECHNOLOGY SYSTEMS
              </span>

              {/* Right Tapered Wing */}
              <svg
                viewBox="0 0 100 6"
                className="h-[2px] sm:h-[3px] w-8 sm:w-16 shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="taperRight" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#1463FF" stopOpacity="0.1" />
                    <stop offset="60%" stopColor="#1463FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <polygon points="0,0.5 100,3 0,5.5" fill="url(#taperRight)" />
              </svg>
            </div>
          </div>

          {/* Sub-Brand Core Motto: ENGINEER · ORCHESTRATE · EVOLVE */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base font-mono font-bold uppercase tracking-[0.2em] pt-2">
            <span className="text-[#111827]">ENGINEER</span>
            <span className="text-[#1463FF]">·</span>
            <span className="text-[#1463FF]">ORCHESTRATE</span>
            <span className="text-[#1463FF]">·</span>
            <span className="text-[#111827]">EVOLVE</span>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-[#536070] font-body max-w-xl mx-auto leading-relaxed mt-4">
            <span style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}>Intelligent systems engineered for how business actually operates.</span>
          </p>

          {/* Scroll to Explore Action Indicator */}
          <div className="pt-2 flex justify-center">
            <a
              href="#service-01"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D8D4C9] bg-white/70 hover:bg-white text-[11px] font-mono font-bold text-[#536070] uppercase tracking-wider transition-all hover:shadow-xs group"
            >
              <div className="w-4 h-4 rounded-full border border-[#1463FF] flex items-center justify-center text-[#1463FF] group-hover:translate-y-0.5 transition-transform">
                <ArrowDown className="w-2.5 h-2.5" />
              </div>
              <span>SCROLL TO EXPLORE</span>
            </a>
          </div>

          {/* Section Transition Marker: WHAT WE DO */}
          <div className="pt-10 flex flex-col items-center justify-center space-y-1">
            <h2 className="text-sm sm:text-base font-display font-bold text-[#111827] uppercase tracking-[0.25em]">
              WHAT WE DO
            </h2>
            <div className="w-8 h-0.5 bg-[#1463FF] rounded-full" />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SEVEN ALTERNATING EDITORIAL SERVICE CARDS                             */}
        {/* ========================================================================= */}
        <div className="space-y-10 sm:space-y-14">

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 01: WEBSITES — Text LEFT · SVG RIGHT                              */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-01"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#1463FF]/40 transition-all"
          >
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#1463FF] uppercase tracking-wider">01</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">WEBSITES</h3>
              <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                High performance websites that build trust, engage users and drive real business outcomes.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['RESPONSIVE', 'FAST', 'CONVERSION FOCUSED'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-white border border-[#D8D4C9] font-mono text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wider shadow-2xs">{badge}</span>
                ))}
              </div>
            </div>

            {/* Right Visual — 01-websites.svg */}
            <div className={lightVisualBox}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/01-websites.svg"
                  alt="Websites service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 02: SEO — SVG LEFT · Text RIGHT                                   */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-02"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#EAF2FF] border border-[#D8D4C9] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#1463FF]/40 transition-all"
          >
            {/* Left Visual — 02-seo.svg */}
            <div className={`${blueVisualBox} order-2 lg:order-1`}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/02-seo.svg"
                  alt="SEO service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 sm:space-y-6">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#1463FF] uppercase tracking-wider">02</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">SEO</h3>
              <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                Data-driven SEO strategies that increase visibility, drive organic traffic and grow your brand.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['ON-PAGE SEO', 'TECHNICAL SEO', 'GROWTH'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-white border border-[#D8D4C9] font-mono text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wider shadow-2xs">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 03: CHAT & VOICE BOT — Text LEFT · SVG RIGHT                      */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-03"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#1463FF]/40 transition-all"
          >
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#1463FF] uppercase tracking-wider">03</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">CHAT &amp; VOICE BOT</h3>
              <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                Intelligent chat &amp; voice bots that engage users, answer questions and automate customer support.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['AI CHATBOT', 'VOICE BOT', '24/7 SUPPORT'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-white border border-[#D8D4C9] font-mono text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wider shadow-2xs">{badge}</span>
                ))}
              </div>
            </div>

            {/* Right Visual — 03-chat-voice-bot.svg */}
            <div className={lightVisualBox}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/03-chat-voice-bot.svg"
                  alt="Chat and Voice Bot service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 04: AI AUTOMATION — SVG LEFT · Text RIGHT                         */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-04"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#EAF2FF] border border-[#D8D4C9] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#1463FF]/40 transition-all"
          >
            {/* Left Visual — 04-ai-automation.svg */}
            <div className={`${blueVisualBox} order-2 lg:order-1`}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/04-ai-automation.svg"
                  alt="AI Automation service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 sm:space-y-6">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#1463FF] uppercase tracking-wider">04</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">AI AUTOMATION</h3>
              <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                Automate repetitive tasks, streamline workflows and boost productivity with intelligent automation.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['WORKFLOW AUTOMATION', 'AI AGENTS', 'INTEGRATIONS'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-white border border-[#D8D4C9] font-mono text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wider shadow-2xs">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 05: CUSTOM SOFTWARE — Text LEFT · SVG RIGHT                       */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-05"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#FBF9F3] border border-[#D8D4C9] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#1463FF]/40 transition-all"
          >
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#1463FF] uppercase tracking-wider">05</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">CUSTOM SOFTWARE</h3>
              <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                Custom software solutions built around your unique business processes and goals.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['TAILORED SOLUTIONS', 'SCALABLE', 'SECURE'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-white border border-[#D8D4C9] font-mono text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wider shadow-2xs">{badge}</span>
                ))}
              </div>
            </div>

            {/* Right Visual — 05-custom-software.svg */}
            <div className={lightVisualBox}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/05-custom-software.svg"
                  alt="Custom Software service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 06: LEAD MANAGEMENT SYSTEM — SVG LEFT · Text RIGHT                */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-06"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#EAF2FF] border border-[#D8D4C9] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center hover:border-[#1463FF]/40 transition-all"
          >
            {/* Left Visual — 06-lead-management-system.svg */}
            <div className={`${blueVisualBox} order-2 lg:order-1`}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/06-lead-management-system.svg"
                  alt="Lead Management System service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4 sm:space-y-6">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#1463FF] uppercase tracking-wider">06</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">LEAD MANAGEMENT SYSTEM</h3>
              <p className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                Organize leads, track interactions and convert more opportunities with a powerful CRM system.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['LEAD TRACKING', 'PIPELINE', 'REPORTING'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-white border border-[#D8D4C9] font-mono text-[10px] sm:text-[11px] font-bold text-[#111827] uppercase tracking-wider shadow-2xs">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* CARD 07: 3D WEBSITES — Text LEFT · SVG RIGHT (dark navy card)          */}
          {/* ----------------------------------------------------------------------- */}
          <div
            id="service-07"
            className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#070D1D] border border-[#1E293B] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden"
          >
            {/* Subtle Cosmic Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1463FF]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 relative z-10">
              <div className="inline-block font-mono text-sm sm:text-base font-bold text-[#38BDF8] uppercase tracking-wider">07</div>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white uppercase tracking-tight">3D WEBSITES</h3>
              <p className="text-sm sm:text-base text-[#94A3B8] font-body leading-relaxed">
                Immersive 3D websites that create stunning experiences and leave a lasting impression.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {['3D INTERACTION', 'IMMERSIVE', 'NEXT GEN'].map((badge) => (
                  <span key={badge} className="px-3 py-1 rounded-md bg-[#0F172A] border border-[#334155] font-mono text-[10px] sm:text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider shadow-inner">{badge}</span>
                ))}
              </div>
            </div>

            {/* Right Visual — 07-3d-websites.svg */}
            <div className={`${darkVisualBox}`}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 260 }}>
                <Image
                  src="/what%20we%20do%20images/07-3d-websites.svg"
                  alt="3D Websites service illustration"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. CLOSING CTA STRIP                                                     */}
        {/* ========================================================================= */}
        <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#D8D4C9]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1463FF] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#1463FF]/30 p-2">
                <KeystoneMark className="w-full h-full" />
              </div>
            </div>
            <div>
              <p className="text-sm sm:text-base font-display font-bold text-[#111827] uppercase tracking-tight">
                Ready to build something extraordinary?
              </p>
              <p className="text-xs sm:text-sm text-[#536070] font-body">
                Let&apos;s engineer the right solution for your business.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenProjectModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1463FF] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all hover:shadow-lg group whitespace-nowrap"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
