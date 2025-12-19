/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': '#000000',
        'deep-space-light': '#111111',
        'cyber-cyan': '#FFFFFF', // Replaced cyan with white for main accents
        'cyber-green': '#A0A0A0', // Replaced green with gray/silver
        'glass-dark': 'rgba(0, 0, 0, 0.7)', // Neutral black glass
        'glass-border': 'rgba(255, 255, 255, 0.1)', // White border
      },
      fontFamily: {
        'mono': ['Fira Code', 'Source Code Pro', 'Consolas', 'monospace'],
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 255, 255, 0.1)',
        'glow-sm': '0 0 8px rgba(255, 255, 255, 0.05)',
        'glow-lg': '0 0 25px rgba(255, 255, 255, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0, 255, 255, 0.5)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
