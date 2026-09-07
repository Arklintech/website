import { PDFDocument, rgb, StandardFonts, PDFName, PDFString, PDFArray, PDFDict } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import fs from 'fs';
import path from 'path';
import { InvoiceRecord } from './admin-db';
import {
  INVOICE_BRAND,
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

/**
 * Wraps text into lines so it strictly fits within maxWidth without overlapping adjacent columns.
 */
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
  if (!text) return [];
  const paragraphs = text.split('\n');
  const resultLines: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) continue;

    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = `${currentLine} ${word}`;
      if (font.widthOfTextAtSize(cleanWinAnsi(testLine), fontSize) <= maxWidth) {
        currentLine = testLine;
      } else {
        resultLines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) {
      resultLines.push(currentLine);
    }
  }

  return resultLines;
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
      y: headerY - imgHeight + 2,
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

  // 3. Information Grid (BILL TO, PROJECT, INVOICE) with strict non-overlapping column bounds
  const infoY = headerY - 65;

  // Column boundaries:
  // Col 1 (BILL TO): x = 32, maxW = 190
  // Col 2 (PROJECT): x = 237, maxW = 165
  // Col 3 (INVOICE): x = 412, maxW = 151
  const col1X = marginX;
  const col1MaxW = 190;

  const col2X = 237;
  const col2MaxW = 165;

  const col3X = 412;
  const col3W = 151;

  // ── Column 1: BILL TO ──
  page.drawText('BILL TO', { x: col1X, y: infoY, size: 8, font: fontBold, color: colorBlue });
  
  const clientNameLines = wrapText(invoice.clientName || 'Client Name', col1MaxW, fontBold, 10.5);
  let billY = infoY - 14;
  clientNameLines.forEach((line) => {
    page.drawText(cleanWinAnsi(line), { x: col1X, y: billY, size: 10.5, font: fontBold, color: colorNavy });
    billY -= 12;
  });

  const addressLines = wrapText(invoice.clientAddress || '', col1MaxW, fontRegular, 8.5);
  addressLines.slice(0, 4).forEach((line) => {
    page.drawText(cleanWinAnsi(line), { x: col1X, y: billY, size: 8.5, font: fontRegular, color: colorNavy });
    billY -= 11;
  });

  if (invoice.clientEmail) {
    const emailLines = wrapText(`Email: ${invoice.clientEmail}`, col1MaxW, fontRegular, 8);
    emailLines.forEach((line) => {
      page.drawText(cleanWinAnsi(line), { x: col1X, y: billY, size: 8, font: fontRegular, color: colorSlate });
      billY -= 10;
    });
  }
  if (invoice.clientPhone && invoice.clientPhone !== '#ERROR!') {
    const phoneLines = wrapText(`Phone: ${invoice.clientPhone}`, col1MaxW, fontRegular, 8);
    phoneLines.forEach((line) => {
      page.drawText(cleanWinAnsi(line), { x: col1X, y: billY, size: 8, font: fontRegular, color: colorSlate });
      billY -= 10;
    });
  }

  // ── Column 2: PROJECT ──
  const projectTitle = invoice.projectName
    ? invoice.projectName
    : invoice.clientName
    ? `${invoice.clientName} System`
    : 'Technology System';

  page.drawText('PROJECT', { x: col2X, y: infoY, size: 8, font: fontBold, color: colorBlue });
  
  const projTitleLines = wrapText(projectTitle, col2MaxW, fontBold, 9.5);
  let projY = infoY - 14;
  projTitleLines.forEach((line) => {
    page.drawText(cleanWinAnsi(line), { x: col2X, y: projY, size: 9.5, font: fontBold, color: colorNavy });
    projY -= 11;
  });

  const projectRows = [
    { label: 'Project Ref.', val: invoice.projectId ? invoice.projectId.toUpperCase() : 'PRJ-2026-01' },
    { label: 'Invoice Date', val: invoice.invoiceDate || new Date().toISOString().split('T')[0] },
    { label: 'Due Date', val: invoice.dueDate || '' },
    { label: 'Payment Terms', val: invoice.paymentTerms || '14 Days' },
    { label: 'Currency', val: invoice.currency || 'INR (₹)' },
  ];

  projectRows.forEach((r) => {
    page.drawText(r.label, { x: col2X, y: projY, size: 7.5, font: fontRegular, color: colorSlate });
    page.drawText(`: ${cleanWinAnsi(r.val)}`, { x: col2X + 66, y: projY, size: 7.5, font: fontRegular, color: colorNavy });
    projY -= 10.5;
  });

  // ── Column 3: INVOICE BOX ──
  const invBoxH = 86;
  page.drawRectangle({
    x: col3X,
    y: infoY - invBoxH + 12,
    width: col3W,
    height: invBoxH,
    color: colorWhite,
    borderColor: colorBorder,
    borderWidth: 0.75,
  });

  page.drawText('INVOICE', { x: col3X + 12, y: infoY, size: 7.5, font: fontBold, color: colorMuted });
  page.drawText(invoice.invoiceNumber || 'INV-2026-001', {
    x: col3X + 12,
    y: infoY - 16,
    size: 13,
    font: fontBold,
    color: colorNavy,
  });

  page.drawText('STATUS', { x: col3X + 12, y: infoY - 30, size: 7, font: fontBold, color: colorMuted });

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

  const pillWidth = 56;
  page.drawRectangle({
    x: col3X + 12,
    y: infoY - 47,
    width: pillWidth,
    height: 14,
    color: pillBg,
  });
  
  const statusTextW = fontBold.widthOfTextAtSize(statusBadgeText, 7.5);
  page.drawText(statusBadgeText, {
    x: col3X + 12 + (pillWidth - statusTextW) / 2,
    y: infoY - 43,
    size: 7.5,
    font: fontBold,
    color: pillText,
  });

  page.drawText(invoice.invoiceDate || '2026-09-30', {
    x: col3X + 12,
    y: infoY - 60,
    size: 7.5,
    font: fontRegular,
    color: colorSlate,
  });

  // Calculate lowest point of Info Grid to position table dynamically
  const infoBottomY = Math.min(billY, projY, infoY - invBoxH + 12);

  // 4. Service Items Table (4 Columns ONLY - matching live preview)
  let tableY = infoBottomY - 18;
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
    const descLines = wrapText(item.description || '', 340, fontRegular, 7);
    const rowHeight = Math.max(32, 18 + descLines.length * 10);

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
      y: tableY - 15,
      size: 8,
      font: fontBold,
      color: colorNavy,
    });

    // Service Name
    page.drawText(cleanWinAnsi(item.serviceName), {
      x: colX.desc,
      y: tableY - 14,
      size: 8.5,
      font: fontBold,
      color: colorNavy,
    });

    // Service Description Lines
    let dY = tableY - 24;
    descLines.forEach((dLine) => {
      page.drawText(cleanWinAnsi(dLine), {
        x: colX.desc,
        y: dY,
        size: 7,
        font: fontRegular,
        color: colorSlate,
      });
      dY -= 9.5;
    });

    // Rate
    const rateStr = formatInvoiceCurrency(item.rate, '₹');
    page.drawText(cleanWinAnsi(rateStr), {
      x: colX.rate + 55 - fontRegular.widthOfTextAtSize(cleanWinAnsi(rateStr), 8),
      y: tableY - 17,
      size: 8,
      font: fontRegular,
      color: colorNavy,
    });

    // Amount
    const amountStr = formatInvoiceCurrency(item.amount, '₹');
    page.drawText(cleanWinAnsi(amountStr), {
      x: colX.amount + 62 - fontBold.widthOfTextAtSize(cleanWinAnsi(amountStr), 8.5),
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
  const wordLines = wrapText(calc.amountInWords || 'Indian Rupees Only', contentWidth - 140, fontBold, 7.5);
  const totalsBoxHeight = 84 + wordLines.length * 10;

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
    x: marginX + contentWidth - 14 - fontBold.widthOfTextAtSize(cleanWinAnsi(subtotalStr), 8),
    y: totLineY,
    size: 8,
    font: fontBold,
    color: colorNavy,
  });

  totLineY -= 13;
  const discountStr = formatInvoiceCurrency(calc.discount, '₹');
  page.drawText('Discount', { x: marginX + 14, y: totLineY, size: 8, font: fontRegular, color: colorSlate });
  page.drawText(cleanWinAnsi(discountStr), {
    x: marginX + contentWidth - 14 - fontRegular.widthOfTextAtSize(cleanWinAnsi(discountStr), 8),
    y: totLineY,
    size: 8,
    font: fontRegular,
    color: colorNavy,
  });

  totLineY -= 13;
  const taxStr = formatInvoiceCurrency(calc.taxAmount, '₹');
  page.drawText(`Tax (${calc.taxPct}%)`, { x: marginX + 14, y: totLineY, size: 8, font: fontRegular, color: colorSlate });
  page.drawText(cleanWinAnsi(taxStr), {
    x: marginX + contentWidth - 14 - fontRegular.widthOfTextAtSize(cleanWinAnsi(taxStr), 8),
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
  const totalTextWidth = fontBold.widthOfTextAtSize(cleanWinAnsi(totalStr), 11);
  page.drawText('TOTAL', { x: totalBoxX + 12, y: totLineY + 2, size: 9.5, font: fontBold, color: colorBlue });
  page.drawText(cleanWinAnsi(totalStr), {
    x: totalBoxX + totalBoxW - totalTextWidth - 12,
    y: totLineY + 1,
    size: 11,
    font: fontBold,
    color: colorNavy,
  });

  totLineY -= 15;
  page.drawText('AMOUNT IN WORDS:', { x: marginX + 14, y: totLineY, size: 7, font: fontBold, color: colorMuted });
  
  let wY = totLineY;
  wordLines.forEach((wLine) => {
    page.drawText(cleanWinAnsi(wLine), {
      x: marginX + 125,
      y: wY,
      size: 7.5,
      font: fontBold,
      color: colorNavy,
    });
    wY -= 10;
  });

  // ── 2. NOTES CONTAINER (Full Width Stacked Card directly below Totals) ──
  const notesTopY = totalsTopY - totalsBoxHeight - 8;
  const notesText = invoice.notes ||
    'This invoice covers the development and deployment of the agreed project scope as per our discussion.\nAdditional features outside the agreed scope will be billed separately upon approval.\nPlease make the payment within the due date to ensure continued support and development.\nFor any queries, feel free to contact us.';

  const noteLines = wrapText(notesText, contentWidth - 28, fontRegular, 7.5);
  const notesBoxHeight = 22 + noteLines.length * 11;

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
    nLineY -= 11;
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
