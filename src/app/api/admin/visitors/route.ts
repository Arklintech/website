import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const active = searchParams.get('active') === 'true';
  const visitors = active ? await adminDb.visitors.findActive() : await adminDb.visitors.findRecent();
  return NextResponse.json({ data: visitors, total: visitors.length });
}
