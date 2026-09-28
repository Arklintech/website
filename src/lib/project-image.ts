// Project image references (ProjectRecord.thumbnailUrl, resolved server-side):
//
//   drive:<fileId>   an image uploaded through COMMAND into the Google Drive "Images" folder
//                    (see project-image-store.ts)
//   /path/file.png   a static site asset (used by seed data)
//
// Every screen resolves a project's image through projectImageSrc(), so the list, the detail
// header, and any other view always show the same persisted image.

const DRIVE_REF = /^drive:([A-Za-z0-9_-]{10,200})$/;
const SITE_PATH = /^\/(?!\/)[A-Za-z0-9/_.%-]+\.(png|jpe?g|webp|avif|gif)$/i;

export const PROJECT_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif'];
export const PROJECT_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export function driveFileIdFromRef(ref: string | null | undefined): string | null {
  const match = ref ? DRIVE_REF.exec(ref) : null;
  return match ? match[1] : null;
}

/**
 * Display URL for a project's persisted image, or null when it has none.
 * Drive images are served by an authenticated admin route; the Drive file id in the URL is the
 * image's identity, so the browser cache refreshes exactly when the stored image changes.
 */
export function projectImageSrc(project: { id: string; thumbnailUrl?: string | null }): { src: string; authenticated: boolean } | null {
  const ref = project.thumbnailUrl?.trim();
  if (!ref) return null;
  const fileId = driveFileIdFromRef(ref);
  if (fileId) {
    return { src: `/api/admin/projects/${encodeURIComponent(project.id)}/image?ref=${fileId}`, authenticated: true };
  }
  return SITE_PATH.test(ref) ? { src: ref, authenticated: false } : null;
}
