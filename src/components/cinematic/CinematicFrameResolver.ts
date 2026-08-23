/**
 * ZAQVORO CINEMATIC ENGINE — Frame Resolver
 *
 * Source:  8K master (7680×4320) → Lanczos downsample → 2560×1440 WebP
 * Frames:  240 (24 FPS × 10 seconds)
 * Format:  frame_0001.webp … frame_0240.webp (1-indexed from FFmpeg)
 */

export const TOTAL_CINEMATIC_FRAMES = 240;

/**
 * Resolves progress [0, 1] to a deterministic frame index [0, 239].
 * Always produces the same index for the same progress.
 */
export function resolveFrameIndex(
  progress: number,
  totalFrames: number = TOTAL_CINEMATIC_FRAMES
): number {
  if (progress <= 0) return 0;
  if (progress >= 1) return totalFrames - 1;
  return Math.min(totalFrames - 1, Math.max(0, Math.round(progress * (totalFrames - 1))));
}

/**
 * Converts a 0-indexed frame index to its public path.
 * FFmpeg writes frame_0001.webp ... frame_0240.webp (1-indexed),
 * so we add 1 when building the path.
 */
export function resolveFramePath(frameIndex: number): string {
  const clamped = Math.max(0, Math.min(TOTAL_CINEMATIC_FRAMES - 1, frameIndex));
  const padded = String(clamped + 1).padStart(4, '0');
  return `/cinematic/frames/frame_${padded}.webp`;
}
