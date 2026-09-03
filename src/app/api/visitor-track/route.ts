import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, pathname, source, device } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || undefined;

    // Fetch existing active visitor if present
    const activeVisitors = await adminDb.visitors.findActive();
    const existing = activeVisitors.find(v => v.sessionId === sessionId);

    let pagesVisited = existing?.pagesVisited || [];
    if (pathname && !pagesVisited.includes(pathname)) {
      pagesVisited = [...pagesVisited, pathname];
    }

    // Determine intent based on pages visited
    let intent: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
    if (pagesVisited.some(p => p.includes('start-a-system') || p.includes('contact'))) {
      intent = 'HIGH';
    } else if (pagesVisited.length > 2) {
      intent = 'MEDIUM';
    }

    await adminDb.visitors.upsertSession(sessionId, {
      currentPage: pathname || '/',
      landingPage: existing?.landingPage || pathname || '/',
      pagesVisited,
      device: device || (userAgent?.includes('Mobile') ? 'Mobile' : 'Desktop'),
      location: ip,
      country: '🇮🇳',
      source: source || 'Direct',
      intent,
      isActive: true,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
