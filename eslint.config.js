import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";

export default [
  eslintConfigPrettier,
  ...pluginVue.configs["flat/recommended"],
  {
    rules: {},
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },
];
