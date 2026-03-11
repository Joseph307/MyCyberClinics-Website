// Archived copy of the legacy /api/share-to-buffer handler.
// Kept here for reference; this file is not part of the Next `pages`
// routing tree and won't be served by Next.js.

/* Original handler archived for debugging/history. If you need to
   restore, move this content back into a pages route or copy relevant
   bits into the active /api/buffer/share-to-buffer handler. */

import type { NextApiRequest, NextApiResponse } from 'next';

type Body = {
  url: string;
  text: string;
  profile_ids?: string[]; // Buffer profile ids
  scheduled_at?: string; // ISO string
  media_url?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // This is an archived copy. Use /api/buffer/share-to-buffer/ in the active app.
  console.log('[archive] legacy share-to-buffer request', { method: req.method, url: req.url, origin: req.headers.origin });
  res.status(410).json({ error: 'Archived', message: 'See /api/buffer/share-to-buffer/' });
}
