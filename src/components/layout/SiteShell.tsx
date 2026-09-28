'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from './Footer';
import GrainOverlay from '@/components/effects/GrainOverlay';
import AmbientBackground from '@/components/effects/AmbientBackground';
import ProjectInquiryModal from '@/components/cta/ProjectInquiryModal';

const ProjectModalContext = createContext<{ openProjectModal: () => void } | null>(null);

export function useProjectModal() {
  const ctx = useContext(ProjectModalContext);
  if (!ctx) throw new Error('useProjectModal must be used inside <SiteShell>');
  return ctx;
}

/**
 * Site chrome shared by every public page — mounted once by the (site) layout so the
 * header, footer, backgrounds, and inquiry modal persist across client-side navigations
 * instead of being torn down and rebuilt on every click.
 *
 * Scrolling is the browser's native scrolling: it runs on the compositor thread, so it stays
 * smooth on every OS and input device even while the page is busy.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const openProjectModal = useCallback(() => setProjectModalOpen(true), []);
  const modal = useMemo(() => ({ openProjectModal }), [openProjectModal]);

  return (
    <ProjectModalContext.Provider value={modal}>
      <div className="relative min-h-screen bg-[#F5F1E8] text-z-text selection:bg-z-blue-500/30 selection:text-z-white">
        {/* Layered Cinematic Environment */}
        <AmbientBackground />
        <GrainOverlay />

        {/* Global Navigation */}
        <Navbar onOpenProjectModal={openProjectModal} />

        {/* Main Content Viewport */}
        <main className="relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Project Intake Modal */}
        <ProjectInquiryModal isOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
      </div>
    </ProjectModalContext.Provider>
  );
}
