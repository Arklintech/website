import os

html_code = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>ARKLINTECH Particle Robot</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    html {
      background-color: #000000;
      scroll-behavior: auto;
      overscroll-behavior-y: none;
    }

    body {
      background-color: #000000;
      overflow-x: hidden;
      user-select: none;
      -webkit-overflow-scrolling: touch;
      cursor: default;
    }

    /* Continuous Scroll Track */
    .scroll-track {
      position: relative;
      width: 100%;
      height: 350vh;
      background: #000000;
    }

    /* Pinned / Sticky Fullscreen Viewport */
    .sticky-viewport {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      height: 100svh;
      overflow: hidden;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      contain: strict;
    }

    /* Pure 2D Canvas (Zero UI, Zero Mouse Effect) */
    #robotCanvas {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
      cursor: default;
      pointer-events: none;
    }
  </style>
</head>
<body>

  <!-- Continuous Scroll Track -->
  <div class="scroll-track" id="scrollTrack">
    <!-- Pinned Fullscreen Stage -->
    <div class="sticky-viewport">
      <canvas id="robotCanvas"></canvas>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('robotCanvas');
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    const scrollTrack = document.getElementById('scrollTrack');

    let dissolve = 0.0;
    let targetDissolve = 0.0;
    let particleCount = 0;
    let p_nx, p_ny, p_dispX, p_dispY, p_cohesion, p_seed, p_size;
    let p_r, p_g, p_b;

    let imgData = null;
    let buf32 = null;

    let width = 0;
    let height = 0;
    let last = performance.now();
    let imgReady = false;

    function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
    function hash(n) {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    }

    // Passive Scroll Progress Listener
    function onScroll() {
      const top = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const total = scrollTrack.offsetHeight - window.innerHeight;
      if (total > 0) {
        targetDissolve = clamp(top / total, 0, 1);
      } else {
        targetDissolve = 0;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Load Image and Build Exact 454,137 Particle Matrix
    function initParticleModel() {
      const img = new Image();
      img.src = 'assets/arklintech-robot-particle-source.png';

      img.onload = () => {
        const srcW = img.naturalWidth || 1448;
        const srcH = img.naturalHeight || 900;

        const off = document.createElement('canvas');
        off.width = srcW;
        off.height = srcH;
        const octx = off.getContext('2d', { willReadFrequently: true });
        octx.drawImage(img, 0, 0, srcW, srcH);
        const data = octx.getImageData(0, 0, srcW, srcH).data;

        const rawList = [];

        // Exact full sampling (captures all 454,137 nodes)
        for (let y = 0; y < srcH; y++) {
          for (let x = 0; x < srcW; x++) {
            const i = (y * srcW + x) * 4;
            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
            if (a < 30) continue;

            const maxC = Math.max(r, Math.max(g, b));
            if (maxC < 12) continue;

            const lum = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255.0;
            const isBlue = (b > r * 1.15 && b > 60);

            const nx = x / srcW;
            const ny = y / srcH;

            let cohesion = 0.35;
            const dEyeL = Math.hypot(nx - 0.39, ny - 0.44);
            const dEyeR = Math.hypot(nx - 0.61, ny - 0.44);
            const dCrest = Math.hypot(nx - 0.50, ny - 0.22);
            const dMouth = Math.hypot(nx - 0.50, ny - 0.65);
            const seed = hash(x * 17.17 + y * 41.41);

            if (dEyeL < 0.09 || dEyeR < 0.09) {
              cohesion = 0.88 + seed * 0.08;
            } else if (dCrest < 0.09) {
              cohesion = 0.84 + seed * 0.08;
            } else if (dMouth < 0.09) {
              cohesion = 0.76 + seed * 0.08;
            } else if (Math.hypot(nx - 0.5, ny - 0.46) < 0.28) {
              cohesion = 0.60 + seed * 0.15;
            } else if (ny > 0.82 || nx < 0.22 || nx > 0.78) {
              cohesion = 0.15 + seed * 0.15;
            } else {
              cohesion = 0.38 + seed * 0.20;
            }

            const angle = Math.atan2(ny - 0.46, nx - 0.50) + (seed - 0.5) * 1.4;
            const dispRadius = 0.45 + seed * 0.65;
            const dispX = Math.cos(angle) * dispRadius;
            const dispY = Math.sin(angle) * dispRadius * 0.85;
            const size = (lum > 0.45 || isBlue) ? 2 : 1;

            rawList.push({
              nx, ny, dispX, dispY, cohesion, seed, size, r, g, b
            });
          }
        }

        particleCount = rawList.length;
        p_nx = new Float32Array(particleCount);
        p_ny = new Float32Array(particleCount);
        p_dispX = new Float32Array(particleCount);
        p_dispY = new Float32Array(particleCount);
        p_cohesion = new Float32Array(particleCount);
        p_seed = new Float32Array(particleCount);
        p_size = new Uint8Array(particleCount);
        p_r = new Uint8Array(particleCount);
        p_g = new Uint8Array(particleCount);
        p_b = new Uint8Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
          const pt = rawList[i];
          p_nx[i] = pt.nx;
          p_ny[i] = pt.ny;
          p_dispX[i] = pt.dispX;
          p_dispY[i] = pt.dispY;
          p_cohesion[i] = pt.cohesion;
          p_seed[i] = pt.seed;
          p_size[i] = pt.size;
          p_r[i] = pt.r;
          p_g[i] = pt.g;
          p_b[i] = pt.b;
        }

        imgReady = true;
        resize();
        requestAnimationFrame(render);
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width;
      canvas.height = height;

      imgData = ctx.createImageData(width, height);
      buf32 = new Uint32Array(imgData.data.buffer);
    }

    // Direct-Pixel Render Loop (Exact 1:1 Image Coordinates, Pure Scroll Driven)
    function render(t) {
      last = t;
      const time = t * 0.001;

      // Smooth scroll interpolation
      dissolve += (targetDissolve - dissolve) * 0.15;

      if (!imgReady || particleCount === 0 || !buf32) {
        requestAnimationFrame(render);
        return;
      }

      // Fast Black Clear
      buf32.fill(0xFF000000);

      const imgAspect = 1448 / 900;
      const canvasAspect = width / height;
      let renderW, renderH, ox, oy;

      if (canvasAspect > imgAspect) {
        renderH = height * 0.92;
        renderW = renderH * imgAspect;
        ox = (width - renderW) * 0.5;
        oy = (height - renderH) * 0.5;
      } else {
        renderW = width * 0.94;
        renderH = renderW / imgAspect;
        ox = (width - renderW) * 0.5;
        oy = (height - renderH) * 0.5;
      }

      const pGlobal = dissolve;
      const speed = 1.0;

      const sinT1 = Math.sin(time * 1.37 * speed);
      const cosT1 = Math.cos(time * 1.11 * speed);
      const sinT2 = Math.sin(time * 0.80 * speed);
      const cosT2 = Math.cos(time * 0.70 * speed);

      const minDimension = Math.min(width, height);
      const wInt = width;
      const hInt = height;

      for (let i = 0; i < particleCount; i++) {
        const s = p_seed[i];
        const c = p_cohesion[i];

        // 1. EXACT 1:1 Image Pixel Mapping
        const baseX = ox + p_nx[i] * renderW;
        const baseY = oy + p_ny[i] * renderH;

        // 2. Dissolution Progress
        const startP = c * 0.42;
        let easeLocal = 0;
        if (pGlobal > startP) {
          const endP = 0.60 + c * 0.40;
          const pLocal = Math.min(1.0, (pGlobal - startP) / (endP - startP));
          easeLocal = pLocal * pLocal * (3.0 - 2.0 * pLocal);
        }

        // 3. Micro-breathing oscillation
        const breatheAmp = (0.6 + 1.2 * (1.0 - c)) * (1.0 - easeLocal * 0.4);
        const breatheX = sinT1 * breatheAmp;
        const breatheY = cosT1 * (breatheAmp * 0.8);

        // 4. Volumetric turbulence & outward dispersion
        const turbSpeed = 1.0 + s * 0.5;
        const turbX = sinT2 * (38.0 * easeLocal * turbSpeed);
        const turbY = cosT2 * (32.0 * easeLocal * turbSpeed);

        const dispDist = minDimension * easeLocal;
        const targetDispX = p_dispX[i] * dispDist + turbX;
        const targetDispY = p_dispY[i] * dispDist + turbY;

        const curX = (baseX + targetDispX + breatheX + 0.5) | 0;
        const curY = (baseY + targetDispY + breatheY + 0.5) | 0;

        if (curX < 0 || curX >= wInt || curY < 0 || curY >= hInt) continue;

        // Direct ABGR Uint32 color packing
        const fade = Math.max(0.1, 1.0 - easeLocal * 0.85);
        const rVal = (p_r[i] * fade) | 0;
        const gVal = (p_g[i] * fade) | 0;
        const bVal = (p_b[i] * fade) | 0;
        const col32 = 0xFF000000 | (bVal << 16) | (gVal << 8) | rVal;

        const idx = curY * wInt + curX;
        buf32[idx] = col32;

        if (p_size[i] > 1 && curX + 1 < wInt && curY + 1 < hInt) {
          buf32[idx + 1] = col32;
          buf32[idx + wInt] = col32;
          buf32[idx + wInt + 1] = col32;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('DOMContentLoaded', () => {
      initParticleModel();
      onScroll();
    });
  </script>
</body>
</html>
"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_code)

if os.path.exists('arklintech-particle-robot'):
    with open('arklintech-particle-robot/index.html', 'w', encoding='utf-8') as f:
        f.write(html_code)

print("Successfully kept ONLY the pure robot!")
