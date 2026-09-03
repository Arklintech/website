import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const updates = await req.json();
    const followup = await adminDb.followups.update(params.id, updates);
    if (!followup) return NextResponse.json({ error: 'Follow-up not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: followup });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update follow-up' }, { status: 500 });
  }
}
