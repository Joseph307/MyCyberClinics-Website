import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

const SITE_URL = 'https://mycyberclinics.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/team/doctor-adaeze.jpg`;

type SeoState = {
  title: string;
  description: string;
  canonicalPath: string;
  robots: string;
  type: 'website' | 'article'; 
};

const upsertMeta = (name: string, content: string) => {
  if (typeof document === 'undefined') return;

  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertPropertyMeta = (property: string, content: string) => {
  if (typeof document === 'undefined') return;

  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  if (typeof document === 'undefined') return;

  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const upsertJsonLd = (data: object) => {
  if (typeof document === 'undefined') return;

  const id = 'seo-jsonld';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const getSeoForPath = (pathname: string): SeoState => {
  if (pathname === '/blog') {
    return {
      title: 'Health Blog | MyCyber Clinics',
      description:
        'Read practical health advice, telemedicine updates, and expert medical education for patients in Nigeria.',
      canonicalPath: '/blog',
      robots: 'index, follow',
      type: 'website',
    };
  }

  if (pathname.startsWith('/blog/')) {
    return {
      title: 'Health Article | MyCyber Clinics',
      description:
        'Explore evidence-based healthcare guidance from licensed professionals at MyCyber Clinics.',
      canonicalPath: pathname,
      robots: 'index, follow',
      type: 'article',
    };
  }

  if (pathname === '/admin') {
    return {
      title: 'Admin | MyCyber Clinics',
      description: 'MyCyber Clinics administration console.',
      canonicalPath: '/admin',
      robots: 'noindex, nofollow, noarchive',
      type: 'website',
    };
  }

  return {
    title: 'MyCyber Clinics | 24/7 Telehealth in Nigeria',
    description:
      'Connect with verified Nigerian doctors for telehealth consultations, prescriptions, and continuous care.',
    canonicalPath: '/',
    robots: 'index, follow',
    type: 'website',
  };
};

const applySeoForPath = (pathname: string) => {
  const seo = getSeoForPath(pathname);
  const canonicalUrl = `${SITE_URL}${seo.canonicalPath}`;

  document.title = seo.title;
  upsertMeta('description', seo.description);
  upsertMeta('robots', seo.robots);
  upsertMeta('twitter:card', 'summary_large_image');
  upsertMeta('twitter:title', seo.title);
  upsertMeta('twitter:description', seo.description);
  upsertMeta('twitter:image', DEFAULT_OG_IMAGE);

  upsertPropertyMeta('og:type', seo.type);
  upsertPropertyMeta('og:site_name', 'MyCyber Clinics');
  upsertPropertyMeta('og:title', seo.title);
  upsertPropertyMeta('og:description', seo.description);
  upsertPropertyMeta('og:url', canonicalUrl);
  upsertPropertyMeta('og:image', DEFAULT_OG_IMAGE);

  upsertCanonical(canonicalUrl);

  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: 'MyCyber Clinics',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [
      'https://www.facebook.com/share/1GRXXtqaUi/',
      'https://www.linkedin.com/company/my-cyberclinics/',
      'https://www.instagram.com/mycyberclinic?igsh=MW9xNmpjcjlnZnE4Zw==',
      'https://x.com/mycyberclinics?t=QmGm3eSKyGB_yOqoOvx7Rw&s=09',
      'https://youtube.com/@mycyberclinics?si=Isd2nkkntWuQqzwW',
      'https://www.tiktok.com/@mycyberclinics?_t=ZS-90PUltOrbRx&_r=1',
    ],
  };

  if (pathname.startsWith('/blog/')) {
    upsertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: seo.title,
      description: seo.description,
      publisher: {
        '@type': 'Organization',
        name: 'MyCyber Clinics',
      },
      mainEntityOfPage: canonicalUrl,
    });
    return;
  }

  upsertJsonLd(baseSchema);
};

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Keep browser history from restoring previous scroll positions between routes.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    applySeoForPath(router.state.location.pathname);

    let previousLocationKey = router.state.location.key;

    const unsubscribe = router.subscribe((state) => {
      const locationChanged = state.location.key !== previousLocationKey;
      previousLocationKey = state.location.key;

      applySeoForPath(state.location.pathname);

      if (!locationChanged) return;

      // Wait for route content to paint, then force top-of-page position.
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    });

    return unsubscribe;
  }, []);

  return <RouterProvider router={router} />;
}
