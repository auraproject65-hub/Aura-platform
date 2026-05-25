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
        background: '#0B0F19',
        foreground: '#F8FBFF',
        'aura-blue': '#0B0F19',
        'aura-cyan': '#00E5FF',
        'aura-muted': '#8AA3C7',
        border: 'rgba(0,229,255,0.2)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(0,229,255,0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSlow: 'pulse 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
