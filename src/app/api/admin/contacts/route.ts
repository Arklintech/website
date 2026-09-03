import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const contacts = await adminDb.contacts.findMany();
  return NextResponse.json({ data: contacts, total: contacts.length });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, email, phone, company, industry, notes } = await req.json();
    if (!name || !email) return NextResponse.json({ error: 'name and email required' }, { status: 400 });
    // Check for duplicate
    const existing = await adminDb.contacts.findByEmail(email);
    if (existing) return NextResponse.json({ data: existing, duplicate: true });
    const contact = await adminDb.contacts.create({ name, email, phone, company, industry, notes });
    return NextResponse.json({ success: true, data: contact });
  } catch {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}
