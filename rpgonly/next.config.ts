import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  // Allow MDX files as pages (optional, we use next-mdx-remote instead)
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

export default nextConfig;
