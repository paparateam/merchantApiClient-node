module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  env: { es6: true, jest: true, node: true },
  parserOptions: {
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"]
};
