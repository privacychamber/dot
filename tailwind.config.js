/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        secondary: '#121212',
        surface: '#1A1A1A',
        textPrimary: '#F5F5F5',
        textSecondary: '#A3A3A3',
        accentBlue: '#4F8CFF',
        accentPurple: '#8B5CF6',
        accentOrange: '#FF5A36',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
