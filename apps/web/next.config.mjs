/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@3bm/config", "@3bm/ui"],
  poweredByHeader: false
};

export default nextConfig;
