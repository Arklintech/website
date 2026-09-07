import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { generateInvoicePdfBuffer } from '@/lib/invoice-pdf';
import { uploadFileToDrive } from '@/lib/google-drive';

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

    const pdfBuffer = await generateInvoicePdfBuffer(invoice);
    const filename = `${invoice.invoiceNumber || 'invoice'}.pdf`;

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (err: any) {
    console.error('Error generating PDF:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const body = await req.json().catch(() => null);
    let invoice = await adminDb.invoices.findById(params.id);

    if (!invoice && body && (body.clientName || body.items)) {
      // Build invoice directly from client payload so PDF generation never fails on cold starts / new records
      const now = new Date().toISOString();
      invoice = {
        id: params.id,
        invoiceNumber: body.invoiceNumber || params.id,
        projectId: body.projectId || null,
        companyId: body.companyId || null,
        clientName: body.clientName || 'Client',
        clientAddress: body.clientAddress || '',
        clientEmail: body.clientEmail || '',
        clientPhone: body.clientPhone || '',
        invoiceDate: body.invoiceDate || now.split('T')[0],
        dueDate: body.dueDate || '',
        paymentTerms: body.paymentTerms || '14 Days',
        currency: body.currency || 'INR (₹)',
        subtotal: body.subtotal || 0,
        discount: body.discount || 0,
        taxPct: body.taxPct || 0,
        taxAmount: body.taxAmount || 0,
        total: body.total || 0,
        amountInWords: body.amountInWords || '',
        status: body.status || 'SENT',
        notes: body.notes || '',
        pdfDriveUrl: body.pdfDriveUrl || '',
        items: body.items || [],
        createdAt: now,
        updatedAt: now,
      };
      // Upsert into adminDb in background
      adminDb.invoices.update(params.id, invoice).catch(console.error);
    } else if (invoice && body) {
      // Merge latest client body values so generated PDF reflects real-time form state
      if (body.clientName) invoice.clientName = body.clientName;
      if (body.clientAddress !== undefined) invoice.clientAddress = body.clientAddress;
      if (body.clientEmail !== undefined) invoice.clientEmail = body.clientEmail;
      if (body.clientPhone !== undefined) invoice.clientPhone = body.clientPhone;
      if (body.invoiceDate) invoice.invoiceDate = body.invoiceDate;
      if (body.dueDate) invoice.dueDate = body.dueDate;
      if (body.paymentTerms) invoice.paymentTerms = body.paymentTerms;
      if (body.currency) invoice.currency = body.currency;
      if (body.subtotal !== undefined) invoice.subtotal = body.subtotal;
      if (body.discount !== undefined) invoice.discount = body.discount;
      if (body.taxPct !== undefined) invoice.taxPct = body.taxPct;
      if (body.taxAmount !== undefined) invoice.taxAmount = body.taxAmount;
      if (body.total !== undefined) invoice.total = body.total;
      if (body.amountInWords) invoice.amountInWords = body.amountInWords;
      if (body.notes !== undefined) invoice.notes = body.notes;
      if (body.items && Array.isArray(body.items) && body.items.length > 0) invoice.items = body.items;
    }

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const pdfBuffer = await generateInvoicePdfBuffer(invoice);
    const safeClientName = (invoice.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${invoice.invoiceNumber || 'INV-2026'}_${safeClientName}.pdf`;

    const driveUrl = invoice.pdfDriveUrl || '';

    // Non-blocking asynchronous upload to Google Drive for INSTANT PDF download speed (< 100ms)
    uploadFileToDrive(pdfBuffer, filename, 'application/pdf', 'Documents')
      .then(async (driveMeta) => {
        if (driveMeta?.drive_url) {
          await adminDb.invoices.update(invoice.id, { pdfDriveUrl: driveMeta.drive_url });
        }
      })
      .catch((driveErr) => {
        console.warn('Google Drive invoice PDF background sync skipped:', driveErr);
      });

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-Drive-Url': driveUrl || '',
      },
    });
  } catch (err: any) {
    console.error('Error generating/uploading PDF:', err);
    return NextResponse.json({ error: 'Failed to generate and upload PDF' }, { status: 500 });
  }
}
