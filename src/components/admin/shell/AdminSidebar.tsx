'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, Inbox, BookUser, Building2, CalendarCheck,
  Radio, Activity, GitBranch, BarChart3, TrendingUp, Filter,
  Globe, FileBarChart2, UserCog, ShieldCheck, Lock, Settings,
  ChevronRight, Zap
} from 'lucide-react';

import KeystoneLogo from '@/components/brand/KeystoneLogo';
function KeystoneMark({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 28L10 8h12l6 20H4z" fill="#1463FF" opacity="0.15" />
      <path d="M4 28L10 8h12l6 20" stroke="#1463FF" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <path d="M9 18h14" stroke="#1463FF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | null;
  isLive?: boolean;
}

interface NavSection {
  section: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  inboxUnread?: number;
  followupsOverdue?: number;
  leadsNew?: number;
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

const NAV: NavSection[] = [
  {
    section: 'OVERVIEW',
    items: [
      { href: '/admin/command-center', label: 'Command Center', icon: <LayoutDashboard className="w-4 h-4" /> },
    ],
  },
  {
    section: 'BUSINESS',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: <Zap className="w-4 h-4" /> },
      { href: '/admin/inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" /> },
      { href: '/admin/contacts', label: 'Contacts', icon: <BookUser className="w-4 h-4" /> },
      { href: '/admin/companies', label: 'Companies', icon: <Building2 className="w-4 h-4" /> },
      { href: '/admin/follow-ups', label: 'Follow-ups', icon: <CalendarCheck className="w-4 h-4" /> },
    ],
  },
  {
    section: 'VISITS',
    items: [
      { href: '/admin/live-visitors', label: 'Live Visitors', icon: <Radio className="w-4 h-4" />, isLive: true },
      { href: '/admin/visits', label: 'Visits', icon: <Activity className="w-4 h-4" /> },
      { href: '/admin/visitor-journeys', label: 'Visitor Journeys', icon: <GitBranch className="w-4 h-4" /> },
    ],
  },
  {
    section: 'INTELLIGENCE',
    items: [
      { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { href: '/admin/funnels', label: 'Funnels', icon: <Filter className="w-4 h-4" /> },
      { href: '/admin/sources', label: 'Sources', icon: <Globe className="w-4 h-4" /> },
      { href: '/admin/trends', label: 'Trends', icon: <TrendingUp className="w-4 h-4" /> },
      { href: '/admin/reports', label: 'Reports', icon: <FileBarChart2 className="w-4 h-4" /> },
    ],
  },
  {
    section: 'CONTROL',
    items: [
      { href: '/admin/team', label: 'Team', icon: <UserCog className="w-4 h-4" /> },
      { href: '/admin/roles', label: 'Roles & Permissions', icon: <ShieldCheck className="w-4 h-4" /> },
      { href: '/admin/security', label: 'Security', icon: <Lock className="w-4 h-4" /> },
      { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    ],
  },
];

export default function AdminSidebar({
  inboxUnread = 0,
  followupsOverdue = 0,
  leadsNew = 0,
  isMobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const getBadge = (href: string): number | null => {
    if (href === '/admin/leads' && leadsNew > 0) return leadsNew;
    if (href === '/admin/inbox' && inboxUnread > 0) return inboxUnread;
    if (href === '/admin/follow-ups' && followupsOverdue > 0) return followupsOverdue;
    return null;
  };

  const isActive = (href: string) => pathname === href || (href !== '/admin' && pathname.startsWith(href));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#E8E4DC] flex items-center justify-between">
        <KeystoneLogo size="sm" href="/admin/command-center" />
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1 rounded-lg text-[#64748B] hover:bg-[#F5F1E8]"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3" style={{ scrollbarWidth: 'none' }}>
        {NAV.map((section) => (
          <div key={section.section} className="mb-4">
            <div className="px-2 mb-1">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">
                {section.section}
              </span>
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const badge = getBadge(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => onCloseMobile?.()}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all group ${
                      active
                        ? 'bg-[#EDF4FF] text-[#1463FF]'
                        : 'text-[#475569] hover:bg-[#F5F1E8] hover:text-[#0B132B]'
                    }`}
                  >
                    <span className={`shrink-0 ${active ? 'text-[#1463FF]' : 'text-[#94A3B8] group-hover:text-[#0B132B]'}`}>
                      {item.icon}
                    </span>
                    <span className="flex-1 truncate text-[12.5px]">{item.label}</span>
                    {item.isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    )}
                    {badge !== null && badge > 0 && (
                      <span className="shrink-0 min-w-[18px] h-[18px] rounded-full bg-[#1463FF] text-white font-mono text-[9px] font-bold flex items-center justify-center px-1">
                        {badge > 99 ? '99+' : badge}
                      </span>
                    )}
                    {active && !badge && !item.isLive && (
                      <ChevronRight className="w-3 h-3 shrink-0 text-[#1463FF]" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#E8E4DC]">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-6 h-6 rounded-full bg-[#1463FF] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            A
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-[#0B132B] truncate">Super Admin</div>
            <div className="font-mono text-[9px] text-[#94A3B8] truncate">ARKLINTECH</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-[220px] shrink-0 h-screen sticky top-0 hidden md:flex flex-col bg-white border-r border-[#E8E4DC] z-20 overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="relative w-[260px] max-w-[80vw] h-full bg-white border-r border-[#E8E4DC] shadow-2xl flex flex-col z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
