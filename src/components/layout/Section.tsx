import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  number?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  borderTop?: boolean;
  borderBottom?: boolean;
}

export default function Section({
  id,
  number,
  className,
  children,
  borderTop = true,
  borderBottom = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-section-number={number}
      className={cn(
        'relative w-full py-16 md:py-24 lg:py-28 transition-colors',
        borderTop && 'border-t border-z-border',
        borderBottom && 'border-b border-z-border',
        className
      )}
    >
      {children}
    </section>
  );
}
