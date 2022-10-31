/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
      },
      colors: {
        primary: "#222831",
        secondary: "#00ADB5",
        tertiary: "#393E46",
        quaternary: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
