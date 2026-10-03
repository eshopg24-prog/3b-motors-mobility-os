/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@3bm/config", "@3bm/ui", "@3bm/blueprint"],
  poweredByHeader: false,
  allowedDevOrigins: ["3000-" + (process.env.BASE44_PUBLIC_HOST_SUFFIX || "localhost")]
};

export default nextConfig;
