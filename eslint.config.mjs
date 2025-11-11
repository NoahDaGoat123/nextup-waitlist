// eslint.config.mjs
import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals(),   // Next.js + Core Web Vitals rules
  ...nextTs(),       // TypeScript rules
  {
    ignores: [
      ".next/**",
      "build/**",
      "next-env.d.ts",
      "types/validator.ts"  // <- ignore that noisy generated file
    ],
  },
]);
