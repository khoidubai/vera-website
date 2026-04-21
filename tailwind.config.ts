import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F5DC",
        gold: "#D4AF37",
        charcoal: "#333333",
      },
      fontFamily: {
        script: ['"Dancing Script"', "cursive"],
        body: ['"Quicksand"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
