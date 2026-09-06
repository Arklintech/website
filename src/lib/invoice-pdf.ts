import { PDFDocument, rgb, StandardFonts, PDFName, PDFString, PDFArray, PDFDict } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { InvoiceRecord } from './admin-db';

/**
 * Creates a clickable hyperlink annotation (URI or mailto) on a PDF page.
 * @param doc   - The PDFDocument context
 * @param page  - The page to annotate
 * @param x     - Left edge of the clickable rectangle (points)
 * @param y     - Bottom edge of the clickable rectangle (points)
 * @param w     - Width of the clickable rectangle
 * @param h     - Height of the clickable rectangle
 * @param uri   - The URI string (https://... or mailto:...)
 */
function addLinkAnnotation(
  doc: PDFDocument,
  page: ReturnType<PDFDocument['addPage']>,
  x: number,
  y: number,
  w: number,
  h: number,
  uri: string
): void {
  // Build the /Action dictionary with /S /URI
  const actionDict = doc.context.obj({
    Type: 'Action',
    S: 'URI',
    URI: PDFString.of(uri),
  }) as PDFDict;
  const actionRef = doc.context.register(actionDict);

  // Build the /Annot /Link dictionary with /Rect and /A (action)
  const annotDict = doc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [x, y, x + w, y + h],
    Border: [0, 0, 0],        // Invisible border
    C: [],                     // No color overlay
    A: actionRef,
    F: 4,                      // Print flag
  }) as PDFDict;
  const annotRef = doc.context.register(annotDict);

  // Add to page's /Annots array
  const existingAnnots = page.node.get(PDFName.of('Annots'));
  if (existingAnnots instanceof PDFArray) {
    existingAnnots.push(annotRef);
  } else {
    page.node.set(PDFName.of('Annots'), doc.context.obj([annotRef]));
  }
}

function cleanWinAnsi(str: string): string {
  if (!str) return '';
  return str
    .replace(/\u20B9/g, 'INR ')
    .replace(/₹/g, 'INR ')
    .replace(/[^\x00-\x7F]/g, '');
}

function formatCurrency(val: number): string {
  const formatted = Math.round(val).toLocaleString('en-IN');
  return `INR ${formatted}`;
}

export async function generateInvoicePdfBuffer(invoice: InvoiceRecord): Promise<Buffer> {
  const doc = await PDFDocument.create();
  // Standard A4: 595.28 x 841.89 points
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await doc.embedFont(StandardFonts.Courier);

  // Colors matching ARKLINTECH design system
  const colorBg = rgb(0.992, 0.984, 0.969); // #FDFBF7 cream
  const colorNavy = rgb(0.043, 0.075, 0.169); // #0B132B deep navy
  const colorBlue = rgb(0.078, 0.388, 1.0); // #1463FF electric blue
  const colorGrayText = rgb(0.392, 0.455, 0.545); // #64748B slate
  const colorLightBorder = rgb(0.91, 0.894, 0.863); // #E8E4DC
  const colorWhite = rgb(1, 1, 1);
  const colorAccentLight = rgb(0.929, 0.957, 1.0); // #EDF4FF
  const colorPillBg = rgb(0.859, 0.918, 0.996); // #DBEAFE
  const colorPillText = rgb(0.114, 0.306, 0.847); // #1D4ED8

  // 1. Draw Cream Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: colorBg,
  });

  // 2. Header Area
  const brandDir = path.join(process.cwd(), 'public', 'brand');
  const headerLogoPath = path.join(brandDir, 'arklintech-invoice-header.png');
  const signaturePath = path.join(brandDir, 'anas-signature.png');

  let headerY = height - 55;

  if (fs.existsSync(headerLogoPath)) {
    const headerBytes = fs.readFileSync(headerLogoPath);
    const headerImg = await doc.embedPng(headerBytes);
    const imgWidth = 180;
    const imgHeight = (imgWidth / headerImg.width) * headerImg.height;
    page.drawImage(headerImg, {
      x: 36,
      y: headerY - imgHeight + 10,
      width: imgWidth,
      height: imgHeight,
    });
  } else {
    page.drawText('ARKLINTECH', {
      x: 36,
      y: headerY - 10,
      size: 18,
      font: fontBold,
      color: colorNavy,
    });
    page.drawText('TECHNOLOGY SYSTEMS', {
      x: 36,
      y: headerY - 24,
      size: 9,
      font: fontRegular,
      color: colorBlue,
    });
  }

  // Right Header Tagline & Accent lines
  page.drawLine({
    start: { x: width - 180, y: headerY + 12 },
    end: { x: width - 180, y: headerY - 32 },
    thickness: 1.5,
    color: colorBlue,
  });

  page.drawText('INTELLIGENT', { x: width - 170, y: headerY + 6, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('SYSTEMS', { x: width - 170, y: headerY - 4, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('FOR A', { x: width - 170, y: headerY - 14, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('BRIGHTER', { x: width - 170, y: headerY - 24, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('TOMORROW', { x: width - 170, y: headerY - 34, size: 7.5, font: fontBold, color: colorNavy });

  // Sub-header Slogan: "IDEAS  →  SYSTEMS  →  REAL  IMPACT"
  page.drawText('IDEAS    ->    SYSTEMS    ->    REAL    IMPACT', {
    x: 36,
    y: headerY - 44,
    size: 7.5,
    font: fontBold,
    color: colorNavy,
  });

  // Divider Line below header
  page.drawLine({
    start: { x: 36, y: headerY - 54 },
    end: { x: width - 36, y: headerY - 54 },
    thickness: 0.75,
    color: colorLightBorder,
  });

  // 3. Information Columns (BILL TO, PROJECT, INVOICE)
  const infoY = headerY - 70;

  // ── Column 1: BILL TO ──
  page.drawText('BILL TO', { x: 36, y: infoY, size: 7.5, font: fontBold, color: colorBlue });
  page.drawText(invoice.clientName || 'Client Name', {
    x: 36,
    y: infoY - 14,
    size: 10,
    font: fontBold,
    color: colorNavy,
  });

  const addressLines = (invoice.clientAddress || '').split('\n').filter(Boolean);
  let addrY = infoY - 26;
  addressLines.slice(0, 3).forEach((line) => {
    page.drawText(line.trim(), { x: 36, y: addrY, size: 8, font: fontRegular, color: colorNavy });
    addrY -= 11;
  });

  if (invoice.clientEmail) {
    page.drawText(`Email: ${invoice.clientEmail}`, { x: 36, y: addrY, size: 7.5, font: fontRegular, color: colorGrayText });
    addrY -= 10;
  }
  if (invoice.clientPhone) {
    page.drawText(`Phone: ${invoice.clientPhone}`, { x: 36, y: addrY, size: 7.5, font: fontRegular, color: colorGrayText });
    addrY -= 10;
  }

  // ── Column 2: PROJECT ──
  const projX = 220;
  page.drawText('PROJECT', { x: projX, y: infoY, size: 7.5, font: fontBold, color: colorBlue });
  page.drawText(invoice.clientName ? `${invoice.clientName} System` : 'Technology System', {
    x: projX,
    y: infoY - 14,
    size: 9.5,
    font: fontBold,
    color: colorNavy,
  });

  let projDetailsY = infoY - 26;
  const projectRows = [
    { label: 'Project Ref.', val: invoice.projectId ? invoice.projectId.toUpperCase() : 'PRJ-2026-01' },
    { label: 'Invoice Date', val: cleanWinAnsi(invoice.invoiceDate || new Date().toISOString().split('T')[0]) },
    { label: 'Due Date', val: cleanWinAnsi(invoice.dueDate || '') },
    { label: 'Payment Terms', val: cleanWinAnsi(invoice.paymentTerms || '14 Days') },
    { label: 'Currency', val: cleanWinAnsi(invoice.currency) || 'INR' },
  ];

  projectRows.forEach((r) => {
    page.drawText(r.label, { x: projX, y: projDetailsY, size: 7.5, font: fontRegular, color: colorGrayText });
    page.drawText(`:  ${cleanWinAnsi(r.val)}`, { x: projX + 68, y: projDetailsY, size: 7.5, font: fontRegular, color: colorNavy });
    projDetailsY -= 11;
  });

  // ── Column 3: INVOICE ──
  const invX = 425;
  page.drawRectangle({
    x: invX - 10,
    y: infoY - 72,
    width: 144,
    height: 82,
    color: colorWhite,
    borderColor: colorLightBorder,
    borderWidth: 0.75,
  });

  page.drawText('INVOICE', { x: invX, y: infoY - 8, size: 8, font: fontBold, color: colorGrayText });
  page.drawText(invoice.invoiceNumber || 'INV-2026-001', {
    x: invX,
    y: infoY - 24,
    size: 13,
    font: fontBold,
    color: colorNavy,
  });

  page.drawText('STATUS', { x: invX, y: infoY - 38, size: 7, font: fontBold, color: colorGrayText });
  const statusBadgeText = (invoice.status || 'DRAFT').toUpperCase();
  page.drawRectangle({
    x: invX,
    y: infoY - 54,
    width: 52,
    height: 14,
    color: colorPillBg,
  });
  page.drawText(statusBadgeText, {
    x: invX + 8,
    y: infoY - 50,
    size: 7.5,
    font: fontBold,
    color: colorPillText,
  });

  page.drawText(invoice.invoiceDate || '30 Sep 2026', { x: invX, y: infoY - 65, size: 7, font: fontRegular, color: colorGrayText });

  // 4. Service Items Table
  let tableY = headerY - 170;
  const colX = {
    num: 36,
    desc: 66,
    qty: 340,
    rate: 410,
    amount: 490,
  };

  // Table Header Bar (Deep Navy)
  page.drawRectangle({
    x: 36,
    y: tableY - 16,
    width: width - 72,
    height: 20,
    color: colorNavy,
  });

  page.drawText('#', { x: colX.num + 6, y: tableY - 11, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('DESCRIPTION', { x: colX.desc, y: tableY - 11, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('QTY', { x: colX.qty + 4, y: tableY - 11, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('RATE (INR)', { x: colX.rate + 4, y: tableY - 11, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('AMOUNT (INR)', { x: colX.amount, y: tableY - 11, size: 7.5, font: fontBold, color: colorWhite });

  tableY -= 20;

  const items = invoice.items && invoice.items.length ? invoice.items : [
    { serviceName: 'Website Design & Development', description: 'Complete responsive website with modern UI/UX, core pages and CMS integration.', qty: 1, rate: 35000, amount: 35000 },
    { serviceName: 'Admin / Reception Panel', description: 'Staff dashboard, patient management, appointment system and operational tools.', qty: 1, rate: 45000, amount: 45000 },
    { serviceName: 'Backend & Database Integration', description: 'Google Sheets integration, data structure, APIs and system architecture.', qty: 1, rate: 25000, amount: 25000 },
    { serviceName: 'Authentication System', description: 'Firebase Authentication with role-based access control.', qty: 1, rate: 10000, amount: 10000 },
    { serviceName: 'Deployment & Configuration', description: 'Production deployment, domain configuration and testing.', qty: 1, rate: 15000, amount: 15000 },
  ];

  items.forEach((item, index) => {
    const rowHeight = 34;
    page.drawRectangle({
      x: 36,
      y: tableY - rowHeight,
      width: width - 72,
      height: rowHeight,
      color: colorWhite,
      borderColor: colorLightBorder,
      borderWidth: 0.5,
    });

    page.drawText((index + 1).toString(), {
      x: colX.num + 8,
      y: tableY - 16,
      size: 8,
      font: fontBold,
      color: colorNavy,
    });

    page.drawText(cleanWinAnsi(item.serviceName), {
      x: colX.desc,
      y: tableY - 14,
      size: 8.5,
      font: fontBold,
      color: colorNavy,
    });

    if (item.description) {
      const trimmedDesc = item.description.length > 70 ? `${item.description.slice(0, 68)}...` : item.description;
      page.drawText(cleanWinAnsi(trimmedDesc), {
        x: colX.desc,
        y: tableY - 25,
        size: 7,
        font: fontRegular,
        color: colorGrayText,
      });
    }

    page.drawText(item.qty.toString(), {
      x: colX.qty + 10,
      y: tableY - 18,
      size: 8,
      font: fontRegular,
      color: colorNavy,
    });

    page.drawText(formatCurrency(item.rate), {
      x: colX.rate + 4,
      y: tableY - 18,
      size: 8,
      font: fontRegular,
      color: colorNavy,
    });

    page.drawText(formatCurrency(item.amount), {
      x: colX.amount + 4,
      y: tableY - 18,
      size: 8.5,
      font: fontBold,
      color: colorNavy,
    });

    tableY -= rowHeight;
  });

  // 5. Notes on Left & Totals on Right
  const bottomY = tableY - 16;

  // Notes Box
  page.drawRectangle({
    x: 36,
    y: bottomY - 96,
    width: 280,
    height: 96,
    color: colorWhite,
    borderColor: colorLightBorder,
    borderWidth: 0.75,
  });

  page.drawText('Notes', { x: 50, y: bottomY - 16, size: 8.5, font: fontBold, color: colorNavy });
  const notesBullets = [
    'This invoice covers the development and deployment of the agreed project scope.',
    'Additional features outside agreed scope will be billed separately upon approval.',
    'Please make payment within the due date to ensure continuous support.',
    'For any queries, feel free to contact us at work@arklintech.com.',
  ];

  let noteBulletY = bottomY - 30;
  notesBullets.forEach((bullet) => {
    page.drawCircle({ x: 52, y: noteBulletY + 2.5, size: 1.5, color: colorBlue });
    page.drawText(cleanWinAnsi(bullet), { x: 60, y: noteBulletY, size: 7, font: fontRegular, color: colorNavy });
    noteBulletY -= 14;
  });

  // Totals Box
  const totX = 330;
  page.drawRectangle({
    x: totX,
    y: bottomY - 96,
    width: width - 36 - totX,
    height: 96,
    color: colorWhite,
    borderColor: colorLightBorder,
    borderWidth: 0.75,
  });

  let totLineY = bottomY - 16;
  page.drawText('Subtotal', { x: totX + 14, y: totLineY, size: 8, font: fontRegular, color: colorNavy });
  page.drawText(formatCurrency(invoice.subtotal), { x: width - 90, y: totLineY, size: 8, font: fontBold, color: colorNavy });

  totLineY -= 14;
  page.drawText('Discount', { x: totX + 14, y: totLineY, size: 8, font: fontRegular, color: colorNavy });
  page.drawText(formatCurrency(invoice.discount), { x: width - 90, y: totLineY, size: 8, font: fontRegular, color: colorNavy });

  totLineY -= 14;
  page.drawText(`Tax (${invoice.taxPct || 0}%)`, { x: totX + 14, y: totLineY, size: 8, font: fontRegular, color: colorNavy });
  page.drawText(formatCurrency(invoice.taxAmount || 0), { x: width - 90, y: totLineY, size: 8, font: fontRegular, color: colorNavy });

  totLineY -= 20;
  // Total Highlight Box (#EDF4FF with border)
  page.drawRectangle({
    x: totX + 10,
    y: totLineY - 6,
    width: width - 46 - totX,
    height: 22,
    color: colorAccentLight,
    borderColor: colorBlue,
    borderWidth: 0.75,
  });

  page.drawText('TOTAL', { x: totX + 18, y: totLineY + 2, size: 10, font: fontBold, color: colorBlue });
  page.drawText(formatCurrency(invoice.total), { x: width - 98, y: totLineY + 1, size: 11, font: fontBold, color: colorNavy });

  totLineY -= 18;
  page.drawText(`Amount in Words:`, { x: totX + 12, y: totLineY + 2, size: 6.5, font: fontBold, color: colorGrayText });
  page.drawText(cleanWinAnsi(invoice.amountInWords || 'Indian Rupees Only'), {
    x: totX + 12,
    y: totLineY - 6,
    size: 7,
    font: fontBold,
    color: colorNavy,
  });

  // 6. Sign-off & Signature Section
  const signY = bottomY - 110;
  page.drawText('Thank you for your business.', { x: 36, y: signY, size: 8.5, font: fontBold, color: colorNavy });

  if (fs.existsSync(signaturePath)) {
    const sigBytes = fs.readFileSync(signaturePath);
    const sigImg = await doc.embedPng(sigBytes);
    const sigW = 140;
    const sigH = (sigW / sigImg.width) * sigImg.height;
    page.drawImage(sigImg, {
      x: 36,
      y: signY - sigH - 4,
      width: sigW,
      height: sigH,
    });
  }

  const nameY = signY - 52;
  page.drawText('Anas Ahmed Khan', { x: 36, y: nameY, size: 9, font: fontBold, color: colorNavy });
  page.drawText('Founder', { x: 36, y: nameY - 10, size: 7.5, font: fontRegular, color: colorGrayText });
  page.drawText('ARKLINTECH TECHNOLOGY SYSTEMS', { x: 36, y: nameY - 20, size: 7.5, font: fontBold, color: colorNavy });

  // Right Side: BUILD / AUTOMATE / INTEGRATE / SCALE
  const pillarX = width - 110;
  page.drawLine({
    start: { x: pillarX - 10, y: signY + 2 },
    end: { x: pillarX - 10, y: nameY - 22 },
    thickness: 1.5,
    color: colorBlue,
  });

  page.drawText('BUILD', { x: pillarX, y: signY - 8, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('AUTOMATE', { x: pillarX, y: signY - 20, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('INTEGRATE', { x: pillarX, y: signY - 32, size: 7.5, font: fontBold, color: colorNavy });
  page.drawText('SCALE', { x: pillarX, y: signY - 44, size: 7.5, font: fontBold, color: colorNavy });

  // 7. Footer (Deep Navy Full Width Bar)
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 40,
    color: colorNavy,
  });

  // Footer text: website + email (visible text)
  page.drawText('www.arklintech.com  •  work@arklintech.com', {
    x: 36,
    y: 16,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.85, 0.9, 1),
  });

  // ─── Clickable hyperlink annotations ───────────────────────────────────────
  // Website: www.arklintech.com  → https://arklintech.com
  // Approximate text width for "www.arklintech.com" at 7.5pt ≈ 100pt
  addLinkAnnotation(doc, page, 36, 10, 100, 12, 'https://arklintech.com');

  // Email: work@arklintech.com  → mailto:work@arklintech.com
  // "  •  " separator ≈ 16pt wide. Email text ≈ 98pt
  addLinkAnnotation(doc, page, 152, 10, 98, 12, 'mailto:work@arklintech.com');

  page.drawText("BUILT FOR WHAT'S NEXT.", {
    x: 230,
    y: 16,
    size: 7.5,
    font: fontBold,
    color: colorWhite,
  });
  page.drawLine({
    start: { x: 230, y: 12 },
    end: { x: 335, y: 12 },
    thickness: 1.5,
    color: colorBlue,
  });

  page.drawText('AI  |  SOFTWARE  |  AUTOMATION', {
    x: width - 180,
    y: 20,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.85, 0.9, 1),
  });
  page.drawText('BUSINESS SYSTEMS  |  DIGITAL INFRASTRUCTURE', {
    x: width - 180,
    y: 11,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.85, 0.9, 1),
  });

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}
