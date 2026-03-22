import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import globals from 'globals';
import { globalIgnores } from 'eslint/config';

export default [
  globalIgnores(['src/components/ui/**/*']), // Ignore all files in src/components/ui (shadcn-vue)
  eslintConfigPrettier,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      quotes: ['error', 'single', { avoidEscape: true }],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // Add closing tag for void elements (e.g., <img>, <br>, <input> etc.)
            normal: 'never', // Do not add closing tag for normal elements (e.g., <div>, <span> etc.)
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
];
