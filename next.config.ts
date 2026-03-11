import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /**
   * Use static HTML export only when explicitly requested via the
   * NEXT_EXPORT=1 environment variable. When developing locally we must
   * allow Next to serve API routes (so the Sanity Studio -> Buffer proxy
   * works). Set NEXT_EXPORT=1 when you want a static export build.
   */
  output: process.env.NEXT_EXPORT === '1' ? 'export' : undefined,
  // keep directory-style output so URLs map to folders with index.html
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "mycyberclinics.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
};

export default nextConfig;
