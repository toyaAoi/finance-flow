import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: { ...globals.node, ...globals.mocha },
    },
    rules: {
      "no-console": "off", // Allow console logs for debugging purposes
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];
