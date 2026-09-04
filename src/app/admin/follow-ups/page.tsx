'use client';
import React, { useState, useEffect } from 'react';
import { CalendarCheck, Plus, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import { getStoredAdminKey } from '@/lib/admin-auth';

function formatDate(d: string) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(d: string) { if (!d) return false; return new Date(d) < new Date(); }

const PRIORITY_COLORS: Record<string, string> = { HIGH: 'text-rose-600 bg-rose-50 border-rose-200', MEDIUM: 'text-amber-600 bg-amber-50 border-amber-200', LOW: 'text-[#64748B] bg-[#F7F4EC] border-[#D8D4C9]' };

export default function FollowUpsPage() {
  const [followups, setFollowups] = useState<any[]>([]);
  const [counts, setCounts] = useState({ overdue: 0, dueToday: 0, dueThisWeek: 0, upcoming: 0 });
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'COMPLETED'>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getStoredAdminKey();
    fetch(`/api/admin/followups?key=${encodeURIComponent(key)}`)
      .then(r => r.json())
      .then(d => {
        setFollowups(Array.isArray(d?.data) ? d.data : []);
        if (d?.counts) setCounts(d.counts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const mark = async (id: string, status: string) => {
    const key = getStoredAdminKey();
    // Optimistic update
    setFollowups(prev => prev.map(f => f.id === id ? { ...f, status } : f));
    await fetch(`/api/admin/followups/${id}?key=${encodeURIComponent(key)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).catch(err => console.error('Failed to update followup status:', err));
  };


  const filtered = filter === 'ALL' ? followups : followups.filter(f => f.status === filter);
  const total = counts.overdue + counts.dueToday + counts.dueThisWeek + counts.upcoming;

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Follow-ups</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{total} total tasks</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono transition-all shadow-md shadow-[#1463FF]/20">
          <Plus className="w-3.5 h-3.5" /> ADD FOLLOW-UP
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Overdue', count: counts.overdue, icon: <AlertCircle className="w-4 h-4 text-rose-500" />, color: 'border-rose-200 bg-rose-50' },
          { label: 'Due Today', count: counts.dueToday, icon: <Clock className="w-4 h-4 text-[#1463FF]" />, color: 'border-[#1463FF]/25 bg-[#EDF4FF]' },
          { label: 'This Week', count: counts.dueThisWeek, icon: <CalendarCheck className="w-4 h-4 text-amber-500" />, color: 'border-amber-200 bg-amber-50' },
          { label: 'Upcoming', count: counts.upcoming, icon: <CheckCircle2 className="w-4 h-4 text-[#94A3B8]" />, color: 'border-[#D8D4C9] bg-[#F7F4EC]' },
        ].map(c => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
            <div className="flex items-center justify-between mb-1">{c.icon}<span className="font-black text-2xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{c.count}</span></div>
            <span className="font-mono text-[9px] font-bold text-[#64748B] uppercase tracking-wider">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        {(['ALL', 'OPEN', 'COMPLETED'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all ${filter === f ? 'bg-[#1463FF] text-white' : 'text-[#475569] hover:bg-[#F7F4EC]'}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        {loading ? (
          <div className="p-16 text-center"><div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <CalendarCheck className="w-10 h-10 text-[#D8D4C9] mx-auto mb-3" />
            <p className="font-bold text-[#0B132B] mb-1">No follow-ups</p>
            <p className="text-sm text-[#64748B]">Add follow-up tasks to stay on top of your leads.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1EDE4]">
            {filtered.map(fu => (
              <div key={fu.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#FDFBF7] transition-colors">
                <button onClick={() => mark(fu.id, fu.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED')} className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${fu.status === 'COMPLETED' ? 'bg-emerald-500 border-emerald-500' : isOverdue(fu.dueDate) ? 'border-rose-400' : 'border-[#D8D4C9]'}`}>
                  {fu.status === 'COMPLETED' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-[13px] ${fu.status === 'COMPLETED' ? 'line-through text-[#94A3B8]' : 'text-[#0B132B]'}`}>{fu.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`font-mono text-[10px] font-bold ${isOverdue(fu.dueDate) && fu.status !== 'COMPLETED' ? 'text-rose-600' : 'text-[#64748B]'}`}>{formatDate(fu.dueDate)}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full border font-mono text-[9px] font-bold ${PRIORITY_COLORS[fu.priority] || ''}`}>{fu.priority}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
