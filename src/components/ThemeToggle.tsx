import { useTheme } from '@/theme/ThemeContext'

type Props = {
  className?: string
}

/** 56×32 track, centered in a 44px min hit area for touch / WCAG target size. */
export function ThemeToggle({ className = '' }: Props) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      onClick={() => toggleTheme()}
      className={`inline-flex min-h-[44px] min-w-[44px] shrink-0 touch-manipulation items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light appearance' : 'Dark appearance'}
    >
      <span
        className={`theme-toggle relative h-8 w-14 shrink-0 rounded-full border p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-[border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark
            ? 'border-white/[0.1] bg-[#101119]/95 text-gray-400 hover:border-white/[0.14]'
            : 'border-stone-300/80 bg-stone-200/95 text-stone-600 shadow-sm hover:border-violet-300/55'
        }`}
      >
        <span
          className={`pointer-events-none absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isDark
              ? 'translate-x-0 bg-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]'
              : 'translate-x-6 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]'
          }`}
          aria-hidden
        />
        <span className="relative z-[1] flex h-full w-full items-center justify-between px-0.5">
          <span
            className={`flex h-6 w-6 flex-none items-center justify-center transition-colors duration-300 ${
              isDark ? 'text-gray-100' : 'text-zinc-400'
            }`}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>
          </span>
          <span
            className={`flex h-6 w-6 flex-none items-center justify-center transition-colors duration-300 ${
              !isDark ? 'text-amber-600' : 'text-gray-500'
            }`}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="4" />
              <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
            </svg>
          </span>
        </span>
      </span>
    </button>
  )
}
