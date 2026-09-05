import { uploadFileToDrive, getDriveFileMetadata } from '../src/lib/google-drive';

async function runDriveIntegrationTest() {
  console.log('==================================================');
  console.log('ARKLINTECH COMMAND — GOOGLE DRIVE STORAGE INTEGRATION TEST');
  console.log('==================================================\n');

  try {
    const testContent = Buffer.from(`ARKLINTECH Drive Upload Verification Test — ${new Date().toISOString()}`);
    const filename = `test_upload_${Date.now()}.txt`;

    console.log('[STEP 1] Uploading test document buffer to Google Drive (Documents subfolder)...');
    const uploadResult = await uploadFileToDrive(testContent, filename, 'text/plain', 'Documents');

    console.log('✓ Drive upload successful:');
    console.log(`  - File ID: ${uploadResult.file_id}`);
    console.log(`  - Name: ${uploadResult.name}`);
    console.log(`  - Subfolder: ${uploadResult.subfolder}`);
    console.log(`  - Drive URL: ${uploadResult.drive_url}`);
    console.log(`  - Size: ${uploadResult.size_bytes} bytes`);

    console.log('\n[STEP 2] Fetching file metadata from Google Drive by File ID...');
    const metadata = await getDriveFileMetadata(uploadResult.file_id);

    if (!metadata || metadata.file_id !== uploadResult.file_id) {
      throw new Error('FAIL: Metadata retrieved from Google Drive did not match uploaded file ID.');
    }

    console.log('✓ Google Drive file metadata verified:');
    console.log(`  - File ID: ${metadata.file_id}`);
    console.log(`  - Name: ${metadata.name}`);
    console.log(`  - Mime Type: ${metadata.mime_type}`);
    console.log(`  - Drive URL: ${metadata.drive_url}`);

    console.log('\n==================================================');
    console.log('SUCCESS: GOOGLE DRIVE STORAGE INTEGRATION PASSED');
    console.log('==================================================');
  } catch (err: any) {
    console.error('\n❌ Google Drive Test Failed:', err?.message || err);
    process.exit(1);
  }
}

runDriveIntegrationTest();
