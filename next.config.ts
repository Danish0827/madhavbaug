import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "madhavbaug.hclient.in",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
