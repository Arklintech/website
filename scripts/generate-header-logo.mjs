import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brandDir = path.resolve('public/brand');

// Perfectly balanced vector lockup:
// - Left: Keystone Icon (x: 20 to 280)
// - Right: Wordmark (x: 320 to 1200)
//   - Row 1: Chevron \u039B + RKLINTECH in Deep Navy (#0B132B)
//   - Row 2: Left Wing (320..460) + TECHNOLOGY SYSTEMS (480..1040) + Right Wing (1060..1200)
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1260 260" width="1260" height="260">
  <defs>
    <linearGradient id="keystoneGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1463FF"/>
      <stop offset="100%" stop-color="#0052E0"/>
    </linearGradient>
    <linearGradient id="wingGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1463FF" stop-opacity="0.05"/>
      <stop offset="60%" stop-color="#1463FF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#2B75FF" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="wingGradRight" x1="100%" y1="0%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1463FF" stop-opacity="0.05"/>
      <stop offset="60%" stop-color="#1463FF" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#2B75FF" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- 1. Keystone Icon Mark (Electric Blue) -->
  <g transform="translate(20, 15) scale(0.27)">
    <path
      fill="url(#keystoneGrad)"
      d="M 309 17 C 298 17 288 23 281 37 L 25 822 L 404 821 L 444 357 L 336 268 L 572 271 L 572 652 L 676 822 L 979 822 L 741 39 C 735 25 726 17 714 17 Z"
    />
  </g>

  <!-- 2. Chevron 'Λ' Glyph in Deep Navy #0B132B -->
  <g transform="translate(325, 42) scale(0.92)">
    <path
      d="M 67.5 4 L 130 106 L 91 106 L 67.5 58 L 44 106 L 5 106 Z"
      fill="#0B132B"
    />
  </g>

  <!-- 3. 'RKLINTECH' Wordmark in Deep Navy #0B132B -->
  <text
    x="455"
    y="136"
    fill="#0B132B"
    font-family="'Syncopate', 'Space Grotesk', 'Orbitron', 'Inter', sans-serif"
    font-size="102"
    font-weight="900"
    letter-spacing="14"
  >RKLINTECH</text>

  <!-- 4. Flanking Left Blue Wing -->
  <polygon points="325,202 470,198 470,206" fill="url(#wingGradLeft)" />

  <!-- 5. Subtitle: TECHNOLOGY SYSTEMS in #536070 (Centered under wordmark) -->
  <text
    x="490"
    y="210"
    fill="#536070"
    font-family="'Inter', 'Space Grotesk', monospace"
    font-size="31"
    font-weight="700"
    letter-spacing="11"
  >TECHNOLOGY SYSTEMS</text>

  <!-- 6. Flanking Right Blue Wing -->
  <polygon points="1200,202 1055,198 1055,206" fill="url(#wingGradRight)" />
</svg>`;

async function run() {
  const svgBuffer = Buffer.from(svg);
  await sharp(svgBuffer)
    .png()
    .toFile(path.join(brandDir, 'arklintech-invoice-header.png'));
  console.log('Successfully created balanced arklintech-invoice-header.png!');
}

run();
