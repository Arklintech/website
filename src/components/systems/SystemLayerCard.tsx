'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, BarChart3, Server, ShieldCheck } from 'lucide-react';
import { SystemLayer } from '@/content/systems';
import { cn } from '@/lib/utils';

interface SystemLayerCardProps {
  layer: SystemLayer;
  onOpenDetails: (layer: SystemLayer) => void;
}

const icons: Record<string, React.ReactNode> = {
  'data-analytics': <BarChart3 className="w-3.5 h-3.5 text-z-blue-400" />,
  'infrastructure': <Server className="w-3.5 h-3.5 text-z-blue-400" />,
  'security': <ShieldCheck className="w-3.5 h-3.5 text-z-blue-400" />,
};

export default function SystemLayerCard({ layer, onOpenDetails }: SystemLayerCardProps) {
  return (
    <div
      onClick={() => onOpenDetails(layer)}
      className="z-card light-sweep-container flex flex-col h-full cursor-pointer group bg-z-surface border-z-border hover:border-z-blue-500/70 overflow-hidden transition-all duration-200"
    >
      {/* Visual Asset Container */}
      <div className="relative w-full aspect-[16/8.5] bg-z-deep overflow-hidden border-b border-z-border/60 shrink-0">
        <Image
          src={layer.visual}
          alt={layer.title}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            'object-cover group-hover:scale-105 transition-transform duration-300',
            layer.focalPoint || 'object-center'
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-z-surface via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-z-black/80 border border-z-border/80 font-mono text-[9px] text-z-blue-300 backdrop-blur-md">
          {icons[layer.id]}
          <span className="uppercase">{layer.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          <h4 className="font-display text-base font-semibold text-z-white group-hover:text-z-blue-300 transition-colors">
            {layer.title}
          </h4>
          <p className="mt-1.5 text-xs text-z-muted font-body leading-relaxed line-clamp-2">
            {layer.description}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-z-border/40 flex items-center justify-between">
          <span className="font-mono text-[9px] text-z-dim uppercase">
            {layer.specs[0]?.label}: {layer.specs[0]?.value}
          </span>

          <div className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-z-blue-400 group-hover:text-z-blue-300 font-medium">
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
