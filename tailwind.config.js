/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#FBF8F5',
          100: '#F5EEE6',
          200: '#EBDED5',
          300: '#D5C2B4',
          400: '#A88E7D',
          500: '#7B5E4F',
          600: '#5C4035',
          700: '#4A2E2B',
          800: '#3D2522',
          900: '#2A1816',
        },
        emergency: {
          50: '#FFF5F5',
          100: '#FDECEB',
          200: '#FBD2CF',
          300: '#F7A7A2',
          400: '#EE6359',
          500: '#E53935',
          600: '#C62828',
          700: '#B71C1C',
          800: '#8E1313',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FAF7F2',
          200: '#F5EFEB',
          300: '#EDE4DC',
          400: '#DFD2C7',
        }
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(62, 39, 35, 0.05), 0 1px 4px -1px rgba(62, 39, 35, 0.03)',
        'card': '0 4px 16px -2px rgba(62, 39, 35, 0.06), 0 2px 6px -1px rgba(62, 39, 35, 0.04)',
        'elevated': '0 10px 25px -4px rgba(62, 39, 35, 0.1), 0 4px 8px -2px rgba(62, 39, 35, 0.05)',
        'emergency': '0 8px 24px -3px rgba(198, 40, 40, 0.32)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
