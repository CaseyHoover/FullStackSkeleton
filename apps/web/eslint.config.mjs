import eslintReact from "@eslint-react/eslint-plugin";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import importX from "eslint-plugin-import-x";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  // React (replaces eslint-plugin-react + react-hooks)
  eslintReact.configs.recommended,

  // Next.js
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Strict type-checked TypeScript rules
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Import hygiene
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    settings: {
      "import-x/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "import-x/no-duplicates": "error",
    },
  },

  // Tailwind
  betterTailwindcss.configs["recommended-warn"],
  {
    settings: {
      "better-tailwindcss": {
        entryPoint: "src/app/globals.css",
      },
    },
  },

  // Disable type-checked rules for JS config files not covered by tsconfig
  {
    files: ["**/*.mjs"],
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "import-x/no-named-as-default-member": "off",
      "import-x/no-named-as-default": "off",
    },
  },

  // Prettier must be last to override formatting rules
  prettier,

  // Global ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
