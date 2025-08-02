/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#111111",
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
        'table-header-text-color': '#84919A'

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        'navbar-h1': ['32px', { lineHeight: '100%', fontWeight: '400' }],
        'navbar-menu-text': ['16px', { lineHeight: '100%', fontWeight: '400' }],
        'hero-header-text': ['64px', { lineHeight: '100%', fontWeight: '400' }],
        'button-text': ['16px', { lineHeight: '100%', fontWeight: '400' }],
        'hero-stat-text': ['40px', { lineHeight: '100%', fontWeight: '700' }],
        'product-title-text': ['48px', { lineHeight: '100%', fontWeight: '400' }],
        'product-card-title': ['20px', { lineHeight: '100%', fontWeight: '700' }],
        'product-card-price': ['24px', { lineHeight: '100%', fontWeight: '700' }],
        'footer-description-text': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'footer-menu-title': ['16px', { lineHeight: '18px', fontWeight: '500' }],
        'product-view-price': ['32px', { lineHeight: '18px', fontWeight: '700' }],
        'cart-price-details': ['20px', { lineHeight: '100%', fontWeight: '400' }],
        'footer-menu-text': ['16px', { lineHeight: '19px', fontWeight: '400' }],
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
      },
      fontFamily: {
        alfa: ['Alfa Slab One', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
