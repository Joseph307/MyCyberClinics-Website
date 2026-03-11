import React from 'react';

// A simple Sanity Document Action that posts the current document to the
// Next.js API `/api/share-to-buffer`. This keeps the UX inside the post editor.
// The action is intentionally lightweight and untyped to avoid build friction.

export default function shareDocumentAction(props: any) {
  return {
    label: 'Share to Buffer',
    color: 'primary',
    // No custom icon to avoid extra dependencies; keep the action minimal.
    onHandle: async () => {
      try {
        const { draft, published } = props;
        const doc = draft || published || {};

        // Attempt to derive a public URL for the post. If you have a canonical
        // base URL configured via NEXT_PUBLIC_BASE_URL, use that. Otherwise,
        // this will send the document ID/slug which the sharing endpoint can
        // optionally resolve to a full URL server-side.
        const base = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_URL
          ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')
          : '';

        const slug = doc?.slug?.current || doc?.slug || doc?._id;
        const url = base ? `${base}/blog/${slug}` : `/blog/${slug}`;
        const text = doc?.title || doc?.headline || '';

        await fetch('/api/share-to-buffer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, text }),
        });

        // Tell Studio the action finished so it can close any UI state.
        props.onComplete();
      } catch (err) {
        // If something goes wrong, complete so Studio doesn't hang. In a
        // production-ready action we'd surface the error back to the editor.
        // eslint-disable-next-line no-console
        console.error('Share to Buffer failed', err);
        props.onComplete();
      }
    },
  };
}
