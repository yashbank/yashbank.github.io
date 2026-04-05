import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SITE } from '@/assets/content'
import { SiteLogo } from '@/components/SiteLogo'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'why-hire', label: 'Why hire' },
  { id: 'contact', label: 'Contact' },
] as const

type Props = {
  activeId: string
}

export function Navbar({ activeId }: Props) {
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-surface/50 backdrop-blur-3xl supports-[backdrop-filter]:bg-surface/40">
      <nav
        className="container-site flex max-w-6xl items-center justify-between gap-4 py-4"
        aria-label="Primary"
      >
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('hero')
          }}
          className="transition hover:opacity-90"
          aria-label="Home"
        >
          <SiteLogo />
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((link) => {
            const isActive = activeId === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollTo(link.id)
                  }}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'nav-link-active' : 'nav-link-idle'
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={SITE.resumePath}
            download
            className="rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-accent/30 hover:text-white"
          >
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('contact')
            }}
            className="btn-nav-primary"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm lg:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex w-5 flex-col gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-full bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-full bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-full bg-white"
            />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-site flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                      activeId === link.id
                        ? 'bg-white/10 text-white shadow-glow'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                <a
                  href={SITE.resumePath}
                  download
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-gray-200"
                >
                  Download resume
                </a>
                <button type="button" onClick={() => scrollTo('contact')} className="btn-nav-primary w-full py-3">
                  Let&apos;s talk
                </button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
