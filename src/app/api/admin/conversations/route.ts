import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as any;
  const convs = await adminDb.conversations.findMany({ status: status || undefined });
  return NextResponse.json({ data: convs, total: convs.length });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const conv = await adminDb.conversations.create({
      subject: body.subject || null,
      status: 'OPEN',
      assigneeId: body.assigneeId || null,
      contactId: body.contactId || null,
      leadId: body.leadId || null,
      companyId: body.companyId || null,
      lastMessageAt: new Date().toISOString(),
      unreadCount: 0,
    });
    return NextResponse.json({ success: true, data: conv });
  } catch {
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}
