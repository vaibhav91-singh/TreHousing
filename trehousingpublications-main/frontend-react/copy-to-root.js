import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const rootDir = path.resolve(__dirname, '../..');

console.log('Copying build files from dist to project root...');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist! Please run vite build first.');
  process.exit(1);
}

// Files to copy directly to root
const rootFiles = ['index.html', 'favicon.svg', 'icons.svg', 'robots.txt', 'sitemap.xml', '.htaccess', 'trelogo.jpg'];

rootFiles.forEach(file => {
  const srcPath = path.join(distDir, file);
  const destPath = path.join(rootDir, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`[Synced] ${file} -> Root`);
  }
});

// Sync assets folder
const distAssetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

if (!fs.existsSync(rootAssetsDir)) {
  fs.mkdirSync(rootAssetsDir, { recursive: true });
}

// Clean up old index-*.js and index-*.css files from root assets directory
const newAssetFiles = fs.readdirSync(distAssetsDir);
const oldAssetFiles = fs.readdirSync(rootAssetsDir);

oldAssetFiles.forEach(file => {
  if (/^index-.*\.(js|css)$/.test(file) && !newAssetFiles.includes(file)) {
    fs.unlinkSync(path.join(rootAssetsDir, file));
    console.log(`[Cleaned] Removed obsolete asset: ${file}`);
  }
});

// Copy new assets from dist to root assets
newAssetFiles.forEach(file => {
  const srcAsset = path.join(distAssetsDir, file);
  const destAsset = path.join(rootAssetsDir, file);
  fs.copyFileSync(srcAsset, destAsset);
  console.log(`[Synced] asset ${file} -> root/assets/`);
});

console.log('✅ Production build successfully synced to workspace root!');
