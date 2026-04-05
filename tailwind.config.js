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
          'radial-gradient(ellipse 100% 85% at 50% -35%, rgba(61, 212, 200, 0.09), transparent 58%), radial-gradient(ellipse 70% 55% at 100% 35%, rgba(99, 102, 241, 0.05), transparent 50%), radial-gradient(ellipse 55% 45% at 0% 85%, rgba(61, 212, 200, 0.04), transparent 45%)',
      },
    },
  },
  plugins: [],
}
