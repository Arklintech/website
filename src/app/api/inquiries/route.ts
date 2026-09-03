import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { adminDb } from '@/lib/admin-db';
import { validateInquiryPayload, checkRateLimit } from '@/lib/validation';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    
    // Rate Limiting: Max 10 requests per minute per IP
    if (!checkRateLimit(ip, 10, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = validateInquiryPayload(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || undefined;

    const record = await db.inquiries.create({
      name: validation.data.name,
      company: validation.data.company,
      email: validation.data.email,
      phone: validation.data.phone,
      industry: validation.data.industry,
      service: validation.data.service,
      requirement: validation.data.requirement,
      budget: validation.data.budget,
      ipAddress: ip,
      userAgent,
    });

    // Sync to Admin DB (Leads, Contacts, Conversations, Notifications)
    try {
      const payload = validation.data;
      if (payload) {
        // 1. Find or create Contact
        let contact = await adminDb.contacts.findByEmail(payload.email);
        if (!contact) {
          contact = await adminDb.contacts.create({
            name: payload.name,
            email: payload.email,
            phone: payload.phone || null,
            company: payload.company || null,
            industry: payload.industry || null,
            notes: `Created from website inquiry #${record.id}`,
          });
        }

        // 2. Find or create Company if provided
        let companyRecord = null;
        if (payload.company) {
          const compName = payload.company;
          const companies = await adminDb.companies.findMany(500);
          companyRecord = companies.find(c => c.name.toLowerCase() === compName.toLowerCase());
          if (!companyRecord) {
            companyRecord = await adminDb.companies.create({
              name: compName,
              industry: payload.industry || null,
            });
          }
        }

        // 3. Create Lead
        const lead = await adminDb.leads.create({
          name: payload.name,
          email: payload.email,
          phone: payload.phone || null,
          company: payload.company || null,
          industry: payload.industry || null,
          projectType: payload.service || null,
          interest: payload.service || null,
          budget: payload.budget || null,
          problem: payload.requirement || null,
          message: payload.requirement || null,
          source: 'Website Inquiry Form',
          status: 'NEW',
          priority: 'HIGH',
          contactId: contact?.id || null,
          companyId: companyRecord?.id || null,
          inquiryId: record.id,
        });

        // 4. Create Inbox Conversation
        const conv = await adminDb.conversations.create({
          subject: `Project Inquiry: ${payload.service || 'System Build'}`,
          status: 'OPEN',
          contactId: contact?.id || null,
          leadId: lead.id,
          companyId: companyRecord?.id || null,
          lastMessageAt: new Date().toISOString(),
          unreadCount: 1,
        });

        // 5. Create Inbound Message
        await adminDb.messages.create({
          conversationId: conv.id,
          direction: 'INBOUND',
          from: payload.email,
          subject: `Inquiry from ${payload.name}`,
          body: payload.requirement || `Interested in ${payload.service} system. Budget: ${payload.budget || 'N/A'}.`,
          isInternal: false,
          deliveryStatus: null,
          createdAt: new Date().toISOString(),
        });

        // 6. Create Notification
        await adminDb.notifications.create({
          type: 'NEW_LEAD',
          title: 'New System Inquiry',
          body: `${payload.name} (${payload.company || 'Direct'}) requested ${payload.service || 'a system'}`,
          actionLabel: 'View Leads →',
          actionUrl: `/admin/leads`,
        });
      }
    } catch (syncErr) {
      console.error('Error syncing inquiry to adminDb:', syncErr);
    }

    // Record Telemetry Event
    await db.telemetry.create({
      eventType: 'INQUIRY_SUBMITTED',
      pathname: '/api/inquiries',
      metadata: JSON.stringify({ inquiryId: record.id, industry: record.industry, service: record.service }),
      userAgent,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your project inquiry has been received. An ARKLINTECH systems architect will review it shortly.',
        inquiryId: record.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error in /api/inquiries POST:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = req.headers.get('x-admin-key') || searchParams.get('key');
    const adminPasscode = process.env.ADMIN_PASSCODE || 'arklintech2026';

    // Simple Admin Auth Verification
    if (key !== adminPasscode) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access. Valid admin key required.' },
        { status: 401 }
      );
    }

    const status = searchParams.get('status') || 'ALL';
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const [inquiries, totalCount] = await Promise.all([
      db.inquiries.findMany({ status, limit, offset }),
      db.inquiries.count({ status }),
    ]);

    const stats = {
      total: await db.inquiries.count({ status: 'ALL' }),
      new: await db.inquiries.count({ status: 'NEW' }),
      inReview: await db.inquiries.count({ status: 'IN_REVIEW' }),
      engaged: await db.inquiries.count({ status: 'ENGAGED' }),
      archived: await db.inquiries.count({ status: 'ARCHIVED' }),
    };

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + inquiries.length < totalCount,
      },
      stats,
    });
  } catch (error) {
    console.error('API Error in /api/inquiries GET:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve inquiries.' },
      { status: 500 }
    );
  }
}
