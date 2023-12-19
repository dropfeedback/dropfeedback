/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["@tanstack/query"],
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
