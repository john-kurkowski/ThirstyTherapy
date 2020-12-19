const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./public/index.html", "./**/**/*.html", "./**/**/*.svelte"],

    options: {
      whitelistPatterns: [/svelte-/],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", ...defaultTheme.fontFamily.sans],
        display: ["DM Serif Display", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  variants: {},
  plugins: [],
};
