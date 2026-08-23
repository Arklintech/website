'use client';

import React from 'react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import HumanTechBanner from './HumanTechBanner';
import PrincipleCard from './PrincipleCard';
import { PRINCIPLES } from '@/content/principles';

interface WhyZaqvoroSectionProps {
  onOpenProjectModal: () => void;
}

export default function WhyZaqvoroSection({ onOpenProjectModal }: WhyZaqvoroSectionProps) {
  return (
    <Section id="about" number="07">
      <PageContainer>
        <SectionHeader
          number="07"
          title="WHY ZAQVORO"
          subtitle="Our engineering principles and system-first philosophy guide every architecture we construct."
          actionText="START COLLABORATION →"
          onActionClick={onOpenProjectModal}
        />

        {/* Top Banner: Human + Technology */}
        <HumanTechBanner />

        {/* 4 Architectural Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRINCIPLES.map((principle) => (
            <PrincipleCard key={principle.id} principle={principle} />
          ))}
        </div>
      </PageContainer>
    </Section>
  );
}
