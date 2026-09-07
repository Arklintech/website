import { PDFDocument, rgb, StandardFonts, PDFName, PDFString, PDFArray, PDFDict } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { InvoiceRecord } from './admin-db';
import {
  INVOICE_BRAND,
  INVOICE_COLORS,
  calculateInvoiceTotals,
  formatInvoiceCurrency,
} from './invoice-spec';

/**
 * Creates a clickable hyperlink annotation (URI or mailto) on a PDF page.
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
  const actionDict = doc.context.obj({
    Type: 'Action',
    S: 'URI',
    URI: PDFString.of(uri),
  }) as PDFDict;
  const actionRef = doc.context.register(actionDict);

  const annotDict = doc.context.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [x, y, x + w, y + h],
    Border: [0, 0, 0],
    C: [],
    A: actionRef,
    F: 4,
  }) as PDFDict;
  const annotRef = doc.context.register(annotDict);

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
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[•·]/g, '-');
}

export async function generateInvoicePdfBuffer(invoice: InvoiceRecord): Promise<Buffer> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  // Standard A4: 595.28 x 841.89 points
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Load Custom TTF Fonts (Segoe UI for native ₹ symbol support & clean typography)
  let fontRegular: any;
  let fontBold: any;

  const fontRegPath = path.join(process.cwd(), 'public', 'fonts', 'segoeui.ttf');
  const fontBoldPath = path.join(process.cwd(), 'public', 'fonts', 'segoeuib.ttf');

  if (fs.existsSync(fontRegPath) && fs.existsSync(fontBoldPath)) {
    try {
      fontRegular = await doc.embedFont(fs.readFileSync(fontRegPath));
      fontBold = await doc.embedFont(fs.readFileSync(fontBoldPath));
    } catch (e) {
      console.warn('Failed to load custom TTF fonts, falling back to Helvetica:', e);
      fontRegular = await doc.embedFont(StandardFonts.Helvetica);
      fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    }
  } else {
    fontRegular = await doc.embedFont(StandardFonts.Helvetica);
    fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  }

  // Exact RGB Colors matching live preview
  const colorBg = rgb(0.992, 0.984, 0.969); // #FDFBF7 cream
  const colorNavy = rgb(0.043, 0.075, 0.169); // #0B132B deep navy
  const colorBlue = rgb(0.078, 0.388, 1.0); // #1463FF electric blue
  const colorSlate = rgb(0.392, 0.455, 0.545); // #64748B slate
  const colorMuted = rgb(0.58, 0.639, 0.722); // #94A3B8 muted
  const colorBorder = rgb(0.91, 0.894, 0.863); // #E8E4DC border
  const colorSubtle = rgb(0.945, 0.929, 0.894); // #F1EDE4 divider
  const colorWhite = rgb(1, 1, 1);
  const colorHighlightBg = rgb(0.929, 0.957, 1.0); // #EDF4FF total box

  // 1. Cream Background
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

  const marginX = 32;
  const contentWidth = width - marginX * 2; // 531.28 pt
  const headerY = height - 48;

  if (fs.existsSync(headerLogoPath)) {
    const headerBytes = fs.readFileSync(headerLogoPath);
    const headerImg = await doc.embedPng(headerBytes);
    const imgWidth = 175;
    const imgHeight = (imgWidth / headerImg.width) * headerImg.height;
    page.drawImage(headerImg, {
      x: marginX,
      y: headerY - imgHeight + 4,
      width: imgWidth,
      height: imgHeight,
    });
  } else {
    page.drawText(INVOICE_BRAND.name, {
      x: marginX,
      y: headerY - 10,
      size: 18,
      font: fontBold,
      color: colorNavy,
    });
    page.drawText(INVOICE_BRAND.subName, {
      x: marginX,
      y: headerY - 24,
      size: 8.5,
      font: fontBold,
      color: colorBlue,
    });
  }

  // Sub-header Slogan: "IDEAS  →  SYSTEMS  →  REAL  IMPACT"
  page.drawText('IDEAS   ->   SYSTEMS   ->   REAL   IMPACT', {
    x: marginX,
    y: headerY - 42,
    size: 7.5,
    font: fontBold,
    color: colorNavy,
  });

  // Right Header Tagline & Accent lines
  page.drawLine({
    start: { x: width - 150, y: headerY + 8 },
    end: { x: width - 150, y: headerY - 42 },
    thickness: 1.5,
    color: colorBlue,
  });

  let tagY = headerY + 2;
  INVOICE_BRAND.tagline.forEach((line) => {
    page.drawText(line, { x: width - 140, y: tagY, size: 7.5, font: fontBold, color: colorNavy });
    tagY -= 10;
  });

  // Divider Line below header
  page.drawLine({
    start: { x: marginX, y: headerY - 50 },
    end: { x: width - marginX, y: headerY - 50 },
    thickness: 0.75,
    color: colorBorder,
  });

  // 3. Information Grid (BILL TO, PROJECT, INVOICE)
  const infoY = headerY - 65;

  // ── Column 1: BILL TO ──
  page.drawText('BILL TO', { x: marginX, y: infoY, size: 8, font: fontBold, color: colorBlue });
  page.drawText(cleanWinAnsi(invoice.clientName || 'Client Name'), {
    x: marginX,
    y: infoY - 14,
    size: 11,
    font: fontBold,
    color: colorNavy,
  });

  const addressLines = (invoice.clientAddress || '').split('\n').filter(Boolean);
  let addrY = infoY - 26;
  addressLines.slice(0, 3).forEach((line) => {
    page.drawText(cleanWinAnsi(line.trim()), { x: marginX, y: addrY, size: 8.5, font: fontRegular, color: colorNavy });
    addrY -= 11;
  });

  if (invoice.clientEmail) {
    page.drawText(`Email: ${cleanWinAnsi(invoice.clientEmail)}`, { x: marginX, y: addrY, size: 8, font: fontRegular, color: colorSlate });
    addrY -= 10;
  }
  if (invoice.clientPhone && invoice.clientPhone !== '#ERROR!') {
    page.drawText(`Phone: ${cleanWinAnsi(invoice.clientPhone)}`, { x: marginX, y: addrY, size: 8, font: fontRegular, color: colorSlate });
    addrY -= 10;
  }

  // ── Column 2: PROJECT ──
  const projX = 245;
  const projectTitle = invoice.projectName
    ? invoice.projectName
    : invoice.clientName
    ? `${invoice.clientName} System`
    : 'Technology System';

  page.drawText('PROJECT', { x: projX, y: infoY, size: 8, font: fontBold, color: colorBlue });
  page.drawText(cleanWinAnsi(projectTitle), {
    x: projX,
    y: infoY - 14,
    size: 9.5,
    font: fontBold,
    color: colorNavy,
  });

  let projDetailsY = infoY - 26;
  const projectRows = [
    { label: 'Project Ref.', val: invoice.projectId ? invoice.projectId.toUpperCase() : 'PRJ-2026-01' },
    { label: 'Invoice Date', val: invoice.invoiceDate || new Date().toISOString().split('T')[0] },
    { label: 'Due Date', val: invoice.dueDate || '' },
    { label: 'Payment Terms', val: invoice.paymentTerms || '14 Days' },
    { label: 'Currency', val: invoice.currency || 'INR (₹)' },
  ];

  projectRows.forEach((r) => {
    page.drawText(r.label, { x: projX, y: projDetailsY, size: 8, font: fontRegular, color: colorSlate });
    page.drawText(`:  ${cleanWinAnsi(r.val)}`, { x: projX + 70, y: projDetailsY, size: 8, font: fontRegular, color: colorNavy });
    projDetailsY -= 11;
  });

  // ── Column 3: INVOICE BOX ──
  const invX = 425;
  const invBoxW = 138;
  const invBoxH = 86;
  page.drawRectangle({
    x: invX,
    y: infoY - invBoxH + 12,
    width: invBoxW,
    height: invBoxH,
    color: colorWhite,
    borderColor: colorBorder,
    borderWidth: 0.75,
  });

  page.drawText('INVOICE', { x: invX + 12, y: infoY, size: 7.5, font: fontBold, color: colorMuted });
  page.drawText(invoice.invoiceNumber || 'INV-2026-001', {
    x: invX + 12,
    y: infoY - 16,
    size: 13,
    font: fontBold,
    color: colorNavy,
  });

  page.drawText('STATUS', { x: invX + 12, y: infoY - 30, size: 7, font: fontBold, color: colorMuted });

  const statusBadgeText = (invoice.status || 'DRAFT').toUpperCase();
  let pillBg = rgb(0.996, 0.953, 0.78); // amber-50
  let pillText = rgb(0.706, 0.325, 0.035); // amber-700
  if (statusBadgeText === 'PAID') {
    pillBg = rgb(0.82, 0.98, 0.9);
    pillText = rgb(0.01, 0.47, 0.34);
  } else if (statusBadgeText === 'SENT') {
    pillBg = rgb(0.859, 0.918, 0.996);
    pillText = rgb(0.114, 0.306, 0.847);
  }

  page.drawRectangle({
    x: invX + 12,
    y: infoY - 47,
    width: 52,
    height: 14,
    color: pillBg,
  });
  page.drawText(statusBadgeText, {
    x: invX + 20,
    y: infoY - 43,
    size: 7.5,
    font: fontBold,
    color: pillText,
  });

  page.drawText(invoice.invoiceDate || '2026-09-30', {
    x: invX + 12,
    y: infoY - 60,
    size: 7.5,
    font: fontRegular,
    color: colorSlate,
  });

  // 4. Service Items Table (4 Columns ONLY - matching live preview)
  let tableY = headerY - 165;
  const colX = {
    num: marginX,
    desc: marginX + 30,
    rate: marginX + 380,
    amount: marginX + 460,
  };

  // Table Header Bar (Deep Navy)
  page.drawRectangle({
    x: marginX,
    y: tableY - 18,
    width: contentWidth,
    height: 20,
    color: colorNavy,
  });

  page.drawText('#', { x: colX.num + 6, y: tableY - 13, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('DESCRIPTION', { x: colX.desc, y: tableY - 13, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('RATE (INR)', { x: colX.rate + 12, y: tableY - 13, size: 7.5, font: fontBold, color: colorWhite });
  page.drawText('AMT (INR)', { x: colX.amount + 18, y: tableY - 13, size: 7.5, font: fontBold, color: colorWhite });

  tableY -= 18;

  const items = invoice.items && invoice.items.length ? invoice.items : [
    { serviceName: 'Website Design & Development', description: 'Complete responsive website with modern UI/UX, core pages and CMS integration.', qty: 1, rate: 35000, amount: 35000 },
    { serviceName: 'Admin / Reception Panel', description: 'Staff dashboard, patient management, appointment system and operational tools.', qty: 1, rate: 45000, amount: 45000 },
    { serviceName: 'Backend & Database Integration', description: 'Google Sheets integration, data structure, APIs and system architecture.', qty: 1, rate: 25000, amount: 25000 },
    { serviceName: 'Authentication System', description: 'Firebase Authentication with role-based access control.', qty: 1, rate: 10000, amount: 10000 },
    { serviceName: 'Deployment & Configuration', description: 'Production deployment, domain configuration and testing.', qty: 1, rate: 15000, amount: 15000 },
  ];

  items.forEach((item, index) => {
    const rowHeight = 32;
    page.drawRectangle({
      x: marginX,
      y: tableY - rowHeight,
      width: contentWidth,
      height: rowHeight,
      color: colorWhite,
      borderColor: colorSubtle,
      borderWidth: 0.5,
    });

    // Number
    page.drawText((index + 1).toString(), {
      x: colX.num + 8,
      y: tableY - 16,
      size: 8,
      font: fontBold,
      color: colorNavy,
    });

    // Service Name
    page.drawText(cleanWinAnsi(item.serviceName), {
      x: colX.desc,
      y: tableY - 13,
      size: 8.5,
      font: fontBold,
      color: colorNavy,
    });

    // Service Description
    if (item.description) {
      const trimmedDesc = item.description.length > 78 ? `${item.description.slice(0, 75)}...` : item.description;
      page.drawText(cleanWinAnsi(trimmedDesc), {
        x: colX.desc,
        y: tableY - 24,
        size: 7,
        font: fontRegular,
        color: colorSlate,
      });
    }

    // Rate
    const rateStr = formatInvoiceCurrency(item.rate, '₹');
    page.drawText(cleanWinAnsi(rateStr), {
      x: colX.rate + 55 - fontRegular.widthOfTextAtSize(rateStr, 8),
      y: tableY - 17,
      size: 8,
      font: fontRegular,
      color: colorNavy,
    });

    // Amount
    const amountStr = formatInvoiceCurrency(item.amount, '₹');
    page.drawText(cleanWinAnsi(amountStr), {
      x: colX.amount + 62 - fontBold.widthOfTextAtSize(amountStr, 8.5),
      y: tableY - 17,
      size: 8.5,
      font: fontBold,
      color: colorNavy,
    });

    tableY -= rowHeight;
  });

  // Calculate invoice totals strictly using shared helper
  const calc = calculateInvoiceTotals(items, invoice.discount || 0, invoice.taxPct || 0);

  // 5. Vertical Stacked Section (REQUIRED ORDER: 1. TOTALS -> 2. NOTES -> 3. SIGNATURE)

  // ── 1. TOTALS CONTAINER (Full Width Stacked Card) ──
  const totalsTopY = tableY - 10;
  const totalsBoxHeight = 92;

  page.drawRectangle({
    x: marginX,
    y: totalsTopY - totalsBoxHeight,
    width: contentWidth,
    height: totalsBoxHeight,
    color: colorWhite,
    borderColor: colorBorder,
    borderWidth: 0.75,
  });

  let totLineY = totalsTopY - 15;
  const subtotalStr = formatInvoiceCurrency(calc.subtotal, '₹');
  page.drawText('Subtotal', { x: marginX + 14, y: totLineY, size: 8, font: fontRegular, color: colorSlate });
  page.drawText(cleanWinAnsi(subtotalStr), {
    x: marginX + contentWidth - 14 - fontBold.widthOfTextAtSize(subtotalStr, 8),
    y: totLineY,
    size: 8,
    font: fontBold,
    color: colorNavy,
  });

  totLineY -= 13;
  const discountStr = formatInvoiceCurrency(calc.discount, '₹');
  page.drawText('Discount', { x: marginX + 14, y: totLineY, size: 8, font: fontRegular, color: colorSlate });
  page.drawText(cleanWinAnsi(discountStr), {
    x: marginX + contentWidth - 14 - fontRegular.widthOfTextAtSize(discountStr, 8),
    y: totLineY,
    size: 8,
    font: fontRegular,
    color: colorNavy,
  });

  totLineY -= 13;
  const taxStr = formatInvoiceCurrency(calc.taxAmount, '₹');
  page.drawText(`Tax (${calc.taxPct}%)`, { x: marginX + 14, y: totLineY, size: 8, font: fontRegular, color: colorSlate });
  page.drawText(cleanWinAnsi(taxStr), {
    x: marginX + contentWidth - 14 - fontRegular.widthOfTextAtSize(taxStr, 8),
    y: totLineY,
    size: 8,
    font: fontRegular,
    color: colorNavy,
  });

  totLineY -= 20;
  // Highlighted TOTAL Box (#EDF4FF with blue border)
  const totalBoxX = marginX + 10;
  const totalBoxW = contentWidth - 20;
  page.drawRectangle({
    x: totalBoxX,
    y: totLineY - 5,
    width: totalBoxW,
    height: 22,
    color: colorHighlightBg,
    borderColor: colorBlue,
    borderWidth: 0.75,
  });

  const totalStr = formatInvoiceCurrency(calc.total, '₹');
  const totalTextWidth = fontBold.widthOfTextAtSize(totalStr, 11);
  page.drawText('TOTAL', { x: totalBoxX + 12, y: totLineY + 2, size: 9.5, font: fontBold, color: colorBlue });
  page.drawText(cleanWinAnsi(totalStr), {
    x: totalBoxX + totalBoxW - totalTextWidth - 12,
    y: totLineY + 1,
    size: 11,
    font: fontBold,
    color: colorNavy,
  });

  totLineY -= 14;
  page.drawText('AMOUNT IN WORDS:', { x: marginX + 14, y: totLineY, size: 7, font: fontBold, color: colorMuted });
  page.drawText(cleanWinAnsi(calc.amountInWords || 'Indian Rupees Only'), {
    x: marginX + 125,
    y: totLineY,
    size: 7.5,
    font: fontBold,
    color: colorNavy,
  });

  // ── 2. NOTES CONTAINER (Full Width Stacked Card directly below Totals) ──
  const notesTopY = totalsTopY - totalsBoxHeight - 8;
  const notesText = invoice.notes ||
    'This invoice covers the development and deployment of the agreed project scope as per our discussion.\nAdditional features outside the agreed scope will be billed separately upon approval.\nPlease make the payment within the due date to ensure continued support and development.\nFor any queries, feel free to contact us.';

  const noteLines = notesText.split('\n').map((l) => l.trim()).filter(Boolean);
  const notesBoxHeight = 22 + noteLines.length * 11.5;

  page.drawRectangle({
    x: marginX,
    y: notesTopY - notesBoxHeight,
    width: contentWidth,
    height: notesBoxHeight,
    color: colorWhite,
    borderColor: colorBorder,
    borderWidth: 0.75,
  });

  page.drawText('Notes', { x: marginX + 14, y: notesTopY - 14, size: 8.5, font: fontBold, color: colorNavy });

  let nLineY = notesTopY - 26;
  noteLines.forEach((line) => {
    page.drawText(cleanWinAnsi(line), { x: marginX + 14, y: nLineY, size: 7.5, font: fontRegular, color: colorSlate });
    nLineY -= 11.5;
  });

  // ── 3. SIGNATURE & CLOSING SECTION (Stacked directly below Notes) ──
  const signY = notesTopY - notesBoxHeight - 12;
  page.drawText(INVOICE_BRAND.closingMessage, { x: marginX, y: signY, size: 8.5, font: fontBold, color: colorNavy });

  if (fs.existsSync(signaturePath)) {
    const sigBytes = fs.readFileSync(signaturePath);
    const sigImg = await doc.embedPng(sigBytes);
    const sigW = 115;
    const sigH = (sigW / sigImg.width) * sigImg.height;
    page.drawImage(sigImg, {
      x: marginX,
      y: signY - sigH - 2,
      width: sigW,
      height: sigH,
    });
  }

  const nameY = signY - 44;
  page.drawText(INVOICE_BRAND.signatureName, { x: marginX, y: nameY, size: 8.5, font: fontBold, color: colorNavy });
  page.drawText(INVOICE_BRAND.signatureTitle, { x: marginX, y: nameY - 9, size: 7, font: fontRegular, color: colorSlate });
  page.drawText(INVOICE_BRAND.signatureCompany, { x: marginX, y: nameY - 18, size: 7.5, font: fontBold, color: colorNavy });

  // Right Side: BUILD / AUTOMATE / INTEGRATE / SCALE
  const pillarX = width - 110;
  page.drawLine({
    start: { x: pillarX - 10, y: signY + 2 },
    end: { x: pillarX - 10, y: nameY - 20 },
    thickness: 1.5,
    color: colorBlue,
  });

  let pY = signY - 6;
  INVOICE_BRAND.pillars.forEach((p) => {
    page.drawText(p, { x: pillarX, y: pY, size: 7.5, font: fontBold, color: colorNavy });
    pY -= 10;
  });

  // 6. Footer (Deep Navy Full Width Bar)
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 36,
    color: colorNavy,
  });

  // Footer text: website + email
  const footerText = `${INVOICE_BRAND.website}   •   ${INVOICE_BRAND.email}`;
  page.drawText(footerText, {
    x: marginX,
    y: 14,
    size: 7.5,
    font: fontRegular,
    color: rgb(0.82, 0.88, 1),
  });

  // Clickable hyperlink annotations for website and email
  addLinkAnnotation(doc, page, marginX, 8, 95, 14, INVOICE_BRAND.websiteUrl);
  addLinkAnnotation(doc, page, marginX + 110, 8, 105, 14, INVOICE_BRAND.emailMailto);

  // Center Slogan
  page.drawText(INVOICE_BRAND.footerCenter, {
    x: 232,
    y: 14,
    size: 7.5,
    font: fontBold,
    color: colorWhite,
  });

  // Right Capabilities
  page.drawText(INVOICE_BRAND.footerRight[0], {
    x: width - 170,
    y: 18,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.82, 0.88, 1),
  });
  page.drawText(INVOICE_BRAND.footerRight[1], {
    x: width - 170,
    y: 9,
    size: 6.5,
    font: fontRegular,
    color: rgb(0.82, 0.88, 1),
  });

  const pdfBytes = await doc.save();
  return Buffer.from(pdfBytes);
}
