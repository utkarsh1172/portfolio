import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      "no-console": ["warn", { allow: ["error"] }],
      eqeqeq: ["error", "smart"],
    },
  },
  {
    // Build scripts report progress on the console.
    files: ["scripts/**"],
    rules: { "no-console": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"]),
]);
