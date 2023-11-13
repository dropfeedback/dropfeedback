/** @type {import('eslint').Linter.Config} */
module.exports = {
  plugins: ["@tanstack/query"],
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
};
