const tailwindcss = require('tailwindcss')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'leaf-green': '#61b33b'
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms'
      }
    },
    minHeight: {
      '300': '300px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
