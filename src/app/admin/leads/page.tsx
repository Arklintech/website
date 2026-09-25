'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Zap, Plus, Search, RefreshCw, Download,
  ChevronRight, Building2, X, Send,
} from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
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
  HIGH: 'text-rose-600', MEDIUM: 'text-amber-600', LOW: 'text-[#475569]',
};

const PRIORITY_BG: Record<string, string> = {
  HIGH: 'bg-rose-50', MEDIUM: 'bg-amber-50', LOW: 'bg-[#F7F4EC]',
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function exportToCSV(leads: LeadRecord[]) {
  const headers = ['Name', 'Email', 'Phone', 'Company', 'Industry', 'Interest', 'Budget', 'Status', 'Priority', 'Source', 'Created'];
  const rows = leads.map(l => [
    l.name,
    l.email,
    l.phone || '',
    l.company || '',
    l.industry || '',
    l.interest || l.projectType || '',
    l.budget || '',
    l.status,
    l.priority,
    l.source || '',
    new Date(l.createdAt).toLocaleDateString('en-US'),
  ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `arklintech-leads-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Add Lead Modal ───────────────────────────────────────────────────────────

interface AddLeadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function AddLeadModal({ onClose, onSuccess }: AddLeadModalProps) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    industry: '', interest: '', budget: '', problem: '',
    priority: 'MEDIUM', source: 'Manual Entry',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const res = await fetchAdmin('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const d = await res.json().catch(() => null);
      if (res.ok && d?.success) {
        onSuccess();
        onClose();
      } else {
        setError(d?.error || 'Failed to create lead. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full bg-[#F7F4EC] border border-[#E8E4DC] rounded-lg px-3 py-2.5 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-1 focus:ring-[#1463FF]/20 transition-all';
  const labelCls = 'block font-mono text-[9px] uppercase tracking-widest text-[#64748B] font-bold mb-1.5';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#1463FF]" />
            <span className="font-mono text-[11px] font-bold text-[#0B132B] uppercase tracking-wider">Add New Lead</span>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F7F4EC] hover:text-[#0B132B] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 font-mono">{error}</div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Alex Mercer" required />
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input type="email" className={inputCls} value={form.email} onChange={e => set('email', e.target.value)} placeholder="alex@company.com" required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={labelCls}>Phone</label>
              <input type="tel" className={inputCls} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 555 000 0000" />
            </div>
            <div>
              <label className={labelCls}>Company</label>
              <input className={inputCls} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Apex Systems Inc." />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={labelCls}>Industry</label>
              <select className={inputCls} value={form.industry} onChange={e => set('industry', e.target.value)}>
                <option value="">Select industry</option>
                <option>Commerce &amp; Retail</option>
                <option>Education &amp; Institutions</option>
                <option>Hospitality &amp; POS</option>
                <option>Healthcare &amp; Bio</option>
                <option>Financial Services</option>
                <option>Other Enterprise</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Interest / Service</label>
              <select className={inputCls} value={form.interest} onChange={e => set('interest', e.target.value)}>
                <option value="">Select service</option>
                <option>AI &amp; Intelligence</option>
                <option>Software &amp; Platforms</option>
                <option>Automation &amp; Orchestration</option>
                <option>Business Systems</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className={labelCls}>Budget</label>
              <input className={inputCls} value={form.budget} onChange={e => set('budget', e.target.value)} placeholder="e.g. $50k–$100k" />
            </div>
            <div>
              <label className={labelCls}>Priority</label>
              <select className={inputCls} value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Problem / Requirement</label>
            <textarea rows={3} className={`${inputCls} resize-none`} value={form.problem} onChange={e => set('problem', e.target.value)} placeholder="Describe what they want to build, automate, or modernize..." />
          </div>

          <div>
            <label className={labelCls}>Source</label>
            <input className={inputCls} value={form.source} onChange={e => set('source', e.target.value)} placeholder="e.g. LinkedIn, Referral, Website" />
          </div>
        </form>

        {/* Modal footer */}
        <div className="px-6 py-4 border-t border-[#E8E4DC] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E8E4DC] text-[11px] font-bold font-mono text-[#475569] hover:bg-[#F7F4EC] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit as any}
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] disabled:opacity-60 text-white text-[11px] font-bold font-mono flex items-center gap-2 transition-all shadow-md shadow-[#1463FF]/20"
          >
            {saving ? (
              <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Saving...</span></>
            ) : (
              <><Send className="w-3 h-3" /><span>Create Lead</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Leads Page ───────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [byStatus, setByStatus] = useState<Record<string, number>>({});
  const [filter, setFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const statusParam = filter !== 'ALL' ? `?status=${filter}&limit=100` : '?limit=100';
      const res = await fetchAdmin(`/api/admin/leads${statusParam}`);
      const d = await res.json().catch(() => null);
      if (res.ok && d && !d.error) {
        setLeads(Array.isArray(d?.data) ? d.data : []);
        if (d.byStatus) setByStatus(d.byStatus);
      } else {
        setErrorMsg(d?.error || 'Unable to load data right now. Please try again.');
      }
    } catch {
      setErrorMsg('Unable to load data right now. Please try again.');
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const filtered = leads.filter(l => {
    if (!l) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (l.name || '').toLowerCase().includes(q) ||
      (l.email || '').toLowerCase().includes(q) ||
      (l.company || '').toLowerCase().includes(q) ||
      (l.interest || '').toLowerCase().includes(q) ||
      (l.projectType || '').toLowerCase().includes(q)
    );
  });

  const totalAll = Object.values(byStatus).reduce((a, b) => a + b, 0);

  return (
    <div className="p-3.5 sm:p-6 max-w-[1400px] mx-auto">
      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { fetchLeads(); }}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Leads</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{totalAll} total lead{totalAll !== 1 ? 's' : ''} across all pipeline stages.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => fetchLeads()}
            title="Refresh"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1463FF]' : ''}`} />
          </button>
          <button
            onClick={() => exportToCSV(filtered)}
            disabled={filtered.length === 0}
            title="Export visible leads as CSV"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono transition-all shadow-md shadow-[#1463FF]/20"
          >
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
        <div className="relative">
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#1463FF]" />
            <span className="font-bold text-sm text-[#0B132B]">
              {filtered.length} Lead{filtered.length !== 1 ? 's' : ''}
            </span>
            {search && <span className="text-xs text-[#94A3B8]">matching &ldquo;{search}&rdquo;</span>}
          </div>
          {!loading && !errorMsg && leads.length > 0 && (
            <span className="font-mono text-[9px] text-[#94A3B8] uppercase tracking-wider">
              Last updated {timeAgo(new Date().toISOString())}
            </span>
          )}
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-mono text-xs text-[#475569] uppercase">Loading leads...</p>
          </div>
        ) : errorMsg ? (
          <div className="p-16 text-center bg-rose-50/50">
            <RefreshCw className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <p className="font-bold text-rose-900 mb-1">{errorMsg}</p>
            <p className="text-sm text-rose-600 mb-4">The data store could not be reached.</p>
            <button
              onClick={() => fetchLeads()}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold font-mono transition-all"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Zap className="w-10 h-10 text-[#D8D4C9] mx-auto mb-3" />
            <p className="font-bold text-[#0B132B] mb-1">
              {search ? `No leads match "${search}"` : 'No leads yet'}
            </p>
            <p className="text-sm text-[#475569] mb-4">
              {search
                ? 'Try a different search term or clear the filter.'
                : 'Leads submitted via the website form will appear here automatically.'}
            </p>
            {!search && (
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#1463FF] hover:bg-[#004AD6] text-white rounded-lg text-xs font-bold font-mono transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-3.5 h-3.5" />
                Add First Lead
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  {[
                    { label: 'Lead', width: 'min-w-[180px]' },
                    { label: 'Company', width: 'min-w-[140px]' },
                    { label: 'Interest', width: 'min-w-[160px]' },
                    { label: 'Status', width: 'min-w-[130px]' },
                    { label: 'Priority', width: 'min-w-[80px]' },
                    { label: 'Added', width: 'min-w-[100px]' },
                    { label: '', width: 'w-16' },
                  ].map(h => (
                    <th key={h.label} className={`px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap ${h.width}`}>
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-[#FDFBF7] transition-colors group">
                    {/* Lead */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center text-[#1463FF] font-bold text-[11px] shrink-0">
                          {(lead.name || '?').charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[13px] text-[#0B132B] truncate">{lead.name}</p>
                          <p className="font-mono text-[10px] text-[#64748B] truncate">{lead.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="px-4 py-3.5">
                      {lead.company ? (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3 h-3 text-[#94A3B8] shrink-0" />
                          <span className="text-[12px] text-[#475569] truncate">{lead.company}</span>
                        </div>
                      ) : (
                        <span className="text-[#D8D4C9] text-xs">—</span>
                      )}
                    </td>

                    {/* Interest */}
                    <td className="px-4 py-3.5">
                      <span className="text-[12px] text-[#475569] line-clamp-1 max-w-[200px]">
                        {lead.interest || lead.projectType || lead.problem || '—'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <select
                        value={lead.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value as LeadStatus;
                          setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: newStatus } : l));
                          await fetchAdmin(`/api/admin/leads/${lead.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ status: newStatus }),
                          });
                          fetchLeads();
                        }}
                        className="bg-[#F7F4EC] border border-[#E8E4DC] rounded px-2 py-1 text-[11px] font-mono font-bold text-[#0B132B] focus:outline-none focus:border-[#1463FF] cursor-pointer"
                      >
                        {['NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL', 'ACTIVE', 'WON', 'LOST'].map(st => (
                          <option key={st} value={st} style={{ color: '#0B132B', backgroundColor: '#FFFFFF' }}>{st}</option>
                        ))}
                      </select>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[9px] font-bold uppercase ${PRIORITY_COLORS[lead.priority] || 'text-[#94A3B8]'} ${PRIORITY_BG[lead.priority] || 'bg-[#F7F4EC]'}`}>
                        {lead.priority}
                      </span>
                    </td>

                    {/* Added */}
                    <td className="px-4 py-3.5">
                      <div>
                        <span className="font-mono text-[11px] text-[#475569]">
                          {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        {lead.source && <p className="font-mono text-[9px] text-[#94A3B8] truncate max-w-[90px]">{lead.source}</p>}
                      </div>
                    </td>

                    {/* Open */}
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-1 text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] transition-all whitespace-nowrap"
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
