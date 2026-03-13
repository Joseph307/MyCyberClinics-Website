import React, { useEffect, useState } from 'react';
import { useClient } from 'sanity';
import { PatchEvent, set } from 'sanity';

// Use createElement to avoid JSX parsing issues seen previously in this
// environment. Behavior mirrors the JSX implementation: compute a JSON-LD
// snippet and populate the field if empty, while allowing manual overrides.
export default function AutoJsonLdInput(props: any) {
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
  // Support slug stored at top-level or inside seo.slug (legacy vs new schema).
  const slug = (document?.slug && document.slug.current) || (document?.seo && document.seo.slug && document.seo.slug.current) || '';
        const url = slug ? `${base}/blog/${slug}` : `${base}/blog/`;

        const headline = document?.title || '';
        const description = document?.excerpt || '';
        const datePublished = (document?.publishAt || document?.createdAt || document?.updatedAt || '').slice(0, 10);
        const dateModified = (document?.updatedAt || document?.publishAt || document?.createdAt || '').slice(0, 10);
        const keywords = (document?.tags || []).map((t: any) => (typeof t === 'string' ? t : t.title || t?.title || t?._ref)).filter(Boolean);

        const publisherLogo = settings?.logoUrl || `${base}/_next/static/media/log_o-removebg-cropped.png`;

        const json: any = {
          '@context': 'https://schema.org',
          '@type': 'MedicalWebPage',
          'headline': headline,
          'description': description,
          'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
          'author': { '@type': 'Organization', 'name': settings?.siteTitle || 'MyCyberClinics' },
          'publisher': {
            '@type': 'Organization',
            'name': settings?.siteTitle || 'MyCyberClinics',
            'logo': { '@type': 'ImageObject', 'url': publisherLogo },
          },
          'datePublished': datePublished || undefined,
          'dateModified': dateModified || undefined,
        };

        if (keywords && keywords.length) json.keywords = keywords;

        const str = JSON.stringify(json, null, 2);
        if (mounted) setGenerated(str);
        // Replace the JSON-LD field if it's empty or previously auto-generated
        // (so a placeholder JSON-LD will be updated when slug/title/etc. are set),
        // but keep manual edits by the editor.
        const prevJson = (AutoJsonLdInput as any)._lastGeneratedJson;
        const shouldReplaceJson = !value || value === prevJson;
        if (shouldReplaceJson && mounted) {
          onChange(PatchEvent.from(set(str)));
          try { (AutoJsonLdInput as any)._lastGeneratedJson = str; } catch (e) { /* ignore */ }
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    }
    compute();
    return () => { mounted = false; };
  }, [client, document?.slug?.current, document?.seo?.slug?.current, document?.title, document?.excerpt, document?.publishAt, document?.updatedAt, document?.createdAt, document?.tags]);

  // Safety effect similar to CanonicalInput: ensure JSON-LD placeholder is
  // replaced once a fuller generated value (including slug) is available.
  useEffect(() => {
    if (!generated) return;
    const prevJson = (AutoJsonLdInput as any)._lastGeneratedJson;
    const isPlaceholder = !value || value === prevJson || (typeof value === 'string' && value.includes('"@id": "') && value.includes('/blog/"') && value.endsWith('/blog/"'));
    if (isPlaceholder && value !== generated) {
      onChange(PatchEvent.from(set(generated)));
      try { (AutoJsonLdInput as any)._lastGeneratedJson = generated; } catch (e) { /* ignore */ }
    }
  }, [generated, value, document?.slug?.current]);

  const label = React.createElement('label', { style: { display: 'block', fontSize: 13, color: '#111827' } }, 'Structured Data (JSON-LD)');

  const textarea = React.createElement('textarea', {
    value: value || generated || '',
    onChange: (e: any) => onChange(PatchEvent.from(set(e.target.value))),
    rows: 10,
    style: { width: '100%', padding: 10, borderRadius: 6, border: '1px solid #E5E7EB', fontFamily: 'monospace' },
  });

  const helper = React.createElement('div', { style: { fontSize: 12, color: '#6B7280' } }, loading ? 'Generating JSON-LD...' : 'JSON-LD is generated from title, excerpt, tags and site settings. You can edit it manually.');

  return React.createElement('div', null,
    React.createElement('div', { style: { marginBottom: 8 } }, label, textarea),
    helper,
  );
}
