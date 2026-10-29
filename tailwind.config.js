/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          ivory: '#FAF6F0',
          cream: '#F4ECE1',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#9A7B1C',
          'gold-antique': '#C5A059',
          burgundy: '#6B1D2F',
          ruby: '#8B1E3F',
          crimson: '#9A1B2F',
          'deep-ruby': '#420B15',
          navy: '#0A122A',
          midnight: '#050814',
          emerald: '#16382B',
        }
      },
      fontFamily: {
        royal: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'royal-gold': '0 10px 30px -5px rgba(212, 175, 55, 0.3)',
        'royal-deep': '0 25px 50px -12px rgba(10, 18, 42, 0.5)',
        'royal-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
}
