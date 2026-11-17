import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const KEY = 'yb-preloaded'

/** One-time luxe intro: counter, monogram, then a two-panel curtain lift. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) !== '1' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return true
    }
  })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!show) {
      onDone()
      return
    }
    document.documentElement.style.overflow = 'hidden'
    const start = performance.now()
    const dur = 1700
    let raf = 0
    const loop = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(loop)
      else {
        window.setTimeout(() => {
          setShow(false)
          document.documentElement.style.overflow = ''
          try { sessionStorage.setItem(KEY, '1') } catch { /* ignore */ }
          onDone()
        }, 350)
      }
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {show ? (
        <motion.div className="fixed inset-0 z-[100]" exit={{ pointerEvents: 'none' }} aria-hidden>
          {(['top', 'bottom'] as const).map((side) => (
            <motion.div
              key={side}
              className={`absolute left-0 right-0 h-1/2 bg-[#08080a] ${side === 'top' ? 'top-0' : 'bottom-0'}`}
              exit={{ y: side === 'top' ? '-100%' : '100%' }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-6xl italic text-[#d9b877] md:text-8xl">YB</p>
            <div className="mt-8 h-px w-48 overflow-hidden bg-white/10 md:w-64">
              <div className="h-full bg-gradient-to-r from-[#f1e0b4] to-[#b88a3e]" style={{ width: `${n}%` }} />
            </div>
            <p className="luxe-label mt-4 tabular-nums">{String(n).padStart(3, '0')}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
