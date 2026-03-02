import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  FileText,
  Globe,
  Image as ImageIcon,
  LogOut,
  Mail,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { AdminAuthProvider, useAdminAuth } from "../admin/auth";
import { useNoIndexMeta } from "../admin/useNoIndexMeta";
import {
  createCmsDocument,
  deleteCmsDocument,
  listCmsDocuments,
  loadSiteSettings,
  saveSiteSettings,
  updateCmsDocument,
  uploadMediaAndCreateRecord,
} from "../admin/cmsApi";
import type {
  CmsBlogPost,
  CmsDoctor,
  CmsMediaAsset,
  CmsRecord,
  CmsSeoFields,
  CmsSiteSettings,
  CmsStaticPage,
} from "../admin/cmsTypes";
import { defaultSeoFields } from "../admin/cmsTypes";
import type { AdminRole } from "../admin/auth";

type AdminTab = "overview" | "blogs" | "doctors" | "pages" | "settings" | "media" | "analytics";

const BLOG_COLLECTION = "blog_posts";
const DOCTOR_COLLECTION = "featured_doctors";
const PAGE_COLLECTION = "static_pages";
const MEDIA_COLLECTION = "media_assets";

const ADMIN_TABS: Array<{
  key: AdminTab;
  label: string;
  icon: typeof Settings;
}> = [
  { key: "overview", label: "Overview", icon: ShieldCheck },
  { key: "blogs", label: "Blog", icon: FileText },
  { key: "doctors", label: "Featured Doctors", icon: Stethoscope },
  { key: "pages", label: "Policy Pages", icon: Globe },
  { key: "settings", label: "Site Settings", icon: Settings },
  { key: "media", label: "Media Library", icon: ImageIcon },
  { key: "analytics", label: "Analytics/SEO", icon: BarChart3 },
];

function nowIso() {
  return new Date().toISOString();
}

function defaultBlogForm(): CmsBlogPost {
  return {
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    authorName: "",
    featuredImageUrl: "",
    featuredImageAlt: "",
    status: "draft",
    publishAt: "",
    seo: defaultSeoFields(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
}

function defaultDoctorForm(): CmsDoctor {
  return {
    fullName: "",
    specialty: "",
    shortBio: "",
    profileImageUrl: "",
    profileImageAlt: "",
    linkedinUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    featured: false,
    displayOrder: 0,
    status: "draft",
    seo: defaultSeoFields(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
}

function defaultStaticPageForm(): CmsStaticPage {
  return {
    key: "privacy-policy",
    title: "",
    content: "",
    status: "draft",
    seo: defaultSeoFields(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
  };
}

function defaultSettingsForm(): CmsSiteSettings {
  return {
    siteTitle: "MyCyber Clinics",
    logoUrl: "",
    contactEmail: "",
    contactPhone: "",
    socialFacebook: "",
    socialInstagram: "",
    socialLinkedIn: "",
    socialTwitter: "",
    socialYouTube: "",
    socialTikTok: "",
    metaTitleDefault: "",
    metaDescriptionDefault: "",
    canonicalBaseUrl: "",
    robotsTxt: "User-agent: *\nAllow: /",
    hreflangDefault: "en-NG",
    sitemapEnabled: true,
    recaptchaSiteKey: "",
    contactDestinationEmail: "",
    contactSuccessMessage: "Thanks for contacting us. We will respond shortly.",
    primaryCtaText: "Book Consultation",
    primaryCtaLink: "https://app.mycyberclinics.com/bookAppointmentScreen",
    gaMeasurementId: "",
    searchConsoleVerification: "",
    updatedAt: nowIso(),
  };
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-['Univa_Nova',sans-serif] text-2xl font-bold text-[#2C3E50]">{title}</h2>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}

function SeoFieldsEditor({
  value,
  onChange,
}: {
  value: CmsSeoFields;
  onChange: (next: CmsSeoFields) => void;
}) {
  return (
    <fieldset className="rounded-xl border border-[#ECF0F1] p-4 space-y-3">
      <legend className="px-2 text-sm font-semibold text-[#2C3E50]">SEO Fields</legend>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm text-[#2C3E50]">
          SEO Title
          <input
            value={value.seoTitle}
            onChange={(event) => onChange({ ...value, seoTitle: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
        <label className="text-sm text-[#2C3E50]">
          URL Slug
          <input
            value={value.slug}
            onChange={(event) => onChange({ ...value, slug: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
      </div>
      <label className="text-sm text-[#2C3E50] block">
        Meta Description
        <textarea
          rows={2}
          value={value.metaDescription}
          onChange={(event) => onChange({ ...value, metaDescription: event.target.value })}
          className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
        />
      </label>
      <label className="text-sm text-[#2C3E50] block">
        Canonical URL Override
        <input
          value={value.canonicalUrl}
          onChange={(event) => onChange({ ...value, canonicalUrl: event.target.value })}
          className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
        />
      </label>
      <label className="text-sm text-[#2C3E50] block">
        Structured Data (JSON-LD)
        <textarea
          rows={4}
          value={value.schemaJsonLd}
          onChange={(event) => onChange({ ...value, schemaJsonLd: event.target.value })}
          className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 font-mono text-xs"
        />
      </label>
      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-[#2C3E50]">
          <input
            type="checkbox"
            checked={value.noIndex}
            onChange={(event) => onChange({ ...value, noIndex: event.target.checked })}
          />
          Noindex
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-[#2C3E50]">
          <input
            type="checkbox"
            checked={value.includeInSitemap}
            onChange={(event) => onChange({ ...value, includeInSitemap: event.target.checked })}
          />
          Include in sitemap
        </label>
      </div>
    </fieldset>
  );
}

function AdminLogin() {
  const { login, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch {
      setError("Login failed. Confirm credentials and CMS role assignment.");
    }
  };

  return (
    <main className="min-h-screen bg-[#ECF0F1] px-6 py-12 flex items-center justify-center">
      <section className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-[#ECF0F1] p-8">
        <h1 className="font-['Univa_Nova',sans-serif] text-3xl font-bold text-[#2C3E50] mb-2">CMS Admin</h1>
        <p className="text-sm text-gray-600 mb-6">Restricted access. Authorized users only.</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-[#2C3E50]">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="block text-sm font-semibold text-[#2C3E50]">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full bg-[#48C9B0] hover:bg-[#14A9CC] text-white" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </section>
    </main>
  );
}

function BlogManager({ role }: { role: AdminRole }) {
  const canDelete = role === "admin";
  const [items, setItems] = useState<CmsRecord<CmsBlogPost>[]>([]);
  const [form, setForm] = useState<CmsBlogPost>(defaultBlogForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const data = await listCmsDocuments<CmsBlogPost>(BLOG_COLLECTION);
    setItems(data.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.authorName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const resetForm = () => {
    setForm(defaultBlogForm());
    setEditingId(null);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    const payload: CmsBlogPost = {
      ...form,
      updatedAt: nowIso(),
      createdAt: editingId ? form.createdAt : nowIso(),
    };
    if (editingId) {
      await updateCmsDocument<CmsBlogPost>(BLOG_COLLECTION, editingId, payload);
    } else {
      await createCmsDocument<CmsBlogPost>(BLOG_COLLECTION, payload);
    }
    await load();
    resetForm();
    setSaving(false);
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="rounded-xl border border-[#ECF0F1] bg-white p-4">
        <SectionTitle
          title="Blog Content"
          description="Create, edit, publish, schedule, and optimize blog posts for SEO."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title/author"
              className="w-full rounded-lg border border-[#ECF0F1] pl-9 pr-3 py-2 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-lg border border-[#ECF0F1] px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-lg border border-[#ECF0F1] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#2C3E50]">{item.title}</p>
                  <p className="text-xs text-gray-600">
                    {item.authorName} • {item.category || "Uncategorized"} • {item.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm(item);
                    }}
                  >
                    Edit
                  </Button>
                  {canDelete ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs border-red-300 text-red-700"
                      onClick={() => void deleteCmsDocument(BLOG_COLLECTION, item.id).then(load)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <form className="rounded-xl border border-[#ECF0F1] bg-white p-4 space-y-3" onSubmit={submit}>
        <SectionTitle
          title={editingId ? "Edit Blog Post" : "New Blog Post"}
          description="People-first content: use meaningful headlines, clear byline, and genuinely useful information."
        />
        <label className="block text-sm text-[#2C3E50]">
          Title
          <input
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
        <label className="block text-sm text-[#2C3E50]">
          Excerpt
          <textarea
            rows={2}
            value={form.excerpt}
            onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
        <label className="block text-sm text-[#2C3E50]">
          Content
          <textarea
            rows={6}
            value={form.content}
            onChange={(event) => setForm({ ...form, content: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[#2C3E50]">
            Category
            <input
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Tags (comma-separated)
            <input
              value={form.tags}
              onChange={(event) => setForm({ ...form, tags: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Author
            <input
              value={form.authorName}
              onChange={(event) => setForm({ ...form, authorName: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as CmsBlogPost["status"] })
              }
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </label>
          <label className="text-sm text-[#2C3E50] md:col-span-2">
            Schedule Publish Time
            <input
              type="datetime-local"
              value={form.publishAt}
              onChange={(event) => setForm({ ...form, publishAt: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[#2C3E50]">
            Featured Image URL
            <input
              value={form.featuredImageUrl}
              onChange={(event) => setForm({ ...form, featuredImageUrl: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Featured Image Alt Text
            <input
              value={form.featuredImageAlt}
              onChange={(event) => setForm({ ...form, featuredImageAlt: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
        </div>
        <SeoFieldsEditor value={form.seo} onChange={(seo) => setForm({ ...form, seo })} />
        <div className="flex gap-2">
          <Button type="submit" className="bg-[#48C9B0] hover:bg-[#14A9CC] text-white" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : editingId ? "Update Post" : "Create Post"}
          </Button>
          <Button type="button" variant="outline" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}

function DoctorsManager({ role }: { role: AdminRole }) {
  const canDelete = role === "admin";
  const [items, setItems] = useState<CmsRecord<CmsDoctor>[]>([]);
  const [form, setForm] = useState<CmsDoctor>(defaultDoctorForm());
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const data = await listCmsDocuments<CmsDoctor>(DOCTOR_COLLECTION);
    setItems(data.sort((a, b) => a.displayOrder - b.displayOrder));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const payload: CmsDoctor = {
      ...form,
      updatedAt: nowIso(),
      createdAt: editingId ? form.createdAt : nowIso(),
    };
    if (editingId) {
      await updateCmsDocument<CmsDoctor>(DOCTOR_COLLECTION, editingId, payload);
    } else {
      await createCmsDocument<CmsDoctor>(DOCTOR_COLLECTION, payload);
    }
    setForm(defaultDoctorForm());
    setEditingId(null);
    await load();
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="rounded-xl border border-[#ECF0F1] bg-white p-4">
        <SectionTitle title="Featured Doctors" description="Manage doctor profiles, featured status, and publish controls." />
        <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
          {items.map((item) => (
            <article key={item.id} className="rounded-lg border border-[#ECF0F1] p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#2C3E50]">{item.fullName}</p>
                  <p className="text-xs text-gray-600">
                    {item.specialty} • order {item.displayOrder} • {item.status}
                    {item.featured ? " • featured" : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm(item);
                    }}
                  >
                    Edit
                  </Button>
                  {canDelete ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700"
                      onClick={() => void deleteCmsDocument(DOCTOR_COLLECTION, item.id).then(load)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <form className="rounded-xl border border-[#ECF0F1] bg-white p-4 space-y-3" onSubmit={submit}>
        <SectionTitle title={editingId ? "Edit Doctor" : "Add Doctor"} description="Profile image alt text is required for SEO and accessibility." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[#2C3E50]">
            Full Name
            <input
              required
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Specialty
            <input
              value={form.specialty}
              onChange={(event) => setForm({ ...form, specialty: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50] md:col-span-2">
            Short Bio
            <textarea
              rows={4}
              value={form.shortBio}
              onChange={(event) => setForm({ ...form, shortBio: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Profile Image URL
            <input
              value={form.profileImageUrl}
              onChange={(event) => setForm({ ...form, profileImageUrl: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Profile Image Alt
            <input
              value={form.profileImageAlt}
              onChange={(event) => setForm({ ...form, profileImageAlt: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            LinkedIn URL
            <input
              value={form.linkedinUrl}
              onChange={(event) => setForm({ ...form, linkedinUrl: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Instagram URL
            <input
              value={form.instagramUrl}
              onChange={(event) => setForm({ ...form, instagramUrl: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Twitter URL
            <input
              value={form.twitterUrl}
              onChange={(event) => setForm({ ...form, twitterUrl: event.target.value })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Display Order
            <input
              type="number"
              value={form.displayOrder}
              onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) || 0 })}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Publish Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as CmsDoctor["status"] })
              }
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-[#2C3E50]">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => setForm({ ...form, featured: event.target.checked })}
          />
          Mark as featured doctor
        </label>
        <SeoFieldsEditor value={form.seo} onChange={(seo) => setForm({ ...form, seo })} />
        <div className="flex gap-2">
          <Button type="submit" className="bg-[#48C9B0] hover:bg-[#14A9CC] text-white">
            <Save className="w-4 h-4 mr-2" />
            {editingId ? "Update Doctor" : "Add Doctor"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setForm(defaultDoctorForm());
              setEditingId(null);
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}

function PolicyPagesManager({ role }: { role: AdminRole }) {
  const canDelete = role === "admin";
  const [items, setItems] = useState<CmsRecord<CmsStaticPage>[]>([]);
  const [form, setForm] = useState<CmsStaticPage>(defaultStaticPageForm());
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    const data = await listCmsDocuments<CmsStaticPage>(PAGE_COLLECTION);
    setItems(data.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const payload: CmsStaticPage = {
      ...form,
      updatedAt: nowIso(),
      createdAt: editingId ? form.createdAt : nowIso(),
    };
    if (editingId) {
      await updateCmsDocument<CmsStaticPage>(PAGE_COLLECTION, editingId, payload);
    } else {
      await createCmsDocument<CmsStaticPage>(PAGE_COLLECTION, payload);
    }
    setForm(defaultStaticPageForm());
    setEditingId(null);
    await load();
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="rounded-xl border border-[#ECF0F1] bg-white p-4">
        <SectionTitle title="Static Legal & Policy Pages" description="Privacy, Terms, Cookie, Accessibility and related static trust pages." />
        <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
          {items.map((item) => (
            <article key={item.id} className="rounded-lg border border-[#ECF0F1] p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#2C3E50]">{item.title || item.key}</p>
                  <p className="text-xs text-gray-600">
                    {item.key} • {item.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm(item);
                    }}
                  >
                    Edit
                  </Button>
                  {canDelete ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700"
                      onClick={() => void deleteCmsDocument(PAGE_COLLECTION, item.id).then(load)}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <form className="rounded-xl border border-[#ECF0F1] bg-white p-4 space-y-3" onSubmit={submit}>
        <SectionTitle title={editingId ? "Edit Page" : "New Policy Page"} description="Supports rich text blocks via markdown/HTML content fields for now." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[#2C3E50]">
            Page Key
            <select
              value={form.key}
              onChange={(event) =>
                setForm({ ...form, key: event.target.value as CmsStaticPage["key"] })
              }
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            >
              <option value="privacy-policy">Privacy Policy</option>
              <option value="terms-conditions">Terms & Conditions</option>
              <option value="cookie-policy">Cookie Policy</option>
              <option value="accessibility-statement">Accessibility Statement</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="text-sm text-[#2C3E50]">
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as CmsStaticPage["status"] })
              }
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
        <label className="block text-sm text-[#2C3E50]">
          Page Title
          <input
            required
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
        <label className="block text-sm text-[#2C3E50]">
          Content
          <textarea
            rows={10}
            value={form.content}
            onChange={(event) => setForm({ ...form, content: event.target.value })}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2"
          />
        </label>
        <SeoFieldsEditor value={form.seo} onChange={(seo) => setForm({ ...form, seo })} />
        <div className="flex gap-2">
          <Button type="submit" className="bg-[#48C9B0] hover:bg-[#14A9CC] text-white">
            <Save className="w-4 h-4 mr-2" />
            {editingId ? "Update Page" : "Create Page"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setForm(defaultStaticPageForm());
              setEditingId(null);
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  );
}

function SiteSettingsManager({ role }: { role: AdminRole }) {
  const canManageSettings = role === "admin";
  const [form, setForm] = useState<CmsSiteSettings>(defaultSettingsForm());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const existing = await loadSiteSettings();
      if (existing) {
        setForm(existing);
      }
    };
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    if (!canManageSettings) {
      return;
    }
    setSaving(true);
    await saveSiteSettings({ ...form, updatedAt: nowIso() });
    setMessage("Settings saved.");
    setSaving(false);
  };

  return (
    <form className="rounded-xl border border-[#ECF0F1] bg-white p-4 space-y-4" onSubmit={save}>
      <SectionTitle title="General Site Settings" description="Global branding, contact, social links, SEO defaults, robots/sitemap and form routing." />
      {!canManageSettings ? (
        <p className="rounded-lg bg-[#FFC857]/20 px-3 py-2 text-sm text-[#2C3E50]">
          Editor access: read-only for global settings.
        </p>
      ) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-sm text-[#2C3E50]">
          Site Title
          <input
            value={form.siteTitle}
            onChange={(event) => setForm({ ...form, siteTitle: event.target.value })}
            disabled={!canManageSettings}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
          />
        </label>
        <label className="text-sm text-[#2C3E50]">
          Logo URL
          <input
            value={form.logoUrl}
            onChange={(event) => setForm({ ...form, logoUrl: event.target.value })}
            disabled={!canManageSettings}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
          />
        </label>
        <label className="text-sm text-[#2C3E50]">
          Contact Email
          <input
            value={form.contactEmail}
            onChange={(event) => setForm({ ...form, contactEmail: event.target.value })}
            disabled={!canManageSettings}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
          />
        </label>
        <label className="text-sm text-[#2C3E50]">
          Contact Phone
          <input
            value={form.contactPhone}
            onChange={(event) => setForm({ ...form, contactPhone: event.target.value })}
            disabled={!canManageSettings}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
          />
        </label>
        <label className="text-sm text-[#2C3E50]">
          Primary CTA Text
          <input
            value={form.primaryCtaText}
            onChange={(event) => setForm({ ...form, primaryCtaText: event.target.value })}
            disabled={!canManageSettings}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
          />
        </label>
        <label className="text-sm text-[#2C3E50]">
          Primary CTA Link
          <input
            value={form.primaryCtaLink}
            onChange={(event) => setForm({ ...form, primaryCtaLink: event.target.value })}
            disabled={!canManageSettings}
            className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
          />
        </label>
      </div>

      <fieldset className="rounded-xl border border-[#ECF0F1] p-3">
        <legend className="px-2 text-sm font-semibold text-[#2C3E50]">Social Links</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ["Facebook", "socialFacebook"],
            ["Instagram", "socialInstagram"],
            ["LinkedIn", "socialLinkedIn"],
            ["Twitter", "socialTwitter"],
            ["YouTube", "socialYouTube"],
            ["TikTok", "socialTikTok"],
          ].map(([label, key]) => (
            <label key={key} className="text-sm text-[#2C3E50]">
              {label}
              <input
                value={form[key as keyof CmsSiteSettings] as string}
                onChange={(event) =>
                  setForm({ ...form, [key]: event.target.value } as CmsSiteSettings)
                }
                disabled={!canManageSettings}
                className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-[#ECF0F1] p-3">
        <legend className="px-2 text-sm font-semibold text-[#2C3E50]">Global SEO</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[#2C3E50]">
            Meta Title Default
            <input
              value={form.metaTitleDefault}
              onChange={(event) => setForm({ ...form, metaTitleDefault: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Canonical Base URL
            <input
              value={form.canonicalBaseUrl}
              onChange={(event) => setForm({ ...form, canonicalBaseUrl: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50] md:col-span-2">
            Meta Description Default
            <textarea
              rows={2}
              value={form.metaDescriptionDefault}
              onChange={(event) =>
                setForm({ ...form, metaDescriptionDefault: event.target.value })
              }
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50] md:col-span-2">
            robots.txt
            <textarea
              rows={4}
              value={form.robotsTxt}
              onChange={(event) => setForm({ ...form, robotsTxt: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 font-mono text-xs disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            hreflang default
            <input
              value={form.hreflangDefault}
              onChange={(event) => setForm({ ...form, hreflangDefault: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-[#2C3E50] mt-7">
            <input
              type="checkbox"
              checked={form.sitemapEnabled}
              onChange={(event) => setForm({ ...form, sitemapEnabled: event.target.checked })}
              disabled={!canManageSettings}
            />
            Enable sitemap
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-xl border border-[#ECF0F1] p-3">
        <legend className="px-2 text-sm font-semibold text-[#2C3E50]">Forms & Analytics</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="text-sm text-[#2C3E50]">
            Contact Destination Email
            <input
              value={form.contactDestinationEmail}
              onChange={(event) =>
                setForm({ ...form, contactDestinationEmail: event.target.value })
              }
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            reCAPTCHA Site Key
            <input
              value={form.recaptchaSiteKey}
              onChange={(event) => setForm({ ...form, recaptchaSiteKey: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            GA Measurement ID
            <input
              value={form.gaMeasurementId}
              onChange={(event) => setForm({ ...form, gaMeasurementId: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50]">
            Search Console Verification
            <input
              value={form.searchConsoleVerification}
              onChange={(event) =>
                setForm({ ...form, searchConsoleVerification: event.target.value })
              }
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
          <label className="text-sm text-[#2C3E50] md:col-span-2">
            Contact Success Message
            <textarea
              rows={2}
              value={form.contactSuccessMessage}
              onChange={(event) => setForm({ ...form, contactSuccessMessage: event.target.value })}
              disabled={!canManageSettings}
              className="mt-1 w-full rounded-lg border border-[#ECF0F1] px-3 py-2 disabled:bg-gray-100"
            />
          </label>
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <Button type="submit" className="bg-[#48C9B0] hover:bg-[#14A9CC] text-white" disabled={!canManageSettings || saving}>
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save Settings"}
        </Button>
        {message ? <span className="text-sm text-green-700">{message}</span> : null}
      </div>
    </form>
  );
}

function MediaLibraryManager({ role }: { role: AdminRole }) {
  const canDelete = role === "admin";
  const [items, setItems] = useState<CmsRecord<CmsMediaAsset>[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const data = await listCmsDocuments<CmsMediaAsset>(MEDIA_COLLECTION);
    setItems(data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const upload = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      return;
    }
    setUploading(true);
    await uploadMediaAndCreateRecord(file, altText);
    setFile(null);
    setAltText("");
    await load();
    setUploading(false);
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="rounded-xl border border-[#ECF0F1] bg-white p-4">
        <SectionTitle title="Media Library" description="Upload image/video assets and manage alt text metadata." />
        <form className="space-y-3 mb-4" onSubmit={upload}>
          <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
          <input
            placeholder="Alt text"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            className="w-full rounded-lg border border-[#ECF0F1] px-3 py-2 text-sm"
          />
          <Button type="submit" className="bg-[#48C9B0] hover:bg-[#14A9CC] text-white" disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Asset"}
          </Button>
        </form>
        <p className="text-xs text-gray-600">
          Uploaded files become available as URLs for insertion in blog posts, doctors, and static pages.
        </p>
      </div>
      <div className="rounded-xl border border-[#ECF0F1] bg-white p-4">
        <SectionTitle title="Assets" description="Search, copy URL, and remove stale entries." />
        <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
          {items.map((item) => (
            <article key={item.id} className="rounded-lg border border-[#ECF0F1] p-3">
              <p className="font-semibold text-sm text-[#2C3E50]">{item.fileName}</p>
              <p className="text-xs text-gray-600 mb-2">{item.altText || "No alt text"}</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void navigator.clipboard.writeText(item.url)}
                >
                  Copy URL
                </Button>
                {canDelete ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-300 text-red-700"
                    onClick={() => void deleteCmsDocument(MEDIA_COLLECTION, item.id).then(load)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OverviewPanel() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[
        {
          icon: FileText,
          title: "Blog Workflow",
          description: "Draft, schedule, publish/unpublish, categories, tags, byline, and SEO metadata.",
        },
        {
          icon: Stethoscope,
          title: "Featured Doctors",
          description: "Manage profile content, publish state, display order, featured flag, and profile SEO.",
        },
        {
          icon: Globe,
          title: "Policy Pages",
          description: "Privacy, Terms, Cookie, Accessibility pages with rich text and per-page metadata.",
        },
        {
          icon: Settings,
          title: "Global Settings",
          description: "Site title, logo, contact/social links, robots/sitemap controls, and canonical defaults.",
        },
        {
          icon: ImageIcon,
          title: "Media Library",
          description: "Upload assets, assign alt text, and reuse URLs across page content and blogs.",
        },
        {
          icon: Mail,
          title: "Lead Capture Controls",
          description: "Contact routing, success messages, CTA link targets, and anti-spam settings.",
        },
      ].map((card) => (
        <article key={card.title} className="rounded-xl border border-[#ECF0F1] bg-white p-5">
          <div className="w-9 h-9 rounded-lg bg-[#14A9CC]/10 flex items-center justify-center mb-2">
            <card.icon className="w-5 h-5 text-[#14A9CC]" />
          </div>
          <h3 className="font-semibold text-[#2C3E50]">{card.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{card.description}</p>
        </article>
      ))}
    </section>
  );
}

function AnalyticsPanel() {
  return (
    <section className="rounded-xl border border-[#ECF0F1] bg-white p-5">
      <SectionTitle
        title="Search & Analytics Operational Checklist"
        description="Use this alongside your dashboard integrations (Search Console/GA) to maintain crawlability and discoverability."
      />
      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        <li>Confirm key public pages return HTTP 200 and are not blocked by robots directives.</li>
        <li>Validate sitemap generation and indexed URL coverage in Search Console.</li>
        <li>Maintain canonical consistency and avoid duplicate slug collisions across published entries.</li>
        <li>Ensure all featured/public images include descriptive alt text and meaningful file names.</li>
        <li>Track top pages, crawl errors, and regressions after major content updates.</li>
      </ul>
    </section>
  );
}

function AdminDashboard() {
  const { user, role, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  return (
    <main className="min-h-screen bg-[#ECF0F1] px-6 py-8 lg:px-10">
      <header className="mb-4 rounded-xl bg-white border border-[#ECF0F1] p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-['Univa_Nova',sans-serif] text-3xl font-bold text-[#2C3E50]">MyCyberClinics CMS</h1>
          <p className="text-sm text-gray-600">
            {user?.email} ({role})
          </p>
        </div>
        <Button variant="outline" className="border-[#2C3E50] text-[#2C3E50]" onClick={() => void logout()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </header>

      <nav className="mb-5 overflow-x-auto hide-scrollbar">
        <div className="inline-flex rounded-xl border border-[#ECF0F1] bg-white p-1 gap-1">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeTab === tab.key ? "bg-[#14A9CC] text-white" : "text-[#2C3E50] hover:bg-[#ECF0F1]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {activeTab === "overview" ? <OverviewPanel /> : null}
      {activeTab === "blogs" ? <BlogManager role={role} /> : null}
      {activeTab === "doctors" ? <DoctorsManager role={role} /> : null}
      {activeTab === "pages" ? <PolicyPagesManager role={role} /> : null}
      {activeTab === "settings" ? <SiteSettingsManager role={role} /> : null}
      {activeTab === "media" ? <MediaLibraryManager role={role} /> : null}
      {activeTab === "analytics" ? <AnalyticsPanel /> : null}
    </main>
  );
}

function AdminContent() {
  useNoIndexMeta();
  const { user, role, loading, logout } = useAdminAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-[#ECF0F1] flex items-center justify-center">
        <p className="text-[#2C3E50]">Loading admin...</p>
      </main>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  if (!role) {
    return (
      <main className="min-h-screen bg-[#ECF0F1] px-6 py-12 flex items-center justify-center">
        <section className="w-full max-w-lg rounded-2xl bg-white border border-[#ECF0F1] p-8 shadow-lg">
          <h1 className="font-['Univa_Nova',sans-serif] text-2xl font-bold text-[#2C3E50] mb-2">Access Denied</h1>
          <p className="text-sm text-gray-700 mb-6">
            This account is authenticated but does not have a CMS role claim.
          </p>
          <p className="text-xs text-gray-500 mb-6">
            Required Firebase custom claim: <code>role = admin</code> or <code>role = editor</code>.
          </p>
          <Button variant="outline" className="border-[#2C3E50] text-[#2C3E50]" onClick={() => void logout()}>
            Sign Out
          </Button>
        </section>
      </main>
    );
  }

  return <AdminDashboard />;
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminContent />
    </AdminAuthProvider>
  );
}
