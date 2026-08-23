'use client';

import React from 'react';
import { SYSTEM_STATUS } from '@/content/navigation';

export default function TelemetryTicker() {
  return (
    <div className="w-full pt-8 md:pt-12 mt-8 md:mt-12 border-t border-z-border/40 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 font-mono text-[10px] sm:text-[11px] tracking-wider text-z-muted">
      <div className="flex items-center gap-2">
        <span className="text-z-dim">SYSTEM STATUS</span>
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {SYSTEM_STATUS.status}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-z-dim">ENVIRONMENT</span>
        <span className="text-z-white font-medium">{SYSTEM_STATUS.environment}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-z-dim">CORE TEMP</span>
        <span className="text-z-amber font-medium">{SYSTEM_STATUS.coreTemp}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-z-dim">UPTIME</span>
        <span className="text-z-blue-300 font-medium">{SYSTEM_STATUS.uptime}</span>
      </div>
    </div>
  );
}
