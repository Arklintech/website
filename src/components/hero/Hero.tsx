'use client';

import React from 'react';
import HeroContent from './HeroContent';

interface HeroProps {
  onOpenProjectModal?: () => void;
}

export default function Hero({ onOpenProjectModal }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative bg-[#F5F1E8] overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-18 lg:pb-20 border-b border-[#D8D4C9]"
    >
      {/* Warm Architectural Grid */}
      <div className="absolute inset-0 technical-grid opacity-35 pointer-events-none -z-10" aria-hidden="true" />

      {/* Hero Composition Container */}
      <div className="relative z-20 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <HeroContent onOpenProjectModal={onOpenProjectModal} />
      </div>
    </section>
  );
}
