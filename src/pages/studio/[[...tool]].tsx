import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Simple proxy page so visiting /studio on the Next dev server
 * redirects to the Sanity Studio dev server in development (localhost:3333)
 * and in production redirects to the static built studio under /studio/index.html.
 *
 * This keeps the developer experience consistent (you can open /studio)
 * while allowing the Studio to be served independently by Sanity during dev.
 */
export default function StudioProxy() {
  const router = useRouter();

  useEffect(() => {
    // Wait for router to be ready so we can get the full path
    if (!router.isReady) return;

    const asPath = router.asPath || '/studio';
    // Trim trailing slash from the base '/studio' so we preserve nested paths
    const suffix = asPath.replace(/^\/studio/, '') || '/';

    if (process.env.NODE_ENV === 'development') {
      // Redirect to the Sanity dev server (default port 3333)
      const target = `http://localhost:3333${suffix}`;
      window.location.replace(target);
      return;
    }

    // In production (or static export preview), serve the exported studio
    // which lives under /studio/index.html after our export/copy step.
    const target = `/studio${suffix}`;
    window.location.replace(target);
  }, [router]);

  return null;
}
