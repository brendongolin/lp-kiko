/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        agro: {
          green: {
            light: '#2D6A4F',
            DEFAULT: '#1B4332',
            dark: '#081C15',
          },
          brown: {
            light: '#6D4C41',
            DEFAULT: '#4E342E',
            dark: '#2D1F1C',
          },
          gold: {
            light: '#E9C46A',
            DEFAULT: '#D4A373',
            dark: '#B88B5D',
          },
          cream: '#F8F9FA',
          slate: '#495057',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
