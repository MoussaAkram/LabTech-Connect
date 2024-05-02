/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
}

