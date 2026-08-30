import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  number?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function SectionHeader({
  number,
  tag,
  title,
  subtitle,
  description,
  actionText,
  actionHref,
  onActionClick,
  className,
}: SectionHeaderProps) {
  const sub = subtitle || description;
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 pb-4 border-b border-[#D8D4C9] gap-4', className)}>
      <div className="flex items-start gap-4">
        {number && (
          <span className="font-mono text-xs font-semibold tracking-wider text-[#1463FF] border border-[#D8D4C9] px-2 py-0.5 rounded bg-[#EDF4FF]">
            {number}
          </span>
        )}
        <div>
          {tag && (
            <div className="font-mono text-xs uppercase tracking-wider text-[#1463FF] font-semibold mb-1">
              {tag}
            </div>
          )}
          <h2 className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[#111827] font-semibold flex items-center gap-2">
            {title}
          </h2>
          {sub && (
            <p className="mt-1 text-sm text-[#536070] max-w-xl font-body">
              {sub}
            </p>
          )}
        </div>
      </div>

      {(actionText || actionHref) && (
        <div className="self-start md:self-auto">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#1463FF] hover:text-[#1463FF] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded px-1 -mx-1"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#1463FF] hover:text-[#1463FF] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] rounded px-1 -mx-1"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
