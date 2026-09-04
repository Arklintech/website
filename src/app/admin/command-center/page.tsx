'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Users, MessageSquare, FileText, TrendingUp, Activity, Zap,
  ArrowRight, ArrowUpRight, ChevronRight, RefreshCw, Calendar,
  Radio, GitBranch, BarChart2, AlertCircle, Eye, AlertTriangle,
  CheckCircle2, Clock, Globe
} from 'lucide-react';

import MetricSparkline from '@/components/admin/shared/MetricSparkline';
import { StatusBadge, IntentDot } from '@/components/admin/shared/StatusBadge';
import { getStoredAdminKey } from '@/lib/admin-auth';



// ── Helpers ───────────────────────────────────────────────────────────────────


function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function formatDuration(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ── Seed data for demo when no real data exists ────────────────────────────────

const DEMO_LEADS = [
  { id: 'demo1', name: 'Ahmed Khan', company: 'Acme Corp', interest: 'Automation System', status: 'NEW', createdAt: new Date(Date.now() - 120000).toISOString(), source: 'Organic' },
  { id: 'demo2', name: 'Sarah Johnson', company: 'TechNova Solutions', interest: 'ERP Platform', status: 'CONTACTED', createdAt: new Date(Date.now() - 900000).toISOString(), source: 'Direct' },
  { id: 'demo3', name: 'Michael Chen', company: 'Heal Industries', interest: 'Healthcare Platform', status: 'CONTACTED', createdAt: new Date(Date.now() - 3600000).toISOString(), source: 'Referral' },
  { id: 'demo4', name: 'Priya Sharma', company: 'FutureWorks', interest: 'Workflow Automation', status: 'NEW', createdAt: new Date(Date.now() - 7200000).toISOString(), source: 'Organic' },
  { id: 'demo5', name: 'David Wilson', company: 'BrightPath', interest: 'AI Integration', status: 'QUALIFIED', createdAt: new Date(Date.now() - 10800000).toISOString(), source: 'Social' },
];

const DEMO_VISITORS = [
  { id: 'v1', location: 'India', country: '🇮🇳', currentPage: '/work', durationSeconds: 142, intent: 'HIGH' },
  { id: 'v2', location: 'USA', country: '🇺🇸', currentPage: '/start-a-system', durationSeconds: 43, intent: 'HIGH' },
  { id: 'v3', location: 'UK', country: '🇬🇧', currentPage: '/what-we-do/ai-intelligence', durationSeconds: 68, intent: 'MEDIUM' },
  { id: 'v4', location: 'UAE', country: '🇦🇪', currentPage: '/work/daarayn', durationSeconds: 201, intent: 'HIGH' },
  { id: 'v5', location: 'Singapore', country: '🇸🇬', currentPage: '/contact', durationSeconds: 29, intent: 'LOW' },
];

const DEMO_JOURNEYS = [
  { pages: ['/', '/work', '/work/daarayn', '/start-a-system'], pct: 24 },
  { pages: ['/', '/what-we-do', '/what-we-do/ai-intelligence', '/start-a-system'], pct: 18 },
  { pages: ['/', '/work', '/work/neominds', '/work/neominds/layer-02', '/contact'], pct: 14 },
  { pages: ['/', '/industries', '/work', '/start-a-system'], pct: 11 },
  { pages: ['/', '/start-a-system', '/contact'], pct: 9 },
];

const PIPELINE_STAGES = ['NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL', 'ACTIVE', 'WON', 'LOST'];
const STAGE_COLORS: Record<string, string> = {
  NEW: 'bg-[#1463FF]', CONTACTED: 'bg-amber-400', QUALIFIED: 'bg-sky-500',
  DISCOVERY: 'bg-violet-500', PROPOSAL: 'bg-orange-400', ACTIVE: 'bg-emerald-500',
  WON: 'bg-emerald-700', LOST: 'bg-rose-400',
};

// ── KPI Card ──────────────────────────────────────────────────────────────────
interface KPICardProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: number[];
  icon: React.ReactNode;
  color?: string;
  isLive?: boolean;
}

function KPICard({ label, value, delta, trend, icon, color = '#1463FF', isLive }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E8E4DC] p-4 flex flex-col gap-2 hover:border-[#1463FF]/30 transition-all">
      <div className="flex items-start justify-between">
        <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">{label}</span>
        <span className="text-[#94A3B8]">{icon}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-2xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{value}</span>
            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />}
          </div>
          {delta && (
            <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              {delta}
            </span>
          )}
        </div>
        {trend && <MetricSparkline data={trend} color={color} />}
      </div>
    </div>
  );
}

// ── Needs Attention Item ──────────────────────────────────────────────────────
const ATTENTION_ICONS: Record<string, React.ReactNode> = {
  OVERDUE_FOLLOWUP: <AlertCircle className="w-4 h-4 text-rose-500" />,
  UNASSIGNED_CONV: <MessageSquare className="w-4 h-4 text-amber-500" />,
  HIGH_INTENT: <Eye className="w-4 h-4 text-purple-500" />,
  LEADS_WAITING: <Zap className="w-4 h-4 text-[#1463FF]" />,
  EMAIL_FAILED: <AlertTriangle className="w-4 h-4 text-rose-500" />,
};

const ATTENTION_BG: Record<string, string> = {
  OVERDUE_FOLLOWUP: 'bg-rose-50 border-rose-200',
  UNASSIGNED_CONV: 'bg-amber-50 border-amber-200',
  HIGH_INTENT: 'bg-purple-50 border-purple-200',
  LEADS_WAITING: 'bg-[#EDF4FF] border-[#1463FF]/25',
  EMAIL_FAILED: 'bg-rose-50 border-rose-200',
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CommandCenterPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());
  const adminKeyRef = useRef<string>('');

  // Clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      // Get key from shell data attribute or session or default fallback
      const key = (document.querySelector('[data-admin-key]') as HTMLElement)?.dataset.adminKey
        || getStoredAdminKey();
      adminKeyRef.current = key;
      const res = await fetch(`/api/admin/stats?key=${encodeURIComponent(key)}`);
      if (res.ok) {
        const d = await res.json();
        if (d && !d.error) setData(d);
      }
    } catch {}
    setLoading(false);
    setRefreshing(false);
  }, []);


  useEffect(() => { fetchData(); }, [fetchData]);

  const kpis = data?.kpis || {};
  const pipeline = data?.pipeline || PIPELINE_STAGES.map(s => ({ stage: s, count: 0, conversion: 0 }));
  const recentLeads = (data?.recentLeads?.length ? data.recentLeads : DEMO_LEADS).slice(0, 5);
  const topSources = data?.topSources || [
    { source: 'Organic Search', visits: 1613, pct: 42 },
    { source: 'Direct', visits: 922, pct: 24 },
    { source: 'Referral', visits: 614, pct: 18 },
    { source: 'Social Media', visits: 422, pct: 11 },
    { source: 'Other', visits: 271, pct: 5 },
  ];
  const liveVisitors = (data?.liveVisitors?.length ? data.liveVisitors : DEMO_VISITORS).slice(0, 5);
  const journeys = (data?.journeys?.length ? data.journeys : DEMO_JOURNEYS).slice(0, 5);
  const followupCounts = data?.followups?.counts || { overdue: 2, dueToday: 3, dueThisWeek: 7, upcoming: 6 };
  const needsAttention = data?.needsAttention || [
    { type: 'OVERDUE_FOLLOWUP', count: 2, label: 'Overdue Follow-ups', url: '/admin/follow-ups' },
    { type: 'UNASSIGNED_CONV', count: 3, label: 'Unassigned Conversations', url: '/admin/inbox' },
    { type: 'HIGH_INTENT', count: 2, label: 'High-Intent Visitors Active', url: '/admin/live-visitors' },
    { type: 'LEADS_WAITING', count: 4, label: 'Leads Waiting > 48h', url: '/admin/leads' },
  ];

  // Sparkline demo data
  const sparkData = { v: [28, 35, 42, 38, 55, 67, 72, 65, 78, 82], l: [2, 3, 5, 4, 6, 8, 7, 9, 11, 12] };
  const totalFollowups = followupCounts.overdue + followupCounts.dueToday + followupCounts.dueThisWeek + followupCounts.upcoming;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#1463FF] border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-[#94A3B8] uppercase tracking-widest">Loading Command Center</span>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Command Center
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Real-time overview of your business and website performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="font-mono text-[11px] font-bold text-[#0B132B]">
              {now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="font-mono text-[10px] text-[#94A3B8]">{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
          </div>
          <button
            onClick={() => fetchData(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#1463FF]' : ''}`} />
            <span>{refreshing ? 'REFRESHING...' : 'REFRESH'}</span>
          </button>
        </div>
      </div>

      {/* ─── KPI STRIP ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <KPICard label="Visitors Today" value={kpis.visitorsToday ?? 3842} delta="↑ 18.6%" trend={sparkData.v} icon={<Activity className="w-4 h-4" />} />
        <KPICard label="Leads" value={kpis.leads ?? 24} delta="↑ 26.3%" trend={sparkData.l} icon={<Zap className="w-4 h-4" />} color="#1463FF" />
        <KPICard label="Conversations" value={kpis.conversations ?? 16} delta="↑ 14.7%" trend={[4,5,6,4,7,8,9,8,10,12]} icon={<MessageSquare className="w-4 h-4" />} color="#8B5CF6" />
        <KPICard label="Inquiries" value={kpis.inquiries ?? 31} delta="↑ 12.1%" trend={[8,10,12,9,14,16,15,18,20,22]} icon={<FileText className="w-4 h-4" />} color="#F59E0B" />
        <KPICard label="Conversion Rate" value={`${kpis.conversionRate ?? 2.34}%`} delta="↑ 8.2%" trend={[1.2,1.5,1.8,1.6,2.0,2.2,2.1,2.4,2.3,2.34]} icon={<TrendingUp className="w-4 h-4" />} color="#10B981" />
        <KPICard label="Active Now" value={kpis.activeNow ?? 14} icon={<Radio className="w-4 h-4" />} color="#10B981" isLive />
      </div>

      {/* ─── THREE-COLUMN MAIN LAYOUT ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT: Pipeline + Recent Leads + Live Visitors (7 cols) ── */}
        <div className="lg:col-span-7 flex flex-col gap-5">

          {/* Lead Pipeline */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#1463FF]" />
                <h2 className="font-bold text-sm text-[#0B132B]">Lead Pipeline</h2>
              </div>
              <Link href="/admin/leads" className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-[auto_auto_auto] gap-x-6 gap-y-2">
                <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Stage</span>
                <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-right">Count</span>
                <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-right">Share</span>
                {pipeline.map((p: any) => (
                  <React.Fragment key={p.stage}>
                    <div className="flex items-center gap-2 py-1.5">
                      <div className={`w-2 h-2 rounded-sm ${STAGE_COLORS[p.stage] || 'bg-[#D8D4C9]'}`} />
                      <span className="text-[12px] font-medium text-[#0B132B]">{p.stage.charAt(0) + p.stage.slice(1).toLowerCase()}</span>
                    </div>
                    <span className="text-[13px] font-black text-[#0B132B] text-right self-center">{p.count}</span>
                    <div className="flex items-center gap-2 self-center">
                      <div className="w-24 h-1.5 bg-[#F1EDE4] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${STAGE_COLORS[p.stage] || 'bg-[#D8D4C9]'}`}
                          style={{ width: `${p.conversion}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-[#475569] w-8 text-right">{p.conversion}%</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Leads */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#1463FF]" />
                <h2 className="font-bold text-sm text-[#0B132B]">Recent Leads</h2>
              </div>
              <Link href="/admin/leads" className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-[#F1EDE4]">
              {recentLeads.map((lead: any) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-[#FDFBF7] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/20 flex items-center justify-center text-[#1463FF] font-bold text-[11px] shrink-0">
                    {(lead.name || 'L').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[13px] text-[#0B132B] truncate">{lead.name || 'Unnamed Lead'}</span>
                      <StatusBadge status={lead.status} />
                    </div>
                    <p className="text-[11px] text-[#64748B] truncate">{lead.company || 'Direct'} · {lead.interest || lead.projectType || 'System Inquiry'}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-[10px] text-[#94A3B8]">{timeAgo(lead.createdAt)}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D8D4C9] group-hover:text-[#1463FF] mt-0.5 ml-auto transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Live Visitors */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-500" />
                <h2 className="font-bold text-sm text-[#0B132B]">Live Visitors</h2>
                <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {kpis.activeNow ?? liveVisitors.length} online
                </span>
              </div>
              <Link href="/admin/live-visitors" className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#F1EDE4]">
                    {['Visitor', 'Location', 'Page', 'Duration', 'Intent'].map(h => (
                      <th key={h} className="px-4 py-2.5 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EDE4]">
                  {liveVisitors.map((v: any, i: number) => (
                    <tr key={v.id || i} className="hover:bg-[#FDFBF7] transition-colors">
                      <td className="px-4 py-2.5 font-mono text-[11px] font-bold text-[#0B132B]">
                        {String(i + 1).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-[12px] text-[#475569] flex items-center gap-1.5">
                          <span>{v.country || '🌍'}</span>
                          <span>{v.location || 'Unknown'}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[10px] text-[#1463FF] truncate max-w-[140px]">
                        {v.currentPage || v.landingPage || '/'}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[11px] text-[#475569]">
                        {formatDuration(v.durationSeconds || 0)}
                      </td>
                      <td className="px-4 py-2.5">
                        <IntentDot intent={v.intent || 'LOW'} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-[#F1EDE4]">
              <Link href="/admin/live-visitors" className="text-[11px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] flex items-center gap-1">
                View all live visitors <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── MIDDLE: Sources + Visitor Journeys + Follow-ups (3 cols) ── */}
        <div className="lg:col-span-3 flex flex-col gap-5">

          {/* Top Sources */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#1463FF]" />
                <h2 className="font-bold text-sm text-[#0B132B]">Top Sources</h2>
              </div>
              <Link href="/admin/sources" className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6]">View all</Link>
            </div>
            <div className="p-5">
              {/* Donut placeholder */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1EDE4" strokeWidth="3.8" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1463FF" strokeWidth="3.8"
                      strokeDasharray={`${42} ${58}`} strokeDashoffset="25" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#64748B" strokeWidth="3.8"
                      strokeDasharray={`${24} ${76}`} strokeDashoffset={`${25 - 42}`} />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8B5CF6" strokeWidth="3.8"
                      strokeDasharray={`${18} ${82}`} strokeDashoffset={`${25 - 42 - 24}`} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-black text-lg text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>
                      {(topSources.reduce((a: number, s: any) => a + s.visits, 0) / 1000).toFixed(1)}K
                    </span>
                    <span className="font-mono text-[8px] text-[#94A3B8] uppercase">Visitors</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {topSources.map((s: any, i: number) => (
                  <div key={s.source} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-sm shrink-0 ${i === 0 ? 'bg-[#1463FF]' : i === 1 ? 'bg-[#64748B]' : i === 2 ? 'bg-violet-500' : i === 3 ? 'bg-amber-400' : 'bg-[#D8D4C9]'}`} />
                    <span className="text-[12px] text-[#475569] flex-1 truncate">{s.source}</span>
                    <span className="font-mono text-[10px] font-bold text-[#0B132B]">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visitor Journeys */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#1463FF]" />
                <h2 className="font-bold text-sm text-[#0B132B]">Visitor Journeys</h2>
              </div>
              <Link href="/admin/visitor-journeys" className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6]">View all</Link>
            </div>
            <div className="divide-y divide-[#F1EDE4]">
              {journeys.map((j: any, i: number) => (
                <div key={i} className="px-5 py-3">
                  <div className="flex items-center gap-1 flex-wrap">
                    {(j.pages || []).map((page: string, pi: number) => (
                      <React.Fragment key={pi}>
                        <span className="font-mono text-[9px] font-bold text-[#1463FF] bg-[#EDF4FF] px-1.5 py-0.5 rounded truncate max-w-[80px]" title={page}>
                          {page.split('/').pop() || 'home'}
                        </span>
                        {pi < (j.pages?.length || 0) - 1 && <ArrowRight className="w-2.5 h-2.5 text-[#D8D4C9] shrink-0" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1 bg-[#F1EDE4] rounded-full">
                      <div className="h-full bg-[#1463FF]/40 rounded-full" style={{ width: `${j.pct || 20}%` }} />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-[#94A3B8]">{j.pct || '—'}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-[#F1EDE4]">
              <Link href="/admin/visitor-journeys" className="text-[11px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] flex items-center gap-1">
                View full journeys <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Follow-ups */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#1463FF]" />
                <h2 className="font-bold text-sm text-[#0B132B]">Follow-ups</h2>
              </div>
              <Link href="/admin/follow-ups" className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6]">View all</Link>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-center mb-4 gap-4">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F1EDE4" strokeWidth="4" />
                    {totalFollowups > 0 && <>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F43F5E" strokeWidth="4"
                        strokeDasharray={`${(followupCounts.overdue / totalFollowups) * 100} 100`} strokeDashoffset="25" />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1463FF" strokeWidth="4"
                        strokeDasharray={`${(followupCounts.dueToday / totalFollowups) * 100} 100`}
                        strokeDashoffset={`${25 - (followupCounts.overdue / totalFollowups) * 100}`} />
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#F59E0B" strokeWidth="4"
                        strokeDasharray={`${(followupCounts.dueThisWeek / totalFollowups) * 100} 100`}
                        strokeDashoffset={`${25 - ((followupCounts.overdue + followupCounts.dueToday) / totalFollowups) * 100}`} />
                    </>}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-black text-xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{totalFollowups}</span>
                    <span className="font-mono text-[7px] text-[#94A3B8] uppercase">Total</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'Overdue', count: followupCounts.overdue, color: 'bg-rose-500' },
                    { label: 'Due Today', count: followupCounts.dueToday, color: 'bg-[#1463FF]' },
                    { label: 'This Week', count: followupCounts.dueThisWeek, color: 'bg-amber-400' },
                    { label: 'Upcoming', count: followupCounts.upcoming, color: 'bg-[#D8D4C9]' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-sm ${item.color}`} />
                      <span className="text-[11px] text-[#475569] flex-1">{item.label}</span>
                      <span className="font-mono text-[11px] font-bold text-[#0B132B]">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Notifications + Needs Attention (2 cols) ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Needs Attention */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <h2 className="font-bold text-sm text-[#0B132B]">Needs Attention</h2>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {needsAttention.length === 0 ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-[11px] font-mono font-bold text-[#94A3B8] uppercase">All clear!</p>
                </div>
              ) : (
                needsAttention.map((item: any) => (
                  <Link
                    key={item.type}
                    href={item.url || '/admin'}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${ATTENTION_BG[item.type] || 'bg-[#F7F4EC] border-[#D8D4C9]'}`}
                  >
                    <div className="shrink-0">{ATTENTION_ICONS[item.type] || <AlertCircle className="w-4 h-4" />}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#0B132B] leading-tight">{item.label}</p>
                    </div>
                    <span className="shrink-0 min-w-[22px] h-[22px] rounded-full bg-white border border-current text-[10px] font-bold flex items-center justify-center font-mono">
                      {item.count}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
            <h2 className="font-bold text-sm text-[#0B132B] mb-4">Quick Stats</h2>
            <div className="space-y-3">
              {[
                { label: 'Contacts', value: kpis.contacts ?? 0, icon: <Users className="w-3.5 h-3.5 text-[#94A3B8]" />, url: '/admin/contacts' },
                { label: 'Companies', value: kpis.companies ?? 0, icon: <Globe className="w-3.5 h-3.5 text-[#94A3B8]" />, url: '/admin/companies' },
              ].map(item => (
                <Link key={item.label} href={item.url} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#F7F4EC] transition-colors">
                  {item.icon}
                  <span className="text-[12px] text-[#475569] flex-1">{item.label}</span>
                  <span className="font-mono text-[13px] font-black text-[#0B132B]">{item.value}</span>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#F1EDE4]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Email Service</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-mono font-bold text-amber-700">NOT CONNECTED</span>
              </div>
              <p className="text-[10px] text-[#94A3B8] mt-1">Configure SMTP to enable outbound email.</p>
              <Link href="/admin/settings" className="text-[10px] font-bold font-mono text-[#1463FF] hover:text-[#004AD6] mt-1 inline-flex items-center gap-0.5">
                Configure <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
