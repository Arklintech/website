import { getSheetsClient, SPREADSHEET_ID, REQUIRED_TABS } from './google';

export class SheetsProviderError extends Error {
  public status?: number;
  public code?: string | number;
  public tabName?: string;
  public isTransient: boolean;

  constructor(message: string, opts?: { status?: number; code?: string | number; tabName?: string; isTransient?: boolean }) {
    super(message);
    this.name = 'SheetsProviderError';
    this.status = opts?.status;
    this.code = opts?.code;
    this.tabName = opts?.tabName;
    this.isTransient = opts?.isTransient ?? false;
  }
}

function isTransientError(err: any): boolean {
  if (!err) return false;

  const status = err.status || err.code || err.response?.status;
  if (status === 429 || status === 'RESOURCE_EXHAUSTED' || status === 500 || status === 502 || status === 503 || status === 504) {
    return true;
  }

  const msg = (err.message || '').toLowerCase();
  if (
    msg.includes('quota exceeded') ||
    msg.includes('too many requests') ||
    msg.includes('resource_exhausted') ||
    msg.includes('rate limit') ||
    msg.includes('econnreset') ||
    msg.includes('etimedout') ||
    msg.includes('enotfound') ||
    msg.includes('fetch failed') ||
    msg.includes('network error')
  ) {
    return true;
  }

  if (err.cause) {
    const causeMsg = (err.cause.message || '').toLowerCase();
    if (causeMsg.includes('quota exceeded') || causeMsg.includes('resource_exhausted')) return true;
  }

  return false;
}

function sanitizeErrorMessage(err: any, tabName?: string): string {
  const status = err?.status || err?.code || err?.response?.status || '503';
  let message = `Google Sheets provider error (${status})`;
  if (tabName) {
    message += ` for tab "${tabName}"`;
  }
  return message;
}

export async function executeWithRetry<T>(
  operation: () => Promise<T>,
  opts?: { maxRetries?: number; initialDelayMs?: number; tabName?: string }
): Promise<T> {
  const maxRetries = opts?.maxRetries ?? 3;
  let delay = opts?.initialDelayMs ?? 300;
  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err: any) {
      lastError = err;
      const transient = isTransientError(err);

      if (!transient || attempt === maxRetries) {
        throw new SheetsProviderError(sanitizeErrorMessage(err, opts?.tabName), {
          status: err?.status || err?.response?.status || 503,
          code: err?.code || 'SHEETS_PROVIDER_FAILURE',
          tabName: opts?.tabName,
          isTransient: transient,
        });
      }

      const jitter = Math.random() * 50;
      await new Promise(resolve => setTimeout(resolve, delay + jitter));
      delay *= 2;
    }
  }

  throw new SheetsProviderError(sanitizeErrorMessage(lastError, opts?.tabName), {
    tabName: opts?.tabName,
    isTransient: true,
  });
}

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}${Date.now().toString(36)}`;
}

// Convert row array to object based on tab schema
function rowToObject(tabName: string, row: any[]): Record<string, any> {
  const headers = REQUIRED_TABS[tabName] || [];
  const obj: Record<string, any> = {};
  headers.forEach((h, i) => {
    obj[h] = row[i] !== undefined ? row[i] : null;
  });
  return obj;
}

// Convert object to row array based on tab schema
function objectToRow(tabName: string, obj: Record<string, any>): any[] {
  const headers = REQUIRED_TABS[tabName] || [];
  return headers.map(h => obj[h] !== undefined && obj[h] !== null ? String(obj[h]) : '');
}

export const sheetsDb = {
  // Read all rows from a tab
  readTab: async (tabName: string): Promise<Record<string, any>[]> => {
    const rows = await executeWithRetry(async () => {
      const sheets = await getSheetsClient();
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${tabName}'!A2:Z`,
      });
      return res.data.values || [];
    }, { tabName });

    return rows.map(r => rowToObject(tabName, r));
  },

  // Batch read multiple tabs sequentially to avoid quota bursts
  readTabs: async (tabNames: string[]): Promise<Record<string, Record<string, any>[]>> => {
    const resMap: Record<string, Record<string, any>[]> = {};
    for (const tab of tabNames) {
      resMap[tab] = await sheetsDb.readTab(tab);
    }
    return resMap;
  },

  // Append a row to a tab
  appendRow: async (tabName: string, recordObj: Record<string, any>): Promise<Record<string, any>> => {
    return executeWithRetry(async () => {
      const sheets = await getSheetsClient();
      const rowData = objectToRow(tabName, recordObj);
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${tabName}'!A:Z`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData],
        },
      });
      return recordObj;
    }, { tabName });
  },

  // Update a row by ID column
  updateRowById: async (tabName: string, idColumn: string, idValue: string, updates: Record<string, any>): Promise<boolean> => {
    return executeWithRetry(async () => {
      const sheets = await getSheetsClient();
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${tabName}'!A2:Z`,
      });
      const rows = res.data.values || [];
      const headers = REQUIRED_TABS[tabName] || [];
      const idIdx = headers.indexOf(idColumn);
      if (idIdx === -1) return false;

      const rowIndex = rows.findIndex(r => r[idIdx] === idValue);
      if (rowIndex === -1) return false;

      const existingObj = rowToObject(tabName, rows[rowIndex]);
      const updatedObj = { ...existingObj, ...updates, updated_at: new Date().toISOString() };
      const updatedRow = objectToRow(tabName, updatedObj);

      const rowNum = rowIndex + 2; // +2 for 1-indexed & header row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${tabName}'!A${rowNum}:Z${rowNum}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [updatedRow],
        },
      });
      return true;
    }, { tabName });
  },

  // Delete a row by ID column
  deleteRowById: async (tabName: string, idColumn: string, idValue: string): Promise<boolean> => {
    return executeWithRetry(async () => {
      const sheets = await getSheetsClient();
      const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `'${tabName}'!A2:Z`,
      });
      const rows = res.data.values || [];
      const headers = REQUIRED_TABS[tabName] || [];
      const idIdx = headers.indexOf(idColumn);
      if (idIdx === -1) return false;

      const rowIndex = rows.findIndex(r => r[idIdx] === idValue);
      if (rowIndex === -1) return false;

      // Get sheet ID for tabName
      const sheetMeta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
      const sheet = sheetMeta.data.sheets?.find(s => s.properties?.title === tabName);
      if (!sheet || sheet.properties?.sheetId === undefined) return false;

      const rowNum = rowIndex + 1; // 0-indexed for batchUpdate, starting at index 1 (since index 0 is header)
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: sheet.properties.sheetId,
                  dimension: 'ROWS',
                  startIndex: rowNum,
                  endIndex: rowNum + 1,
                },
              },
            },
          ],
        },
      });
      return true;
    }, { tabName });
  },

  // Specialized Contact Deduplication (by email)
  contacts: {
    findOrCreate: async (data: { first_name?: string; last_name?: string; email: string; phone?: string; company_id?: string; job_title?: string; source_id?: string }): Promise<Record<string, any>> => {
      const contacts = await sheetsDb.readTab('Contacts');
      const existing = contacts.find(c => c.email && c.email.toLowerCase() === data.email.toLowerCase());
      if (existing) return existing;

      const now = new Date().toISOString();
      const newContact = {
        contact_id: uid('cnt'),
        first_name: data.first_name || data.email.split('@')[0],
        last_name: data.last_name || '',
        email: data.email,
        phone: data.phone || '',
        company_id: data.company_id || '',
        job_title: data.job_title || '',
        lifecycle_stage: 'LEAD',
        source_id: data.source_id || 'website',
        last_seen_at: now,
        created_at: now,
        updated_at: now,
      };
      await sheetsDb.appendRow('Contacts', newContact);
      return newContact;
    },
  },

  // Specialized Companies Creation
  companies: {
    create: async (data: { name: string; website?: string; industry?: string; size?: string; location?: string; source_id?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        company_id: uid('cmp'),
        name: data.name,
        website: data.website || '',
        industry: data.industry || '',
        size: data.size || '',
        location: data.location || '',
        source_id: data.source_id || 'website',
        created_at: now,
        updated_at: now,
      };
      await sheetsDb.appendRow('Companies', record);
      return record;
    },
  },

  // Specialized Inquiries Creation
  inquiries: {
    create: async (data: { contact_id: string; company_id?: string; subject: string; message: string; source?: string; page?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        inquiry_id: uid('inq'),
        contact_id: data.contact_id,
        company_id: data.company_id || '',
        subject: data.subject,
        message: data.message,
        source: data.source || 'Website Inquiry Form',
        page: data.page || '/start-a-system',
        status: 'NEW',
        assigned_to: '',
        created_at: now,
        updated_at: now,
      };
      await sheetsDb.appendRow('Inquiries', record);
      return record;
    },
  },

  // Specialized Leads Creation & Updating
  leads: {
    create: async (data: { contact_id: string; company_id?: string; inquiry_id?: string; interest?: string; budget?: string; notes?: string; source_id?: string; status?: string; urgency?: string; timeline?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        lead_id: uid('lead'),
        contact_id: data.contact_id,
        company_id: data.company_id || '',
        inquiry_id: data.inquiry_id || '',
        status: data.status || 'NEW',
        interest: data.interest || '',
        urgency: data.urgency || 'HIGH',
        budget: data.budget || '',
        timeline: data.timeline || 'ASAP',
        fit: 'HIGH',
        source_id: data.source_id || 'website',
        owner_id: '',
        next_action: 'Initial Outreach',
        next_action_at: now,
        notes: data.notes || '',
        created_at: now,
        updated_at: now,
      };
      await sheetsDb.appendRow('Leads', record);
      return record;
    },
    update: async (leadId: string, updates: Record<string, any>): Promise<boolean> => {
      return sheetsDb.updateRowById('Leads', 'lead_id', leadId, updates);
    },
  },

  // Specialized Conversations
  conversations: {
    create: async (data: { contact_id?: string; lead_id?: string; subject: string; status?: string; assigned_to?: string; priority?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        conversation_id: uid('conv'),
        contact_id: data.contact_id || '',
        lead_id: data.lead_id || '',
        subject: data.subject,
        status: data.status || 'OPEN',
        assigned_to: data.assigned_to || '',
        priority: data.priority || 'MEDIUM',
        last_message_at: now,
        created_at: now,
        updated_at: now,
      };
      await sheetsDb.appendRow('Conversations', record);
      return record;
    },
    update: async (conversationId: string, updates: Record<string, any>): Promise<boolean> => {
      return sheetsDb.updateRowById('Conversations', 'conversation_id', conversationId, updates);
    },
  },

  // Specialized Messages
  messages: {
    create: async (data: { conversation_id: string; sender_type?: string; sender_id?: string; sender_email?: string; recipient_email?: string; direction?: string; message: string; status?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        message_id: uid('msg'),
        conversation_id: data.conversation_id,
        sender_type: data.sender_type || 'CONTACT',
        sender_id: data.sender_id || '',
        sender_email: data.sender_email || '',
        recipient_email: data.recipient_email || '',
        direction: data.direction || 'INBOUND',
        message: data.message,
        message_id_external: '',
        thread_id_external: '',
        status: data.status || 'DELIVERED',
        sent_at: now,
        created_at: now,
      };
      await sheetsDb.appendRow('Messages', record);
      return record;
    },
  },

  // Specialized Followups
  followups: {
    create: async (data: { lead_id?: string; contact_id?: string; assigned_to?: string; title: string; notes?: string; due_at: string; status?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        followup_id: uid('fu'),
        lead_id: data.lead_id || '',
        contact_id: data.contact_id || '',
        assigned_to: data.assigned_to || '',
        title: data.title,
        notes: data.notes || '',
        due_at: data.due_at,
        status: data.status || 'OPEN',
        completed_at: '',
        created_at: now,
        updated_at: now,
      };
      await sheetsDb.appendRow('Followups', record);
      return record;
    },
    update: async (followupId: string, updates: Record<string, any>): Promise<boolean> => {
      return sheetsDb.updateRowById('Followups', 'followup_id', followupId, updates);
    },
  },

  // Specialized Notifications Creation & Updating
  notifications: {
    create: async (data: { type: string; title: string; message: string; priority?: string; entity_type?: string; entity_id?: string; action_label?: string; action_url?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const record = {
        notification_id: uid('notif'),
        type: data.type,
        title: data.title,
        message: data.message,
        priority: data.priority || 'HIGH',
        entity_type: data.entity_type || 'INQUIRY',
        entity_id: data.entity_id || '',
        action_label: data.action_label || (data.entity_id ? 'View Lead' : ''),
        action_url: data.action_url || (data.entity_id ? `/admin/leads/${data.entity_id}` : ''),
        assigned_to: '',
        status: 'UNREAD',
        created_at: now,
        read_at: '',
      };
      await sheetsDb.appendRow('Notifications', record);
      return record;
    },
    markRead: async (notificationId: string): Promise<boolean> => {
      const now = new Date().toISOString();
      return sheetsDb.updateRowById('Notifications', 'notification_id', notificationId, {
        status: 'READ',
        read_at: now,
      });
    },
  },

  // Specialized Visitors & Sessions tracking
  visitors: {
    upsertVisitor: async (data: { visitor_id?: string; contact_id?: string; landing_page?: string; device?: string; browser?: string; location?: string; intent_level?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const visitors = await sheetsDb.readTab('Visitors');
      let existing = data.visitor_id ? visitors.find(v => v.visitor_id === data.visitor_id) : null;

      if (existing) {
        await sheetsDb.updateRowById('Visitors', 'visitor_id', existing.visitor_id, {
          last_seen_at: now,
          intent_level: data.intent_level || existing.intent_level || 'LOW',
        });
        return { ...existing, last_seen_at: now };
      }

      const newVisitor = {
        visitor_id: data.visitor_id || uid('vis'),
        contact_id: data.contact_id || '',
        first_seen_at: now,
        last_seen_at: now,
        source_id: 'Direct',
        landing_page: data.landing_page || '/',
        device: data.device || 'Desktop',
        browser: data.browser || 'Chrome',
        location: data.location || 'India',
        intent_level: data.intent_level || 'LOW',
      };
      await sheetsDb.appendRow('Visitors', newVisitor);
      return newVisitor;
    },
  },

  sessions: {
    createSession: async (data: { session_id?: string; visitor_id: string; landing_page?: string; device?: string }): Promise<Record<string, any>> => {
      const now = new Date().toISOString();
      const newSession = {
        session_id: data.session_id || uid('sess'),
        visitor_id: data.visitor_id,
        started_at: now,
        ended_at: '',
        landing_page: data.landing_page || '/',
        exit_page: data.landing_page || '/',
        pages_viewed: '1',
        duration_seconds: '0',
        source_id: 'Direct',
        device: data.device || 'Desktop',
      };
      await sheetsDb.appendRow('Sessions', newSession);
      return newSession;
    },
  },
};
