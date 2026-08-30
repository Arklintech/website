import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateEmail } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    const subscriber = await db.subscribers.upsert(email, body.source || 'WEBSITE');

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to ARKLINTECH architectural bulletins.',
      subscriberId: subscriber.id,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process subscription.' },
      { status: 500 }
    );
  }
}
