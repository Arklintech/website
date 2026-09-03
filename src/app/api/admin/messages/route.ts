import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const convId = searchParams.get('conversationId');
  if (!convId) return NextResponse.json({ error: 'conversationId required' }, { status: 400 });
  const messages = await adminDb.messages.findByConversation(convId);
  return NextResponse.json({ data: messages });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { conversationId, body: msgBody, direction, isInternal, from, to, subject } = body;
    if (!conversationId || !msgBody) return NextResponse.json({ error: 'conversationId and body required' }, { status: 400 });

    const message = await adminDb.messages.create({
      conversationId,
      direction: direction || 'OUTBOUND',
      from: from || 'admin@arklintech.com',
      to: to || null,
      subject: subject || null,
      body: msgBody,
      isInternal: isInternal || false,
      emailMessageId: null,
      deliveryStatus: direction === 'OUTBOUND' && !isInternal ? 'QUEUED' : null,
      createdAt: new Date().toISOString(),
    });

    // Update conversation lastMessageAt
    await adminDb.conversations.update(conversationId, {
      lastMessageAt: new Date().toISOString(),
      status: direction === 'OUTBOUND' ? 'WAITING_FOR_THEM' : 'WAITING_FOR_US',
    });

    // If it's inbound, create notification
    if (direction === 'INBOUND' && !isInternal) {
      await adminDb.notifications.create({
        type: 'NEW_REPLY',
        title: 'New Reply',
        body: `${from || 'Contact'} replied to the conversation.`,
        actionLabel: 'Open Inbox →',
        actionUrl: `/admin/inbox?conversation=${conversationId}`,
      });
    }

    return NextResponse.json({ success: true, data: message });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
