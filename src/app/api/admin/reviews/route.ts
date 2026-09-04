import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';

export async function GET(req: NextRequest) {
  try {
    const reviews = await adminDb.reviews.findMany();
    return NextResponse.json({ success: true, reviews });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authorName, authorTitle, authorCompany, rating, comment, source, published } = body;

    if (!authorName || !comment) {
      return NextResponse.json({ success: false, error: 'authorName and comment are required' }, { status: 400 });
    }

    const newReview = await adminDb.reviews.create({
      authorName,
      authorTitle: authorTitle || '',
      authorCompany: authorCompany || '',
      rating: Number(rating) || 5,
      comment,
      source: source || 'Google Review',
      published: Boolean(published),
    });

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to create review' }, { status: 500 });
  }
}
