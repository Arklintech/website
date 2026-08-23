'use client';

import React from 'react';
import Image from 'next/image';

interface ProcessDiagramProps {
  activeStep: number;
  onStepSelect: (stepIndex: number) => void;
}

export default function ProcessDiagram({ activeStep, onStepSelect }: ProcessDiagramProps) {
  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] bg-z-surface border border-z-border rounded-lg overflow-hidden flex flex-col justify-between p-6 group">
      {/* Background Orchestration Asset */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity">
        <Image
          src="/visuals/zaqvoro/workflow-process.webp"
          alt="ZAQVORO Workflow Orchestration Engine"
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-z-surface/70 to-z-surface/30" />
      </div>

      {/* Top Diagram Metadata Header */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-wider text-z-muted border-b border-z-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-z-blue-400 animate-ping" />
          <span className="text-z-white uppercase font-medium">WORKFLOW ORCHESTRATOR</span>
        </div>
        <span className="text-z-dim">STATE: STEP_0{activeStep + 1}_ACTIVE</span>
      </div>

      {/* Interactive Workflow Node Network */}
      <div className="relative z-10 my-auto py-6 grid grid-cols-5 gap-2 sm:gap-3 text-center">
        {[
          { label: 'TRIGGER', sub: 'Input Event' },
          { label: 'DATA', sub: 'Ingest & Filter' },
          { label: 'PROCESS', sub: 'Neural Logic' },
          { label: 'AUTOMATE', sub: 'Orchestration' },
          { label: 'OUTPUT', sub: 'Verified Yield' },
        ].map((node, idx) => {
          const isCurrent = idx === Math.min(activeStep, 4);
          const isDone = idx < activeStep;

          return (
            <div key={node.label} className="flex flex-col items-center">
              <div
                className={`w-full py-3 px-1.5 sm:px-2 rounded border transition-all duration-200 ${
                  isCurrent
                    ? 'bg-z-blue-900/90 border-z-blue-400 text-z-white shadow-[0_0_15px_rgba(20,155,255,0.35)] scale-105'
                    : isDone
                    ? 'bg-z-surface-2/80 border-z-blue-500/50 text-z-blue-300'
                    : 'bg-z-black/70 border-z-border text-z-dim'
                }`}
              >
                <div className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider">
                  {node.label}
                </div>
                <div className="text-[8px] font-mono text-z-dim mt-0.5 hidden sm:block">
                  {node.sub}
                </div>
              </div>

              {idx < 4 && (
                <div className="mt-2 text-z-dim text-[10px] font-mono">→</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Status Ticker */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[10px] tracking-wider pt-3 border-t border-z-border/60 text-z-dim">
        <span>PIPELINE INTEGRITY: 100%</span>
        <span className="text-z-blue-400 font-medium">REAL-TIME EXECUTION</span>
      </div>
    </div>
  );
}
