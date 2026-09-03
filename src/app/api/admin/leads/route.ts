import { NextRequest, NextResponse } from 'next/server';
import { adminDb, LeadStatus } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') as LeadStatus | null;
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  const leads = await adminDb.leads.findMany({ status: status || undefined, limit, offset });
  const total = await adminDb.leads.count(status || undefined);
  const byStatus = await adminDb.leads.countByStatus();

  return NextResponse.json({ data: leads, total, byStatus });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { name, email, phone, company, industry, projectType, interest, budget, timeline, problem, message, source, priority, owner, notes } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 });
    }

    const lead = await adminDb.leads.create({
      name, email, phone, company, industry, projectType, interest, budget, timeline, problem, message, source,
      status: 'NEW',
      priority: priority || 'MEDIUM',
      owner: owner || null,
      notes: notes || null,
      contactId: null, companyId: null, inquiryId: null,
    });

    // Create notification
    await adminDb.notifications.create({
      type: 'NEW_LEAD',
      title: 'New Lead',
      body: `${name} submitted a system inquiry.`,
      actionLabel: 'Open Lead →',
      actionUrl: `/admin/leads/${lead.id}`,
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
