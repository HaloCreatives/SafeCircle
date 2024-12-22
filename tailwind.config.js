/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1E3D58',
        'accent': '#FF7E00',
        'safe-bg': '#F2F2F2',
        'safe-green': '#2E7D32',
        'alert-red': '#DC3545'
      },
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'sans-serif']
      },
      spacing: {
        '1/2': '0.125rem',
        '3/2': '0.375rem',
        '5/2': '0.625rem',
        '7': '1.75rem',
        '9': '2.25rem',
        '11': '2.75rem',
        '13': '3.25rem',
        '15': '3.75rem'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      }
    }
  },
  plugins: []
};