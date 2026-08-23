'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '@/content/projects';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenProjectModal: () => void;
}

export default function CaseStudyModal({
  project,
  onClose,
  onOpenProjectModal,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-z-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
    >
      <div className="relative w-full max-w-xl sm:max-w-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-z-surface border border-z-border rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Visual Preview Header */}
        <div className="relative w-full h-24 sm:h-32 md:h-36 bg-z-deep overflow-hidden shrink-0">
          <Image
            src={project.visual}
            alt={project.name}
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-transparent to-black/60" />

          <button
            onClick={onClose}
            aria-label="Close case study modal"
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-z-black/80 border border-z-border text-z-muted hover:text-z-white transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="absolute bottom-2.5 left-4 right-4">
            <span className="font-mono text-[9px] sm:text-[10px] text-z-blue-400 font-semibold tracking-widest uppercase block mb-0.5">
              REAL CASE STUDY — {project.type}
            </span>
            <h2 id="case-study-modal-title" className="text-base sm:text-xl font-display font-semibold text-z-white">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Content Details in Progressive Hierarchy (Scrollable) */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Progressive 6-Stage Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded bg-z-surface-2/60 border border-z-border">
              <span className="font-mono text-[9px] text-z-amber font-semibold uppercase tracking-widest block mb-0.5">
                01 OPERATIONAL PROBLEM
              </span>
              <p className="text-[11px] text-z-text font-body leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-2.5 rounded bg-z-surface-2/60 border border-z-border">
              <span className="font-mono text-[9px] text-z-blue-400 font-semibold tracking-widest uppercase block mb-0.5">
                02 ARCHITECTED SYSTEM
              </span>
              <p className="text-[11px] text-z-text font-body leading-relaxed">
                {project.system}
              </p>
            </div>

            <div className="p-2.5 rounded bg-z-surface-2/60 border border-z-border">
              <span className="font-mono text-[9px] text-z-blue-300 font-semibold tracking-widest uppercase block mb-0.5">
                03 TECHNICAL ARCHITECTURE
              </span>
              <p className="text-[11px] text-z-text font-body leading-relaxed">
                {project.architecture}
              </p>
            </div>

            <div className="p-2.5 rounded bg-z-surface-2/60 border border-z-border">
              <span className="font-mono text-[9px] text-z-blue-300 font-semibold tracking-widest uppercase block mb-0.5">
                04 SOFTWARE ENGINEERING
              </span>
              <p className="text-[11px] text-z-text font-body leading-relaxed">
                {project.engineering}
              </p>
            </div>

            <div className="p-2.5 rounded bg-z-surface-2/60 border border-z-border">
              <span className="font-mono text-[9px] text-z-blue-300 font-semibold tracking-widest uppercase block mb-0.5">
                05 SYSTEM INTEGRATION
              </span>
              <p className="text-[11px] text-z-text font-body leading-relaxed">
                {project.integration}
              </p>
            </div>

            <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30">
              <span className="font-mono text-[9px] text-emerald-400 font-semibold tracking-widest uppercase block mb-0.5">
                06 VERIFIED OUTCOME
              </span>
              <p className="text-[11px] text-z-text font-body leading-relaxed font-medium">
                {project.outcome}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[9px] uppercase tracking-widest text-z-dim mb-1.5 font-semibold">
              CORE SYSTEM DELIVERABLES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1.5 text-[11px] text-z-text bg-z-surface-2 p-1.5 rounded border border-z-border"
                >
                  <CheckCircle2 className="w-3 h-3 text-z-blue-400 shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-mono text-[9px] uppercase tracking-widest text-z-dim mb-1.5 font-semibold">
              TECHNOLOGY STACK & INTEGRATIONS
            </h3>
            <div className="flex flex-wrap gap-1">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-z-surface-2 border border-z-border text-z-blue-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer (Pinned Bottom) */}
        <div className="p-3 sm:p-4 border-t border-z-border flex items-center justify-between gap-3 shrink-0 bg-z-surface">
          <button
            onClick={onClose}
            className="font-mono text-[11px] uppercase tracking-wider text-z-muted hover:text-z-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-z-blue-400 rounded px-1"
          >
            CLOSE
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenProjectModal();
            }}
            className="z-btn-primary text-xs py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
          >
            <span>ARCHITECT SIMILAR SYSTEM</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
