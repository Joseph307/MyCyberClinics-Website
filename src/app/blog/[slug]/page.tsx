import React from "react";
import BlogPostClientWrapper from "@/app/components/BlogPostClientWrapper";
import { fetchBlogArticles } from "@/sanity/lib/content";

// For static export (output: 'export') Next requires enumerating dynamic params.
// Provide the list of blog slugs so the static exporter can generate each page.
export async function generateStaticParams() {
  try {
    const articles = await fetchBlogArticles(200);
    return articles.map((a) => ({ slug: String(a.id) }));
  } catch (err) {
    return [];
  }
}

export default function BlogPostPageRoute() {
  return (
    <div>
      <BlogPostClientWrapper />
    </div>
  );
}
