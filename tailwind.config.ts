import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f4f6f5',
          100: '#e3e8e5',
          200: '#c2cdc7',
          300: '#94a59c',
          400: '#677a70',
          500: '#475a51',
          600: '#36463e',
          700: '#28332d',
          800: '#1a221d',
          900: '#0f1612',
          950: '#070b09',
        },
        emerald: {
          50: '#eef9f1',
          100: '#d3efd9',
          200: '#a6dcb3',
          300: '#6fc18a',
          400: '#3fa168',
          500: '#1f8454',
          600: '#106644',
          700: '#0b5038',
          800: '#0a3d2c',
          900: '#082e22',
          950: '#03150f',
        },
        cream: {
          50: '#fcfaf3',
          100: '#f6f1e8',
          200: '#ece4d2',
          300: '#dccfae',
          400: '#c3b485',
          500: '#a39361',
          600: '#7e7146',
          700: '#5e5436',
          800: '#3f3826',
          900: '#2a2519',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'shimmer': 'shimmer 6s linear infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
