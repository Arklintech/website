'use client';

import React from 'react';
import { TrendingUp, Zap, Users, DollarSign } from 'lucide-react';
import MetricSparkline from '@/components/admin/shared/MetricSparkline';

export default function TrendsPage() {
  const trends = [
    { title: 'Lead Velocity Growth', val: '+34.2%', desc: 'Week over week increase in qualified inbound inquiries', data: [12, 14, 18, 22, 21, 28, 35, 42], color: '#1463FF' },
    { title: 'System Acquisition Rate', val: '2.4x', desc: 'Acceleration in contract sign-off speed', data: [1.1, 1.3, 1.5, 1.8, 2.0, 2.4], color: '#10B981' },
    { title: 'Visitor Re-engagement', val: '41.8%', desc: 'Return visitor rate within 14 days', data: [28, 31, 35, 38, 40, 41.8], color: '#8B5CF6' },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Performance Trends
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Historical trajectory and growth velocity across key system metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((t) => (
          <div key={t.title} className="bg-white rounded-xl border border-[#E8E4DC] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">{t.title}</span>
              <TrendingUp className="w-4 h-4 text-[#1463FF]" />
            </div>
            <div>
              <span className="font-black text-3xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{t.val}</span>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{t.desc}</p>
            </div>
            <div className="pt-2 border-t border-[#F1EDE4]">
              <MetricSparkline data={t.data} color={t.color} height={48} width={280} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
