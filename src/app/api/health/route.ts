import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const startTime = Date.now();

export async function GET() {
  const startDb = Date.now();
  let dbStatus = 'HEALTHY';
  let totalInquiries = 0;
  let totalSubscribers = 0;

  try {
    [totalInquiries, totalSubscribers] = await Promise.all([
      db.inquiries.count(),
      db.subscribers.count(),
    ]);
  } catch (err) {
    dbStatus = 'DEGRADED';
    console.error('Health check DB error:', err);
  }
  const dbLatencyMs = Date.now() - startDb;

  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = process.memoryUsage();

  return NextResponse.json({
    status: dbStatus === 'HEALTHY' ? 'OPERATIONAL' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    system: {
      name: 'ARKLINTECH Systems & Engineering Backend',
      version: '2.4.0',
      environment: process.env.NODE_ENV || 'development',
      uptimeSeconds,
      uptimeFormatted: `${Math.floor(uptimeSeconds / 3600)}h ${Math.floor((uptimeSeconds % 3600) / 60)}m ${uptimeSeconds % 60}s`,
    },
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
      totalInquiries,
      totalSubscribers,
    },
    resources: {
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100,
      heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024 * 100) / 100,
      rssMb: Math.round(memoryUsage.rss / 1024 / 1024 * 100) / 100,
    },
  });
}
