/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    transitionDuration: {
      DEFAULT: '200ms',
    },
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
    },
    extend: {
      colors: {
        'silkway-light-orange': '#e1c8a3',
        'silkway-orange': '#D4B07B',
        'silkway-dark-orange': '#AE8F64',
        'silkway-gray': '#777777',
        'silkway-light-gray': '#DFE1E3',
        'silkway-dark-chocolate': '#362102',
        'silkway-light-chocolate': '#583C21',
        'silkway-green': '#004741',
        'silkway-light-green': '#006159',
        'silkway-milk': '#F8F6F2',
        'silkway-dark-milk': '#F1EDE5',
        white: '#fff',
      },
      screens: {
        'header-1': '1623px',
        'header-2': '1363px',
        'header-3': '1311px',
        'header-4': '1187px',
        'header-5': '874px',
        'header-6': '800px',
        'header-7': '759px',
        'header-8': '680px',
        'header-9': '400px',

        'footer-1': '437px',
        'footer-1.7': '605px',
        'footer-1.8': '670px',
        'footer-2': '1288px',
        'footer-3': '874px',
        'footer-4': '400px',
      },
    },
  },
  plugins: [],
}
