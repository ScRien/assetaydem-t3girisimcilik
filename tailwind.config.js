/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0a0a0f',
        card: '#0d0d16',
        primary: '#00e5ff',
        secondary: '#7c3aed',
        accent: '#ff6b35',
        danger: '#ff0044',
        textMain: '#f0f0f0',
        textMuted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neon-primary': '0 0 20px rgba(0,229,255,0.3), 0 0 60px rgba(0,229,255,0.1)',
        'neon-secondary': '0 0 20px rgba(124,58,237,0.3)',
        card: '0 4px 32px rgba(0,0,0,0.7)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0,229,255,0.2)' },
          '50%': { boxShadow: '0 0 50px rgba(0,229,255,0.5)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
