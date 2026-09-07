/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@3bm/config", "@3bm/ui", "@3bm/blueprint"],
  poweredByHeader: false
};

export default nextConfig;
