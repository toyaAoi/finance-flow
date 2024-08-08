import globals from "globals";
import pluginJs from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs", globals: globals.node },
    rules: {
      "prettier/prettier": "error",
      "no-console": "off", // Allow console statements
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Ignore unused vars starting with "_"
      quotes: ["error", "double"], // Enforce single quotes
      semi: ["error", "always"], // Enforce semicolons
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  prettierRecommended,
];
