import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  webpack: (config) => {
    config.resolve.alias["pdfjs-dist"] = "pdfjs-dist/legacy/build/pdf";

    config.module.rules.push({
      test: /pdf\.worker\.min\.js/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].[hash][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;
