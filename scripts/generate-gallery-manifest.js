import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workDir = path.resolve(__dirname, '../public/work');
const outputFile = path.resolve(__dirname, '../src/data/galleryManifest.json');

const manifest = {};

if (fs.existsSync(workDir)) {
  const projects = fs.readdirSync(workDir, { withFileTypes: true });

  for (const project of projects) {
    if (project.isDirectory()) {
      const galleryDir = path.join(workDir, project.name, 'gallery');
      if (fs.existsSync(galleryDir)) {
        const files = fs.readdirSync(galleryDir, { withFileTypes: true });
        
        const images = files
          .filter((f) => f.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name))
          .map((f) => `/work/${project.name}/gallery/${f.name}`);
          
        if (images.length > 0) {
          manifest[project.name] = images;
        }
      }
    }
  }
}

// Add home-gallery support
const homeGalleryDir = path.resolve(__dirname, '../public/home-gallery');
if (fs.existsSync(homeGalleryDir)) {
  const files = fs.readdirSync(homeGalleryDir, { withFileTypes: true });
  const images = files
    .filter((f) => f.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name))
    .map((f) => `/home-gallery/${f.name}`);
    
  if (images.length > 0) {
    manifest['home-gallery'] = images;
  }
}

fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2), 'utf-8');
console.log('✅ Gallery manifest generated.');
