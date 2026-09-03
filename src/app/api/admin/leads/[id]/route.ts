import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const lead = await adminDb.leads.findById(params.id);
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ data: lead });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const updates = await req.json();
    const lead = await adminDb.leads.update(params.id, updates);
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: lead });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const success = await adminDb.leads.delete(params.id);
  if (!success) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
