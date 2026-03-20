import HomePage from '../app/pages/HomePage';
import { fetchSiteSettingsContent } from '@/sanity/lib/content';
import SeoHead from '@/lib/SeoHead';

export default function Page({ siteSettings }: { siteSettings?: any }) {
  const settings = siteSettings ?? { metaTitleDefault: 'MyCyber Clinics', metaDescriptionDefault: 'MyCyber Clinics - telehealth', canonicalBaseUrl: 'https://mycyberclinics.com' };

  return (
    <>
      <SeoHead
        title={settings.metaTitleDefault}
        description={settings.metaDescriptionDefault}
        canonicalBase={settings.canonicalBaseUrl}
        canonicalPath="/"
        image={`${settings.canonicalBaseUrl || 'https://mycyberclinics.com'}/images/team/doctor-adaeze.jpg`}
      />
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
