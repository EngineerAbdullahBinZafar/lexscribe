/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './audit-sample.html',
    './dossiers.html',
    './jurisprudence.html',
    './terms.html',
    './app.js',
    './translations.js'
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C5A059',
          light: '#F5D77F',
          dark: '#826026',
          foil: '#D4AF37'
        },
        navy: {
          DEFAULT: '#0A3822',
          dark: '#052014',
          light: '#135A38',
          elevated: '#082C1B'
        },
        chambers: {
          DEFAULT: '#0A3822',
          dark: '#052014',
          deep: '#04170E',
          light: '#135A38'
        },
        emerald: {
          DEFAULT: '#0A3822',
          dark: '#052014',
          deep: '#04170E',
          light: '#135A38'
        },
        oxblood: {
          DEFAULT: '#6A0D1D',
          dark: '#480611',
          light: '#8A162B'
        },
        forest: {
          DEFAULT: '#0A3822',
          dark: '#052014',
          light: '#135A38'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        urdu: ['"Noto Nastaliq Urdu"', 'serif']
      }
    }
  },
  plugins: []
};
