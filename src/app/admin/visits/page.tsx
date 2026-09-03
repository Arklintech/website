'use client';

import React, { useState } from 'react';
import { Activity, Search, Eye, Clock, Globe } from 'lucide-react';

export default function VisitsPage() {
  const visits = [
    { id: 'v-101', ip: '103.21.124.8', location: 'Mumbai, India 🇮🇳', pages: 4, duration: '4m 45s', landing: '/', referrer: 'Google Organic', date: 'Just now' },
    { id: 'v-102', ip: '64.233.160.1', location: 'Mountain View, USA 🇺🇸', pages: 2, duration: '1m 12s', landing: '/start-a-system', referrer: 'Direct', date: '5m ago' },
    { id: 'v-103', ip: '185.220.101.4', location: 'London, UK 🇬🇧', pages: 3, duration: '2m 38s', landing: '/what-we-do/ai-intelligence', referrer: 'LinkedIn', date: '12m ago' },
    { id: 'v-104', ip: '91.218.114.2', location: 'Dubai, UAE 🇦🇪', pages: 5, duration: '6m 20s', landing: '/work/daarayn', referrer: 'Google Organic', date: '28m ago' },
    { id: 'v-105', ip: '202.166.192.3', location: 'Singapore 🇸🇬', pages: 1, duration: '0m 42s', landing: '/about', referrer: 'Direct', date: '45m ago' },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Visits Log
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Historical record of all website visitor sessions.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E8E4DC]">
          <h2 className="font-bold text-sm text-[#0B132B]">Session Log ({visits.length})</h2>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
              {['Session ID', 'Location', 'Landing Page', 'Pages', 'Duration', 'Referrer', 'Time'].map((h) => (
                <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8F5F0]">
            {visits.map((v) => (
              <tr key={v.id} className="hover:bg-[#FDFBF7] transition-colors text-xs">
                <td className="px-4 py-3.5 font-mono font-bold text-[#1463FF]">{v.id}</td>
                <td className="px-4 py-3.5 text-[#0B132B] font-medium">{v.location}</td>
                <td className="px-4 py-3.5 font-mono text-[#64748B]">{v.landing}</td>
                <td className="px-4 py-3.5 font-mono font-bold text-[#0B132B]">{v.pages}</td>
                <td className="px-4 py-3.5 font-mono text-[#64748B]">{v.duration}</td>
                <td className="px-4 py-3.5 text-[#64748B]">{v.referrer}</td>
                <td className="px-4 py-3.5 font-mono text-[#94A3B8]">{v.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
