import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brandDir = path.resolve('public/brand');
if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
}

// Master Vector SVG with Keystone Mark + \u039BRKLINTECH + Tapered Blue Wings + TECHNOLOGY SYSTEMS
const masterSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="1200" height="400">
  <defs>
    <linearGradient id="keystoneBlue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0060FC"/>
      <stop offset="100%" stop-color="#005EF6"/>
    </linearGradient>
    <linearGradient id="wingGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0060FC" stop-opacity="0.1"/>
      <stop offset="60%" stop-color="#0060FC" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0099FF" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="wingGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0060FC" stop-opacity="0.1"/>
      <stop offset="60%" stop-color="#0060FC" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0099FF" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- Keystone Icon -->
  <g transform="translate(60, 45) scale(0.85)">
    <path
      fill="url(#keystoneBlue)"
      d="
        M 402 27
        Q 394 27 388 37
        L 280 366
        L 440 366
        L 457 170
        L 411 133
        L 510 134
        L 510 294
        L 554 366
        L 682 366
        L 581 39
        Q 578 27 570 27
        Z
      "
    />
  </g>

  <!-- Wordmark: ΛRKLINTECH -->
  <text
    x="450"
    y="190"
    fill="#FFFFFF"
    font-family="'Syncopate', 'Orbitron', 'Space Grotesk', 'Inter', sans-serif"
    font-size="100"
    font-weight="900"
    letter-spacing="18"
  >&#923;RKLINTECH</text>

  <!-- Flanking Left Blue Tapered Wing -->
  <polygon points="450,265 600,260 600,270" fill="url(#wingGradLeft)" />

  <!-- Subtitle: TECHNOLOGY SYSTEMS -->
  <text
    x="620"
    y="272"
    fill="#FFFFFF"
    font-family="'Inter', 'Space Grotesk', sans-serif"
    font-size="28"
    font-weight="600"
    letter-spacing="12"
  >TECHNOLOGY SYSTEMS</text>

  <!-- Flanking Right Blue Tapered Wing -->
  <polygon points="1130,265 980,260 980,270" fill="url(#wingGradRight)" />
</svg>`;

// Write master SVG
fs.writeFileSync(path.join(brandDir, 'logo.svg'), masterSvg);

// Standalone icon SVG
const iconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="270 20 430 365" width="430" height="365">
  <defs>
    <linearGradient id="keystoneBlue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0060FC"/>
      <stop offset="100%" stop-color="#005EF6"/>
    </linearGradient>
  </defs>
  <path
    fill="url(#keystoneBlue)"
    d="
      M 402 27
      Q 394 27 388 37
      L 280 366
      L 440 366
      L 457 170
      L 411 133
      L 510 134
      L 510 294
      L 554 366
      L 682 366
      L 581 39
      Q 578 27 570 27
      Z
    "
  />
</svg>`;

fs.writeFileSync(path.join(brandDir, 'icon.svg'), iconSvg);

async function renderAssets() {
  const iconBuffer = Buffer.from(iconSvg);
  const logoBuffer = Buffer.from(masterSvg);

  // Favicons / App Icons
  await sharp(iconBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 3, g: 7, b: 18, alpha: 1 } })
    .png()
    .toFile(path.resolve('public/icon.png'));

  await sharp(iconBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 3, g: 7, b: 18, alpha: 1 } })
    .png()
    .toFile(path.resolve('public/apple-icon.png'));

  await sharp(iconBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 3, g: 7, b: 18, alpha: 0 } })
    .webp()
    .toFile(path.join(brandDir, 'logo.webp'));

  await sharp(logoBuffer)
    .resize(1200, 400)
    .png()
    .toFile(path.join(brandDir, 'logo.png'));

  console.log('Brand assets generated successfully!');
}

renderAssets().catch(console.error);
