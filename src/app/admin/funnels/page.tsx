'use client';

import React, { useState } from 'react';
import { Filter, ArrowDown, Zap, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';

export default function FunnelsPage() {
  const [funnel, setFunnel] = useState([
    { stage: 'Website Visitors', count: 14820, pct: 100, dropoff: '0%', color: 'bg-[#1463FF]' },
    { stage: 'Inquiry Modal Opened', count: 3410, pct: 23.0, dropoff: '77.0%', color: 'bg-indigo-500' },
    { stage: 'Form Submitted (Lead Created)', count: 240, pct: 1.62, dropoff: '92.9%', color: 'bg-amber-500' },
    { stage: 'Discovery Meeting Qualified', count: 86, pct: 0.58, dropoff: '64.1%', color: 'bg-violet-500' },
    { stage: 'Proposal Delivered', count: 42, pct: 0.28, dropoff: '51.1%', color: 'bg-[#0052E0]' },
    { stage: 'System Contract Won', count: 18, pct: 0.12, dropoff: '57.1%', color: 'bg-emerald-500' },
  ]);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Conversion Funnels
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Visualize visitor journey drop-off and lead conversion efficiency.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Overall Conversion</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>1.62%</div>
          <span className="text-[11px] font-bold text-emerald-600">Visitor → Lead</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Lead Win Rate</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>7.50%</div>
          <span className="text-[11px] font-bold text-emerald-600">Lead → Won Contract</span>
        </div>
        <div className="bg-white rounded-xl border border-[#E8E4DC] p-5">
          <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">Avg Deal Velocity</span>
          <div className="font-black text-2xl text-[#0B132B] mt-1" style={{ fontFamily: "'Syncopate', sans-serif" }}>14 Days</div>
          <span className="text-[11px] font-bold text-[#64748B]">Inquiry to Signed System</span>
        </div>
      </div>

      {/* Visual Funnel Stack */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-[#E8E4DC] pb-4">
          <Filter className="w-4 h-4 text-[#1463FF]" />
          <h2 className="font-bold text-sm text-[#0B132B]">Primary System Acquisition Funnel</h2>
        </div>

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
                    <div className={`h-full ${step.color} rounded-lg transition-all`} style={{ width: `${Math.max(step.pct, 4)}%` }} />
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
      </div>
    </div>
  );
}
