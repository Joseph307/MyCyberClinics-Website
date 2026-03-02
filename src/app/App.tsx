import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Keep browser history from restoring previous scroll positions between routes.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    let previousLocationKey = router.state.location.key;

    const unsubscribe = router.subscribe((state) => {
      if (state.location.key === previousLocationKey) return;
      previousLocationKey = state.location.key;

      // Wait for route content to paint, then force top-of-page position.
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    });

    return unsubscribe;
  }, []);

  return <RouterProvider router={router} />;
}
