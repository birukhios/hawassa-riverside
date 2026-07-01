import type { NextConfig } from "next";

// Standard Next.js server app (runs API routes). Deploy to any Node/serverless
// host (Vercel, a Node server, etc.).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default nextConfig;
