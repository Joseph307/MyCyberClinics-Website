const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
// Use global fetch available in Node 18+ runtime; fall back to node-fetch when not available
let fetchFn;
if (typeof global !== 'undefined' && global.fetch) {
  fetchFn = global.fetch;
} else {
  // node-fetch may not be installed in the cloud runtime; require only when needed
  fetchFn = require('node-fetch');
}
const fetch = fetchFn;

const app = express();

// Allow JSON bodies
app.use(express.json());

// Some Hosting rewrites forward the original path (e.g. /api/buffer/...) to the function.
// If the incoming path contains a leading /api prefix, strip it so the Express routes
// (which are defined as /buffer/...) match correctly.
app.use((req, res, next) => {
  try {
    // Strip any number of leading /api prefixes so requests like /api/api/.. still match
    // our internal routes which are defined as /buffer/...
    if (req && req.url) {
      // normalize repeated leading /api segments
      while (req.url.startsWith('/api/')) {
        req.url = req.url.replace(/^\/api/, '');
      }
      if (req.url === '/api') {
        req.url = req.url.replace(/^\/api/, '') || '/';
      }
    }
    // Helpful debug log to inspect incoming paths (will appear in function logs)
    console.debug('[functions] path after api-strip:', { original: req.originalUrl, after: req.url });
  } catch (e) {
    // ignore
  }
  next();
});

// CORS: allow origin from config or default to allow all for flexibility
// Support comma-separated list in config by splitting into an array and using a custom origin matcher
const rawAllow = (functions.config && functions.config().share && functions.config().share.allow_origin) || '*';
const allowedOrigins = Array.isArray(rawAllow) ? rawAllow : String(rawAllow).split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed'), false);
  }
}));

const GRAPHQL_ENDPOINT = 'https://api.buffer.com/graphql';

const getToken = () => (functions.config && functions.config().buffer && functions.config().buffer.apikey) || process.env.BUFFER_API_KEY;
const getOrgIdFromConfig = () => (functions.config && functions.config().buffer && functions.config().buffer.organization_id) || process.env.BUFFER_ORGANIZATION_ID;

async function doFetch(payload, token) {
  return await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// OPTIONS handler (preflight)
app.options('*', (req, res) => res.sendStatus(204));

// GET /buffer/channels
app.get('/buffer/channels', async (req, res) => {
  const token = getToken();
  if (!token) return res.status(500).json({ error: 'Buffer API key not configured (functions config or env BUFFER_API_KEY)' });

  const queryChannels = `query GetChannels($input: ChannelsInput!) { channels(input: $input) { id name service } }`;

  // Determine organizationId: prefer functions config, otherwise try discovery
  let organizationId = getOrgIdFromConfig() || '';

  try {
    if (!organizationId) {
      const viewerQuery = `query ViewerOrgs { viewer { organizations { id name } } }`;
      const viewerResp = await doFetch({ query: viewerQuery }, token);
      const viewerText = await viewerResp.text();
      let viewerJson = null;
      try { viewerJson = viewerText ? JSON.parse(viewerText) : null; } catch { viewerJson = viewerText; }
      organizationId = viewerJson?.data?.viewer?.organizations?.[0]?.id || '';
    }

    if (!organizationId) {
      return res.status(500).json({ error: 'Organization ID not available. Set buffer.organization_id in functions config or BUFFER_ORGANIZATION_ID env var.' });
    }

    const variables = { input: { organizationId } };
    const resp = await doFetch({ query: queryChannels, variables }, token);
    const text = await resp.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch { json = text; }

    if (!resp.ok) {
      console.error('[functions/buffer/channels] GraphQL error', { status: resp.status, body: text });
      return res.status(resp.status || 502).json({ error: 'Buffer GraphQL error', status: resp.status, body: json });
    }

    // Normalize shapes
    const rawChannels = json?.data?.channels;
    let channels = [];
    if (Array.isArray(rawChannels)) channels = rawChannels;
    else if (rawChannels?.nodes && Array.isArray(rawChannels.nodes)) channels = rawChannels.nodes;
    else if (rawChannels?.items && Array.isArray(rawChannels.items)) channels = rawChannels.items;
    else if (Array.isArray(rawChannels?.edges)) channels = rawChannels.edges.map(e => e?.node).filter(Boolean);
    else if (rawChannels && typeof rawChannels === 'object') channels = [rawChannels];

    if (channels.length === 0) {
      console.warn('[functions/buffer/channels] no channels returned', { organizationId, raw: json });
    }

    return res.status(200).json({ channels });
  } catch (err) {
    console.error('[functions/buffer/channels] request failed', String(err));
    return res.status(500).json({ error: String(err) });
  }
});

// POST /buffer/share-to-buffer
app.post('/buffer/share-to-buffer', async (req, res) => {
  const token = getToken();
  if (!token) return res.status(500).json({ error: 'Buffer API key not configured (functions config or env BUFFER_API_KEY)' });

  const { url, text, channelId, media_url } = req.body || {};
  if (!url || !text || !channelId) return res.status(400).json({ error: 'Missing required fields: url, text, channelId' });

  const mutation = `mutation CreatePost($input: CreatePostInput!) { createPost(input: $input) { id } }`;

  const input = { text, channelId };
  if (media_url) {
    input.assets = { images: [{ url: media_url }] };
  }

  const variables = { input };

  try {
    const resp = await doFetch({ query: mutation, variables }, token);
    const textResp = await resp.text();
    let json = null;
    try { json = textResp ? JSON.parse(textResp) : null; } catch { json = textResp; }

    if (!resp.ok) {
      console.error('[functions/buffer/share-to-buffer] GraphQL error', { status: resp.status, body: textResp });
      return res.status(resp.status || 502).json({ error: 'Buffer GraphQL error', status: resp.status, body: json });
    }

    return res.status(200).json(json);
  } catch (err) {
    console.error('[functions/buffer/share-to-buffer] request failed', String(err));
    return res.status(500).json({ error: String(err) });
  }
});

// Simple health endpoint for probe/tests and to capture incoming request diagnostics
app.get('/health', (req, res) => {
  try {
    console.log('[functions/health] incoming', { originalUrl: req.originalUrl, url: req.url, path: req.path, headers: req.headers?.host });
  } catch (e) {
    // ignore
  }
  res.status(200).json({ status: 'ok' });
});

exports.api = functions.https.onRequest(app);
