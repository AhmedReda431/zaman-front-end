/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

export default {
  content: [
    'docs/content/**/*.md',
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        zaman: {
          light: "#4BEBD8",
          DEFAULT: "#264642",
          dark: "#1d3834",
          50: "#4bebd8",
          100: "#42c2b3",
          200: "#39998d",
          300: "#35857b",
          400: "#307068",
          500: "#2e665f",
          600: "#2b5b55",
          700: "#264642",
          800: "#223F3B",
          900: "#1d3834"
        },
        secondary: "#BD9A60",
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        // 1/2
        '1/2': '1 / 2',
        video: '16 / 9'
      }
    }
  },
  variants: {
    space: ['responsive', 'direction'],
    float: ['responsive', 'direction'],
    margin: ['responsive', 'direction'],
    padding: ['responsive', 'direction'],
  },
  darkMode: "class",
  plugins: [
    require('tailwindcss-dir')(),
    require("tw-elements/dist/plugin"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
