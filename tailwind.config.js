/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        veryDarkBlue: "hsl(235, 21%, 11%)",
        veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
        lightGreyishBlue: "hsl(234, 39%, 85%)",
        lightGreyishBlueHover: "hsl(236, 33%, 92%)",
        darkGreyishBlue: "hsl(234, 11%, 52%)",
        VeryDarkGrayishBlue: "hsl(233, 14%, 35%)",
        VeryDarkGrayishBlueHover: "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
