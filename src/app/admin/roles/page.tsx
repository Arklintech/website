'use client';

import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

export default function RolesPage() {
  const roles = [
    { name: 'Super Admin', desc: 'Full root access to all system data, telemetry, and settings.' },
    { name: 'Sales Lead', desc: 'Manage leads, pipeline stages, contacts, and conversations.' },
    { name: 'Developer', desc: 'Access system health, API telemetry, and visitor sessions.' },
    { name: 'Viewer', desc: 'Read-only access to metrics and reports.' },
  ];

  const permissions = [
    { name: 'View Command Center KPIs', superAdmin: true, sales: true, dev: true, viewer: true },
    { name: 'Manage Leads & Pipeline', superAdmin: true, sales: true, dev: false, viewer: false },
    { name: 'Access Inbox & Reply', superAdmin: true, sales: true, dev: false, viewer: false },
    { name: 'View Telemetry & Health', superAdmin: true, sales: false, dev: true, viewer: false },
    { name: 'Manage Security & Firebase Auth', superAdmin: true, sales: false, dev: false, viewer: false },
    { name: 'Export Reports', superAdmin: true, sales: true, dev: true, viewer: true },
  ];

  return (
    <div className="p-3.5 sm:p-6 max-w-[1200px] mx-auto space-y-5 sm:space-y-6">
      <div>
        <h1 className="font-black text-xl sm:text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Roles & Permissions
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">Role-based access matrix and permission boundaries.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[550px]">
            <thead>
              <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
                <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase whitespace-nowrap">Permission</th>
                <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#1463FF] uppercase text-center whitespace-nowrap">Super Admin</th>
                <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-center whitespace-nowrap">Sales Lead</th>
                <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-center whitespace-nowrap">Developer</th>
                <th className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase text-center whitespace-nowrap">Viewer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F5F0]">
              {permissions.map((p) => (
                <tr key={p.name} className="hover:bg-[#FDFBF7] transition-colors text-xs">
                  <td className="px-4 py-3.5 font-medium text-[#0B132B] whitespace-nowrap">{p.name}</td>
                  <td className="px-4 py-3.5 text-center">{p.superAdmin ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-[#D8D4C9] mx-auto" />}</td>
                  <td className="px-4 py-3.5 text-center">{p.sales ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-[#D8D4C9] mx-auto" />}</td>
                  <td className="px-4 py-3.5 text-center">{p.dev ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-[#D8D4C9] mx-auto" />}</td>
                  <td className="px-4 py-3.5 text-center">{p.viewer ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-[#D8D4C9] mx-auto" />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
