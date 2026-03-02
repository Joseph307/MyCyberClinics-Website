import type { CmsSiteSettings } from "@/app/admin/cmsTypes";
import { sanityClient } from "./client";

export type SiteSettingsContent = CmsSiteSettings;

export type BlogArticle = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
  imageAlt: string;
};

type BlogPostQueryResult = {
  _id: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  authorName?: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
  publishAt?: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  slug?: string;
};

export const fallbackSiteSettings: SiteSettingsContent = {
  siteTitle: "MyCyber Clinics",
  logoUrl: "",
  contactEmail: "support@mycyberclinics.com",
  contactPhone: "+2348012345678",
  socialFacebook: "https://www.facebook.com/share/1GRXXtqaUi/",
  socialInstagram: "https://www.instagram.com/mycyberclinic?igsh=MW9xNmpjcjlnZnE4Zw==",
  socialLinkedIn: "https://www.linkedin.com/company/my-cyberclinics/",
  socialTwitter: "https://x.com/mycyberclinics?t=QmGm3eSKyGB_yOqoOvx7Rw&s=09",
  socialYouTube: "https://youtube.com/@mycyberclinics?si=Isd2nkkntWuQqzwW",
  socialTikTok: "https://www.tiktok.com/@mycyberclinics?_t=ZS-90PUltOrbRx&_r=1",
  socialWhatsApp:
    "https://wa.me/2348012345678?text=Hello%20MyCyber%20Clinics%2C%20I%20need%20help%20with%20a%20consultation.",
  metaTitleDefault: "MyCyber Clinics | 24/7 Telehealth in Nigeria",
  metaDescriptionDefault:
    "MyCyber Clinics connects you to verified Nigerian doctors for fast, affordable telehealth consultations and continuous care.",
  canonicalBaseUrl: "https://mycyberclinics.com",
  robotsTxt: "User-agent: *\nAllow: /",
  hreflangDefault: "en-NG",
  sitemapEnabled: true,
  recaptchaSiteKey: "",
  contactDestinationEmail: "support@mycyberclinics.com",
  contactSuccessMessage: "Thanks for contacting us. We will respond shortly.",
  primaryCtaText: "Book Consultation",
  primaryCtaLink: "https://app.mycyberclinics.com/bookAppointmentScreen",
  gaMeasurementId: "",
  searchConsoleVerification: "",
  updatedAt: "2026-03-02T00:00:00.000Z",
};

export const fallbackBlogArticles: BlogArticle[] = [
  {
    id: "understanding-telemedicine-nigeria",
    title: "Understanding Telemedicine: How Virtual Healthcare Works in Nigeria",
    excerpt:
      "Learn how telemedicine is transforming healthcare delivery across Nigeria, making quality medical care accessible to everyone.",
    author: "Dr. Adaeze Okonkwo",
    date: "February 15, 2026",
    readTime: "5 min read",
    category: "Healthcare Technology",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: "Doctor using a laptop during a telemedicine consultation",
    content: `
      <p>Telemedicine is revolutionizing healthcare delivery across Nigeria, breaking down geographical barriers and making quality medical care accessible to everyone, regardless of their location.</p>
      <h2>What is Telemedicine?</h2>
      <p>Telemedicine refers to the practice of caring for patients remotely when the healthcare provider and patient are not in the same physical location. Modern technology has made remote care more sophisticated and accessible than ever before.</p>
      <h2>How Does It Work?</h2>
      <p>Through secure video consultations, patients can connect with licensed medical professionals from the comfort of their homes. Our platform maintains strong privacy and data security standards while making care more convenient.</p>
      <h2>Benefits for Nigerian Patients</h2>
      <ul>
        <li>Access to specialists without travel</li>
        <li>Reduced waiting times</li>
        <li>Lower healthcare costs</li>
        <li>Convenient scheduling</li>
        <li>Continuity of care</li>
      </ul>
    `,
  },
  {
    id: "health-myths-debunked",
    title: "5 Common Health Myths Debunked by Medical Professionals",
    excerpt:
      "Separating medical facts from fiction. Our doctors explain the truth behind common health misconceptions.",
    author: "Dr. Chinedu Eze",
    date: "February 12, 2026",
    readTime: "7 min read",
    category: "Health Education",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: "Medical team discussing health myths in a clinic",
    content: `
      <p>Medical misinformation can lead to poor health decisions. Evidence-based medicine helps patients make better choices.</p>
      <h2>Why myths persist</h2>
      <p>Health myths often spread faster than clear medical guidance because they sound simple and memorable.</p>
      <h2>What patients should do instead</h2>
      <p>Use licensed professionals, verified sources, and context-specific advice before changing your care routines.</p>
    `,
  },
  {
    id: "managing-stress-modern-nigeria",
    title: "Managing Stress and Mental Health in Modern Nigeria",
    excerpt:
      "Practical tips for maintaining mental wellness in today's fast-paced world, from Nigeria's leading mental health professionals.",
    author: "Dr. Oluwaseun Adeleke",
    date: "February 10, 2026",
    readTime: "6 min read",
    category: "Mental Health",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: "Patient relaxing during a mental wellness session",
    content: `
      <p>Mental health is just as important as physical health. In Nigeria's fast-paced environment, managing stress is crucial for overall wellbeing.</p>
      <h2>Common stress triggers</h2>
      <ul>
        <li>Traffic and commute pressure</li>
        <li>Work demands</li>
        <li>Financial concerns</li>
        <li>Family responsibilities</li>
      </ul>
      <h2>Helpful practices</h2>
      <p>Sleep, movement, boundaries, and professional support all matter. Telemedicine reduces barriers to getting help.</p>
    `,
  },
  {
    id: "preventive-healthcare-checkups",
    title: "Preventive Healthcare: Why Regular Check-ups Matter",
    excerpt:
      "Discover how preventive care can save lives and reduce healthcare costs through early detection and intervention.",
    author: "Dr. Adaeze Okonkwo",
    date: "February 8, 2026",
    readTime: "5 min read",
    category: "Preventive Care",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: "Preventive care consultation with a physician",
    content: `
      <p>Preventive healthcare reduces risk, improves outcomes, and lowers total cost of care over time.</p>
      <h2>What preventive care includes</h2>
      <ul>
        <li>Annual checkups</li>
        <li>Blood pressure checks</li>
        <li>Blood sugar screening</li>
        <li>Age-appropriate cancer screening</li>
      </ul>
    `,
  },
  {
    id: "understanding-your-prescription",
    title: "Understanding Your Prescription: A Patient's Guide",
    excerpt:
      "Everything you need to know about reading prescriptions, medication safety, and proper drug usage.",
    author: "Dr. Chinedu Eze",
    date: "February 5, 2026",
    readTime: "8 min read",
    category: "Patient Education",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: "Prescription medication and patient education materials",
    content: `
      <p>Reading prescriptions correctly is a core part of medication safety.</p>
      <h2>Check these first</h2>
      <ul>
        <li>Medication name</li>
        <li>Dosage and timing</li>
        <li>Treatment duration</li>
        <li>Known side effects</li>
      </ul>
    `,
  },
  {
    id: "nutrition-basics-nigeria",
    title: "Nutrition Basics: Eating for Better Health in Nigeria",
    excerpt:
      "A practical guide to nutrition and healthy eating habits tailored for Nigerian cuisine and lifestyle.",
    author: "Dr. Oluwaseun Adeleke",
    date: "February 2, 2026",
    readTime: "6 min read",
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: "Healthy meal with fresh vegetables",
    content: `
      <p>Nutrition is a daily lever for better health, energy, and disease prevention.</p>
      <h2>Simple changes</h2>
      <ul>
        <li>Add more vegetables</li>
        <li>Choose less processed food</li>
        <li>Drink more water</li>
        <li>Watch portion sizes</li>
      </ul>
    `,
  },
];

const siteSettingsQuery = `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
  siteTitle,
  logoUrl,
  contactEmail,
  contactPhone,
  socialFacebook,
  socialInstagram,
  socialLinkedIn,
  socialTwitter,
  socialYouTube,
  socialTikTok,
  socialWhatsApp,
  metaTitleDefault,
  metaDescriptionDefault,
  canonicalBaseUrl,
  robotsTxt,
  hreflangDefault,
  sitemapEnabled,
  recaptchaSiteKey,
  contactDestinationEmail,
  contactSuccessMessage,
  primaryCtaText,
  primaryCtaLink,
  gaMeasurementId,
  searchConsoleVerification,
  updatedAt
}`;

const blogPostsQuery = `*[_type == "blogPost" && status == "published"] | order(coalesce(publishAt, updatedAt) desc)[0...$limit]{
  _id,
  title,
  excerpt,
  content,
  category,
  authorName,
  featuredImageUrl,
  featuredImageAlt,
  publishAt,
  updatedAt,
  readingTimeMinutes,
  "slug": seo.slug.current
}`;

function formatDate(value?: string): string {
  if (!value) return "February 1, 2026";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "February 1, 2026";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function estimateReadTime(content?: string): string {
  const cleanText = (content ?? "").replace(/<[^>]*>/g, " ").trim();
  const wordCount = cleanText ? cleanText.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function mapBlogPost(post: BlogPostQueryResult): BlogArticle {
  return {
    id: post.slug || post._id,
    title: post.title || "Untitled Article",
    excerpt: post.excerpt || "",
    author: post.authorName || "MyCyber Clinics",
    date: formatDate(post.publishAt || post.updatedAt),
    readTime:
      typeof post.readingTimeMinutes === "number"
        ? `${Math.max(1, post.readingTimeMinutes)} min read`
        : estimateReadTime(post.content),
    category: post.category || "Health Education",
    image:
      post.featuredImageUrl ||
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    imageAlt: post.featuredImageAlt || post.title || "MyCyber Clinics article image",
    content:
      post.content ||
      "<p>This article is being updated in Sanity. Please check back shortly.</p>",
  };
}

export async function fetchSiteSettingsContent(): Promise<SiteSettingsContent> {
  try {
    const document = await sanityClient.fetch<Partial<SiteSettingsContent> | null>(
      siteSettingsQuery,
    );

    if (!document) {
      return fallbackSiteSettings;
    }

    return { ...fallbackSiteSettings, ...document };
  } catch {
    return fallbackSiteSettings;
  }
}

export async function fetchBlogArticles(limit = 12): Promise<BlogArticle[]> {
  try {
    const posts = await sanityClient.fetch<BlogPostQueryResult[]>(blogPostsQuery, { limit });

    if (!Array.isArray(posts) || posts.length === 0) {
      return fallbackBlogArticles.slice(0, limit);
    }

    return posts.map(mapBlogPost);
  } catch {
    return fallbackBlogArticles.slice(0, limit);
  }
}
