// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // primary: "#43D8AC",
        // secondary: "#062431",
        // accent: "#88FFE0",
        // danger: "#ff5252",
        // "brand-blue": "#1D4ED8",
      },

      fontFamily: {
        fira: ["FiraCode", "sans-serif"],
      },

      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        22: "5.5rem",
        128: "32rem",
      },

      borderRadius: {
        xl2: "1rem",
        "4xl": "2.5rem",
      },

      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.1)",
        neon: "0 0 20px rgba(0,255,200,0.6)",
      },

      screens: {
        xs: "480px",
        "3xl": "1600px",
      },
    },
  },

  plugins: [require("tailwind-scrollbar", "daisyui")],
};
