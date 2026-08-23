import { resolveFramePath, TOTAL_CINEMATIC_FRAMES } from './CinematicFrameResolver';

interface FrameEntry {
  bitmap?: ImageBitmap;
  img?: HTMLImageElement;
  ready: boolean;
  decodeTimeMs?: number;
}

/**
 * ZAQVORO Cinematic Frame Loader
 *
 * Strategy:
 * - Stage 1 (Critical):  frames 0–29 decoded before first scroll
 * - Stage 2 (Reactive):  sliding window around current frame, direction-aware
 * - Stage 3 (Background): all remaining frames in rAF batches
 *
 * Storage: ImageBitmap (GPU-resident) for zero-decode-time drawImage.
 * Fallback: nearest decoded frame — never black, never flicker.
 */
export class CinematicFrameLoader {
  private frames: (FrameEntry | null)[] = [];
  private totalFrames: number;
  private loadingSet = new Set<number>();
  private isDestroyed = false;
  private loadedCount = 0;
  private onFrameLoadedCallback?: (loadedCount: number) => void;

  constructor(totalFrames: number = TOTAL_CINEMATIC_FRAMES) {
    this.totalFrames = totalFrames;
    this.frames = new Array(totalFrames).fill(null);
  }

  public setOnFrameLoaded(cb: (count: number) => void) {
    this.onFrameLoadedCallback = cb;
  }

  // ─── Public API ───────────────────────────────────────────────────────────

  /**
   * Stage 1: Load & fully decode critical opening frames.
   * Must resolve before scroll trigger is registered.
   */
  public async loadCriticalFrames(count: number = 30): Promise<void> {
    const limit = Math.min(count, this.totalFrames);
    const promises: Promise<void>[] = [];
    for (let i = 0; i < limit; i++) {
      promises.push(this.loadFrame(i));
    }
    await Promise.all(promises);
    if (!this.isDestroyed) {
      this.startBackgroundLoader(limit);
    }
  }

  /**
   * Stage 2: Direction-aware reactive window loader.
   * Call on every scroll update with current frame + direction.
   */
  public prioritizeWindow(
    centerIndex: number,
    direction: 'DOWN' | 'UP' | 'HOLD' = 'HOLD',
    radius: number = 30
  ) {
    if (this.isDestroyed) return;

    // Bias the window ahead in the scroll direction
    let start: number;
    let end: number;
    if (direction === 'DOWN') {
      start = Math.max(0, centerIndex - 5);
      end = Math.min(this.totalFrames - 1, centerIndex + radius);
    } else if (direction === 'UP') {
      start = Math.max(0, centerIndex - radius);
      end = Math.min(this.totalFrames - 1, centerIndex + 5);
    } else {
      start = Math.max(0, centerIndex - Math.floor(radius / 2));
      end = Math.min(this.totalFrames - 1, centerIndex + Math.floor(radius / 2));
    }

    for (let i = start; i <= end; i++) {
      if (!this.frames[i] && !this.loadingSet.has(i)) {
        this.loadFrame(i);
      }
    }
  }

  /**
   * Get a drawable frame: exact match first, then nearest decoded neighbor.
   * Returns null ONLY when absolutely nothing is ready.
   */
  public getFrame(index: number): ImageBitmap | HTMLImageElement | null {
    const clamped = Math.min(this.totalFrames - 1, Math.max(0, index));

    // Exact frame
    const exact = this.frames[clamped];
    if (exact?.ready) return exact.bitmap ?? exact.img ?? null;

    // Nearest neighbor (prefer backward — last rendered = visual continuity)
    for (let offset = 1; offset < 60; offset++) {
      const prev = clamped - offset;
      if (prev >= 0) {
        const pf = this.frames[prev];
        if (pf?.ready) return pf.bitmap ?? pf.img ?? null;
      }
      const next = clamped + offset;
      if (next < this.totalFrames) {
        const nf = this.frames[next];
        if (nf?.ready) return nf.bitmap ?? nf.img ?? null;
      }
    }

    // Absolute fallback
    const f0 = this.frames[0];
    if (f0?.ready) return f0.bitmap ?? f0.img ?? null;
    return null;
  }

  public isFrameReady(index: number): boolean {
    return this.frames[index]?.ready === true;
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }

  public destroy() {
    this.isDestroyed = true;
    this.frames = [];
    this.loadingSet.clear();
  }

  // ─── Internal ─────────────────────────────────────────────────────────────

  private loadFrame(index: number): Promise<void> {
    if (this.isDestroyed || index < 0 || index >= this.totalFrames) {
      return Promise.resolve();
    }
    if (this.frames[index]?.ready) return Promise.resolve();
    if (this.loadingSet.has(index)) {
      // Wait for the in-flight load to finish
      return new Promise<void>((resolve) => {
        const poll = setInterval(() => {
          if (this.frames[index]?.ready || this.isDestroyed) {
            clearInterval(poll);
            resolve();
          }
        }, 16);
      });
    }

    this.loadingSet.add(index);
    const t0 = performance.now();

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = resolveFramePath(index);

      const entry: FrameEntry = { ready: false };
      this.frames[index] = entry;

      const finalize = () => {
        if (this.isDestroyed) {
          this.loadingSet.delete(index);
          return resolve();
        }

        img.decode().then(() => {
          if (this.isDestroyed) { resolve(); return; }

          createImageBitmap(img, {
            premultiplyAlpha: 'none',
            colorSpaceConversion: 'none',
            resizeQuality: 'high',
          }).then((bitmap) => {
            if (this.isDestroyed) { bitmap.close(); resolve(); return; }
            entry.bitmap = bitmap;
            entry.img = img;
            entry.ready = true;
            entry.decodeTimeMs = performance.now() - t0;
            this.loadedCount++;
            this.loadingSet.delete(index);
            this.onFrameLoadedCallback?.(this.loadedCount);
            resolve();
          }).catch(() => {
            // Fallback: use raw img if ImageBitmap fails
            entry.img = img;
            entry.ready = img.complete && img.naturalWidth > 0;
            if (entry.ready) {
              this.loadedCount++;
              this.onFrameLoadedCallback?.(this.loadedCount);
            }
            this.loadingSet.delete(index);
            resolve();
          });
        }).catch(() => {
          // decode() failed — fallback to raw img
          entry.img = img;
          entry.ready = img.complete && img.naturalWidth > 0;
          if (entry.ready) {
            this.loadedCount++;
            this.onFrameLoadedCallback?.(this.loadedCount);
          }
          this.loadingSet.delete(index);
          resolve();
        });
      };

      if (img.complete && img.naturalWidth > 0) {
        finalize();
      } else {
        img.onload = finalize;
        img.onerror = () => {
          this.loadingSet.delete(index);
          // Single retry after 800ms
          setTimeout(() => {
            if (this.isDestroyed) return resolve();
            const retry = new Image();
            retry.src = resolveFramePath(index) + '?r=' + Date.now();
            retry.onload = () => {
              retry.decode().then(() => {
                createImageBitmap(retry, { premultiplyAlpha: 'none', colorSpaceConversion: 'none' })
                  .then((bitmap) => {
                    if (this.frames[index] && !this.isDestroyed) {
                      (this.frames[index] as FrameEntry).bitmap = bitmap;
                      (this.frames[index] as FrameEntry).img = retry;
                      (this.frames[index] as FrameEntry).ready = true;
                      this.loadedCount++;
                      this.onFrameLoadedCallback?.(this.loadedCount);
                    }
                    resolve();
                  })
                  .catch(() => resolve());
              }).catch(() => resolve());
            };
            retry.onerror = () => resolve();
          }, 800);
        };
      }
    });
  }

  private startBackgroundLoader(startFrom: number = 0) {
    if (this.isDestroyed) return;

    let index = startFrom;
    const chunkSize = 6; // conservative — doesn't starve main thread

    const nextChunk = () => {
      if (this.isDestroyed) return;

      // Skip already loaded
      while (index < this.totalFrames && this.frames[index]?.ready) index++;
      if (index >= this.totalFrames) return;

      const end = Math.min(this.totalFrames, index + chunkSize);
      const batch: Promise<void>[] = [];
      for (let i = index; i < end; i++) {
        if (!this.frames[i]?.ready && !this.loadingSet.has(i)) {
          batch.push(this.loadFrame(i));
        }
      }
      index = end;

      Promise.all(batch).then(() => {
        if (!this.isDestroyed && index < this.totalFrames) {
          if (typeof window !== 'undefined') {
            requestAnimationFrame(nextChunk);
          }
        }
      });
    };

    // Small delay so critical frames settle first
    setTimeout(() => {
      if (typeof window !== 'undefined') requestAnimationFrame(nextChunk);
    }, 200);
  }
}
