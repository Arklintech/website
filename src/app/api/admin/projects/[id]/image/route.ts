import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/admin-db';
import { verifyAdminRequest } from '@/lib/admin-auth';
import { downloadDriveFile } from '@/lib/google-drive';
import { saveProjectImage } from '@/lib/project-image-store';
import { driveFileIdFromRef, PROJECT_IMAGE_MAX_BYTES, PROJECT_IMAGE_TYPES } from '@/lib/project-image';

const unauthorized = (status: number) =>
  NextResponse.json({ error: status === 403 ? 'Forbidden: Access denied' : 'Unauthorized' }, { status: status || 401 });

/** Serves the project's current Drive-hosted image. `?ref=` must match the persisted reference. */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) return unauthorized(auth.status);

  try {
    const project = await adminDb.projects.findById(params.id);
    const fileId = driveFileIdFromRef(project?.thumbnailUrl);
    if (!project || !fileId || req.nextUrl.searchParams.get('ref') !== fileId) {
      return NextResponse.json({ error: 'Project image not found' }, { status: 404 });
    }

    const { data, mimeType } = await downloadDriveFile(fileId);
    if (!PROJECT_IMAGE_TYPES.includes(mimeType)) {
      return NextResponse.json({ error: 'Project image not found' }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': mimeType,
        // The Drive file id in the URL identifies this exact image; a replacement gets a new id.
        'Cache-Control': 'private, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error(`Error serving image for project ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to load project image' }, { status: 500 });
  }
}

/** Replaces the project image: uploads it to the Drive "Images" folder as the project's current image. */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) return unauthorized(auth.status);

  try {
    const project = await adminDb.projects.findById(params.id);
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const file = (await req.formData()).get('file');
    if (!(file instanceof File)) return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    if (!PROJECT_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Image must be PNG, JPEG, WebP, GIF, or AVIF' }, { status: 400 });
    }
    if (file.size > PROJECT_IMAGE_MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be 5 MB or smaller' }, { status: 400 });
    }

    const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
    await saveProjectImage(project.id, Buffer.from(await file.arrayBuffer()), file.type, `project-${project.id}-${Date.now()}.${ext}`);

    // Return the record as re-read from the source, so the UI shows exactly what a reload will.
    return NextResponse.json({ data: await adminDb.projects.findById(project.id) });
  } catch (err: any) {
    console.error(`Error replacing image for project ${params.id}:`, err);
    if (/storage quota/i.test(err?.message || '')) {
      return NextResponse.json(
        { error: 'Google Drive is not accepting uploads from COMMAND: the upload folder is in a personal Drive, where service accounts cannot store files. Move it to a Shared Drive to enable image uploads.' },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: 'Failed to save project image' }, { status: 500 });
  }
}

/** Removes the project's current image (the previous one is kept in Drive, not deleted). */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await verifyAdminRequest(req);
  if (!auth.valid) return unauthorized(auth.status);

  try {
    const updated = await adminDb.projects.removeImage(params.id);
    if (!updated) return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error(`Error removing image for project ${params.id}:`, err);
    return NextResponse.json({ error: 'Failed to remove project image' }, { status: 500 });
  }
}
