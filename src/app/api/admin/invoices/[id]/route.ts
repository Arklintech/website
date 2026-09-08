import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const invoice = await adminDb.invoices.findById(params.id);
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json({ data: invoice });
  } catch (err: any) {
    console.error(`Error fetching invoice ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const body = await req.json();
    const updated = await adminDb.invoices.update(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updated });
  } catch (err: any) {
    console.error(`Error updating invoice ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const success = await adminDb.invoices.delete(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Invoice not found or could not be deleted' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: `Invoice ${params.id} deleted successfully` });
  } catch (err: any) {
    console.error(`Error deleting invoice ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
  }
}

