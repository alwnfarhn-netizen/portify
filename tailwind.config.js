/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#fd1843',
          hover: '#e01239'
        },
        secondary: '#fff9fa'
      }
    },
  },
  plugins: [],
}

