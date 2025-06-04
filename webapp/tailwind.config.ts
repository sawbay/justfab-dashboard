import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ["DynaPuff", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FB9333",
          light: "#FF9B4B",
          dark: "#CA8953",
        },
        secondary: {
          DEFAULT: "#585858",
          dark: "#575757",
        },
        background: {
          light: "#FFF8F3",
          DEFAULT: "#D17436",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
