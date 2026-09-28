import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { db } from '@/lib/db';
import { verifyAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  try {
    const auth = await verifyAdminRequest(req);
    if (!auth.valid) return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });

    const [
      rawLeadCountByStatus,
      totalLeads = 0,
      totalContacts = 0,
      totalCompanies = 0,
      rawFollowupCounts,
      unreadNotifications = 0,
      recentLeads = [],
      recentFollowups = [],
      totalInquiries = 0,
    ] = await Promise.all([
      adminDb.leads.countByStatus().catch(() => ({})),
      adminDb.leads.count().catch(() => 0),
      adminDb.contacts.count().catch(() => 0),
      adminDb.companies.count().catch(() => 0),
      adminDb.followups.countByCategory().catch(() => ({ overdue: 0, dueToday: 0, dueThisWeek: 0, upcoming: 0 })),
      adminDb.notifications.countUnread().catch(() => 0),
      adminDb.leads.findMany({ limit: 6 }).catch(() => []),
      adminDb.followups.findMany({ status: 'OPEN', limit: 8 }).catch(() => []),
      db.inquiries.count().catch(() => 0),
    ]);

    const leadCountByStatus: Record<string, number> = rawLeadCountByStatus || {};
    const followupCounts = rawFollowupCounts || { overdue: 0, dueToday: 0, dueThisWeek: 0, upcoming: 0 };

    // Derive pipeline stages with conversion rates
    const PIPELINE_STAGES = ['NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY', 'PROPOSAL', 'ACTIVE', 'WON', 'LOST'];
    const newCount = leadCountByStatus['NEW'] || 0;
    const pipeline = PIPELINE_STAGES.map(stage => ({
      stage,
      count: leadCountByStatus[stage] || 0,
      conversion: newCount > 0 ? Math.round(((leadCountByStatus[stage] || 0) / (totalLeads || 1)) * 100) : 0,
    }));

    // Needs attention items
    const needsAttention = [];
    if ((followupCounts.overdue || 0) > 0) needsAttention.push({ type: 'OVERDUE_FOLLOWUP', count: followupCounts.overdue, label: 'Overdue Follow-ups', url: '/admin/follow-ups' });
    if ((leadCountByStatus['NEW'] || 0) > 0) needsAttention.push({ type: 'LEADS_WAITING', count: leadCountByStatus['NEW'], label: 'New Leads Awaiting Response', url: '/admin/leads' });

    return NextResponse.json({
      kpis: {
        leads: totalLeads,
        inquiries: totalInquiries,
        conversionRate: totalLeads > 0 ? parseFloat(((leadCountByStatus['WON'] || 0) / totalLeads * 100).toFixed(1)) : 0,
        contacts: totalContacts,
        companies: totalCompanies,
        unreadNotifications,
      },
      pipeline,
      recentLeads: Array.isArray(recentLeads) ? recentLeads : [],
      followups: {
        counts: followupCounts,
        total: (followupCounts.overdue || 0) + (followupCounts.dueToday || 0) + (followupCounts.dueThisWeek || 0) + (followupCounts.upcoming || 0),
        items: Array.isArray(recentFollowups) ? recentFollowups : [],
      },
      needsAttention,
    });
  } catch (err: any) {
    console.error('Stats error:', err?.message || err);
    return NextResponse.json({
      error: 'Unable to load data right now. Please try again.',
      isProviderError: true
    }, { status: 503 });
  }
}
