'use client';

import React from 'react';
import Image from 'next/image';
import PageContainer from '@/components/layout/PageContainer';
import HeroContent from './HeroContent';

interface HeroProps {
  onOpenProjectModal: () => void;
}

export default function Hero({ onOpenProjectModal }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] sm:min-h-[92vh] md:min-h-[96vh] flex items-center overflow-hidden border-b border-z-border bg-z-black"
    >
      {/* ==========================================
          FULL-BLEED CINEMATIC ZAQVORO HERO BACKGROUND
          ========================================== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/visuals/zaqvoro/hero-bg.webp"
          alt="ZAQVORO Core - Advanced Intelligent Systems Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />

        {/* Ambient Dark Gradients for Text Readability & Cinematic Mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-z-black/95 via-z-black/80 md:via-z-black/55 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-t from-z-black via-transparent to-z-black/70 z-1 pointer-events-none" />
      </div>

      {/* ==========================================
          FOREGROUND CONTENT OVERLAY
          ========================================== */}
      <PageContainer className="relative z-10 py-20 sm:py-24 md:py-28">
        <div className="max-w-3xl">
          <HeroContent onOpenProjectModal={onOpenProjectModal} />
        </div>
      </PageContainer>
    </section>
  );
}
