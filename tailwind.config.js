/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        clashDisplayRegular: ["clash-display-regular"],
        clashDisplayMedium: ["clash-display-medium"],
        clashDisplayBold: ["clash-display-bold"],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}

