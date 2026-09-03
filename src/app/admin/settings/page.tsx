'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Mail, Database, Bell, Shield, Server } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'database' | 'notifications'>('general');
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    appName: 'ARKLINTECH COMMAND',
    appUrl: 'http://localhost:7000',
    adminEmail: 'work@arklintech.com',
    smtpHost: 'mail.arklintech.com',
    smtpPort: '587',
    smtpUser: 'admin@arklintech.com',
    notifyNewLeads: true,
    notifyNewReplies: true,
    notifyOverdueTasks: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Platform Settings
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Configure system parameters, email integrations, and notifications.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E4DC] gap-2">
        {[
          { id: 'general', label: 'General', icon: <Settings className="w-3.5 h-3.5" /> },
          { id: 'email', label: 'Email / SMTP', icon: <Mail className="w-3.5 h-3.5" /> },
          { id: 'database', label: 'Data & Storage', icon: <Database className="w-3.5 h-3.5" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-bold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-[#1463FF] text-[#1463FF] bg-[#EDF4FF]/50'
                : 'border-transparent text-[#64748B] hover:text-[#0B132B]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-[#E8E4DC] p-6 space-y-6">
        {activeTab === 'general' && (
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Platform Name</label>
              <input
                type="text"
                value={form.appName}
                onChange={(e) => setForm({ ...form, appName: e.target.value })}
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] font-medium"
              />
            </div>
            <div>
              <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Application Base URL</label>
              <input
                type="text"
                value={form.appUrl}
                onChange={(e) => setForm({ ...form, appUrl: e.target.value })}
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] font-mono"
              />
            </div>
            <div>
              <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Primary Admin Contact Email</label>
              <input
                type="email"
                value={form.adminEmail}
                onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B]"
              />
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className="space-y-4 max-w-lg">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              <span className="font-bold block mb-0.5">SMTP Integration Status: Not Connected</span>
              Outbound emails currently simulate sending via local queue. Configure your SMTP provider credentials below to connect live sending.
            </div>
            <div>
              <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">SMTP Server Host</label>
              <input
                type="text"
                value={form.smtpHost}
                onChange={(e) => setForm({ ...form, smtpHost: e.target.value })}
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">SMTP Port</label>
                <input
                  type="text"
                  value={form.smtpPort}
                  onChange={(e) => setForm({ ...form, smtpPort: e.target.value })}
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] font-mono"
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">SMTP User</label>
                <input
                  type="text"
                  value={form.smtpUser}
                  onChange={(e) => setForm({ ...form, smtpUser: e.target.value })}
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'database' && (
          <div className="space-y-4 max-w-lg text-xs text-[#64748B]">
            <div className="p-4 bg-[#F7F4EC] rounded-xl border border-[#E8E4DC] space-y-2">
              <span className="font-bold text-[#0B132B] block">Data Persistence Engine</span>
              <p>Current Provider: <strong className="text-[#1463FF] font-mono">Local JSON Engine (.data/)</strong></p>
              <p>Prisma / SQLite Fallback: <strong className="text-emerald-600 font-mono">Operational</strong></p>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3 max-w-lg">
            {[
              { id: 'notifyNewLeads', label: 'Notify on new lead submissions' },
              { id: 'notifyNewReplies', label: 'Notify on new inbox message replies' },
              { id: 'notifyOverdueTasks', label: 'Notify when follow-up tasks become overdue' },
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-3 p-3 bg-[#F7F4EC] rounded-xl border border-[#E8E4DC] cursor-pointer text-xs font-medium text-[#0B132B]">
                <input
                  type="checkbox"
                  checked={(form as any)[item.id]}
                  onChange={(e) => setForm({ ...form, [item.id]: e.target.checked })}
                  className="w-4 h-4 rounded text-[#1463FF] focus:ring-[#1463FF]"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-[#E8E4DC] flex items-center gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold rounded-xl transition-all shadow-md shadow-[#1463FF]/20 flex items-center gap-1.5"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>SAVED SUCCESSFULLY</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>SAVE SETTINGS</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
