'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import CinematicIntro from '@/components/hero/CinematicIntro';
import Hero from '@/components/hero/Hero';
import CapabilitiesSection from '@/components/capabilities/CapabilitiesSection';
import ProcessSection from '@/components/process/ProcessSection';
import SystemsSection from '@/components/systems/SystemsSection';
import SelectedWorkSection from '@/components/work/SelectedWorkSection';
import FutureSection from '@/components/future/FutureSection';
import WhyZaqvoroSection from '@/components/philosophy/WhyZaqvoroSection';
import FinalConvergenceSection from '@/components/cta/FinalConvergenceSection';

export default function HomePage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <>
          {/* =========================================================
              CLEAN SCROLLTELLING INTRO
              (Pure full-screen 2K living machine scrolltelling experience)
              ========================================================= */}
          <CinematicIntro />

          {/* =========================================================
              MAIN HOMEPAGE (UNPINNED & FLOWING NATURALLY)
              ========================================================= */}

          {/* 01 — HERO SECTION */}
          <Hero onOpenProjectModal={onOpenProjectModal} />

          {/* 02 — WHAT WE BUILD */}
          <CapabilitiesSection onOpenProjectModal={onOpenProjectModal} />

          {/* 03 — HOW WE BUILD */}
          <ProcessSection />

          {/* 04 — SYSTEMS */}
          <SystemsSection onOpenProjectModal={onOpenProjectModal} />

          {/* 05 — SELECTED WORK */}
          <SelectedWorkSection onOpenProjectModal={onOpenProjectModal} />

          {/* 06 — FUTURE / INNOVATION */}
          <FutureSection onOpenProjectModal={onOpenProjectModal} />

          {/* 07 — WHY ZAQVORO */}
          <WhyZaqvoroSection onOpenProjectModal={onOpenProjectModal} />

          {/* 08 — FINAL CONVERGENCE */}
          <FinalConvergenceSection onOpenProjectModal={onOpenProjectModal} />
        </>
      )}
    </PageShell>
  );
}
