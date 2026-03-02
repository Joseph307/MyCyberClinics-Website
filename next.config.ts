import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /**
   * Use the static HTML export feature (replaces `next export`).
   * `next build` will produce an `out/` directory when `output: 'export'` is set.
   */
  output: "export",
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
