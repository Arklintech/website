import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { uploadFileToDrive, SUBFOLDER_MAP } from '@/lib/google-drive';

export async function POST(req: NextRequest) {
  const auth = verifyAdminRequest(req);
  if (!auth.valid) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const subfolder = (formData.get('subfolder') as string) || 'Documents';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const validSubfolder = (Object.keys(SUBFOLDER_MAP).includes(subfolder)
      ? subfolder
      : 'Documents') as 'Assets' | 'Images' | 'Attachments' | 'Documents' | 'Avatars';

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await uploadFileToDrive(buffer, file.name, file.type || 'application/octet-stream', validSubfolder);

    return NextResponse.json({
      success: true,
      data: metadata,
    });
  } catch (err: any) {
    console.error('Drive upload API error:', err);
    return NextResponse.json({ error: 'Failed to upload file to Google Drive', details: err?.message }, { status: 500 });
  }
}
