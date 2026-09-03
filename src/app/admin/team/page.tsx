'use client';

import React, { useState } from 'react';
import { UserCog, Plus, ShieldCheck, Mail, CheckCircle2, User } from 'lucide-react';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';

export default function TeamPage() {
  const [members, setMembers] = useState([
    { id: '1', name: 'Anas Ahmed Khan', email: 'work@arklintech.com', role: 'Super Admin', status: 'ACTIVE', lastActive: 'Just now' },
    { id: '2', name: 'System Automations', email: 'bot@arklintech.com', role: 'System Worker', status: 'ACTIVE', lastActive: '2m ago' },
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Admin');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setMembers((prev) => [
      ...prev,
      { id: Date.now().toString(), name: newEmail.split('@')[0], email: newEmail, role: newRole, status: 'INVITED', lastActive: 'Pending' },
    ]);
    setNewEmail('');
    setShowInviteModal(false);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
            Team Members
          </h1>
          <p className="text-sm text-[#64748B] mt-0.5">Manage administrative accounts and operational access.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono transition-all shadow-md shadow-[#1463FF]/20"
        >
          <Plus className="w-3.5 h-3.5" /> INVITE MEMBER
        </button>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#F1EDE4] bg-[#FDFBF7]">
              {['Member', 'Role', 'Status', 'Last Active'].map((h) => (
                <th key={h} className="px-4 py-3 font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8F5F0]">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-[#FDFBF7] transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center font-bold text-xs text-[#1463FF]">
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#0B132B]">{m.name}</p>
                      <p className="font-mono text-[10px] text-[#64748B]">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-mono text-[10px] font-bold text-[#1463FF] bg-[#EDF4FF] border border-[#1463FF]/20 px-2 py-0.5 rounded-full">
                    {m.role}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={m.status} />
                </td>
                <td className="px-4 py-3.5 font-mono text-xs text-[#64748B]">{m.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#D8D4C9] p-6 w-full max-w-md shadow-2xl space-y-4">
            <h2 className="font-black text-lg text-[#0B132B]" style={{ fontFamily: "'Syncopate', sans-serif" }}>Invite Team Member</h2>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="colleague@arklintech.com"
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                >
                  <option value="Admin">Admin</option>
                  <option value="Sales Manager">Sales Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-[#1463FF] text-white text-xs font-mono font-bold py-2.5 rounded-xl hover:bg-[#004AD6]">
                  SEND INVITATION
                </button>
                <button type="button" onClick={() => setShowInviteModal(false)} className="px-4 border border-[#D8D4C9] text-xs font-mono font-bold rounded-xl text-[#64748B]">
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
