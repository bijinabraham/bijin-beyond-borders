import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/bijin-beyond-borders",
  assetPrefix: "/bijin-beyond-borders",
};

export default nextConfig;
