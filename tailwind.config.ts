/** @type {import('tailwindcss').Config} */
export default {
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|secondary|accent)-(50|100|200|300|400)/,
    },
  ],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          100: "#01080E",
          200: "#011627",
          300: "#011221",
        },

        // Secondary colors
        secondary: {
          100: "#607B96",
          200: "#3C9D93",
          300: "#4D5BCE",
        },

        // Accent colors
        accent: {
          100: "#FEA55F",
          200: "#43D9AD",
          300: "#E99287",
          400: "#C98BDF",
        },

        line: {
          DEFAULT: "#1E2D3D",
        },

        grad: {
          blue: "#4D5BCE",
          green: "#43D9AD",
        },
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

  plugins: [
    require("tailwind-scrollbar"),
    require("daisyui"),
    require("prettier-plugin-tailwindcss"),
  ],

  // -------------------------
  // 🔥 DAISYUI CUSTOM THEMES
  // -------------------------
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#011221",
          secondary: "#3C9D93",
          accent: "#43D9AD",
          neutral: "#01080E",
          "base-100": "#011627",
          info: "#4D5BCE",
          success: "#43D9AD",
          warning: "#FEA55F",
          error: "#E99287",
        },
      },
      "light",
      "dark",
    ],
  },
};
