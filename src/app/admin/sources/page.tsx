'use client';

import React from 'react';
import { Globe, ArrowUpRight, Search, Share2, Link as LinkIcon } from 'lucide-react';

export default function SourcesPage() {
  const sources = [
    { channel: 'Organic Search', category: 'Search Engines', visits: 6220, leads: 104, convRate: '1.67%', trend: '+14.2%', icon: <Search className="w-4 h-4 text-[#1463FF]" /> },
    { channel: 'Direct Traffic', category: 'Direct Bookmarks / URLs', visits: 3550, leads: 68, convRate: '1.91%', trend: '+8.6%', icon: <Globe className="w-4 h-4 text-emerald-500" /> },
    { channel: 'Referral Networks', category: 'Partner & Industry Sites', visits: 2680, leads: 42, convRate: '1.56%', trend: '+22.4%', icon: <LinkIcon className="w-4 h-4 text-violet-500" /> },
    { channel: 'LinkedIn & Social', category: 'Social Media', visits: 1640, leads: 22, convRate: '1.34%', trend: '+5.1%', icon: <Share2 className="w-4 h-4 text-amber-500" /> },
    { channel: 'Email Campaigns', category: 'Newsletter', visits: 730, leads: 14, convRate: '1.91%', trend: '+12.0%', icon: <Globe className="w-4 h-4 text-sky-500" /> },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Traffic Sources
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Channel performance, visitor volume, and inbound lead generation rates.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC]">
          <h2 className="font-bold text-sm text-[#0B132B]">Acquisition Channels</h2>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
              {['Channel', 'Category', 'Visits', 'Leads Generated', 'Conv. Rate', 'Growth'].map((h) => (
                <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8F5F0]">
            {sources.map((src) => (
              <tr key={src.channel} className="hover:bg-[#FDFBF7] transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center">
                      {src.icon}
                    </div>
                    <span className="font-semibold text-xs text-[#0B132B]">{src.channel}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-[#64748B]">{src.category}</td>
                <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#0B132B]">{src.visits.toLocaleString()}</td>
                <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#1463FF]">{src.leads}</td>
                <td className="px-4 py-3.5 font-mono text-xs text-[#0B132B]">{src.convRate}</td>
                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-0.5 text-xs font-mono font-bold text-emerald-600">
                    <ArrowUpRight className="w-3.5 h-3.5" /> {src.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
