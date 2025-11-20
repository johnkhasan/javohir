import vue from "eslint-plugin-vue";
import ts from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{ts,js,vue}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser,
    },
    plugins: {
      vue,
      "@typescript-eslint": ts,
    },
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-recommended",
      "@vue/eslint-config-typescript",
      prettier,
    ],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
];
