/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FDFBF7',
          100: '#F7F2EA',
          200: '#ECE2D0',
          300: '#DECDB5',
          400: '#C7AE8E',
          500: '#A78B64',
          600: '#876D49',
          700: '#685234',
          800: '#4B3A23',
          900: '#2F2314',
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#FAECE6',
          200: '#F4D5C9',
          300: '#EAB7A5',
          400: '#DC8E73',
          500: '#C86543',
          600: '#AD4D2D',
          700: '#8A3B22',
          800: '#682E1C',
          900: '#462014',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E6ECE8',
          200: '#CDDAD1',
          300: '#ACC1B4',
          400: '#83A390',
          500: '#5F836E',
          600: '#496756',
          700: '#384F42',
          800: '#2A3C32',
          900: '#1D2A23',
        },
        navy: {
          800: '#1E293B',
          900: '#0F172A',
          950: '#0B0F19',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        hindi: ['"Noto Sans Devanagari"', '"Plus Jakarta Sans"', 'sans-serif'],
        dyslexic: ['"OpenDyslexic"', '"Comic Sans MS"', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(75, 58, 35, 0.05), 0 1px 2px rgba(75, 58, 35, 0.08)',
        'warm-md': '0 4px 12px -1px rgba(75, 58, 35, 0.08), 0 2px 6px -1px rgba(75, 58, 35, 0.06)',
        'warm-lg': '0 12px 24px -3px rgba(75, 58, 35, 0.1), 0 4px 12px -2px rgba(75, 58, 35, 0.05)',
        'warm-xl': '0 20px 32px -4px rgba(75, 58, 35, 0.14), 0 8px 16px -4px rgba(75, 58, 35, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-subtle': 'pulseSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        }
      }
    },
  },
  plugins: [],
}
