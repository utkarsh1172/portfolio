import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // This app is its own Git repository inside a larger workspace; pin the root so
  // Next.js doesn't pick up the parent folder's lockfile.
  turbopack: { root: import.meta.dirname },
  experimental: {
    // Tree-shake icon imports so only the icons used ship.
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // Resume PDFs download rather than open in a tab.
      { source: "/resume/:file*", headers: [{ key: "Content-Disposition", value: "attachment" }] },
    ];
  },
};

export default nextConfig;
