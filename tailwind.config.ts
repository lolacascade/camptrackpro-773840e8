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
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        'body-large': ['1.125rem', '1.75rem'],   // 18px
        'heading-large': ['3.5rem', '1.2'],      // 56px
        'heading-medium': ['2.5rem', '1.2'],     // 40px
        'subheading': ['1.25rem', '1.6'],        // 20px
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FFFFFF",
        foreground: "#0D1D1F",
        primary: {
          DEFAULT: "#C0CCAB",
          foreground: "#0D1D1F",
        },
        secondary: {
          DEFAULT: "#0D1D1F",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#C0CCAB",
          foreground: "#0D1D1F",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0D1D1F",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;