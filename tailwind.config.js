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
        blue: {
          50: '#FCFCFD',
          100: '#F9FAFB',
          150: '#F3F4F7',
          175: '#EAECF0',
          900: '#101828',
        },
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
      },
      backgroundImage: {
        suit: 'linear-gradient(87.97deg, #0968E5 0%, #091970 102.09%)',
      },
    },
  },
  plugins: [],
}
