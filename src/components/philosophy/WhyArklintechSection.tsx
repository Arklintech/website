'use client';

import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import PrincipleCard from './PrincipleCard';
import { PRINCIPLES } from '@/content/principles';

interface WhyArklintechSectionProps {
  onOpenProjectModal?: () => void;
}

export default function WhyArklintechSection({ onOpenProjectModal }: WhyArklintechSectionProps) {
  return (
    <section id="philosophy" className="py-24 border-b border-white/[0.08] bg-[#060B18]/60 relative">
      <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />

      <PageContainer>
        <SectionHeader
          number="04"
          tag="CORE PHILOSOPHY"
          title="WHY ARKLINTECH"
          description="We reject generic buzzwords, disposable prototypes, and superficial features. We engineer deterministic, highly resilient systems built for long-term operational impact."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle) => (
            <PrincipleCard key={principle.id} principle={principle} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

export { WhyArklintechSection as WhyZaqvoroSection };
