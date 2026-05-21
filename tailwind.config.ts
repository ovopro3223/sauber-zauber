import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f3f5f3',
          100: '#e4e8e5',
          200: '#c2cdc6',
          300: '#94a59b',
          400: '#5e7068',
          500: '#3e504a',
          600: '#2b3b35',
          700: '#1d2a25',
          800: '#121b17',
          900: '#0a110e',
          950: '#060808',
        },
        // Brand emerald — deep, rich, natural greens
        emerald: {
          50: '#eef5f0',
          100: '#dceadf',
          200: '#b3d3c0',
          300: '#79b194',
          400: '#4a9270',
          500: '#2d7a55', // elegant natural green (accent)
          600: '#1a6b48',
          700: '#14543a', // primary brand emerald
          800: '#0f3527',
          900: '#0a2418', // rich dark green
          950: '#051512',
        },
        // Warm white / soft ivory
        ivory: {
          50: '#fbf8f0',
          100: '#f5f0e3', // primary warm white
          200: '#ece4cf',
          300: '#dccfae',
          400: '#bfae7e',
          500: '#9c8a55',
          600: '#766741',
          700: '#564b30',
          800: '#3a3322',
          900: '#241f16',
        },
        // Soft cream highlights
        cream: {
          DEFAULT: '#ebe2cb',
          soft: '#f0e8d5',
        },
        // Subtle gold accent — used very lightly
        gold: {
          300: '#dcc488',
          400: '#c8aa68',
          500: '#a38745',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
