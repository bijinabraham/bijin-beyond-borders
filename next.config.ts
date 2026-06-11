import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath:    isProd ? "/bijin-beyond-borders" : "",
  assetPrefix: isProd ? "/bijin-beyond-borders" : "",
};

export default nextConfig;
