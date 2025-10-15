/**** @type {import('tailwindcss').Config} ****/
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0B1221',
        orbit: '#111B2B',
        aurora: {
          light: '#60E1FA',
          DEFAULT: '#15C2F5',
          dark: '#0891B2'
        },
        solar: '#FCD34D',
        plasma: '#A855F7'
      },
      fontFamily: {
        display: ['"Sora"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 20px 45px -20px rgba(96, 225, 250, 0.45)'
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at 20% 20%, rgba(21, 194, 245, 0.25), transparent 55%), radial-gradient(circle at 80% 0%, rgba(168, 85, 247, 0.2), transparent 50%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.65', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' }
        }
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
