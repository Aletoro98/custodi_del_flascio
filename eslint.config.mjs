// ESLint flat config for Next.js 15.
// eslint-config-next 15 still ships its rules in the legacy (.eslintrc) format,
// so they are loaded through FlatCompat.
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // All in-game text is Italian and full of apostrophes (l'ecosistema, dell'Ente).
      // They render correctly in JSX; escaping each one would only hurt readability.
      "react/no-unescaped-entities": "off",
      // Game images are pre-optimised static files (already resized and compressed),
      // served as plain <img> on purpose.
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
