/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bars: {
          "58%": {
            height: "50%",
          },
          "100%": {
            height: "100%",
          },
        },
      },
    },
  },
  plugins: [],
}