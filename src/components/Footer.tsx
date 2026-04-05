import { SITE, SOCIAL_LINKS } from '@/assets/content'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface-muted/40 py-16 backdrop-blur-xl">
      <div className="container-site flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        <div className="text-center md:text-left">
          <p className="font-display text-xl font-semibold tracking-tight text-white/95">
            {SITE.name}
            <span className="text-accent/90">.</span>
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">{SITE.tagline}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition duration-300 hover:text-accent/90"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-12 text-center text-xs text-gray-600/90">
        © {YEAR} {SITE.name}. Crafted with React, Tailwind, Framer Motion & GSAP.
      </p>
    </footer>
  )
}
