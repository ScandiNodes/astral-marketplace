import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        astral: {
          void: "#07070D",
          space: "#0D0D15",
          nebula: "#1A1A2E",
          cosmos: "#222240",
          dust: "#2D2D4A",
        },
        accent: {
          indigo: "#6366F1",
          cyan: "#22D3EE",
          violet: "#A78BFA",
          rose: "#FB7185",
          amber: "#FBBF24",
        },
        semantic: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h1: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        h3: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h4: ["1.125rem", { lineHeight: "1.4" }],
        body: ["0.9375rem", { lineHeight: "1.6" }],
        small: ["0.8125rem", { lineHeight: "1.5" }],
        xs: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0,0,0,0.3)",
        md: "0 4px 16px rgba(0,0,0,0.4)",
        lg: "0 8px 32px rgba(0,0,0,0.5)",
        xl: "0 16px 64px rgba(0,0,0,0.6)",
        glow: "0 0 20px rgba(99,102,241,0.3)",
        "glow-cyan": "0 0 20px rgba(34,211,238,0.2)",
      },
      backdropBlur: {
        glass: "20px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        normal: "250ms",
        slow: "400ms",
        slower: "600ms",
      },
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)",
        "gradient-surface": "linear-gradient(180deg, #13131F 0%, #0D0D15 100%)",
        "gradient-cosmic":
          "linear-gradient(135deg, #6366F1 0%, #A78BFA 50%, #FB7185 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
