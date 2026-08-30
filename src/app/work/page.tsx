'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import SystemsBuiltSection from '@/components/work/SystemsBuiltSection';

export default function WorkPage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <SystemsBuiltSection onOpenProjectModal={onOpenProjectModal} />
      )}
    </PageShell>
  );
}
