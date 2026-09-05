/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#DC2626',
        steel: '#94A3B8',
        base: '#0A0A0F',
        navy: '#0D1117',
      },
    },
  },
  plugins: [],
}
