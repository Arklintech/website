'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  ShieldCheck, Activity, Users, Database, ArrowRight, RefreshCw,
  Search, Download, Trash2, CheckCircle2, Clock, AlertCircle, Lock,
  ChevronRight, Sparkles, Filter, ExternalLink, Cpu
} from 'lucide-react';
import type { InquiryRecord } from '@/lib/db';

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [stats, setStats] = useState({ total: 0, new: 0, inReview: 0, engaged: 0, archived: 0 });
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryRecord | null>(null);

  // System Health State
  const [health, setHealth] = useState<{
    status: string;
    system: { uptimeFormatted: string; version: string; environment: string };
    database: { latencyMs: number; status: string; totalInquiries: number; totalSubscribers: number };
    resources: { heapUsedMb: number };
  } | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealth(data);
      }
    } catch (e) {
      console.error('Failed to fetch health', e);
    }
  }, []);

  const fetchInquiries = useCallback(async (key: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiries?status=${statusFilter}&key=${encodeURIComponent(key)}`);
      if (res.ok) {
        const json = await res.json();
        setInquiries(json.data || []);
        if (json.stats) setStats(json.stats);
      } else if (res.status === 401) {
        setIsAuthenticated(false);
        setAuthError('Invalid administrator passcode.');
      }
    } catch (e) {
      console.error('Fetch inquiries error', e);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!passcode.trim()) {
      setAuthError('Please enter admin passcode.');
      return;
    }
    // Verify passcode against API
    fetch(`/api/inquiries?key=${encodeURIComponent(passcode.trim())}`)
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
          sessionStorage.setItem('ark_admin_pass', passcode.trim());
          fetchInquiries(passcode.trim());
          fetchHealth();
        } else {
          setAuthError('Access denied: Invalid administrator passcode.');
        }
      })
      .catch(() => setAuthError('Connection error validating passcode.'));
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('ark_admin_pass');
    if (saved) {
      setPasscode(saved);
      setIsAuthenticated(true);
      fetchInquiries(saved);
      fetchHealth();
    }
  }, [fetchInquiries, fetchHealth]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const key = passcode || sessionStorage.getItem('ark_admin_pass') || '';
      const res = await fetch(`/api/inquiries/${id}?key=${encodeURIComponent(key)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const json = await res.json();
        setInquiries(prev => prev.map(item => item.id === id ? json.data : item));
        if (selectedInquiry?.id === id) setSelectedInquiry(json.data);
        fetchInquiries(key);
      }
    } catch (e) {
      console.error('Update status error', e);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry record?')) return;
    try {
      const key = passcode || sessionStorage.getItem('ark_admin_pass') || '';
      const res = await fetch(`/api/inquiries/${id}?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
        fetchInquiries(key);
      }
    } catch (e) {
      console.error('Delete inquiry error', e);
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Phone', 'Industry', 'Service', 'Status', 'Requirement'];
    const rows = inquiries.map(item => [
      item.id,
      item.createdAt,
      `"${item.name.replace(/"/g, '""')}"`,
      item.email,
      `"${(item.company || '').replace(/"/g, '""')}"`,
      item.phone || '',
      item.industry || '',
      item.service || '',
      item.status,
      `"${item.requirement.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arklintech-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(item => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      (item.company && item.company.toLowerCase().includes(q)) ||
      (item.industry && item.industry.toLowerCase().includes(q)) ||
      (item.service && item.service.toLowerCase().includes(q)) ||
      item.requirement.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070B12] text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0D131F] border border-[#18202E] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#1463FF]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#1463FF]/20 border border-[#1463FF]/40 flex items-center justify-center text-[#1463FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] font-bold text-[#1463FF] uppercase tracking-widest block">ADMINISTRATIVE ACCESS</span>
              <h1 className="font-black text-lg uppercase tracking-tight text-white" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                ARKLINTECH COMMAND
              </h1>
            </div>
          </div>

          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            Enter your administrative passcode to access the production database, system telemetry, and project inquiry pipelines.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono text-[9px] uppercase tracking-widest text-white/50 block mb-1.5 font-bold">
                SECURITY PASSCODE
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#1463FF] transition-all font-mono"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-white/30 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {authError && <p className="text-xs text-rose-400 mt-2 font-medium">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1463FF] hover:bg-[#004AD6] text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-lg shadow-[#1463FF]/25 flex items-center justify-center gap-2 group"
            >
              <span>AUTHENTICATE & ENTER</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#18202E] text-center">
            <span className="font-mono text-[9px] text-white/30">DEFAULT PASSCODE: arklintech2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070B12] text-white">
      {/* Top Admin Navigation Header */}
      <header className="border-b border-[#18202E] bg-[#090D15]/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1463FF] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#1463FF]/30" style={{ fontFamily: "'Syncopate', sans-serif" }}>
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[8px] font-bold text-[#1463FF] uppercase tracking-widest">ARKLINTECH CORE BACKEND</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[8px] text-emerald-400 font-bold">OPERATIONAL</span>
              </div>
              <h1 className="font-black text-sm uppercase tracking-tight text-white" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                SYSTEMS ARCHITECTURE & INQUIRIES CONSOLE
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchInquiries(passcode);
                fetchHealth();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E2838] bg-[#0D131F] text-xs font-mono font-bold text-white/70 hover:text-white hover:border-[#1463FF] transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#1463FF]' : ''}`} />
              <span>SYNC</span>
            </button>

            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E2838] bg-[#0D131F] text-xs font-mono font-bold text-white/70 hover:text-white hover:border-[#1463FF] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem('ark_admin_pass');
                setIsAuthenticated(false);
              }}
              className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-mono font-bold transition-all"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'TOTAL INQUIRIES', val: stats.total, color: 'text-white' },
            { label: 'NEW LEADS', val: stats.new, color: 'text-[#1463FF]' },
            { label: 'IN REVIEW', val: stats.inReview, color: 'text-amber-400' },
            { label: 'ENGAGED', val: stats.engaged, color: 'text-emerald-400' },
            { label: 'DB LATENCY', val: `${health?.database.latencyMs ?? 1} ms`, color: 'text-sky-400' },
            { label: 'SYSTEM UPTIME', val: health?.system.uptimeFormatted ?? 'Active', color: 'text-purple-400' },
          ].map((card, i) => (
            <div key={i} className="p-4 rounded-xl border border-[#18202E] bg-[#0D131F]">
              <span className="font-mono text-[8px] uppercase tracking-widest text-white/40 font-bold block mb-1">
                {card.label}
              </span>
              <span className={`font-mono text-xl font-bold ${card.color}`}>
                {card.val}
              </span>
            </div>
          ))}
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#18202E] bg-[#0D131F]">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
            {['ALL', 'NEW', 'IN_REVIEW', 'ENGAGED', 'ARCHIVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-[#1463FF] text-white shadow-md shadow-[#1463FF]/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, email, requirement..."
              className="w-full bg-[#070B12] border border-[#1E2838] focus:border-[#1463FF] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Inquiries Table & Detail Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Table (8 cols) */}
          <div className={`${selectedInquiry ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all`}>
            <div className="rounded-2xl border border-[#18202E] bg-[#0D131F] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#18202E] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#1463FF]" />
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    INCOMING PROJECT PROPOSALS ({filteredInquiries.length})
                  </h2>
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="p-12 text-center text-white/40">
                  <Sparkles className="w-8 h-8 mx-auto text-white/20 mb-3" />
                  <p className="font-mono text-xs uppercase tracking-widest font-bold">No project inquiries found</p>
                  <p className="text-xs text-white/40 mt-1">Submissions via the website will appear here in real-time.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#18202E] text-[9px] font-mono font-bold uppercase tracking-wider text-white/40 bg-[#070B12]/50">
                        <th className="px-4 py-3">CLIENT</th>
                        <th className="px-4 py-3">SYSTEM / SERVICE</th>
                        <th className="px-4 py-3">STATUS</th>
                        <th className="px-4 py-3">DATE</th>
                        <th className="px-4 py-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#18202E]/60 text-xs">
                      {filteredInquiries.map((inq) => {
                        const isSelected = selectedInquiry?.id === inq.id;
                        return (
                          <tr
                            key={inq.id}
                            onClick={() => setSelectedInquiry(inq)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-[#1463FF]/15 border-l-2 border-[#1463FF]'
                                : 'hover:bg-white/[0.03]'
                            }`}
                          >
                            <td className="px-4 py-3.5">
                              <p className="font-bold text-white leading-tight">{inq.name}</p>
                              <p className="text-[10px] text-white/50 font-mono mt-0.5">{inq.email}</p>
                              {inq.company && (
                                <span className="inline-block mt-1 font-mono text-[8px] bg-white/5 px-1.5 py-0.5 rounded text-white/60">
                                  {inq.company}
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3.5">
                              <span className="font-mono text-[10px] font-bold text-[#1463FF] block">
                                {inq.service || inq.industry || 'General System'}
                              </span>
                              <p className="text-[10px] text-white/60 line-clamp-1 mt-0.5 max-w-xs">
                                {inq.requirement}
                              </p>
                            </td>

                            <td className="px-4 py-3.5">
                              <span className={`inline-flex items-center gap-1 font-mono text-[8.5px] font-bold px-2 py-0.5 rounded-full ${
                                inq.status === 'NEW' ? 'bg-[#1463FF]/20 text-[#1463FF] border border-[#1463FF]/30' :
                                inq.status === 'IN_REVIEW' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                inq.status === 'ENGAGED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                'bg-white/10 text-white/50'
                              }`}>
                                {inq.status}
                              </span>
                            </td>

                            <td className="px-4 py-3.5 font-mono text-[10px] text-white/50 whitespace-nowrap">
                              {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </td>

                            <td className="px-4 py-3.5 text-right whitespace-nowrap">
                              <ChevronRight className="w-4 h-4 text-white/30 inline-block" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Details Panel (5 cols) */}
          {selectedInquiry && (
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#18202E] bg-[#0D131F] p-6 space-y-6 sticky top-24 shadow-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[8px] font-bold text-[#1463FF] uppercase tracking-widest">
                      INQUIRY DOSSIER — {selectedInquiry.id}
                    </span>
                    <h3 className="font-black text-lg text-white mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                      {selectedInquiry.name}
                    </h3>
                    <p className="font-mono text-xs text-[#1463FF] mt-0.5">{selectedInquiry.email}</p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="text-white/40 hover:text-white text-xs font-mono font-bold"
                  >
                    CLOSE [×]
                  </button>
                </div>

                {/* Status Toggle Bar */}
                <div>
                  <span className="font-mono text-[8px] font-bold text-white/40 uppercase tracking-wider block mb-2">
                    WORKFLOW STATUS
                  </span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['NEW', 'IN_REVIEW', 'ENGAGED', 'ARCHIVED'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => updateStatus(selectedInquiry.id, st)}
                        className={`py-2 px-1 text-center font-mono text-[9px] font-bold uppercase rounded-lg transition-all ${
                          selectedInquiry.status === st
                            ? 'bg-[#1463FF] text-white shadow-md shadow-[#1463FF]/30 ring-1 ring-white/20'
                            : 'bg-[#070B12] text-white/50 hover:text-white hover:bg-white/5 border border-[#18202E]'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Client Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#070B12] border border-[#18202E] text-xs">
                  <div>
                    <span className="font-mono text-[8px] text-white/40 uppercase block">COMPANY</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedInquiry.company || '—'}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-white/40 uppercase block">PHONE</span>
                    <span className="font-bold text-white mt-0.5 block">{selectedInquiry.phone || '—'}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-white/40 uppercase block">INDUSTRY</span>
                    <span className="font-bold text-[#1463FF] mt-0.5 block">{selectedInquiry.industry || '—'}</span>
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-white/40 uppercase block">SERVICE DOMAIN</span>
                    <span className="font-bold text-[#1463FF] mt-0.5 block">{selectedInquiry.service || '—'}</span>
                  </div>
                </div>

                {/* Requirement Full Text */}
                <div>
                  <span className="font-mono text-[8px] font-bold text-white/40 uppercase tracking-wider block mb-1.5">
                    SYSTEM REQUIREMENT SPECIFICATION
                  </span>
                  <div className="p-4 rounded-xl bg-[#070B12] border border-[#18202E] text-xs text-white/80 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap font-body">
                    {selectedInquiry.requirement}
                  </div>
                </div>

                {/* Delete / Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-[#18202E]">
                  <span className="font-mono text-[8px] text-white/30">
                    IP: {selectedInquiry.ipAddress || '127.0.0.1'}
                  </span>
                  <button
                    onClick={() => deleteInquiry(selectedInquiry.id)}
                    className="flex items-center gap-1 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>DELETE INQUIRY</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
