const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        body: ['DM Sans', ...defaultTheme.fontFamily.sans],
        display: ['DM Serif Display', ...defaultTheme.fontFamily.serif]
      }
    }
  },
  variants: {},
  plugins: [],
}
