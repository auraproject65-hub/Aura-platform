import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        aura: {
          navy: "#0A0F1A",
          teal: "#0D9488",
          gold: "#C9A96E",
          offwhite: "#F8FAFC",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
export default config
