import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { SELECTED_PROJECTS } from '@/data/projects'
import { publicAssetUrl } from '@/lib/publicAsset'
import { gsap } from '@/lib/gsap'

const projects = SELECTED_PROJECTS

function Card({ p, i }: { p: (typeof projects)[number]; i: number }) {
  return (
    <Link
      to={`/projects/${p.slug}`}
      className="luxe-card group relative flex h-full w-[84vw] shrink-0 flex-col overflow-hidden rounded-3xl p-5 sm:w-[70vw] md:w-[46vw] lg:w-[38vw] md:p-7"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/40">
        {p.imageSrc ? (
          <img
            src={publicAssetUrl(p.imageSrc)}
            alt={p.imageAlt ?? p.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.06]"
            style={{ objectPosition: p.previewImageObjectPosition ?? 'top' }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="luxe-label absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 backdrop-blur">
          {p.status === 'flagship' ? 'Flagship' : p.status === 'production' ? 'Production' : 'Project'}
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="luxe-label">{String(i + 1).padStart(2, '0')} · {p.category}</p>
          <h3 className="mt-3 font-display text-4xl font-light text-white md:text-5xl">{p.title}</h3>
        </div>
        <span className="mt-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9b877]/40 text-[#d9b877] transition group-hover:bg-[#d9b877] group-hover:text-black">→</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-400 md:text-base">{p.cardLead}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {p.tech.slice(0, 4).map((t) => (
          <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">{t}</span>
        ))}
      </div>
    </Link>
  )
}

export function SelectedWork() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const el = track.current
      if (!el) return
      const dist = () => el.scrollWidth - window.innerWidth + 96
      gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="work" ref={root} className="relative scroll-mt-0 overflow-hidden py-24 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div className="container-site mb-10 max-w-6xl md:mb-8">
        <p className="luxe-label mb-5 flex items-center gap-4"><span className="luxe-rule w-10" />Selected work</p>
        <h2 className="font-display text-5xl font-light text-white md:text-7xl">Built, shipped, <span className="italic text-gradient">in use.</span></h2>
      </div>
      <div ref={track} className="hscroll-track flex gap-6 px-5 md:h-[58vh] md:gap-10 md:px-[max(1.5rem,calc((100vw-72rem)/2))] max-md:flex-col max-md:items-center max-md:gap-8">
        {projects.map((p, i) => (
          <div key={p.slug} className="max-md:w-full max-md:[&>a]:w-full md:h-full">
            <Card p={p} i={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
