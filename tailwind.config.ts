import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071A2B',
          green: '#22C55E',
          cyan: '#06B6D4',
          bg: '#F7FAFC',
          dark: '#06131F',
          text: '#102A43',
          white: '#FFFFFF'
        }
      },
      boxShadow: {
        soft: '0 20px 45px rgba(7, 26, 43, 0.08)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.14) 1px, transparent 1px)',
        glow: 'radial-gradient(circle at top left, rgba(34,197,94,0.20), transparent 32%), radial-gradient(circle at top right, rgba(6,182,212,0.20), transparent 28%)'
      }
    }
  },
  plugins: []
};

export default config;
