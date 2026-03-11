import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // A lightweight deprecation response so requests to the old path
  // don't cause duplicate route behavior or unexpected redirects. The
  // real proxy lives at /api/buffer/share-to-buffer/.
  // eslint-disable-next-line no-console
  console.log('[legacy-share-route] request', { method: req.method, url: req.url, origin: req.headers.origin });

  const allowedOrigin = process.env.SHARE_API_ALLOW_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  return res.status(410).json({
    error: 'Gone',
    message: 'This endpoint is deprecated. Use /api/buffer/share-to-buffer/ instead.',
    newEndpoint: '/api/buffer/share-to-buffer/',
  });
}
