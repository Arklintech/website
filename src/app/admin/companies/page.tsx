'use client';
import React from 'react';
import { Building2, Plus } from 'lucide-react';

export default function CompaniesPage() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Companies</h1>
          <p className="text-sm text-[#64748B] mt-0.5">Track companies associated with your leads and contacts.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono transition-all shadow-md shadow-[#1463FF]/20">
          <Plus className="w-3.5 h-3.5" /> ADD COMPANY
        </button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-16 text-center">
        <Building2 className="w-12 h-12 text-[#D8D4C9] mx-auto mb-3" />
        <p className="font-bold text-[#0B132B] mb-1">No companies yet</p>
        <p className="text-sm text-[#64748B]">Companies associated with your leads will appear here.</p>
      </div>
    </div>
  );
}
