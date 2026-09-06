'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Eye, MapPin, RefreshCw } from 'lucide-react';
import { IntentDot } from '@/components/admin/shared/StatusBadge';
import { fetchAdmin } from '@/lib/admin-client';

function formatDuration(s: number) { return `${Math.floor(s / 60)}m ${s % 60}s`; }

export default function LiveVisitorsPage() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVisitors = () => {
    fetchAdmin('/api/admin/visitors?active=true')
      .then(r => r.json())
      .then(d => {
        setVisitors(Array.isArray(d?.data) ? d.data : []);
        setLoading(false);
      })
      .catch(() => {
        setVisitors([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadVisitors();
    const t = setInterval(loadVisitors, 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Live Visitors</h1>
            <span className="flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{visitors.length} online
            </span>
          </div>
          <p className="text-sm text-[#64748B]">Real-time view of active website visitors. Auto-refreshes every 30s.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Active Now', value: visitors.length, icon: <Radio className="w-4 h-4 text-emerald-500" /> },
          { label: 'High Intent', value: visitors.filter(v => v.intent === 'HIGH').length, icon: <Eye className="w-4 h-4 text-[#1463FF]" /> },
          { label: 'Locations', value: Array.from(new Set(visitors.map(v => v.location || v.country))).filter(Boolean).length, icon: <MapPin className="w-4 h-4 text-amber-500" /> },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-xl border border-[#E8E4DC] p-4 flex items-center gap-3">
            {c.icon}
            <div>
              <span className="font-black text-2xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{c.value}</span>
              <p className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC]">
          <span className="font-bold text-sm text-[#0B132B]">Active Sessions</span>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="font-mono text-xs text-[#94A3B8]">Loading active visitors...</span>
          </div>
        ) : visitors.length === 0 ? (
          <div className="p-12 text-center">
            <Radio className="w-8 h-8 text-[#D8D4C9] mx-auto mb-2" />
            <p className="font-bold text-sm text-[#0B132B]">No active visitors right now</p>
            <p className="text-xs text-[#94A3B8] mt-1">Live sessions will automatically appear when visitors browse the public site.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  {['#', 'Location', 'Current Page', 'Pages', 'Duration', 'Source', 'Device', 'Intent'].map(h => (
                    <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {visitors.map((v, i) => (
                  <tr key={v.id || i} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="px-4 py-3.5 font-mono text-[11px] font-bold text-[#94A3B8]">{String(i + 1).padStart(2, '0')}</td>
                    <td className="px-4 py-3.5">
                      <span className="flex items-center gap-1.5 text-[12px] text-[#475569]">{v.country} {v.location || 'Unknown'}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[10px] text-[#1463FF] max-w-[180px] truncate">{v.currentPage || '/'}</td>
                    <td className="px-4 py-3.5 font-mono text-[11px] font-bold text-[#0B132B]">{(v.pagesVisited || []).length}</td>
                    <td className="px-4 py-3.5 font-mono text-[11px] text-[#475569]">{formatDuration(v.durationSeconds || 0)}</td>
                    <td className="px-4 py-3.5 text-[11px] text-[#475569]">{v.source || 'Direct'}</td>
                    <td className="px-4 py-3.5 text-[11px] text-[#475569]">{v.device || 'Desktop'}</td>
                    <td className="px-4 py-3.5"><IntentDot intent={v.intent || 'LOW'} /></td>
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
