'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from './Footer';
import GrainOverlay from '@/components/effects/GrainOverlay';
import AmbientBackground from '@/components/effects/AmbientBackground';
import SmoothScrollProvider from '@/components/effects/SmoothScrollProvider';
import ProjectInquiryModal from '@/components/cta/ProjectInquiryModal';

interface PageShellProps {
  children: (props: { onOpenProjectModal: () => void }) => React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  const handleOpenProjectModal = () => setProjectModalOpen(true);
  const handleCloseProjectModal = () => setProjectModalOpen(false);

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-z-black text-z-text overflow-x-clip selection:bg-z-blue-500/30 selection:text-z-white">
        {/* Layered Cinematic Environment */}
        <AmbientBackground />
        <GrainOverlay />

        {/* Global Navigation */}
        <Navbar onOpenProjectModal={handleOpenProjectModal} />

        {/* Main Content Viewport */}
        <main className="relative z-10">
          {children({ onOpenProjectModal: handleOpenProjectModal })}
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Project Intake Modal */}
        <ProjectInquiryModal
          isOpen={projectModalOpen}
          onClose={handleCloseProjectModal}
        />
      </div>
    </SmoothScrollProvider>
  );
}
