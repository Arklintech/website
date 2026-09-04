import { sheetsDb } from '../src/lib/sheets-db';
import { adminDb } from '../src/lib/admin-db';

async function runE2ETest() {
  console.log('==================================================');
  console.log('ARKLINTECH COMMAND — END-TO-END INTEGRATION TEST');
  console.log('Website ↔ Backend ↔ Google Sheets ↔ Admin Panel');
  console.log('==================================================\n');

  const testEmail = `e2e_test_${Date.now()}@arklintech-test.com`;
  const testName = 'E2E Integration Test User';
  const testService = 'AI Autonomous Architecture';
  const testBudget = '$50k - $100k';
  const testRequirement = 'Automated end-to-end integration test payload.';

  let testContactId = '';
  let testInquiryId = '';
  let testLeadId = '';
  let testNotifId = '';

  try {
    // Step 1: Simulate Website Inquiry Form Submission → Backend
    console.log('[Step A-C] Submitting controlled test inquiry via Backend API...');
    const contact = await sheetsDb.contacts.findOrCreate({
      email: testEmail,
      first_name: testName,
      phone: '+1 555-0199',
      job_title: 'Software Architect',
    });
    testContactId = contact.contact_id;
    console.log(`✓ Created/Deduplicated Contact in Sheets: ${testContactId} (${testEmail})`);

    const inquiry = await sheetsDb.inquiries.create({
      contact_id: testContactId,
      subject: `Project Inquiry: ${testService}`,
      message: testRequirement,
      source: 'Website E2E Test',
      page: '/start-a-system',
    });
    testInquiryId = inquiry.inquiry_id;
    console.log(`✓ Created Inquiry in Sheets: ${testInquiryId}`);

    const lead = await sheetsDb.leads.create({
      contact_id: testContactId,
      inquiry_id: testInquiryId,
      interest: testService,
      budget: testBudget,
      notes: testRequirement,
      source_id: 'Website E2E Test',
    });
    testLeadId = lead.lead_id;
    console.log(`✓ Created Lead in Sheets: ${testLeadId}`);

    const notif = await sheetsDb.notifications.create({
      type: 'NEW_LEAD',
      title: 'New E2E Test Inquiry',
      message: `${testName} requested ${testService}`,
      priority: 'HIGH',
      entity_type: 'INQUIRY',
      entity_id: testInquiryId,
    });
    testNotifId = notif.notification_id;
    console.log(`✓ Created Notification in Sheets: ${testNotifId}`);

    // Step 2: Verify Sheets Records Exist
    console.log('\n[Step D-E] Verifying Google Sheets Persistence...');
    const allLeadsSheets = await sheetsDb.readTab('Leads');
    const matchedLeadSheet = allLeadsSheets.find(l => l.lead_id === testLeadId);
    if (!matchedLeadSheet) throw new Error('Lead not found in Google Sheets!');
    console.log(`✓ Google Sheets Lead Record verified: ID ${matchedLeadSheet.lead_id}, Status: ${matchedLeadSheet.status}`);

    const allNotifsSheets = await sheetsDb.readTab('Notifications');
    const matchedNotifSheet = allNotifsSheets.find(n => n.notification_id === testNotifId);
    if (!matchedNotifSheet) throw new Error('Notification not found in Google Sheets!');
    console.log(`✓ Google Sheets Notification Record verified: ID ${matchedNotifSheet.notification_id}, Title: "${matchedNotifSheet.title}"`);

    // Step 3: Admin UI Data Retrieval
    console.log('\n[Step F-H] Simulating Admin Data Retrieval...');
    const adminLeads = await adminDb.leads.findMany();
    const matchedAdminLead = adminLeads.find(l => l.id === testLeadId || l.email === testEmail);
    if (!matchedAdminLead) throw new Error('Lead not reflected in Admin DB!');
    console.log(`✓ Admin retrieved Lead Record: ID ${matchedAdminLead.id}, Name: ${matchedAdminLead.name}, Shared ID Match: ${matchedAdminLead.id === testLeadId}`);

    const adminNotifs = await adminDb.notifications.findAll();
    const matchedAdminNotif = adminNotifs.find(n => n.id === testNotifId || n.body.includes(testName));
    if (!matchedAdminNotif) throw new Error('Notification not reflected in Admin DB!');
    console.log(`✓ Admin retrieved Notification: ID ${matchedAdminNotif.id}, Body: "${matchedAdminNotif.body}"`);

    // Step 4: Admin-Side Update Test
    console.log('\n[Step I-K] Testing Admin Status Update (NEW → QUALIFIED)...');
    await adminDb.leads.update(testLeadId, { status: 'QUALIFIED', priority: 'HIGH', notes: 'E2E Updated' });
    console.log(`✓ Updated status in Admin DB for Lead ID ${testLeadId}`);

    // Read back directly from Google Sheets to verify persistence
    const recheckedSheets = await sheetsDb.readTab('Leads');
    const updatedLeadSheet = recheckedSheets.find(l => l.lead_id === testLeadId);
    if (!updatedLeadSheet || updatedLeadSheet.status !== 'QUALIFIED') {
      throw new Error(`Google Sheets status check failed! Expected QUALIFIED, got ${updatedLeadSheet?.status}`);
    }
    console.log(`✓ Google Sheets row verified after Admin update: Status is "${updatedLeadSheet.status}"!`);

    // Step 5: Clean Up Test Records
    console.log('\n[Step M] Cleaning up controlled test records...');
    await sheetsDb.deleteRowById('Leads', 'lead_id', testLeadId);
    await sheetsDb.deleteRowById('Inquiries', 'inquiry_id', testInquiryId);
    await sheetsDb.deleteRowById('Contacts', 'contact_id', testContactId);
    await sheetsDb.deleteRowById('Notifications', 'notification_id', testNotifId);
    console.log('✓ Controlled test records deleted cleanly from Google Sheets!');

    console.log('\n==================================================');
    console.log('SUCCESS: END-TO-END INTEGRATION VERIFICATION PASSED!');
    console.log('==================================================\n');
  } catch (err) {
    console.error('❌ E2E Integration Test Failed:', err);
    process.exit(1);
  }
}

runE2ETest();
