'use client';

import React from 'react';
import WhatWeDoExperience from './WhatWeDoExperience';

interface CapabilitiesSectionProps {
  onOpenProjectModal?: () => void;
}

export default function CapabilitiesSection({ onOpenProjectModal }: CapabilitiesSectionProps) {
  return <WhatWeDoExperience onOpenProjectModal={onOpenProjectModal} />;
}
