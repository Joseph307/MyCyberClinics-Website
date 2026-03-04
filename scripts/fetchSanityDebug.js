// Simple debug script to fetch blog posts using @sanity/client
// Run with: node scripts\fetchSanityDebug.js

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'mhgdyq41',
  dataset: 'production',
  apiVersion: '2026-03-02',
  useCdn: true,
});

const query = `*[_type == "blogPost" && (status == "published" || !defined(status) || status == "scheduled")] | order(coalesce(publishAt, updatedAt) desc)[0...$limit]{
  _id,
  title,
  excerpt,
  content,
  contentHtml,
  category,
  authorName,
  featuredImageUrl,
  featuredImageAlt,
  publishAt,
  updatedAt,
  readingTimeMinutes,
  "slug": seo.slug.current
}`;

(async () => {
  try {
    console.log('Fetching posts from Sanity...');
    const posts = await client.fetch(query, { limit: 20 });
    console.log('Received', Array.isArray(posts) ? posts.length : typeof posts, 'posts');
    if (Array.isArray(posts)) {
      posts.forEach((p, i) => {
        console.log(
          i + 1,
          p._id,
          'slug=',
          p.slug,
          'title=',
          p.title,
          'hasContent=',
          !!p.content,
          'hasContentHtml=',
          !!p.contentHtml,
          'featuredImageUrl=',
          p.featuredImageUrl || '(none)'
        );

        if (p.slug === 'what-is-typhoid-fever-symptoms-treatment') {
          console.log('--- detailed object for typhoid slug ---');
          console.log(JSON.stringify(p, null, 2));
        }
      });
    } else {
      console.log(posts);
    }
  } catch (err) {
    console.error('Error fetching posts:', err && err.message ? err.message : err);
    if (err && err.response) {
      console.error('Response:', err.response.status, err.response.statusText);
    }
    process.exitCode = 2;
  }
})();

// Extra: fetch the specific typhoid post with full featuredImage object for inspection
(async () => {
  try {
    const slug = 'what-is-typhoid-fever-symptoms-treatment';
    const singleQuery = `*[_type == "blogPost" && seo.slug.current == $slug][0]{_id,title,slug,featuredImage,featuredImageUrl,featuredImageAlt}`;
    const doc = await client.fetch(singleQuery, { slug });
    console.log('\n--- detailed featuredImage for slug:', slug, '---');
    console.log(JSON.stringify(doc, null, 2));
  } catch (e) {
    console.error('Error fetching single doc:', e && e.message ? e.message : e);
  }
})();
