// This file is the entry point for the Next.js application
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { initializeFirebaseAnalytics } from '../lib/firebase';
import { Roboto, Poppins } from 'next/font/google';
import '../app/globals.css'; 

// Load the existing SPA root client-side only to avoid server-side rendering
// react-router components (they expect a RouterProvider which isn't available during SSR).
const SpaApp = dynamic(() => import('../app/App'), { ssr: false, loading: () => null });

const roboto = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isStudioRoute = router.asPath.startsWith('/studio');
  // Do not mount the SPA on author pages handled by the Pages router.
  // The SPA is a client-side app that renders a full UI (including the
  // global blog listing). When visiting server-rendered pages like
  // `/authors/[author]`, we want to keep the pages router's HTML and avoid
  // mounting the SPA which would replace it. Skip the SPA when the path
  // begins with `/authors`.
  const isAuthorsRoute = router.asPath.startsWith('/authors');

  useEffect(() => {
    if (isStudioRoute) {
      return undefined;
    }

    void initializeFirebaseAnalytics();

    // Ensure the font variable classes are applied to the root element so
    // CSS variables like --font-sans and --font-display are available to
    // global styles (body, headings) even when rendering through the
    // Pages Router.
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.add(roboto.variable, poppins.variable);
      return () => root.classList.remove(roboto.variable, poppins.variable);
    }
    return undefined;
  }, [isStudioRoute]);

  if (isStudioRoute || isAuthorsRoute) {
    // Render the pages-router component directly for studio and author pages.
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>MyCyber Clinics | 24/7 Telehealth in Nigeria</title>
        <meta
          name="description"
          content="MyCyber Clinics connects you to verified Nigerian doctors for fast, affordable telehealth consultations, prescriptions, and follow-up care."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#48C9B0" />
    {/* Per-page canonical tags are added by individual pages or the client-side router.
      Avoid a static site-wide canonical here which makes every page point to the
      homepage (this causes Search Console to mark pages as 'Alternate page with proper canonical tag'). */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyCyber Clinics" />
        <meta property="og:title" content="MyCyber Clinics | 24/7 Telehealth in Nigeria" />
        <meta
          property="og:description"
          content="Get instant access to verified Nigerian doctors, digital prescriptions, and transparent healthcare pricing."
        />
        <meta property="og:url" content="https://mycyberclinics.com/" />
        <meta property="og:image" content="https://mycyberclinics.com/images/team/doctor-adaeze.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MyCyber Clinics | 24/7 Telehealth in Nigeria" />
        <meta
          name="twitter:description"
          content="Affordable telehealth in Nigeria with verified doctors and 24/7 access."
        />
        <meta name="twitter:image" content="https://mycyberclinics.com/images/team/doctor-adaeze.jpg" />
      </Head>
      <div className={`${roboto.variable} ${poppins.variable}`}>
        <SpaApp />
      </div>
    </>
  );
}
