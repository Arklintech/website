'use client';

import React, { useState } from 'react';
import { FileBarChart2, Download, Calendar, CheckCircle2, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);

  const reports = [
    { id: 'leads', title: 'Monthly Lead Generation & Pipeline Report', period: 'August 2026', format: 'CSV / PDF', size: '2.4 MB' },
    { id: 'traffic', title: 'Website Traffic & Visitor Behavior Audit', period: 'Last 30 Days', format: 'CSV', size: '1.8 MB' },
    { id: 'conversion', title: 'System Conversion & Drop-off Analysis', period: 'Q3 2026', format: 'PDF', size: '4.1 MB' },
    { id: 'followups', title: 'Follow-up Task Completion & SLA Audit', period: 'August 2026', format: 'CSV', size: '840 KB' },
  ];

  const handleDownload = (id: string) => {
    setGenerating(id);
    setTimeout(() => {
      setGenerating(null);
      alert('Report exported successfully.');
    }, 1200);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Reports Generator
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Export structured data reports for business audits and performance reviews.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep) => (
          <div key={rep.id} className="bg-white rounded-xl border border-[#E8E4DC] p-5 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#EDF4FF] border border-[#1463FF]/20 flex items-center justify-center text-[#1463FF]">
                <FileText className="w-4.5 h-4.5" />
              </div>
              <h2 className="font-bold text-sm text-[#0B132B] leading-snug">{rep.title}</h2>
              <div className="flex items-center gap-3 text-xs text-[#64748B] font-mono">
                <span>{rep.period}</span>
                <span>•</span>
                <span>{rep.format}</span>
                <span>•</span>
                <span>{rep.size}</span>
              </div>
            </div>
            <button
              onClick={() => handleDownload(rep.id)}
              disabled={generating === rep.id}
              className="px-3.5 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 shrink-0"
            >
              {generating === rep.id ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>EXPORTING...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
