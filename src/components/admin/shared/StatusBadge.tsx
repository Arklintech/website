'use client';

import React from 'react';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const STATUS_STYLES: Record<string, string> = {
  // Lead stages
  NEW: 'bg-[#EDF4FF] text-[#1463FF] border-[#1463FF]/25',
  CONTACTED: 'bg-amber-50 text-amber-700 border-amber-200',
  QUALIFIED: 'bg-sky-50 text-sky-700 border-sky-200',
  DISCOVERY: 'bg-violet-50 text-violet-700 border-violet-200',
  PROPOSAL: 'bg-orange-50 text-orange-700 border-orange-200',
  ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  WON: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  LOST: 'bg-rose-50 text-rose-600 border-rose-200',
  // Inquiry status
  IN_REVIEW: 'bg-amber-50 text-amber-700 border-amber-200',
  ENGAGED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  ARCHIVED: 'bg-[#F7F4EC] text-[#64748B] border-[#D8D4C9]',
  // Conversations
  OPEN: 'bg-[#EDF4FF] text-[#1463FF] border-[#1463FF]/25',
  WAITING_FOR_THEM: 'bg-amber-50 text-amber-700 border-amber-200',
  WAITING_FOR_US: 'bg-rose-50 text-rose-600 border-rose-200',
  SNOOZED: 'bg-[#F7F4EC] text-[#64748B] border-[#D8D4C9]',
  CLOSED: 'bg-[#F7F4EC] text-[#94A3B8] border-[#D8D4C9]',
  // Priority
  HIGH: 'bg-rose-50 text-rose-600 border-rose-200',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
  LOW: 'bg-[#F7F4EC] text-[#64748B] border-[#D8D4C9]',
  // Intent
  // HIGH already defined
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || 'bg-[#F7F4EC] text-[#64748B] border-[#D8D4C9]';
  const sizeClass = size === 'sm'
    ? 'text-[9px] px-2 py-0.5 font-mono font-bold'
    : 'text-[10px] px-2.5 py-1 font-mono font-bold';

  return (
    <span className={`inline-flex items-center border rounded-full uppercase tracking-wide ${style} ${sizeClass}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

interface IntentDotProps { intent: 'LOW' | 'MEDIUM' | 'HIGH' }
export function IntentDot({ intent }: IntentDotProps) {
  const colors = { LOW: 'bg-[#94A3B8]', MEDIUM: 'bg-amber-400', HIGH: 'bg-rose-500' };
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[9px] font-bold uppercase`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors[intent]} ${intent === 'HIGH' ? 'animate-pulse' : ''}`} />
      <span className={intent === 'HIGH' ? 'text-rose-600' : intent === 'MEDIUM' ? 'text-amber-600' : 'text-[#94A3B8]'}>{intent}</span>
    </span>
  );
}
