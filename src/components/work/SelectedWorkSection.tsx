'use client';

import React, { useState } from 'react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import WorkCard from './WorkCard';
import CaseStudyModal from './CaseStudyModal';
import { PROJECTS, Project } from '@/content/projects';

interface SelectedWorkSectionProps {
  onOpenProjectModal: () => void;
}

export default function SelectedWorkSection({ onOpenProjectModal }: SelectedWorkSectionProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <Section id="work" number="05">
      <PageContainer>
        <SectionHeader
          number="05"
          title="SELECTED WORK"
          subtitle="Real projects. Real systems. Tangible operational yield."
          actionText="VIEW ALL WORK →"
          onActionClick={() => setActiveProject(PROJECTS[0])}
        />

        {/* 3-Column Selected Work Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
            />
          ))}
        </div>
      </PageContainer>

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </Section>
  );
}
