// ARKLINTECH COMMAND — Extended Admin Database Layer
// Extends existing db.ts with new collections for the COMMAND platform
// V1: JSON flat-file storage — abstracted for Google Sheets / DB migration

import fs from 'fs';
import path from 'path';
import { sheetsDb } from './sheets-db';

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
  inquiryId?: string | null;
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

export interface ReviewRecord {
  id: string;
  authorName: string;
  authorTitle?: string | null;
  authorCompany?: string | null;
  rating: number;
  comment: string;
  source?: string | null;
  published: boolean;
  createdAt: string;
}

export interface ProjectStage {
  id: string;
  name: string;
  description?: string;
  order: number;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
}

export interface ProjectRecord {
  id: string;
  name: string;
  clientName: string;
  companyId?: string | null;
  description: string;
  industry?: string | null;
  projectType?: string | null;
  technologies?: string | null;
  team?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'ARCHIVED';
  startDate: string;
  targetDate: string;
  projectRef: string;
  projectValue: number;
  progress: number;
  currentStage: string;
  stages?: ProjectStage[];
  thumbnailUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMilestoneRecord {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  createdAt: string;
  updatedAt: string;
}

export interface ProjectUpdateRecord {
  id: string;
  projectId: string;
  progress: number;
  stage: string;
  notes: string;
  author: string;
  createdAt: string;
}

export interface ProjectFileRecord {
  id: string;
  projectId: string;
  name: string;
  driveUrl: string;
  sizeBytes: number;
  mimeType: string;
  createdAt: string;
}

export interface ProjectNoteRecord {
  id: string;
  projectId: string;
  title?: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItemRecord {
  id: string;
  invoiceId: string;
  serviceName: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  projectId?: string | null;
  companyId?: string | null;
  clientName: string;
  clientAddress: string;
  clientEmail?: string;
  clientPhone?: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: string;
  subtotal: number;
  discount: number;
  taxPct: number;
  taxAmount: number;
  total: number;
  amountInWords: string;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'VOID';
  notes?: string;
  pdfDriveUrl?: string;
  items?: InvoiceItemRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRecord {
  id: string;
  name: string;
  description: string;
  category?: string;
  createdAt: string;
}

export interface SettingRecord {
  key: string;
  value: string;
  description?: string;
  updatedAt: string;
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
  reviews: path.join(DATA_DIR, 'reviews.json'),
  projects: path.join(DATA_DIR, 'projects.json'),
  projectMilestones: path.join(DATA_DIR, 'project_milestones.json'),
  projectUpdates: path.join(DATA_DIR, 'project_updates.json'),
  projectFiles: path.join(DATA_DIR, 'project_files.json'),
  projectNotes: path.join(DATA_DIR, 'project_notes.json'),
  invoices: path.join(DATA_DIR, 'invoices.json'),
  invoiceItems: path.join(DATA_DIR, 'invoice_items.json'),
  services: path.join(DATA_DIR, 'services.json'),
  settings: path.join(DATA_DIR, 'settings.json'),
};

export function amountToWordsIndian(num: number): string {
  if (num === 0) return 'Zero Rupees Only';
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(n: number): string {
    if (n === 0) return '';
    if (n < 20) return a[n];
    const tens = b[Math.floor(n / 10)];
    const units = a[n % 10];
    return units ? `${tens} ${units}` : tens;
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let res = '';
    if (hundred > 0) res += `${a[hundred]} Hundred`;
    if (rest > 0) {
      if (res) res += ' and ';
      res += convertTwoDigits(rest);
    }
    return res;
  }

  const crore = Math.floor(num / 10000000);
  let remainder = num % 10000000;
  const lakh = Math.floor(remainder / 100000);
  remainder = remainder % 100000;
  const thousand = Math.floor(remainder / 1000);
  const hundreds = remainder % 1000;

  let words = '';
  if (crore > 0) words += `${convertTwoDigits(crore)} Crore `;
  if (lakh > 0) words += `${convertTwoDigits(lakh)} Lakh `;
  if (thousand > 0) words += `${convertTwoDigits(thousand)} Thousand `;
  if (hundreds > 0) words += `${convertThreeDigits(hundreds)} `;

  return `Indian Rupees ${words.trim()} Only`;
}

const DEFAULT_SERVICES: ServiceRecord[] = [
  { id: 'srv_1',  name: 'Website Design & Development',  description: 'Complete responsive website with modern UI/UX, core pages and CMS integration.',                             category: 'Development',    createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_2',  name: 'Admin / Reception Panel',       description: 'Staff dashboard, management interface, operational tools and workflows.',                                      category: 'Development',    createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_3',  name: 'UI / UX Design',                description: 'User interface and experience design, design systems, component architecture and interactive prototypes.',     category: 'Design',         createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_4',  name: 'Frontend Development',          description: 'Responsive, high-performance client-side application development using modern frameworks.',                    category: 'Development',    createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_5',  name: 'Backend Development',           description: 'Server-side application logic, REST/GraphQL APIs, and business workflow implementation.',                      category: 'Development',    createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_6',  name: 'Database Integration',          description: 'Data architecture, schema design, Google Sheets integration and operational database setup.',                  category: 'Infrastructure', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_7',  name: 'API Integration',               description: 'Third-party service connections, webhooks, data pipelines and API orchestration.',                             category: 'Infrastructure', createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_8',  name: 'Authentication System',         description: 'Firebase Authentication with role-based access control and secure session management.',                        category: 'Security',       createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_9',  name: 'Payment Integration',           description: 'Payment gateway setup, checkout flows, invoicing and subscription billing integration.',                       category: 'E-Commerce',     createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_10', name: 'E-Commerce Development',        description: 'Online store, product catalogue, cart, order management and fulfilment workflows.',                            category: 'E-Commerce',     createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_11', name: 'Mobile Application',            description: 'Cross-platform mobile application development for iOS and Android.',                                           category: 'Mobile',         createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_12', name: 'AI Integration',                description: 'AI models, intelligent agents, chat interfaces and machine-learning powered features.',                        category: 'AI',             createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_13', name: 'Automation',                    description: 'Business process automation, scheduled workflows, triggers and no-code/low-code integrations.',               category: 'AI',             createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_14', name: 'Deployment & Configuration',    description: 'Production deployment, CI/CD pipelines, domain configuration, environment setup and go-live testing.',        category: 'DevOps',         createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_15', name: 'Maintenance & Support',         description: 'Ongoing updates, bug fixes, security monitoring and operational system support.',                              category: 'Support',        createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_16', name: 'Consulting',                    description: 'Technology strategy, system architecture advisory, planning and technical consultation sessions.',             category: 'Consulting',     createdAt: '2026-01-01T00:00:00.000Z' },
  { id: 'srv_17', name: 'Custom Development',            description: 'Bespoke features, custom modules and tailored development work outside standard service packages.',            category: 'Development',    createdAt: '2026-01-01T00:00:00.000Z' },
];




// ─── Merged Data & In-Memory Cache (2s TTL) ─────────────────────────

let leadsCache: { data: LeadRecord[]; timestamp: number } | null = null;
let contactsCache: { data: ContactRecord[]; timestamp: number } | null = null;
let notificationsCache: { data: NotificationRecord[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 2000;

export function invalidateAdminDbCache() {
  leadsCache = null;
  contactsCache = null;
  notificationsCache = null;
}

async function getMergedLeads(): Promise<LeadRecord[]> {
  const now = Date.now();
  if (leadsCache && now - leadsCache.timestamp < CACHE_TTL_MS) {
    return leadsCache.data;
  }

  const localLeads = readJSON<LeadRecord>(FILES.leads, []);

  let tabsData: Record<string, Record<string, any>[]>;
  try {
    tabsData = await sheetsDb.readTabs(['Leads', 'Contacts', 'Inquiries']);
  } catch (err) {
    throw err;
  }

  const sheetsLeads = tabsData['Leads'] || [];
  const sheetsContacts = tabsData['Contacts'] || [];
  const sheetsInquiries = tabsData['Inquiries'] || [];

  const contactMap = new Map<string, Record<string, any>>();
  sheetsContacts.forEach(c => {
    if (c.contact_id) contactMap.set(c.contact_id, c);
  });

  const inquiryMap = new Map<string, Record<string, any>>();
  sheetsInquiries.forEach(i => {
    if (i.inquiry_id) inquiryMap.set(i.inquiry_id, i);
  });

  const mergedMap = new Map<string, LeadRecord>();

  localLeads.forEach(l => {
    mergedMap.set(l.id, l);
  });

  sheetsLeads.forEach(sl => {
    const contact = contactMap.get(sl.contact_id);
    const inquiry = inquiryMap.get(sl.inquiry_id);

    const email = contact?.email || sl.email || '';
    const name = contact ? `${contact.first_name || ''} ${contact.last_name || ''}`.trim() : (sl.name || 'Unknown');

    const leadRecord: LeadRecord = {
      id: sl.lead_id || uid('lead'),
      name: name || 'Anonymous',
      email: email,
      phone: contact?.phone || sl.phone || null,
      company: contact?.company_id || sl.company || null,
      industry: contact?.job_title || sl.industry || null,
      projectType: sl.interest || inquiry?.subject || null,
      interest: sl.interest || null,
      budget: sl.budget || null,
      timeline: sl.timeline || null,
      problem: sl.notes || inquiry?.message || null,
      message: inquiry?.message || sl.notes || null,
      source: sl.source_id || inquiry?.source || 'Website',
      status: (sl.status as LeadStatus) || 'NEW',
      owner: sl.owner_id || null,
      priority: (sl.urgency as Priority) || 'HIGH',
      nextAction: sl.next_action || null,
      notes: sl.notes || null,
      contactId: sl.contact_id || null,
      companyId: contact?.company_id || null,
      inquiryId: sl.inquiry_id || null,
      createdAt: sl.created_at || new Date().toISOString(),
      updatedAt: sl.updated_at || sl.created_at || new Date().toISOString(),
    };

    mergedMap.set(leadRecord.id, leadRecord);
  });

  const result = Array.from(mergedMap.values());
  leadsCache = { data: result, timestamp: now };
  return result;
}

async function getMergedContacts(): Promise<ContactRecord[]> {
  const now = Date.now();
  if (contactsCache && now - contactsCache.timestamp < CACHE_TTL_MS) {
    return contactsCache.data;
  }

  const localContacts = readJSON<ContactRecord>(FILES.contacts, []);

  let sheetsContacts: Record<string, any>[];
  try {
    sheetsContacts = await sheetsDb.readTab('Contacts');
  } catch (err) {
    throw err;
  }

  const mergedMap = new Map<string, ContactRecord>();

  localContacts.forEach(c => mergedMap.set(c.id, c));

  sheetsContacts.forEach(sc => {
    const id = sc.contact_id || uid('cnt');
    const name = `${sc.first_name || ''} ${sc.last_name || ''}`.trim() || 'Anonymous';
    mergedMap.set(id, {
      id,
      name,
      email: sc.email || '',
      phone: sc.phone || null,
      company: sc.company_id || null,
      industry: sc.job_title || null,
      notes: sc.notes || null,
      createdAt: sc.created_at || new Date().toISOString(),
      updatedAt: sc.updated_at || sc.created_at || new Date().toISOString(),
    });
  });

  const result = Array.from(mergedMap.values());
  contactsCache = { data: result, timestamp: now };
  return result;
}

async function getMergedNotifications(): Promise<NotificationRecord[]> {
  const now = Date.now();
  if (notificationsCache && now - notificationsCache.timestamp < CACHE_TTL_MS) {
    return notificationsCache.data;
  }

  const localNotifs = readJSON<NotificationRecord>(FILES.notifications, []);

  let sheetsNotifs: Record<string, any>[];
  try {
    sheetsNotifs = await sheetsDb.readTab('Notifications');
  } catch (err) {
    throw err;
  }

  const mergedMap = new Map<string, NotificationRecord>();

  localNotifs.forEach(n => mergedMap.set(n.id, n));

  sheetsNotifs.forEach(sn => {
    const id = sn.notification_id || uid('notif');
    const isRead = String(sn.status).toUpperCase() === 'READ' || String(sn.is_read).toLowerCase() === 'true';
    const entityId = sn.entity_id || '';
    const actionUrl = sn.action_url || (entityId ? `/admin/leads/${entityId}` : null);
    const actionLabel = sn.action_label || (entityId ? 'View Lead' : null);

    mergedMap.set(id, {
      id,
      type: (sn.type as NotificationType) || 'NEW_LEAD',
      title: sn.title || 'Notification',
      body: sn.message || '',
      actionLabel: actionLabel,
      actionUrl: actionUrl,
      isRead: isRead,
      createdAt: sn.created_at || new Date().toISOString(),
    });
  });

  const result = Array.from(mergedMap.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  notificationsCache = { data: result, timestamp: now };
  return result;
}

// ─── Admin DB ─────────────────────────────────────────────────────────────────

export const adminDb = {
  leads: {
    findMany: async (opts?: { status?: LeadStatus; limit?: number; offset?: number }): Promise<LeadRecord[]> => {
      let records = await getMergedLeads();
      if (opts?.status) records = records.filter(r => r.status === opts.status);
      records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const offset = opts?.offset ?? 0;
      const limit = opts?.limit ?? 100;
      return records.slice(offset, offset + limit);
    },
    findById: async (id: string): Promise<LeadRecord | null> => {
      const records = await getMergedLeads();
      return records.find(r => r.id === id) ?? null;
    },
    count: async (status?: LeadStatus): Promise<number> => {
      const records = await getMergedLeads();
      return status ? records.filter(r => r.status === status).length : records.length;
    },
    countByStatus: async (): Promise<Record<string, number>> => {
      const records = await getMergedLeads();
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

      // Also persist directly to Sheets
      try {
        await sheetsDb.leads.create({
          contact_id: data.contactId || '',
          company_id: data.companyId || '',
          inquiry_id: data.inquiryId || '',
          interest: data.interest || data.projectType || '',
          budget: data.budget || '',
          notes: data.notes || data.problem || '',
          source_id: data.source || 'website',
          status: data.status,
          urgency: data.priority,
          timeline: data.timeline || 'ASAP',
        });
      } catch (err) {
        console.error('Error persisting lead to Sheets:', err);
      }

      invalidateAdminDbCache();
      return record;
    },
    update: async (id: string, updates: Partial<LeadRecord>): Promise<LeadRecord | null> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      const idx = records.findIndex(r => r.id === id);
      const now = new Date().toISOString();
      let updatedRecord: LeadRecord | null = null;

      if (idx !== -1) {
        records[idx] = { ...records[idx], ...updates, updatedAt: now };
        writeJSON(FILES.leads, records);
        updatedRecord = records[idx];
      }

      // Also persist update to Sheets
      try {
        const sheetsUpdates: Record<string, any> = {};
        if (updates.status) sheetsUpdates.status = updates.status;
        if (updates.priority) sheetsUpdates.urgency = updates.priority;
        if (updates.notes) sheetsUpdates.notes = updates.notes;
        if (updates.owner) sheetsUpdates.owner_id = updates.owner;
        if (updates.nextAction) sheetsUpdates.next_action = updates.nextAction;

        await sheetsDb.leads.update(id, sheetsUpdates);
      } catch (err) {
        console.error('Error updating lead in Sheets:', err);
      }

      invalidateAdminDbCache();
      return updatedRecord || { id, ...updates, updatedAt: now } as LeadRecord;
    },
    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<LeadRecord>(FILES.leads, []);
      const filtered = records.filter(r => r.id !== id);
      writeJSON(FILES.leads, filtered);

      try {
        await sheetsDb.deleteRowById('Leads', 'lead_id', id);
      } catch (err) {
        console.error('Error deleting lead from Sheets:', err);
      }
      invalidateAdminDbCache();
      return true;
    },
  },

  contacts: {
    findMany: async (limit = 100): Promise<ContactRecord[]> => {
      const records = await getMergedContacts();
      return records.slice(0, limit);
    },
    findById: async (id: string): Promise<ContactRecord | null> => {
      const records = await getMergedContacts();
      return records.find(r => r.id === id) ?? null;
    },
    findByEmail: async (email: string): Promise<ContactRecord | null> => {
      const records = await getMergedContacts();
      return records.find(r => r.email.toLowerCase() === email.toLowerCase()) ?? null;
    },
    create: async (data: Omit<ContactRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactRecord> => {
      const records = readJSON<ContactRecord>(FILES.contacts, []);
      const now = new Date().toISOString();
      const record: ContactRecord = { ...data, id: uid('cnt'), createdAt: now, updatedAt: now };
      records.unshift(record);
      writeJSON(FILES.contacts, records);

      try {
        await sheetsDb.contacts.findOrCreate({
          first_name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          job_title: data.industry || undefined,
        });
      } catch (err) {
        console.error('Error persisting contact to Sheets:', err);
      }

      return record;
    },
    update: async (id: string, updates: Partial<ContactRecord>): Promise<ContactRecord | null> => {
      const records = readJSON<ContactRecord>(FILES.contacts, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.contacts, records);

      try {
        await sheetsDb.updateRowById('Contacts', 'contact_id', id, updates);
      } catch (err) {
        console.error('Error updating contact in Sheets:', err);
      }
      return records[idx];
    },
    count: async (): Promise<number> => (await getMergedContacts()).length,
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

      try {
        await sheetsDb.companies.create({
          name: data.name,
          website: data.website || undefined,
          industry: data.industry || undefined,
          size: data.size || undefined,
        });
      } catch (err) {
        console.error('Error persisting company to Sheets:', err);
      }

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

      try {
        await sheetsDb.conversations.create({
          contact_id: data.contactId || undefined,
          lead_id: data.leadId || undefined,
          subject: data.subject || 'New Conversation',
          status: data.status,
          assigned_to: data.assigneeId || undefined,
        });
      } catch (err) {
        console.error('Error persisting conversation to Sheets:', err);
      }

      return record;
    },
    update: async (id: string, updates: Partial<ConversationRecord>): Promise<ConversationRecord | null> => {
      const records = readJSON<ConversationRecord>(FILES.conversations, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.conversations, records);

      try {
        await sheetsDb.conversations.update(id, updates);
      } catch (err) {
        console.error('Error updating conversation in Sheets:', err);
      }
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

      try {
        await sheetsDb.messages.create({
          conversation_id: data.conversationId,
          sender_email: data.from || undefined,
          recipient_email: data.to || undefined,
          direction: data.direction,
          message: data.body,
        });
      } catch (err) {
        console.error('Error persisting message to Sheets:', err);
      }

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

      try {
        await sheetsDb.followups.create({
          lead_id: data.leadId || undefined,
          contact_id: data.contactId || undefined,
          assigned_to: data.owner || undefined,
          title: data.title,
          notes: data.notes || undefined,
          due_at: data.dueDate,
          status: data.status,
        });
      } catch (err) {
        console.error('Error persisting followup to Sheets:', err);
      }

      return record;
    },
    update: async (id: string, updates: Partial<FollowUpRecord>): Promise<FollowUpRecord | null> => {
      const records = readJSON<FollowUpRecord>(FILES.followups, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx === -1) return null;
      records[idx] = { ...records[idx], ...updates, updatedAt: new Date().toISOString() };
      writeJSON(FILES.followups, records);

      try {
        await sheetsDb.followups.update(id, updates);
      } catch (err) {
        console.error('Error updating followup in Sheets:', err);
      }

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
      let record: VisitorRecord;

      if (idx !== -1) {
        records[idx] = { ...records[idx], ...updates, lastSeen: now };
        record = records[idx];
      } else {
        record = {
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
      }

      if (records.length > 5000) records.length = 5000;
      writeJSON(FILES.visitors, records);

      try {
        await sheetsDb.visitors.upsertVisitor({
          visitor_id: record.id,
          landing_page: updates.landingPage || '/',
          device: updates.device || 'Desktop',
          browser: updates.browser || 'Chrome',
          location: updates.location || 'India',
          intent_level: updates.intent || 'LOW',
        });
        await sheetsDb.sessions.createSession({
          session_id: sessionId,
          visitor_id: record.id,
          landing_page: updates.landingPage || '/',
          device: updates.device || 'Desktop',
        });
      } catch (err) {
        console.error('Error persisting visitor session to Sheets:', err);
      }

      return record;
    },
  },

  notifications: {
    findAll: async (limit = 100): Promise<NotificationRecord[]> => {
      const records = await getMergedNotifications();
      return records.slice(0, limit);
    },
    findMany: async (limit = 100): Promise<NotificationRecord[]> => {
      const records = await getMergedNotifications();
      return records.slice(0, limit);
    },
    countUnread: async (): Promise<number> => {
      const records = await getMergedNotifications();
      return records.filter(r => !r.isRead).length;
    },
    create: async (data: Omit<NotificationRecord, 'id' | 'createdAt' | 'isRead'>): Promise<NotificationRecord> => {
      const records = readJSON<NotificationRecord>(FILES.notifications, []);
      const record: NotificationRecord = { ...data, id: uid('notif'), isRead: false, createdAt: new Date().toISOString() };
      records.unshift(record);
      if (records.length > 200) records.length = 200;
      writeJSON(FILES.notifications, records);
      invalidateAdminDbCache();
      return record;
    },
    markRead: async (id: string): Promise<void> => {
      const records = readJSON<NotificationRecord>(FILES.notifications, []);
      const idx = records.findIndex(r => r.id === id);
      if (idx !== -1) { records[idx].isRead = true; writeJSON(FILES.notifications, records); }

      try {
        await sheetsDb.notifications.markRead(id);
      } catch (err) {
        console.error('Error marking notification read in Sheets:', err);
      }
      invalidateAdminDbCache();
    },
    markAllRead: async (): Promise<void> => {
      const records = readJSON<NotificationRecord>(FILES.notifications, []);
      records.forEach(r => { r.isRead = true; });
      writeJSON(FILES.notifications, records);

      try {
        const notifs = await sheetsDb.readTab('Notifications');
        for (const n of notifs) {
          if (n.notification_id && String(n.status).toUpperCase() !== 'READ') {
            await sheetsDb.notifications.markRead(n.notification_id);
          }
        }
      } catch (err) {
        console.error('Error marking all notifications read in Sheets:', err);
      }
      invalidateAdminDbCache();
    },
  },

  reviews: {
    findMany: async (): Promise<ReviewRecord[]> =>
      readJSON<ReviewRecord>(FILES.reviews, []),
    create: async (data: Omit<ReviewRecord, 'id' | 'createdAt'>): Promise<ReviewRecord> => {
      const records = readJSON<ReviewRecord>(FILES.reviews, []);
      const record: ReviewRecord = { ...data, id: uid('rev'), createdAt: new Date().toISOString() };
      records.unshift(record);
      writeJSON(FILES.reviews, records);
      return record;
    },
  },

  projects: {
    findRecent: async (limit = 100): Promise<ProjectRecord[]> => {
      let localProjects = readJSON<ProjectRecord>(FILES.projects, []);
      try {
        const rows = await sheetsDb.readTab('Projects');
        if (rows.length) {
          const map = new Map<string, ProjectRecord>();
          localProjects.forEach(p => map.set(p.id, p));
          rows.forEach(r => {
            if (r.project_id) {
              const existing = map.get(r.project_id);
              map.set(r.project_id, {
                id: r.project_id,
                name: r.name || existing?.name || 'Project',
                clientName: r.client_name || existing?.clientName || 'Client',
                companyId: r.company_id || existing?.companyId || null,
                description: r.description || existing?.description || '',
                industry: r.industry || existing?.industry || null,
                projectType: r.project_type || existing?.projectType || null,
                technologies: r.technologies || existing?.technologies || null,
                team: r.team || existing?.team || null,
                priority: (r.priority as any) || existing?.priority || 'MEDIUM',
                status: (r.status as any) || existing?.status || 'ACTIVE',
                startDate: r.start_date || existing?.startDate || '',
                targetDate: r.target_date || existing?.targetDate || '',
                projectRef: r.project_ref || existing?.projectRef || '',
                projectValue: parseFloat(r.project_value || existing?.projectValue || '0') || 0,
                progress: parseInt(r.progress || existing?.progress || '0', 10) || 0,
                currentStage: r.current_stage || existing?.currentStage || '',
                stages: existing?.stages,
                thumbnailUrl: existing?.thumbnailUrl || null,
                createdAt: r.created_at || existing?.createdAt || new Date().toISOString(),
                updatedAt: r.updated_at || existing?.updatedAt || new Date().toISOString(),
              });
            }
          });
          localProjects = Array.from(map.values());
        }
      } catch {}
      return localProjects.slice(0, limit);
    },

    findById: async (id: string): Promise<ProjectRecord | null> => {
      const projects = await adminDb.projects.findRecent(200);
      return projects.find(p => p.id === id || p.projectRef === id) || null;
    },

    create: async (data: Omit<ProjectRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectRecord> => {
      const records = readJSON<ProjectRecord>(FILES.projects, []);
      const now = new Date().toISOString();
      const record: ProjectRecord = {
        ...data,
        id: uid('proj'),
        createdAt: now,
        updatedAt: now,
      };
      records.unshift(record);
      writeJSON(FILES.projects, records);

      try {
        await sheetsDb.appendRow('Projects', {
          project_id: record.id,
          name: record.name,
          client_name: record.clientName,
          company_id: record.companyId || '',
          description: record.description,
          industry: record.industry || '',
          project_type: record.projectType || '',
          technologies: record.technologies || '',
          team: record.team || '',
          priority: record.priority,
          status: record.status,
          start_date: record.startDate,
          target_date: record.targetDate,
          project_ref: record.projectRef,
          project_value: record.projectValue.toString(),
          progress: record.progress.toString(),
          current_stage: record.currentStage,
          created_at: now,
          updated_at: now,
        });
      } catch (err) {
        console.error('Error saving project to Sheets:', err);
      }
      return record;
    },

    update: async (id: string, data: Partial<ProjectRecord>): Promise<ProjectRecord | null> => {
      const records = readJSON<ProjectRecord>(FILES.projects, []);
      const idx = records.findIndex(p => p.id === id || p.projectRef === id);
      if (idx === -1) return null;

      const now = new Date().toISOString();
      const updated: ProjectRecord = {
        ...records[idx],
        ...data,
        updatedAt: now,
      };
      records[idx] = updated;
      writeJSON(FILES.projects, records);

      try {
        const sheetUpdates: Record<string, any> = { updated_at: now };
        if (data.name !== undefined) sheetUpdates.name = data.name;
        if (data.clientName !== undefined) sheetUpdates.client_name = data.clientName;
        if (data.description !== undefined) sheetUpdates.description = data.description;
        if (data.status !== undefined) sheetUpdates.status = data.status;
        if (data.startDate !== undefined) sheetUpdates.start_date = data.startDate;
        if (data.targetDate !== undefined) sheetUpdates.target_date = data.targetDate;
        if (data.projectValue !== undefined) sheetUpdates.project_value = data.projectValue.toString();
        if (data.progress !== undefined) sheetUpdates.progress = data.progress.toString();
        if (data.currentStage !== undefined) sheetUpdates.current_stage = data.currentStage;
        await sheetsDb.updateRowById('Projects', 'project_id', updated.id, sheetUpdates);
      } catch (err) {
        console.error('Error updating project in Sheets:', err);
      }
      return updated;
    },

    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<ProjectRecord>(FILES.projects, []);
      const filtered = records.filter(p => p.id !== id && p.projectRef !== id);
      if (filtered.length === records.length) return false;
      writeJSON(FILES.projects, filtered);
      try {
        await sheetsDb.deleteRowById('Projects', 'project_id', id);
      } catch {}
      return true;
    },
  },

  projectMilestones: {
    findByProject: async (projectId: string): Promise<ProjectMilestoneRecord[]> => {
      let local = readJSON<ProjectMilestoneRecord>(FILES.projectMilestones, []);
      try {
        const rows = await sheetsDb.readTab('ProjectMilestones');
        if (rows.length) {
          const map = new Map<string, ProjectMilestoneRecord>();
          local.forEach(m => map.set(m.id, m));
          rows.forEach(r => {
            if (r.milestone_id) {
              map.set(r.milestone_id, {
                id: r.milestone_id,
                projectId: r.project_id,
                title: r.title,
                description: r.description || '',
                dueDate: r.due_date,
                status: (r.status as any) || 'PENDING',
                createdAt: r.created_at || new Date().toISOString(),
                updatedAt: r.updated_at || new Date().toISOString(),
              });
            }
          });
          local = Array.from(map.values());
        }
      } catch {}
      return local.filter(m => m.projectId === projectId);
    },

    create: async (data: Omit<ProjectMilestoneRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectMilestoneRecord> => {
      const records = readJSON<ProjectMilestoneRecord>(FILES.projectMilestones, []);
      const now = new Date().toISOString();
      const record: ProjectMilestoneRecord = {
        ...data,
        id: uid('ms'),
        createdAt: now,
        updatedAt: now,
      };
      records.push(record);
      writeJSON(FILES.projectMilestones, records);

      try {
        await sheetsDb.appendRow('ProjectMilestones', {
          milestone_id: record.id,
          project_id: record.projectId,
          title: record.title,
          description: record.description || '',
          due_date: record.dueDate,
          status: record.status,
          created_at: now,
          updated_at: now,
        });
      } catch (err) {
        console.error('Error saving milestone in Sheets:', err);
      }
      return record;
    },

    update: async (id: string, data: Partial<ProjectMilestoneRecord>): Promise<ProjectMilestoneRecord | null> => {
      const records = readJSON<ProjectMilestoneRecord>(FILES.projectMilestones, []);
      const idx = records.findIndex(m => m.id === id);
      if (idx === -1) return null;
      const now = new Date().toISOString();
      records[idx] = { ...records[idx], ...data, updatedAt: now };
      writeJSON(FILES.projectMilestones, records);
      try {
        const sheetUpdates: Record<string, any> = { updated_at: now };
        if (data.title) sheetUpdates.title = data.title;
        if (data.status) sheetUpdates.status = data.status;
        if (data.dueDate) sheetUpdates.due_date = data.dueDate;
        await sheetsDb.updateRowById('ProjectMilestones', 'milestone_id', id, sheetUpdates);
      } catch {}
      return records[idx];
    },

    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<ProjectMilestoneRecord>(FILES.projectMilestones, []);
      const filtered = records.filter(m => m.id !== id);
      if (filtered.length === records.length) return false;
      writeJSON(FILES.projectMilestones, filtered);
      try {
        await sheetsDb.deleteRowById('ProjectMilestones', 'milestone_id', id);
      } catch {}
      return true;
    },
  },

  projectUpdates: {
    findByProject: async (projectId: string): Promise<ProjectUpdateRecord[]> => {
      let local = readJSON<ProjectUpdateRecord>(FILES.projectUpdates, []);
      try {
        const rows = await sheetsDb.readTab('ProjectUpdates');
        if (rows.length) {
          const map = new Map<string, ProjectUpdateRecord>();
          local.forEach(u => map.set(u.id, u));
          rows.forEach(r => {
            if (r.update_id) {
              map.set(r.update_id, {
                id: r.update_id,
                projectId: r.project_id,
                progress: parseInt(r.progress || '0', 10),
                stage: r.stage,
                notes: r.notes || '',
                author: r.author || 'Anas (Lead)',
                createdAt: r.created_at || new Date().toISOString(),
              });
            }
          });
          local = Array.from(map.values());
        }
      } catch {}
      return local
        .filter(u => u.projectId === projectId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    create: async (data: Omit<ProjectUpdateRecord, 'id' | 'createdAt'>): Promise<ProjectUpdateRecord> => {
      const records = readJSON<ProjectUpdateRecord>(FILES.projectUpdates, []);
      const now = new Date().toISOString();
      const record: ProjectUpdateRecord = {
        ...data,
        id: uid('upd'),
        createdAt: now,
      };
      records.unshift(record);
      writeJSON(FILES.projectUpdates, records);

      // Automatically update parent project's progress and current stage!
      await adminDb.projects.update(data.projectId, {
        progress: data.progress,
        currentStage: data.stage,
      });

      try {
        await sheetsDb.appendRow('ProjectUpdates', {
          update_id: record.id,
          project_id: record.projectId,
          progress: record.progress.toString(),
          stage: record.stage,
          notes: record.notes,
          author: record.author,
          created_at: now,
        });
      } catch (err) {
        console.error('Error saving project update to Sheets:', err);
      }
      return record;
    },
  },

  projectFiles: {
    findByProject: async (projectId: string): Promise<ProjectFileRecord[]> => {
      let local = readJSON<ProjectFileRecord>(FILES.projectFiles, []);
      try {
        const rows = await sheetsDb.readTab('ProjectFiles');
        if (rows.length) {
          const map = new Map<string, ProjectFileRecord>();
          local.forEach(f => map.set(f.id, f));
          rows.forEach(r => {
            if (r.file_id) {
              map.set(r.file_id, {
                id: r.file_id,
                projectId: r.project_id,
                name: r.name,
                driveUrl: r.drive_url,
                sizeBytes: parseInt(r.size_bytes || '0', 10),
                mimeType: r.mime_type || 'application/octet-stream',
                createdAt: r.created_at || new Date().toISOString(),
              });
            }
          });
          local = Array.from(map.values());
        }
      } catch {}
      return local.filter(f => f.projectId === projectId);
    },

    create: async (data: Omit<ProjectFileRecord, 'id' | 'createdAt'>): Promise<ProjectFileRecord> => {
      const records = readJSON<ProjectFileRecord>(FILES.projectFiles, []);
      const now = new Date().toISOString();
      const record: ProjectFileRecord = {
        ...data,
        id: uid('file'),
        createdAt: now,
      };
      records.unshift(record);
      writeJSON(FILES.projectFiles, records);

      try {
        await sheetsDb.appendRow('ProjectFiles', {
          file_id: record.id,
          project_id: record.projectId,
          name: record.name,
          drive_url: record.driveUrl,
          size_bytes: record.sizeBytes.toString(),
          mime_type: record.mimeType,
          created_at: now,
        });
      } catch (err) {
        console.error('Error saving project file to Sheets:', err);
      }
      return record;
    },

    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<ProjectFileRecord>(FILES.projectFiles, []);
      const filtered = records.filter(f => f.id !== id);
      if (filtered.length === records.length) return false;
      writeJSON(FILES.projectFiles, filtered);
      try {
        await sheetsDb.deleteRowById('ProjectFiles', 'file_id', id);
      } catch {}
      return true;
    },
  },

  projectNotes: {
    findByProject: async (projectId: string): Promise<ProjectNoteRecord[]> => {
      let local = readJSON<ProjectNoteRecord>(FILES.projectNotes, []);
      try {
        const rows = await sheetsDb.readTab('ProjectNotes');
        if (rows.length) {
          const map = new Map<string, ProjectNoteRecord>();
          local.forEach(n => map.set(n.id, n));
          rows.forEach(r => {
            if (r.note_id) {
              map.set(r.note_id, {
                id: r.note_id,
                projectId: r.project_id,
                title: r.title || 'Note',
                content: r.content,
                author: r.author || 'Anas (Lead)',
                createdAt: r.created_at || new Date().toISOString(),
                updatedAt: r.updated_at || new Date().toISOString(),
              });
            }
          });
          local = Array.from(map.values());
        }
      } catch {}
      return local.filter(n => n.projectId === projectId);
    },

    create: async (data: Omit<ProjectNoteRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProjectNoteRecord> => {
      const records = readJSON<ProjectNoteRecord>(FILES.projectNotes, []);
      const now = new Date().toISOString();
      const record: ProjectNoteRecord = {
        ...data,
        id: uid('pnote'),
        createdAt: now,
        updatedAt: now,
      };
      records.unshift(record);
      writeJSON(FILES.projectNotes, records);

      try {
        await sheetsDb.appendRow('ProjectNotes', {
          note_id: record.id,
          project_id: record.projectId,
          title: record.title || 'Note',
          content: record.content,
          author: record.author,
          created_at: now,
          updated_at: now,
        });
      } catch (err) {
        console.error('Error saving project note to Sheets:', err);
      }
      return record;
    },

    update: async (id: string, data: Partial<ProjectNoteRecord>): Promise<ProjectNoteRecord | null> => {
      const records = readJSON<ProjectNoteRecord>(FILES.projectNotes, []);
      const idx = records.findIndex(n => n.id === id);
      if (idx === -1) return null;
      const now = new Date().toISOString();
      records[idx] = { ...records[idx], ...data, updatedAt: now };
      writeJSON(FILES.projectNotes, records);
      try {
        const sheetUpdates: Record<string, any> = { updated_at: now };
        if (data.title) sheetUpdates.title = data.title;
        if (data.content) sheetUpdates.content = data.content;
        await sheetsDb.updateRowById('ProjectNotes', 'note_id', id, sheetUpdates);
      } catch {}
      return records[idx];
    },

    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<ProjectNoteRecord>(FILES.projectNotes, []);
      const filtered = records.filter(n => n.id !== id);
      if (filtered.length === records.length) return false;
      writeJSON(FILES.projectNotes, filtered);
      try {
        await sheetsDb.deleteRowById('ProjectNotes', 'note_id', id);
      } catch {}
      return true;
    },
  },

  invoices: {
    findRecent: async (limit = 100): Promise<InvoiceRecord[]> => {
      let local = readJSON<InvoiceRecord>(FILES.invoices, []);
      try {
        const rows = await sheetsDb.readTab('Invoices');
        if (rows.length) {
          const map = new Map<string, InvoiceRecord>();
          local.forEach(inv => map.set(inv.id, inv));
          rows.forEach(r => {
            if (r.invoice_id) {
              const existing = map.get(r.invoice_id);
              map.set(r.invoice_id, {
                id: r.invoice_id,
                invoiceNumber: r.invoice_number,
                projectId: r.project_id || null,
                companyId: r.company_id || null,
                clientName: r.client_name,
                clientAddress: r.client_address || '',
                clientEmail: r.client_email || '',
                clientPhone: r.client_phone || '',
                invoiceDate: r.invoice_date,
                dueDate: r.due_date,
                paymentTerms: r.payment_terms || '14 Days',
                currency: r.currency || 'INR (₹)',
                subtotal: parseFloat(r.subtotal || '0') || 0,
                discount: parseFloat(r.discount || '0') || 0,
                taxPct: parseFloat(r.tax_pct || '0') || 0,
                taxAmount: parseFloat(r.tax_amount || '0') || 0,
                total: parseFloat(r.total || '0') || 0,
                amountInWords: r.amount_in_words || '',
                status: (r.status as any) || 'SENT',
                notes: r.notes || '',
                pdfDriveUrl: r.pdf_drive_url || '',
                items: existing?.items || [],
                createdAt: r.created_at || new Date().toISOString(),
                updatedAt: r.updated_at || new Date().toISOString(),
              });
            }
          });
          local = Array.from(map.values());
        }
      } catch {}
      return local.slice(0, limit);
    },

    findById: async (id: string): Promise<InvoiceRecord | null> => {
      const invoices = await adminDb.invoices.findRecent(200);
      const invoice = invoices.find(inv => inv.id === id || inv.invoiceNumber === id);
      if (!invoice) return null;
      invoice.items = await adminDb.invoiceItems.findByInvoice(invoice.id);
      return invoice;
    },

    findByProject: async (projectId: string): Promise<InvoiceRecord[]> => {
      const invoices = await adminDb.invoices.findRecent(200);
      return invoices.filter(inv => inv.projectId === projectId);
    },

    getNextInvoiceNumber: async (): Promise<string> => {
      const invoices = await adminDb.invoices.findRecent(500);
      const year = new Date().getFullYear();
      let maxNum = 0;
      invoices.forEach(inv => {
        const match = inv.invoiceNumber.match(/INV-\d{4}-(\d+)/);
        if (match) {
          const n = parseInt(match[1], 10);
          if (n > maxNum) maxNum = n;
        }
      });
      const next = (maxNum + 1).toString().padStart(3, '0');
      return `INV-${year}-${next}`;
    },

    create: async (data: Omit<InvoiceRecord, 'id' | 'createdAt' | 'updatedAt'> & { items?: Omit<InvoiceItemRecord, 'id' | 'invoiceId'>[] }): Promise<InvoiceRecord> => {
      const records = readJSON<InvoiceRecord>(FILES.invoices, []);
      const now = new Date().toISOString();
      const invoiceId = uid('inv');
      const invoiceNumber = data.invoiceNumber || await adminDb.invoices.getNextInvoiceNumber();

      const items: InvoiceItemRecord[] = (data.items || []).map(item => ({
        ...item,
        id: uid('item'),
        invoiceId,
      }));

      const record: InvoiceRecord = {
        ...data,
        id: invoiceId,
        invoiceNumber,
        items,
        amountInWords: data.amountInWords || amountToWordsIndian(data.total),
        createdAt: now,
        updatedAt: now,
      };

      records.unshift(record);
      writeJSON(FILES.invoices, records);

      if (items.length) {
        await adminDb.invoiceItems.createBatch(items);
      }

      try {
        await sheetsDb.appendRow('Invoices', {
          invoice_id: record.id,
          invoice_number: record.invoiceNumber,
          project_id: record.projectId || '',
          company_id: record.companyId || '',
          client_name: record.clientName,
          client_address: record.clientAddress || '',
          client_email: record.clientEmail || '',
          client_phone: record.clientPhone || '',
          invoice_date: record.invoiceDate,
          due_date: record.dueDate,
          payment_terms: record.paymentTerms || '14 Days',
          currency: record.currency || 'INR (₹)',
          subtotal: record.subtotal.toString(),
          discount: record.discount.toString(),
          tax_pct: record.taxPct.toString(),
          tax_amount: record.taxAmount.toString(),
          total: record.total.toString(),
          amount_in_words: record.amountInWords,
          status: record.status,
          notes: record.notes || '',
          pdf_drive_url: record.pdfDriveUrl || '',
          created_at: now,
          updated_at: now,
        });
      } catch (err) {
        console.error('Error saving invoice to Sheets:', err);
      }
      return record;
    },

    update: async (id: string, data: Partial<InvoiceRecord>): Promise<InvoiceRecord | null> => {
      const records = readJSON<InvoiceRecord>(FILES.invoices, []);
      const idx = records.findIndex(inv => inv.id === id || inv.invoiceNumber === id);
      if (idx === -1) return null;
      const now = new Date().toISOString();
      records[idx] = { ...records[idx], ...data, updatedAt: now };
      writeJSON(FILES.invoices, records);

      try {
        const sheetUpdates: Record<string, any> = { updated_at: now };
        if (data.status) sheetUpdates.status = data.status;
        if (data.pdfDriveUrl) sheetUpdates.pdf_drive_url = data.pdfDriveUrl;
        await sheetsDb.updateRowById('Invoices', 'invoice_id', records[idx].id, sheetUpdates);
      } catch (err) {
        console.error('Error updating invoice in Sheets:', err);
      }
      return records[idx];
    },
  },

  invoiceItems: {
    findByInvoice: async (invoiceId: string): Promise<InvoiceItemRecord[]> => {
      let local = readJSON<InvoiceItemRecord>(FILES.invoiceItems, []);
      try {
        const rows = await sheetsDb.readTab('InvoiceItems');
        if (rows.length) {
          const map = new Map<string, InvoiceItemRecord>();
          local.forEach(i => map.set(i.id, i));
          rows.forEach(r => {
            if (r.item_id) {
              map.set(r.item_id, {
                id: r.item_id,
                invoiceId: r.invoice_id,
                serviceName: r.service_name,
                description: r.description || '',
                qty: parseInt(r.qty || '1', 10),
                rate: parseFloat(r.rate || '0') || 0,
                amount: parseFloat(r.amount || '0') || 0,
              });
            }
          });
          local = Array.from(map.values());
        }
      } catch {}
      return local.filter(item => item.invoiceId === invoiceId);
    },

    createBatch: async (items: InvoiceItemRecord[]): Promise<void> => {
      const records = readJSON<InvoiceItemRecord>(FILES.invoiceItems, []);
      records.push(...items);
      writeJSON(FILES.invoiceItems, records);

      for (const item of items) {
        try {
          await sheetsDb.appendRow('InvoiceItems', {
            item_id: item.id,
            invoice_id: item.invoiceId,
            service_name: item.serviceName,
            description: item.description,
            qty: item.qty.toString(),
            rate: item.rate.toString(),
            amount: item.amount.toString(),
          });
        } catch {}
      }
    },
  },

  services: {
    findAll: async (): Promise<ServiceRecord[]> => {
      // 1. Read local JSON cache (fast fallback)
      let local = readJSON<ServiceRecord>(FILES.services, []);
      if (local.length === 0) {
        local = [...DEFAULT_SERVICES];
        writeJSON(FILES.services, local);
      }

      try {
        const rows = await sheetsDb.readTab('Services');

        if (rows.length > 0) {
          // Google Sheets has data — Sheets is authoritative.
          // Merge: Sheets rows override local defaults by service_id.
          const map = new Map<string, ServiceRecord>();
          // Seed local defaults first as base
          local.forEach(s => map.set(s.id, s));
          // Sheets overrides by service_id
          rows.forEach(r => {
            if (r.service_id && r.name) {
              map.set(r.service_id, {
                id: r.service_id,
                name: r.name,
                description: r.description || '',
                category: r.category || 'General',
                createdAt: r.created_at || new Date().toISOString(),
              });
            }
          });
          const merged = Array.from(map.values());
          // Update local cache with merged result
          writeJSON(FILES.services, merged);
          return merged;
        } else {
          // Google Sheets Services tab is EMPTY — seed all defaults to Sheets now.
          // This ensures services survive fresh deployments when .data/ does not exist.
          console.log('[adminDb.services] Sheets Services tab is empty. Seeding 17 default services to Google Sheets...');
          for (const srv of DEFAULT_SERVICES) {
            try {
              await sheetsDb.appendRow('Services', {
                service_id: srv.id,
                name: srv.name,
                description: srv.description,
                category: srv.category || 'Development',
                created_at: srv.createdAt,
              });
            } catch (seedErr) {
              console.error(`[adminDb.services] Failed to seed service "${srv.name}" to Sheets:`, seedErr);
            }
          }
          // Update local cache
          writeJSON(FILES.services, local);
          return local;
        }
      } catch {
        // Google Sheets unavailable — return local cache as fallback
        return local;
      }
    },

    create: async (data: Omit<ServiceRecord, 'id' | 'createdAt'>): Promise<ServiceRecord> => {
      const record: ServiceRecord = {
        ...data,
        id: uid('srv'),
        createdAt: new Date().toISOString(),
      };

      // 1. Persist to Google Sheets FIRST (authoritative store)
      try {
        await sheetsDb.appendRow('Services', {
          service_id: record.id,
          name: record.name,
          description: record.description,
          category: record.category || 'Custom',
          created_at: record.createdAt,
        });
      } catch (sheetsErr) {
        console.error('[adminDb.services.create] Failed to persist to Sheets:', sheetsErr);
        // Continue — local cache will still be updated
      }

      // 2. Update local JSON cache
      const records = readJSON<ServiceRecord>(FILES.services, [...DEFAULT_SERVICES]);
      records.push(record);
      writeJSON(FILES.services, records);

      return record;
    },
  },

  settings: {
    getAll: async (): Promise<Record<string, string>> => {
      let local = readJSON<SettingRecord>(FILES.settings, []);
      const defaults: Record<string, string> = {
        appName: 'ARKLINTECH COMMAND',
        appUrl: 'http://localhost:7000',
        adminContactEmail: 'work@arklintech.com',
        notifyNewLeads: 'true',
        notifyNewInquiries: 'true',
        notifyOverdueTasks: 'true',
      };

      const result = { ...defaults };
      local.forEach(s => { result[s.key] = s.value; });

      try {
        const rows = await sheetsDb.readTab('Settings');
        if (rows.length) {
          rows.forEach(r => {
            if (r.setting_key && r.setting_value !== undefined) {
              result[r.setting_key] = r.setting_value;
            }
          });
        }
      } catch {}

      return result;
    },

    set: async (key: string, value: string, description = ''): Promise<void> => {
      const records = readJSON<SettingRecord>(FILES.settings, []);
      const now = new Date().toISOString();
      const idx = records.findIndex(r => r.key === key);
      if (idx !== -1) {
        records[idx] = { key, value, description, updatedAt: now };
      } else {
        records.push({ key, value, description, updatedAt: now });
      }
      writeJSON(FILES.settings, records);

      try {
        const rows = await sheetsDb.readTab('Settings');
        const existingRow = rows.find(r => r.setting_key === key);
        if (existingRow) {
          await sheetsDb.updateRowById('Settings', 'setting_key', key, {
            setting_value: value,
            description,
            updated_at: now,
          });
        } else {
          await sheetsDb.appendRow('Settings', {
            setting_key: key,
            setting_value: value,
            description,
            updated_at: now,
          });
        }
      } catch (err) {
        console.error('Error saving setting to Sheets:', err);
      }
    },

    setMany: async (entries: Record<string, string>): Promise<void> => {
      for (const [k, v] of Object.entries(entries)) {
        await adminDb.settings.set(k, v);
      }
    },
  },
};

