This folder contains a minimal example and instructions to add a "Share to Buffer" action in Sanity Studio.

Overview

1) We expose a server-side endpoint in the Next app at `/api/share-to-buffer` which accepts POST requests with the following JSON payload:

  {
    "url": "https://mycyberclinics.com/blog/my-article",
    "text": "My article title — short excerpt",
    "profile_ids": ["<buffer-profile-id>"],
    "media_url": "https://.../image.jpg",
    "scheduled_at": "2026-03-10T12:00:00Z"
  }

The API expects the environment variable `BUFFER_ACCESS_TOKEN` to be set in your deployment.

2) Sanity Studio: to add a button inside the Studio that calls this API, you can implement a Document Action or a small custom tool. Below is a sample document action component you can adapt and register in your `sanity.config.ts`.

Sample Document Action (TypeScript / React)

// sampleShareAction.tsx
import React, { useState } from 'react';
import { useToast } from 'sanity';

export default function ShareToBufferAction(props) {
  const { id, type, draft, published } = props.document; // check actual prop names in your Studio version
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL || 'https://mycyberclinics.com'}/blog/${draft?.seo?.slug?.current || published?.seo?.slug?.current || id}`;
    const payload = {
      url,
      text: (draft?.title || published?.title || 'MyCyber Clinics') + ' — ' + (draft?.excerpt || published?.excerpt || ''),
      profile_ids: [],
    };

    try {
      const r = await fetch('/api/share-to-buffer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await r.json();
      if (r.ok) {
        toast.push({ title: 'Shared', status: 'success', description: 'Article queued in Buffer' });
      } else {
        toast.push({ title: 'Share failed', status: 'error', description: json.error || 'Unknown' });
      }
    } catch (err) {
      toast.push({ title: 'Share error', status: 'error', description: String(err) });
    } finally {
      setLoading(false);
    }
  };

  return {
    label: 'Share → Buffer',
    onHandle: () => handleShare(),
    disabled: loading,
  };
}

Registering the action

- Import and register your action in `sanity.config.ts` by customizing `deskTool`'s `resolveDocumentActions` (refer to Sanity Studio docs for the correct API for your Studio version). The action should be returned for `blogPost` document types.

Notes

- This sample is intentionally minimal. In production you will want:
  - A UI modal to select Buffer profiles and schedule time.
  - Proper error handling and logging.
  - Permissions so only editors can call the action.
  - Storing the Buffer status/id in the blog document if you want to track it.

If you want, I can add a complete Studio plugin (modal UI + registration) to this repo — tell me and provide access to a Buffer token (for testing) or I can mock responses locally.
