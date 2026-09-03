import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const notifs = await adminDb.notifications.findAll();
  const unread = await adminDb.notifications.countUnread();
  return NextResponse.json({ data: notifs, unread });
}

export async function PATCH(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    await adminDb.notifications.markRead(id);
  } else {
    await adminDb.notifications.markAllRead();
  }
  return NextResponse.json({ success: true });
}
