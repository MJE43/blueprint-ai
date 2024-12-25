/** @type {import("prettier").Config} */
const config = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
