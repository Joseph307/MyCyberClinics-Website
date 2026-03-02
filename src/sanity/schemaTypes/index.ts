import { defineField, defineType } from "sanity";

const seoFields = defineType({
  name: "seoFields",
  title: "SEO Fields",
  type: "object",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "seoTitle" },
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
    }),
    defineField({
      name: "schemaJsonLd",
      title: "Structured Data JSON-LD",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "noIndex",
      title: "Noindex",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "includeInSitemap",
      title: "Include In Sitemap",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "logoUrl", title: "Logo URL", type: "url" }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact Phone", type: "string" }),
    defineField({ name: "socialFacebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "socialInstagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "socialLinkedIn", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "socialTwitter", title: "X URL", type: "url" }),
    defineField({ name: "socialYouTube", title: "YouTube URL", type: "url" }),
    defineField({ name: "socialTikTok", title: "TikTok URL", type: "url" }),
    defineField({ name: "socialWhatsApp", title: "WhatsApp URL", type: "url" }),
    defineField({ name: "metaTitleDefault", title: "Default Meta Title", type: "string" }),
    defineField({
      name: "metaDescriptionDefault",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "canonicalBaseUrl", title: "Canonical Base URL", type: "url" }),
    defineField({ name: "robotsTxt", title: "Robots.txt", type: "text", rows: 6 }),
    defineField({ name: "hreflangDefault", title: "Default Hreflang", type: "string" }),
    defineField({ name: "sitemapEnabled", title: "Sitemap Enabled", type: "boolean" }),
    defineField({ name: "recaptchaSiteKey", title: "Recaptcha Site Key", type: "string" }),
    defineField({
      name: "contactDestinationEmail",
      title: "Contact Destination Email",
      type: "string",
    }),
    defineField({
      name: "contactSuccessMessage",
      title: "Contact Success Message",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "primaryCtaText", title: "Primary CTA Text", type: "string" }),
    defineField({ name: "primaryCtaLink", title: "Primary CTA Link", type: "url" }),
    defineField({ name: "gaMeasurementId", title: "GA Measurement ID", type: "string" }),
    defineField({
      name: "searchConsoleVerification",
      title: "Search Console Verification",
      type: "string",
    }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "siteTitle",
      subtitle: "contactEmail",
    },
  },
});

const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 4 }),
    defineField({ name: "content", title: "Content", type: "text", rows: 12 }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "tags", title: "Tags", type: "string" }),
    defineField({ name: "authorName", title: "Author Name", type: "string" }),
    defineField({ name: "featuredImageUrl", title: "Featured Image URL", type: "url" }),
    defineField({ name: "featuredImageAlt", title: "Featured Image Alt", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Scheduled", value: "scheduled" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({ name: "publishAt", title: "Publish At", type: "datetime" }),
    defineField({
      name: "readingTimeMinutes",
      title: "Reading Time (Minutes)",
      type: "number",
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "authorName",
      media: "featuredImageUrl",
    },
  },
});

const doctor = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "specialty", title: "Specialty", type: "string" }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text", rows: 5 }),
    defineField({ name: "mdcnLicense", title: "MDCN License", type: "string" }),
    defineField({ name: "qualifications", title: "Qualifications", type: "string" }),
    defineField({
      name: "experienceYears",
      title: "Experience (Years)",
      type: "number",
    }),
    defineField({ name: "profileImageUrl", title: "Profile Image URL", type: "url" }),
    defineField({ name: "profileImageAlt", title: "Profile Image Alt", type: "string" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "twitterUrl", title: "X URL", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "displayOrder", title: "Display Order", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
  ],
});

const staticPage = defineType({
  name: "staticPage",
  title: "Static Page",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Page Key",
      type: "string",
      options: {
        list: [
          { title: "Privacy Policy", value: "privacy-policy" },
          { title: "Terms & Conditions", value: "terms-conditions" },
          { title: "Cookie Policy", value: "cookie-policy" },
          { title: "Accessibility Statement", value: "accessibility-statement" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "content", title: "Content", type: "text", rows: 12 }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
      },
      initialValue: "draft",
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
  ],
});

const mediaAsset = defineType({
  name: "mediaAsset",
  title: "Media Asset",
  type: "document",
  fields: [
    defineField({ name: "fileName", title: "File Name", type: "string" }),
    defineField({ name: "url", title: "File URL", type: "url" }),
    defineField({ name: "altText", title: "Alt Text", type: "string" }),
    defineField({ name: "contentType", title: "Content Type", type: "string" }),
    defineField({ name: "createdAt", title: "Created At", type: "datetime" }),
  ],
});

export const schemaTypes = [seoFields, siteSettings, blogPost, doctor, staticPage, mediaAsset];
