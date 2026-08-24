import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fully static, frontend-only. `next build` emits a deployable /out directory.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
