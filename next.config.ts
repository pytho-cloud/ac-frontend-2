// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["127.0.0.1"], // your backend domain without http://
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
