import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        base: "#F7F6F3",
        surface: "#FFFFFF",
        subtle: "#F0EFE9",
        muted: "#E8E6DE",
        border: "#E2E0D8",
        "border-strong": "#C8C5BB",

        ink: {
          DEFAULT: "#1A1917",
          secondary: "#6B6860",
          tertiary: "#9C9A94",
        },

        teal: {
          DEFAULT: "#1D6A6A",
          hover: "#175959",
          light: "#EAF3F3",
          mid: "#C4DFDF",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(26,25,23,0.05)",
        sm: "0 2px 8px rgba(26,25,23,0.07), 0 1px 2px rgba(26,25,23,0.04)",
        md: "0 4px 16px rgba(26,25,23,0.09), 0 2px 4px rgba(26,25,23,0.05)",
        lg: "0 8px 32px rgba(26,25,23,0.12), 0 2px 8px rgba(26,25,23,0.06)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
