/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          200: '#aacbff',
          300: '#64a5fe',
          600: '#007cff',
          800: '#0062d1'
        },
        red: {
          400: '#ff745c',
          600: '#ff5e43'
        },
        gray: {
          800: '#1b2e35'
        }
      }
    },
  },
  plugins: [],
}

