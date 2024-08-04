/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#65558F',
        onPrimary: '#FFFFFF',
        primaryContainer: '#EADDFF',
        onPrimaryContainer: '#21005D',
        onSurface: '#1D1B20',
        onSurfaceVar: '#49454F',
        surfContainerLow: '#F7F2FA',
        outlineVar: '#CAC4D0',
        surfaceTint: '#6750A4',
        surfContainerHigh: '#ECE6F0'
      },
      fontSize: {
        '4xl': '96px',
        '3xl': '76px',
        '2xl': '64px',
        'xl': '45px',
        'lg': '32px',
        'base': '24px',
        'sm': '14px',
        'xs': '12px',
      }
    },
  },
  plugins: [],
}