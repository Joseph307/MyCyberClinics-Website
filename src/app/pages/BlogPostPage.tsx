"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import {
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
    Instagram,
    Youtube,
    Music2,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useMemo, useEffect, useRef, useState, type ReactNode } from "react";
import logoImage from "../../assets/log_o-removebg-cropped.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Footer } from "../components/Footer";
import { useSiteSettings, useBlogArticles } from "@/sanity/lib/hooks";
import { urlFor } from "@/sanity/lib/client";

type PortableTextImageValue = {
  asset?: { url?: string };
  url?: string;
  alt?: string;
  caption?: string;
};

type PortableTextImageProps = {
  value?: PortableTextImageValue;
};

type PortableTextChildrenProps = {
  children?: ReactNode;
};

type ArticlePortableContent = {
  portableContent?: unknown;
};

export default function BlogPostPage() {
  const { id } = useParams();
  const siteSettings = useSiteSettings();
  const allArticles = useBlogArticles(100);
  const articleContentRef = useRef<HTMLDivElement | null>(null);
  const [heroImageOverride, setHeroImageOverride] = useState<string | undefined>(undefined);
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/['"`]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const article = useMemo(() => {
    if (!id) return undefined;
    const normalized = String(id);

    // 1) Try exact id match (sanity uses slugs as ids)
    let found = allArticles.find((a) => a.id === normalized);
    if (found) return found;

    // 2) Try slugified match against article titles (fallback)
    const targetSlug = slugify(normalized);
    found = allArticles.find((a) => slugify(a.title) === targetSlug);
    if (found) return found;

    return undefined;
  }, [id, allArticles]);
  const portableContent = (article as ArticlePortableContent | undefined)?.portableContent;
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    setShowNotFound(false);
    const t = setTimeout(() => {
      if (!article) setShowNotFound(true);
    }, 350);
    return () => clearTimeout(t);
  }, [article, id, allArticles]);
  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://mycyberclinics.com/blog/${id ?? ""}`;
  const shareText = `${article?.title ?? "Health Article"} | MyCyber Clinics`;

  const openSharePopup = (url: string) => {
    if (typeof window === "undefined") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const copyArticleLink = async (platform: string) => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      window.alert(`Article link copied. Paste it in ${platform} to share.`);
    } catch {
      window.alert(
        "Could not copy automatically. Please copy the page URL from your browser.",
      );
    }
  };

  const shareOn = async (
    platform:
      | "facebook"
      | "x"
      | "linkedin"
      | "instagram"
      | "youtube"
      | "tiktok",
  ) => {
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedText = encodeURIComponent(shareText);

    if (platform === "facebook") {
      openSharePopup(
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      );
      return;
    }

    if (platform === "x") {
      openSharePopup(
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      );
      return;
    }

    if (platform === "linkedin") {
      openSharePopup(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      );
      return;
    }

    // Instagram / YouTube / TikTok don't provide simple web share URLs for arbitrary links.
    await copyArticleLink(
      platform === "instagram"
        ? "Instagram"
        : platform === "youtube"
          ? "YouTube"
          : "TikTok",
    );
  };

  const sanitizedArticleContent = article
    ? article.content
        .replace(/\sstyle=(["'])[\s\S]*?\1/gi, "")
        .replace(/\scolor=(["'])[\s\S]*?\1/gi, "")
        .replace(/\sclass=(["'])[\s\S]*?\1/gi, "")
        .replace(/<\/?font[^>]*>/gi, "")
        .replace(
          /<p>\s*(?:<strong>|<b>)([^<]+)(?:<\/strong>|<\/b>)\s*<\/p>/gi,
          "<h3>$1</h3>",
        )
    : "";

  const ptComponents = {
    types: {
      image: ({ value }: PortableTextImageProps) => {
        // Sanity image blocks often have an `asset` reference (with _ref) rather than a direct URL.
        // Use the urlFor helper to build a usable CDN URL when needed.
        const src = value?.asset?.url || value?.url || (value?.asset ? urlFor(value) : undefined);
        if (!src) return null;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <figure>
            <img src={src} alt={value?.alt || value?.caption || ""} style={{ maxWidth: "100%" }} />
            {value?.caption ? <figcaption>{value.caption}</figcaption> : null}
          </figure>
        );
      },
    },
    block: {
      h1: ({ children }: PortableTextChildrenProps) => <h1 className="text-4xl">{children}</h1>,
      h2: ({ children }: PortableTextChildrenProps) => <h2 className="text-3xl">{children}</h2>,
      h3: ({ children }: PortableTextChildrenProps) => <h3 className="text-2xl">{children}</h3>,
      normal: ({ children }: PortableTextChildrenProps) => <p>{children}</p>,
    },
    // Render lists created in the Portable Text editor.
    list: {
      bullet: ({ children }: PortableTextChildrenProps) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      number: ({ children }: PortableTextChildrenProps) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: PortableTextChildrenProps) => <li className="mb-1">{children}</li>,
      number: ({ children }: PortableTextChildrenProps) => <li className="mb-1">{children}</li>,
    },
  };
  useEffect(() => {
    const root = articleContentRef.current;
    if (!root) return;

    const getRgb = (value: string): [number, number, number] | null => {
      const match = value.match(/\d+/g);
      if (!match || match.length < 3) return null;
      return [Number(match[0]), Number(match[1]), Number(match[2])];
    };

    const luminance = ([r, g, b]: [number, number, number]) =>
      (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    const nodes = root.querySelectorAll<HTMLElement>("*");
    nodes.forEach((node) => {
      const style = window.getComputedStyle(node);
      const rgb = getRgb(style.color);
      if (!rgb) return;

      // Force readability for overly light text from imported rich HTML.
      if (luminance(rgb) >= 0.82) {
        const tag = node.tagName.toLowerCase();
        if (/^h[1-6]$/.test(tag)) {
          node.style.color = "#1C227A";
          node.style.opacity = "1";
          return;
        }

        if (tag === "strong" || tag === "b") {
          node.style.color = "#1C227A";
          node.style.opacity = "1";
          return;
        }

        node.style.color = "#374151";
        node.style.opacity = "1";
      }
    });
  }, [sanitizedArticleContent]);

  // If there's no explicit featured image, try to pick the first inline <img>
  // from the rendered Portable Text content and use it as the hero image.
  useEffect(() => {
    if (article?.image) return; // already have a featured image
    const root = articleContentRef.current;
    if (!root) return;

    const img = root.querySelector<HTMLImageElement>("img");
    if (img && img.src) {
      setHeroImageOverride(img.src);
    }
  }, [article]);

  if (!article && showNotFound) {
    return (
      <div className="min-h-screen bg-white" lang="en">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4" role="banner">
          <nav className="flex items-center justify-between" aria-label="Blog navigation">
            <Link to="/#home" className="flex items-center gap-3">
              <Image
                src={logoImage}
                alt="MyCyber Clinics - Healthcare meets Technology"
                sizes="(min-width: 1024px) 160px, 140px"
                className="h-14 lg:h-16 w-auto"
              />
            </Link>
            <Link to="/">
              <Button variant="nav" className="btn-glow">
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
          </nav>
        </header>
        <main className="py-20 px-6 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              style={{ fontFamily: "var(--font-display, var(--font-sans))" }}
              className="font-bold text-4xl text-[#1C227A] mb-4"
            >
              Article Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link to="/blog">
              <Button className="bg-[#7D1FFF] hover:bg-[#6B1AD9] text-white">
                View All Articles
              </Button>
            </Link>
          </div>
        </main>
        <Footer siteSettings={siteSettings} />
      </div>
    );
  }

  // While we wait for async articles to load, show a small loading placeholder
  if (!article) {
    return (
      <div className="min-h-screen bg-white" lang="en">
        <header
          className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4"
          role="banner"
        >
          <nav className="flex items-center justify-between" aria-label="Blog navigation">
            <Link to="/#home" className="flex items-center gap-3">
              <Image src={logoImage} alt="MyCyber Clinics - Healthcare meets Technology" sizes="(min-width: 1024px) 160px, 140px" className="h-14 lg:h-16 w-auto" />
            </Link>
            <Link to="/">
              <Button variant="nav" className="btn-glow">
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Back to Home
              </Button>
            </Link>
          </nav>
        </header>

        <main className="py-20 px-6 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600">Loading article…</p>
          </div>
        </main>

        <Footer siteSettings={siteSettings} />
      </div>
    );
  }

  const relatedArticles = allArticles
    .filter((entry) => entry.id !== article.id && entry.category === article.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white" lang="en">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4" role="banner">
        <nav className="flex items-center justify-between" aria-label="Blog navigation">
          <Link to="/#home" className="flex items-center gap-3">
            <Image
              src={logoImage}
              alt="MyCyber Clinics - Healthcare meets Technology"
              sizes="(min-width: 1024px) 160px, 140px"
              className="h-14 lg:h-16 w-auto"
            />
          </Link>
          <Link to="/">
            <Button variant="nav" className="btn-glow">
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </nav>
      </header>

      <main>
        {/* Article Header */}
        <article className="py-12 px-6 lg:px-32">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-[#7D1FFF] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {article.category}
            </div>

            {/* Title */}
            <h1 className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#1C227A] mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-[#E4E5F6]">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" aria-hidden="true" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" aria-hidden="true" />
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={heroImageOverride || article.image}
                alt={`Featured image for: ${article.title}`}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none mb-12"
              style={{
                fontFamily:
                  "var(--font-sans, system-ui, -apple-system, Roboto, sans-serif)",
              }}
            >
              <style>{`
                .prose * {
                  color: #374151 !important;
                  opacity: 1 !important;
                }
                .prose h1, .prose h2, .prose h3, .prose h4 {
                  color: #1C227A !important;
                  opacity: 1 !important;
                }
                .prose h2 {
                  font-family: var(--font-display, var(--font-sans));
                  font-weight: bold;
                  color: #1C227A;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .prose h3, .prose h4 {
                  font-family: var(--font-display, var(--font-sans));
                  font-weight: 700;
                  color: #1C227A !important;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                }
                .prose p {
                  color: #374151;
                  line-height: 1.75;
                  margin-bottom: 1.5rem;
                }
                .prose ul {
                  margin-top: 1rem;
                  margin-bottom: 1.5rem;
                  padding-left: 1.5rem;
                }
                .prose li {
                  color: #374151;
                  margin-bottom: 0.5rem;
                }
              `}</style>
              <div ref={articleContentRef}>
                {portableContent ? (
                  <PortableText value={portableContent} components={ptComponents} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: sanitizedArticleContent }} />
                )}
              </div>
            </div>

            {/* Share Section */}
            <div className="border-t border-b border-[#E4E5F6] py-8 mb-12">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Share2
                    className="w-5 h-5 text-[#1C227A]"
                    aria-hidden="true"
                  />
                  <span className="font-semibold text-[#1C227A]">
                    Share this article:
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => void shareOn("facebook")}
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void shareOn("x")}
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on X"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void shareOn("linkedin")}
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void shareOn("instagram")}
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void shareOn("youtube")}
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => void shareOn("tiktok")}
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on TikTok"
                  >
                    <Music2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mb-12">
              <h2 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-[#1C227A] mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allArticles
                  .filter(
                    (a) =>
                      a.id !== article.id && a.category === article.category,
                  )
                  .slice(0, 2)
                  .map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/blog/${relatedArticle.id}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl overflow-hidden border border-[#E4E5F6] hover:border-[#7D1FFF] hover:shadow-lg transition-all">
                        <div className="h-48 overflow-hidden">
                          <ImageWithFallback
                            src={relatedArticle.image}
                            alt={`Featured image for: ${relatedArticle.title}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-['Univa_Nova',sans-serif] font-bold text-lg text-[#1C227A] mb-2 group-hover:text-[#7D1FFF] transition-colors">
                            {relatedArticle.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar
                                className="w-3 h-3"
                                aria-hidden="true"
                              />
                              <time dateTime={relatedArticle.date}>
                                {relatedArticle.date}
                              </time>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" aria-hidden="true" />
                              <span>{relatedArticle.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Back to Blog CTA */}
            <div className="text-center">
              <Link to="/blog">
                <Button className="bg-[#1C227A] hover:bg-[#0F1347] text-white px-8 py-6 text-lg">
                  <ArrowLeft className="w-5 h-5 mr-2" aria-hidden="true" />
                  Back to All Articles
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
  }
