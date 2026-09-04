'use client';

import React, { useState, useEffect } from 'react';
import { Building2, Plus, Search, Globe, Users, Calendar } from 'lucide-react';
import { getStoredAdminKey } from '@/lib/admin-auth';
import type { CompanyRecord } from '@/lib/admin-db';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getStoredAdminKey();
    fetch(`/api/admin/companies?key=${encodeURIComponent(key)}`)
      .then(r => r.json())
      .then(d => { setCompanies(Array.isArray(d?.data) ? d.data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = companies.filter(c => {
    if (!c) return false;
    const q = search.toLowerCase();
    const name = (c.name || '').toLowerCase();
    const industry = (c.industry || '').toLowerCase();
    return name.includes(q) || industry.includes(q);
  });


  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Companies</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{companies.length} total companies tracked</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] p-4 mb-5">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search companies by name or industry..."
            className="w-full bg-[#F7F4EC] border border-[#E8E4DC] rounded-lg pl-9 pr-4 py-2 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="font-mono text-xs text-[#94A3B8]">Loading companies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <Building2 className="w-12 h-12 text-[#D8D4C9] mx-auto mb-3" />
            <p className="font-bold text-[#0B132B] mb-1">No companies found</p>
            <p className="text-sm text-[#64748B]">Companies associated with incoming leads will automatically populate here.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1EDE4]">
            {filtered.map(c => (
              <div key={c.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#FDFBF7] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center text-[#1463FF] font-bold text-sm shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-[#0B132B]">{c.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#64748B] font-mono">
                    {c.industry && <span>{c.industry}</span>}
                    {c.website && (
                      <a href={c.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#1463FF] hover:underline">
                        <Globe className="w-3 h-3" /> {c.website}
                      </a>
                    )}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-[#94A3B8]">
                  {new Date(c.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
