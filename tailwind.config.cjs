/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },

  theme: {
    colors: {
      bistre: '#342a21',
      'baby-powder': '#fbfefb',
      'slate-gray': '#628395',
      'middle-gray': '#8A897C',
      'sizzling-red': '#EB5160',
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
    },
    fontFamily: {
      header: ['Montserrat', 'sans-serif'],
      body: ['Hind Madurai', 'sans-serif'],
      alternative: ['Puritan', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
