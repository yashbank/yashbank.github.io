/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--f-body)', 'system-ui', 'sans-serif'],
        display: ['var(--f-display)', 'Georgia', 'serif'],
        serif: ['var(--f-display)', 'Georgia', 'serif'],
        mono: ['var(--f-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        body: ['var(--f-body)', 'system-ui', 'sans-serif'],
        jp: ['"Zen Kaku Gothic New"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Champagne-gold system: remaps legacy violet/sky/fuchsia utilities site-wide */
        violet: { 50:'rgb(var(--v50) / <alpha-value>)',100:'rgb(var(--v100) / <alpha-value>)',200:'rgb(var(--v200) / <alpha-value>)',300:'rgb(var(--v300) / <alpha-value>)',400:'rgb(var(--v400) / <alpha-value>)',500:'rgb(var(--v500) / <alpha-value>)',600:'rgb(var(--v600) / <alpha-value>)',700:'rgb(var(--v700) / <alpha-value>)',800:'rgb(var(--v800) / <alpha-value>)',900:'rgb(var(--v900) / <alpha-value>)',950:'rgb(var(--v950) / <alpha-value>)' },
        indigo: { 300:'rgb(var(--v300) / <alpha-value>)',400:'rgb(var(--v400) / <alpha-value>)',500:'rgb(var(--v500) / <alpha-value>)',600:'rgb(var(--v600) / <alpha-value>)' },
        purple: { 300:'rgb(var(--v300) / <alpha-value>)',400:'rgb(var(--v400) / <alpha-value>)',500:'rgb(var(--v500) / <alpha-value>)' },
        sky: { 300:'rgb(var(--v200) / <alpha-value>)',400:'rgb(var(--v300) / <alpha-value>)',500:'rgb(var(--v400) / <alpha-value>)',600:'rgb(var(--v500) / <alpha-value>)' },
        cyan: { 300:'rgb(var(--v200) / <alpha-value>)',400:'rgb(var(--v300) / <alpha-value>)',500:'rgb(var(--v400) / <alpha-value>)' },
        fuchsia: { 200:'#f2cfc2',300:'#e9b3a1',400:'#dca08c',500:'#c98770' },
        gold: { DEFAULT:'#d9b877', light:'#f1e0b4', deep:'#9c7a3c' },
        ivory: '#f5efe4',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
          dim: 'rgba(217, 184, 119, 0.1)',
        },
        vermillion: {
          DEFAULT: '#e85d6f',
          soft: '#f49aaa',
          muted: 'rgba(232, 93, 111, 0.12)',
        },
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface-elevated) / <alpha-value>)',
          muted: 'rgb(var(--color-surface-muted) / <alpha-value>)',
        },
      },
      boxShadow: {
        glass:
          '0 4px 24px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
        soft: '0 20px 56px -28px rgba(0, 0, 0, 0.55)',
        glow: '0 0 64px rgba(217, 184, 119, 0.08)',
        'glow-sm': '0 0 32px rgba(217, 184, 119, 0.1)',
        'glow-lg': '0 20px 80px -32px rgba(217, 184, 119, 0.16)',
      },
      backgroundImage: {
        'mesh-gradient':
          'radial-gradient(ellipse 100% 82% at 50% -28%, rgba(159, 143, 255, 0.045), transparent 55%), radial-gradient(ellipse 72% 50% at 100% 16%, rgba(99, 102, 241, 0.032), transparent 54%), radial-gradient(ellipse 50% 42% at 0% 92%, rgba(56, 189, 248, 0.02), transparent 52%)',
        'mesh-gradient-light':
          'radial-gradient(ellipse 108% 84% at 50% -16%, rgba(91, 80, 158, 0.05), transparent 52%), radial-gradient(ellipse 68% 46% at 100% 6%, rgba(120, 113, 108, 0.038), transparent 48%), radial-gradient(ellipse 52% 40% at 0% 98%, rgba(139, 127, 189, 0.034), transparent 50%)',
        'jp-seigaiha':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='28' viewBox='0 0 56 28'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.038' stroke-width='0.5'%3E%3Cpath d='M0 28a14 14 0 0 1 14-14 14 14 0 0 1 14 14'/%3E%3Cpath d='M28 28a14 14 0 0 1 14-14 14 14 0 0 1 14 14'/%3E%3C/g%3E%3C/svg%3E\")",
        'jp-seigaiha-light':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='28' viewBox='0 0 56 28'%3E%3Cg fill='none' stroke='%2357534e' stroke-opacity='0.07' stroke-width='0.5'%3E%3Cpath d='M0 28a14 14 0 0 1 14-14 14 14 0 0 1 14 14'/%3E%3Cpath d='M28 28a14 14 0 0 1 14-14 14 14 0 0 1 14 14'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
