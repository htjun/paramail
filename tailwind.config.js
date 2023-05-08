/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sansEng: ['Inter', 'sans-serif'],
        sansKr: ['Noto Sans ', 'serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        gray: {
          25: '#FCFCFD',
          150: '#E9EBEF',
          250: '#D9DCE2',
          450: '#838995',
        },
        slate: {
          550: '#566175',
        },
        grayBlue: {
          25: '#FCFCFD',
          50: '#F8F9FC',
          100: '#EAECF5',
          200: '#D5D9EB',
          300: '#B3B8DB',
          400: '#717BBC',
          500: '#4E5BA6',
          600: '#3E4784',
          700: '#363F72',
          800: '#293056',
          900: '#101323',
        },
        blue: {
          25: '#F5F9FF',
          850: '#0A40A9',
          960: '#0A207A',
        },
        indigo: {
          25: '#F5F9FF',
        },
      },
      width: {
        18: '4.5rem',
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
      },
      lineHeight: {
        none: '1',
        tight: '1.2',
      },
      backgroundImage: {
        suit: 'linear-gradient(90deg, #0968E5 0%, #091970 100%)',
        subtle: 'linear-gradient(rgba(255,255,255,.15),rgba(255,255,255,0))',
        indigoGradient: 'linear-gradient(110deg, #6C65EF 0%, #271FA4 100%)',
      },
      boxShadow: {
        xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        sm: [
          '0px 1px 2px rgba(16, 24, 40, 0.08)',
          '0px 3px 2px rgba(16, 24, 40, 0.03)',
        ],
        md: [
          '0px 4px 8px -2px rgba(16, 24, 40, 0.1)',
          '0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        ],
        lg: [
          '0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
          '0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
        ],
        xl: [
          '0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
          '0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        ],
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
        btn: [
          '0px 24px 22px rgba(23, 6, 100, 0.04)',
          '0px 9px 8px rgba(23, 6, 100, 0.05)',
          '0px 5px 4px rgba(23, 6, 100, 0.07)',
          '0px 3px 2px rgba(23, 6, 100, 0.08)',
          '0px 1.2px 0.8px rgba(23, 6, 100, 0.12)',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
