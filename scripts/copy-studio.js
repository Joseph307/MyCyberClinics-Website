const fs = require('fs');
const path = require('path');

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function rewriteIndex(destIndexPath) {
  if (!fs.existsSync(destIndexPath)) return;
  let html = fs.readFileSync(destIndexPath, 'utf8');
  // Sanity's build currently emits absolute /static/... paths. When we host the studio under /studio,
  // those should point to /studio/static/... so we rewrite them here.
  html = html.replace(/"\/static\//g, '"/studio/static/');
  html = html.replace(/'\/static\//g, "'/studio/static/");

  // Also rewrite any occurrences of="/manifest.webmanifest or similar absolute root assets
  html = html.replace(/"\/manifest.webmanifest"/g, '"/studio/manifest.webmanifest"');
  html = html.replace(/'\/manifest.webmanifest'/g, "'/studio/manifest.webmanifest'");

  fs.writeFileSync(destIndexPath, html, 'utf8');
}

function main() {
  const repoRoot = path.resolve(__dirname, '..');
  const distDir = path.join(repoRoot, 'dist');
  const outStudioDir = path.join(repoRoot, 'out', 'studio');

  if (!fs.existsSync(distDir)) {
    console.error('No Sanity build found at ./dist — run `npx sanity build` first');
    process.exit(1);
  }

  // Remove existing out/studio if present
  if (fs.existsSync(outStudioDir)) {
    fs.rmSync(outStudioDir, { recursive: true, force: true });
  }

  copyDirSync(distDir, outStudioDir);

  // Rewrite index.html so asset paths are correct when hosted under /studio
  const indexPath = path.join(outStudioDir, 'index.html');
  rewriteIndex(indexPath);

  console.log('Copied Sanity dist -> out/studio and fixed asset paths.');
}

main();
