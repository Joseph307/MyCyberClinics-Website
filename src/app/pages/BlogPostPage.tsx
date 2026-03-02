import Image from "next/image";
import { useMemo } from "react";
import {
  Calendar,
  User,
  ArrowLeft,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { useBlogArticles, useSiteSettings } from "@/sanity/lib/hooks";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Footer } from "../components/Footer";
import logoImage from "../../assets/log_o-removebg-cropped.png";

export default function BlogPostPage() {
  const { id } = useParams();
  const allArticles = useBlogArticles(12);
  const siteSettings = useSiteSettings();
  const article = useMemo(
    () => allArticles.find((entry) => entry.id === id),
    [allArticles, id],
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-white" lang="en">
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4" role="banner">
          <nav className="flex items-center justify-between" aria-label="Blog navigation">
            <Link to="/" className="flex items-center gap-3">
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
            <h1 style={{ fontFamily: "var(--font-display, var(--font-sans))" }} className="font-bold text-4xl text-[#1C227A] mb-4">
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

  const relatedArticles = allArticles
    .filter((entry) => entry.id !== article.id && entry.category === article.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white" lang="en">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4" role="banner">
        <nav className="flex items-center justify-between" aria-label="Blog navigation">
          <Link to="/" className="flex items-center gap-3">
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
        <article className="py-12 px-6 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#7D1FFF] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {article.category}
            </div>

            <h1 className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#1C227A] mb-6 leading-tight">
              {article.title}
            </h1>

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

            <div className="mb-12 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={article.image}
                alt={article.imageAlt}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
            </div>

            <div
              className="prose prose-lg max-w-none mb-12"
              style={{
                fontFamily: "var(--font-sans, system-ui, -apple-system, Roboto, sans-serif)",
              }}
            >
              <style>{`
                .prose h2 {
                  font-family: var(--font-display, var(--font-sans));
                  font-weight: bold;
                  color: #1C227A;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
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
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            <div className="border-t border-b border-[#E4E5F6] py-8 mb-12">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-[#1C227A]" aria-hidden="true" />
                  <span className="font-semibold text-[#1C227A]">Share this article:</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-full border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white hover:border-[#7D1FFF] transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-['Univa_Nova',sans-serif] font-bold text-2xl text-[#1C227A] mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/blog/${relatedArticle.id}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl overflow-hidden border border-[#E4E5F6] hover:border-[#7D1FFF] hover:shadow-lg transition-all">
                      <div className="h-48 overflow-hidden">
                        <ImageWithFallback
                          src={relatedArticle.image}
                          alt={relatedArticle.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-['Univa_Nova',sans-serif] font-bold text-lg text-[#1C227A] mb-2 group-hover:text-[#7D1FFF] transition-colors">
                          {relatedArticle.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" aria-hidden="true" />
                            <time dateTime={relatedArticle.date}>{relatedArticle.date}</time>
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

            <div className="text-center">
              <Link to="/blog">
                <Button
                  className="bg-[#1C227A] hover:bg-[#0F1347] text-white px-8 py-6 text-lg"
                >
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
