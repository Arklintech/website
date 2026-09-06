'use client';

import React, { useState, useEffect } from 'react';
import { Globe, ArrowUpRight, Search, Share2, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';

export default function SourcesPage() {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSources = () => {
    fetchAdmin('/api/admin/stats')
      .then(r => r.json())
      .then(d => {
        setSources(Array.isArray(d?.topSources) ? d.topSources : []);
        setLoading(false);
      })
      .catch(() => {
        setSources([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSources();
  }, []);

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Traffic Sources
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Channel performance, visitor volume, and inbound acquisition from Google Sheets & telemetry.</p>
        </div>
        <button
          onClick={loadSources}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>REFRESH</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC]">
          <h2 className="font-bold text-sm text-[#0B132B]">Acquisition Channels</h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span className="font-mono text-xs text-[#94A3B8]">Loading channel sources...</span>
          </div>
        ) : sources.length === 0 ? (
          <div className="p-12 text-center">
            <Globe className="w-8 h-8 text-[#D8D4C9] mx-auto mb-2" />
            <p className="font-bold text-sm text-[#0B132B]">No traffic source data yet</p>
            <p className="text-xs text-[#94A3B8] mt-1">Traffic referrers will automatically be classified as sessions arrive.</p>
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                {['Channel', 'Visits', 'Share of Traffic'].map((h) => (
                  <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F5F0]">
              {sources.map((src) => (
                <tr key={src.source} className="hover:bg-[#FDFBF7] transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-[#1463FF]" />
                      </div>
                      <span className="font-semibold text-xs text-[#0B132B]">{src.source}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#0B132B]">{src.visits}</td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#1463FF]">{src.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
