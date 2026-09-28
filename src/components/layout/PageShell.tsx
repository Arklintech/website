'use client';

import React from 'react';
import { useProjectModal } from './SiteShell';

interface PageShellProps {
  children: (props: { onOpenProjectModal: () => void }) => React.ReactNode;
}

/**
 * Page content wrapper. The chrome (header, footer, modal, smooth scroll) lives in the
 * persistent SiteShell mounted by the (site) layout; this only hands pages the modal opener.
 */
export default function PageShell({ children }: PageShellProps) {
  const { openProjectModal } = useProjectModal();
  return <>{children({ onOpenProjectModal: openProjectModal })}</>;
}
