'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Zap, Plus, Search, Filter, RefreshCw, Download, MoreHorizontal,
  ChevronRight, ArrowUpRight, Building2, Mail, Phone, Calendar, User
} from 'lucide-react';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import type { LeadRecord, LeadStatus } from '@/lib/admin-db';

const STAGES: { value: LeadStatus | 'ALL'; label: string }[] = [
  { value: 'ALL', label: 'All Leads' },
  { value: 'NEW', label: 'New' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'QUALIFIED', label: 'Qualified' },
  { value: 'DISCOVERY', label: 'Discovery' },
  { value: 'PROPOSAL', label: 'Proposal' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: 'text-rose-600', MEDIUM: 'text-amber-600', LOW: 'text-[#94A3B8]',
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [byStatus, setByStatus] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'board'>('list');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const key = sessionStorage.getItem('ark_admin_pass') || '';
      const statusParam = filter !== 'ALL' ? `&status=${filter}` : '';
      const res = await fetch(`/api/admin/leads?key=${encodeURIComponent(key)}${statusParam}&limit=100`);
      if (res.ok) {
        const d = await res.json();
        setLeads(d.data || []);
        if (d.byStatus) setByStatus(d.byStatus);
      }
    } catch {}
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const filtered = leads.filter(l => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
      || (l.company || '').toLowerCase().includes(q) || (l.interest || '').toLowerCase().includes(q);
  });

  const totalAll = Object.values(byStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Leads</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{totalAll} total leads across all pipeline stages.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => fetchLeads()} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1463FF]' : ''}`} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono transition-all shadow-md shadow-[#1463FF]/20">
            <Plus className="w-3.5 h-3.5" />
            <span>ADD LEAD</span>
          </button>
        </div>
      </div>

      {/* Stage filter tabs + search */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-4 mb-5 flex flex-col gap-4">
        <div className="flex flex-wrap gap-1.5">
          {STAGES.map(s => {
            const count = s.value === 'ALL' ? totalAll : (byStatus[s.value] || 0);
            return (
              <button
                key={s.value}
                onClick={() => setFilter(s.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono transition-all ${
                  filter === s.value
                    ? 'bg-[#1463FF] text-white shadow-sm'
                    : 'text-[#475569] hover:bg-[#F7F4EC] hover:text-[#0B132B]'
                }`}
              >
                <span>{s.label}</span>
                {count > 0 && (
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === s.value ? 'bg-white/20' : 'bg-[#F1EDE4]'
                  }`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, company, interest..."
              className="w-full bg-[#F7F4EC] border border-[#E8E4DC] rounded-lg pl-9 pr-4 py-2 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-1 focus:ring-[#1463FF]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#1463FF]" />
            <span className="font-bold text-sm text-[#0B132B]">
              {filtered.length} Lead{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-mono text-xs text-[#94A3B8] uppercase">Loading leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Zap className="w-10 h-10 text-[#D8D4C9] mx-auto mb-3" />
            <p className="font-bold text-[#0B132B] mb-1">No leads found</p>
            <p className="text-sm text-[#64748B]">Leads submitted via the website form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  {['Lead', 'Company', 'Interest', 'Status', 'Priority', 'Added', ''].map(h => (
                    <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-[#FDFBF7] transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center text-[#1463FF] font-bold text-[11px] shrink-0">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-[13px] text-[#0B132B]">{lead.name}</p>
                          <p className="font-mono text-[10px] text-[#64748B]">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {lead.company && <><Building2 className="w-3 h-3 text-[#94A3B8]" /><span className="text-[12px] text-[#475569]">{lead.company}</span></>}
                        {!lead.company && <span className="text-[#D8D4C9] text-xs">—</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[12px] text-[#475569] line-clamp-1 max-w-[200px]">
                        {lead.interest || lead.projectType || lead.problem || '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`font-mono text-[9px] font-bold uppercase ${PRIORITY_COLORS[lead.priority] || 'text-[#94A3B8]'}`}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <span className="font-mono text-[11px] text-[#475569]">
                          {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        {lead.source && <p className="font-mono text-[9px] text-[#94A3B8]">{lead.source}</p>}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] transition-all"
                      >
                        Open <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
