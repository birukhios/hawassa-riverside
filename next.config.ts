import type { NextConfig } from "next";

// Static export for GitHub Pages, served from /<repo> sub-path in production.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/hawassa-riverside" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  // exposed to the client for prefixing plain <img>/asset URLs
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
