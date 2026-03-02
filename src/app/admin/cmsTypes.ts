export type CmsSeoFields = {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  schemaJsonLd: string;
  noIndex: boolean;
  includeInSitemap: boolean;
};

export type CmsBlogPost = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  authorName: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  status: "draft" | "published" | "scheduled";
  publishAt: string;
  seo: CmsSeoFields;
  createdAt: string;
  updatedAt: string;
};

export type CmsDoctor = {
  fullName: string;
  specialty: string;
  shortBio: string;
  profileImageUrl: string;
  profileImageAlt: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  featured: boolean;
  displayOrder: number;
  status: "draft" | "published";
  seo: CmsSeoFields;
  createdAt: string;
  updatedAt: string;
};

export type CmsStaticPage = {
  key: "privacy-policy" | "terms-conditions" | "cookie-policy" | "accessibility-statement" | "other";
  title: string;
  content: string;
  status: "draft" | "published";
  seo: CmsSeoFields;
  createdAt: string;
  updatedAt: string;
};

export type CmsSiteSettings = {
  siteTitle: string;
  logoUrl: string;
  contactEmail: string;
  contactPhone: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedIn: string;
  socialTwitter: string;
  socialYouTube: string;
  socialTikTok: string;
  socialWhatsApp: string;
  metaTitleDefault: string;
  metaDescriptionDefault: string;
  canonicalBaseUrl: string;
  robotsTxt: string;
  hreflangDefault: string;
  sitemapEnabled: boolean;
  recaptchaSiteKey: string;
  contactDestinationEmail: string;
  contactSuccessMessage: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  gaMeasurementId: string;
  searchConsoleVerification: string;
  updatedAt: string;
};

export type CmsMediaAsset = {
  fileName: string;
  url: string;
  altText: string;
  contentType: string;
  createdAt: string;
};

export type CmsRecord<T> = T & {
  id: string;
};

export function defaultSeoFields(): CmsSeoFields {
  return {
    seoTitle: "",
    metaDescription: "",
    slug: "",
    canonicalUrl: "",
    schemaJsonLd: "",
    noIndex: false,
    includeInSitemap: true,
  };
}
