/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        customPing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        }
      },
      animation: {
        'custom-ping': 'customPing 1s cubic-bezier(0, 0, 0.2, 1) forwards',
      }
    },
  },
  plugins: [],
}
