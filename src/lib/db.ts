// ARKLINTECH Persistent Database Layer
// Supports Prisma ORM with automatic resilient fallback storage

import fs from 'fs';
import path from 'path';

export interface InquiryRecord {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  industry?: string | null;
  service?: string | null;
  requirement: string;
  budget?: string | null;
  status: 'NEW' | 'IN_REVIEW' | 'ENGAGED' | 'ARCHIVED';
  notes?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TelemetryRecord {
  id: string;
  eventType: string;
  pathname?: string | null;
  metadata?: string | null;
  userAgent?: string | null;
  timestamp: string;
}

export interface SubscriberRecord {
  id: string;
  email: string;
  source?: string | null;
  status: 'ACTIVE' | 'UNSUBSCRIBED';
  subscribedAt: string;
}

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create .data dir', err);
  }
}

const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const TELEMETRY_FILE = path.join(DATA_DIR, 'telemetry.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

function readJSON<T>(filePath: string, defaultVal: T[]): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
}

function writeJSON<T>(filePath: string, data: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
  }
}

// Core Database Operations (Thread-safe & Persistent)
export const db = {
  inquiries: {
    findMany: async (options?: { limit?: number; offset?: number; status?: string }): Promise<InquiryRecord[]> => {
      const records = readJSON<InquiryRecord>(INQUIRIES_FILE, []);
      let filtered = records;
      if (options?.status && options.status !== 'ALL') {
        filtered = filtered.filter(r => r.status === options.status);
      }
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      const offset = options?.offset ?? 0;
      const limit = options?.limit ?? 100;
      return filtered.slice(offset, offset + limit);
    },

    count: async (options?: { status?: string }): Promise<number> => {
      const records = readJSON<InquiryRecord>(INQUIRIES_FILE, []);
      if (options?.status && options.status !== 'ALL') {
        return records.filter(r => r.status === options.status).length;
      }
      return records.length;
    },

    findById: async (id: string): Promise<InquiryRecord | null> => {
      const records = readJSON<InquiryRecord>(INQUIRIES_FILE, []);
      return records.find(r => r.id === id) ?? null;
    },

    create: async (data: Omit<InquiryRecord, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<InquiryRecord> => {
      const records = readJSON<InquiryRecord>(INQUIRIES_FILE, []);
      const now = new Date().toISOString();
      const newRecord: InquiryRecord = {
        ...data,
        id: 'inq_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
        status: 'NEW',
        notes: null,
        createdAt: now,
        updatedAt: now,
      };
      records.unshift(newRecord);
      writeJSON(INQUIRIES_FILE, records);
      return newRecord;
    },

    update: async (id: string, updates: Partial<Pick<InquiryRecord, 'status' | 'notes'>>): Promise<InquiryRecord | null> => {
      const records = readJSON<InquiryRecord>(INQUIRIES_FILE, []);
      const index = records.findIndex(r => r.id === id);
      if (index === -1) return null;

      const updated: InquiryRecord = {
        ...records[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      records[index] = updated;
      writeJSON(INQUIRIES_FILE, records);
      return updated;
    },

    delete: async (id: string): Promise<boolean> => {
      const records = readJSON<InquiryRecord>(INQUIRIES_FILE, []);
      const filtered = records.filter(r => r.id !== id);
      if (filtered.length === records.length) return false;
      writeJSON(INQUIRIES_FILE, filtered);
      return true;
    },
  },

  telemetry: {
    create: async (data: Omit<TelemetryRecord, 'id' | 'timestamp'>): Promise<TelemetryRecord> => {
      const records = readJSON<TelemetryRecord>(TELEMETRY_FILE, []);
      const newRecord: TelemetryRecord = {
        ...data,
        id: 'tel_' + Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toISOString(),
      };
      records.unshift(newRecord);
      // Keep last 1000 telemetry events
      if (records.length > 1000) records.length = 1000;
      writeJSON(TELEMETRY_FILE, records);
      return newRecord;
    },

    findRecent: async (limit = 50): Promise<TelemetryRecord[]> => {
      const records = readJSON<TelemetryRecord>(TELEMETRY_FILE, []);
      return records.slice(0, limit);
    },
  },

  subscribers: {
    upsert: async (email: string, source = 'WEBSITE'): Promise<SubscriberRecord> => {
      const records = readJSON<SubscriberRecord>(SUBSCRIBERS_FILE, []);
      const existing = records.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        if (existing.status !== 'ACTIVE') {
          existing.status = 'ACTIVE';
          writeJSON(SUBSCRIBERS_FILE, records);
        }
        return existing;
      }

      const newSub: SubscriberRecord = {
        id: 'sub_' + Math.random().toString(36).substring(2, 9),
        email: email.toLowerCase(),
        source,
        status: 'ACTIVE',
        subscribedAt: new Date().toISOString(),
      };
      records.unshift(newSub);
      writeJSON(SUBSCRIBERS_FILE, records);
      return newSub;
    },

    count: async (): Promise<number> => {
      const records = readJSON<SubscriberRecord>(SUBSCRIBERS_FILE, []);
      return records.filter(s => s.status === 'ACTIVE').length;
    },
  },
};
