import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SELECTED_PROJECTS, type PortfolioProject } from '@/data/projects'
import { usePointerVars } from '@/hooks/usePointerVars'
import { gsap } from '@/lib/gsap'
import { publicAssetUrl } from '@/lib/publicAsset'

const projects = SELECTED_PROJECTS

function Card({ p, i, active }: { p: PortfolioProject; i: number; active?: boolean }) {
  const ptr = usePointerVars(5)
  return (
    <Link
      to={`/projects/${p.slug}`}
      {...ptr}
      className={`ob-card group flex h-full w-[82vw] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] p-4 transition-[transform,opacity] duration-500 ease-out will-change-transform sm:w-[60vw] md:w-[44vw] md:p-6 lg:w-[36vw] ${active ? 'max-md:scale-100 max-md:opacity-100' : 'max-md:scale-[0.94] max-md:opacity-60'}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/50">
        {p.imageSrc ? (
          <img src={publicAssetUrl(p.imageSrc)} alt={p.imageAlt ?? p.title} loading="lazy" draggable={false} className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.07]" style={{ objectPosition: p.previewImageObjectPosition ?? 'top' }} />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="ob-label absolute left-4 top-4 rounded-full border border-white/15 bg-black/75 px-3 py-1.5">{p.status === 'flagship' ? 'Flagship' : p.status === 'production' ? 'In production' : 'Project'}</span>
        <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f6efe0] text-black transition duration-500 group-hover:rotate-45 group-hover:bg-[#d9b877]">↗</span>
      </div>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-6">
        <p className="ob-label">{String(i + 1).padStart(2, '0')} — {p.category}</p>
        <h3 className="mt-3 font-display text-[clamp(2.4rem,4.6vw,4.4rem)] leading-[0.95] text-[#f6efe0]">{p.title}</h3>
        <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-white/55">{p.cardLead}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {p.tech.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/55">{t}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}

export function ObWork() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const count = useRef<HTMLSpanElement>(null)
  const swipe = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current
      if (!el) return
      const dist = () => Math.max(0, el.scrollWidth - window.innerWidth + 120)
      gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${dist() * 1.1}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`
            if (count.current) count.current.textContent = String(Math.min(projects.length, Math.floor(self.progress * projects.length) + 1)).padStart(2, '0')
          },
        },
      })
    })
    return () => mm.revert()
  }, [])

  // Mobile: track the card nearest the centre of the swipe rail.
  useEffect(() => {
    const rail = swipe.current
    if (!rail) return
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { root: rail, threshold: 0.6 },
    )
    rail.querySelectorAll('[data-i]').forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section id="work" ref={root} className="relative overflow-hidden py-24 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div className="mx-auto mb-10 flex w-full max-w-[1500px] items-end justify-between px-5 md:mb-10 md:px-10">
        <div>
          <p className="ob-label mb-4">Selected work</p>
          <h2 className="font-display text-[clamp(3rem,7.5vw,7.5rem)] leading-[0.9] text-[#f6efe0]">Built. Shipped. <span className="ob-gold italic">In use.</span></h2>
        </div>
        <p className="ob-label hidden tnum md:block"><span ref={count}>01</span> / {String(projects.length).padStart(2, '0')}</p>
      </div>

      {/* desktop: pinned horizontal */}
      <div ref={track} className="hidden gap-8 px-10 will-change-transform md:flex md:h-[56vh] md:pl-[max(2.5rem,calc((100vw-1500px)/2+2.5rem))]">
        {projects.map((p, i) => (
          <div key={p.slug} className="h-full"><Card p={p} i={i} /></div>
        ))}
      </div>
      <div className="mx-auto mt-8 hidden h-px w-full max-w-[1420px] bg-white/10 md:block">
        <span ref={bar} className="block h-full origin-left bg-[#d9b877]" style={{ transform: 'scaleX(0)' }} />
      </div>

      {/* mobile: native swipe rail */}
      <div ref={swipe} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[9vw] pb-4 md:hidden">
        {projects.map((p, i) => (
          <div key={p.slug} data-i={i} className="flex"><Card p={p} i={i} active={active === i} /></div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 md:hidden" aria-hidden>
        {projects.map((p, i) => (
          <span key={p.slug} className={`h-1 rounded-full transition-all duration-500 ${active === i ? 'w-8 bg-[#d9b877]' : 'w-2 bg-white/20'}`} />
        ))}
      </div>
      <p className="ob-label mt-3 text-center md:hidden">Swipe →</p>
    </section>
  )
}
