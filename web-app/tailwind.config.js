/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
import * as COLORS from './src/consts/colors'
import * as SIZES from './src/consts/sizes'
import gradients from 'tailwindcss-gradients';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'londrina': ['Londrina Shadow'],
        'encode-bold':['Encode Sans Condensed-Bold'],
        'encode':['Encode Sans Condensed'],
        'abril':['Abril'],
      },
      fontSize: {
        'starStats': '2.5rem',
        'mainPageSubTitles': '1.7rem',
        'btn-card': SIZES.BTN_CARD, // Añade tu propio tamaño de fuente aquí,
        'size-card': SIZES.LETTERS_CARDS,
      },
      colors:{
        'green-star-stats': COLORS.GREEN_STAR_STATS,
        'gray-star-stats': COLORS.GRAY_STAR_STATS,
        'negro-vineta': "#18181b",
        'gold-card': COLORS.GOLD_CARD,
        'green-card': COLORS.GREEN_STATE_CARD,
      },
      height:{
        'h-btn-navbar': SIZES.H_BTN_NAVBAR,
        'explanationCard': '25rem',
        'footerHeight': '13rem',
        'card': SIZES.H_CARD,
        'container-cards': SIZES.H_CONTAINER_CARDS,
        'pie-chart': SIZES.H_PIECHART
      },
      width:{
        'w-btn-navbar': SIZES.W_BTN_NAVBAR,
        'btn-navbar-rest': SIZES.W_BTN_NAVBAR_REST,
        'bar-navbar': '46rem',
        'search-bar-navbar':'37.5rem',
        'explanationCard': '27rem',
        'pop-up-search-bar': SIZES.POP_UP_SEARCH_BAR,
        'card': SIZES.W_CARD,
        'container-cards': SIZES.W_CONTAINER_CARDS,
        'pie-chart': SIZES.W_PIECHART,
        'histogram': SIZES.W_HISTOGRAM

      },
      textShadow: {
      'text-pag-ini':'1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000',
      'none': 'none',
      },
      backgroundImage: theme => ({
        'gradient-color': 'linear-gradient(to right, ' + theme('colors.color-start') + ', ' + theme('colors.color-end') + ')'
      }),
      spacing: {
        'card-elements': '0.35rem', // Añade tu medida de gap personalizada
      },
      gradients:{
        'black-gray': [ '90deg', '#000000', '#737373' ],
      },
    },
    
  },
  darkMode: "class",
  plugins: [
    nextui(),
    gradients,
  ],
}

