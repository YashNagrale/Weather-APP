/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    extend: {
      backgroundImage: {
        'wether-image': "url('/assets/wether-img.webp')",
      },
      dropShadow: {
        '3xl': '0 35px 35px #00000091',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      screens: {
        'xs': { 'max': '639px' },
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}

