/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        sidebarHeading: ['18px', { lineHeight: '24px', letterSpacing: '-0.014em' }],
        sidebarItem: ['14px', { lineHeight: '24px', letterSpacing: '-0.006em' }],
      },
      fontWeight: {
        semibold: 600,
        bold: 300,
      },
    },
  },
  plugins: [],
}
