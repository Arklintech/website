import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { uploadFileToDrive } from '@/lib/google-drive';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) {
    return NextResponse.json({ error: auth.status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: auth.status || 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name || `project_doc_${Date.now()}`;
    const mimeType = file.type || 'application/octet-stream';

    // Upload to Google Drive under Documents subfolder
    const driveMeta = await uploadFileToDrive(buffer, filename, mimeType, 'Documents');

    const projectFile = await adminDb.projectFiles.create({
      projectId: params.id,
      name: filename,
      driveUrl: driveMeta.drive_url,
      sizeBytes: driveMeta.size_bytes || buffer.length,
      mimeType,
    });

    return NextResponse.json({ data: projectFile }, { status: 201 });
  } catch (err: any) {
    console.error('Error uploading project file to Drive:', err);
    return NextResponse.json({ error: 'Failed to upload project file to Google Drive' }, { status: 500 });
  }
}
