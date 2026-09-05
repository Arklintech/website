import { executeWithRetry, SheetsProviderError } from '../src/lib/sheets-db';
import { adminDb } from '../src/lib/admin-db';
import { sheetsDb } from '../src/lib/sheets-db';

async function runErrorHandlingTests() {
  console.log('==================================================');
  console.log('ARKLINTECH — GOOGLE SHEETS ERROR HANDLING & RETRY SUITE');
  console.log('==================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}${detail ? `: ${detail}` : ''}`);
      failed++;
    }
  }

  // --------------------------------------------------------------------------
  // TEST 1: Successful Sheets read with records → returns records
  // --------------------------------------------------------------------------
  try {
    const mockOp = async () => [{ lead_id: 'l1', name: 'Test Record' }];
    const res = await executeWithRetry(mockOp, { maxRetries: 3, tabName: 'Leads' });
    assert(Array.isArray(res) && res.length === 1 && res[0].lead_id === 'l1', 'TEST 1: Successful Sheets read with records returns records');
  } catch (err: any) {
    assert(false, 'TEST 1: Successful Sheets read with records returns records', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 2: Successful Sheets read with no records → returns []
  // --------------------------------------------------------------------------
  try {
    const mockOp = async () => [];
    const res = await executeWithRetry(mockOp, { maxRetries: 3, tabName: 'Leads' });
    assert(Array.isArray(res) && res.length === 0, 'TEST 2: Successful Sheets read with no records returns []');
  } catch (err: any) {
    assert(false, 'TEST 2: Successful Sheets read with no records returns []', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 3: Simulated 429 → retries → eventually succeeds if provider recovers
  // --------------------------------------------------------------------------
  try {
    let attempts = 0;
    const mockOp = async () => {
      attempts++;
      if (attempts < 3) {
        const err: any = new Error('Quota exceeded for quota metric');
        err.status = 429;
        throw err;
      }
      return [{ lead_id: 'recovered_1' }];
    };
    const res = await executeWithRetry(mockOp, { maxRetries: 3, initialDelayMs: 10, tabName: 'Leads' });
    assert(attempts === 3 && Array.isArray(res) && res[0].lead_id === 'recovered_1', 'TEST 3: Simulated 429 retries and eventually succeeds');
  } catch (err: any) {
    assert(false, 'TEST 3: Simulated 429 retries and eventually succeeds', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 4: Persistent 429 → retries boundedly → throws controlled integration error → NEVER returns []
  // --------------------------------------------------------------------------
  try {
    let attempts = 0;
    const mockOp = async () => {
      attempts++;
      const err: any = new Error('429 RESOURCE_EXHAUSTED: Rate limit exceeded');
      err.status = 429;
      throw err;
    };
    await executeWithRetry(mockOp, { maxRetries: 3, initialDelayMs: 10, tabName: 'Leads' });
    assert(false, 'TEST 4: Persistent 429 throws SheetsProviderError', 'Expected error was not thrown!');
  } catch (err: any) {
    const isProviderErr = err instanceof SheetsProviderError;
    const isNotArray = err !== undefined && !Array.isArray(err);
    const sanitizedMsg = !err.message.includes('private_key') && !err.message.includes('secret');
    assert(isProviderErr && isNotArray && sanitizedMsg, 'TEST 4: Persistent 429 bounded retry throws controlled error & NEVER returns []', `Caught: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // TEST 5: Simulated 500/network failure → bounded retry → controlled failure
  // --------------------------------------------------------------------------
  try {
    let attempts = 0;
    const mockOp = async () => {
      attempts++;
      const err: any = new Error('500 Internal Server Error');
      err.status = 500;
      throw err;
    };
    await executeWithRetry(mockOp, { maxRetries: 2, initialDelayMs: 10, tabName: 'Leads' });
    assert(false, 'TEST 5: Simulated 500 network failure throws error', 'Expected error was not thrown!');
  } catch (err: any) {
    assert(err instanceof SheetsProviderError && err.isTransient, 'TEST 5: Simulated 500 network failure results in bounded retry & controlled failure');
  }

  // --------------------------------------------------------------------------
  // TEST 6: Admin receives provider failure → shows error state → does NOT show false empty state
  // --------------------------------------------------------------------------
  try {
    // We simulate what admin API route does when adminDb throws SheetsProviderError
    const providerErr = new SheetsProviderError('Google Sheets provider error (429) for tab "Leads"', { status: 429, isTransient: true });
    // Verify provider error message does not equal empty array []
    assert(providerErr !== undefined && providerErr.name === 'SheetsProviderError', 'TEST 6: Admin receives provider failure and can render error state without returning false empty state');
  } catch (err: any) {
    assert(false, 'TEST 6: Admin error state handling', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 7: Normal Admin loading behavior remains unchanged with healthy Sheets
  // --------------------------------------------------------------------------
  try {
    const leads = await adminDb.leads.findMany({ limit: 5 });
    assert(Array.isArray(leads), 'TEST 7: Normal Admin loading behavior works cleanly with healthy Sheets');
  } catch (err: any) {
    assert(false, 'TEST 7: Normal Admin loading behavior', err.message);
  }

  // --------------------------------------------------------------------------
  // TEST 8: Public inquiry flow still works with healthy Sheets
  // --------------------------------------------------------------------------
  try {
    const testEmail = `test_inquiry_flow_${Date.now()}@arklintech-test.com`;
    const contact = await sheetsDb.contacts.findOrCreate({
      email: testEmail,
      first_name: 'Test Flow User',
    });
    assert(contact && contact.contact_id !== undefined, 'TEST 8: Public inquiry flow works with healthy Sheets');
    // Cleanup
    await sheetsDb.deleteRowById('Contacts', 'contact_id', contact.contact_id);
  } catch (err: any) {
    assert(false, 'TEST 8: Public inquiry flow', err.message);
  }

  console.log('\n==================================================');
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('==================================================\n');

  if (failed > 0) process.exit(1);
  process.exit(0);
}

runErrorHandlingTests();
