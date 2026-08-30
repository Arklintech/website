'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import ArkParticleRobot from '@/components/robot/ArkParticleRobot';
import Hero from '@/components/hero/Hero';
import OrientationSection from '@/components/home/OrientationSection';
import SelectedProductionSystemsSection from '@/components/home/SelectedProductionSystemsSection';
import HomeStartSection from '@/components/home/HomeStartSection';

export default function HomePage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <>
          {/* 00 — INTRO LANDING: Scroll-Driven Particle Robot Traversal */}
          <ArkParticleRobot />

          {/* 01 — HERO (Approved Blueprint Composition) */}
          <Hero onOpenProjectModal={onOpenProjectModal} />

          {/* 02 — ORIENTATION (Plain-Language Business Explanation) */}
          <OrientationSection />

          {/* 03 — SELECTED PRODUCTION SYSTEMS (Clean, Curated Preview with Direct Work Handoff) */}
          <SelectedProductionSystemsSection />

          {/* 04 — START A SYSTEM (Short Intake & 3-Step Confirmation) */}
          <HomeStartSection onOpenProjectModal={onOpenProjectModal} />
        </>
      )}
    </PageShell>
  );
}
