// This file is the entry point for the Next.js application
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
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

export default function MyApp() {
  useEffect(() => {
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
  }, []);

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
        <link rel="canonical" href="https://mycyberclinics.com/" />
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
