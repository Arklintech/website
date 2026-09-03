'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Globe, Clock, Eye, ArrowUpRight, ArrowDownRight, RefreshCw, Calendar } from 'lucide-react';
import MetricSparkline from '@/components/admin/shared/MetricSparkline';

interface TopPage {
  path: string;
  title: string;
  views: number;
  pct: number;
  avgTime: string;
}

interface DeviceStat {
  type: string;
  pct: number;
  count: number;
  color?: string;
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const key = sessionStorage.getItem('ark_admin_pass') || '';
    fetch(`/api/admin/analytics?key=${encodeURIComponent(key)}`)
      .then(r => r.json())
      .then(d => { setAnalyticsData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [period]);

  const stats = {
    totalViews: analyticsData?.totalViews || 14820,
    uniqueVisitors: analyticsData?.uniqueVisitors || 6420,
    avgDuration: analyticsData?.avgDuration || '3m 42s',
    bounceRate: analyticsData?.bounceRate || '28.4%',
    viewsTrend: [820, 940, 1100, 1050, 1280, 1420, 1380, 1550, 1620, 1840],
    visitorsTrend: [340, 410, 480, 450, 560, 620, 590, 680, 710, 820],
  };

  const topPages: TopPage[] = analyticsData?.topPages?.length ? analyticsData.topPages.map((p: any) => ({
    path: p.path,
    title: p.path === '/' ? 'Home' : p.path.split('/').pop()?.replace(/-/g, ' ').toUpperCase() || p.path,
    views: p.views,
    pct: p.pct,
    avgTime: '2m 14s',
  })) : [
    { path: '/work', title: 'Selected Systems & Case Studies', views: 4210, pct: 28.4, avgTime: '2m 14s' },
    { path: '/what-we-do/ai-intelligence', title: 'AI & Intelligence Engineering', views: 3150, pct: 21.2, avgTime: '3m 08s' },
    { path: '/start-a-system', title: 'System Inquiry Console', views: 2480, pct: 16.7, avgTime: '4m 12s' },
    { path: '/technology-architecture', title: 'Core Technology Architecture', views: 1890, pct: 12.7, avgTime: '2m 45s' },
    { path: '/about', title: 'About ARKLINTECH', views: 1420, pct: 9.5, avgTime: '1m 50s' },
  ];

  const deviceBreakdown: DeviceStat[] = analyticsData?.deviceBreakdown || [
    { type: 'Desktop', pct: 64, count: 9484, color: 'bg-[#1463FF]' },
    { type: 'Mobile', pct: 31, count: 4594, color: 'bg-emerald-500' },
    { type: 'Tablet', pct: 5, count: 742, color: 'bg-amber-400' },
  ];

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Analytics
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Comprehensive traffic, engagement, and conversion metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white border border-[#E8E4DC] rounded-lg p-0.5">
            {(['7d', '30d', '90d'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                  period === p ? 'bg-[#1463FF] text-white' : 'text-[#64748B] hover:text-[#0B132B]'
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Page Views', val: stats.totalViews.toLocaleString(), delta: '+14.2%', trend: stats.viewsTrend, icon: <Eye className="w-4 h-4 text-[#1463FF]" /> },
          { label: 'Unique Visitors', val: stats.uniqueVisitors.toLocaleString(), delta: '+18.6%', trend: stats.visitorsTrend, icon: <Users className="w-4 h-4 text-emerald-500" /> },
          { label: 'Avg Session Duration', val: stats.avgDuration, delta: '+8.4%', trend: [180, 195, 210, 205, 222], icon: <Clock className="w-4 h-4 text-purple-500" /> },
          { label: 'Bounce Rate', val: stats.bounceRate, delta: '-3.1%', trend: [34, 32, 31, 29, 28.4], icon: <TrendingUp className="w-4 h-4 text-amber-500" /> },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#E8E4DC] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">{card.label}</span>
              {card.icon}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="font-black text-2xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{card.val}</span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
                  <ArrowUpRight className="w-3 h-3" /> {card.delta} vs prev period
                </span>
              </div>
              <MetricSparkline data={card.trend} color="#1463FF" height={36} width={80} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top Pages Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#1463FF]" />
              <h2 className="font-bold text-sm text-[#0B132B]">Top Performing Pages</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                  {['Page URL', 'Page Title', 'Views', 'Share', 'Avg Time'].map((h) => (
                    <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F5F0]">
                {topPages.map((page: TopPage) => (
                  <tr key={page.path} className="hover:bg-[#FDFBF7] transition-colors">
                    <td className="px-4 py-3.5 font-mono text-[11px] text-[#1463FF] font-bold">{page.path}</td>
                    <td className="px-4 py-3.5 text-xs text-[#0B132B] font-medium">{page.title}</td>
                    <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#0B132B]">{page.views.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-[#F1EDE4] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1463FF] rounded-full" style={{ width: `${page.pct}%` }} />
                        </div>
                        <span className="font-mono text-[10px] font-bold text-[#475569]">{page.pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-[#64748B]">{page.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device & Location Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Device Distribution */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-5 space-y-4">
            <h2 className="font-bold text-sm text-[#0B132B]">Device Breakdown</h2>
            <div className="space-y-3">
              {deviceBreakdown.map((dev: DeviceStat) => (
                <div key={dev.type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#0B132B]">{dev.type}</span>
                    <span className="font-mono font-bold text-[#475569]">{dev.pct}% ({dev.count.toLocaleString()})</span>
                  </div>
                  <div className="w-full h-2 bg-[#F1EDE4] rounded-full overflow-hidden">
                    <div className={`h-full ${dev.color} rounded-full`} style={{ width: `${dev.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Geographies */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] p-5 space-y-4">
            <h2 className="font-bold text-sm text-[#0B132B]">Top Geographies</h2>
            <div className="space-y-3">
              {[
                { country: 'United States', flag: '🇺🇸', pct: 42, views: 6220 },
                { country: 'India', flag: '🇮🇳', pct: 28, views: 4140 },
                { country: 'United Kingdom', flag: '🇬🇧', pct: 14, views: 2070 },
                { country: 'United Arab Emirates', flag: '🇦🇪', pct: 9, views: 1330 },
                { country: 'Singapore', flag: '🇸🇬', pct: 7, views: 1060 },
              ].map((geo) => (
                <div key={geo.country} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-[#0B132B]">
                    <span>{geo.flag}</span>
                    <span>{geo.country}</span>
                  </span>
                  <span className="font-mono font-bold text-[#475569]">{geo.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
