// Project images live in the Google Drive "Images" folder. Each upload is tagged with Drive
// appProperties linking it to its project, so the Projects sheet needs no image column:
//
//   arkRole = 'project-image'          the project's current image (newest one wins)
//   arkRole = 'project-image-retired'  replaced or removed; kept in Drive, never deleted
//   arkProjectId = <project id>
//
// appProperties are private to this app's service account, so only files uploaded through
// COMMAND can match.

import { getDriveClient } from './google';
import { uploadFileToDrive } from './google-drive';

const ACTIVE = 'project-image';
const RETIRED = 'project-image-retired';

const activeQuery = (projectId?: string) =>
  [
    `appProperties has { key='arkRole' and value='${ACTIVE}' }`,
    projectId ? `appProperties has { key='arkProjectId' and value='${projectId.replace(/'/g, "\\'")}' }` : '',
    'trashed = false',
  ].filter(Boolean).join(' and ');

async function listActive(projectId?: string): Promise<{ id: string; projectId: string }[]> {
  const drive = await getDriveClient();
  const files: { id: string; projectId: string }[] = [];
  let pageToken: string | undefined;
  do {
    const res = await drive.files.list({
      q: activeQuery(projectId),
      fields: 'nextPageToken, files(id, appProperties)',
      orderBy: 'createdTime desc',
      pageSize: 1000,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    for (const f of res.data.files || []) {
      if (f.id && f.appProperties?.arkProjectId) files.push({ id: f.id, projectId: f.appProperties.arkProjectId });
    }
    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);
  return files;
}

async function retire(fileIds: string[]): Promise<void> {
  const drive = await getDriveClient();
  await Promise.all(
    fileIds.map((fileId) =>
      drive.files.update({ fileId, requestBody: { appProperties: { arkRole: RETIRED } }, supportsAllDrives: true }),
    ),
  );
}

/** Current Drive image file id per project id (newest active image wins). */
export async function getActiveProjectImages(): Promise<Map<string, string>> {
  const images = new Map<string, string>();
  for (const f of await listActive()) {
    if (!images.has(f.projectId)) images.set(f.projectId, f.id); // list is newest-first
  }
  return images;
}

/** Uploads a new image as the project's current image and retires the previous one(s). */
export async function saveProjectImage(projectId: string, data: Buffer, mimeType: string, filename: string): Promise<string> {
  const previous = await listActive(projectId);
  const uploaded = await uploadFileToDrive(data, filename, mimeType, 'Images', { arkRole: ACTIVE, arkProjectId: projectId });
  await retire(previous.map((f) => f.id));
  return uploaded.file_id;
}

/** Retires the project's uploaded image(s). Returns how many were retired. */
export async function retireProjectImages(projectId: string): Promise<number> {
  const active = await listActive(projectId);
  await retire(active.map((f) => f.id));
  return active.length;
}
