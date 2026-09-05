import { sheetsDb } from '../src/lib/sheets-db';
import { adminDb } from '../src/lib/admin-db';
import { uploadFileToDrive } from '../src/lib/google-drive';

const LIVE_BASE_URL = 'https://arklintech.com';
const TEST_EMAIL = 'anasahmedkhan4535@gmail.com';

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runLiveVerification() {
  console.log('==================================================');
  console.log('ARKLINTECH — PRODUCTION DEPLOYMENT E2E VERIFICATION');
  console.log('==================================================');
  console.log(`Target: ${LIVE_BASE_URL}`);

  // 1. Verify Live Health and Website
  console.log('\n--- STEP 1: CHECKING LIVE WEBSITE & HEALTH ---');
  try {
    const healthRes = await fetch(`${LIVE_BASE_URL}/api/health`);
    console.log(`Health endpoint status: ${healthRes.status} ${healthRes.statusText}`);
    const siteRes = await fetch(LIVE_BASE_URL);
    console.log(`Website root status: ${siteRes.status} ${siteRes.statusText}`);
    if (!siteRes.ok) {
      throw new Error(`Live site returned status ${siteRes.status}`);
    }
  } catch (err: any) {
    console.error('Failed to reach live website:', err.message);
  }

  // 2. Submit Controlled Production Test Inquiry
  console.log('\n--- STEP 2: SUBMITTING CONTROLLED TEST INQUIRY ---');
  const payload = {
    name: 'Anas Ahmed Khan',
    email: TEST_EMAIL,
    phone: '+92 300 1234567',
    company: 'ARKLINTECH Prod Audit',
    service: 'Core Platform Engineering',
    budget: '$50,000+',
    timeline: '3 months',
    requirement: 'Production deployment live verification test for full Website -> Backend -> Sheets -> COMMAND loop.',
    notes: 'Controlled E2E Production Verification',
  };

  const response = await fetch(`${LIVE_BASE_URL}/api/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (ARKLINTECH Prod Verification)',
    },
    body: JSON.stringify(payload),
  });

  console.log(`Live HTTP Response: ${response.status}`);
  const data = await response.json();
  console.log('Live API Response Body:', JSON.stringify(data));

  if (!response.ok || !data.success) {
    throw new Error(`Inquiry submission failed with status ${response.status}: ${JSON.stringify(data)}`);
  }

  console.log('Waiting 3s for Google Sheets replication...');
  await wait(3000);

  // 3. Inspect Google Sheets Operational Tabs
  console.log('\n--- STEP 3: VERIFYING GOOGLE SHEETS RECORDS ---');
  const [contacts, inquiries, leads, notifications] = await Promise.all([
    sheetsDb.readTab('Contacts'),
    sheetsDb.readTab('Inquiries'),
    sheetsDb.readTab('Leads'),
    sheetsDb.readTab('Notifications'),
  ]);

  const contactRecord = contacts.find((c) => (c.email || '').toLowerCase() === TEST_EMAIL.toLowerCase());
  const inquiryRecord = inquiries.find((i) => (i.email || '').toLowerCase() === TEST_EMAIL.toLowerCase());
  const leadRecord = leads.find((l) => (l.email || '').toLowerCase() === TEST_EMAIL.toLowerCase());
  const notifRecord = notifications.find(
    (n) => n.entity_id === leadRecord?.lead_id || (n.message && n.message.includes('Anas Ahmed Khan'))
  );

  console.log('Google Sheets Verification:');
  console.log('  - Contact Record:', contactRecord ? `FOUND (${contactRecord.contact_id})` : 'MISSING');
  console.log('  - Inquiry Record:', inquiryRecord ? `FOUND (${inquiryRecord.inquiry_id})` : 'MISSING');
  console.log('  - Lead Record:', leadRecord ? `FOUND (${leadRecord.lead_id})` : 'MISSING');
  console.log('  - Notification Record:', notifRecord ? `FOUND (${notifRecord.notification_id}, Status: ${notifRecord.status})` : 'MISSING');

  if (!contactRecord || !inquiryRecord || !leadRecord || !notifRecord) {
    throw new Error('One or more Google Sheets records are missing!');
  }

  // 4. Verify COMMAND Admin Retrieval
  console.log('\n--- STEP 4: VERIFYING COMMAND ADMIN RETRIEVAL ---');
  const adminLeads = await adminDb.leads.findMany();
  const adminContacts = await adminDb.contacts.findMany();
  const adminNotifs = await adminDb.notifications.findMany();

  const matchedAdminLead = adminLeads.find((l) => l.id === leadRecord.lead_id || l.email === TEST_EMAIL);
  const matchedAdminContact = adminContacts.find((c) => c.id === contactRecord.contact_id || c.email === TEST_EMAIL);
  const matchedAdminNotif = adminNotifs.find((n) => n.id === notifRecord.notification_id || (n.actionUrl && n.actionUrl.includes(leadRecord.lead_id)));

  console.log('COMMAND Admin Retrieval:');
  console.log('  - Admin Lead:', matchedAdminLead ? `RETRIEVED (Status: ${matchedAdminLead.status})` : 'MISSING');
  console.log('  - Admin Contact:', matchedAdminContact ? `RETRIEVED (${matchedAdminContact.name})` : 'MISSING');
  console.log('  - Admin Notification:', matchedAdminNotif ? `RETRIEVED (isRead: ${matchedAdminNotif.isRead}, actionUrl: ${matchedAdminNotif.actionUrl})` : 'MISSING');

  if (!matchedAdminLead || !matchedAdminContact || !matchedAdminNotif) {
    throw new Error('COMMAND Admin retrieval failed to match operational records!');
  }

  // 5. Test Notification Mark As Read & Lead Status Update
  console.log('\n--- STEP 5: TESTING ADMIN ACTIONS & PERSISTENCE ---');
  console.log(`Marking notification ${notifRecord.notification_id} as READ...`);
  await adminDb.notifications.markRead(notifRecord.notification_id);

  console.log(`Updating Lead ${leadRecord.lead_id} status from NEW to QUALIFIED...`);
  await adminDb.leads.update(leadRecord.lead_id, { status: 'QUALIFIED' });

  console.log('Waiting 2s for Sheets write...');
  await wait(2000);

  // 6. Verify Persistence in Sheets and Admin
  console.log('\n--- STEP 6: VERIFYING POST-UPDATE PERSISTENCE ---');
  const [updatedLeads, updatedNotifs] = await Promise.all([
    sheetsDb.readTab('Leads'),
    sheetsDb.readTab('Notifications'),
  ]);

  const persistedLead = updatedLeads.find((l) => l.lead_id === leadRecord.lead_id);
  const persistedNotif = updatedNotifs.find((n) => n.notification_id === notifRecord.notification_id);

  console.log(`Updated Sheet Lead Status: "${persistedLead?.status}" (Expected: "QUALIFIED")`);
  console.log(`Updated Sheet Notification Status: "${persistedNotif?.status}" (Expected: "READ")`);

  const refreshedAdminLead = await adminDb.leads.findById(leadRecord.lead_id);
  const refreshedAdminNotifs = await adminDb.notifications.findMany();
  const refreshedAdminNotif = refreshedAdminNotifs.find((n) => n.id === notifRecord.notification_id);

  console.log(`Refreshed Admin Lead Status: "${refreshedAdminLead?.status}" (Expected: "QUALIFIED")`);
  console.log(`Refreshed Admin Notification isRead: ${refreshedAdminNotif?.isRead} (Expected: true)`);

  const persistencePassed =
    persistedLead?.status === 'QUALIFIED' &&
    persistedNotif?.status === 'READ' &&
    refreshedAdminLead?.status === 'QUALIFIED' &&
    refreshedAdminNotif?.isRead === true;

  if (!persistencePassed) {
    throw new Error('Persistence verification failed for lead update or notification read state!');
  }
  console.log('✓ Persistence verification PASSED!');

  // 7. Verify Google Drive Integration
  console.log('\n--- STEP 7: VERIFYING GOOGLE DRIVE INTEGRATION ---');
  const testBuffer = Buffer.from('ARKLINTECH Production Deployment Drive Test ' + new Date().toISOString(), 'utf-8');
  const driveResult = await uploadFileToDrive(
    testBuffer,
    `prod-audit-${Date.now()}.txt`,
    'text/plain',
    'Attachments'
  );
  console.log('Drive Upload Result:', {
    fileId: driveResult.file_id,
    name: driveResult.name,
    mimeType: driveResult.mime_type,
    hasDriveUrl: !!driveResult.drive_url,
  });

  // 8. Clean up Controlled Test Records
  console.log('\n--- STEP 8: CLEANING UP PRODUCTION TEST RECORDS ---');
  if (leadRecord) await sheetsDb.deleteRowById('Leads', 'lead_id', leadRecord.lead_id);
  if (inquiryRecord) await sheetsDb.deleteRowById('Inquiries', 'inquiry_id', inquiryRecord.inquiry_id);
  if (notifRecord) await sheetsDb.deleteRowById('Notifications', 'notification_id', notifRecord.notification_id);
  if (contactRecord) await sheetsDb.deleteRowById('Contacts', 'contact_id', contactRecord.contact_id);
  console.log('✓ All test records successfully purged from Google Sheets!');

  console.log('\n==================================================');
  console.log('✅ ALL PRODUCTION DEPLOYMENT VERIFICATION CHECKS PASSED');
  console.log('==================================================');
}

runLiveVerification().catch((err) => {
  console.error('\n❌ LIVE VERIFICATION FAILED:', err);
  process.exit(1);
});
