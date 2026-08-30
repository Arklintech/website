import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        z: {
          black: "#F5F1E8",          /* Architectural Cream Background */
          deep: "#EBE5D8",           /* Warm Cream Surface */
          surface: "#FBF9F3",        /* Card Surface Base */
          "surface-2": "#FFFFFF",    /* Elevated Card Surface */
          "surface-hover": "#F0EAE0",/* Hover State Surface */
          metal: "#E2DDD2",
          border: "#D8D4C9",         /* Subtle structural warm-gray border */
          "border-bright": "#1463FF",
          "blue-900": "#0B2E73",     /* Deep Navy */
          "blue-700": "#004099",
          "blue-600": "#0050E6",
          "blue-500": "#1463FF",     /* Master Arklintech Electric Blue */
          "blue-400": "#2B75FF",
          "blue-300": "#5C95FF",
          "blue-200": "#DCEAFF",     /* Light Blue Tint */
          "cyan-400": "#1463FF",
          "cyan-300": "#2B75FF",
          white: "#111827",          /* Deep Navy Primary Text */
          text: "#111827",
          muted: "#536070",          /* Secondary Navy-Gray Text */
          dim: "#768494",            /* Muted Metadata Text */
        },
      },
      fontFamily: {
        brand: ["var(--font-syncopate)", "sans-serif"],
        logo: ["var(--font-syncopate)", "sans-serif"],
        display: ["Söhne", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Inter", "sans-serif"],
        body: ["Söhne", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Inter", "sans-serif"],
        mono: ["Söhne", "-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "Inter", "sans-serif"],
        sans: ["Söhne", "-apple-system", "BlinkMacSystemFont", "SF Pro Text", "Inter", "sans-serif"],
      },
      boxShadow: {
        "glow-sm": "0 2px 10px rgba(20, 99, 255, 0.12)",
        "glow-md": "0 4px 20px rgba(20, 99, 255, 0.18)",
        "glow-lg": "0 8px 30px rgba(20, 99, 255, 0.22)",
        "border-glow": "0 0 0 1px #1463FF",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
        "sweep": "sweep 4s ease-in-out infinite",
      },
      keyframes: {
        sweep: {
          "0%, 100%": { opacity: "0.2", transform: "translateX(-100%)" },
          "50%": { opacity: "0.8", transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
