'use client';

import React from 'react';
import { GitBranch, ArrowRight, Eye, Clock } from 'lucide-react';

export default function VisitorJourneysPage() {
  const journeys = [
    { id: 'j1', visitor: 'Visitor #842 (Mumbai 🇮🇳)', pages: ['/', '/work', '/work/daarayn', '/start-a-system'], time: '4m 12s', intent: 'HIGH' },
    { id: 'j2', visitor: 'Visitor #841 (San Francisco 🇺🇸)', pages: ['/', '/what-we-do', '/what-we-do/ai-intelligence', '/start-a-system'], time: '3m 45s', intent: 'HIGH' },
    { id: 'j3', visitor: 'Visitor #839 (London 🇬🇧)', pages: ['/', '/work', '/work/neominds', '/contact'], time: '2m 18s', intent: 'MEDIUM' },
    { id: 'j4', visitor: 'Visitor #838 (Dubai 🇦🇪)', pages: ['/', '/industries', '/work', '/start-a-system'], time: '5m 02s', intent: 'HIGH' },
    { id: 'j5', visitor: 'Visitor #835 (Singapore 🇸🇬)', pages: ['/', '/about'], time: '0m 35s', intent: 'LOW' },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Visitor Journeys
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Sequential path analysis tracking how visitors navigate through pages before converting.</p>
      </div>

      <div className="space-y-4">
        {journeys.map((j) => (
          <div key={j.id} className="bg-white rounded-xl border border-[#E8E4DC] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-[#0B132B]">{j.visitor}</span>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-[#64748B]">Duration: {j.time}</span>
                <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                  j.intent === 'HIGH' ? 'bg-rose-100 text-rose-700' : j.intent === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-[#F7F4EC] text-[#64748B]'
                }`}>
                  {j.intent} INTENT
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-[#F1EDE4]">
              {j.pages.map((p, i) => (
                <React.Fragment key={i}>
                  <span className="font-mono text-xs font-bold text-[#1463FF] bg-[#EDF4FF] border border-[#1463FF]/20 px-2.5 py-1 rounded-lg">
                    {p}
                  </span>
                  {i < j.pages.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8]" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
