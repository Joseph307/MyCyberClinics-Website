import React from "react";
import BlogPostClientWrapper from "@/app/components/BlogPostClientWrapper";
import { fetchBlogArticles, fetchSiteSettingsContent } from "@/sanity/lib/content";
import type { Metadata } from "next";

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

// Server-side metadata for each blog article page. We locate the article by slug
// and return SEO-friendly metadata including Open Graph data.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params?.slug;
  try {
    const [siteSettings, articles] = await Promise.all([
      fetchSiteSettingsContent(),
      fetchBlogArticles(200),
    ]);

    const article = articles.find((a) => String(a.id) === String(slug));
    if (!article) {
      return { title: siteSettings.metaTitleDefault || "MyCyber Clinics" };
    }

    const canonical = `${siteSettings.canonicalBaseUrl.replace(/\/$/, "")}/blog/${article.id}`;

    return {
      title: `${article.title} | ${siteSettings.metaTitleDefault}`,
      description: article.excerpt || siteSettings.metaDescriptionDefault,
      openGraph: {
        title: article.title,
        description: article.excerpt || siteSettings.metaDescriptionDefault,
        url: canonical,
        images: [article.image],
        siteName: siteSettings.siteTitle,
      },
      alternates: {
        canonical,
      },
    };
  } catch (e) {
    return { title: "MyCyber Clinics" };
  }
}

export default async function BlogPostPageRoute({ params }: { params: { slug?: string } }) {
  const slug = params?.slug;
  // Preload site settings and article data for JSON-LD; the client wrapper will
  // still render the interactive article on the client.
  const [siteSettings, articles] = await Promise.all([
    fetchSiteSettingsContent(),
    fetchBlogArticles(200),
  ]);

  const article = slug ? articles.find((a) => String(a.id) === String(slug)) : undefined;

  const canonical = `${(siteSettings?.canonicalBaseUrl || "https://mycyberclinics.com").replace(/\/$/, "")}/blog/${article?.id ?? slug ?? ""}`;

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: [article.image],
        author: { '@type': 'Person', name: article.author },
        datePublished: new Date(article.date).toISOString(),
        dateModified: new Date(article.date).toISOString(),
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
        publisher: { '@type': 'Organization', name: siteSettings.siteTitle },
      }
    : null;

  return (
    <div>
      {jsonLd && (
        // Render JSON-LD server-side so search engines can index the structured data immediately.
        // eslint-disable-next-line react/no-danger
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <BlogPostClientWrapper />
    </div>
  );
}
