import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "warn",
      "no-constant-binary-expression": "error",
      "no-duplicate-imports": "error",
      "no-template-curly-in-string": "error",
      "no-unreachable-loop": "error",
      camelcase: ["error", { ignoreDestructuring: true, ignoreImports: true }],
      curly: "error",
      "no-shadow": "error",
      "no-unused-expressions": "error",
      "no-var": "error",
      "prefer-const": "warn",

      "@typescript-eslint/class-literal-property-style": ["error", "fields"],
      "@typescript-eslint/no-invalid-void-type": "error",
      "@typescript-eslint/no-confusing-non-null-assertion": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "angle-bracket",
          objectLiteralTypeAssertions: "never",
        },
      ],
      "@typescript-eslint/strict-boolean-expressions": ["warn"],
      "@typescript-eslint/prefer-reduce-type-parameter": "warn",
      "@typescript-eslint/return-await": ["error", "always"],
      "@typescript-eslint/dot-notation": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/naming-convention": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-inferrable-types": "warn",
      "id-length": [
        "error",
        { min: 3, exceptions: ["i", "j", "k", "n", "id", "x", "y", "z"] },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  },
];
