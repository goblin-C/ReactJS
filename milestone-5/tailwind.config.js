/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
        tableHeader: ['12px', { lineHeight: '16px', letterSpacing: '0.018em' }],
        tableContent: ['14px', { lineHeight: '24px', letterSpacing: '-0.006em' }],
      },
      fontWeight: {
        semibold: 600,
        bold: 300,
        normal: 400,
      },
    },
  },
  plugins: [],
}
