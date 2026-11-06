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
  // Next 16.4's generated metadata validators contain unused imports. Keep
  // their export validation here; npm run build checks authored code strictly first.
  typescript: { tsconfigPath: "tsconfig.framework.json" },
  experimental: {
    // Tree-shake icon imports so only the icons used ship.
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/resume/:file*",
        headers: [{ key: "Content-Disposition", value: 'attachment; filename="Utkarsh_Kamble_Resume.pdf"' }],
      },
    ];
  },
};

export default nextConfig;
