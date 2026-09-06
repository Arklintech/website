import { NextRequest, NextResponse } from 'next/server';
import { adminDb, amountToWordsIndian } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { generateInvoicePdfBuffer } from '@/lib/invoice-pdf';
import { uploadFileToDrive } from '@/lib/google-drive';

export async function GET(req: NextRequest) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const invoices = await adminDb.invoices.findRecent(100);
    return NextResponse.json({ data: invoices, count: invoices.length });
  } catch (err: any) {
    console.error('Error fetching invoices:', err);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const body = await req.json();
    if (!body.clientName) {
      return NextResponse.json({ error: 'Client name is required' }, { status: 400 });
    }

    const items = (body.items || []).map((item: any) => ({
      serviceName: item.serviceName || 'Custom Service',
      description: item.description || '',
      qty: parseInt(item.qty || '1', 10),
      rate: parseFloat(item.rate || item.amount || '0') || 0,
      amount: parseFloat(item.amount || item.rate || '0') || 0,
    }));

    const subtotal = items.reduce((sum: number, it: any) => sum + it.amount, 0);
    const discount = parseFloat(body.discount || '0') || 0;
    const taxPct = parseFloat(body.taxPct || '0') || 0;
    const taxAmount = Math.round((subtotal - discount) * (taxPct / 100));
    const total = Math.max(0, subtotal - discount + taxAmount);
    const amountInWords = body.amountInWords || amountToWordsIndian(total);

    const invoiceNumber = body.invoiceNumber || await adminDb.invoices.getNextInvoiceNumber();

    const invoice = await adminDb.invoices.create({
      invoiceNumber,
      projectId: body.projectId || null,
      companyId: body.companyId || null,
      clientName: body.clientName,
      clientAddress: body.clientAddress || '',
      clientEmail: body.clientEmail || '',
      clientPhone: body.clientPhone || '',
      invoiceDate: body.invoiceDate || new Date().toISOString().split('T')[0],
      dueDate: body.dueDate || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      paymentTerms: body.paymentTerms || '14 Days',
      currency: body.currency || 'INR (₹)',
      subtotal,
      discount,
      taxPct,
      taxAmount,
      total,
      amountInWords,
      status: body.status || 'SENT',
      notes: body.notes || 'This invoice covers the development and deployment of the agreed project scope.',
      items,
    });

    // Automatically generate and upload PDF to Google Drive
    try {
      const pdfBuffer = await generateInvoicePdfBuffer(invoice);
      const filename = `${invoice.invoiceNumber}_${invoice.clientName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      const driveMeta = await uploadFileToDrive(pdfBuffer, filename, 'application/pdf', 'Documents');

      if (driveMeta.drive_url) {
        await adminDb.invoices.update(invoice.id, { pdfDriveUrl: driveMeta.drive_url });
        invoice.pdfDriveUrl = driveMeta.drive_url;
      }
    } catch (pdfErr) {
      console.error('Error generating and uploading invoice PDF to Drive:', pdfErr);
    }

    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (err: any) {
    console.error('Error creating invoice:', err);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
