'use client';

import React, { useEffect, useState } from 'react';
import { X, Bell, Zap, MessageSquare, Clock, AlertCircle, Mail, Users } from 'lucide-react';
import type { NotificationRecord, NotificationType } from '@/lib/admin-db';
import Link from 'next/link';

const NOTIF_ICONS: Record<NotificationType, React.ReactNode> = {
  NEW_LEAD: <Zap className="w-4 h-4 text-[#1463FF]" />,
  NEW_REPLY: <MessageSquare className="w-4 h-4 text-emerald-500" />,
  FOLLOW_UP_DUE: <Clock className="w-4 h-4 text-amber-500" />,
  FOLLOW_UP_OVERDUE: <AlertCircle className="w-4 h-4 text-rose-500" />,
  HIGH_INTENT_VISITOR: <Users className="w-4 h-4 text-purple-500" />,
  EMAIL_FAILED: <Mail className="w-4 h-4 text-rose-500" />,
  LEADS_WAITING: <Zap className="w-4 h-4 text-amber-500" />,
  UNASSIGNED_CONV: <MessageSquare className="w-4 h-4 text-amber-500" />,
  SYSTEM: <Bell className="w-4 h-4 text-[#64748B]" />,
};

const NOTIF_BG: Record<NotificationType, string> = {
  NEW_LEAD: 'bg-[#EDF4FF]',
  NEW_REPLY: 'bg-emerald-50',
  FOLLOW_UP_DUE: 'bg-amber-50',
  FOLLOW_UP_OVERDUE: 'bg-rose-50',
  HIGH_INTENT_VISITOR: 'bg-purple-50',
  EMAIL_FAILED: 'bg-rose-50',
  LEADS_WAITING: 'bg-amber-50',
  UNASSIGNED_CONV: 'bg-amber-50',
  SYSTEM: 'bg-[#F7F4EC]',
};

function timeAgo(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface NotificationPanelProps {
  adminKey: string;
  onClose: () => void;
}

export default function NotificationPanel({ adminKey, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [tab, setTab] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/notifications?key=${encodeURIComponent(adminKey)}`)
      .then(r => r.json())
      .then(d => { setNotifications(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [adminKey]);

  const markAllRead = async () => {
    await fetch(`/api/admin/notifications?key=${encodeURIComponent(adminKey)}`, { method: 'PATCH' });
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markRead = async (id: string) => {
    await fetch(`/api/admin/notifications?id=${id}&key=${encodeURIComponent(adminKey)}`, { method: 'PATCH' });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const displayed = tab === 'unread' ? notifications.filter(n => !n.isRead) : notifications;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed right-4 top-16 w-[380px] bg-white border border-[#E8E4DC] rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden flex flex-col max-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DC]">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0B132B]" />
          <span className="font-bold text-[#0B132B] text-sm">Notifications</span>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[11px] font-mono font-bold text-[#1463FF] hover:text-[#004AD6] transition-colors"
            >
              Mark all read
            </button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#F7F4EC] hover:text-[#0B132B] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E4DC]">
        {(['all', 'unread'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-[11px] font-bold font-mono uppercase tracking-wider transition-all ${
              tab === t
                ? 'text-[#1463FF] border-b-2 border-[#1463FF] bg-[#EDF4FF]/40'
                : 'text-[#94A3B8] hover:text-[#0B132B]'
            }`}
          >
            {t === 'all' ? `All (${notifications.length})` : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-[#94A3B8] text-xs font-mono">Loading...</div>
        ) : displayed.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-8 h-8 text-[#D8D4C9] mx-auto mb-2" />
            <p className="text-[#94A3B8] text-xs font-mono">No {tab === 'unread' ? 'unread ' : ''}notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1EDE4]">
            {displayed.map(notif => (
              <div
                key={notif.id}
                className={`flex gap-3 p-4 cursor-pointer transition-all hover:bg-[#F7F4EC] ${!notif.isRead ? 'bg-[#FDFBF7]' : ''}`}
                onClick={() => markRead(notif.id)}
              >
                <div className={`w-8 h-8 rounded-full ${NOTIF_BG[notif.type] || 'bg-[#F7F4EC]'} flex items-center justify-center shrink-0`}>
                  {NOTIF_ICONS[notif.type] || <Bell className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider block">
                        {notif.type.replace(/_/g, ' ')}
                      </span>
                      <p className="text-[12px] font-semibold text-[#0B132B] leading-tight mt-0.5">{notif.title}</p>
                      <p className="text-[11px] text-[#475569] leading-snug mt-0.5">{notif.body}</p>
                    </div>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#1463FF] shrink-0 mt-1" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-mono text-[#94A3B8]">{timeAgo(notif.createdAt)}</span>
                    {notif.actionUrl && notif.actionLabel && (
                      <Link
                        href={notif.actionUrl}
                        onClick={() => {
                          markRead(notif.id);
                          onClose();
                        }}
                        className="text-[10px] font-bold font-mono text-[#1463FF] hover:text-[#004AD6] transition-colors"
                      >
                        {notif.actionLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#E8E4DC] text-center">
        <Link href="/admin/settings" onClick={onClose} className="text-[11px] font-mono font-bold text-[#94A3B8] hover:text-[#1463FF] transition-colors">
          Notification settings →
        </Link>
      </div>
    </div>
  );
}
