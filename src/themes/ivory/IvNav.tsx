import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE } from '@/assets/content'
import { ThemeSwitch } from '@/components/luxe/ThemeSwitch'
import { scrollToId } from '@/hooks/useLenis'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'proof', label: 'Numbers' },
  { id: 'services', label: 'Craft' },
  { id: 'experience', label: 'Path' },
  { id: 'contact', label: 'Contact' },
] as const

export function IvNav({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const home = loc.pathname === '/'

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    if (home) window.setTimeout(() => scrollToId(id), open ? 500 : 0)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#15120e] bg-[#f1ebdf]/90 text-[#15120e] backdrop-blur-md">
        <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
          <Link to="/" className="py-4 font-display text-[1.35rem] leading-none tracking-tight" aria-label="Home">
            Yash Bankar<sup className="ml-0.5 text-[0.55em] text-[#962e1b]">®</sup>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {LINKS.map((l, i) => (
              <a key={l.id} href={home ? `#${l.id}` : `/#${l.id}`} onClick={(e) => { if (home) { e.preventDefault(); go(l.id) } }} className={`iv-ul text-[13px] ${activeId === l.id ? 'text-[#962e1b]' : ''}`}>
                <span className="mr-1 font-mono text-[10px] opacity-50">({String(i + 1).padStart(2, '0')})</span>{l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-5">
            <ThemeSwitch className="text-[#15120e]" />
            <a href={`mailto:${SITE.email}`} className="iv-btn hidden !min-h-[40px] !px-4 text-[13px] lg:inline-flex">Say hello</a>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="min-h-[44px] font-mono text-xs uppercase tracking-[0.12em] md:hidden">{open ? 'Close' : 'Menu'}</button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[45] flex flex-col justify-between bg-[#15120e] px-5 pb-10 pt-24 text-[#f1ebdf]" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <nav>
              {LINKS.map((l, i) => (
                <motion.a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex items-baseline justify-between border-b border-[#f1ebdf]/20 py-4 font-display text-[clamp(2.6rem,12vw,4.2rem)] italic leading-none">
                  {l.label}
                  <span className="font-mono text-xs not-italic opacity-50">({String(i + 1).padStart(2, '0')})</span>
                </motion.a>
              ))}
            </nav>
            <div className="font-mono text-xs uppercase tracking-[0.1em] opacity-70">
              <a href={`mailto:${SITE.email}`} className="block pb-1">{SITE.email}</a>
              {SITE.location}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
