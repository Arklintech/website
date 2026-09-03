'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, Key, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function SecurityPage() {
  const [passcode, setPasscode] = useState('arklintech2026');
  const [showPass, setShowPass] = useState(false);
  const [saved, setSaved] = useState(false);

  const auditLogs = [
    { event: 'Super Admin Login', ip: '127.0.0.1', ts: '2 minutes ago', status: 'SUCCESS' },
    { event: 'Passcode Verified', ip: '127.0.0.1', ts: '15 minutes ago', status: 'SUCCESS' },
    { event: 'API Telemetry Sync', ip: '127.0.0.1', ts: '1 hour ago', status: 'SUCCESS' },
  ];

  return (
    <div className="p-6 max-w-[1200px] mx-auto space-y-6">
      <div>
        <h1 className="font-black text-2xl text-[#0B132B] tracking-tight" style={{ fontFamily: "'Syncopate', sans-serif" }}>
          Security & Audit
        </h1>
        <p className="text-sm text-[#64748B] mt-0.5">Authentication controls, security passcodes, and active access logs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Passcode Config (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-xl border border-[#E8E4DC] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-[#1463FF]" />
            <h2 className="font-bold text-sm text-[#0B132B]">Administrator Passcode</h2>
          </div>
          <p className="text-xs text-[#64748B]">This passcode is used to authenticate administrative sessions.</p>
          <div className="space-y-3">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl pl-3 pr-10 py-2.5 text-sm text-[#0B132B] font-mono focus:outline-none focus:border-[#1463FF]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              className="w-full bg-[#1463FF] text-white text-xs font-mono font-bold py-2.5 rounded-xl hover:bg-[#004AD6] flex items-center justify-center gap-1.5"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>PASSCODE SAVED</span>
                </>
              ) : (
                <span>UPDATE PASSCODE</span>
              )}
            </button>
          </div>
        </div>

        {/* Audit Log (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-xl border border-[#E8E4DC] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E8E4DC]">
            <h2 className="font-bold text-sm text-[#0B132B]">Security Audit Trail</h2>
          </div>
          <div className="divide-y divide-[#F1EDE4]">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="px-5 py-3.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#0B132B]">{log.event}</p>
                  <p className="font-mono text-[10px] text-[#94A3B8]">IP: {log.ip}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {log.status}
                  </span>
                  <p className="font-mono text-[10px] text-[#94A3B8] mt-0.5">{log.ts}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
