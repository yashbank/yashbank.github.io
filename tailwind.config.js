/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        jp: ['"Zen Kaku Gothic New"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#9f8fff',
          soft: '#c4b8ff',
          dim: 'rgba(159, 143, 255, 0.1)',
        },
        vermillion: {
          DEFAULT: '#e85d6f',
          soft: '#f49aaa',
          muted: 'rgba(232, 93, 111, 0.12)',
        },
        surface: {
          DEFAULT: '#090a10',
          elevated: '#10111a',
          muted: '#151622',
        },
      },
      boxShadow: {
        glass:
          '0 4px 28px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.045) inset',
        soft: '0 24px 64px -28px rgba(0, 0, 0, 0.72)',
        glow: '0 0 90px rgba(159, 143, 255, 0.14)',
        'glow-sm': '0 0 48px rgba(159, 143, 255, 0.2)',
        'glow-lg': '0 28px 110px -32px rgba(159, 143, 255, 0.24)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(ellipse 100% 88% at 50% -36%, rgba(159, 143, 255, 0.11), transparent 54%), radial-gradient(ellipse 72% 58% at 106% 24%, rgba(99, 102, 241, 0.07), transparent 52%), radial-gradient(ellipse 58% 50% at -4% 90%, rgba(56, 189, 248, 0.045), transparent 48%), radial-gradient(circle at 90% 8%, rgba(232, 93, 111, 0.06), transparent 44%), radial-gradient(ellipse 52% 38% at 18% 100%, rgba(167, 139, 250, 0.04), transparent 52%)',
        'jp-seigaiha':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='28' viewBox='0 0 56 28'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.055' stroke-width='0.55'%3E%3Cpath d='M0 28a14 14 0 0 1 14-14 14 14 0 0 1 14 14'/%3E%3Cpath d='M28 28a14 14 0 0 1 14-14 14 14 0 0 1 14 14'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
