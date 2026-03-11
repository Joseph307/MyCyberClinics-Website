import type { NextApiRequest, NextApiResponse } from 'next';

const GRAPHQL_ENDPOINT = 'https://api.buffer.com/graphql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS: allow Sanity Studio (typically http://localhost:3333) to call this API in dev.
  const allowOrigin = process.env.SHARE_API_ALLOW_ORIGIN || 'http://localhost:3333';
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.BUFFER_API_KEY;
  if (!token) return res.status(500).json({ error: 'Buffer API key not configured (BUFFER_API_KEY)' });

  // Buffer's `channels` field requires a non-null `input` with at least
  // `organizationId`. Prefer an explicit env var; otherwise try to discover
  // the organization via a viewer query and use the first organization.
  const queryChannels = `query GetChannels($input: ChannelsInput!) { channels(input: $input) { id name service } }`;

  // Helper to fetch GraphQL with the token
  const doFetch = async (payload: any): Promise<Response> => {
    return await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };
  // Determine organizationId: prefer BUFFER_ORGANIZATION_ID env var
  // Prefer an explicit env var; otherwise leave empty so we attempt discovery.
  let organizationId = process.env.BUFFER_ORGANIZATION_ID || '';
  if (!organizationId) {
    // Try to discover organizations via a viewer query
    const viewerQuery = `query ViewerOrgs { viewer { organizations { id name } } }`;
    const viewerResp = await doFetch({ query: viewerQuery });
    const viewerText = await viewerResp.text();
    let viewerJson: any = null;
    try { viewerJson = viewerText ? JSON.parse(viewerText) : null; } catch { viewerJson = viewerText; }
    organizationId = viewerJson?.data?.viewer?.organizations?.[0]?.id || '';
  }

  if (!organizationId) {
    return res.status(500).json({ error: 'Organization ID not available. Set BUFFER_ORGANIZATION_ID or ensure the token has an associated organization.' });
  }

  const variables = { input: { organizationId } };

  try {
    const resp = await doFetch({ query: queryChannels, variables });
    const text = await resp.text();
    let json: any = null;
    try { json = text ? JSON.parse(text) : null; } catch { json = text; }

    if (!resp.ok) {
      console.error('[buffer/channels] GraphQL error', { status: resp.status, body: text });
      return res.status(resp.status || 502).json({ error: 'Buffer GraphQL error', status: resp.status, body: json });
    }

  // Normalize the `channels` shape: Buffer may return an array or an
  // object with nodes/items/edges. Handle common shapes flexibly.
  const rawChannels = json?.data?.channels;
  let channels: any[] = [];
  if (Array.isArray(rawChannels)) channels = rawChannels;
  else if (rawChannels?.nodes && Array.isArray(rawChannels.nodes)) channels = rawChannels.nodes;
  else if (rawChannels?.items && Array.isArray(rawChannels.items)) channels = rawChannels.items;
  else if (Array.isArray(rawChannels?.edges)) channels = rawChannels.edges.map((e: any) => e?.node).filter(Boolean);
  else if (rawChannels && typeof rawChannels === 'object') channels = [rawChannels];
  else channels = [];
    // Log when no channels found to help debugging tokens/permissions
    if (channels.length === 0) {
      console.warn('[buffer/channels] no channels returned', { organizationId, raw: json });
    }

    return res.status(200).json({ channels });
  } catch (err) {
    console.error('[buffer/channels] request failed', String(err));
    return res.status(500).json({ error: String(err) });
  }
}
