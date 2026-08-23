import fs from 'fs';
import path from 'path';

const sourceDir = path.resolve('background images');
const targetDir = path.resolve('public/visuals/zaqvoro');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const mapping = {
  'hero_zcore': 'hero-zcore.png',
  'ai_intelligence': 'ai-intelligence.png',
  'software_engineering': 'software-engineering.png',
  'automation_core': 'automation-core.png',
  'platform_cube': 'platform-cube.png',
  'connected_network': 'connected-network.png',
  'workflow_process': 'workflow-process.png',
  'data_analytics': 'data-analytics.png',
  'infrastructure': 'infrastructure.png',
  'security_system': 'security-system.png',
  'future_vision': 'future-vision.png',
  'innovation_lab': 'innovation-lab.png',
  'business_systems': 'business-systems.png',
  'human_technology': 'human-technology.png',
  'final_convergence': 'final-convergence.png',
};

const files = fs.readdirSync(sourceDir);
console.log('Files found in source directory:', files);

for (const file of files) {
  const cleanName = file.toLowerCase().replace(/[`\s]/g, '');
  for (const [key, targetFileName] of Object.entries(mapping)) {
    if (cleanName.includes(key)) {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(targetDir, targetFileName);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${file} -> ${targetFileName}`);
    }
  }
}

console.log('All approved ZAQVORO assets setup complete.');
