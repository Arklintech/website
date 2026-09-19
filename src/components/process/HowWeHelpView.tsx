'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import ProcessSection from '@/components/process/ProcessSection';

export default function HowWeHelpView() {
  return (
    <PageShell>
      {() => (
        <div className="pt-12">
          <ProcessSection />
        </div>
      )}
    </PageShell>
  );
}
