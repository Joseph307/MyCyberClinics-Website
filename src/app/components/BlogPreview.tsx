import type { BlogArticle } from "@/sanity/lib/content";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";

type BlogPreviewProps = {
  articles: BlogArticle[];
};

export function BlogPreview({ articles }: BlogPreviewProps) {
  return (
    <section id="blog" className="py-20 px-6 lg:px-32 bg-white" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 data-reveal id="blog-heading" className="font-['Univa_Nova',sans-serif] font-bold text-4xl lg:text-5xl text-[#2C3E50] mb-4">
            Health Education & Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert medical advice, health tips, and the latest in telemedicine from our team of verified doctors
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#ECF0F1] hover:border-[#14A9CC] hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <ImageWithFallback
                  src={article.image}
                  alt={`Featured image for article: ${article.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-[#14A9CC] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-['Univa_Nova',sans-serif] font-bold text-xl text-[#2C3E50] mb-3 leading-tight group-hover:text-[#14A9CC] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-[#ECF0F1]">
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
                    className="text-[#14A9CC] hover:text-[#FFC857] text-sm font-semibold flex items-center gap-1 group"
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

        {/* View All Button */}
        <div className="text-center">
          <Link to="/blog">
            <Button
              className="bg-[#48C9B0] hover:bg-[#14A9CC] text-white px-8 py-6 text-lg btn-glow btn-pulse"
              aria-label="View all blog articles"
            >
              View All Articles
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
