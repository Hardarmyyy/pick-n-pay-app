/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3.5s linear infinite',
        'spin-circle': 'circle 1.5s linear infinite'
      },
      keyframes: {
        spin: {
          '25%': { transform: 'scale(.5)' },
          '50%': { transform: 'scale(.75)' },
          '75%': { transform: 'scale(W.75)' },
          '100%': { transform: 'scale(1)' },
        },
        circle: {
          '0%': {transform: 'rotate(0deg)'},
          '100%': {transform: 'rotate(360deg)'}
        }
      },
      colors: {
        'crimson': '#DC143C',
        'my-primary': '#333333',
        'my-bg-primary': ' rgb(16, 15, 15, 0.6)'
      },
      fontFamily: {
        'Jost': ['Jost', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif']
      },
      screens: {
        'ssm': {'max': '320px'},
        // => @media (max-width: 320px) { ... }

        'xsm': {'max': '375px'},
        // => @media (max-width: 375px) { ... }

        'sm': {'min':'320px','max': '425px'},
        // => @media (min-width: 320px and max-width: 425px) { ... }

        'md': {'min':'426px','max': '640px'},
        // => @media (min-width: 425px and max-width: 640px) { ... }

        'tablet': {'min':'641px','max': '768px'},
        // => @media (min-width: 640px and max-width: 768px) { ... }

        'mini': {'min':'769px', 'max': '1024px'},
        // => @media (min-width: 768px and max-width: 1024px) { ... }

        'laptop': {'min':'1025px', 'max': '1440px'},
        // => @media (min-width: 1024px and max-width: 1440px) { ... }

        'super': {'min': '1441px'},
        // => @media (min-width: 1440px) { ... }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

