'use client';

import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Primary Hero Ambient Radial Glow (Electric Blue Depth) */}
      <div
        className="absolute -top-[10%] right-[5%] w-[700px] sm:w-[900px] lg:w-[1100px] h-[700px] sm:h-[900px] lg:h-[1100px] rounded-full blur-[140px] opacity-40 will-change-transform"
        style={{
          background: 'radial-gradient(circle at center, rgba(8, 120, 201, 0.28) 0%, rgba(6, 43, 74, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* Cool Cyan Operation Node Glow (Locked Blue/Cyan Theme) */}
      <div
        className="absolute top-[15%] right-[20%] w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] rounded-full blur-[120px] opacity-25 will-change-transform"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, rgba(8, 120, 201, 0.08) 50%, transparent 75%)',
        }}
      />

      {/* Systems Section Ambient Node (Mid-Page Depth) */}
      <div
        className="absolute top-[42%] left-[10%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full blur-[160px] opacity-30 will-change-transform"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 155, 255, 0.2) 0%, rgba(3, 17, 31, 0.15) 50%, transparent 75%)',
        }}
      />

      {/* Bottom Ambient Node (Resolution) */}
      <div
        className="absolute bottom-[5%] right-[15%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-[150px] opacity-35 will-change-transform"
        style={{
          background: 'radial-gradient(circle at center, rgba(8, 120, 201, 0.25) 0%, rgba(6, 43, 74, 0.12) 50%, transparent 70%)',
        }}
      />

      {/* Subtle Environmental Grid Texture */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(27, 42, 56, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(27, 42, 56, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric Soft Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(2, 4, 7, 0.75) 100%)',
        }}
      />
    </div>
  );
}
