import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    // unoptimized: true,
    // Allow any remote host so CMS-managed image URLs work without redeploys.
    // Trade-off: anyone who can set an image URL can hit your Image Optimization API.
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;
