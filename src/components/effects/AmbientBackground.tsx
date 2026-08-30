'use client';

import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle Blue Depth Glow */}
      <div
        className="absolute -top-[10%] right-[5%] w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full blur-[140px] opacity-30"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 99, 255, 0.08) 0%, rgba(20, 99, 255, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* Subtle Mid Ambient Node */}
      <div
        className="absolute top-[45%] left-[5%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(20, 99, 255, 0.06) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
