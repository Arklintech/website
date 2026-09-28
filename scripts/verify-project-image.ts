// Live verification of the project image flow against Google Drive + Sheets, using the same
// server functions the /api/admin/projects routes call. Replaces a project's image with a
// generated test image, re-reads from the source (what a hard refresh fetches), then restores
// the original and proves the Projects sheet was not modified.
//
// Usage: npx tsx scripts/verify-project-image.ts [projectId]   (reads credentials from .env.local)

import fs from 'fs';
import crypto from 'crypto';

function loadEnv(file: string) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /^([A-Z0-9_]+)=("([\s\S]*?)"|'([\s\S]*?)'|[^\r\n]*)/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) process.env[m[1]] ??= m[3] ?? m[4] ?? m[2];
}

const sha = (b: Buffer | string) => crypto.createHash('sha256').update(b).digest('hex').slice(0, 16);
let failures = 0;
const check = (ok: boolean, label: string, detail = '') => {
  if (!ok) failures++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`);
};

async function main() {
  loadEnv('.env.local');
  const projectId = process.argv[2] || 'proj_cafe_2026';

  const sharp = (await import('sharp')).default;
  const { adminDb } = await import('../src/lib/admin-db');
  const { saveProjectImage } = await import('../src/lib/project-image-store');
  const { downloadDriveFile } = await import('../src/lib/google-drive');
  const { getSheetsClient, SPREADSHEET_ID } = await import('../src/lib/google');

  const sheetSnapshot = async () => {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: "'Projects'!A1:ZZ" });
    return sha(JSON.stringify(res.data.values || []));
  };

  const sheetBefore = await sheetSnapshot();

  // 1. Current state
  const original = await adminDb.projects.findById(projectId);
  if (!original) throw new Error(`Project ${projectId} not found`);
  console.log(`Project: ${original.name} (${original.id}) — current image: ${original.thumbnailUrl}`);

  // 2. Replace with a distinct test image
  const testImage = await sharp({ create: { width: 320, height: 320, channels: 3, background: '#E11D48' } })
    .composite([{ input: Buffer.from('<svg width="320" height="320"><text x="160" y="175" font-size="56" text-anchor="middle" fill="white" font-family="sans-serif">TEST</text></svg>'), top: 0, left: 0 }])
    .png().toBuffer();
  const fileId = await saveProjectImage(original.id, testImage, 'image/png', `project-${original.id}-verify-${Date.now()}.png`);
  console.log(`Uploaded test image to Drive: ${fileId}`);

  // 3. Fresh reads — detail (findById) and list (findRecent) must agree on the new image
  const afterSave = await adminDb.projects.findById(original.id);
  check(afterSave?.thumbnailUrl === `drive:${fileId}`, 'detail read returns the new image', String(afterSave?.thumbnailUrl));
  const inList = (await adminDb.projects.findRecent(200)).find((p) => p.id === original.id);
  check(inList?.thumbnailUrl === `drive:${fileId}`, 'list read returns the same new image', String(inList?.thumbnailUrl));

  // 4. The stored bytes are the test image
  const stored = await downloadDriveFile(fileId);
  check(sha(stored.data) === sha(testImage) && stored.mimeType === 'image/png', 'Drive file bytes match the uploaded test image', `${stored.mimeType}, ${stored.data.length} bytes`);

  // 5. Restore the original
  const restored = await adminDb.projects.removeImage(original.id);
  check(restored?.thumbnailUrl === original.thumbnailUrl, 'restore returns the original image', String(restored?.thumbnailUrl));
  const afterRestore = await adminDb.projects.findById(original.id);
  check(afterRestore?.thumbnailUrl === original.thumbnailUrl, 'fresh read after restore shows the original image', String(afterRestore?.thumbnailUrl));

  // 6. No other project data changed, and the Sheet is untouched
  const { thumbnailUrl: _a, updatedAt: _b, ...before } = original;
  const { thumbnailUrl: _c, updatedAt: _d, ...after } = afterRestore!;
  check(JSON.stringify(before) === JSON.stringify(after), 'all other project fields unchanged');
  check((await sheetSnapshot()) === sheetBefore, 'Google Sheets Projects tab unchanged', sheetBefore);

  console.log(failures ? `\n${failures} check(s) failed` : '\nAll checks passed');
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
