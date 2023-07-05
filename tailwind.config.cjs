const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: colors.gray,
        dark : {
          900 : '#111111',
          50 : '#757575',
          100 : '#1E1E1E'
        },
      },
      fontFamily: {
        'open-sans' : ['Open Sans', 'sans-serif'],
        'inter' : ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@headlessui/tailwindcss'),
    require('@tailwindcss/forms'),
  ],
}
