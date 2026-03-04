import React from "react";
import BlogPostClientWrapper from "@/app/components/BlogPostClientWrapper";
import { fetchBlogArticles } from "@/sanity/lib/content";

// For static export (output: 'export') Next requires enumerating dynamic params.
// Provide the list of blog slugs so the static exporter can generate each page.
export async function generateStaticParams() {
  try {
    const articles = await fetchBlogArticles(200);
    return articles.map((a) => ({ slug: [String(a.id)] }));
  } catch (err) {
    // Fallback: no params — exporter will still build pages listed elsewhere.
    return [];
  }
}

export default function BlogPostCatchAllPage() {
  // Server component wrapper that mounts the client-only BlogPostPage.
  // BlogPostPage is a client component (it starts with "use client"), so importing
  // it via the client wrapper ensures it only renders on the browser.
  return (
    <div>
      <BlogPostClientWrapper />
    </div>
  );
}
