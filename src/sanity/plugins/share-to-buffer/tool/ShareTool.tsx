import React, {useEffect, useState} from 'react';
import {sanityClient} from '../../../lib/client';
import * as Sanity from 'sanity';

const useToast: any = (Sanity as any).useToast || (() => ({ push: (_: any) => {} }));

type Post = { _id: string; title?: string; excerpt?: string; slug?: string; image?: string };
type Channel = { id: string; service?: string; name?: string };

export default function ShareTool(): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      try {
        const q = `*[_type == "blogPost"]{_id, title, excerpt, "slug": seo.slug.current, "image": coalesce(featuredImage.asset->url, featuredImageUrl)}`;
        const res = await sanityClient.fetch<Post[]>(q);
        if (mounted) setPosts(res || []);
      } catch (err) {
        // ignore
      }
    }

    async function loadChannels() {
      try {
        const isStudioLocal = (typeof window !== 'undefined' && window.location.port === '3333');
        // Prefer an explicit functions base URL when provided (useful for production when hosting rewrites
        // to functions are not working or blocked). Set NEXT_PUBLIC_FUNCTIONS_BASE_URL to
        // "https://us-central1-my-cyber-clinics.cloudfunctions.net/api" when building.
        const fnBase = (process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL as string) || '';
        const channelsUrl = isStudioLocal
          ? 'http://localhost:3000/api/buffer/channels/'
          : (fnBase ? `${fnBase.replace(/\/$/, '')}/buffer/channels/` : '/api/buffer/channels/');
        const r = await fetch(channelsUrl);
        const json = await r.json().catch(() => null);
        if (!r.ok) {
          try { toast.push({ title: 'Could not load channels', status: 'warning', description: String(json), closable: true }); } catch (e) {}
          return;
        }
        const list = Array.isArray(json?.channels ?? json) ? (json.channels ?? json) : json?.channels ?? [];
        const normalized = (list || []).map((c: any) => ({ id: String(c.id), service: c.service, name: c.name || c.service }));
        if (mounted) {
          setChannels(normalized);
          if (normalized.length > 0) setSelectedChannel(normalized[0].id);
        }
      } catch (err) {
        try { toast.push({ title: 'Channels fetch error', status: 'error', description: String(err), closable: true }); } catch (e) {}
      }
    }

    loadPosts();
    loadChannels();

    return () => { mounted = false };
  }, []);

  const share = async (post: Post) => {
    if (!selectedChannel) {
      try { toast.push({ title: 'Select a channel', status: 'warning', description: 'Please select a Buffer channel before sharing.', closable: true }); } catch (e) {}
      return;
    }
    setLoading(post._id);
    try {
      const base = (process.env.NEXT_PUBLIC_CANONICAL_BASE_URL as string) || (typeof window !== 'undefined' ? window.location.origin : '');
      const url = `${base.replace(/\/$/, '')}/blog/${post.slug || post._id}`;
      const payload = { url, text: `${post.title}  ${post.excerpt ?? ''}`, channelId: selectedChannel, media_url: post.image };

      const isStudioLocal = (typeof window !== 'undefined' && window.location.port === '3333');
      const fnBase = (process.env.NEXT_PUBLIC_FUNCTIONS_BASE_URL as string) || '';
      const apiUrl = isStudioLocal
        ? 'http://localhost:3000/api/buffer/share-to-buffer/'
        : (fnBase ? `${fnBase.replace(/\/$/, '')}/buffer/share-to-buffer/` : '/api/buffer/share-to-buffer/');
      const resp = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await resp.json().catch(() => null);
      if (!resp.ok) {
        try { toast.push({ title: 'Share failed', status: 'error', description: String(json || resp.statusText), closable: true }); } catch (e) {}
      } else {
        try { toast.push({ title: 'Shared', status: 'success', description: 'Queued in Buffer', closable: true }); } catch (e) {}
      }
    } catch (err) {
      try { toast.push({ title: 'Share error', status: 'error', description: String(err), closable: true }); } catch (e) {}
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <h3 style={{ marginTop: 0 }}>Share to Buffer</h3>

      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          {posts.map((p) => (
            <div key={p._id} style={{ display: 'flex', gap: 12, padding: 10, borderRadius: 8, border: '1px solid #e6e6e6', marginBottom: 8 }}>
              <img src={p.image || '/images/default-thumb.png'} alt="thumb" style={{ width: 120, height: 72, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{p.title}</strong>
                  <div>
                    <button
                      onClick={() => share(p)}
                      disabled={!!loading}
                      style={{
                        padding: '6px 10px',
                        backgroundColor: loading === p._id ? '#9CA3AF' : '#1D4ED8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        boxShadow: loading ? 'none' : '0 1px 0 rgba(0,0,0,0.1)'
                      }}
                    >
                      {loading === p._id ? 'Sharing' : 'Share'}
                    </button>
                  </div>
                </div>
                <div style={{ color: '#6B7280', marginTop: 6 }}>{p.excerpt}</div>
              </div>
            </div>
          ))}
        </div>

        <aside style={{ width: 260 }}>
          <div style={{ marginBottom: 8 }}><strong>Buffer channel</strong></div>
            {channels.length === 0 ? (
            <div style={{ color: '#6B7280' }}>No channels found</div>
          ) : (
            <select value={selectedChannel ?? ''} onChange={(e) => setSelectedChannel(e.target.value)} style={{ width: '100%', padding: 8 }}>
              {channels.map((ch) => <option key={ch.id} value={ch.id}>{ch.service || ch.name || ch.id}</option>)}
            </select>
          )}
        </aside>
      </div>
    </div>
  );
}
