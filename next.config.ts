import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fully static, frontend-only. `next build` emits a deployable /out directory.
  output: "export",
  images: { unoptimized: true },
  // Internal strategy from the company document is built only when INCLUDE_INTERNAL=1
  // (`npm run build:internal`). Declared here so server and client code see one value.
  env: { INCLUDE_INTERNAL: process.env.INCLUDE_INTERNAL ?? "" },
};

export default nextConfig;
