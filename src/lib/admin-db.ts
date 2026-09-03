// ARKLINTECH COMMAND — Extended Admin Database Layer
// Extends existing db.ts with new collections for the COMMAND platform
// V1: JSON flat-file storage — abstracted for Google Sheets / DB migration

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch {}
}

function readJSON<T>(filePath: string, defaultVal: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T[];
  } catch { return defaultVal; }
}

function writeJSON<T>(filePath: string, data: T[]): void {
  try { fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); } catch {}
}

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
}

// ─── Type Definitions ────────────────────────────────────────────────────────

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'DISCOVERY' | 'PROPOSAL' | 'ACTIVE' | 'WON' | 'LOST';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type ConversationStatus = 'OPEN' | 'WAITING_FOR_THEM' | 'WAITING_FOR_US' | 'SNOOZED' | 'CLOSED';
export type MessageDirection = 'INBOUND' | 'OUTBOUND' | 'INTERNAL';
export type EmailDeliveryStatus = 'QUEUED' | 'SENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'BOUNCED';
export type FollowUpStatus = 'OPEN' | 'SNOOZED' | 'COMPLETED';
export type NotificationType = 'NEW_LEAD' | 'NEW_REPLY' | 'FOLLOW_UP_DUE' | 'FOLLOW_UP_OVERDUE' | 'HIGH_INTENT_VISITOR' | 'EMAIL_FAILED' | 'LEADS_WAITING' | 'UNASSIGNED_CONV' | 'SYSTEM';
export type IntentLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  industry?: string | null;
  projectType?: string | null;
  interest?: string | null;
  budget?: string | null;
  timeline?: string | null;
  problem?: string | null;
  message?: string | null;
  source?: string | null;
  status: LeadStatus;
  owner?: string | null;
  priority: Priority;
  nextAction?: string | null;
  notes?: string | null;
  contactId?: string | null;
  companyId?: string | null;
  inquiryId?: string | null; // link to migrated inquiry
  createdAt: string;
  updatedAt: string;
}

export interface ContactRecord {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  industry?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  website?: string | null;
  industry?: string | null;
  size?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationRecord {
  id: string;
  subject?: string | null;
  status: ConversationStatus;
  assigneeId?: string | null;
  contactId?: string | null;
  leadId?: string | null;
  companyId?: string | null;
  lastMessageAt?: string | null;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  from?: string | null;
  to?: string | null;
  subject?: string | null;
  body: string;
  isInternal: boolean;
  emailMessageId?: string | null;
  deliveryStatus?: EmailDeliveryStatus | null;
  createdAt: string;
}

export interface FollowUpRecord {
  id: string;
  title: string;
  owner?: string | null;
  dueDate: string;
  priority: Priority;
  status: FollowUpStatus;
  leadId?: string | null;
  contactId?: string | null;
  companyId?: string | null;
  conversationId?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorRecord {
  id: string;
  sessionId: string;
  contactId?: string | null;
  firstSeen: string;
  lastSeen: string;
  device?: string | null;
  browser?: string | null;
  location?: string | null;
  country?: string | null;
  source?: string | null;
  landingPage?: string | null;
  currentPage?: string | null;
  pagesVisited: string[];
  durationSeconds: number;
  intent: IntentLevel;
  isActive: boolean;
}

export interface NotificationRecord {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  actionLabel?: string | null;
  actionUrl?: string | null;
  isRead: boolean;
  createdAt: string;
}

// ─── File Paths ───────────────────────────────────────────────────────────────

const FILES = {
  leads: path.join(DATA_DIR, 'leads.json'),
  contacts: path.join(DATA_DIR, 'contacts.json'),
  companies: path.join(DATA_DIR, 'companies.json'),
  conversations: path.join(DATA_DIR, 'conversations.json'),
  messages: path.join(DATA_DIR, 'messages.json'),
  followups: path.join(DATA_DIR, 'followups.json'),
  visitors: path.join(DATA_DIR, 'visitors.json'),
  notifications: path.join(DATA_DIR, 'notifications.json'),
};

// ─── Admin DB ─────────────────────────────────────────────────────────────────

export const adminDb = {
  leads: {
    findMany: async (opts?: { status?: LeadStatus; limit?: number; offset?: number }): Promise<LeadRecord[]> => {
      let records = readJSON<LeadRecord>(FILES.leads, []);
      if (opts?.status) records = records.filter(r => r.status === opts.status);
      records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const offset = opts?.offset ?? 0;
      const limit = opts?.limit ?? 100;
      return records.slice(offset, offset + limit);
    },
    findById: async (id: string): Promise<LeadRecord | null> =>
      readJSON<LeadRecord>(FILES.leads, []).find(r => r.id === id) ?? null,
    count: async (status?: LeadStatus): Promise<number> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      return status ? records.filter(r => r.status === status).length : records.length;
    },
    countByStatus: async (): Promise<Record<string, number>> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      const counts: Record<string, number> = {};
      for (const r of records) {
        counts[r.status] = (counts[r.status] || 0) + 1;
      }
      return counts;
    },
    create: async (data: Omit<LeadRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<LeadRecord> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      const now = new Date().toISOString();
      const record: LeadRecord = { ...data, id: uid('lead'), createdAt: now, updatedAt: now };
      records.unshift(record);
      writeJSON(FILES.leads, records);
      return record;
    },
    update: async (id: string, updates: Partial<LeadRecord>): Promise<LeadRecord | null> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.leads, records);
      return records[idx];
    },
    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      const filtered = records.filter(r => r.id !== id);
      if (filtered.length === records.length) return false;
      writeJSON(FILES.leads, filtered);
      return true;
    },
  },

  contacts: {
    findMany: async (limit = 100): Promise<ContactRecord[]> =>
      readJSON<ContactRecord>(FILES.contacts, []).slice(0, limit),
    findById: async (id: string): Promise<ContactRecord | null> =>
      readJSON<ContactRecord>(FILES.contacts, []).find(r => r.id === id) ?? null,
    findByEmail: async (email: string): Promise<ContactRecord | null> =>
      readJSON<ContactRecord>(FILES.contacts, []).find(r => r.email.toLowerCase() === email.toLowerCase()) ?? null,
    create: async (data: Omit<ContactRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactRecord> => {
      const records = readJSON<ContactRecord>(FILES.contacts, []);
      const now = new Date().toISOString();
      const record: ContactRecord = { ...data, id: uid('cnt'), createdAt: now, updatedAt: now };
      records.unshift(record);
      writeJSON(FILES.contacts, records);
      return record;
    },
    update: async (id: string, updates: Partial<ContactRecord>): Promise<ContactRecord | null> => {
      const records = readJSON<ContactRecord>(FILES.contacts, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.contacts, records);
      return records[idx];
    },
    count: async (): Promise<number> => readJSON<ContactRecord>(FILES.contacts, []).length,
  },

  companies: {
    findMany: async (limit = 100): Promise<CompanyRecord[]> =>
      readJSON<CompanyRecord>(FILES.companies, []).slice(0, limit),
    findById: async (id: string): Promise<CompanyRecord | null> =>
      readJSON<CompanyRecord>(FILES.companies, []).find(r => r.id === id) ?? null,
    create: async (data: Omit<CompanyRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<CompanyRecord> => {
      const records = readJSON<CompanyRecord>(FILES.companies, []);
      const now = new Date().toISOString();
      const record: CompanyRecord = { ...data, id: uid('cmp'), createdAt: now, updatedAt: now };
      records.unshift(record);
      writeJSON(FILES.companies, records);
      return record;
    },
    count: async (): Promise<number> => readJSON<CompanyRecord>(FILES.companies, []).length,
  },

  conversations: {
    findMany: async (opts?: { status?: ConversationStatus; limit?: number }): Promise<ConversationRecord[]> => {
      let records = readJSON<ConversationRecord>(FILES.conversations, []);
      if (opts?.status) records = records.filter(r => r.status === opts.status);
      records.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      return records.slice(0, opts?.limit ?? 100);
    },
    findById: async (id: string): Promise<ConversationRecord | null> =>
      readJSON<ConversationRecord>(FILES.conversations, []).find(r => r.id === id) ?? null,
    create: async (data: Omit<ConversationRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ConversationRecord> => {
      const records = readJSON<ConversationRecord>(FILES.conversations, []);
      const now = new Date().toISOString();
      const record: ConversationRecord = { ...data, id: uid('conv'), createdAt: now, updatedAt: now };
      records.unshift(record);
      writeJSON(FILES.conversations, records);
      return record;
    },
    update: async (id: string, updates: Partial<ConversationRecord>): Promise<ConversationRecord | null> => {
      const records = readJSON<ConversationRecord>(FILES.conversations, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.conversations, records);
      return records[idx];
    },
    countUnread: async (): Promise<number> => {
      const records = readJSON<ConversationRecord>(FILES.conversations, []);
      return records.filter(r => r.unreadCount > 0 && r.status !== 'CLOSED').length;
    },
    countUnassigned: async (): Promise<number> => {
      const records = readJSON<ConversationRecord>(FILES.conversations, []);
      return records.filter(r => !r.assigneeId && r.status === 'OPEN').length;
    },
  },

  messages: {
    findByConversation: async (conversationId: string): Promise<MessageRecord[]> => {
      const records = readJSON<MessageRecord>(FILES.messages, []);
      return records
        .filter(r => r.conversationId === conversationId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    },
    create: async (data: Omit<MessageRecord, 'id'>): Promise<MessageRecord> => {
      const records = readJSON<MessageRecord>(FILES.messages, []);
      const record: MessageRecord = { ...data, id: uid('msg') };
      records.push(record);
      writeJSON(FILES.messages, records);
      return record;
    },
  },

  followups: {
    findMany: async (opts?: { status?: FollowUpStatus; limit?: number }): Promise<FollowUpRecord[]> => {
      let records = readJSON<FollowUpRecord>(FILES.followups, []);
      if (opts?.status) records = records.filter(r => r.status === opts.status);
      records.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      return records.slice(0, opts?.limit ?? 100);
    },
    countByCategory: async (): Promise<{ overdue: number; dueToday: number; dueThisWeek: number; upcoming: number }> => {
      const records = readJSON<FollowUpRecord>(FILES.followups, []).filter(r => r.status === 'OPEN');
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const endOfToday = new Date(today.getTime() + 86400000 - 1);
      const endOfWeek = new Date(today.getTime() + 7 * 86400000);
      return {
        overdue: records.filter(r => new Date(r.dueDate) < today).length,
        dueToday: records.filter(r => { const d = new Date(r.dueDate); return d >= today && d <= endOfToday; }).length,
        dueThisWeek: records.filter(r => { const d = new Date(r.dueDate); return d > endOfToday && d <= endOfWeek; }).length,
        upcoming: records.filter(r => new Date(r.dueDate) > endOfWeek).length,
      };
    },
    create: async (data: Omit<FollowUpRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<FollowUpRecord> => {
      const records = readJSON<FollowUpRecord>(FILES.followups, []);
      const now = new Date().toISOString();
      const record: FollowUpRecord = { ...data, id: uid('fu'), createdAt: now, updatedAt: now };
      records.unshift(record);
      writeJSON(FILES.followups, records);
      return record;
    },
    update: async (id: string, updates: Partial<FollowUpRecord>): Promise<FollowUpRecord | null> => {
      const records = readJSON<FollowUpRecord>(FILES.followups, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.followups, records);
      return records[idx];
    },
  },

  visitors: {
    findActive: async (): Promise<VisitorRecord[]> =>
      readJSON<VisitorRecord>(FILES.visitors, []).filter(r => r.isActive),
    findRecent: async (limit = 50): Promise<VisitorRecord[]> =>
      readJSON<VisitorRecord>(FILES.visitors, [])
        .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
        .slice(0, limit),
    countActive: async (): Promise<number> =>
      readJSON<VisitorRecord>(FILES.visitors, []).filter(r => r.isActive).length,
    upsertSession: async (sessionId: string, updates: Partial<VisitorRecord>): Promise<VisitorRecord> => {
      const records = readJSON<VisitorRecord>(FILES.visitors, []);
      const idx = records.findIndex(r => r.sessionId === sessionId);
      const now = new Date().toISOString();
      if (idx !== -1) {
        records[idx] = { ...records[idx], ...updates, lastSeen: now };
        writeJSON(FILES.visitors, records);
        return records[idx];
      }
      const record: VisitorRecord = {
        id: uid('vis'),
        sessionId,
        firstSeen: now,
        lastSeen: now,
        pagesVisited: [],
        durationSeconds: 0,
        intent: 'LOW',
        isActive: true,
        ...updates,
      };
      records.unshift(record);
      // Keep last 5000 visitor records
      if (records.length > 5000) records.length = 5000;
      writeJSON(FILES.visitors, records);
      return record;
    },
  },

  notifications: {
    findAll: async (limit = 50): Promise<NotificationRecord[]> =>
      readJSON<NotificationRecord>(FILES.notifications, [])
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit),
    countUnread: async (): Promise<number> =>
      readJSON<NotificationRecord>(FILES.notifications, []).filter(r => !r.isRead).length,
    create: async (data: Omit<NotificationRecord, 'id' | 'createdAt' | 'isRead'>): Promise<NotificationRecord> => {
      const records = readJSON<NotificationRecord>(FILES.notifications, []);
      const record: NotificationRecord = { ...data, id: uid('notif'), isRead: false, createdAt: new Date().toISOString() };
      records.unshift(record);
      if (records.length > 200) records.length = 200;
      writeJSON(FILES.notifications, records);
      return record;
    },
    markRead: async (id: string): Promise<void> => {
      const records = readJSON<NotificationRecord>(FILES.notifications, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx !== -1) { records[idx].isRead = true; writeJSON(FILES.notifications, records); }
    },
    markAllRead: async (): Promise<void> => {
      const records = readJSON<NotificationRecord>(FILES.notifications, []);
      records.forEach(r => { r.isRead = true; });
      writeJSON(FILES.notifications, records);
    },
  },
};
