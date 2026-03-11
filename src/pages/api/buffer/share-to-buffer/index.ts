import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  url: string;
  text: string;
  profile_ids?: string[]; // Buffer profile ids
  scheduled_at?: string; // ISO string
  media_url?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Log incoming requests so we can see whether OPTIONS/POST reach this handler.
  // This will print to the Next.js server console.
  // eslint-disable-next-line no-console
  console.log('[share-to-buffer] incoming', { method: req.method, url: req.url, host: req.headers.host, origin: req.headers.origin });

  // Lightweight CORS handling so Studio (often on a different origin during dev)
  // can call this API without preflight blocking. In production you should
  // lock this down to the canonical origin for security.
  const allowedOrigin = process.env.SHARE_API_ALLOW_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  // Optionally allow credentials if your Studio needs them
  // res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body as Body & { channelId?: string };
  const token = process.env.BUFFER_API_KEY;
  if (!token) return res.status(500).json({ error: 'Buffer API key not configured (BUFFER_API_KEY)' });

  if (!body || !body.text || !body.url) {
    return res.status(400).json({ error: 'Missing required fields: text and url' });
  }

  // Use Buffer's GraphQL API (Personal API). We'll call createPost with
  // the provided channelId (preferred) or attempt to create without it if
  // not provided (GraphQL may require channelId).
  const GRAPHQL_ENDPOINT = 'https://api.buffer.com/graphql';

  // Build a variables-based GraphQL request to avoid manual escaping and
  // string interpolation issues (previously used escapeGraphQLString which
  // was missing). We construct an `input` object and send it in `variables`.
  const query = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess { post { id text assets { id mimeType } } }
    ... on MutationError { message }
  }
}`;

  const textWithUrl = `${body.text} ${body.url}`.trim();
  const input: any = {
    text: textWithUrl,
    // Let Buffer pick scheduling defaults; include these as strings to be
    // forwarded — if the API expects enums it will return a readable error
    // which we forward to the Studio UI.
    schedulingType: 'automatic',
    mode: 'addToQueue',
  };
  if (body.channelId) input.channelId = body.channelId;
  if (body.media_url) input.assets = { images: [{ url: body.media_url }] };

  try {
    // eslint-disable-next-line no-console
    console.log('[share-to-buffer] GraphQL createPost variables preview:', { input: { ...input, text: String(input.text).slice(0, 300) } });
    const resp = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { input } }),
    });

    // Buffer may sometimes return an empty body or non-JSON response. Read as
    // text first and try parsing to JSON — fall back to the raw text when
    // parsing fails.
    const text = await resp.text();
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (e) {
      json = text;
    }

    // Normalize empty or literal "null" responses to a helpful placeholder
    // so clients receive a readable message instead of `null`.
    const isEmptyText = !text || !text.trim() || text.trim() === 'null';
    const details = json ?? (!isEmptyText ? text : '<empty response>');

    // GraphQL servers often return HTTP 200 but include `errors` in the
    // response body when validation or execution issues occur. Treat those
    // as failures so the Studio UI receives a clear error payload.
    if (json && Array.isArray(json.errors) && json.errors.length > 0) {
      // eslint-disable-next-line no-console
      console.error('[share-to-buffer] GraphQL errors', json.errors);
      return res.status(400).json({ error: 'Buffer GraphQL error', details: json.errors, data: json.data ?? null });
    }

    if (!resp.ok) {
      // Log proxied Buffer errors for server-side diagnostics and forward
      // Buffer's status code to the client so Studio receives the original
      // error (avoids masking errors as 502 Bad Gateway).
      // eslint-disable-next-line no-console
      console.error('Buffer API error', { status: resp.status, details });
      return res.status(resp.status || 502).json({ error: 'Buffer API error', status: resp.status, details });
    }

    return res.status(200).json({ ok: true, result: details });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
