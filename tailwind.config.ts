import type { Config } from "tailwindcss";
import { colors } from "./src/config/tailwind/colors";
import { typography } from "./src/config/tailwind/typography";
import { layout } from "./src/config/tailwind/layout";
import { animations } from "./src/config/tailwind/animations";

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
    ...layout,
    extend: {
      ...typography,
      colors,
      ...animations,
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',    // 2px
        'DEFAULT': '0.25rem', // 4px
        'md': '0.375rem',    // 6px
        'lg': '0.5rem',      // 8px
        'xl': '0.75rem',     // 12px
        '2xl': '1rem',       // 16px
        '3xl': '1.5rem',     // 24px
        'full': '9999px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;