import Image from "next/image";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
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
import { Footer } from "../components/Footer";
import { Link, useParams } from "react-router";
import { useEffect, useRef } from "react";
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
    content: `
      <p>Telemedicine is revolutionizing healthcare delivery across Nigeria, breaking down geographical barriers and making quality medical care accessible to everyone, regardless of their location.</p>
      
      <h2>What is Telemedicine?</h2>
      <p>Telemedicine refers to the practice of caring for patients remotely when the healthcare provider and patient are not in the same physical location. Modern technology has made remote care more sophisticated and accessible than ever before.</p>
      
      <h2>How Does It Work?</h2>
      <p>Through secure video consultations, patients can connect with licensed medical professionals from the comfort of their homes. Our platform ensures HIPAA compliance and maintains the highest standards of patient privacy and data security.</p>
      
      <h2>Benefits for Nigerian Patients</h2>
      <ul>
        <li>Access to specialists without travel</li>
        <li>Reduced waiting times</li>
        <li>Lower healthcare costs</li>
        <li>Convenient scheduling</li>
        <li>Continuity of care</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Starting with telemedicine is simple. Book a consultation, connect with a verified doctor, and receive professional medical care—all from your smartphone or computer.</p>
    `,
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
    content: `
      <p>Medical misinformation can lead to poor health decisions. Let's separate fact from fiction with evidence-based medicine.</p>
      
      <h2>Myth 1: You Need to Drink 8 Glasses of Water Daily</h2>
      <p>While staying hydrated is important, the "8 glasses" rule isn't based on scientific evidence. Your water needs depend on various factors including climate, activity level, and overall health.</p>
      
      <h2>Myth 2: Cracking Knuckles Causes Arthritis</h2>
      <p>Studies have shown no connection between knuckle cracking and arthritis. The popping sound is caused by gas bubbles in the synovial fluid.</p>
      
      <h2>Myth 3: You Only Use 10% of Your Brain</h2>
      <p>Brain imaging studies show that we use virtually all parts of our brain, and most of the brain is active almost all the time.</p>
      
      <h2>Myth 4: Reading in Dim Light Damages Your Eyes</h2>
      <p>While it may cause eye strain and fatigue, reading in dim light doesn't cause permanent damage to your eyes.</p>
      
      <h2>Myth 5: Feed a Cold, Starve a Fever</h2>
      <p>Your body needs nutrients and hydration whether you have a cold or fever. Proper nutrition supports your immune system during illness.</p>
    `,
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
    content: `
      <p>Mental health is just as important as physical health. In Nigeria's fast-paced environment, managing stress is crucial for overall wellbeing.</p>
      
      <h2>Understanding Stress</h2>
      <p>Stress is your body's response to challenges or demands. While some stress is normal, chronic stress can impact your physical and mental health.</p>
      
      <h2>Common Stress Triggers in Nigeria</h2>
      <ul>
        <li>Traffic congestion</li>
        <li>Work pressure</li>
        <li>Financial concerns</li>
        <li>Family responsibilities</li>
        <li>Social expectations</li>
      </ul>
      
      <h2>Effective Stress Management Techniques</h2>
      <p>Practice mindfulness, maintain regular exercise, ensure adequate sleep, and don't hesitate to seek professional help when needed.</p>
      
      <h2>When to Seek Help</h2>
      <p>If stress is interfering with your daily life, relationships, or work, it's time to consult a mental health professional. Our telemedicine platform makes it easy to connect with licensed therapists and psychiatrists.</p>
    `,
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
    content: `
      <p>Prevention is always better than cure. Regular health check-ups can detect problems early when they're most treatable.</p>
      
      <h2>The Importance of Preventive Care</h2>
      <p>Many serious health conditions develop silently without symptoms. Regular screenings can catch these conditions early, significantly improving treatment outcomes.</p>
      
      <h2>Recommended Screenings</h2>
      <ul>
        <li>Annual physical examination</li>
        <li>Blood pressure monitoring</li>
        <li>Cholesterol testing</li>
        <li>Diabetes screening</li>
        <li>Cancer screenings (age and gender appropriate)</li>
      </ul>
      
      <h2>Cost-Effectiveness</h2>
      <p>Investing in preventive care reduces long-term healthcare costs by preventing expensive treatments for advanced diseases.</p>
      
      <h2>Making It Convenient</h2>
      <p>With telemedicine, you can schedule regular check-ups without disrupting your busy schedule. Our doctors can order necessary tests and review results remotely.</p>
    `,
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
    content: `
      <p>Understanding your prescription is crucial for safe and effective medication use. Let's break down what you need to know.</p>
      
      <h2>Reading Your Prescription</h2>
      <p>Prescriptions contain important information including the medication name, dosage, frequency, and duration of treatment. Always ask your doctor to clarify anything you don't understand.</p>
      
      <h2>Medication Safety Tips</h2>
      <ul>
        <li>Take medications exactly as prescribed</li>
        <li>Don't share prescription medications</li>
        <li>Store medications properly</li>
        <li>Check expiration dates</li>
        <li>Inform your doctor of all medications you're taking</li>
      </ul>
      
      <h2>Understanding Side Effects</h2>
      <p>All medications can have side effects. Know what to expect and when to contact your healthcare provider.</p>
      
      <h2>Generic vs. Brand Name Medications</h2>
      <p>Generic medications contain the same active ingredients as brand-name drugs and are equally effective, often at a lower cost.</p>
    `,
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
    content: `
      <p>Good nutrition is the foundation of good health. Learn how to make healthier choices while enjoying Nigerian cuisine.</p>
      
      <h2>Understanding Macronutrients</h2>
      <p>Your body needs carbohydrates, proteins, and fats in the right proportions for optimal health and energy.</p>
      
      <h2>Healthy Nigerian Diet Tips</h2>
      <ul>
        <li>Include more vegetables in your meals</li>
        <li>Choose whole grains over refined grains</li>
        <li>Limit processed foods and sugar</li>
        <li>Stay hydrated with water</li>
        <li>Practice portion control</li>
      </ul>
      
      <h2>Making Healthier Versions of Traditional Dishes</h2>
      <p>You don't have to give up your favorite foods. Simple modifications can make traditional Nigerian dishes healthier without sacrificing taste.</p>
      
      <h2>Nutrition and Disease Prevention</h2>
      <p>A balanced diet can help prevent chronic diseases like diabetes, hypertension, and heart disease.</p>
    `,
  },
];

export default function BlogPostPage() {
  const { id } = useParams();
  const articleContentRef = useRef<HTMLDivElement | null>(null);
  const article = allArticles.find((a) => a.id === Number(id));
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

  if (!article) {
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
        <Footer />
      </div>
    );
  }

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
                src={article.image}
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
              <div
                ref={articleContentRef}
                dangerouslySetInnerHTML={{ __html: sanitizedArticleContent }}
              />
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

      <Footer />
    </div>
  );
}
