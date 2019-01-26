const isProduction = process.env.NODE_ENV === 'production';
const webpackConfigPath = './node_modules/@vue/cli-service/webpack.config.js';

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [
    'vue',
    'jest',
  ],
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'no-debugger': isProduction ? 'error' : 'off',
    'no-console': isProduction ? 'error' : 'off',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: webpackConfigPath,
      },
    },
  },
};
