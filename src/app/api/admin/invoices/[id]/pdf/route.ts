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
    const invoice = await adminDb.invoices.findById(params.id);
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
