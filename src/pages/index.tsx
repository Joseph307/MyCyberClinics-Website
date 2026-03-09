import Head from 'next/head';
import HomePage from '../app/pages/HomePage';
import { fetchSiteSettingsContent } from '@/sanity/lib/content';

export default function Page({ siteSettings }: { siteSettings?: any }) {
  const settings = siteSettings ?? { metaTitleDefault: 'MyCyber Clinics', metaDescriptionDefault: 'MyCyber Clinics - telehealth' };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteTitle || 'MyCyber Clinics',
    url: settings.canonicalBaseUrl || 'https://mycyberclinics.com',
  };

  return (
    <>
      <Head>
        <title>{settings.metaTitleDefault}</title>
        <meta name="description" content={settings.metaDescriptionDefault} />
        <link rel="canonical" href={settings.canonicalBaseUrl || 'https://mycyberclinics.com'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <HomePage />
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
