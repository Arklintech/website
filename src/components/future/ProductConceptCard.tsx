'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { FutureCard } from '@/content/future';
import { cn } from '@/lib/utils';

interface ProductConceptCardProps {
  card: FutureCard;
  onSelect: (card: FutureCard) => void;
}

export default function ProductConceptCard({ card, onSelect }: ProductConceptCardProps) {
  return (
    <div
      onClick={() => onSelect(card)}
      className="z-card light-sweep-container flex flex-col h-full cursor-pointer group bg-z-surface border-z-border hover:border-z-blue-500/70 overflow-hidden transition-all duration-200"
    >
      {/* Visual Asset Container */}
      <div className="relative w-full aspect-[16/8.5] bg-z-deep overflow-hidden border-b border-z-border/60 shrink-0">
        <Image
          src={card.visual}
          alt={card.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            'object-cover group-hover:scale-105 transition-transform duration-300',
            card.focalPoint || 'object-center'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Honest Maturity Status Badge */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded border font-mono text-[9px] font-semibold tracking-wider uppercase backdrop-blur-md">
          <span className={card.statusColor}>{card.status}</span>
        </div>

        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-z-black/80 border border-z-border/80 font-mono text-[9px] text-z-dim backdrop-blur-md">
          {card.number}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-z-dim block mb-1">
            {card.category}
          </span>

          <h4 className="font-display text-base font-semibold text-z-white group-hover:text-z-blue-300 transition-colors">
            {card.title}
          </h4>

          <p className="mt-1.5 text-xs text-z-muted font-body leading-relaxed line-clamp-2">
            {card.description}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-z-border/40 flex items-center justify-between">
          <div className="flex gap-1">
            {card.vocabulary.slice(0, 2).map((term) => (
              <span
                key={term}
                className="font-mono text-[9px] text-z-dim uppercase"
              >
                #{term}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-z-blue-400 group-hover:text-z-blue-300 font-medium">
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
