import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

export const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1geGbeYHqqBPynAs0fnFxewl7Z-JIQtyoeqz4RqxpTUk';
export const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1Fgnp49RqJj3EWio3UKfEytz4lRJTRXeM';

// Schemas for the 12 required tabs
export const REQUIRED_TABS: Record<string, string[]> = {
  Leads: [
    'lead_id', 'contact_id', 'company_id', 'inquiry_id', 'status', 'interest',
    'urgency', 'budget', 'timeline', 'fit', 'source_id', 'owner_id',
    'next_action', 'next_action_at', 'notes', 'created_at', 'updated_at'
  ],
  Contacts: [
    'contact_id', 'first_name', 'last_name', 'email', 'phone', 'company_id',
    'job_title', 'lifecycle_stage', 'source_id', 'last_seen_at', 'created_at', 'updated_at'
  ],
  Companies: [
    'company_id', 'name', 'website', 'industry', 'size', 'location', 'source_id', 'created_at', 'updated_at'
  ],
  Inquiries: [
    'inquiry_id', 'contact_id', 'company_id', 'subject', 'message', 'source',
    'page', 'status', 'assigned_to', 'created_at', 'updated_at'
  ],
  Conversations: [
    'conversation_id', 'contact_id', 'lead_id', 'subject', 'status',
    'assigned_to', 'priority', 'last_message_at', 'created_at', 'updated_at'
  ],
  Messages: [
    'message_id', 'conversation_id', 'sender_type', 'sender_id', 'sender_email',
    'recipient_email', 'direction', 'message', 'message_id_external',
    'thread_id_external', 'status', 'sent_at', 'created_at'
  ],
  Followups: [
    'followup_id', 'lead_id', 'contact_id', 'assigned_to', 'title', 'notes',
    'due_at', 'status', 'completed_at', 'created_at', 'updated_at'
  ],
  Visitors: [
    'visitor_id', 'contact_id', 'first_seen_at', 'last_seen_at', 'source_id',
    'landing_page', 'device', 'browser', 'location', 'intent_level'
  ],
  Sessions: [
    'session_id', 'visitor_id', 'started_at', 'ended_at', 'landing_page',
    'exit_page', 'pages_viewed', 'duration_seconds', 'source_id', 'device'
  ],
  Notifications: [
    'notification_id', 'type', 'title', 'message', 'priority', 'entity_type',
    'entity_id', 'assigned_to', 'status', 'created_at', 'read_at'
  ],
  Sources: [
    'source_id', 'source', 'medium', 'campaign', 'content', 'visits', 'leads',
    'qualified_leads', 'opportunities', 'clients', 'created_at', 'updated_at'
  ],
  Settings: [
    'setting_key', 'setting_value', 'description', 'updated_at'
  ]
};

export function cleanPrivateKey(key: string): string {
  let cleaned = key.trim();
  while ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  // Replace any sequence of backslashes followed by n or r with real newline
  cleaned = cleaned.replace(/\\+n/g, '\n');
  cleaned = cleaned.replace(/\\+r/g, '');
  cleaned = cleaned.replace(/\r\n/g, '\n');
  cleaned = cleaned.replace(/\r/g, '\n');

  if (!cleaned.includes('\n') && cleaned.includes('-----BEGIN PRIVATE KEY-----')) {
    cleaned = cleaned
      .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
      .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
  }

  return cleaned;
}

export function getGoogleAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  let key = process.env.GOOGLE_PRIVATE_KEY;
  const jsonCreds = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_CREDENTIALS;

  if (jsonCreds) {
    try {
      const parsed = typeof jsonCreds === 'string' ? JSON.parse(jsonCreds) : jsonCreds;
      return new google.auth.GoogleAuth({
        credentials: {
          client_email: parsed.client_email || email,
          private_key: cleanPrivateKey(parsed.private_key || ''),
        },
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive',
        ],
      });
    } catch {}
  }

  if (key) {
    // If key is a JSON string
    if (key.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(key);
        return new google.auth.GoogleAuth({
          credentials: {
            client_email: parsed.client_email || email,
            private_key: cleanPrivateKey(parsed.private_key || ''),
          },
          scopes: [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive',
          ],
        });
      } catch {}
    }

    key = cleanPrivateKey(key);
  }

  // Fallback to credential file if env variables not supplied
  if (!email || !key) {
    const jsonPath = path.join(process.cwd(), 'arklintech-data-set-1f22cb4d9b1c.json');
    if (fs.existsSync(jsonPath)) {
      return new google.auth.GoogleAuth({
        keyFile: jsonPath,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
          'https://www.googleapis.com/auth/drive',
        ],
      });
    }
  }

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });
}

export async function getSheetsClient() {
  const auth = getGoogleAuth();
  return google.sheets({ version: 'v4', auth });
}

export async function getDriveClient() {
  const auth = getGoogleAuth();
  return google.drive({ version: 'v3', auth });
}
