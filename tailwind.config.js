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
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#344054',
          900: '#101828',
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
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
      },
      backgroundImage: {
        suit: 'linear-gradient(90deg, #0968E5 0%, #091970 100%)',
      },
      dropShadow: {
        xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        sm: [
          '0px 1px 3px rgba(16, 24, 40, 0.1)',
          '0px 1px 2px rgba(16, 24, 40, 0.06)',
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
      },
    },
  },
  plugins: [],
}
