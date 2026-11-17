import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { SITE } from '@/assets/content'
import { SiteLogo } from '@/components/SiteLogo'
import { scrollToId } from '@/hooks/useLenis'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'proof', label: 'Proof' },
  { id: 'contact', label: 'Contact' },
] as const

type Props = {
  activeId: string
}

export function Navbar({ activeId }: Props) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollTo = (id: string) => {
    scrollToId(id)
    setOpen(false)
  }

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-surface/70 shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-colors duration-300 supports-[backdrop-filter]:bg-surface/55">
      <nav
        className="container-site flex max-w-6xl items-center justify-between gap-4 py-4"
        aria-label="Primary"
      >
        {isHome ? (
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('hero')
            }}
            className="nav-focus rounded-lg transition hover:opacity-90"
            aria-label="Home"
          >
            <SiteLogo />
          </a>
        ) : (
          <Link
            to="/"
            className="nav-focus rounded-lg transition hover:opacity-90"
            aria-label="Home"
            onClick={() => setOpen(false)}
          >
            <SiteLogo />
          </Link>
        )}

        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((link) => {
            const isActive = isHome && activeId === link.id
            const content = (
              <>
                {link.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </>
            )
            return (
              <li key={link.id}>
                {isHome ? (
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollTo(link.id)
                    }}
                    className={`nav-focus relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'nav-link-active' : 'nav-link-idle'
                    }`}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    to={`/#${link.id}`}
                    className="nav-focus relative rounded-lg px-3 py-2 text-sm font-medium transition-colors nav-link-idle"
                  >
                    {content}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex lg:gap-3">
          {SITE.resumePath ? (
            <a
              href={SITE.resumePath}
              download
              className="nav-focus rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-300 transition duration-200 ease-out hover:border-white/[0.12] hover:text-white"
            >
              Resume
            </a>
          ) : null}
          {isHome ? (
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('contact')
              }}
              className="btn-nav-primary focus-ring"
            >
              Start a project
            </a>
          ) : (
            <Link to="/#contact" className="btn-nav-primary focus-ring">
              Start a project
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2.5 pl-0.5 lg:hidden">
          <button
            type="button"
            className="nav-focus flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 p-2.5 transition-colors duration-200 ease-out hover:bg-white/10"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex w-5 flex-col gap-1.5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="menu-bun h-0.5 w-full bg-white"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="menu-bun h-0.5 w-full bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="menu-bun h-0.5 w-full bg-white"
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/[0.06] bg-surface/95 backdrop-blur-md lg:hidden"
          >
            <ul className="container-site flex flex-col gap-1 py-4">
              {LINKS.map((link) => (
                <li key={link.id}>
                  {isHome ? (
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                        activeId === link.id
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-4">
                {SITE.resumePath ? (
                  <a
                    href={SITE.resumePath}
                    download
                    className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-gray-200"
                  >
                    Download resume
                  </a>
                ) : null}
                {isHome ? (
                  <button type="button" onClick={() => scrollTo('contact')} className="btn-nav-primary w-full py-3">
                    Start a project
                  </button>
                ) : (
                  <Link to="/#contact" className="btn-nav-primary block w-full py-3 text-center" onClick={() => setOpen(false)}>
                    Start a project
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
