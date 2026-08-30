import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sanitizeString } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = sanitizeString(body.eventType || 'PAGE_VIEW', 50);
    const pathname = sanitizeString(body.pathname, 200);
    const metadata = body.metadata ? JSON.stringify(body.metadata).slice(0, 2000) : null;
    const userAgent = req.headers.get('user-agent') || undefined;

    const record = await db.telemetry.create({
      eventType,
      pathname,
      metadata,
      userAgent,
    });

    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Telemetry logging failed' }, { status: 500 });
  }
}

export async function GET() {
  const recent = await db.telemetry.findRecent(50);
  return NextResponse.json({ success: true, data: recent });
}
