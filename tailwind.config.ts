import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0E14',
        foreground: '#F5F6F8',
        ink: '#0B0E14',
        canvas: '#F5F6F8',
        'aura-cyan': '#00E5FF',
        'aura-muted': '#98A6C3',
        accentGold: '#C9A96E',
        accentBlue: '#1E3A8A',
        border: 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        premium: '0 30px 80px rgba(3, 7, 18, 0.45)',
        glow: '0 0 40px rgba(0,229,255,0.22)',
        gold: '0 30px 70px rgba(201, 169, 110, 0.18)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseSlow: 'pulse 5.5s ease-in-out infinite',
        drift: 'drift 16s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(12px, -18px, 0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
