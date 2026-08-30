import fs from 'fs';

const dotsContent = fs.readFileSync('c:/Users/NEXAWAVE/Desktop/ZOQ/scripts/dots.txt', 'utf8');

const componentCode = `'use client';

import React from 'react';

export default function GlobalPresenceMap() {
  return (
    <div className="w-full space-y-2.5">
      <div className="font-mono text-xs font-bold text-z-white uppercase tracking-wider pb-1 border-b border-z-border/50">
        GLOBAL PRESENCE
      </div>

      {/* Ultra-High-Precision Dotted World Map (1,250+ Geographic Matrix Coordinates) */}
      <div className="relative w-full aspect-[2.1/1] overflow-hidden rounded-lg bg-z-surface-2/70 border border-z-border/60 p-2 flex items-center justify-center">
        <svg
          viewBox="0 0 480 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Technical Lat/Lon Reticle */}
          <line x1="0" y1="95" x2="480" y2="95" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.35" />
          <line x1="240" y1="0" x2="240" y2="190" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.35" />

          {/* Continental Raster Dots */}
          <g fill="#6B889B" opacity="0.8">
          ${dotsContent}
          </g>

          {/* =================================================================
              ACTIVE HUBS WITH RADAR PULSES & HIGH-CONTRAST ILLUMINATION
              ================================================================= */}
          
          {/* 1. UK (London) -> x: 239.9, y: 52.0 */}
          <g>
            <circle cx="239.9" cy="52.0" r="5.5" fill="#28B8F2" fillOpacity="0.3" className="animate-ping" />
            <circle cx="239.9" cy="52.0" r="2.8" fill="#159BD7" />
            <circle cx="239.9" cy="52.0" r="1.4" fill="#FFFFFF" />
          </g>

          {/* 2. UAE (Dubai) -> x: 310.7, y: 80.9 */}
          <g>
            <circle cx="310.7" cy="80.9" r="5.5" fill="#28B8F2" fillOpacity="0.3" className="animate-ping" />
            <circle cx="310.7" cy="80.9" r="2.8" fill="#159BD7" />
            <circle cx="310.7" cy="80.9" r="1.4" fill="#FFFFFF" />
          </g>

          {/* 3. INDIA (Subcontinent) -> x: 340.8, y: 86.2 */}
          <g>
            <circle cx="340.8" cy="86.2" r="6.5" fill="#159BD7" fillOpacity="0.4" className="animate-ping" />
            <circle cx="340.8" cy="86.2" r="3.2" fill="#28B8F2" />
            <circle cx="340.8" cy="86.2" r="1.6" fill="#FFFFFF" />
          </g>

          {/* 4. SINGAPORE -> x: 372.6, y: 107.3 */}
          <g>
            <circle cx="372.6" cy="107.3" r="5.5" fill="#28B8F2" fillOpacity="0.3" className="animate-ping" />
            <circle cx="372.6" cy="107.3" r="2.8" fill="#159BD7" />
            <circle cx="372.6" cy="107.3" r="1.4" fill="#FFFFFF" />
          </g>

          {/* Data Transmission Arc Interconnects */}
          <path
            d="M 239.9 52.0 Q 275.3 66.5 310.7 80.9"
            stroke="#28B8F2"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M 310.7 80.9 Q 325.8 83.5 340.8 86.2"
            stroke="#28B8F2"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M 340.8 86.2 Q 356.7 96.8 372.6 107.3"
            stroke="#28B8F2"
            strokeWidth="1"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Hub Location Labels - Exact Alignment Matching Reference Crop */}
      <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-z-muted pt-1 px-1">
        <span className="text-z-white hover:text-z-cyan-400 transition-colors font-semibold">India</span>
        <span className="text-z-white hover:text-z-cyan-400 transition-colors font-semibold">UAE</span>
        <span className="text-z-white hover:text-z-cyan-400 transition-colors font-semibold">UK</span>
        <span className="text-z-white hover:text-z-cyan-400 transition-colors font-semibold">Singapore</span>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('c:/Users/NEXAWAVE/Desktop/ZOQ/src/components/layout/GlobalPresenceMap.tsx', componentCode);
console.log('Successfully wrote GlobalPresenceMap.tsx with accurate world coordinates!');
