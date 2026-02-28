/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ps-black': '#020617',
        'ps-dark': '#0a0f1e',
        'ps-card': '#0d1424',
        'ps-border': '#1a2540',
      },
      fontFamily: {
        'display': ['"Orbitron"', 'sans-serif'],
        'body': ['"Rajdhani"', 'sans-serif'],
      },
      backgroundImage: {
        'ps-gradient': 'radial-gradient(ellipse at top, #0f1e3d 0%, #020617 70%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse_glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        pulse_glow: 'pulse_glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
