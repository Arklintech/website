'use client';

import React, { useState, useEffect } from 'react';
import { GitBranch, ArrowRight, Eye, Clock, RefreshCw } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';

function formatDuration(s: number) { return `${Math.floor(s / 60)}m ${s % 60}s`; }

export default function VisitorJourneysPage() {
  const [journeys, setJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadJourneys = () => {
    fetchAdmin('/api/admin/visitors')
      .then(r => r.json())
      .then(d => {
        const raw = Array.isArray(d?.data) ? d.data : [];
        const filtered = raw.filter((v: any) => Array.isArray(v.pagesVisited) && v.pagesVisited.length > 1);
        setJourneys(filtered);
        setLoading(false);
      })
      .catch(() => {
        setJourneys([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadJourneys();
  }, []);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Visitor Journeys
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Sequential path analysis tracking how visitors navigate through pages before converting.</p>
        </div>
        <button
          onClick={loadJourneys}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>REFRESH</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E8E4DC]">
          <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="font-mono text-xs text-[#94A3B8]">Analyzing visitor journeys...</span>
        </div>
      ) : journeys.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E8E4DC]">
          <GitBranch className="w-8 h-8 text-[#D8D4C9] mx-auto mb-2" />
          <p className="font-bold text-sm text-[#0B132B]">No multi-page journeys recorded yet</p>
          <p className="text-xs text-[#94A3B8] mt-1">When visitors navigate multiple pages during a session, their sequential path will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {journeys.map((j, idx) => (
            <div key={j.id || idx} className="bg-white rounded-xl border border-[#E8E4DC] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#0B132B]">
                  Session {j.sessionId ? j.sessionId.slice(-6) : j.id.slice(-6)} ({j.country || '🌍'} {j.location || 'Unknown'})
                </span>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-[#64748B]">Duration: {formatDuration(j.durationSeconds || 0)}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                    j.intent === 'HIGH' ? 'bg-rose-100 text-rose-700' : j.intent === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-[#F7F4EC] text-[#64748B]'
                  }`}>
                    {j.intent || 'LOW'} INTENT
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#F1EDE4]">
                {(j.pagesVisited || []).map((p: string, i: number) => (
                  <React.Fragment key={i}>
                    <span className="font-mono text-xs font-bold text-[#1463FF] bg-[#EDF4FF] border border-[#1463FF]/20 px-2.5 py-1 rounded-lg">
                      {p}
                    </span>
                    {i < j.pagesVisited.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
