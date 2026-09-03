'use client';

import React, { useState, useEffect } from 'react';
import { Inbox, MessageSquare, Search, ArrowRight, User, Clock } from 'lucide-react';
import { StatusBadge } from '@/components/admin/shared/StatusBadge';
import type { ConversationRecord, MessageRecord } from '@/lib/admin-db';

function timeAgo(ts: string): string {
  const d = Date.now() - new Date(ts).getTime();
  const m = Math.floor(d / 60000);
  if (m < 1) return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function InboxPage() {
  const [conversations, setConversations] = useState<ConversationRecord[]>([]);
  const [selected, setSelected] = useState<ConversationRecord | null>(null);
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  useEffect(() => {
    const key = sessionStorage.getItem('ark_admin_pass') || '';
    fetch(`/api/admin/conversations?key=${encodeURIComponent(key)}`)
      .then(r => r.json())
      .then(d => { setConversations(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const openConversation = async (conv: ConversationRecord) => {
    setSelected(conv);
    const key = sessionStorage.getItem('ark_admin_pass') || '';
    const res = await fetch(`/api/admin/conversations/${conv.id}?key=${encodeURIComponent(key)}`);
    if (res.ok) {
      const d = await res.json();
      setMessages(d.messages || []);
    }
  };

  const sendReply = async () => {
    if (!selected || !replyBody.trim()) return;
    setSendingReply(true);
    const key = sessionStorage.getItem('ark_admin_pass') || '';
    const res = await fetch(`/api/admin/messages?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        conversationId: selected.id,
        body: replyBody,
        direction: 'OUTBOUND',
        isInternal: false,
        from: 'admin@arklintech.com',
      }),
    });
    if (res.ok) {
      const d = await res.json();
      setMessages(prev => [...prev, d.data]);
      setReplyBody('');
    }
    setSendingReply(false);
  };

  const DEMO_CONVS: any[] = [
    { id: 'c1', subject: 'Re: Automation System Proposal', status: 'OPEN', unreadCount: 2, lastMessageAt: new Date(Date.now() - 300000).toISOString(), contactId: null, updatedAt: new Date(Date.now() - 300000).toISOString(), createdAt: new Date(Date.now() - 86400000).toISOString(), leadId: null, companyId: null, assigneeId: null },
    { id: 'c2', subject: 'ERP Platform Query', status: 'WAITING_FOR_THEM', unreadCount: 0, lastMessageAt: new Date(Date.now() - 3600000).toISOString(), contactId: null, updatedAt: new Date(Date.now() - 3600000).toISOString(), createdAt: new Date(Date.now() - 172800000).toISOString(), leadId: null, companyId: null, assigneeId: null },
    { id: 'c3', subject: 'Healthcare Platform Discussion', status: 'OPEN', unreadCount: 1, lastMessageAt: new Date(Date.now() - 7200000).toISOString(), contactId: null, updatedAt: new Date(Date.now() - 7200000).toISOString(), createdAt: new Date(Date.now() - 259200000).toISOString(), leadId: null, companyId: null, assigneeId: null },
  ];

  const displayConvs = conversations.length > 0 ? conversations : DEMO_CONVS;

  return (
    <div className="h-[calc(100vh-56px)] min-h-[500px] flex overflow-hidden">
      {/* Left: Conversation List */}
      <div className={`w-full md:w-[320px] shrink-0 border-r border-[#E8E4DC] bg-white flex-col ${selected ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-[#E8E4DC]">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-bold text-sm text-[#0B132B]">Inbox</h1>
            <span className="font-mono text-[9px] font-bold text-[#94A3B8] bg-[#F7F4EC] px-2 py-0.5 rounded-full">
              {displayConvs.filter((c: any) => c.unreadCount > 0).length} UNREAD
            </span>
          </div>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#F7F4EC] border border-[#E8E4DC] rounded-lg pl-9 pr-3 py-2 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#F1EDE4]">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-[#1463FF] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : displayConvs.map((conv: any) => (
            <button
              key={conv.id}
              onClick={() => openConversation(conv)}
              className={`w-full text-left px-4 py-3.5 transition-all hover:bg-[#FDFBF7] ${selected?.id === conv.id ? 'bg-[#EDF4FF]' : ''}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center text-[#1463FF] font-bold text-[11px] shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`font-semibold text-[12px] truncate ${conv.unreadCount > 0 ? 'text-[#0B132B]' : 'text-[#475569]'}`}>
                      {conv.subject || `Conversation ${conv.id.slice(-4)}`}
                    </span>
                    <span className="font-mono text-[9px] text-[#94A3B8] whitespace-nowrap">{timeAgo(conv.lastMessageAt || conv.updatedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <StatusBadge status={conv.status} />
                    {conv.unreadCount > 0 && (
                      <span className="min-w-[18px] h-[18px] rounded-full bg-[#1463FF] text-white text-[9px] font-bold font-mono flex items-center justify-center px-1">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Middle: Thread */}
      <div className={`flex-1 flex flex-col min-w-0 ${!selected ? 'hidden md:flex' : 'flex'}`}>
        {!selected ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-4">
              <Inbox className="w-12 h-12 text-[#D8D4C9] mx-auto mb-3" />
              <p className="font-bold text-[#475569]">Select a conversation</p>
              <p className="text-sm text-[#94A3B8] mt-1">Click a conversation to read and reply.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Thread Header */}
            <div className="px-4 md:px-6 py-4 border-b border-[#E8E4DC] bg-white flex items-center gap-3">
              <button
                onClick={() => setSelected(null)}
                className="md:hidden p-1.5 rounded-lg text-[#64748B] hover:bg-[#F5F1E8]"
                aria-label="Back to conversations"
              >
                ←
              </button>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-[#0B132B] truncate">{selected.subject || 'Conversation'}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <StatusBadge status={selected.status} />
                  <span className="font-mono text-[9px] text-[#94A3B8]">
                    {selected.assigneeId ? 'Assigned' : 'Unassigned'}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-8 h-8 text-[#D8D4C9] mx-auto mb-2" />
                  <p className="text-sm text-[#94A3B8] font-mono">No messages yet. Send the first reply below.</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex gap-3 ${msg.direction === 'OUTBOUND' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-[#EDF4FF] border border-[#1463FF]/15 flex items-center justify-center text-[#1463FF] font-bold text-[11px] shrink-0">
                      {msg.direction === 'OUTBOUND' ? 'A' : 'C'}
                    </div>
                    <div className={`max-w-[70%] ${msg.direction === 'OUTBOUND' ? 'items-end' : ''} flex flex-col gap-1`}>
                      {msg.isInternal && (
                        <span className="font-mono text-[9px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          INTERNAL NOTE
                        </span>
                      )}
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.direction === 'OUTBOUND'
                          ? 'bg-[#1463FF] text-white rounded-tr-sm'
                          : msg.isInternal
                            ? 'bg-amber-50 border border-amber-200 text-amber-900 rounded-tl-sm'
                            : 'bg-white border border-[#E8E4DC] text-[#0B132B] rounded-tl-sm'
                      }`}>
                        {msg.body}
                      </div>
                      <span className="font-mono text-[9px] text-[#94A3B8]">{timeAgo(msg.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-[#E8E4DC] bg-white">
              <div className="flex gap-3">
                <textarea
                  value={replyBody}
                  onChange={e => setReplyBody(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) sendReply(); }}
                  rows={3}
                  placeholder="Write a reply... (⌘+Enter to send)"
                  className="flex-1 bg-[#F7F4EC] border border-[#D8D4C9] rounded-xl px-4 py-3 text-sm text-[#0B132B] placeholder-[#94A3B8] focus:outline-none focus:border-[#1463FF] focus:ring-1 focus:ring-[#1463FF]/20 resize-none"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={sendReply}
                    disabled={sendingReply || !replyBody.trim()}
                    className="px-4 py-2 bg-[#1463FF] hover:bg-[#004AD6] text-white text-[11px] font-bold font-mono rounded-lg transition-all disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {sendingReply ? 'SENDING...' : 'SEND'} <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    className="px-4 py-2 border border-[#D8D4C9] text-[11px] font-bold font-mono rounded-lg text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 transition-all"
                    onClick={async () => {
                      const key = sessionStorage.getItem('ark_admin_pass') || '';
                      await fetch(`/api/admin/messages?key=${encodeURIComponent(key)}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ conversationId: selected.id, body: replyBody, direction: 'INTERNAL', isInternal: true }),
                      });
                    }}
                  >
                    NOTE
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right: Context Panel */}
      {selected && (
        <div className="w-[260px] shrink-0 border-l border-[#E8E4DC] bg-white overflow-y-auto">
          <div className="p-4 border-b border-[#E8E4DC]">
            <h3 className="font-bold text-sm text-[#0B132B]">Context</h3>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-2">CONVERSATION STATUS</span>
              <div className="space-y-1.5">
                {(['OPEN', 'WAITING_FOR_THEM', 'WAITING_FOR_US', 'SNOOZED', 'CLOSED'] as const).map(s => (
                  <button
                    key={s}
                    onClick={async () => {
                      const key = sessionStorage.getItem('ark_admin_pass') || '';
                      const res = await fetch(`/api/admin/conversations/${selected.id}?key=${encodeURIComponent(key)}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: s }),
                      });
                      if (res.ok) setSelected(prev => prev ? { ...prev, status: s } : null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      selected.status === s ? 'bg-[#EDF4FF] text-[#1463FF]' : 'text-[#475569] hover:bg-[#F7F4EC]'
                    }`}
                  >
                    {s.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-[#F1EDE4] pt-4">
              <span className="font-mono text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-2">METADATA</span>
              <div className="space-y-2">
                <div>
                  <span className="font-mono text-[8px] text-[#94A3B8] uppercase">ID</span>
                  <p className="font-mono text-[10px] text-[#475569] break-all">{selected.id}</p>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-[#94A3B8] uppercase">Created</span>
                  <p className="text-[11px] text-[#475569]">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
