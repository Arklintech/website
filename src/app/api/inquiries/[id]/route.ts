import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, error: auth.status === 403 ? 'Forbidden' : 'Unauthorized.' },
        { status: auth.status || 401 }
      );
    }

    const { id } = params;
    const body = await req.json();
    const { status, notes } = body;

    const validStatuses = ['NEW', 'IN_REVIEW', 'ENGAGED', 'ARCHIVED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = await db.inquiries.update(id, {
      ...(status ? { status } : {}),
      ...(typeof notes === 'string' ? { notes } : {}),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.valid) {
      return NextResponse.json(
        { success: false, error: auth.status === 403 ? 'Forbidden' : 'Unauthorized.' },
        { status: auth.status || 401 }
      );
    }

    const { id } = params;

    const deleted = await db.inquiries.delete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found or already deleted.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Inquiry deleted.' });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry.' },
      { status: 500 }
    );
  }
}
