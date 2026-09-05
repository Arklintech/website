import { getDriveClient, DRIVE_FOLDER_ID } from './google';
import { Readable } from 'stream';

export interface DriveFileMetadata {
  file_id: string;
  name: string;
  mime_type: string;
  drive_url: string;
  subfolder: string;
  size_bytes?: number;
  created_at: string;
}

export const SUBFOLDER_MAP: Record<string, string> = {
  Assets: '17Wi7qj3swzCUUOFES5ZlUU_7HbSnCk7t',
  Images: '1u1rKUR2JNv48_g6Fyv4X01YXbjScRwwr',
  Attachments: '1XbUxQZyrneelcOWuhLwsj1ckshHk1OVU',
  Documents: '1cXMdsjgtdp1Iitfs4mHJ6RymxqgWeVcl',
  Avatars: '1KJkQEEIw8KzlPBB4pY38bGGsoygmceWh',
};

export async function uploadFileToDrive(
  buffer: Buffer,
  filename: string,
  mimeType: string,
  subfolder: 'Assets' | 'Images' | 'Attachments' | 'Documents' | 'Avatars' = 'Documents'
): Promise<DriveFileMetadata> {
  const drive = await getDriveClient();
  let parentFolderId = SUBFOLDER_MAP[subfolder] || DRIVE_FOLDER_ID;

  let response;
  try {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    response = await drive.files.create({
      requestBody: {
        name: filename,
        parents: [parentFolderId],
      },
      media: {
        mimeType,
        body: stream,
      },
      fields: 'id, name, mimeType, webViewLink, size, createdTime',
      supportsAllDrives: true,
      supportsTeamDrives: true,
    });
  } catch (firstErr: any) {
    if (parentFolderId !== DRIVE_FOLDER_ID) {
      try {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        response = await drive.files.create({
          requestBody: {
            name: filename,
            parents: [DRIVE_FOLDER_ID],
          },
          media: {
            mimeType,
            body: stream,
          },
          fields: 'id, name, mimeType, webViewLink, size, createdTime',
          supportsAllDrives: true,
          supportsTeamDrives: true,
        });
      } catch (secondErr: any) {
        throw secondErr;
      }
    } else {
      throw firstErr;
    }
  }

  const file = response.data;
  return {
    file_id: file.id || '',
    name: file.name || filename,
    mime_type: file.mimeType || mimeType,
    drive_url: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
    subfolder,
    size_bytes: file.size ? parseInt(file.size, 10) : buffer.length,
    created_at: file.createdTime || new Date().toISOString(),
  };
}

export async function getDriveFileMetadata(fileId: string): Promise<Partial<DriveFileMetadata> | null> {
  try {
    const drive = await getDriveClient();
    const res = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink, size, createdTime',
      supportsAllDrives: true,
      supportsTeamDrives: true,
    });
    const file = res.data;
    return {
      file_id: file.id || fileId,
      name: file.name || '',
      mime_type: file.mimeType || '',
      drive_url: file.webViewLink || '',
      size_bytes: file.size ? parseInt(file.size, 10) : undefined,
      created_at: file.createdTime || '',
    };
  } catch (err) {
    console.error(`Error fetching metadata for Drive file ${fileId}:`, err);
    return null;
  }
}
