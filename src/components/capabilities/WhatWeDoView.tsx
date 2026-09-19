'use client';

import React from 'react';
import PageShell from '@/components/layout/PageShell';
import WhatWeDoExperience from '@/components/capabilities/WhatWeDoExperience';

export default function WhatWeDoView() {
  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="pt-12">
          <WhatWeDoExperience onOpenProjectModal={onOpenProjectModal} />
        </div>
      )}
    </PageShell>
  );
}
