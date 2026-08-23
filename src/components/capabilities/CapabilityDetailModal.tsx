'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Capability } from '@/content/capabilities';

interface CapabilityDetailModalProps {
  capability: Capability | null;
  onClose: () => void;
  onOpenProjectModal: () => void;
}

export default function CapabilityDetailModal({
  capability,
  onClose,
  onOpenProjectModal,
}: CapabilityDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && capability) {
        onClose();
      }
    };
    if (capability) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [capability, onClose]);

  if (!capability) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-z-black/90 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="capability-modal-title"
    >
      <div className="relative w-full max-w-xl sm:max-w-2xl max-h-[85vh] sm:max-h-[88vh] flex flex-col bg-z-surface border border-z-border rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto">
        {/* Compact Header Visual Banner */}
        <div className="relative w-full h-24 sm:h-32 md:h-36 bg-z-deep overflow-hidden shrink-0">
          <Image
            src={capability.visual}
            alt={capability.title}
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-transparent to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close capability details modal"
            className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-z-black/80 border border-z-border text-z-muted hover:text-z-white transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-z-blue-400"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="absolute bottom-2.5 left-4 right-4">
            <span className="font-mono text-[9px] sm:text-[10px] text-z-blue-400 font-semibold tracking-widest uppercase block mb-0.5">
              CAPABILITY 0{capability.number} — {capability.category}
            </span>
            <h2 id="capability-modal-title" className="text-base sm:text-xl font-display font-semibold text-z-white">
              {capability.title}
            </h2>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Positioning & Description */}
          <div>
            <h3 className="font-display text-sm sm:text-base text-z-white font-medium mb-1">
              {capability.positioning}
            </h3>
            <p className="text-xs text-z-muted font-body leading-relaxed">
              {capability.description}
            </p>
          </div>

          {/* System Flow Pipeline */}
          {capability.systemFlow && capability.systemFlow.length > 0 && (
            <div className="p-3 rounded border border-z-border/80 bg-z-surface-2/70">
              <span className="font-mono text-[9px] uppercase tracking-widest text-z-blue-400 font-semibold block mb-1.5">
                SYSTEM EXECUTION FLOW
              </span>
              <div className="flex flex-wrap items-center gap-1">
                {capability.systemFlow.map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-z-surface border border-z-blue-500/30 text-z-white font-mono text-[10px] font-medium shadow-sm">
                      <span className="text-[9px] text-z-blue-400 font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                    {idx < capability.systemFlow.length - 1 && (
                      <span className="text-z-blue-400 font-mono font-bold text-[10px]" aria-hidden="true">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* What We Build List */}
          {capability.whatWeBuild && capability.whatWeBuild.length > 0 && (
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-widest text-z-dim mb-1.5 font-semibold">
                WHAT WE ENGINEER & BUILD
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {capability.whatWeBuild.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-1.5 p-2 rounded bg-z-surface-2/40 border border-z-border/60"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-z-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-[11px] text-z-text font-body leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem Solved & System Role Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
            <div className="p-3 rounded border border-z-border/60 bg-z-surface-2/30">
              <h5 className="font-mono text-[9px] uppercase tracking-wider text-z-amber font-semibold mb-1">
                OPERATIONAL PROBLEM SOLVED
              </h5>
              <p className="text-[11px] text-z-muted font-body leading-relaxed">
                {capability.problemSolved}
              </p>
            </div>

            <div className="p-3 rounded border border-z-border/60 bg-z-surface-2/30">
              <h5 className="font-mono text-[9px] uppercase tracking-wider text-z-blue-400 font-semibold mb-1">
                SYSTEM ARCHITECTURE ROLE
              </h5>
              <p className="text-[11px] text-z-muted font-body leading-relaxed">
                {capability.systemRole}
              </p>
            </div>
          </div>

          {/* Concrete Outcome */}
          <div className="p-3 rounded border border-emerald-500/30 bg-emerald-950/20">
            <h5 className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              SYSTEM OUTCOME PRODUCED
            </h5>
            <p className="text-[11px] text-z-text font-body leading-relaxed">
              {capability.outcomeProduced}
            </p>
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
            <span>DISCUSS THIS SYSTEM</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
