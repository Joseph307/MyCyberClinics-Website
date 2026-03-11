import type { NextApiRequest, NextApiResponse } from 'next';

const GRAPHQL_ENDPOINT = 'https://api.buffer.com/graphql';
const BUFFER_API_KEY = process.env.BUFFER_API_KEY;
const RAW_ALLOW = process.env.SHARE_ALLOW_ORIGIN || '*';

function parseAllowed(raw: string) {
  return String(raw).split(',').map(s => s.trim()).filter(Boolean);
}

function allowedOrigin(origin?: string) {
  const allowed = parseAllowed(RAW_ALLOW);
  if (!origin) return true;
  return allowed.includes('*') || allowed.includes(origin);
}

async function doFetch(payload: any) {
  return await (globalThis.fetch as typeof fetch)(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUFFER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin as string | undefined;
  if (!allowedOrigin(origin)) {
    return res.status(403).json({ error: 'CORS not allowed' });
  }
  res.setHeader('Access-Control-Allow-Origin', origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).end();

  if (!BUFFER_API_KEY) return res.status(500).json({ error: 'Buffer API key not configured (env BUFFER_API_KEY)' });

  const { url, text, channelId, media_url } = req.body || {};
  if (!url || !text || !channelId) return res.status(400).json({ error: 'Missing required fields: url, text, channelId' });

  const mutation = `mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id } }`;
  const input: any = { text, channelId };
  if (media_url) input.assets = { images: [{ url: media_url }] };

  try {
    const resp = await doFetch({ query: mutation, variables: { input } });
    const textResp = await resp.text();
    let json: any = null;
    try { json = textResp ? JSON.parse(textResp) : null; } catch { json = textResp; }

    if (!resp.ok) {
      console.error('[api/buffer/share-to-buffer] GraphQL error', { status: resp.status, body: textResp });
      return res.status(resp.status || 502).json({ error: 'Buffer GraphQL error', status: resp.status, body: json });
    }

    return res.status(200).json(json);
  } catch (err) {
    console.error('[api/buffer/share-to-buffer] request failed', String(err));
    return res.status(500).json({ error: String(err) });
  }
}
