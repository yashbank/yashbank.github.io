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

export function ObNav({ activeId }: { activeId: string }) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const loc = useLocation()
  const home = loc.pathname === '/'

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    if (home) window.setTimeout(() => scrollToId(id), open ? 450 : 0)
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${solid && !open ? 'bg-[#08080a]/70 backdrop-blur-xl' : ''}`}>
        <div className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-700 md:px-10 ${solid ? 'py-3' : 'py-6'}`}>
          <Link to="/" className="group flex items-baseline gap-3" aria-label="Home">
            <span className="font-display text-2xl italic text-[#d9b877]">YB</span>
            <span className="ob-label hidden text-white/50 sm:inline">AI · Product engineer</span>
          </Link>
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {LINKS.map((l, i) => (
              <a key={l.id} href={home ? `#${l.id}` : `/#${l.id}`} onClick={(e) => { if (home) { e.preventDefault(); go(l.id) } }} className={`group relative text-[13px] tracking-wide transition-colors ${activeId === l.id ? 'text-[#efdcae]' : 'text-white/55 hover:text-white'}`}>
                <span className="mr-2 font-mono text-[10px] text-[#d9b877]/60">0{i + 1}</span>
                {l.label}
                <span className={`absolute -bottom-1.5 left-0 h-px bg-[#d9b877] transition-all duration-500 ${activeId === l.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3 md:gap-6">
            <ThemeSwitch className="text-white/70 hover:text-white" />
            <a href={`mailto:${SITE.email}`} className="hidden rounded-full border border-[#d9b877]/40 px-5 py-2.5 text-[13px] text-[#efdcae] transition hover:bg-[#d9b877] hover:text-black md:inline-block">Let’s talk</a>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="relative flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden">
              <span className={`block h-px w-7 bg-white transition-transform duration-500 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`block h-px w-7 bg-white transition-transform duration-500 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-[45] flex flex-col justify-between bg-[#08080a] px-6 pb-10 pt-28" initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }} animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }} exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
            <nav className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id) }} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-[clamp(2.6rem,11vw,4rem)] leading-none text-white">
                  <span className="font-mono text-xs text-[#d9b877]">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="space-y-2 text-sm text-white/60">
              <a href={`mailto:${SITE.email}`} className="block text-[#efdcae]">{SITE.email}</a>
              <p>{SITE.location}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
