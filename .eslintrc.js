module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended"],
  plugins: ["jsdoc"],
  rules: {
    "jsdoc/require-jsdoc": 1,
  },
};
