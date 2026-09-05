import { sheetsDb } from '../src/lib/sheets-db';
import { adminDb, invalidateAdminDbCache } from '../src/lib/admin-db';

async function runNotificationFlowTest() {
  console.log('==================================================');
  console.log('ARKLINTECH — COMMAND LIVE INQUIRY NOTIFICATION UX TEST');
  console.log('==================================================\n');

  invalidateAdminDbCache();

  const testEmail = `notif.test.${Date.now()}@arklintech.com`;
  const testName = 'Notification UX Tester';
  const testCompany = 'COMMAND QA Labs';
  const testService = 'AI Enterprise System';
  const testRequirement = 'Live notification flow verification test.';

  // 1. Submit Inquiry via POST /api/inquiries logic
  console.log('[STEP 1] Simulating website inquiry submission...');
  
  const contactRecord = await sheetsDb.contacts.findOrCreate({
    email: testEmail,
    first_name: testName,
    company_id: testCompany,
    job_title: 'QA Lead',
  });

  const inquiryRecord = await sheetsDb.inquiries.create({
    contact_id: contactRecord.contact_id,
    subject: `Project Inquiry: ${testService}`,
    message: testRequirement,
    source: 'Website Inquiry Form',
    page: '/start-a-system',
  });

  const leadRecord = await sheetsDb.leads.create({
    contact_id: contactRecord.contact_id,
    inquiry_id: inquiryRecord.inquiry_id,
    interest: testService,
    budget: '$50k-$100k',
    notes: testRequirement,
    source_id: 'Website Inquiry Form',
  });

  const notifRecord = await sheetsDb.notifications.create({
    type: 'NEW_LEAD',
    title: 'New System Inquiry',
    message: `${testName} (${testCompany}) requested ${testService}`,
    priority: 'HIGH',
    entity_type: 'LEAD',
    entity_id: leadRecord.lead_id,
    action_label: 'View Lead',
    action_url: `/admin/leads/${leadRecord.lead_id}`,
  });

  console.log(`✓ Inquiry created: ${inquiryRecord.inquiry_id}`);
  console.log(`✓ Lead created: ${leadRecord.lead_id}`);
  console.log(`✓ Notification created in Sheets & Admin: ${notifRecord.notification_id}\n`);

  invalidateAdminDbCache();

  // 2. Fetch Notifications (Simulate COMMAND Tray Open)
  console.log('[STEP 2] Fetching notifications as COMMAND Admin...');
  const allNotifs = await adminDb.notifications.findAll(50);
  const unreadCount = await adminDb.notifications.countUnread();

  console.log(`✓ Total notifications in tray: ${allNotifs.length}`);
  console.log(`✓ Unread count: ${unreadCount}`);

  const targetNotif = allNotifs.find(n => n.id === notifRecord.notification_id);
  
  if (!targetNotif) {
    throw new Error(`FAIL: Created notification (${notifRecord.notification_id}) was not found in COMMAND tray.`);
  }

  console.log('\n✓ Found target notification in tray:');
  console.log(`  - Notification ID: ${targetNotif.id}`);
  console.log(`  - Type: ${targetNotif.type}`);
  console.log(`  - Title: ${targetNotif.title}`);
  console.log(`  - Body: ${targetNotif.body}`);
  console.log(`  - Action Label: ${targetNotif.actionLabel}`);
  console.log(`  - Action URL: ${targetNotif.actionUrl}`);
  console.log(`  - Is Read: ${targetNotif.isRead}`);

  if (targetNotif.isRead !== false) {
    throw new Error('FAIL: Notification should initially be UNREAD (isRead = false).');
  }
  if (!targetNotif.actionUrl?.includes(leadRecord.lead_id)) {
    throw new Error(`FAIL: Action URL (${targetNotif.actionUrl}) does not match lead_id (${leadRecord.lead_id}).`);
  }

  // 3. Mark Notification Read
  console.log('\n[STEP 3] Marking notification as READ (simulating user click)...');
  await adminDb.notifications.markRead(targetNotif.id);

  // 4. Verify Read State Preserved After Refresh
  console.log('\n[STEP 4] Refreshing COMMAND tray to verify persistence...');
  invalidateAdminDbCache();
  const refreshedNotifs = await adminDb.notifications.findAll(50);
  const refreshedUnreadCount = await adminDb.notifications.countUnread();

  const refreshedTarget = refreshedNotifs.find(n => n.id === targetNotif.id);
  if (!refreshedTarget) {
    throw new Error('FAIL: Target notification disappeared after refresh.');
  }

  console.log(`✓ Refreshed Is Read: ${refreshedTarget.isRead}`);
  console.log(`✓ Refreshed Unread Count: ${refreshedUnreadCount}`);

  if (refreshedTarget.isRead !== true) {
    throw new Error('FAIL: Notification did NOT remain marked as READ after refresh.');
  }

  // 5. Cleanup
  console.log('\n[STEP 5] Cleaning up test records from Google Sheets...');
  await sheetsDb.deleteRowById('Notifications', 'notification_id', notifRecord.notification_id);
  await sheetsDb.deleteRowById('Leads', 'lead_id', leadRecord.lead_id);
  await sheetsDb.deleteRowById('Inquiries', 'inquiry_id', inquiryRecord.inquiry_id);
  await sheetsDb.deleteRowById('Contacts', 'contact_id', contactRecord.contact_id);

  console.log('✓ Cleanup complete!\n');
  console.log('==================================================');
  console.log('SUCCESS: ALL 9 NOTIFICATION UX VERIFICATION CHECKS PASSED');
  console.log('==================================================');
}

runNotificationFlowTest().catch(err => {
  console.error('\n❌ TEST FAILED:', err.message || err);
  process.exit(1);
});
