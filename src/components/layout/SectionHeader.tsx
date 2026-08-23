import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  number?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  actionText,
  actionHref,
  onActionClick,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 pb-4 border-b border-z-border/50 gap-4', className)}>
      <div className="flex items-start gap-4">
        {number && (
          <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-z-blue-400 border border-z-border px-2 py-0.5 rounded bg-z-surface-2/60">
            {number}
          </span>
        )}
        <div>
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-z-white font-semibold flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-z-muted max-w-xl font-body">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {(actionText || actionHref) && (
        <div className="self-start md:self-auto">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-z-blue-400 hover:text-z-blue-300 transition-colors group"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              onClick={onActionClick}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-z-blue-400 hover:text-z-blue-300 transition-colors group"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
