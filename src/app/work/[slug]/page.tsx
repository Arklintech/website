'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageShell from '@/components/layout/PageShell';
import PageContainer from '@/components/layout/PageContainer';
import { PROJECTS } from '@/content/projects';
import EngineeringDossier from '@/components/work/EngineeringDossier';
import { ArrowLeft } from 'lucide-react';

interface WorkDetailPageProps {
  params: { slug: string };
}

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
  const slug = params?.slug || '';
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    return notFound();
  }

  return (
    <PageShell>
      {({ onOpenProjectModal }) => (
        <div className="py-24 sm:py-28 md:py-32 relative">
          <div className="absolute inset-0 technical-grid opacity-25 pointer-events-none" />

          <PageContainer>
            <div className="mb-6">
              <Link
                href="/work"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-z-muted hover:text-z-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>ALL CASE STUDIES</span>
              </Link>
            </div>

            {/* Embedded Dossier View */}
            <div className="bg-z-surface border border-z-border rounded-xl p-4 sm:p-8">
              <EngineeringDossier
                project={project}
                onOpenProjectModal={onOpenProjectModal}
              />
            </div>
          </PageContainer>
        </div>
      )}
    </PageShell>
  );
}
