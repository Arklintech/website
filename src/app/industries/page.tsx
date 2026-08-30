'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import IndustriesExperience from '@/components/industries/IndustriesExperience';

export default function IndustriesPage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <IndustriesExperience onOpenProjectModal={onOpenProjectModal} />
      )}
    </PageShell>
  );
}
