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
 * Arklintech Keystone Icon SVG Mark
 * Uses hardcoded width/height SVG attributes to strictly prevent viewport blowup
 */
export function KeystoneMark({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="270 20 430 365"
      width="28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 block max-w-[32px] max-h-[32px]`}
      style={{ width: '28px', height: '28px', maxWidth: '32px', maxHeight: '32px', display: 'block' }}
      role="img"
      aria-label="ARKLINTECH Keystone Icon"
    >
      <defs>
        <linearGradient id="keystoneBluePrimary" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1463FF" />
          <stop offset="100%" stopColor="#0050E6" />
        </linearGradient>
      </defs>

      <path
        fill="url(#keystoneBluePrimary)"
        d="
          M 402 27
          Q 394 27 388 37
          L 280 366
          L 440 366
          L 457 170
          L 411 133
          L 510 134
          L 510 294
          L 554 366
          L 682 366
          L 581 39
          Q 578 27 570 27
          Z
        "
      />
    </svg>
  );
}

/**
 * Exact Vector Chevron "A" Glyph for <span style={{ fontFamily: "'Syncopate', var(--font-syncopate), sans-serif", letterSpacing: '0.12em' }} className="font-extrabold uppercase">ARKLINTECH</span>
 */
export function ChevronA({ className = 'h-3 w-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 26"
      width="12"
      height="11"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 inline-block align-baseline max-w-[14px] max-h-[14px]`}
      style={{ width: '12px', height: '11px', maxWidth: '14px', maxHeight: '14px', display: 'inline-block' }}
      aria-hidden="true"
    >
      <path
        d="
          M 14, 0
          L 28, 26
          L 19.5, 26
          L 14, 14.8
          L 8.5, 26
          L 0, 26
          Z
        "
      />
    </svg>
  );
}

/**
 * Flanking Blue Tapered Wing / Accent Line SVG
 */
export function BlueTaperWing({ direction = 'left', className = 'h-[2px] w-5 sm:w-7' }: { direction?: 'left' | 'right'; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 6"
      width="24"
      height="2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 block max-w-[28px] max-h-[4px]`}
      style={{ width: '24px', height: '2px', maxWidth: '28px', maxHeight: '4px', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`taperGrad-${direction}`} x1={direction === 'left' ? '0%' : '100%'} y1="0%" x2={direction === 'left' ? '100%' : '0%'} y2="0%">
          <stop offset="0%" stopColor="#1463FF" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#1463FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2B75FF" stopOpacity="1" />
        </linearGradient>
      </defs>
      {direction === 'left' ? (
        <polygon points="0,3 100,0.5 100,5.5" fill={`url(#taperGrad-${direction})`} />
      ) : (
        <polygon points="0,0.5 100,3 0,5.5" fill={`url(#taperGrad-${direction})`} />
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
    sm: 'w-6 h-6 sm:w-7 sm:h-7',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
    xl: 'w-12 h-12 sm:w-14 sm:h-14',
  };

  const textSizes = {
    sm: {
      title: 'text-[11px] sm:text-xs tracking-[0.2em]',
      glyphA: 'h-[10px] w-[11px] sm:h-[11px] sm:w-[12px] mr-[0.2em]',
      sub: 'text-[6px] sm:text-[7px] tracking-[0.24em]',
      wing: 'h-[1.5px] w-3 sm:w-4',
      gap: 'gap-1',
    },
    md: {
      title: 'text-xs sm:text-sm md:text-[15px] tracking-[0.22em]',
      glyphA: 'h-[11px] w-[12px] sm:h-[13px] sm:w-[14px] md:h-[14px] md:w-[15px] mr-[0.22em]',
      sub: 'text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.26em]',
      wing: 'h-[1.8px] w-4 sm:w-6',
      gap: 'gap-1.5',
    },
    lg: {
      title: 'text-base sm:text-lg md:text-xl tracking-[0.24em]',
      glyphA: 'h-[15px] w-[16px] sm:h-[17px] sm:w-[18px] md:h-[19px] md:w-[20px] mr-[0.24em]',
      sub: 'text-[8.5px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.28em]',
      wing: 'h-[2px] w-6 sm:w-8',
      gap: 'gap-2',
    },
    xl: {
      title: 'text-xl sm:text-2xl md:text-3xl tracking-[0.26em]',
      glyphA: 'h-[19px] w-[21px] sm:h-[23px] sm:w-[25px] md:h-[28px] md:w-[30px] mr-[0.26em]',
      sub: 'text-[10px] sm:text-[11px] md:text-[12px] tracking-[0.3em]',
      wing: 'h-[2.5px] w-8 sm:w-12',
      gap: 'gap-2.5',
    },
  };

  const titleColor = textColor || 'text-[#111827]';

  const content = (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none select-none max-w-full overflow-hidden shrink-0 ${className}`}>
      {/* Keystone Symbol */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <KeystoneMark className={markSizes[size]} />
      </div>

      {/* Exact Typography Lockup: Deep Navy Typography for Light Interface */}
      {showText && variant === 'full' && (
        <div className="flex flex-col items-center justify-center text-center shrink-0">
          {/* Main Wordmark: I>RKLINTECH in Deep Navy */}
          <div
            className={`font-logo font-bold ${titleColor} uppercase group-hover:text-[#1463FF] transition-colors leading-none flex items-center justify-center text-center ${textSizes[size].title}`}
            style={{
              fontFamily: 'var(--font-syncopate), sans-serif',
              letterSpacing: '0.22em',
              paddingLeft: '0.22em',
            }}
          >
            <ChevronA className={textSizes[size].glyphA} />
            <span>RKLINTECH</span>
          </div>

          {/* Sub Descriptor: TECHNOLOGY SYSTEMS in Disciplined Navy-Gray */}
          <div className={`flex items-center justify-center ${textSizes[size].gap} mt-1 sm:mt-1.5 w-full`}>
            <BlueTaperWing direction="left" className={textSizes[size].wing} />
            <span
              className="font-body font-medium text-[#536070] uppercase leading-none whitespace-nowrap text-center text-[7px] sm:text-[8px] md:text-[9px]"
              style={{
                letterSpacing: '0.26em',
                paddingLeft: '0.26em',
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
