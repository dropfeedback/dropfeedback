module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ["react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "src/components/ui/",
    "tailwind.config.js",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "sort-imports": [
      "warn",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
