import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Milestone title is required' }, { status: 400 });
    }

    const milestone = await adminDb.projectMilestones.create({
      projectId: params.id,
      title: body.title,
      description: body.description || '',
      dueDate: body.dueDate || new Date().toISOString().split('T')[0],
      status: body.status || 'PENDING',
    });

    return NextResponse.json({ data: milestone }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating milestone:', err);
    return NextResponse.json({ error: 'Failed to create milestone' }, { status: 500 });
  }
}
