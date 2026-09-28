import React from 'react';
import { WORDMARK_FONT_METRICS, WORDMARK_GLYPHS } from './wordmark-glyphs';

/**
 * ARKLINTECH wordmark — the single vector implementation of the logotype.
 *
 * "RKLINTECH" is outlined Syncopate Bold (see scripts/generate-wordmark-glyphs.mjs)
 * and the leading A is the brand's custom chevron glyph. Everything is laid out in
 * font units, so the geometry is identical at every size and breakpoint.
 *
 * Sizing: the SVG is 1em tall and matches a `line-height: 1` text line, so it
 * scales with the surrounding font-size exactly as the old live text did.
 */

const { unitsPerEm: UPM, ascent, descent } = WORDMARK_FONT_METRICS;

// Baseline position inside a 1em line box (same half-leading as `leading-none` text).
const BASELINE_Y = (UPM - (ascent + descent)) / 2 + ascent;

// Approved chevron "A" — path unchanged from the original brand glyph (viewBox 0 0 135 110).
export const CHEVRON_A_PATH = 'M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z';
export const CHEVRON_A = { inkLeft: 5, inkRight: 130, inkBottom: 106 };
// Inline use pads both ends with the font's own side bearing so the wordmark spaces like a word.
export const SIDE_BEARING = 215;

// Chevron scale: its 135-unit box spans 0.8333em (10px at 12px), as in the approved header logo.
export const CHEVRON_SCALE = (UPM * (10 / 12)) / 135;

interface ArklintechWordmarkProps {
  /** Letter spacing between RKLINTECH glyphs, in em. */
  tracking?: number;
  /** Space between the chevron A's box and the R, in em. */
  gap?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Fill the container width instead of sizing from font-size (e.g. watermark). */
  fluid?: boolean;
  /** Flow inside running text, sitting on the surrounding text baseline. */
  inline?: boolean;
  /** Hide from assistive tech when the name is already announced nearby. */
  decorative?: boolean;
}

export default function ArklintechWordmark({
  tracking = 0.18,
  gap = 0.14,
  className = '',
  style,
  fluid = false,
  inline = false,
  decorative = false,
}: ArklintechWordmarkProps) {
  // Chevron sits with its ink left edge at x = 0 and its ink bottom on the baseline.
  const aOffsetX = -CHEVRON_A.inkLeft * CHEVRON_SCALE;
  const aOffsetY = -CHEVRON_A.inkBottom * CHEVRON_SCALE;

  let x = CHEVRON_A.inkRight * CHEVRON_SCALE + gap * UPM;
  const letters = WORDMARK_GLYPHS.map((glyph, i) => {
    const origin = x;
    x += glyph.advance + (i < WORDMARK_GLYPHS.length - 1 ? tracking * UPM : 0);
    return { ...glyph, origin };
  });
  const last = letters[letters.length - 1];
  const inkWidth = Math.ceil(last.origin + last.inkRight);
  const pad = inline ? SIDE_BEARING : 0;
  const width = inkWidth + pad * 2;

  const a11y = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': 'ARKLINTECH' };

  const sizing: React.CSSProperties = fluid
    ? { width: '100%', height: 'auto' }
    : { height: '1em', width: `${width / UPM}em` };
  // An inline-block SVG sits on its bottom edge; drop it by the descent so the glyph baseline meets the text baseline.
  const placement: React.CSSProperties = inline
    ? { display: 'inline-block', verticalAlign: `${-(UPM - BASELINE_Y) / UPM}em` }
    : {};

  return (
    <svg
      viewBox={`${-pad} ${-BASELINE_Y} ${width} ${UPM}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 overflow-visible ${inline ? '' : 'block'} ${className}`}
      style={{ ...sizing, ...placement, ...style }}
      focusable="false"
      {...a11y}
    >
      <path d={CHEVRON_A_PATH} transform={`translate(${aOffsetX} ${aOffsetY}) scale(${CHEVRON_SCALE})`} />
      {letters.map((glyph) => (
        <path key={glyph.char} d={glyph.d} transform={`translate(${glyph.origin} 0)`} />
      ))}
    </svg>
  );
}
