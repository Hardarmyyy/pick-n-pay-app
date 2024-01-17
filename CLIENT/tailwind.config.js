/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crimson': '#DC143C',
        'my-primary': '#333333',
        'my-bg-primary': ' rgb(16, 15, 15, 0.6)'
      },
      fontFamily: {
        'Jost': ['Jost', 'sans-serif'],
        'Montserrat': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

