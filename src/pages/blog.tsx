import BlogPage from '../app/pages/BlogPage';
import SeoHead, { buildCanonical } from '@/lib/SeoHead';
import { fetchSiteSettingsContent } from '@/sanity/lib/content';

export default function Blog({ siteSettings }: { siteSettings?: any }) {
  const base = siteSettings?.canonicalBaseUrl || 'https://mycyberclinics.com';

  return (
    <>
      <SeoHead
        title="Health Blog | MyCyber Clinics"
        description="Read practical health advice, telemedicine updates, and expert medical education for patients in Nigeria."
        canonicalBase={base}
        canonicalPath="/blog"
      />
      <BlogPage />
    </>
  );
}

export async function getStaticProps() {
  try {
    const siteSettings = await fetchSiteSettingsContent();
    return { props: { siteSettings } };
  } catch (e) {
    return { props: {} };
  }
}
