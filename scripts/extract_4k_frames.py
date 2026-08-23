import os
import cv2
import time
from concurrent.futures import ThreadPoolExecutor

src_video = 'public/cinematic/master/zaqvoro-cinematic-4k.mp4'
if not os.path.exists(src_video):
    src_video = 'high resolution video.mp4'

out_dir = 'public/frames'
os.makedirs(out_dir, exist_ok=True)

cap = cv2.VideoCapture(src_video)
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
print(f"Reading {total} frames from {src_video} (Resolution: {w}x{h})...", flush=True)

frames = []
idx = 0
while True:
    ret, frame = cap.read()
    if not ret or idx >= 240:
        break
    frames.append((idx, frame))
    idx += 1
cap.release()

print(f"Loaded {len(frames)} frames into RAM. Encoding to native 4K WebP in parallel...", flush=True)

def save_frame(item):
    f_idx, f_data = item
    out_path = os.path.join(out_dir, f"frame_{f_idx:04d}.webp")
    # Save at uncompressed 4K (3840x2160) at quality 94
    cv2.imwrite(out_path, f_data, [cv2.IMWRITE_WEBP_QUALITY, 94])
    return f_idx

t0 = time.time()
with ThreadPoolExecutor(max_workers=8) as executor:
    results = list(executor.map(save_frame, frames))

elapsed = time.time() - t0
print(f"Successfully saved {len(results)} native 4K WebP frames in {elapsed:.2f}s!", flush=True)

f0 = os.path.join(out_dir, "frame_0000.webp")
img0 = cv2.imread(f0)
print(f"Frame 0000 shape: {img0.shape[1]}x{img0.shape[0]}, file size: {os.path.getsize(f0)/1024:.1f} KB", flush=True)
