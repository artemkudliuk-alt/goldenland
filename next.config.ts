import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // Vercel Blob Storage
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      // Any other https image source (for admin-uploaded images from any CDN)
      {
        protocol: "https",
        hostname: "**",
      },
      // Local dev uploads
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
