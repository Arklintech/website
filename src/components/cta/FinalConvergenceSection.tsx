'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';

interface FinalConvergenceProps {
  onOpenProjectModal: () => void;
}

export default function FinalConvergenceSection({ onOpenProjectModal }: FinalConvergenceProps) {
  return (
    <Section id="convergence" number="08" borderBottom={true} className="pb-20 sm:pb-24">
      <PageContainer>
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-xs font-semibold tracking-wider text-z-blue-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2/80">
            08
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-z-white font-semibold">
            FINAL CONVERGENCE
          </span>
        </div>

        {/* Cinematic Convergence Card */}
        <div className="relative w-full min-h-[320px] sm:min-h-[380px] md:min-h-[440px] rounded-lg overflow-hidden border border-z-border bg-z-surface group shadow-[0_0_80px_rgba(8,120,201,0.25)] p-6 sm:p-10 md:p-14 flex flex-col justify-center">
          {/* Visual Asset 15: Final Convergence */}
          <Image
            src="/visuals/zaqvoro/final-convergence.webp"
            alt="ZAQVORO Final Convergence - System Core Resolution"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-500 ease-out z-0"
          />

          {/* Dark Atmospheric Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-z-black/95 via-z-black/65 to-transparent z-0 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-z-black/85 via-transparent to-transparent z-0 pointer-events-none" />

          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center max-w-xl">
            <span className="font-mono text-[10px] sm:text-xs text-z-blue-400 font-semibold tracking-widest uppercase mb-2 block">
              ONE MACHINE. ONE JOURNEY. ONE PURPOSE.
            </span>

            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-medium text-z-white uppercase tracking-tight leading-tight">
              HAVE A SYSTEM <br />
              IN MIND? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-z-white to-z-blue-300">
                LET&apos;S BUILD IT.
              </span>
            </h2>

            <div className="mt-5 sm:mt-8">
              <button
                onClick={onOpenProjectModal}
                className="z-btn-primary group text-xs sm:text-sm py-3 px-6"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
