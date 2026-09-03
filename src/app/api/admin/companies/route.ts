import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companies = await adminDb.companies.findMany();
  return NextResponse.json({ data: companies, total: companies.length });
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { name, website, industry, size, notes } = await req.json();
    if (!name) return NextResponse.json({ error: 'Company name required' }, { status: 400 });
    const company = await adminDb.companies.create({ name, website, industry, size, notes });
    return NextResponse.json({ success: true, data: company });
  } catch {
    return NextResponse.json({ error: 'Failed to create company' }, { status: 500 });
  }
}
