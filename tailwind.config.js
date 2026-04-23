/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0a0a0f',
        card: '#0d0d14',
        border: '#1a1a2e',
        primary: '#00e5ff',
        secondary: '#7c3aed',
        accent: '#ff6b35',
        danger: '#ff0044',
        textMain: '#f0f0f0',
        textMuted: '#6b7280',
        textDim: '#374151',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient': 'gradientShift 6s ease infinite',
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgba(0, 229, 255, 0.3), 0 0 60px rgba(0, 229, 255, 0.1)',
        'neon-secondary': '0 0 20px rgba(124, 58, 237, 0.3), 0 0 60px rgba(124, 58, 237, 0.1)',
        'neon-accent': '0 0 20px rgba(255, 107, 53, 0.3), 0 0 60px rgba(255, 107, 53, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}