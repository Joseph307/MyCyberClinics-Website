import React, { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { PatchEvent, set } from 'sanity';

// Use React.createElement instead of JSX to avoid any parser mismatches in
// the environment that was previously showing JSX parse errors.
export default function CanonicalInput(props: any) {
  const { value, onChange, document } = props;
  const client = useClient({ apiVersion: '2024-01-01' });
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function compute() {
      setLoading(true);
      try {
        const settings = await client.fetch("*[_type == 'siteSettings'][0]{canonicalBaseUrl, siteTitle, logoUrl}");
        const base = (settings?.canonicalBaseUrl || '').replace(/\/$/, '') || 'https://mycyberclinics.com';
        const slug = (document?.slug && document.slug.current) || (document?.seo?.slug && document.seo.slug.current) || '';
        const candidate = slug ? `${base}/blog/${slug}` : base + '/blog/';
        if (mounted) setGenerated(candidate);
        // If the canonical is empty OR equals the previously auto-generated value,
        // update it when a new candidate is computed. This lets us fill a
        // placeholder like 'https://.../blog/' initially and then replace it
        // automatically when the slug becomes available, while still allowing
        // manual editor overrides.
        const prev = (CanonicalInput as any)._lastGenerated;
        const shouldReplace = !value || value === prev || value === (base + '/blog/');
        if (shouldReplace && mounted) {
          onChange(PatchEvent.from(set(candidate)));
          try { (CanonicalInput as any)._lastGenerated = candidate; } catch (e) {/* ignore */}
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    }
    compute();
    return () => { mounted = false; };
  }, [client, document?.slug?.current, document?.seo?.slug?.current, document?.title]);

  // Secondary safety effect: sometimes Studio updates document and field
  // values in an order that makes the primary effect miss the window to
  // replace a previously auto-generated placeholder. Watch `generated` and
  // `document.slug` and replace the canonical if it's still the placeholder
  // or equals our last generated value.
  useEffect(() => {
    if (!generated) return;
    const prev = (CanonicalInput as any)._lastGenerated;
    const isPlaceholder = !value || value === prev || value.endsWith('/blog/');
    if (isPlaceholder && value !== generated) {
      onChange(PatchEvent.from(set(generated)));
      try { (CanonicalInput as any)._lastGenerated = generated; } catch (e) { /* ignore */ }
    }
  }, [generated, value, document?.slug?.current, document?.seo?.slug?.current]);

  const label = React.createElement('label', { style: { display: 'block', fontSize: 13, color: '#111827' } }, 'Canonical URL');

  const input = React.createElement('input', {
    type: 'url',
    value: value || generated || '',
    onChange: (e: any) => onChange(PatchEvent.from(set(e.target.value))),
    style: { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #E5E7EB' },
  });

  const helper = React.createElement('div', { style: { fontSize: 12, color: '#6B7280' } }, loading ? 'Computing canonical URL...' : 'Canonical URL is generated from Site Settings and the article slug. You can override it.');

  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 8 } }, label, input),
    helper,
  );
}
