// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["127.0.0.1"], // your backend domain without http://
//   },
// };

// module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["127.0.0.1", "localhost"], // allow backend images
  },
};

export default nextConfig;
