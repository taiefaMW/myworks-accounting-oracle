import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "mystical-yellow": "hsl(var(--mystical-yellow))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        oldenburg: ["Oldenburg", "serif"],
        aleo: ["Aleo", "serif"],
        dmSans: ["DM Sans", "sans-serif"],
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "smoke-drift": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(30px)" },
        },
        "magical-glow": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0", transform: "scale(0) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(180deg)" },
        },
        "glow-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 20px hsl(200 100% 70% / 0.4))",
          },
          "50%": {
            filter: "drop-shadow(0 0 40px hsl(200 100% 70% / 0.8))",
          },
        },
        "float-up": {
          "0%": { transform: "translateY(70%)", opacity: "0.8" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(120%)", opacity: "0" },
        },
        "card-flip": {
          "0%": { transform: "rotateY(180deg) scale(0.9)", opacity: "0" },
          "100%": { transform: "rotateY(0deg) scale(1)", opacity: "1" },
        },
        "card-rise": {
          "0%": { transform: "translateY(50px) scale(0.9)", opacity: "0" },
          "100%": { transform: "translateY(-20px) scale(1)", opacity: "1" },
        },

        // Keep this — CardDeck uses it ONLY for the TOP card shake
        "shuffle-jitter": {
          "0%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "12%": { transform: "translate3d(-6px, 2px, 0) rotate(-1.6deg)" },
          "26%": { transform: "translate3d(7px, -3px, 0) rotate(2deg)" },
          "42%": { transform: "translate3d(-5px, 3px, 0) rotate(-1.5deg)" },
          "60%": { transform: "translate3d(4px, -2px, 0) rotate(1.1deg)" },
          "78%": { transform: "translate3d(-2px, 1px, 0) rotate(-0.6deg)" },
          "100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        twinkle: "twinkle 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float-up": "float-up 1s ease-out forwards",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "slide-down": "slide-down 0.6s ease-in forwards",
        "smoke-drift": "smoke-drift 8s ease-in-out infinite",

        // Top-card shake only (duration controlled in CardDeck via SHUFFLE_DURATION)
        "shuffle-jitter": "shuffle-jitter 900ms ease-in-out both",

        "card-flip": "card-flip 0.8s ease-out 1.2s forwards",
        "card-rise": "card-rise 0.8s ease-out forwards",
        "magical-glow": "magical-glow 1.2s ease-out forwards",
        sparkle: "sparkle 1.2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;