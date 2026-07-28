import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050508",
        cyan: {
          neon: "#00F5FF",
        },
        violet: {
          neon: "#7B2FFF",
        },
        pink: {
          neon: "#FF2D78",
        },
        textGray: "#D1D5DB",
      },
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.15)" },
        },
        chevronBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        chevronBounce: "chevronBounce 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
