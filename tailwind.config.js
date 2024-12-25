/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
      },
      colors: {
        gradientStart: '#FF0000',  // YouTube Red
        gradientEnd: '#FF4500',    // Orange-red end of gradient
      },
    },
  },
  plugins: [],
}