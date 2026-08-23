import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\NEXAWAVE\\.gemini\\antigravity-ide\\brain\\7cd4b88e-a483-4d82-af33-5cb37b24571a';
const targetDir = path.resolve('public/visuals/work');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(artifactsDir);
for (const file of files) {
  if (file.startsWith('work_daarayn_ecommerce') && file.endsWith('.jpg')) {
    fs.copyFileSync(path.join(artifactsDir, file), path.join(targetDir, 'daarayn.jpg'));
    console.log('Copied daarayn.jpg');
  }
  if (file.startsWith('work_neominds_enrollment') && file.endsWith('.jpg')) {
    fs.copyFileSync(path.join(artifactsDir, file), path.join(targetDir, 'neominds.jpg'));
    console.log('Copied neominds.jpg');
  }
  if (file.startsWith('work_parivar_restaurant') && file.endsWith('.jpg')) {
    fs.copyFileSync(path.join(artifactsDir, file), path.join(targetDir, 'parivar.jpg'));
    console.log('Copied parivar.jpg');
  }
}
