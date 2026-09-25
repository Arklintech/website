'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Users, Inbox, BookUser, Building2, CalendarCheck,
  Radio, Activity, GitBranch, BarChart3, TrendingUp, Filter,
  Globe, FileBarChart2, UserCog, ShieldCheck, Lock, Settings,
  ChevronRight, Zap, Briefcase, Receipt, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';

import KeystoneLogo from '@/components/brand/KeystoneLogo';

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
  onToggleCollapse?: () => void;
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
    section: 'OPERATIONS',
    items: [
      { href: '/admin/projects', label: 'Projects', icon: <Briefcase className="w-4 h-4" /> },
      { href: '/admin/billing', label: 'Billing', icon: <Receipt className="w-4 h-4" /> },
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
  isCollapsed = false,
  onToggleCollapse,
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

  const sidebarContent = (collapsed: boolean) => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo / Collapse toggle header */}
      <div className={`border-b border-[#E8E4DC] flex items-center min-w-0 ${collapsed ? 'justify-center px-0 py-3.5' : 'px-3.5 py-3.5 justify-between'}`}>
        {!collapsed && (
          <div className="min-w-0 flex-1 overflow-hidden">
            <KeystoneLogo size="sm" href="/admin/command-center" />
          </div>
        )}

        {/* Desktop collapse toggle */}
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-[#94A3B8] hover:bg-[#F5F1E8] hover:text-[#1463FF] transition-all shrink-0 ${collapsed ? '' : 'ml-1'}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed
              ? <PanelLeftOpen className="w-4 h-4" />
              : <PanelLeftClose className="w-4 h-4" />
            }
          </button>
        )}

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 rounded-lg text-[#64748B] hover:bg-[#F5F1E8] shrink-0 ml-1"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2" style={{ scrollbarWidth: 'none' }}>
        {NAV.map((section) => (
          <div key={section.section} className={`mb-4`}>
            {/* Section label — hidden when collapsed */}
            {!collapsed && (
              <div className="px-2 mb-1">
                <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-[0.12em]">
                  {section.section}
                </span>
              </div>
            )}
            {/* Divider when collapsed */}
            {collapsed && (
              <div className="mx-auto w-5 border-t border-[#F1EDE4] mb-2" />
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const badge = getBadge(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={() => onCloseMobile?.()}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-all group ${
                      collapsed ? 'justify-center px-0 py-2.5 mx-auto w-10 h-10' : 'px-2.5 py-2'
                    } ${
                      active
                        ? 'bg-[#EDF4FF] text-[#1463FF]'
                        : 'text-[#475569] hover:bg-[#F5F1E8] hover:text-[#0B132B]'
                    }`}
                  >
                    {/* Icon */}
                    <span className={`shrink-0 relative ${active ? 'text-[#1463FF]' : 'text-[#94A3B8] group-hover:text-[#0B132B]'}`}>
                      {item.icon}
                      {/* Badge dot on icon when collapsed */}
                      {collapsed && badge !== null && badge > 0 && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1463FF] text-white font-mono text-[7px] font-bold flex items-center justify-center">
                          {badge > 9 ? '9+' : badge}
                        </span>
                      )}
                      {/* Live dot on icon when collapsed */}
                      {collapsed && item.isLive && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </span>

                    {/* Label + badges — only visible when expanded */}
                    {!collapsed && (
                      <>
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
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={`p-3 border-t border-[#E8E4DC] ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <div
            className="w-7 h-7 rounded-full bg-[#1463FF] text-white flex items-center justify-center text-[10px] font-bold shrink-0"
            title="Super Admin — ARKLINTECH"
          >
            A
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-6 h-6 rounded-full bg-[#1463FF] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              A
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-[#0B132B] truncate">Super Admin</div>
              <div className="font-mono text-[9px] text-[#94A3B8] truncate">ARKLINTECH</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar — animated width transition */}
      <aside
        className={`shrink-0 h-screen sticky top-0 hidden md:flex flex-col bg-white border-r border-[#E8E4DC] z-20 overflow-hidden transition-[width] duration-300 ease-in-out`}
        style={{ width: isCollapsed ? '64px' : '235px' }}
      >
        {sidebarContent(isCollapsed)}
      </aside>

      {/* Mobile Drawer Overlay — always expanded */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <aside className="relative w-[260px] max-w-[80vw] h-full bg-white border-r border-[#E8E4DC] shadow-2xl flex flex-col z-10">
            {sidebarContent(false)}
          </aside>
        </div>
      )}
    </>
  );
}
