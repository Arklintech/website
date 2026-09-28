import React from 'react';
import ArklintechWordmark from './ArklintechWordmark';

/**
 * The ARKLINTECH name as it appears inside copy: the vector wordmark sized to the
 * surrounding text and seated on its baseline. The name stays in the DOM as real
 * text so screen readers, search engines, and copy/paste still get "ARKLINTECH".
 */
export default function BrandName({ className = '', fit = false }: { className?: string; fit?: boolean }) {
  return (
    <span className={`whitespace-nowrap ${className}`}>
      <span className="sr-only">ARKLINTECH</span>
      {/* fit: shrink proportionally in columns narrower than the wordmark instead of overflowing */}
      <ArklintechWordmark inline decorative style={fit ? { maxWidth: '100%', height: 'auto' } : undefined} />
    </span>
  );
}

const BRAND_PATTERN = /\bARKLINTECH\b/g;

/** Renders a copy string with every "ARKLINTECH" replaced by the inline wordmark. */
export function withBrandName(text: string): React.ReactNode {
  const parts = text.split(BRAND_PATTERN);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<BrandName key={i} />, part]));
}
