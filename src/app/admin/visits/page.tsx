'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Globe, Clock, RefreshCw } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';
import { IntentDot } from '@/components/admin/shared/StatusBadge';

function formatDuration(s: number) { return `${Math.floor(s / 60)}m ${s % 60}s`; }

export default function VisitsPage() {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadVisits = () => {
    fetchAdmin('/api/admin/visitors')
      .then(r => r.json())
      .then(d => {
        setVisits(Array.isArray(d?.data) ? d.data : []);
        setLoading(false);
      })
      .catch(() => {
        setVisits([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadVisits();
  }, []);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Visits Log
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Historical record of all website visitor sessions from Google Sheets & telemetry.</p>
        </div>
        <button
          onClick={loadVisits}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>REFRESH</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
          <h2 className="font-bold text-sm text-[#0B132B]">Session Log ({visits.length})</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="font-mono text-xs text-[#94A3B8]">Loading visit records...</span>
          </div>
        ) : visits.length === 0 ? (
          <div className="p-12 text-center">
            <Activity className="w-8 h-8 text-[#D8D4C9] mx-auto mb-2" />
            <p className="font-bold text-sm text-[#0B132B]">No visits recorded yet</p>
            <p className="text-xs text-[#94A3B8] mt-1">Website sessions will automatically be logged here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  {['Session ID', 'Location', 'Landing Page', 'Pages', 'Duration', 'Source', 'Intent', 'First Seen'].map((h) => (
                    <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {visits.map((v) => (
                  <tr key={v.id} className="hover:bg-[#FDFBF7] transition-colors text-xs">
                    <td className="px-4 py-3.5 font-mono font-bold text-[#1463FF]">{v.sessionId ? v.sessionId.slice(-8) : v.id.slice(-8)}</td>
                    <td className="px-4 py-3.5 text-[#0B132B] font-medium">{v.country || '🌍'} {v.location || 'Unknown'}</td>
                    <td className="px-4 py-3.5 font-mono text-[#64748B]">{v.currentPage || v.landingPage || '/'}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-[#0B132B]">{(v.pagesVisited || []).length || 1}</td>
                    <td className="px-4 py-3.5 font-mono text-[#64748B]">{formatDuration(v.durationSeconds || 0)}</td>
                    <td className="px-4 py-3.5 text-[#64748B]">{v.source || 'Direct'}</td>
                    <td className="px-4 py-3.5"><IntentDot intent={v.intent || 'LOW'} /></td>
                    <td className="px-4 py-3.5 font-mono text-[#94A3B8]">{new Date(v.firstSeen || v.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
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
