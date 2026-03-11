import type { NextApiRequest, NextApiResponse } from 'next';

const GRAPHQL_ENDPOINT = 'https://api.buffer.com/graphql';

const BUFFER_API_KEY = process.env.BUFFER_API_KEY;
const BUFFER_ORGANIZATION_ID = process.env.BUFFER_ORGANIZATION_ID || '';
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (!BUFFER_API_KEY) {
    return res.status(500).json({ error: 'Buffer API key not configured (env BUFFER_API_KEY)' });
  }

  const queryChannels = `query GetChannels($input: ChannelsInput!) { channels(input: $input) { id name service } }`;

  try {
    let organizationId = BUFFER_ORGANIZATION_ID || '';
    if (!organizationId) {
      const viewerQuery = `query ViewerOrgs { viewer { organizations { id name } } }`;
      const viewerResp = await doFetch({ query: viewerQuery });
      const viewerText = await viewerResp.text();
      let viewerJson: any = null;
      try { viewerJson = viewerText ? JSON.parse(viewerText) : null; } catch { viewerJson = viewerText; }
      organizationId = viewerJson?.data?.viewer?.organizations?.[0]?.id || '';
    }

    if (!organizationId) {
      return res.status(500).json({ error: 'Organization ID not available. Set BUFFER_ORGANIZATION_ID env var.' });
    }

    const variables = { input: { organizationId } };
    const resp = await doFetch({ query: queryChannels, variables });
    const text = await resp.text();
    let json: any = null;
    try { json = text ? JSON.parse(text) : null; } catch { json = text; }

    if (!resp.ok) {
      console.error('[api/buffer/channels] GraphQL error', { status: resp.status, body: text });
      return res.status(resp.status || 502).json({ error: 'Buffer GraphQL error', status: resp.status, body: json });
    }

    const rawChannels = json?.data?.channels;
    let channels: any[] = [];
    if (Array.isArray(rawChannels)) channels = rawChannels;
    else if (rawChannels?.nodes && Array.isArray(rawChannels.nodes)) channels = rawChannels.nodes;
    else if (rawChannels?.items && Array.isArray(rawChannels.items)) channels = rawChannels.items;
    else if (Array.isArray(rawChannels?.edges)) channels = rawChannels.edges.map((e: any) => e?.node).filter(Boolean);
    else if (rawChannels && typeof rawChannels === 'object') channels = [rawChannels];

    return res.status(200).json({ channels });
  } catch (err) {
    console.error('[api/buffer/channels] request failed', String(err));
    return res.status(500).json({ error: String(err) });
  }
}
