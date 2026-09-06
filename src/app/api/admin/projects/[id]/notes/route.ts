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
    if (!body.content) {
      return NextResponse.json({ error: 'Note content is required' }, { status: 400 });
    }

    const note = await adminDb.projectNotes.create({
      projectId: params.id,
      title: body.title || 'Internal Note',
      content: body.content,
      author: body.author || 'Anas (Lead)',
    });

    return NextResponse.json({ data: note }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating project note:', err);
    return NextResponse.json({ error: 'Failed to create project note' }, { status: 500 });
  }
}
