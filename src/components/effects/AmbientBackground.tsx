'use client';

import React from 'react';

export default function AmbientBackground() {
  return (
    // The gradients already fade to transparent, so no blur filter is needed: large blurred
    // fixed layers are expensive to composite while scrolling (and can blank out tiles on iOS).
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Blue Depth Glow */}
      <div
        className="absolute -top-[10%] right-[5%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 99, 255, 0.08) 0%, rgba(20, 99, 255, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* Subtle Mid Ambient Node */}
      <div
        className="absolute top-[45%] left-[5%] w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 99, 255, 0.06) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
