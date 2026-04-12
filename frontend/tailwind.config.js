/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
        tiro: ['"Tiro Devanagari Hindi"', 'serif'],
        noto: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      keyframes: {
        zoomPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        zoomPulse: 'zoomPulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
