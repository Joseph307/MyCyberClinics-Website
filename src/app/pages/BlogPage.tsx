import Image from "next/image";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { useBlogArticles, useSiteSettings } from "@/sanity/lib/hooks";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Footer } from "../components/Footer";
import logoImage from "../../assets/log_o-removebg-cropped.png";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  // Fetch a larger batch so we can paginate client-side. Increase if you have many posts.
  const allArticles = useBlogArticles(100);
  const siteSettings = useSiteSettings();
  const categoryTabsRef = useRef<HTMLDivElement | null>(null);
  const [canScrollTabsLeft, setCanScrollTabsLeft] = useState(false);
  const [canScrollTabsRight, setCanScrollTabsRight] = useState(false);

  const normalizedQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery],
  );

  const categories = useMemo(
    () => [
      "All Articles",
      ...Array.from(new Set(allArticles.map((article) => article.category))).sort(),
    ],
    [allArticles],
  );

  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All Articles" ||
        article.category === selectedCategory;

      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;

      return (
        article.title.toLowerCase().includes(normalizedQuery) ||
        article.excerpt.toLowerCase().includes(normalizedQuery) ||
        article.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [allArticles, normalizedQuery, selectedCategory]);

  const featuredArticle = filteredArticles[0] ?? null;
  // Pagination: show featured article on page 1, then 10 articles per page.
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 10;

  useEffect(() => {
    // Reset to first page whenever filters/search change
    setCurrentPage(1);
  }, [normalizedQuery, selectedCategory]);

  const remainingArticles = useMemo(() => filteredArticles.slice(1), [filteredArticles]);
  const totalPages = Math.max(1, Math.ceil(remainingArticles.length / ARTICLES_PER_PAGE));

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    return remainingArticles.slice(start, start + ARTICLES_PER_PAGE);
  }, [remainingArticles, currentPage]);

  // Ensure current page is within bounds if totalPages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const openEmailComposer = (subject: string, body: string) => {
    const to = "support@mycyberclinics.com";
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const gmailComposeUrl =
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}` +
      `&su=${encodedSubject}&body=${encodedBody}`;
    const mailtoUrl = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;

    const popup = window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.href = mailtoUrl;
    }
  };

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("newsletterEmail") ?? "").trim();
    const subject = "Newsletter Subscription Request";
    const body =
      `Please subscribe this email to MyCyber Clinics health updates:\n\n${email}`;
    openEmailComposer(subject, body);
    event.currentTarget.reset();
  };

  const updateTabArrowState = useCallback(() => {
    const container = categoryTabsRef.current;
    if (!container) return;

    const hasLeft = container.scrollLeft > 4;
    const hasRight =
      container.scrollLeft + container.clientWidth < container.scrollWidth - 4;

    setCanScrollTabsLeft(hasLeft);
    setCanScrollTabsRight(hasRight);
  }, []);

  const scrollCategoryTabs = (direction: "left" | "right") => {
    const container = categoryTabsRef.current;
    if (!container) return;

    const distance = direction === "right" ? 240 : -240;
    container.scrollBy({ left: distance, behavior: "smooth" });
  };

  useEffect(() => {
    updateTabArrowState();

    const container = categoryTabsRef.current;
    if (!container) return;

    const handleScroll = () => updateTabArrowState();
    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateTabArrowState]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" lang="en">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4"
        role="banner"
      >
        <nav
          className="flex items-center justify-between"
          aria-label="Blog navigation"
        >
          {/* Logo */}
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
        {/* Hero Section */}
        <section className="py-16 lg:py-20 px-6 lg:px-32 bg-gradient-to-br from-[#1C227A] to-[#36427A]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-display font-bold text-4xl lg:text-5xl mb-6">
              Health Insights & Medical Advice
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
              Expert medical advice and health education from Nigeria&apos;s
              verified doctors
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#7E5BA1]"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white border border-[#ECF0F1] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#14A9CC] text-[#2C3E50] placeholder:text-[#7A8594]"
                aria-label="Search blog articles"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 px-6 lg:px-32 bg-[#F1F2FB] border-b border-[#E4E5F6]">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden">
              {canScrollTabsLeft && (
                <button
                  type="button"
                  onClick={() => scrollCategoryTabs("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#E4E5F6] text-[#1C227A] shadow-sm hover:bg-[#7D1FFF] hover:text-white transition-colors"
                  aria-label="Show previous categories"
                >
                  <ChevronLeft className="w-4 h-4 mx-auto" aria-hidden="true" />
                </button>
              )}

              <div
                ref={categoryTabsRef}
                className="hide-scrollbar flex items-center gap-3 overflow-x-auto scroll-smooth px-10 pb-4 -mb-4"
                role="tablist"
                aria-label="Article categories"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-[#7D1FFF] text-white"
                        : "bg-white text-[#1C227A] hover:bg-[#7D1FFF] hover:text-white border border-[#E4E5F6]"
                    }`}
                    role="tab"
                    aria-selected={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {canScrollTabsRight && (
                <button
                  type="button"
                  onClick={() => scrollCategoryTabs("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#E4E5F6] text-[#1C227A] shadow-sm hover:bg-[#7D1FFF] hover:text-white transition-colors"
                  aria-label="Show more categories"
                >
                  <ChevronRight className="w-4 h-4 mx-auto" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section
          className="py-12 px-6 lg:px-32 bg-white"
          aria-labelledby="featured-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="featured-heading"
              className="font-display font-bold text-2xl text-[#1C227A] mb-8"
            >
              Featured Article
            </h2>
            {featuredArticle ? (
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-[#F1F2FB] rounded-2xl overflow-hidden border border-[#E4E5F6] hover:shadow-xl transition-shadow">
                <div className="h-80 lg:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={featuredArticle.image}
                    alt={featuredArticle.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[#7D1FFF] text-white px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit">
                    {featuredArticle.category}
                  </div>
                  <h3 className="font-display font-bold text-3xl text-[#1C227A] mb-4 leading-tight">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" aria-hidden="true" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <time dateTime={featuredArticle.date}>
                        {featuredArticle.date}
                      </time>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${featuredArticle.id}`}
                    className="inline-flex"
                    aria-label={`Read full article: ${featuredArticle.title}`}
                  >
                    <Button className="bg-[#7D1FFF] hover:bg-[#6B1AD9] text-white w-fit">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </article>
            ) : (
              <div className="rounded-2xl border border-[#E4E5F6] bg-[#F1F2FB] p-8 text-center text-[#1C227A]">
                No articles match your search.
              </div>
            )}
          </div>
        </section>

        <section className="pb-20 px-6 lg:px-32 bg-white" aria-labelledby="all-articles-heading">
          <div className="max-w-7xl mx-auto">
            <h2
              id="all-articles-heading"
              className="font-display font-bold text-2xl text-[#1C227A] mb-8"
            >
              All Articles
            </h2>
            {(featuredArticle || remainingArticles.length > 0) ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E4E5F6] hover:border-[#7D1FFF] hover:shadow-xl transition-all group"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-[#1C227A] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display font-bold text-xl text-[#1C227A] mb-3 leading-tight group-hover:text-[#7D1FFF] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-[#E4E5F6]">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" aria-hidden="true" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          <time dateTime={article.date}>{article.date}</time>
                        </div>
                        <Link
                          to={`/blog/${article.id}`}
                          className="text-[#7D1FFF] hover:text-[#1C227A] text-sm font-semibold flex items-center gap-1 group"
                          aria-label={`Read full article: ${article.title}`}
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                  ))}
                </div>

                {/* Pagination controls (hide when only one page) */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${currentPage === 1 ? "bg-white/60 text-gray-300 cursor-not-allowed border-[#E4E5F6]" : "bg-white border-[#E4E5F6] text-black hover:bg-[#7D1FFF] hover:text-white"}`}
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          aria-current={currentPage === page ? "page" : undefined}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentPage === page ? "bg-[#7D1FFF] text-white" : "bg-white border border-[#E4E5F6] hover:bg-[#7D1FFF] hover:text-white"}`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${currentPage === totalPages ? "bg-white/60 text-gray-300 cursor-not-allowed border-[#E4E5F6]" : "bg-white border-[#E4E5F6] text-black hover:bg-[#7D1FFF] hover:text-white"}`}
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-[#E4E5F6] bg-[#F1F2FB] p-8 text-center text-[#1C227A]">
                No articles match your search.
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section
          className="py-16 px-6 lg:px-32 bg-[#F1F2FB]"
          aria-labelledby="newsletter-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              id="newsletter-heading"
              className="font-display font-bold text-3xl text-[#1C227A] mb-4"
            >
              Stay Updated on Health Topics
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Get the latest health insights and medical advice delivered to
              your inbox
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto items-center "
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                name="newsletterEmail"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg border border-[#E4E5F6] focus:outline-none focus:ring-2 focus:ring-[#7D1FFF] bg-white text-[#1C227A] caret-[#1C227A] placeholder:text-[#7A8594]"
                aria-label="Email address for newsletter"
                required
              />
              <Button
                type="submit"
                className="bg-[#7D1FFF] hover:bg-[#6B1AD9] text-white px-8 py-4"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
