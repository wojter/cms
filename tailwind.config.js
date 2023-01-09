/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
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
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
