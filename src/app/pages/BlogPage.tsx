import Image from "next/image";
import { useMemo, useState } from "react";
import { Calendar, User, ArrowRight, Clock, ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router";
import { useBlogArticles, useSiteSettings } from "@/sanity/lib/hooks";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Footer } from "../components/Footer";
import logoImage from "../../assets/log_o-removebg-cropped.png";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const allArticles = useBlogArticles(12);
  const siteSettings = useSiteSettings();

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
  const remainingArticles = useMemo(() => filteredArticles.slice(1), [filteredArticles]);

  return (
    <div className="min-h-screen bg-white" lang="en">
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E4E5F6] px-6 lg:px-32 py-4"
        role="banner"
      >
        <nav
          className="flex items-center justify-between"
          aria-label="Blog navigation"
        >
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
        <section className="py-16 lg:py-20 px-6 lg:px-32 bg-gradient-to-br from-[#1C227A] to-[#36427A]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="font-display font-bold text-4xl lg:text-5xl mb-6">
              Health Insights & Medical Advice
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
              Expert medical advice and health education from Nigeria&apos;s
              verified doctors
            </p>

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

        <section className="py-8 px-6 lg:px-32 bg-[#F1F2FB] border-b border-[#E4E5F6]">
          <div className="max-w-7xl mx-auto">
            <div
              className="hide-scrollbar flex items-center gap-3 overflow-x-auto pb-2"
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
          </div>
        </section>

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

            {remainingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {remainingArticles.map((article) => (
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
            ) : (
              <div className="rounded-2xl border border-[#E4E5F6] bg-[#F1F2FB] p-8 text-center text-[#1C227A]">
                No articles match your search.
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
    </div>
  );
}
