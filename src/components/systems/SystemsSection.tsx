'use client';

import React, { useState } from 'react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import ConnectedNetworkVisual from './ConnectedNetworkVisual';
import SystemLayerCard from './SystemLayerCard';
import { SYSTEM_LAYERS, SystemLayer } from '@/content/systems';
import { X, ArrowRight } from 'lucide-react';

interface SystemsSectionProps {
  onOpenProjectModal: () => void;
}

export default function SystemsSection({ onOpenProjectModal }: SystemsSectionProps) {
  const [activeLayer, setActiveLayer] = useState<SystemLayer | null>(null);

  return (
    <Section id="systems" number="04">
      <PageContainer>
        <SectionHeader
          number="04"
          title="SYSTEMS"
          subtitle="One connected intelligence layer that unifies data, infrastructure, and enterprise workflows."
          actionText="CONNECT YOUR SYSTEM →"
          onActionClick={onOpenProjectModal}
        />

        {/* Primary Connected Network Centerpiece */}
        <div className="mb-8">
          <ConnectedNetworkVisual />
        </div>

        {/* 3 Supporting Architectural Layers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEM_LAYERS.map((layer) => (
            <SystemLayerCard
              key={layer.id}
              layer={layer}
              onOpenDetails={setActiveLayer}
            />
          ))}
        </div>
      </PageContainer>

      {/* Layer Detail Modal */}
      {activeLayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-z-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-z-surface border border-z-border rounded-lg overflow-hidden p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveLayer(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-z-surface-2 text-z-muted hover:text-z-white"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="font-mono text-xs text-z-blue-400 font-semibold tracking-widest uppercase">
              SYSTEM ARCHITECTURE — {activeLayer.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-semibold text-z-white mt-1">
              {activeLayer.title}
            </h3>

            <p className="mt-3 text-sm text-z-text font-body leading-relaxed">
              {activeLayer.description}
            </p>

            <div className="mt-4 p-3.5 rounded bg-z-surface-2/60 border border-z-border/80">
              <span className="font-mono text-[10px] uppercase tracking-wider text-z-blue-400 font-semibold block mb-1">
                SYSTEMIC LAYER ROLE:
              </span>
              <p className="text-xs text-z-muted font-body leading-relaxed">
                {activeLayer.systemRole}
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <h4 className="font-mono text-xs uppercase tracking-widest text-z-dim font-semibold">
                SYSTEM SPECIFICATIONS & BENCHMARKS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeLayer.specs.map((spec) => (
                  <div key={spec.label} className="p-3 rounded bg-z-surface-2 border border-z-border">
                    <div className="font-mono text-[10px] text-z-dim uppercase">{spec.label}</div>
                    <div className="font-mono text-xs font-semibold text-z-white mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-z-border flex items-center justify-between">
              <button
                onClick={() => setActiveLayer(null)}
                className="font-mono text-xs uppercase tracking-wider text-z-muted hover:text-z-white"
              >
                CLOSE
              </button>

              <button
                onClick={() => {
                  setActiveLayer(null);
                  onOpenProjectModal();
                }}
                className="z-btn-primary text-xs"
              >
                <span>ARCHITECT THIS LAYER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
