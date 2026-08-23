'use client';

import React, { useState } from 'react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import CapabilityCard from './CapabilityCard';
import CapabilityDetailModal from './CapabilityDetailModal';
import { CAPABILITIES, Capability } from '@/content/capabilities';

interface CapabilitiesSectionProps {
  onOpenProjectModal: () => void;
}

export default function CapabilitiesSection({ onOpenProjectModal }: CapabilitiesSectionProps) {
  const [selectedCapability, setSelectedCapability] = useState<Capability | null>(null);

  return (
    <Section id="capabilities" number="02">
      <PageContainer>
        <SectionHeader
          number="02"
          title="WHAT WE BUILD"
          subtitle="Four core engineering disciplines structured into one cohesive intelligent technological ecosystem."
          actionText="SYSTEM MATRIX →"
          actionHref="#systems"
        />

        {/* 4-Column Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap) => (
            <CapabilityCard
              key={cap.id}
              capability={cap}
              onSelect={setSelectedCapability}
            />
          ))}
        </div>
      </PageContainer>

      {/* Capability Details Modal */}
      <CapabilityDetailModal
        capability={selectedCapability}
        onClose={() => setSelectedCapability(null)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </Section>
  );
}
