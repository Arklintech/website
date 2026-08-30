'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import ProcessSection from '@/components/process/ProcessSection';

export default function HowWeHelpPage() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="pt-12">
          {/* New Update: HOW <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span> ACTUALLY WORKS Process Experience */}
          <ProcessSection />
        </div>
      )}
    </PageShell>
  );
}
