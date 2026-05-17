/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cuate: {
          teal: '#2A9D87',
          light: '#3AC0A6',
          blue: '#1C3581',
          bg: '#F2F7F6',
          sidebar: '#122252',
          dark: '#0A1329',
          orange: '#E76F51',
          yellow: '#F4A261',
          purple: '#7C4DFF',
          textsoft: '#527570',
          textlight: '#B3D1CC',
        },
      },
    },
  },
  plugins: [],
}
