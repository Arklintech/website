'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Lock, ShieldCheck, Eye, EyeOff, User } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { logoutAdmin } from '@/lib/admin-client';
import AdminSidebar from './AdminSidebar';
import KeystoneLogo from '@/components/brand/KeystoneLogo';
import AdminTopbar from './AdminTopbar';

interface CommandShellProps {
  children: React.ReactNode;
}

export default function CommandShell({ children }: CommandShellProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [sidebarData, setSidebarData] = useState({ inboxUnread: 0, followupsOverdue: 0, leadsNew: 0, unreadNotifications: 0 });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Authenticate session state via Firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const res = await fetch('/api/admin/stats', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            setAdminKey(token);
            setIsAuthenticated(true);
            const data = await res.json();
            setSidebarData({
              inboxUnread: data.kpis?.conversations ?? 0,
              followupsOverdue: data.followups?.counts?.overdue ?? 0,
              leadsNew: data.kpis?.leads ?? 0,
              unreadNotifications: data.kpis?.unreadNotifications ?? 0,
            });
          } else {
            await signOut(auth);
            setIsAuthenticated(false);
            setAdminKey('');
          }
        } catch (err) {
          console.error('Firebase session check error:', err);
          setIsAuthenticated(false);
          setAdminKey('');
        }
      } else {
        setIsAuthenticated(false);
        setAdminKey('');
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!username.trim() || !password.trim()) {
      setAuthError('Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const cleanUser = username.trim();
      const defaultAdminEmail = (process.env.NEXT_PUBLIC_ADMIN_AUTH_EMAIL || 'ahmedkhananas57@gmail.com').trim();
      const emailToUse = cleanUser.includes('@') ? cleanUser : defaultAdminEmail;

      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password.trim());
      const token = await userCredential.user.getIdToken();

      // 2. Verify COMMAND admin authorization server-side
      const verifyRes = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (verifyRes.status === 403) {
        await signOut(auth);
        setAuthError('This Firebase account is not authorized for COMMAND access.');
        setIsAuthenticated(false);
        return;
      }

      if (!verifyRes.ok) {
        await signOut(auth);
        setAuthError('Authentication verification failed. Please try again.');
        setIsAuthenticated(false);
        return;
      }

      // 3. Grant access
      setAdminKey(token);
      setIsAuthenticated(true);
      const data = await verifyRes.json();
      setSidebarData({
        inboxUnread: data.kpis?.conversations ?? 0,
        followupsOverdue: data.followups?.counts?.overdue ?? 0,
        leadsNew: data.kpis?.leads ?? 0,
        unreadNotifications: data.kpis?.unreadNotifications ?? 0,
      });
    } catch (err: any) {
      const errorCode = err?.code || '';
      if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/invalid-credential' ||
        errorCode === 'auth/user-not-found' ||
        errorCode === 'auth/invalid-email'
      ) {
        setAuthError('Invalid username or password. Access denied.');
      } else if (errorCode === 'auth/user-disabled') {
        setAuthError('This administrator account has been disabled.');
      } else if (errorCode === 'auth/too-many-requests') {
        setAuthError('Too many failed attempts. Please try again later.');
      } else if (errorCode === 'auth/network-request-failed') {
        setAuthError('Network error. Check your connection.');
      } else {
        setAuthError('Invalid username or password. Access denied.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setAdminKey('');
    setUsername('');
    setPassword('');
    setAuthError('');
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

  // ── Username + Password Login Screen ──────────────────────────────────────────
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

            <p className="text-[13px] text-[#475569] leading-relaxed mb-6 text-center">
              Internal operating platform. Enter your administrator username and password to access the command interface.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                  {authError}
                </div>
              )}

              {/* USERNAME FIELD */}
              <div>
                <label htmlFor="admin-username" className="font-mono text-[9px] uppercase tracking-widest text-[#64748B] font-bold block mb-1.5">
                  ADMINISTRATOR USERNAME
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username (e.g. admin)"
                    className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl pl-9 pr-3 py-3 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-2 focus:ring-[#1463FF]/10 transition-all font-mono"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label htmlFor="admin-password" className="font-mono text-[9px] uppercase tracking-widest text-[#64748B] font-bold block mb-1.5">
                  SECURITY PASSWORD
                </label>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="admin-password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl pl-9 pr-10 py-3 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-2 focus:ring-[#1463FF]/10 transition-all font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
                    aria-label={showPass ? 'Hide password' : 'Show password'}
                  >
                    {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
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
                    <span>SIGN IN TO COMMAND</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#1463FF]" />
                <span className="font-mono text-[9px] font-bold text-[#64748B]">FIREBASE AUTHENTICATED SESSION</span>
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
