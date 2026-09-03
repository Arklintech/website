import { NextRequest, NextResponse } from 'next/server';
import { adminDb, LeadStatus, Priority } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const lead = await adminDb.leads.findById(params.id);
  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  // Fetch related contact if linked
  const contact = lead.contactId ? await adminDb.contacts.findById(lead.contactId) : null;

  return NextResponse.json({ data: lead, contact });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const validStatuses: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL', 'ACTIVE', 'WON', 'LOST'];
    const validPriorities: Priority[] = ['LOW', 'MEDIUM', 'HIGH'];

    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json({ error: `Invalid status. Must be: ${validStatuses.join(', ')}` }, { status: 400 });
    }
    if (body.priority && !validPriorities.includes(body.priority)) {
      return NextResponse.json({ error: `Invalid priority. Must be: ${validPriorities.join(', ')}` }, { status: 400 });
    }

    const updated = await adminDb.leads.update(params.id, body);
    if (!updated) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const deleted = await adminDb.leads.delete(params.id);
  if (!deleted) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
