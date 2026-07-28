import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Allow images from any external source (Vercel Blob, CDN, etc.)
    // unoptimized means Next.js serves them directly without trying to
    // validate/restrict the hostname — perfect for admin-uploaded content
    unoptimized: true,
  },
};

export default nextConfig;
