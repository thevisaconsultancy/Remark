import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One canonical host: www and any other alias 301 to the apex domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.remarkstudio.tech" }],
        destination: "https://remarkstudio.tech/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
