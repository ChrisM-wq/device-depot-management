/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7315e5',
        secondary: '#D8D4F2',
        black: '#26282a',
        errorRed: '#FF7F7F',
        default: '#E5E4E2',
      }
    },
  },
  plugins: [],
}