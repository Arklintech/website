'use client';

import React from 'react';

export function ChevronA({ className = 'h-[0.85em] w-[0.9em]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 135 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 inline-block align-baseline`}
      style={{ verticalAlign: '-0.06em' }}
      aria-hidden="true"
    >
      <path
        d="M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z"
        fill="currentColor"
      />
    </svg>
  );
}

interface ArklintechWordmarkProps {
  className?: string;
  glyphColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

export default function ArklintechWordmark({
  className = '',
  glyphColor = 'text-[#1463FF]',
  textColor = 'text-current',
  style,
}: ArklintechWordmarkProps) {
  return (
    <span
      className={`inline-flex items-center font-extrabold uppercase tracking-wider ${className}`}
      style={{
        fontFamily: "'Syncopate', var(--font-syncopate), sans-serif",
        letterSpacing: '0.14em',
        ...style,
      }}
    >
      <span className={`${glyphColor} mr-[0.06em]`}>
        <ChevronA />
      </span>
      <span className={textColor}>RKLINTECH</span>
    </span>
  );
}
