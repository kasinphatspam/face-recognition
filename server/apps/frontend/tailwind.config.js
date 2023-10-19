// tailwind.config.js
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: { 'outfit': "Outfit, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont"},
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};