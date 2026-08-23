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
          black: "#020407",
          deep: "#050A10",
          surface: "#080F17",
          "surface-2": "#0C141E",
          metal: "#151D27",
          border: "#1B2A38",
          "border-bright": "#2A4055",
          "blue-900": "#03111F",
          "blue-700": "#062B4A",
          "blue-500": "#0878C9",
          "blue-400": "#149BFF",
          "blue-300": "#5BC3FF",
          white: "#F5F8FC",
          text: "#DCE5EE",
          muted: "#8A9AAA",
          dim: "#536474",
          amber: "#F59A23",
          "amber-soft": "#B96C1C",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "var(--font-space-grotesk)", "sans-serif"],
        brand: ["var(--font-orbitron)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(20, 155, 255, 0.25)",
        "glow-md": "0 0 25px -2px rgba(20, 155, 255, 0.4)",
        "glow-lg": "0 0 45px 0px rgba(20, 155, 255, 0.55)",
        "glow-amber": "0 0 25px -2px rgba(245, 154, 35, 0.35)",
        "border-glow": "inset 0 0 12px 0 rgba(20, 155, 255, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
        "sweep": "sweep 4s ease-in-out infinite",
        "flicker": "flicker 0.15s ease-in-out infinite",
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
