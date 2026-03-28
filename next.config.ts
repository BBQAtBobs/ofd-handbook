import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/equipment/hand-tools",
        destination: "/learn/hand-tools",
        permanent: true,
      },
      {
        source: "/equipment/power-tools",
        destination: "/learn/power-tools",
        permanent: true,
      },
      {
        source: "/equipment",
        destination: "/learn",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
