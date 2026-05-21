import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#e9ecf1',
          200: '#cfd5e0',
          300: '#a8b1c2',
          400: '#7a8499',
          500: '#5a6479',
          600: '#454d60',
          700: '#363c4c',
          800: '#1f2330',
          900: '#10131c',
          950: '#070912',
        },
        gold: {
          50: '#fbf8ef',
          100: '#f4eccf',
          200: '#ead89f',
          300: '#dfbf6a',
          400: '#d5a847',
          500: '#c08e2d',
          600: '#a06f23',
          700: '#7d5320',
          800: '#5d3d1f',
          900: '#4a311c',
        },
        aqua: {
          50: '#eefaff',
          100: '#daf3ff',
          200: '#b6e7ff',
          300: '#7dd6ff',
          400: '#3cbcff',
          500: '#0fa1ff',
          600: '#0080e5',
          700: '#0066b8',
          800: '#085691',
          900: '#0d4878',
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
        'shimmer': 'shimmer 2.4s linear infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'aurora': 'aurora 18s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-14px) translateX(6px)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
