import { GetStaticPaths, GetStaticProps } from "next";
import SeoHead from "@/lib/SeoHead";
import { fetchSiteSettingsContent, fetchBlogArticles, fetchAuthorBySlug, fetchAuthorProfile, type BlogArticle } from "@/sanity/lib/content";
import { authorToSlug, slugToAuthor, normalizeAuthorName } from "@/lib/slug";
import { BlogPreview } from "@/app/components/BlogPreview";
import Image from "next/image";
import BlogTopNav from "@/app/components/BlogTopNav";
import { Button } from "@/app/components/ui/button";
import { Footer } from "@/app/components/Footer";

type Props = {
  articles: BlogArticle[];
  authorName: string;
  siteSettings?: any;
  authors?: { name: string; slug: string }[];
  authorProfile?: { name?: string; shortBio?: string; image?: string | { asset?: { url?: string } }; slug?: string } | null;
  // Debug props (development only)
  debugFetchedProfile?: string | null;
  debugPostProfile?: string | null;
  debugFoundProfile?: string | null;
  debugSafeProfile?: string | null;
};

export default function AuthorPage(props: Props) {
  const { articles, authorName, siteSettings, authors } = props;
  const authorProfile = (props as any).authorProfile || null;
  // Ensure we always surface some bio text: prefer authorProfile.shortBio, then first article excerpt, then a generic line.
  const computedBio: string | null =
    (authorProfile && (authorProfile as any).shortBio) ||
    (articles && articles.length > 0 && articles[0].excerpt) ||
    null;
  const base = siteSettings?.canonicalBaseUrl || "https://mycyberclinics.com";
  const navigateHome = (e: any) => {
    e.preventDefault();
    if (typeof window !== "undefined") window.location.href = "/";
  };

  return (
    <>
      <SeoHead
        title={`Articles by ${authorName} | MyCyber Clinics`}
        description={`Read articles written by ${authorName} on MyCyber Clinics.`}
        canonicalBase={base}
        canonicalPath={`/authors/${authorToSlug(authorName)}`}
      />

      <BlogTopNav />

      <main>
        {/* Author hero / bio */}
        <section className="py-16 lg:py-20 px-6 lg:px-32 bg-gradient-to-br from-[#1C227A] to-[#36427A]">
          <div className="max-w-7xl mx-auto text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">

              <div className="flex-1">
                <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">{authorProfile?.name || authorName}</h1>
                {computedBio ? (
                  <p className="text-white/90 max-w-3xl mb-4">{computedBio}</p>
                ) : (
                  <p className="text-white/90 max-w-3xl mb-4">{`Articles by ${authorName}.`}</p>
                )}

                <div className="text-sm text-white/80">Showing {articles.length} article(s).</div>
              </div>
            </div>
          </div>
        </section>

        {/* Reuse BlogPreview to show the list in the familiar layout */}
        {articles.length > 0 ? (
          <BlogPreview articles={articles} />
        ) : (
          <section className="py-12 px-6 lg:px-32 bg-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display font-bold text-2xl text-[#1C227A] mb-4">No posts found</h2>
              <p className="text-gray-600 mb-6">There are no published posts for {authorName} yet.</p>
              <div className="flex gap-4 justify-center mb-6">
                <a href="/blog" className="px-6 py-3 bg-[#7D1FFF] text-white rounded-lg">View All Articles</a>
              </div>

              {Array.isArray(authors) && authors.length > 0 && (
                <div className="mt-8 text-left bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-semibold mb-3">Known authors (from latest posts)</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {authors.map((a) => (
                      <li key={a.slug}>
                        <a className="text-[#7D1FFF] underline" href={`/authors/${a.slug}`}>{a.name}</a> — <code className="text-xs text-gray-500">{a.slug}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer siteSettings={siteSettings} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchBlogArticles(200);
  const slugs = Array.from(new Set(posts.map((p) => authorToSlug(p.author))));

  return {
    paths: slugs.map((s) => ({ params: { author: s } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const authorSlug = String(context.params?.author || "");
  try {
    const [siteSettings, posts] = await Promise.all([
      fetchSiteSettingsContent(),
      fetchBlogArticles(200),
    ]);

    const requestedNormalized = normalizeAuthorName(slugToAuthor(authorSlug));
    const matching = posts.filter((p) => {
      const pSlug = authorToSlug(p.author);
      const pNormalized = normalizeAuthorName(p.author);
      // match by exact normalized name OR by slug equality
      return pSlug === authorSlug || (requestedNormalized && pNormalized === requestedNormalized);
    });

    // Debug logs to help trace why an author may have no matches during SSG
    // (These will appear in the terminal running `next dev`)
    // eslint-disable-next-line no-console
    console.log(`[authors page] fetched ${posts.length} posts, found ${matching.length} matching for slug: ${authorSlug}`);
    // eslint-disable-next-line no-console
    console.log(`[authors page] available author slugs: ${Array.from(new Set(posts.map((p) => authorToSlug(p.author)))).join(", ")}`);
    // eslint-disable-next-line no-console
    console.log(`[authors page] matching ids: ${matching.map((a) => a.id).join(", ")}`);
    // eslint-disable-next-line no-console
    console.log(`[authors page] matching authors: ${matching.map((a) => a.author).join(" || ")}`);

  // Additional debug: inspect candidate author profiles so we can verify which source is used

    // Build a list of known authors (name + slug) from the posts we fetched
    const authors = Array.from(
      new Map(posts.map((p) => [authorToSlug(p.author), p.author])).entries(),
    ).map(([slug, name]) => ({ name, slug }));

  // If no posts match, do not return 404 — show an empty author page instead.
  // Use the slug to create a human-friendly display name when we don't have a matching post.
  const authorName = matching.length > 0 ? matching[0].author : slugToAuthor(authorSlug);

  // eslint-disable-next-line no-console
  console.log(`[authors page] requestedNormalized: ${requestedNormalized} authorNameCandidate: ${authorName}`);

    // JSON-safe the articles: remove/convert `undefined` fields so Next can serialize props
    const safeArticles = matching.length > 0 ? matching.map((a) => JSON.parse(JSON.stringify(a))) : [];

    // Prefer canonical author doc from Sanity when available. Fall back to post-level authorProfile.
    const fetchedProfile = await fetchAuthorProfile({ slug: authorSlug, name: slugToAuthor(authorSlug) });
    // attempt to find in raw posts array
    const postWithProfile = posts.find((p) => authorToSlug(p.author) === authorSlug && (p as any).authorProfile);
    const postProfile = postWithProfile ? (postWithProfile as any).authorProfile : null;

  // Use canonical Sanity author doc if present; otherwise use post-level profile if available
  let foundProfile = fetchedProfile || postProfile || (matching[0] && (matching[0] as any).authorProfile) || null;

  // eslint-disable-next-line no-console
  console.log("[authors page] fetchedProfile:", JSON.stringify(fetchedProfile || null));
  // eslint-disable-next-line no-console
  console.log("[authors page] postProfile:", JSON.stringify(postProfile || null));
  // eslint-disable-next-line no-console
  console.log("[authors page] chosen foundProfile:", JSON.stringify(foundProfile || null));

    // JSON-safe the profile (ensure no undefined/complex objects)
    let safeProfile = foundProfile ? {
      name: foundProfile.name || null,
      // Prefer explicit shortBio; fall back to other likely fields (legacy `bio` or `description`) — we'll still overwrite with an article excerpt below if needed
      shortBio: (foundProfile as any).shortBio || (foundProfile as any).bio || (foundProfile as any).description || null,
      image: typeof (foundProfile as any).image === 'string' ? (foundProfile as any).image : ((foundProfile as any).image && (foundProfile as any).image.asset && (foundProfile as any).image.asset.url) ? (foundProfile as any).image.asset.url : null,
      slug: (foundProfile as any).slug || null,
    } : null;

    // If we have a profile but no shortBio, prefer the first article excerpt so the author hero shows useful text.
    if (safeProfile && !safeProfile.shortBio && safeArticles.length > 0) {
      safeProfile.shortBio = safeArticles[0].excerpt || null;
    }

    // Final fallback: if no profile at all, build one from the article excerpt
    if (!safeProfile && safeArticles.length > 0) {
      safeProfile = {
        name: authorName,
        shortBio: safeArticles[0].excerpt || null,
        image: null,
        slug: authorSlug,
      };
    }

    // eslint-disable-next-line no-console
    console.log("[authors page] safeProfile to be returned:", JSON.stringify(safeProfile || null));

    return {
      props: {
        articles: safeArticles,
        authorName,
        siteSettings,
        authors,
        authorProfile: safeProfile,
        // Development-only debug payloads (stringified) so we can inspect in-browser without server logs
        debugFetchedProfile: JSON.stringify(fetchedProfile || null),
        debugPostProfile: JSON.stringify(postProfile || null),
        debugFoundProfile: JSON.stringify(foundProfile || null),
        debugSafeProfile: JSON.stringify(safeProfile || null),
      },
    };
  } catch (err) {
    // On fetch error, render a page with no articles rather than a 404 so developers can still view the route.
    const authorName = slugToAuthor(authorSlug);
    return {
      props: {
        articles: [],
        authorName,
        siteSettings: null,
        authors: [],
      },
    };
  }
};
