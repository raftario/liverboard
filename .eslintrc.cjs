module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [`${__dirname}/tsconfig.json`, `${__dirname}/tsconfig.node.json`],
  },
  plugins: ["simple-import-sort"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/no-non-null-assertion": "off",
    "simple-import-sort/imports": "warn",
  },
}
