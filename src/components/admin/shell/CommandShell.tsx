'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { storeAdminKey, clearAdminSession } from '@/lib/admin-auth';
import AdminSidebar from './AdminSidebar';
import KeystoneLogo from '@/components/brand/KeystoneLogo';
import AdminTopbar from './AdminTopbar';

// Keystone logo inline
function KeystoneMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
      <path d="M4 28L10 8h12l6 20H4z" fill="#1463FF" opacity="0.12" />
      <path d="M4 28L10 8h12l6 20" stroke="#1463FF" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <path d="M9 18h14" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface CommandShellProps {
  children: React.ReactNode;
}

export default function CommandShell({ children }: CommandShellProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [passcode, setPasscode] = useState('arklintech2026');
  const [authError, setAuthError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [sidebarData, setSidebarData] = useState({ inboxUnread: 0, followupsOverdue: 0, leadsNew: 0, unreadNotifications: 0 });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


  const fetchSidebarData = useCallback(async (key: string) => {
    try {
      const res = await fetch(`/api/admin/stats?key=${encodeURIComponent(key)}`);
      if (res.ok) {
        const data = await res.json();
        setSidebarData({
          inboxUnread: data.kpis?.conversations ?? 0,
          followupsOverdue: data.followups?.counts?.overdue ?? 0,
          leadsNew: data.kpis?.leads ?? 0,
          unreadNotifications: data.kpis?.unreadNotifications ?? 0,
        });
      }
    } catch {}
  }, []);

  const authenticate = useCallback(async (key: string) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`/api/admin/stats?key=${encodeURIComponent(key)}`, { cache: 'no-store' });
      if (res.ok) {
        storeAdminKey(key);
        setAdminKey(key);
        setIsAuthenticated(true);
        const data = await res.json();
        setSidebarData({
          inboxUnread: data.kpis?.conversations ?? 0,
          followupsOverdue: data.followups?.counts?.overdue ?? 0,
          leadsNew: data.kpis?.leads ?? 0,
          unreadNotifications: data.kpis?.unreadNotifications ?? 0,
        });
      } else if (res.status === 401) {
        setAuthError('Access denied: Invalid administrator passcode.');
      } else {
        setAuthError('Server response error. Please try again.');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setAuthError('Connection error. Please refresh the page and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-login from session or default admin passcode
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? sessionStorage.getItem('ark_admin_pass') : null;
    const keyToUse = saved || 'arklintech2026';
    authenticate(keyToUse).finally(() => setInitializing(false));
  }, [authenticate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) { setAuthError('Enter your administrator passcode.'); return; }
    await authenticate(passcode.trim());
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setAdminKey('');
    setPasscode('');
  };

  // ── Initializing ─────────────────────────────────────────────────────────────
  if (initializing) {
    return (
      <div className="min-h-screen bg-[#F7F4EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#1463FF] border-t-transparent animate-spin" />
          <span className="font-mono text-xs font-bold text-[#94A3B8] uppercase tracking-widest">INITIALIZING</span>
        </div>
      </div>
    );
  }

  // ── Login Screen ──────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center p-4">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #0B132B 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="relative w-full max-w-sm">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-[#D8D4C9] shadow-xl shadow-black/5 p-8">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center text-center mb-6">
              <KeystoneLogo size="md" />
              <div className="font-mono text-[9px] font-bold text-[#1463FF] uppercase tracking-widest mt-3 bg-[#EDF4FF] border border-[#1463FF]/20 px-2.5 py-0.5 rounded-full">
                ADMINISTRATIVE COMMAND PLATFORM
              </div>
            </div>

            <p className="text-[13px] text-[#475569] leading-relaxed mb-6">
              Internal operating platform. Enter your administrator passcode to access the command interface.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#64748B] font-bold block mb-1.5">
                  SECURITY PASSCODE
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter passcode"
                    className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl pl-9 pr-10 py-3 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-2 focus:ring-[#1463FF]/10 transition-all font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {authError && (
                  <p className="mt-2 text-xs text-rose-600 font-medium">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1463FF] hover:bg-[#004AD6] disabled:opacity-60 text-white font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-md shadow-[#1463FF]/20"
              >
                {loading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AUTHENTICATE &amp; ENTER</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] text-[#64748B]">PASSCODE:</span>
                <button
                  type="button"
                  onClick={() => setPasscode('arklintech2026')}
                  className="font-mono text-[9px] font-bold text-[#1463FF] bg-[#EDF4FF] hover:bg-[#1463FF] hover:text-white px-2 py-0.5 rounded transition-all"
                >
                  arklintech2026
                </button>
              </div>
              <span className="font-mono text-[9px] text-[#94A3B8]">v1.0</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Authenticated Shell ───────────────────────────────────────────────────────
  return (
    <div className="h-screen w-full bg-[#F7F4EC] flex overflow-hidden">
      <AdminSidebar
        inboxUnread={sidebarData.inboxUnread}
        followupsOverdue={sidebarData.followupsOverdue}
        leadsNew={sidebarData.leadsNew}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminTopbar
          unreadNotifications={sidebarData.unreadNotifications}
          adminKey={adminKey}
          onLogout={handleLogout}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        {/* Page content — inject adminKey via context or prop drilling */}
        <main className="flex-1 overflow-y-auto min-h-0 relative">
          {/* Provide adminKey via data attribute so pages can pick it up */}
          <div data-admin-key={adminKey} className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
