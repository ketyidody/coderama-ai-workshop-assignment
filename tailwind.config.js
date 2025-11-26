/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          900: '#141D2F',
          800: '#1E2A47',
          700: '#2B3442',
          500: '#4B6A9B',
          300: '#697C9A',
          200: '#90A4D4',
          100: '#F6F8FF',
          0: '#FFFFFF',
        },
        blue: {
          300: '#60ABFF',
          500: '#0079FF',
        },
        red: {
          500: '#F74646',
        },
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        'preset-1': ['26px', { lineHeight: '1.2', fontWeight: '700' }],
        'preset-2': ['22px', { lineHeight: '1.4', fontWeight: '700' }],
        'preset-3': ['18px', { lineHeight: '1.4', fontWeight: '400' }],
        'preset-3-mobile': ['13px', { lineHeight: '1.4', fontWeight: '400' }],
        'preset-4': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'preset-5': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        'preset-6': ['15px', { lineHeight: '1.5', fontWeight: '400' }],
        'preset-7': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'preset-8': ['13px', { lineHeight: '1.4', fontWeight: '700', letterSpacing: '2.5px' }],
      },
      spacing: {
        '0': '0',
        '025': '2px',
        '050': '4px',
        '075': '6px',
        '100': '8px',
        '125': '10px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '800': '64px',
        '1000': '80px',
      },
      borderRadius: {
        '0': '0',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        'full': '999px',
      },
      boxShadow: {
        'search-light': '0px 16px 30px -10px rgba(70, 96, 187, 0.2)',
      },
    },
  },
  plugins: [],
}
