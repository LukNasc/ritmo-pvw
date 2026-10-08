import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/onboarding/register",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
