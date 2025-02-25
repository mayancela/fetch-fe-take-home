import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "**/node_modules/*",
      "dist",
      "coverage",
      "**/.next/*",
      "*.json",
      "*.lock",
      "*.css",
      "*.scss",
      "**/out/*",
      "next-env.d.ts",
      "next.config.js",
    ],
  },
];

export default eslintConfig;
