'use client';

import React from 'react';

export default function GlobalPresenceMap() {
  return (
    <div className="w-full space-y-3">
      {/* Title */}
      <div className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider pb-1 border-b border-[#D8D4C9] flex items-center justify-center text-center">
        <span>GLOBAL PRESENCE</span>
      </div>

      {/* Real GeoJSON Dotted World Map Graphic */}
      <div className="relative w-full aspect-[2.35/1] overflow-hidden rounded-lg bg-[#070D1D]/90 border border-[#D8D4C9] p-2.5 flex items-center justify-center shadow-inner">
        <svg
          viewBox="0 0 520 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Technical Coordinates Grid */}
          <line x1="0" y1="110" x2="520" y2="110" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.4" />
          <line x1="260" y1="0" x2="260" y2="220" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.4" />
          <line x1="130" y1="0" x2="130" y2="220" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.2" />
          <line x1="390" y1="0" x2="390" y2="220" stroke="#1B3442" strokeDasharray="2 3" strokeWidth="0.5" opacity="0.2" />

          {/* Landmass dot grid — static asset (one cached request instead of ~2,300 hydrated nodes) */}
          <image href="/brand/world-dots.svg" x="0" y="0" width="520" height="220" />

          {/* =================================================================
              ACTIVE HUBS WITH AUTHENTIC GEO POSITIONS & ILLUMINATED PULSES
              ================================================================= */}
          
          {/* UK Hub */}
          <g>
            <circle cx="259.8" cy="56.2" r="6" fill="#1463FF" fillOpacity="0.3" className="animate-ping" />
            <circle cx="259.8" cy="56.2" r="3" fill="#0B2E73" />
            <circle cx="259.8" cy="56.2" r="1.5" fill="#FFFFFF" />
          </g>

          {/* UAE Hub */}
          <g>
            <circle cx="336.8" cy="92.5" r="6" fill="#1463FF" fillOpacity="0.3" className="animate-ping" />
            <circle cx="336.8" cy="92.5" r="3" fill="#0B2E73" />
            <circle cx="336.8" cy="92.5" r="1.5" fill="#FFFFFF" />
          </g>

          {/* India Subcontinent Hub */}
          <g>
            <circle cx="369.7" cy="98.8" r="7" fill="#0B2E73" fillOpacity="0.4" className="animate-ping" />
            <circle cx="369.7" cy="98.8" r="3.5" fill="#1463FF" />
            <circle cx="369.7" cy="98.8" r="1.8" fill="#FFFFFF" />
          </g>

          {/* Singapore Hub */}
          <g>
            <circle cx="404.2" cy="125.4" r="6" fill="#1463FF" fillOpacity="0.3" className="animate-ping" />
            <circle cx="404.2" cy="125.4" r="3" fill="#0B2E73" />
            <circle cx="404.2" cy="125.4" r="1.5" fill="#FFFFFF" />
          </g>

          {/* Connecting Active Network Arcs */}
          <path
            d="M 259.8 56.2 Q 290 65 336.8 92.5"
            stroke="#1463FF"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M 336.8 92.5 Q 345 90 369.7 98.8"
            stroke="#1463FF"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M 369.7 98.8 Q 380 110 404.2 125.4"
            stroke="#1463FF"
            strokeWidth="1.2"
            strokeDasharray="2 3"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </div>

    </div>
  );
}
