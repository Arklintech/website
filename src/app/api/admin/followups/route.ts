import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as any;
  const followups = await adminDb.followups.findMany({ status: status || undefined });
  const counts = await adminDb.followups.countByCategory();
  return NextResponse.json({ data: followups, counts });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { title, dueDate, priority, leadId, contactId, companyId, conversationId, notes, owner } = body;
    if (!title || !dueDate) return NextResponse.json({ error: 'title and dueDate required' }, { status: 400 });
    const followup = await adminDb.followups.create({
      title, dueDate, priority: priority || 'MEDIUM', status: 'OPEN',
      leadId: leadId || null, contactId: contactId || null,
      companyId: companyId || null, conversationId: conversationId || null,
      notes: notes || null, owner: owner || null,
    });
    return NextResponse.json({ success: true, data: followup });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
