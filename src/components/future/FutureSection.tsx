'use client';

import React, { useState } from 'react';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import ProductConceptCard from './ProductConceptCard';
import { FUTURE_CARDS, FutureCard } from '@/content/future';
import { X, ArrowRight } from 'lucide-react';

interface FutureSectionProps {
  onOpenProjectModal: () => void;
}

export default function FutureSection({ onOpenProjectModal }: FutureSectionProps) {
  const [selectedCard, setSelectedCard] = useState<FutureCard | null>(null);

  return (
    <Section id="future" number="06">
      <PageContainer>
        <SectionHeader
          number="06"
          title="FUTURE / INNOVATION"
          subtitle="Building today for tomorrow. Autonomous intelligence and emerging technology horizons."
          actionText="EXPLORE INNOVATION →"
          onActionClick={() => setSelectedCard(FUTURE_CARDS[0])}
        />

        {/* 3-Column Future Innovation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FUTURE_CARDS.map((card) => (
            <ProductConceptCard
              key={card.id}
              card={card}
              onSelect={setSelectedCard}
            />
          ))}
        </div>
      </PageContainer>

      {/* Innovation Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-z-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto flex flex-col justify-between bg-z-surface border border-z-border rounded-lg p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-auto shadow-2xl">
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-z-surface-2 text-z-muted hover:text-z-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-z-blue-400 font-semibold tracking-widest uppercase">
                  HORIZON 2026 — {selectedCard.category}
                </span>
                <span className={`font-mono text-[9px] px-2 py-0.5 rounded border uppercase ${selectedCard.statusColor}`}>
                  {selectedCard.status}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-semibold text-z-white mt-1.5">
                {selectedCard.title}
              </h3>

              <p className="mt-4 text-sm text-z-text font-body leading-relaxed">
                {selectedCard.details}
              </p>

              <div className="mt-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-z-dim mb-2 font-semibold">
                  RESEARCH VECTORS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCard.vocabulary.map((vocab) => (
                    <span
                      key={vocab}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-z-surface-2 border border-z-border text-z-blue-300"
                    >
                      {vocab}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-z-border flex items-center justify-between shrink-0">
              <button
                onClick={() => setSelectedCard(null)}
                className="font-mono text-xs uppercase tracking-wider text-z-muted hover:text-z-white"
              >
                CLOSE
              </button>

              <button
                onClick={() => {
                  setSelectedCard(null);
                  onOpenProjectModal();
                }}
                className="z-btn-primary text-xs"
              >
                <span>PARTNER ON R&D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
