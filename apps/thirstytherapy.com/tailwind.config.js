// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./**/**/*.html", "./**/**/*.svelte"],

    options: {
      whitelistPatterns: [/svelte-/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", ...defaultTheme.fontFamily.sans],
        display: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
