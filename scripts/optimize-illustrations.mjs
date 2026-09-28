// Converts the raster-in-SVG illustrations (a PNG base64-embedded in an SVG wrapper,
// 1–4 MB each) into WebP. Browsers decode those SVGs on the main thread, which froze
// clicks and scrolling on the pages that use them. Each SVG is rendered as a whole, so
// composited overlays (e.g. client logos) are preserved.
//
// Usage: node scripts/optimize-illustrations.mjs [--remove-svg]

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIRS = ['public/what we do images', 'public/How we help images', 'public/Industry images', 'public/Layers'];
const MIN_BYTES = 300 * 1024; // smaller SVGs are real vector art — leave them alone
const MAX_WIDTH = 1600;       // illustrations render at most ~800 CSS px wide; covers 2x screens
const removeSvg = process.argv.includes('--remove-svg');

function* svgFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* svgFiles(full);
    else if (entry.name.endsWith('.svg')) yield full;
  }
}

let before = 0, after = 0, count = 0;
for (const dir of DIRS) {
  for (const file of svgFiles(path.resolve(dir))) {
    const { size } = fs.statSync(file);
    if (size < MIN_BYTES) continue;

    const out = file.replace(/\.svg$/, '.webp');
    await sharp(file, { density: 72, limitInputPixels: false })
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);

    const outSize = fs.statSync(out).size;
    before += size; after += outSize; count++;
    console.log(`${path.relative(process.cwd(), file)}: ${(size / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`);
    if (removeSvg) fs.unlinkSync(file);
  }
}
console.log(`\n${count} illustrations: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
