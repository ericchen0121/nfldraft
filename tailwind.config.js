/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      minHeight: {
        32: '8rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
}
