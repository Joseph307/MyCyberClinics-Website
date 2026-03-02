import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  /**
   * Use the static HTML export feature (replaces `next export`).
   * `next build` will produce an `out/` directory when `output: 'export'` is set.
   */
  output: "export",
  // When exporting static HTML (`output: 'export'`) Next's Image Optimization API
  // is not available. Disable the Image Optimization API so `next/image` works
  // in the exported site by setting images.unoptimized to true.
  images: {
    unoptimized: true,
  },
  // keep directory-style output so URLs map to folders with index.html
  trailingSlash: true,
};

export default nextConfig;
