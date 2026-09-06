'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Database, Bell, Shield, Server, RefreshCw } from 'lucide-react';
import { fetchAdmin } from '@/lib/admin-client';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'architecture' | 'notifications'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    appName: 'ARKLINTECH COMMAND',
    appUrl: 'http://localhost:7000',
    adminContactEmail: 'work@arklintech.com',
    notifyNewLeads: true,
    notifyNewInquiries: true,
    notifyOverdueTasks: true,
  });

  useEffect(() => {
    fetchAdmin('/api/admin/settings')
      .then(r => r.json())
      .then(d => {
        if (d?.data) {
          setForm({
            appName: d.data.appName || 'ARKLINTECH COMMAND',
            appUrl: d.data.appUrl || 'http://localhost:7000',
            adminContactEmail: d.data.adminContactEmail || 'work@arklintech.com',
            notifyNewLeads: d.data.notifyNewLeads !== 'false',
            notifyNewInquiries: d.data.notifyNewInquiries !== 'false',
            notifyOverdueTasks: d.data.notifyOverdueTasks !== 'false',
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetchAdmin('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appName: form.appName,
          appUrl: form.appUrl,
          adminContactEmail: form.adminContactEmail,
          notifyNewLeads: form.notifyNewLeads ? 'true' : 'false',
          notifyNewInquiries: form.notifyNewInquiries ? 'true' : 'false',
          notifyOverdueTasks: form.notifyOverdueTasks ? 'true' : 'false',
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const d = await res.json().catch(() => null);
        setError(d?.error || 'Failed to save settings to Google Sheets.');
      }
    } catch {
      setError('Connection error while saving settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Platform Settings
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Operational system parameters, data authorities, and notification preferences.</p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-800">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-[#E8E4DC] gap-2">
        {[
          { id: 'general', label: 'General', icon: <Settings className="w-3.5 h-3.5" /> },
          { id: 'architecture', label: 'System Architecture', icon: <Database className="w-3.5 h-3.5" /> },
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
      {loading ? (
        <div className="p-12 text-center bg-white rounded-xl border border-[#E8E4DC]">
          <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="font-mono text-xs text-[#94A3B8]">Loading platform settings...</span>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white rounded-xl border border-[#E8E4DC] p-6 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Platform Name</label>
                <input
                  type="text"
                  value={form.appName}
                  onChange={(e) => setForm({ ...form, appName: e.target.value })}
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] font-medium focus:outline-none focus:border-[#1463FF]"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Application Base URL</label>
                <input
                  type="text"
                  value={form.appUrl}
                  onChange={(e) => setForm({ ...form, appUrl: e.target.value })}
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] font-mono focus:outline-none focus:border-[#1463FF]"
                  required
                />
              </div>
              <div>
                <label className="font-mono text-[9px] font-bold text-[#64748B] uppercase block mb-1">Public Business Mailbox (Inquiries & Billing)</label>
                <input
                  type="email"
                  value={form.adminContactEmail}
                  onChange={(e) => setForm({ ...form, adminContactEmail: e.target.value })}
                  className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-3 py-2.5 text-sm text-[#0B132B] focus:outline-none focus:border-[#1463FF]"
                  required
                />
                <p className="text-[11px] text-[#64748B] mt-1">Inbound website inquiries and invoices are addressed to this mailbox. Outbound replies are handled manually from this address.</p>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4 max-w-xl text-xs">
              <div className="p-4 bg-[#F7F4EC] rounded-xl border border-[#E8E4DC] space-y-3">
                <span className="font-bold text-[#0B132B] text-sm block">Locked Operating Architecture</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-2">
                    <span className="text-[#64748B]">Primary Operational Store</span>
                    <strong className="text-[#0B132B] font-mono">Google Sheets (Multi-Tab)</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-2">
                    <span className="text-[#64748B]">Document & Invoice PDF Storage</span>
                    <strong className="text-[#0B132B] font-mono">Google Drive (Documents Folder)</strong>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-2">
                    <span className="text-[#64748B]">Admin Authentication Authority</span>
                    <strong className="text-[#1463FF] font-mono">Firebase Authentication (Bearer Tokens)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Offline / Fallback Cache</span>
                    <strong className="text-emerald-700 font-mono">Local Synchronized JSON Engine</strong>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8]">Changes to parameters are synced to the Google Sheets Settings tab upon saving.</p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-3 max-w-lg">
              {[
                { id: 'notifyNewLeads', label: 'Notify in Command Center on new lead submissions' },
                { id: 'notifyNewInquiries', label: 'Notify in tray on incoming website inquiries' },
                { id: 'notifyOverdueTasks', label: 'Flag overdue follow-up milestones & tasks in Needs Attention' },
              ].map((item) => (
                <label key={item.id} className="flex items-center gap-3 p-3.5 bg-[#F7F4EC] rounded-xl border border-[#E8E4DC] cursor-pointer text-xs font-medium text-[#0B132B]">
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
              disabled={saving}
              className="px-5 py-2.5 bg-[#1463FF] hover:bg-[#004AD6] text-white text-xs font-mono font-bold rounded-xl transition-all shadow-md shadow-[#1463FF]/20 flex items-center gap-1.5 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>SAVING TO SHEETS...</span>
                </>
              ) : saved ? (
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
      )}
    </div>
  );
}
