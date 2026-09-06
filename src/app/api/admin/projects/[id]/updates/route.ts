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
    if (body.progress === undefined || !body.stage) {
      return NextResponse.json({ error: 'Progress % and stage are required' }, { status: 400 });
    }

    const update = await adminDb.projectUpdates.create({
      projectId: params.id,
      progress: parseInt(body.progress.toString(), 10),
      stage: body.stage,
      notes: body.notes || '',
      author: body.author || 'Anas (Lead)',
    });

    return NextResponse.json({ data: update }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project update:', err);
    return NextResponse.json({ error: 'Failed to create project update' }, { status: 500 });
  }
}
