import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ required for S3 static export
  images: {
    unoptimized: true, // ✅ disable server-side image optimization
    domains: ["13.126.245.180"], // use your backend server
  },
};

export default nextConfig;
