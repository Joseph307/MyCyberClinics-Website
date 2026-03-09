import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';

// Sanity project settings (keep in sync with src/sanity/lib/client.ts)
const PROJECT_ID = 'mhgdyq41';
const DATASET = 'production';
const API_VERSION = '2026-03-02';

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: API_VERSION,
  useCdn: true,
});

const SITE_URL = process.env.SITE_URL || 'https://mycyberclinics.com';

async function fetchSlugs() {
  const query = `*[_type == "blogPost" && (status == "published" || !defined(status) || status == "scheduled")] | order(coalesce(publishAt, updatedAt) desc){
    "slug": seo.slug.current,
    publishAt,
    updatedAt
  }`;

  const posts = await client.fetch(query);
  return posts.map((p) => ({ slug: p.slug || p._id, date: p.publishAt || p.updatedAt }));
}

function buildUrl(loc, lastmod) {
  return `  <url>\n    <loc>${loc}</loc>\n    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
}

async function main() {
  try {
    const posts = await fetchSlugs();

    const urls = [];
    urls.push(buildUrl(`${SITE_URL}/`, null));
    urls.push(buildUrl(`${SITE_URL}/blog`, null));

    for (const p of posts) {
      const loc = `${SITE_URL}/blog/${p.slug}`;
      urls.push(buildUrl(loc, p.date));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    fs.writeFileSync(outPath, xml, 'utf8');
    console.log('Sitemap written to', outPath);
  } catch (e) {
    console.error('Failed to generate sitemap', e);
    process.exit(1);
  }
}

main();
