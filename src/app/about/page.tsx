'use client';

import React from 'react';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import KeystoneLogo from '@/components/brand/KeystoneLogo';
import SystemArchitectureDiagram from '@/components/architecture/SystemArchitectureDiagram';
import SystemArchitectureFlow from '@/components/architecture/SystemArchitectureFlow';
import TheKeystoneSection from '@/components/about/TheKeystoneSection';
import { ABOUT_CONTENT } from '@/content/about';
import { PROJECTS } from '@/content/projects';
import EngineeringConvergenceSection from '@/components/home/EngineeringConvergenceSection';
import {
  ArrowRight,
  ArrowLeft,
  Terminal,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Shield,
  Zap,
  Database,
  Network,
  ChevronRight,
  Globe,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  // Select proof projects matching the required showcase
  const featuredProof = PROJECTS.slice(0, 4);

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-20 sm:py-24 md:py-28 relative bg-[#F5F1E8] text-[#536070] min-h-screen overflow-hidden">
          {/* Subtle Technical Grid Overlay */}
          <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" aria-hidden="true" />

          <PageContainer>
            {/* Back Navigation Bar */}
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#D8D4C9] hover:border-[#1677FF] font-mono text-xs text-[#536070] hover:text-[#111827] transition-all group"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#1463FF] transition-transform group-hover:-translate-x-1" />
                <span>BACK TO SYSTEM INDEX</span>
              </Link>
            </div>

            {/* ========================================================================= */}
            {/* 01 — HERO / OPENING                                                       */}
            {/* ========================================================================= */}
            <section className="relative pt-2 pb-20 md:pb-24 border-b border-[#D8D4C9]">
              <div className="max-w-4xl space-y-6">
                {/* Monospace Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#EDF4FF]/80 border border-[rgba(148,163,184,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-[#1677FF] animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-[#111827] tracking-wider uppercase">
                    {ABOUT_CONTENT.hero.badge}
                  </span>
                </div>

                {/* Large Confident Statement */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-[#111827] tracking-tight leading-[1.08] uppercase">
                  {ABOUT_CONTENT.hero.title}
                </h1>

                {/* Concise Institutional Explanation */}
                <p className="text-lg sm:text-xl text-[#536070] font-body leading-relaxed max-w-3xl">
                  <span style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}>{ABOUT_CONTENT.hero.subtitle}</span>
                </p>

                {/* Subtle Technical Signal */}
                <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[#1463FF] font-semibold tracking-wider uppercase">
                  <span>{ABOUT_CONTENT.hero.signal}</span>
                </div>
              </div>

              {/* Hero Architectural System Visual (3-Card Living Vector Conduits - Image 2) */}
              <div className="mt-12">
                <SystemArchitectureDiagram />
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 02 — COMPANY STATEMENT (WHO WE ARE)                                       */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 border-b border-[#D8D4C9]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4 space-y-2">
                  <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                    {ABOUT_CONTENT.whoWeAre.sectionNumber} — IDENTITY
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase tracking-tight">
                    {ABOUT_CONTENT.whoWeAre.title}
                  </h2>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <p className="text-lg text-[#111827] font-body leading-relaxed font-medium">
                    {ABOUT_CONTENT.whoWeAre.primaryStatement}
                  </p>

                  <div className="p-6 rounded-lg bg-white border border-[#1677FF]/30 text-xl sm:text-2xl font-bold text-[#111827] leading-relaxed shadow-sm" style={{ fontFamily: "'Caveat', var(--font-handwriting), cursive" }}>
                    "{ABOUT_CONTENT.whoWeAre.callout}"
                  </div>

                  <div className="space-y-4 pt-2">
                    {ABOUT_CONTENT.whoWeAre.narrative.map((p, i) => (
                      <p key={i} className="text-sm sm:text-base text-[#536070] font-body leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 03 — THE <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> SYSTEM MODEL                                         */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 border-b border-[#D8D4C9]">
              <div className="space-y-4 mb-12">
                <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                  {ABOUT_CONTENT.systemModel.sectionNumber} — ARCHITECTURAL FRAMEWORK
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
                  {ABOUT_CONTENT.systemModel.title}
                </h2>
                <p className="text-base text-[#536070] max-w-2xl font-body">
                  {ABOUT_CONTENT.systemModel.description}
                </p>
              </div>

              {/* 7-Node System Architecture Flow Visual (Image 4) */}
              <div className="mt-8">
                <SystemArchitectureFlow />
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 04 — SYSTEMS OVER FEATURES                                               */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 border-b border-[#D8D4C9]">
              <div className="max-w-4xl space-y-6">
                <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                  {ABOUT_CONTENT.systemsOverFeatures.sectionNumber} — PHILOSOPHY
                </div>

                <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#111827] uppercase tracking-tight leading-tight">
                  {ABOUT_CONTENT.systemsOverFeatures.headline}
                </h2>

                <p className="text-base sm:text-lg text-[#536070] font-body leading-relaxed">
                  {ABOUT_CONTENT.systemsOverFeatures.narrative}
                </p>

                {/* Pipeline Flow Visualization */}
                <div className="pt-6">
                  <div className="p-4 rounded-lg bg-white border border-[rgba(148,163,184,0.15)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#111827]">
                    {ABOUT_CONTENT.systemsOverFeatures.flow.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="px-3 py-1.5 rounded bg-white border border-[rgba(148,163,184,0.1)] font-bold text-center flex-1 min-w-[100px]">
                          {item}
                        </div>
                        {index < ABOUT_CONTENT.systemsOverFeatures.flow.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-[#1463FF] shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 05 — TECHNICAL INFRASTRUCTURE (CONVERGENCE TOPOLOGY)                      */}
            {/* ========================================================================= */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <EngineeringConvergenceSection />
            </div>

            {/* ========================================================================= */}
            {/* 06 — SYSTEMS WE'VE BUILT (PROOF THROUGH WORK)                            */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 border-b border-[#D8D4C9]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-3">
                  <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                    {ABOUT_CONTENT.proofThroughWork.sectionNumber} — VERIFIED PROOF
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
                    {ABOUT_CONTENT.proofThroughWork.title}
                  </h2>
                  <p className="text-base text-[#536070] max-w-xl font-body">
                    {ABOUT_CONTENT.proofThroughWork.subtitle}
                  </p>
                </div>

                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[#1463FF] hover:text-[#111827] transition-colors"
                >
                  <span>EXPLORE ALL SYSTEMS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredProof.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 rounded-xl bg-white border border-[rgba(148,163,184,0.15)] space-y-4 flex flex-col justify-between hover:border-[#1677FF]/50 transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs text-[#768494]">
                        <span className="text-[#1463FF] font-semibold">{project.systemType ?? project.type}</span>
                        <span>{project.id.toUpperCase()}</span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-[#111827] group-hover:text-[#1463FF] transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-xs text-[#536070] font-body leading-relaxed line-clamp-2">
                        {project.summary ?? project.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[rgba(148,163,184,0.1)] flex items-center justify-between">
                      <div className="font-mono text-[11px] text-[#111827]">
                        {project.metrics?.[0]
                          ? <>{project.metrics[0].label}: <span className="text-[#1463FF] font-bold">{project.metrics[0].value}</span></>
                          : <span className="text-[#1463FF] font-bold">{project.type}</span>}
                      </div>

                      <Link
                        href={project.href}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#111827] hover:text-[#1463FF] transition-colors"
                      >
                        <span>DOSSIER</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#1463FF]" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 07 — WHY <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>                                                       */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 border-b border-[#D8D4C9]">
              <div className="space-y-4 mb-12">
                <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                  {ABOUT_CONTENT.whyAklintech.sectionNumber} — CORE PRINCIPLES
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
                  {ABOUT_CONTENT.whyAklintech.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ABOUT_CONTENT.whyAklintech.principles.map((pr, i) => (
                  <div key={i} className="p-6 rounded-lg bg-white border border-[#D8D4C9] space-y-3">
                    <h3 className="font-mono text-base font-bold text-[#111827]">
                      {pr.title}
                    </h3>
                    <div className="font-mono text-xs text-[#1463FF] font-semibold">
                      {pr.subtitle}
                    </div>
                    <p className="text-xs text-[#536070] font-body leading-relaxed">
                      {pr.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 08 — THE KEYSTONE / THE STRUCTURE BEHIND THE SYSTEM                       */}
            {/* ========================================================================= */}
            <TheKeystoneSection />

            {/* ========================================================================= */}
            {/* 09 — DIRECTION / CAPABILITY EVOLUTION                                     */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24 border-b border-[#D8D4C9]">
              <div className="space-y-4 mb-12">
                <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                  {ABOUT_CONTENT.evolution.sectionNumber} — {ABOUT_CONTENT.evolution.title}
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#111827] uppercase tracking-tight">
                  {ABOUT_CONTENT.evolution.subtitle}
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 font-mono text-xs text-[#111827]">
                {ABOUT_CONTENT.evolution.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex-1 p-4 rounded-lg bg-white border border-[rgba(148,163,184,0.15)] flex flex-col justify-between space-y-3 hover:border-[#1677FF]/50 transition-colors"
                  >
                    <div className="text-[10px] text-[#1463FF]">STAGE 0{idx + 1}</div>
                    <div className="font-bold text-xs">{step}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* 10 — START A SYSTEM (ENGAGEMENT CTA)                                      */}
            {/* ========================================================================= */}
            <section className="py-16 md:py-24">
              <div className="p-8 sm:p-12 rounded-xl bg-white border border-[#D8D4C9] flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <div className="font-mono text-xs font-bold text-[#1463FF] uppercase tracking-widest">
                    {ABOUT_CONTENT.cta.sectionNumber} — ENGAGEMENT
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#111827] uppercase tracking-tight">
                    {ABOUT_CONTENT.cta.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#536070] font-body max-w-md">
                    {ABOUT_CONTENT.cta.subtitle}
                  </p>
                </div>

                <button
                  onClick={onOpenProjectModal}
                  className="px-6 py-3.5 rounded-lg bg-[#1677FF] hover:bg-[#1677FF]/90 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg hover:shadow-[#1677FF]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{ABOUT_CONTENT.cta.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
