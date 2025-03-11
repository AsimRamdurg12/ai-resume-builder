import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
        ".mp4",
      ],
      rules: {
        "./videos/*.mp4": {
          loaders: ["next-video/webpack/video-raw-loader.js"],
          as: "*.json",
        },
        "./videos/*.mp4.json": {
          loaders: ["next-video/webpack/video-json-loader.js"],
          as: "*.json",
        },
      },
    },
  },
};

export default nextConfig;
