import { useLayoutEffect, useRef, useState } from 'react'
import { SITE, EXPERIENCE, SERVICES, PROCESS } from '@/assets/content'
import { CountUp } from '@/components/luxe/CountUp'
import { Magnetic } from '@/components/luxe/Magnetic'
import { Mask, Reveal } from '@/components/luxe/Reveal'
import { useIstClock } from '@/hooks/useIstClock'
import { scrollToId } from '@/hooks/useLenis'
import { gsap } from '@/lib/gsap'

const STATS = [
  { n: 74, label: 'Data models in a single factory platform' },
  { n: 107, label: 'Production screens, one codebase' },
  { n: 540, suffix: '+', label: 'Test files guarding every change' },
  { n: 8, label: 'Role-based access levels' },
]

export function ObProof() {
  return (
    <section id="proof" className="mx-auto max-w-[1500px] scroll-mt-20 px-5 py-28 md:px-10 md:py-44">
      <p className="ob-label mb-6">By the numbers</p>
      <h2 className="max-w-4xl font-display text-[clamp(2.6rem,6vw,6rem)] leading-[0.95] text-[#f6efe0]">
        <Mask>Scale you can</Mask>
        <Mask delay={0.1}><span className="ob-gold italic">verify in the code.</span></Mask>
      </h2>
      <div className="mt-16 grid grid-cols-2 border-l border-t border-white/10 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-b border-r border-white/10 p-5 md:p-9">
            <p className="font-display text-[clamp(3.4rem,8vw,8rem)] leading-none text-[#f6efe0]"><CountUp to={s.n} suffix={s.suffix} /></p>
            <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-white/50">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function ObCraft() {
  const [open, setOpen] = useState(0)
  return (
    <section id="services" className="mx-auto max-w-[1500px] scroll-mt-20 px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="ob-label mb-6">Craft</p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.95] text-[#f6efe0]">What I <span className="ob-gold italic">make</span></h2>
        </div>
        <div className="md:col-span-8">
          {SERVICES.map((s, i) => {
            const on = open === i
            return (
              <button key={s.title} type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="ob-row group block w-full border-t border-white/10 py-7 text-left last:border-b md:py-9">
                <span className="relative flex items-baseline justify-between gap-6">
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-[#d9b877]/70">0{i + 1}</span>
                    <span className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-none text-[#f6efe0] transition-transform duration-500 group-hover:translate-x-2">{s.title}</span>
                  </span>
                  <span className={`text-2xl text-[#d9b877] transition-transform duration-500 ${on ? 'rotate-45' : ''}`}>+</span>
                </span>
                <span className={`relative grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${on ? 'grid-rows-[1fr] pt-5 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <span className="overflow-hidden"><span className="block max-w-2xl pl-9 text-base leading-relaxed text-white/55 md:pl-12">{s.description}</span></span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function ObExperience() {
  const root = useRef<HTMLElement>(null)
  const line = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo(line.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'bottom 70%', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="experience" ref={root} className="mx-auto max-w-[1500px] scroll-mt-20 px-5 py-24 md:px-10 md:py-40">
      <p className="ob-label mb-6">Path</p>
      <h2 className="mb-16 max-w-3xl font-display text-[clamp(2.6rem,6vw,6rem)] leading-[0.95] text-[#f6efe0]">Where the work <span className="ob-gold italic">happened</span></h2>
      <div className="relative pl-8 md:pl-16">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10 md:left-3" />
        <div ref={line} className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-[#f6e7bd] to-[#b08433] md:left-3" />
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.company} className="relative pb-14 last:pb-0 md:pb-20">
            <span className="absolute -left-[37px] top-3 h-2.5 w-2.5 rounded-full bg-[#d9b877] shadow-[0_0_0_6px_rgba(217,184,119,0.15)] md:-left-[69px]" />
            <p className="ob-label">{e.label}</p>
            <h3 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.02] text-[#f6efe0]">{e.role}</h3>
            <p className="mt-1 text-lg text-[#d9b877]">{e.company}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/55">{e.summary}</p>
            <span className="sr-only">Entry {i + 1}</span>
          </Reveal>
        ))}
      </div>

      <div className="mt-28 grid border-l border-t border-white/10 md:grid-cols-4">
        {PROCESS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.07} className="border-b border-r border-white/10 p-6 md:p-8">
            <p className="font-mono text-xs text-[#d9b877]/70">0{i + 1}</p>
            <h4 className="mt-6 font-display text-2xl leading-tight text-[#f6efe0]">{p.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-white/50">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function ObContact() {
  const time = useIstClock()
  return (
    <section id="contact" className="relative scroll-mt-0 overflow-hidden border-t border-white/10 px-5 pb-8 pt-28 md:px-10 md:pt-44">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_50%_100%,rgba(217,184,119,0.16),transparent_65%)]" />
      <div className="relative mx-auto max-w-[1500px]">
        <p className="ob-label mb-8">Contact</p>
        <h2 className="font-display text-[clamp(3.2rem,10.5vw,11rem)] leading-[0.88] tracking-[-0.025em] text-[#f6efe0]">
          <Mask>Let’s build</Mask>
          <Mask delay={0.1}><span className="ob-gold italic">something exceptional.</span></Mask>
        </h2>
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Magnetic><a href={`mailto:${SITE.email}`} className="ob-btn">{SITE.email}</a></Magnetic>
          <Magnetic><a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="ob-btn-ghost">WhatsApp</a></Magnetic>
          <Magnetic><a href={SITE.social.linkedin} target="_blank" rel="noreferrer" className="ob-btn-ghost">LinkedIn</a></Magnetic>
          <Magnetic><a href={SITE.social.github} target="_blank" rel="noreferrer" className="ob-btn-ghost">GitHub</a></Magnetic>
        </div>
        <div className="mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="ob-label !text-white/40">© {new Date().getFullYear()} Yash Bankar · {SITE.location} · <span className="tnum">{time}</span> IST</p>
          <button type="button" onClick={() => scrollToId('hero')} className="ob-label hover:!text-white">Back to top ↑</button>
        </div>
      </div>
    </section>
  )
}
