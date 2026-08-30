'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Capability } from '@/content/capabilities';

interface CapabilityCardProps {
  capability: Capability;
}

export default function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden group bg-white border border-[#D8D4C9] hover:border-[#1463FF] shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
      {/* Visual Container */}
      <div className="relative w-full aspect-[4/3] bg-[#F5F1E8] overflow-hidden border-b border-[#D8D4C9]">
        <Image
          src={capability.visual}
          alt={capability.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* Card Content & Action */}
      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
        <div>
          <h3 className="font-display font-bold text-base text-[#111827] tracking-tight group-hover:text-[#1463FF] transition-colors">
            {capability.title}
          </h3>
          <p className="mt-2 text-xs text-[#536070] font-body leading-relaxed">
            {capability.description}
          </p>
        </div>

        <div className="pt-2 border-t border-[#D8D4C9]/60">
          <Link
            href={capability.href}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#1463FF] hover:text-[#0050E6] font-bold transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1463FF] rounded px-1 -mx-1"
          >
            <span>Learn more</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
