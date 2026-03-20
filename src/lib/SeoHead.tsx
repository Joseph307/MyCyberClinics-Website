import Head from 'next/head';

type SeoHeadProps = {
  title?: string;
  description?: string;
  canonicalBase?: string;
  canonicalPath?: string;
  image?: string;
};

export function buildCanonical(base?: string, path = '/') {
  const baseUrl = (base || 'https://mycyberclinics.com').replace(/\/$/, '');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export default function SeoHead({
  title,
  description,
  canonicalBase,
  canonicalPath = '/',
  image,
}: SeoHeadProps) {
  const canonical = buildCanonical(canonicalBase, canonicalPath);

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      {image && <meta property="og:image" content={image} />}
    </Head>
  );
}
