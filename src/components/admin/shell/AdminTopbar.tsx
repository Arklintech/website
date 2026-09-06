'use client';

import React, { useState } from 'react';
import { Search, Bell, HelpCircle, ChevronDown, LogOut, ExternalLink, Menu } from 'lucide-react';
import { logoutAdmin } from '@/lib/admin-client';
import NotificationPanel from './NotificationPanel';

interface AdminTopbarProps {
  unreadNotifications?: number;
  adminKey: string;
  onLogout: () => void;
  onToggleMobileSidebar?: () => void;
}

export default function AdminTopbar({ unreadNotifications = 0, adminKey, onLogout, onToggleMobileSidebar }: AdminTopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    onLogout();
  };

  return (
    <>
      <header className="h-14 bg-white border-b border-[#E8E4DC] flex items-center gap-3 px-3 sm:px-5 sticky top-0 z-10">
        {/* Mobile menu button */}
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-[#475569] hover:bg-[#F7F4EC] hover:text-[#0B132B] transition-all"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search */}
        <div className="flex-1 max-w-[180px] sm:max-w-[480px] min-w-[100px] relative">
          <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#F7F4EC] border border-[#E8E4DC] rounded-lg pl-8 sm:pl-9 pr-2 sm:pr-14 py-1.5 sm:py-2 text-xs sm:text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-1 focus:ring-[#1463FF]/20 transition-all"
          />
          <span className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[9px] font-bold text-[#94A3B8] bg-[#E8E4DC] px-1.5 py-0.5 rounded">
            ⌘K
          </span>
        </div>

        <div className="flex-1 min-w-[8px]" />

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-[#475569] hover:bg-[#F7F4EC] hover:text-[#0B132B] transition-all"
          >
            <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 min-w-[15px] h-3.5 sm:h-4 rounded-full bg-[#1463FF] text-white text-[8px] sm:text-[9px] font-bold font-mono flex items-center justify-center px-1 leading-none">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </button>

          {/* Help */}
          <button className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-[#475569] hover:bg-[#F7F4EC] hover:text-[#0B132B] transition-all">
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* View Site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2 sm:px-3 h-7 sm:h-8 rounded-lg border border-[#E8E4DC] text-[10px] sm:text-[11px] font-bold font-mono text-[#475569] hover:border-[#1463FF] hover:text-[#1463FF] transition-all"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden xs:inline sm:inline">SITE</span>
          </a>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-lg hover:bg-[#F7F4EC] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-[#1463FF] text-white flex items-center justify-center text-[11px] font-bold">
                A
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[12px] font-bold text-[#0B132B] leading-tight">Anas Ahmed Khan</div>
                <div className="font-mono text-[9px] text-[#64748B] leading-tight">Super Admin</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-11 w-48 bg-white border border-[#E8E4DC] rounded-xl shadow-lg shadow-black/10 z-50 overflow-hidden">
                <div className="p-3 border-b border-[#E8E4DC]">
                  <div className="text-[12px] font-bold text-[#0B132B]">Anas Ahmed Khan</div>
                  <div className="font-mono text-[9px] text-[#64748B]">work@arklintech.com</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-[12px] text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="font-medium">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Notifications Panel Overlay */}
      {showNotifications && (
        <NotificationPanel
          adminKey={adminKey}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* Backdrop */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => { setShowNotifications(false); setShowUserMenu(false); }}
        />
      )}
    </>
  );
}
