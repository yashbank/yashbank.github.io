import { useTheme } from '@/theme/ThemeContext'

/** Minimal text-based theme switch; styled by parent classes. */
export function ThemeSwitch({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  return (
    <button type="button" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 }) }} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} className={`group inline-flex min-h-[44px] items-center gap-3 ${className}`}>
      <span className="relative block h-5 w-10 rounded-full border border-current/40">
        <span className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${dark ? 'left-1' : 'left-6'}`} />
      </span>
      <span className="hidden text-[11px] uppercase tracking-[0.18em] sm:inline">{dark ? 'Obsidian' : 'Ivory'}</span>
    </button>
  )
}
