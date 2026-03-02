// This file is the entry point for the Next.js application
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
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

export default function MyApp({ Component, pageProps }: AppProps) {
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
      <div className={`${roboto.variable} ${poppins.variable}`}>
        <SpaApp />
      </div>
    </>
  );
}
