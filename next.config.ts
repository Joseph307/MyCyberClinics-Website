import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "mycyberclinics.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
    ],
  },
};

export default nextConfig;
