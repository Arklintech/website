import fs from 'fs';
import path from 'path';

async function testPdf() {
  console.log('Testing PDF generator matching Reference 3...');
  try {
    // Dynamic import of compiled or tsx
    const { generateInvoicePdfBuffer } = await import('../src/lib/invoice-pdf.ts');
    
    const invoice = {
      id: 'inv_test_001',
      invoiceNumber: 'INV-2026-001',
      clientName: 'Holistic Edge Chiropractic & Wellness Clinic',
      clientAddress: '123 Wellness Drive, Green Park\nRiyadh 12345, Saudi Arabia',
      clientEmail: 'info@holisticedgeclinic.com',
      clientPhone: '+966 50 123 4567',
      invoiceDate: '30 Sep 2026',
      dueDate: '14 Oct 2026',
      paymentTerms: '14 Days',
      currency: 'INR (₹)',
      subtotal: 130000,
      discount: 0,
      taxPct: 0,
      taxAmount: 0,
      total: 130000,
      amountInWords: 'Indian Rupees One Lakh Thirty Thousand Only',
      status: 'SENT',
      notes: '• This invoice covers the development and deployment of the agreed project scope as per our discussion.\n• Additional features outside the agreed scope will be billed separately upon approval.\n• Please make the payment within the due date to ensure continued support and development.\n• For any queries, feel free to contact us.',
      items: [
        { serviceName: 'Website Design & Development', description: 'Complete responsive website with modern UI/UX, core pages and CMS integration.', qty: 1, rate: 35000, amount: 35000 },
        { serviceName: 'Admin / Reception Panel', description: 'Staff dashboard, patient management, appointment system and operational tools.', qty: 1, rate: 45000, amount: 45000 },
        { serviceName: 'Backend & Database Integration', description: 'Google Sheets integration, data structure, APIs and system architecture.', qty: 1, rate: 25000, amount: 25000 },
        { serviceName: 'Authentication System', description: 'Firebase Authentication with role-based access control.', qty: 1, rate: 10000, amount: 10000 },
        { serviceName: 'Deployment & Configuration', description: 'Production deployment, domain configuration and testing.', qty: 1, rate: 15000, amount: 15000 },
      ]
    };

    const pdfBuffer = await generateInvoicePdfBuffer(invoice);
    const outPath = path.join(process.cwd(), '.data', 'INV-2026-001-test.pdf');
    fs.writeFileSync(outPath, pdfBuffer);
    console.log(`[PASS] PDF generated successfully (${pdfBuffer.length} bytes) at ${outPath}`);
  } catch (err) {
    console.error('[FAIL] PDF generation error:', err);
    process.exit(1);
  }
}

testPdf();
