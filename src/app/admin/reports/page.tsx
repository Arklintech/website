'use client';

import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);

  const reports = [
    { id: 'leads', title: 'Monthly Lead Generation & Pipeline Report', period: 'Real-time', format: 'CSV', size: 'Live Data' },
    { id: 'traffic', title: 'Website Traffic & Visitor Behavior Audit', period: 'Real-time', format: 'CSV', size: 'Live Data' },
    { id: 'contacts', title: 'Client Contacts & Company Roster', period: 'Real-time', format: 'CSV', size: 'Live Data' },
    { id: 'followups', title: 'Follow-up Task Completion & SLA Audit', period: 'Real-time', format: 'CSV', size: 'Live Data' },
  ];

  const handleDownload = async (id: string) => {
    setGenerating(id);
    const key = sessionStorage.getItem('ark_admin_pass') || '';
    
    try {
      let csvContent = '';
      let filename = `report_${id}_${new Date().toISOString().split('T')[0]}.csv`;

      if (id === 'leads') {
        const res = await fetch(`/api/admin/leads?key=${encodeURIComponent(key)}&limit=1000`);
        const data = await res.json();
        const leads = data.data || [];
        const headers = ['ID', 'Name', 'Email', 'Company', 'Industry', 'Service', 'Budget', 'Status', 'Priority', 'Created At'];
        const rows = leads.map((l: any) => [
          l.id, `"${l.name}"`, `"${l.email}"`, `"${l.company || ''}"`, `"${l.industry || ''}"`,
          `"${l.interest || l.projectType || ''}"`, `"${l.budget || ''}"`, l.status, l.priority, l.createdAt
        ]);
        csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
      } else if (id === 'contacts') {
        const res = await fetch(`/api/admin/contacts?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        const contacts = data.data || [];
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Company', 'Industry', 'Created At'];
        const rows = contacts.map((c: any) => [
          c.id, `"${c.name}"`, `"${c.email}"`, `"${c.phone || ''}"`, `"${c.company || ''}"`, `"${c.industry || ''}"`, c.createdAt
        ]);
        csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
      } else if (id === 'followups') {
        const res = await fetch(`/api/admin/followups?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        const followups = data.data || [];
        const headers = ['ID', 'Title', 'Due Date', 'Priority', 'Status', 'Owner', 'Created At'];
        const rows = followups.map((f: any) => [
          f.id, `"${f.title}"`, f.dueDate, f.priority, f.status, `"${f.owner || ''}"`, f.createdAt
        ]);
        csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
      } else {
        const res = await fetch(`/api/admin/visitors?key=${encodeURIComponent(key)}`);
        const data = await res.json();
        const visitors = data.data || [];
        const headers = ['ID', 'Session ID', 'Current Page', 'Pages Visited Count', 'Duration (s)', 'Intent', 'Device', 'First Seen'];
        const rows = visitors.map((v: any) => [
          v.id, v.sessionId, `"${v.currentPage || ''}"`, v.pagesVisited?.length || 0, v.durationSeconds || 0, v.intent, `"${v.device || ''}"`, v.firstSeen
        ]);
        csvContent = [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
      }

      // Trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to generate CSV export:', err);
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Reports Generator
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Export structured data reports in CSV format for audit and external record keeping.</p>
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
