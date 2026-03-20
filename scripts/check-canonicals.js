const fs = require('fs');
const path = require('path');

function readFile(p) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch (e) {
    return null;
  }
}

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function extractCanonicalHref(text) {
  const regex = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i;
  const match = text.match(regex);
  if (!match) return null;
  const tag = match[0];
  // try to extract href="..." or href={"..."}
  const hrefRegex = /href=\s*(?:\{\s*)?["']([^"']+)["'](?:\s*\})?/i;
  const hrefMatch = tag.match(hrefRegex);
  if (hrefMatch) return hrefMatch[1];
  return 'dynamic';
}

function hasSeoHead(text) {
  return /SeoHead/.test(text) || /buildCanonical\(/.test(text);
}

function getCanonicalBaseFromContent() {
  const contentPath = path.join(__dirname, '..', 'src', 'sanity', 'lib', 'content.ts');
  const text = readFile(contentPath);
  if (!text) return 'https://mycyberclinics.com';
  const m = text.match(/canonicalBaseUrl:\s*["']([^"']+)["']/);
  return (m && m[1]) || 'https://mycyberclinics.com';
}

function analyzePages() {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  if (!fs.existsSync(pagesDir)) {
    console.error('No src/pages directory found');
    process.exit(1);
  }

  const files = walk(pagesDir).filter((f) => /\.(tsx|jsx|ts|js)$/.test(f));
  const base = getCanonicalBaseFromContent();

  const results = [];

  files.forEach((file) => {
    // skip API routes
    if (file.includes(path.join('src', 'pages', 'api'))) return;
    const rel = path.relative(path.join(__dirname, '..'), file);
    const text = readFile(file) || '';
    const canonical = extractCanonicalHref(text);
    const seoHead = hasSeoHead(text);
    const missing = !canonical && !seoHead;
    let canonicalHostMismatch = false;
    if (canonical && canonical !== 'dynamic') {
      try {
        const u = new URL(canonical);
        const baseHost = new URL(base).host;
        if (u.host !== baseHost) canonicalHostMismatch = true;
      } catch (e) {
        // ignore
      }
    }

    results.push({ file: rel, canonical: canonical || (seoHead ? 'SeoHead (dynamic)' : null), missing, canonicalHostMismatch });
  });

  return { base, results };
}

function analyzeAppRoutes() {
  const appPath = path.join(__dirname, '..', 'src', 'app', 'App.tsx');
  const text = readFile(appPath);
  if (!text) return { siteUrl: null, routes: [] };
  const siteMatch = text.match(/const\s+SITE_URL\s*=\s*['"]([^'"]+)['"]/);
  const siteUrl = siteMatch ? siteMatch[1] : null;
  const routes = [];
  // attempt to extract checks in getSeoForPath
  const blogExact = /if\s*\(pathname\s*===\s*'\/blog'\)\s*{[\s\S]*?canonicalPath:\s*'([^']+)'/m.exec(text);
  if (blogExact) routes.push('/blog');
  const blogPrefix = /if\s*\(pathname\.startsWith\('\/blog\/'\)\)\s*{/.test(text);
  if (blogPrefix) routes.push('/blog/*');
  const admin = /if\s*\(pathname\s*===\s*'\/admin'\)/.test(text);
  if (admin) routes.push('/admin');
  routes.push('/');
  return { siteUrl, routes };
}

function run() {
  const pages = analyzePages();
  const app = analyzeAppRoutes();

  console.log('\nCanonical scan report');
  console.log('====================================');
  console.log(`Canonical base from content.ts: ${pages.base}`);
  console.log(`Client-side site URL from App.tsx: ${app.siteUrl || 'not found'}`);
  console.log('\nServer-rendered pages under src/pages:');

  pages.results.forEach((r) => {
    console.log(`- ${r.file}`);
    if (r.missing) console.log('    -> MISSING canonical (no <link rel="canonical"> and no SeoHead)');
    else console.log(`    -> canonical: ${r.canonical}`);
    if (r.canonicalHostMismatch) console.log('    -> Host mismatch: canonical does not use canonicalBaseUrl host');
  });

  console.log('\nSPA/App routes (client-side) detected in src/app/App.tsx:');
  app.routes.forEach((rt) => {
    console.log(`- ${rt} -> expected canonical: ${app.siteUrl || pages.base}${rt === '/' ? '' : rt}`);
  });

  console.log('\nNotes:');
  console.log('- "dynamic" canonical indicates the href is generated from expressions; verify server-side values.');
  console.log('- For any MISSING entries, consider adding SeoHead or a static <link rel="canonical"> to the page.');
  console.log('- After fixes, deploy and request indexing in Google Search Console for changed pages.');
}

run();
