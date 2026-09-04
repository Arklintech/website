'use client';
import React, { useState, useEffect } from 'react';
import { BookUser, Plus, Search, Mail, Phone, Building2 } from 'lucide-react';

import { getStoredAdminKey } from '@/lib/admin-auth';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = getStoredAdminKey();
    fetch(`/api/admin/contacts?key=${encodeURIComponent(key)}`)
      .then(r => r.json()).then(d => { setContacts(Array.isArray(d?.data) ? d.data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = contacts.filter(c => {
    if (!c) return false;
    const q = search.toLowerCase();
    const name = (c.name || '').toLowerCase();
    const email = (c.email || '').toLowerCase();
    const company = (c.company || '').toLowerCase();
    return name.includes(q) || email.includes(q) || company.includes(q);
  });

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>Contacts</h1>
          <p className="text-sm text-[#64748B] mt-0.5">{contacts.length} total contacts</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono transition-all shadow-md shadow-[#1463FF]/20">
          <Plus className="w-3.5 h-3.5" /> ADD CONTACT
        </button>
      </div>
      <div className="bg-white rounded-xl border border-[#E8E4DC] p-4 mb-5">
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." className="w-full bg-[#F7F4EC] border border-[#E8E4DC] rounded-lg pl-9 pr-4 py-2 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] transition-all" />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        {loading ? (
          <div className="p-16 text-center"><div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <BookUser className="w-10 h-10 text-[#D8D4C9] mx-auto mb-3" />
            <p className="font-bold text-[#0B132B] mb-1">No contacts yet</p>
            <p className="text-sm text-[#64748B]">Contacts from leads and conversations will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1EDE4]">
            {filtered.map(c => (
              <div key={c.id || Math.random()} className="flex items-center gap-4 px-5 py-4 hover:bg-[#FDFBF7] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center text-[#1463FF] font-bold text-sm shrink-0">
                  {(c.name || 'C').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[13px] text-[#0B132B]">{c.name || 'Unnamed Contact'}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {c.email && <span className="flex items-center gap-1 text-[11px] text-[#64748B]"><Mail className="w-3 h-3" />{c.email}</span>}
                    {c.phone && <span className="flex items-center gap-1 text-[11px] text-[#64748B]"><Phone className="w-3 h-3" />{c.phone}</span>}
                    {c.company && <span className="flex items-center gap-1 text-[11px] text-[#64748B]"><Building2 className="w-3 h-3" />{c.company}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
