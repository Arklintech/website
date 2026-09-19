'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import SystemsBuiltSection from '@/components/work/SystemsBuiltSection';

interface WorkViewProps {
  initialProjectId?: string;
}

export default function WorkView({ initialProjectId }: WorkViewProps) {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <SystemsBuiltSection
          onOpenProjectModal={onOpenProjectModal}
          initialProjectId={initialProjectId}
        />
      )}
    </PageShell>
  );
}
