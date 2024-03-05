import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/lib/**/*.js",
  ],
  theme: {
    extend: {
      screens: {
        mobile: { max: "768px" },
        tablet: { min: "768px", max: "1200px" },
        xl: { max: "1200px" },
        "2xl": { max: "1440px" },
        "3xl": { min: "1920px" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        orange: "#FF7F2A",
        red: "#FF3838",
        "red-500": "#FF3838",
        "red-600": "#FF5E5E",
        green: "#5DE98D",
        placeholder: "#9D9D9D",
        "orange-hover": "#cf6b29",
        "sp-gray": "#3F3F3F",
        "sp-gray-100": "#999",
        "sp-gray-200": "#AFAFAF",
        "sp-gray-300": "#E5E5ED",
        "sp-gray-400": "#768396",
        "sp-gray-500": "#787878",
        "sp-gray-600": "#232323",
        "sp-gray-650": "#383838",
        "sp-gray-700": "#3D3D3D",
        "sp-gray-850": "#131313",
        "sp-gray-800": "#212121",
        "sp-gray-900": "#696969",
        "sp-gray-920": "#898989",
        "sp-gray-950": "#9D9D9D",
        "sp-gray-999": "#999999",
        "sp-bg-orange-100" : "rgba(255, 127, 42, 0.10)",
        "white-10": "rgba(255, 255, 255, 0.10)",
        "white-20": "rgba(255, 255, 255, 0.20)",
        "white-30": "rgba(255, 255, 255, 0.30)",
        "white-40": "rgba(255, 255, 255, 0.40)",
        "white-50": "rgba(255, 255, 255, 0.50)",
        "white-60": "rgba(255, 255, 255, 0.60)",
        "white-70": "rgba(255, 255, 255, 0.70)",
        "white-80": "rgba(255, 255, 255, 0.80)",
        "white-90": "rgba(255, 255, 255, 0.90)",
        "black-10": "rgba(0, 0, 0, 0.10)",
        "black-20": "rgba(0, 0, 0, 0.20)",
        "black-30": "rgba(0, 0, 0, 0.30)",
        "black-40": "rgba(0, 0, 0, 0.40)",
        "black-50": "rgba(0, 0, 0, 0.50)",
        "black-60": "rgba(0, 0, 0, 0.60)",
        "black-70": "rgba(0, 0, 0, 0.70)",
        "black-80": "rgba(0, 0, 0, 0.80)",
        "black-90": "rgba(0, 0, 0, 0.90)",
      },
      fontFamily: {
        abz: ["ABeeZee", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        actor: ["Actor", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
        abel: ["Abel", "sans-serif"],
        blink: ["Blinker", "sans-serif"],
      },
      fontSize: {
        "12": "12px",
        "14": "14px",
        "16": "16px",
        "18": "18px",
        "20": "20px",
        "24": "24px",
        "26": "26px",
        "30": "30px",
        "40": "40px",
        "50": "50px",
      },
    },
  },
  plugins: [
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        ".bg-pattern": {
          "background-image": `url("/img/backgrounds/global_background.png")`,
          "background-size": "cover",
        },
      });
    },
    require("flowbite/plugin"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
export default config;
