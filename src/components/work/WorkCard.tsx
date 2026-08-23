'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/content/projects';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function WorkCard({ project, onSelect }: WorkCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      aria-label={`View case study: ${project.name} (${project.type})`}
      className="z-card light-sweep-container flex flex-col h-full cursor-pointer group overflow-hidden bg-z-surface border-z-border hover:border-z-blue-500/70 transition-all duration-200 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
    >
      {/* Real Project Visual Preview Container */}
      <div className="relative w-full aspect-[16/8.5] bg-z-deep overflow-hidden border-b border-z-border/60 shrink-0">
        <Image
          src={project.visual}
          alt={`${project.name} - ${project.type}`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            'object-cover group-hover:scale-105 transition-transform duration-300',
            project.focalPoint || 'object-top'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity" />

        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-z-black/80 border border-z-border/80 font-mono text-[9px] sm:text-[10px] text-z-blue-300 backdrop-blur-md">
          {project.type}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-z-dim block mb-1">
            {project.category}
          </span>

          <h3 className="font-display text-base font-semibold text-z-white group-hover:text-z-blue-300 transition-colors">
            {project.name}
          </h3>

          <p className="mt-1.5 text-xs text-z-muted font-body leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-z-border/40 flex items-center justify-between">
          <div className="flex gap-1">
            {project.stack.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-z-surface-2 text-z-dim"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-z-blue-400 group-hover:text-z-blue-300 font-medium">
            <span>VIEW CASE STUDY</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    </button>
  );
}
