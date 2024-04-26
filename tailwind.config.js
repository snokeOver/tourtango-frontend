/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        rubik: '"Rubik Scribble", system-ui',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#2196F3",
          secondary: "teal",
          ".navbarr": {
            "background-color": "#e0dede",
          },

          "--swiper-navigation-color": "#2196F3",
          "--swiper-pagination-color": "#2196F3",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "green",
          secondary: "teal",
          ".navbarr": {
            "background-color": "#242323",
          },

          "--swiper-navigation-color": "green",
          "--swiper-pagination-color": "green",
        },
      },
    ],
  },
};
