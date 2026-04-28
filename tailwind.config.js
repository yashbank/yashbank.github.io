/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#3dd4c8',
          soft: '#5ee0d6',
          dim: 'rgba(61, 212, 200, 0.09)',
        },
        surface: {
          DEFAULT: '#0b0b0f',
          elevated: '#12121a',
          muted: '#18181f',
        },
      },
      boxShadow: {
        glass:
          '0 4px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
        soft: '0 20px 60px -24px rgba(0, 0, 0, 0.65)',
        glow: '0 0 80px rgba(61, 212, 200, 0.12)',
        'glow-sm': '0 0 40px rgba(61, 212, 200, 0.18)',
        'glow-lg': '0 24px 100px -28px rgba(61, 212, 200, 0.22)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(ellipse 110% 90% at 50% -40%, rgba(61, 212, 200, 0.11), transparent 55%), radial-gradient(ellipse 75% 60% at 100% 28%, rgba(129, 140, 248, 0.08), transparent 52%), radial-gradient(ellipse 60% 50% at 0% 88%, rgba(45, 212, 191, 0.05), transparent 48%), radial-gradient(ellipse 45% 40% at 85% 92%, rgba(99, 102, 241, 0.04), transparent 50%)',
      },
    },
  },
  plugins: [],
}
