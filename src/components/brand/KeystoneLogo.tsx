'use client';

import React from 'react';
import Link from 'next/link';

interface KeystoneLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  href?: string;
  variant?: 'full' | 'mark-only';
  textColor?: string;
}

/**
 * ARKLINTECH Keystone Icon SVG Mark
 * High-precision vector matching the brand identity 1:1
 */
export function KeystoneMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 850"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 block`}
      style={{ display: 'block' }}
      role="img"
      aria-label="ARKLINTECH Keystone Logo"
    >
      <defs>
        <linearGradient id="keystoneGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1463FF" />
          <stop offset="100%" stopColor="#0052E0" />
        </linearGradient>
      </defs>

      <path
        fill="url(#keystoneGradient)"
        d="M 309 17 C 298 17 288 23 281 37 L 25 822 L 404 821 L 444 357 L 336 268 L 572 271 L 572 652 L 676 822 L 979 822 L 741 39 C 735 25 726 17 714 17 Z"
      />
    </svg>
  );
}

/**
 * Exact Vector Chevron "Λ" Glyph for ARKLINTECH Wordmark
 */
export function ChevronA({ className = 'h-[0.85em] w-[0.9em]' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 135 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 inline-block align-baseline`}
      style={{ verticalAlign: '-0.04em' }}
      aria-hidden="true"
    >
      <path
        d="M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Flanking Blue Tapered Wing / Accent Line SVG
 */
export function BlueTaperWing({ direction = 'left', className = 'h-[2px] w-6' }: { direction?: 'left' | 'right'; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 block`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`taperWingGrad-${direction}`} x1={direction === 'left' ? '0%' : '100%'} y1="0%" x2={direction === 'left' ? '100%' : '0%'} y2="0%">
          <stop offset="0%" stopColor="#1463FF" stopOpacity="0.05" />
          <stop offset="60%" stopColor="#1463FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2B75FF" stopOpacity="1" />
        </linearGradient>
      </defs>
      {direction === 'left' ? (
        <polygon points="0,3 100,0.5 100,5.5" fill={`url(#taperWingGrad-${direction})`} />
      ) : (
        <polygon points="0,0.5 100,3 0,5.5" fill={`url(#taperWingGrad-${direction})`} />
      )}
    </svg>
  );
}

export default function KeystoneLogo({
  className = '',
  size = 'md',
  showText = true,
  href,
  variant = 'full',
  textColor,
}: KeystoneLogoProps) {
  const markSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-10 h-10 sm:w-11 sm:h-11',
    xl: 'w-12 h-12 sm:w-14 sm:h-14',
  };

  const textSizes = {
    sm: {
      title: 'text-xs sm:text-[13px] tracking-[0.24em]',
      glyphA: 'h-[10px] w-[11px] mr-[0.16em]',
      sub: 'text-[7px] sm:text-[7.5px] tracking-[0.28em]',
      wing: 'h-[1.5px] w-4 sm:w-6',
      gap: 'gap-1.5',
    },
    md: {
      title: 'text-sm sm:text-[15px] tracking-[0.26em]',
      glyphA: 'h-[12px] w-[13px] mr-[0.18em]',
      sub: 'text-[8px] sm:text-[8.5px] tracking-[0.3em]',
      wing: 'h-[1.8px] w-5 sm:w-8',
      gap: 'gap-2',
    },
    lg: {
      title: 'text-lg sm:text-xl tracking-[0.28em]',
      glyphA: 'h-[15px] w-[16px] mr-[0.2em]',
      sub: 'text-[9.5px] sm:text-[10px] tracking-[0.32em]',
      wing: 'h-[2px] w-7 sm:w-10',
      gap: 'gap-2.5',
    },
    xl: {
      title: 'text-2xl sm:text-3xl tracking-[0.3em]',
      glyphA: 'h-[20px] w-[22px] mr-[0.22em]',
      sub: 'text-xs sm:text-sm tracking-[0.34em]',
      wing: 'h-[2.5px] w-10 sm:w-14',
      gap: 'gap-3',
    },
  };

  const titleColor = textColor || 'text-[#0B132B]';

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none select-none shrink-0 ${className}`}>
      {/* 1. Keystone Icon Mark */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105 -mt-1 sm:-mt-1.5">
        <KeystoneMark className={markSizes[size]} />
      </div>

      {/* 2. Full Typography Lockup (Matching Reference Image 1:1) */}
      {showText && variant === 'full' && (
        <div className="flex flex-col items-start justify-center text-left shrink-0">
          
          {/* Row 1: ΛRKLINTECH in Deep Navy */}
          <div
            className={`font-black uppercase group-hover:text-[#1463FF] transition-colors leading-none flex items-center justify-center text-center ${titleColor} ${textSizes[size].title}`}
            style={{
              fontFamily: "'Syncopate', sans-serif",
              letterSpacing: '0.24em',
              paddingLeft: '0.24em',
            }}
          >
            <ChevronA className={textSizes[size].glyphA} />
            <span>RKLINTECH</span>
          </div>

          {/* Row 2: Flanking Blue Wings + TECHNOLOGY SYSTEMS */}
          <div className={`flex items-center justify-center ${textSizes[size].gap} mt-1 sm:mt-1.5 w-full`}>
            <BlueTaperWing direction="left" className={textSizes[size].wing} />
            <span
              className="font-mono font-bold text-[#536070] uppercase leading-none whitespace-nowrap text-center"
              style={{
                fontSize: textSizes[size].sub.split(' ')[0].replace('text-[', '').replace(']', ''),
                letterSpacing: '0.28em',
                paddingLeft: '0.28em',
              }}
            >
              TECHNOLOGY SYSTEMS
            </span>
            <BlueTaperWing direction="right" className={textSizes[size].wing} />
          </div>

        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none shrink-0" aria-label="ARKLINTECH Technology Systems Homepage">
        {content}
      </Link>
    );
  }

  return content;
}
