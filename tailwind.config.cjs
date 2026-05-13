module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["DM Sans", "sans-serif"],
    },

    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
      screens: {
        xs: "374px",
        xsMini: "520px",
        xMini: "730px",
        xAirMini: "767px",
        xAir: "820px",
        md: "900px",
        xPro: "1025px",
        mlg: "1100px",
        xlg: "1200px",
        xlgg: "1220px",
        maxSize: "1280px",
        xMaxSize: "1400px",
        xLarge: "1500px",
        maxLarge: "1600px",
        xMaxLarge: "1680px",
        xMaxProLarge: "1780px",
        maxLargePro: "1900px",
      },
      colors: {
        primary: "#691188",
        warning: "#F2994A",
        tableHoverColor: "#E9E1FF",
        borderColor: "#BFBFBF",
        lightGray: "#c4c4c4",
        secondary: "#18d9c5",
        buttonHover: "#9B19E6",
        dark: "#808080",
      },
    },
  },
  plugins: [],
};
