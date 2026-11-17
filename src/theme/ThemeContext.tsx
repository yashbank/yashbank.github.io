/* eslint-disable react-refresh/only-export-components -- useTheme is intentionally colocated with ThemeProvider */
import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'

type ThemeContextValue = {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: (origin?: { x: number; y: number }) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {
    /* ignore */
  }
  return 'dark'
}

function persist(t: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, t)
  } catch {
    /* ignore */
  }
}

const WIPE = {
  dark: { bg: '#08080a', fg: '#efdcae', accent: '#d9b877', name: 'Obsidian', note: 'Gold on black', font: "'Instrument Serif', serif" },
  light: { bg: '#f1ebdf', fg: '#15120e', accent: '#962e1b', name: 'Ivory', note: 'Ink on paper', font: "'Fraunces', serif" },
} as const

function ThemeWipe({ wipe }: { wipe: { to: Theme; x: number; y: number } | null }) {
  return (
    <AnimatePresence>
      {wipe ? (
        <motion.div
          key={wipe.to}
          aria-hidden
          className="fixed inset-0 z-[300] flex items-center justify-center"
          style={{ background: WIPE[wipe.to].bg, color: WIPE[wipe.to].fg }}
          initial={{ clipPath: `circle(0px at ${wipe.x}px ${wipe.y}px)` }}
          animate={{ clipPath: `circle(160vmax at ${wipe.x}px ${wipe.y}px)` }}
          exit={{ opacity: 0 }}
          transition={{ clipPath: { duration: 0.95, ease: [0.76, 0, 0.24, 1] }, opacity: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <motion.div className="text-center" initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <p style={{ fontFamily: WIPE[wipe.to].font, fontSize: 'clamp(3.5rem,14vw,10rem)', lineHeight: 0.9, fontStyle: 'italic', color: WIPE[wipe.to].accent }}>{WIPE[wipe.to].name}</p>
            <p style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', marginTop: 18, opacity: 0.6 }}>{WIPE[wipe.to].note}</p>
            <div style={{ margin: '28px auto 0', height: 1, width: 180, background: 'rgba(128,128,128,0.3)', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', background: WIPE[wipe.to].accent }} initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ delay: 0.75, duration: 1.1, ease: 'easeInOut' }} />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'dark' : readStored(),
  )

  const apply = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t
    document.documentElement.style.colorScheme = t === 'light' ? 'light' : 'dark'
  }, [])

  useLayoutEffect(() => {
    apply(theme)
  }, [theme, apply])

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t)
      persist(t)
      apply(t)
    },
    [apply],
  )

  const [wipe, setWipe] = useState<{ to: Theme; x: number; y: number } | null>(null)

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      if (wipe) return
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        setTheme(next)
        return
      }
      setWipe({ to: next, x: origin?.x ?? window.innerWidth - 60, y: origin?.y ?? 40 })
      // swap the theme while the wipe fully covers the page
      window.setTimeout(() => setTheme(next), 950)
      window.setTimeout(() => setWipe(null), 2100)
    },
    [theme, wipe, setTheme],
  )

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <ThemeWipe wipe={wipe} />
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
