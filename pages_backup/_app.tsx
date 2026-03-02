import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { initializeFirebaseAnalytics } from '../src/lib/firebase';
import '../src/styles/globals.css';

// Load the existing SPA root client-side only to avoid server-side rendering
// react-router components (they expect a RouterProvider which isn't available during SSR).
const SpaApp = dynamic(() => import('../src/app/App'), { ssr: false, loading: () => null });

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    void initializeFirebaseAnalytics();
  }, []);

  return <SpaApp />;
}
