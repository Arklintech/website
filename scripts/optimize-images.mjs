import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await optimizeDirectory(fullPath);
    } else if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const webpPath = path.join(dirPath, `${baseName}.webp`);

      const image = sharp(fullPath);
      const metadata = await image.metadata();

      // Optimize: resize max dimension if gigantic, and output high quality WebP
      let transformer = sharp(fullPath);
      if (metadata.width && metadata.width > 1600) {
        transformer = transformer.resize({ width: 1600, withoutEnlargement: true });
      }

      await transformer
        .webp({ quality: 84, effort: 5 })
        .toFile(webpPath);

      const oldSize = (stat.size / (1024 * 1024)).toFixed(2);
      const newSize = (fs.statSync(webpPath).size / (1024 * 1024)).toFixed(2);
      console.log(`Optimized ${file}: ${oldSize}MB -> ${newSize}MB (.webp)`);
    }
  }
}

async function run() {
  console.log('Starting visual assets optimization...');
  await optimizeDirectory(path.resolve('public/visuals'));
  console.log('Asset optimization completed successfully!');
}

run().catch(console.error);
