'use client';

import React, { useState, useEffect } from 'react';
import { Filter, ArrowDown, Zap, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';

export default function FunnelsPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  const loadStats = () => {
    fetchAdmin('/api/admin/stats')
      .then(r => r.json())
      .then(d => {
        setStats(d);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const kpis = stats?.kpis || {};
  const pipeline = stats?.pipeline || [];

  const visitorsCount = kpis.visitorsToday || 0;
  const inquiriesCount = kpis.inquiries || 0;
  const leadsCount = kpis.leads || 0;
  const qualifiedCount = pipeline.find((p: any) => p.stage === 'QUALIFIED')?.count || 0;
  const proposalCount = pipeline.find((p: any) => p.stage === 'PROPOSAL')?.count || 0;
  const wonCount = pipeline.find((p: any) => p.stage === 'WON')?.count || 0;

  const funnel = [
    { stage: 'Website Visitors (Today)', count: visitorsCount, color: 'bg-[#1463FF]' },
    { stage: 'Inquiries Captured', count: inquiriesCount, color: 'bg-indigo-500' },
    { stage: 'Leads Created', count: leadsCount, color: 'bg-amber-500' },
    { stage: 'Qualified Pipeline', count: qualifiedCount, color: 'bg-violet-500' },
    { stage: 'Proposal Delivered', count: proposalCount, color: 'bg-[#0052E0]' },
    { stage: 'System Contracts Won', count: wonCount, color: 'bg-emerald-500' },
  ].map((step, idx, arr) => {
    const base = arr[0].count || 1;
    const pct = arr[0].count > 0 ? parseFloat(((step.count / base) * 100).toFixed(1)) : 0;
    const prev = idx > 0 ? arr[idx - 1].count : step.count;
    const dropoff = prev > 0 ? `${((1 - step.count / prev) * 100).toFixed(1)}%` : '0%';
    return { ...step, pct, dropoff };
  });

  const overallConversion = visitorsCount > 0 ? ((leadsCount / visitorsCount) * 100).toFixed(2) : '0.00';
  const leadWinRate = leadsCount > 0 ? ((wonCount / leadsCount) * 100).toFixed(2) : '0.00';

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Conversion Funnels
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Real-time visitor journey drop-off and lead conversion efficiency derived from Google Sheets & telemetry.</p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>REFRESH</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Overall Conversion</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>{overallConversion}%</div>
          <span className="text-[11px] font-bold text-emerald-600">Visitor → Lead</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Lead Win Rate</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>{leadWinRate}%</div>
          <span className="text-[11px] font-bold text-emerald-600">Lead → Won Contract</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Total Active Leads</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>{leadsCount}</div>
          <span className="text-[11px] font-bold text-[#64748B]">Operating Inbound Pipeline</span>
        </div>
      </div>

      {/* Visual Funnel Stack */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E8E4DC] pb-4">
          <Filter className="w-4 h-4 text-[#1463FF]" />
          <h2 className="font-bold text-sm text-[#0B132B]">Primary System Acquisition Funnel</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="font-mono text-xs text-[#94A3B8]">Loading funnel metrics...</span>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto py-4">
            {funnel.map((step, idx) => (
              <React.Fragment key={step.stage}>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/20 flex items-center justify-center font-mono font-bold text-xs text-[#1463FF] shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0B132B]">{step.stage}</span>
                      <span className="font-mono font-bold text-[#0B132B]">{step.count.toLocaleString()} ({step.pct}%)</span>
                    </div>
                    <div className="w-full h-8 bg-[#F7F4EC] rounded-xl p-1 relative overflow-hidden">
                      <div className={`h-full ${step.color} rounded-lg transition-all`} style={{ width: `${Math.max(step.pct, step.count > 0 ? 6 : 0)}%` }} />
                    </div>
                  </div>
                </div>
                {idx < funnel.length - 1 && (
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono font-bold text-[#94A3B8]">
                    <ArrowDown className="w-3.5 h-3.5 text-[#1463FF]" />
                    <span>{step.dropoff} drop-off to next stage</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
