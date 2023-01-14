/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.{js,ts}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-750": "#2b3544",
        "gray-725": "#31384A",
        "gray-650": "#414B5A",
      },
    },
  },
  variants: {
    textColor: ({ after }) => after(["invalid"]),
  },
  plugins: [
    require("flowbite/plugin"),
    plugin(function ({ addVariant, e }) {
      addVariant("invalid", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
  darkMode: "class",
};
