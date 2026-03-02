import Image from "next/image";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  ArrowLeft,
  Search,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import logoImage from "../../assets/log_o-removebg-cropped.png";

const allArticles = [
  {
    id: 1,
    title:
      "Understanding Telemedicine: How Virtual Healthcare Works in Nigeria",
    excerpt:
      "Learn how telemedicine is transforming healthcare delivery across Nigeria, making quality medical care accessible to everyone.",
    author: "Dr. Adaeze Okonkwo",
    date: "February 15, 2026",
    readTime: "5 min read",
    category: "Healthcare Technology",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 2,
    title: "5 Common Health Myths Debunked by Medical Professionals",
    excerpt:
      "Separating medical facts from fiction. Our doctors explain the truth behind common health misconceptions.",
    author: "Dr. Chinedu Eze",
    date: "February 12, 2026",
    readTime: "7 min read",
    category: "Health Education",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 3,
    title: "Managing Stress and Mental Health in Modern Nigeria",
    excerpt:
      "Practical tips for maintaining mental wellness in today's fast-paced world, from Nigeria's leading mental health professionals.",
    author: "Dr. Oluwaseun Adeleke",
    date: "February 10, 2026",
    readTime: "6 min read",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 4,
    title: "Preventive Healthcare: Why Regular Check-ups Matter",
    excerpt:
      "Discover how preventive care can save lives and reduce healthcare costs through early detection and intervention.",
    author: "Dr. Adaeze Okonkwo",
    date: "February 8, 2026",
    readTime: "5 min read",
    category: "Preventive Care",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 5,
    title: "Understanding Your Prescription: A Patient's Guide",
    excerpt:
      "Everything you need to know about reading prescriptions, medication safety, and proper drug usage.",
    author: "Dr. Chinedu Eze",
    date: "February 5, 2026",
    readTime: "8 min read",
    category: "Patient Education",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 6,
    title: "Nutrition Basics: Eating for Better Health in Nigeria",
    excerpt:
      "A practical guide to nutrition and healthy eating habits tailored for Nigerian cuisine and lifestyle.",
    author: "Dr. Oluwaseun Adeleke",
    date: "February 2, 2026",
    readTime: "6 min read",
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 7,
    title: "Diabetes Management: Living Well with Type 2 Diabetes",
    excerpt:
      "Comprehensive guide to managing Type 2 diabetes through lifestyle changes, medication, and regular monitoring.",
    author: "Dr. Chinedu Eze",
    date: "January 30, 2026",
    readTime: "9 min read",
    category: "Chronic Conditions",
    image:
      "https://images.unsplash.com/photo-1615486511262-4b8b0a4c92d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 8,
    title: "Children's Health: Common Childhood Illnesses Explained",
    excerpt:
      "A parent's guide to recognizing, treating, and preventing common childhood illnesses from fevers to colds.",
    author: "Dr. Adaeze Okonkwo",
    date: "January 28, 2026",
    readTime: "7 min read",
    category: "Pediatrics",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 9,
    title: "Skin Care in the Nigerian Climate: Expert Advice",
    excerpt:
      "Learn how to protect and care for your skin in Nigeria's tropical climate from our dermatology specialists.",
    author: "Dr. Oluwaseun Adeleke",
    date: "January 25, 2026",
    readTime: "6 min read",
    category: "Dermatology",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 10,
    title: "Heart Health: Understanding Cardiovascular Disease",
    excerpt:
      "Essential information about heart disease prevention, risk factors, and treatment options available in Nigeria.",
    author: "Dr. Chinedu Eze",
    date: "January 22, 2026",
    readTime: "8 min read",
    category: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 11,
    title: "Women's Health: Essential Screenings and Check-ups",
    excerpt:
      "A comprehensive guide to women's health screenings, from mammograms to pap smears and beyond.",
    author: "Dr. Adaeze Okonkwo",
    date: "January 20, 2026",
    readTime: "7 min read",
    category: "Women's Health",
    image:
      "https://images.unsplash.com/photo-1516841273335-e39b37888115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 12,
    title: "Sleep Better: Tips for Improving Your Sleep Quality",
    excerpt:
      "Science-backed strategies for getting better sleep and improving your overall health and wellbeing.",
    author: "Dr. Oluwaseun Adeleke",
    date: "January 18, 2026",
    readTime: "5 min read",
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const categories = [
  "All Articles",
  "Healthcare Technology",
  "Health Education",
  "Mental Health",
  "Preventive Care",
  "Patient Education",
  "Nutrition",
  "Chronic Conditions",
  "Pediatrics",
  "Dermatology",
  "Cardiology",
  "Women's Health",
  "Wellness",
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Articles");

  const normalizedQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery],
  );

  // Combine search + category into one memoized pass to avoid recomputing on every render.
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
  }, [normalizedQuery, selectedCategory]);

  const featuredArticle = filteredArticles[0] ?? null;
  const remainingArticles = useMemo(() => filteredArticles.slice(1), [filteredArticles]);

  return (
    <div className="min-h-screen bg-white" lang="en">
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
                    alt={`Featured: ${featuredArticle.title}`}
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

        {/* All Articles */}
        <section
          className="py-12 px-6 lg:px-32 bg-white"
          aria-labelledby="all-articles-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="all-articles-heading"
              className="font-display font-bold text-2xl text-[#1C227A] mb-8"
            >
              All Articles
            </h2>
            {remainingArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {remainingArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E4E5F6] hover:border-[#7D1FFF] hover:shadow-xl transition-all group"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <ImageWithFallback
                        src={article.image}
                        alt={`Featured image for: ${article.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-[#7D1FFF] text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                          className="text-[#7D1FFF] hover:text-[#6B1AD9] text-sm font-semibold flex items-center gap-1"
                          aria-label={`Read article: ${article.title}`}
                        >
                          Read More
                          <ArrowRight
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              // Keep this scoped to the cards section so "Featured Article" can still highlight the best match.
              <div className="rounded-2xl border border-[#E4E5F6] bg-[#F1F2FB] p-8 text-center text-[#1C227A]">
                No additional articles match the current filters.
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
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg border border-[#E4E5F6] focus:outline-none focus:ring-2 focus:ring-[#7D1FFF]"
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

      <Footer />
    </div>
  );
}
