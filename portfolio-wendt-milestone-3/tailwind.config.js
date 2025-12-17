module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./assets/css/**/*.css",
  ],
  theme: {
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
      special: "0 0 80px -12px rgba(0, 0, 0, 0.2)",
    },
    scale: {
      101: "1.01",
      102: "1.02",
      103: "1.03",
      104: "1.04",
      105: "1.05",
      106: "1.06",
      107: "1.07",
      108: "1.08",
      109: "1.09",
      110: "1.10",
      120: "1.20",
      130: "1.30",
    },
    extend: {
      colors: {
        bg: "#0D0D0D",
        black: "#000000",
        lightblack: "#171717",
        darkgrey: "#292929",
        focusorange: "#FF8811",
        focusblue: "#657ED4",
        white: "#FBFBFF",
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"],
      },
    },
  },
  plugins: [],
};
