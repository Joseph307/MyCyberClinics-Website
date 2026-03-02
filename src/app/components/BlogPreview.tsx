import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router";

const blogArticles = [
  {
    id: 1,
    title: "Understanding Telemedicine: How Virtual Healthcare Works in Nigeria",
    excerpt: "Learn how telemedicine is transforming healthcare delivery across Nigeria, making quality medical care accessible to everyone.",
    author: "Dr. Adaeze Okonkwo",
    date: "February 15, 2026",
    readTime: "5 min read",
    category: "Healthcare Technology",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 2,
    title: "5 Common Health Myths Debunked by Medical Professionals",
    excerpt: "Separating medical facts from fiction. Our doctors explain the truth behind common health misconceptions.",
    author: "Dr. Chinedu Eze",
    date: "February 12, 2026",
    readTime: "7 min read",
    category: "Health Education",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 3,
    title: "Managing Stress and Mental Health in Modern Nigeria",
    excerpt: "Practical tips for maintaining mental wellness in today's fast-paced world, from Nigeria's leading mental health professionals.",
    author: "Dr. Oluwaseun Adeleke",
    date: "February 10, 2026",
    readTime: "6 min read",
    category: "Mental Health",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 4,
    title: "Preventive Healthcare: Why Regular Check-ups Matter",
    excerpt: "Discover how preventive care can save lives and reduce healthcare costs through early detection and intervention.",
    author: "Dr. Adaeze Okonkwo",
    date: "February 8, 2026",
    readTime: "5 min read",
    category: "Preventive Care",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 5,
    title: "Understanding Your Prescription: A Patient's Guide",
    excerpt: "Everything you need to know about reading prescriptions, medication safety, and proper drug usage.",
    author: "Dr. Chinedu Eze",
    date: "February 5, 2026",
    readTime: "8 min read",
    category: "Patient Education",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 6,
    title: "Nutrition Basics: Eating for Better Health in Nigeria",
    excerpt: "A practical guide to nutrition and healthy eating habits tailored for Nigerian cuisine and lifestyle.",
    author: "Dr. Oluwaseun Adeleke",
    date: "February 2, 2026",
    readTime: "6 min read",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export function BlogPreview() {
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
          {blogArticles.map((article) => (
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
