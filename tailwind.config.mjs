const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
				xs: '400px'
			},
      fontFamily: {
        sans: ['"Rubik"', ...defaultTheme.fontFamily.sans],
        screen: ['"Inova 13x7"', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        "border-spin": {
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
      },
      animation: {
        "border-spin": "border-spin 15s linear infinite",
      },
    },
  },
  plugins: [],
};
