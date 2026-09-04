'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Edit2, Trash2, Plus, CheckCircle2, ArrowRight, Building2, Mail, Phone, Globe, MessageSquare, Calendar, Flag } from 'lucide-react';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import { getStoredAdminKey } from '@/lib/admin-auth';
import type { LeadRecord, LeadStatus, Priority } from '@/lib/admin-db';

const STAGES: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL', 'ACTIVE', 'WON', 'LOST'];

interface LeadDetailPageProps { params: { id: string } }

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  const [lead, setLead] = useState<LeadRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [notesValue, setNotesValue] = useState('');
  const [editingNotes, setEditingNotes] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    const key = getStoredAdminKey();
    fetch(`/api/admin/leads/${params.id}?key=${encodeURIComponent(key)}`)
      .then(r => r.json())
      .then(d => {
        setLead(d?.data || null);
        setNotesValue(d?.data?.notes || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const updateStatus = async (status: LeadStatus) => {
    const key = getStoredAdminKey();
    const res = await fetch(`/api/admin/leads/${params.id}?key=${encodeURIComponent(key)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) setLead(prev => prev ? { ...prev, status } : null);
  };

  const updatePriority = async (priority: Priority) => {
    const key = getStoredAdminKey();
    const res = await fetch(`/api/admin/leads/${params.id}?key=${encodeURIComponent(key)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priority }),
    });
    if (res.ok) setLead(prev => prev ? { ...prev, priority } : null);
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    const key = getStoredAdminKey();
    const res = await fetch(`/api/admin/leads/${params.id}?key=${encodeURIComponent(key)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: notesValue }),
    });
    if (res.ok) { setLead(prev => prev ? { ...prev, notes: notesValue } : null); setEditingNotes(false); }
    setSavingNotes(false);
  };


  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!lead) return (
    <div className="p-6 text-center">
      <p className="text-[#94A3B8]">Lead not found.</p>
      <Link href="/admin/leads" className="text-[#1463FF] text-sm font-mono font-bold mt-2 inline-block">← Back to Leads</Link>
    </div>
  );

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      {/* Back + Header */}
      <div className="mb-6">
        <Link href="/admin/leads" className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#64748B] hover:text-[#1463FF] transition-colors mb-3">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Leads
        </Link>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#EDF4FF] border border-[#1463FF]/20 flex items-center justify-center text-[#1463FF] font-black text-xl">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-black text-2xl text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>{lead.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <StatusBadge status={lead.status} size="md" />
                <span className="font-mono text-[9px] font-bold text-[#94A3B8]">
                  Added {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {lead.source && <span className="font-mono text-[9px] font-bold text-[#94A3B8]">via {lead.source}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D8D4C9] bg-white text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>NEW CONVERSATION</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 bg-rose-50 text-[11px] font-bold font-mono text-rose-600 hover:bg-rose-100 transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left — Main Detail */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {/* Pipeline Stage */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8E4DC]">
              <h2 className="font-bold text-sm text-[#0B132B]">Pipeline Stage</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-0">
                {STAGES.map((stage, i) => {
                  const isActive = lead.status === stage;
                  const isPassed = STAGES.indexOf(lead.status) > i;
                  return (
                    <React.Fragment key={stage}>
                      <button
                        onClick={() => updateStatus(stage)}
                        className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-center transition-all ${
                          isActive
                            ? 'bg-[#EDF4FF] text-[#1463FF]'
                            : isPassed && stage !== 'LOST'
                              ? 'text-[#94A3B8] hover:bg-[#F7F4EC]'
                              : 'text-[#D8D4C9] hover:bg-[#F7F4EC] hover:text-[#475569]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-[#1463FF] text-white' : isPassed && stage !== 'LOST' ? 'bg-[#D8D4C9] text-white' : 'border border-[#D8D4C9]'
                        }`}>
                          {isPassed && stage !== 'LOST' ? <CheckCircle2 className="w-3 h-3" /> : <span className="text-[8px] font-bold">{i + 1}</span>}
                        </div>
                        <span className="text-[8px] font-mono font-bold uppercase whitespace-nowrap">{stage.slice(0, 3)}</span>
                      </button>
                      {i < STAGES.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-0.5 min-w-[8px] ${isPassed && stage !== 'LOST' ? 'bg-[#D8D4C9]' : 'bg-[#F1EDE4]'}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Lead Info */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8E4DC]">
              <h2 className="font-bold text-sm text-[#0B132B]">Lead Information</h2>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              {[
                { label: 'Email', value: lead.email, icon: <Mail className="w-3.5 h-3.5" /> },
                { label: 'Phone', value: lead.phone, icon: <Phone className="w-3.5 h-3.5" /> },
                { label: 'Company', value: lead.company, icon: <Building2 className="w-3.5 h-3.5" /> },
                { label: 'Industry', value: lead.industry, icon: <Globe className="w-3.5 h-3.5" /> },
                { label: 'Budget', value: lead.budget, icon: <Flag className="w-3.5 h-3.5" /> },
                { label: 'Timeline', value: lead.timeline, icon: <Calendar className="w-3.5 h-3.5" /> },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1">
                    {item.icon} {item.label}
                  </span>
                  <span className="text-[13px] font-medium text-[#0B132B]">{item.value || <span className="text-[#D8D4C9]">—</span>}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Problem / Message */}
          {(lead.problem || lead.message) && (
            <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E8E4DC]">
                <h2 className="font-bold text-sm text-[#0B132B]">Problem Statement</h2>
              </div>
              <div className="p-5">
                <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-wrap">{lead.problem || lead.message}</p>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
              <h2 className="font-bold text-sm text-[#0B132B]">Internal Notes</h2>
              {!editingNotes && (
                <button onClick={() => setEditingNotes(true)} className="text-[10px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] flex items-center gap-1">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
              )}
            </div>
            <div className="p-5">
              {editingNotes ? (
                <div className="space-y-3">
                  <textarea
                    value={notesValue}
                    onChange={e => setNotesValue(e.target.value)}
                    rows={5}
                    className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-4 py-3 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-1 focus:ring-[#1463FF]/20 resize-none"
                    placeholder="Add internal notes about this lead..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button onClick={saveNotes} disabled={savingNotes} className="px-4 py-2 bg-[#1463FF] text-white text-[11px] font-bold font-mono rounded-lg hover:bg-[#004AD6] transition-all disabled:opacity-60">
                      {savingNotes ? 'SAVING...' : 'SAVE NOTES'}
                    </button>
                    <button onClick={() => { setEditingNotes(false); setNotesValue(lead.notes || ''); }} className="px-4 py-2 border border-[#D8D4C9] text-[11px] font-bold font-mono rounded-lg text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all">
                      CANCEL
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-[#475569] leading-relaxed whitespace-pre-wrap">
                  {lead.notes || <span className="text-[#D8D4C9]">No notes yet. Click Edit to add internal notes.</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right — Actions + Metadata */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Priority */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8E4DC]">
              <h2 className="font-bold text-sm text-[#0B132B]">Priority</h2>
            </div>
            <div className="p-4 flex gap-2">
              {(['HIGH', 'MEDIUM', 'LOW'] as Priority[]).map(p => (
                <button
                  key={p}
                  onClick={() => updatePriority(p)}
                  className={`flex-1 py-2 rounded-lg text-center font-mono text-[10px] font-bold uppercase transition-all ${
                    lead.priority === p
                      ? p === 'HIGH' ? 'bg-rose-100 text-rose-700 border-2 border-rose-300'
                        : p === 'MEDIUM' ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                        : 'bg-[#F1EDE4] text-[#64748B] border-2 border-[#D8D4C9]'
                      : 'border border-[#E8E4DC] text-[#94A3B8] hover:border-[#D8D4C9] hover:text-[#475569]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Follow-up */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8E4DC]">
              <h2 className="font-bold text-sm text-[#0B132B]">Schedule Follow-up</h2>
            </div>
            <div className="p-5 space-y-3">
              <input
                type="date"
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-lg px-3 py-2 text-sm text-[#0B132B] focus:outline-none focus:border-[#1463FF] transition-all"
              />
              <input
                type="text"
                placeholder="Follow-up note..."
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-lg px-3 py-2 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] transition-all"
              />
              <button className="w-full py-2.5 bg-[#1463FF] text-white text-[11px] font-bold font-mono rounded-lg hover:bg-[#004AD6] transition-all flex items-center justify-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> ADD FOLLOW-UP
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E8E4DC]">
              <h2 className="font-bold text-sm text-[#0B132B]">Metadata</h2>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: 'Lead ID', value: lead.id },
                { label: 'Created', value: new Date(lead.createdAt).toLocaleString() },
                { label: 'Updated', value: new Date(lead.updatedAt).toLocaleString() },
                { label: 'Source', value: lead.source || '—' },
                { label: 'Owner', value: lead.owner || 'Unassigned' },
              ].map(item => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase">{item.label}</span>
                  <span className="text-[11px] font-mono text-[#475569] break-all">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
