import { amountToWordsIndian } from './currency-words';

export interface InvoiceSpecItem {
  id: string;
  serviceName: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface InvoiceCalculations {
  subtotal: number;
  discount: number;
  taxPct: number;
  taxAmount: number;
  total: number;
  amountInWords: string;
}

export const INVOICE_BRAND = {
  name: 'ARKLINTECH',
  subName: 'TECHNOLOGY SYSTEMS',
  slogan: 'IDEAS   →   SYSTEMS   →   REAL   IMPACT',
  tagline: ['INTELLIGENT', 'SYSTEMS', 'FOR A', 'BRIGHTER', 'TOMORROW'],
  pillars: ['BUILD', 'AUTOMATE', 'INTEGRATE', 'SCALE'],
  website: 'www.arklintech.com',
  websiteUrl: 'https://arklintech.com',
  email: 'work@arklintech.com',
  emailMailto: 'mailto:work@arklintech.com',
  footerCenter: "BUILT FOR WHAT'S NEXT.",
  footerRight: ['AI | SOFTWARE | AUTOMATION', 'BUSINESS SYSTEMS | DIGITAL INFRASTRUCTURE'],
  signatureName: 'Anas Ahmed Khan',
  signatureTitle: 'Founder',
  signatureCompany: 'ARKLINTECH TECHNOLOGY SYSTEMS',
  closingMessage: 'Thank you for your business.',
};

export const INVOICE_COLORS = {
  bg: '#FDFBF7', // Cream background
  navy: '#0B132B', // Deep Navy
  blue: '#1463FF', // Electric Blue
  slate: '#64748B', // Slate Gray
  lightSlate: '#94A3B8', // Muted Gray
  border: '#E8E4DC', // Light Border
  borderSubtle: '#F1EDE4', // Table/Divider Border
  white: '#FFFFFF',
  highlightBg: '#EDF4FF', // Total Box Fill
  highlightBorder: '#1463FF',
};

export const INVOICE_TABLE_COLUMNS = [
  { key: 'num', label: '#', align: 'left' },
  { key: 'desc', label: 'DESCRIPTION', align: 'left' },
  { key: 'rate', label: 'RATE (INR)', align: 'right' },
  { key: 'amount', label: 'AMT (INR)', align: 'right' },
];

export function calculateInvoiceTotals(
  items: Array<{ rate?: number; amount?: number; qty?: number }>,
  discount = 0,
  taxPct = 0
): InvoiceCalculations {
  const subtotal = items.reduce((sum, item) => sum + (item.amount ?? item.rate ?? 0), 0);
  const taxAmount = Math.round((subtotal - discount) * (taxPct / 100));
  const total = Math.max(0, subtotal - discount + taxAmount);
  const amountInWords = amountToWordsIndian(total);

  return {
    subtotal,
    discount,
    taxPct,
    taxAmount,
    total,
    amountInWords,
  };
}

export function formatInvoiceCurrency(val: number, symbol = '₹'): string {
  const formatted = Math.round(val || 0).toLocaleString('en-IN');
  return `${symbol}${formatted}`;
}
