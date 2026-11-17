import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { SITE, EXPERIENCE, SERVICES, PROCESS } from '@/assets/content'
import { CountUp } from '@/components/luxe/CountUp'
import { Mask, Reveal } from '@/components/luxe/Reveal'
import { useIstClock } from '@/hooks/useIstClock'
import { scrollToId } from '@/hooks/useLenis'

function Hl({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const on = useInView(ref, { once: true, margin: '-15% 0px' })
  return <span ref={ref} className={`iv-hl ${on ? 'in' : ''}`}>{children}</span>
}

export function IvStatement() {
  return (
    <section className="border-y border-[#15120e] px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
        <p className="iv-label md:col-span-3">(About)</p>
        <Reveal className="md:col-span-9">
          <p className="font-display text-[clamp(2rem,4.8vw,4.6rem)] font-light leading-[1.08] tracking-[-0.02em]">
            I build <Hl>complete products</Hl>, not demos. Factory floors that run on my software, a marketplace that moves <Hl>real money</Hl>, and AI workflows that stay under <Hl>human control</Hl> — designed and engineered by one pair of hands.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

const STATS = [
  { n: 74, label: 'Data models in a single factory platform' },
  { n: 107, label: 'Production screens, one codebase' },
  { n: 540, suffix: '+', label: 'Test files guarding every change' },
  { n: 8, label: 'Role-based access levels' },
]

export function IvProof() {
  return (
    <section id="proof" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <p className="iv-label mb-10">(Numbers) — verifiable in the code</p>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-t border-[#15120e] pb-10 pr-4 pt-5">
              <p className="font-display text-[clamp(4rem,11vw,11rem)] font-light italic leading-[0.85] tracking-[-0.05em] text-[#15120e]">
                <CountUp to={s.n} suffix={s.suffix} />
              </p>
              <p className="mt-4 max-w-[15rem] text-sm leading-relaxed opacity-70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IvCraft() {
  return (
    <section id="services" className="scroll-mt-16 border-t border-[#15120e] px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-14 font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.88] tracking-[-0.035em]">
          <Mask>What I</Mask>
          <Mask delay={0.1}><span className="italic text-[#962e1b]">make</span></Mask>
        </h2>
        <div className="grid border-l border-t border-[#15120e] md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="iv-ink-hover group border-b border-r border-[#15120e] p-7 md:p-12">
              <p className="font-mono text-xs opacity-60">({String(i + 1).padStart(2, '0')})</p>
              <h3 className="mt-14 font-display text-[clamp(2rem,3.6vw,3.6rem)] font-light leading-[1] tracking-[-0.02em] md:mt-24">{s.title}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-70">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="border-t border-[#15120e] pt-4">
              <p className="font-display text-xl italic text-[#962e1b]">{p.title}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function IvExperience() {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-[#15120e] px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-14 font-display text-[clamp(3rem,8vw,8rem)] font-light leading-[0.88] tracking-[-0.035em]">
          <Mask>The</Mask>
          <Mask delay={0.1}><span className="italic text-[#962e1b]">path</span></Mask>
        </h2>
        {EXPERIENCE.map((e) => (
          <div key={e.company} className="iv-ink-hover grid gap-3 border-t border-[#15120e] px-1 py-8 last:border-b md:grid-cols-12 md:gap-8 md:px-4 md:py-10">
            <p className="iv-label !opacity-100 md:col-span-3">{e.label}</p>
            <div className="md:col-span-4">
              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.6rem)] font-light leading-tight">{e.role}</h3>
              <p className="mt-1 text-[#962e1b]">{e.company}</p>
            </div>
            <p className="text-[15px] leading-relaxed opacity-75 md:col-span-5">{e.summary}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function IvContact() {
  const time = useIstClock()
  const row = Array.from({ length: 8 }, () => 'Let’s work together ✦')
  return (
    <section id="contact" className="bg-[#15120e] text-[#f1ebdf]">
      <div className="overflow-hidden border-b border-[#f1ebdf]/20 py-5" aria-hidden>
        <div className="flex w-max animate-[iv-tick_40s_linear_infinite] gap-10 whitespace-nowrap font-display text-3xl italic md:text-5xl motion-reduce:animate-none">
          {[...row, ...row].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-24 md:px-10 md:pt-40">
        <p className="font-mono text-xs uppercase tracking-[0.1em] opacity-60">(Contact)</p>
        <a href={`mailto:${SITE.email}`} className="iv-ul mt-6 block break-words font-display text-[clamp(2.2rem,7.4vw,8.4rem)] font-light italic leading-[0.95] tracking-[-0.03em]">
          {SITE.email}
        </a>
        <div className="mt-14 flex flex-wrap gap-x-10 gap-y-3 text-lg">
          <a href={SITE.social.linkedin} target="_blank" rel="noreferrer" className="iv-ul">LinkedIn ↗</a>
          <a href={SITE.social.github} target="_blank" rel="noreferrer" className="iv-ul">GitHub ↗</a>
          <a href={SITE.whatsappLink} target="_blank" rel="noreferrer" className="iv-ul">WhatsApp ↗</a>
        </div>
        <div className="mt-28 flex flex-wrap items-center justify-between gap-4 border-t border-[#f1ebdf]/20 pt-6 font-mono text-xs uppercase tracking-[0.08em] opacity-70">
          <p>© {new Date().getFullYear()} Yash Bankar · {SITE.location} · <span className="tnum">{time}</span> IST</p>
          <button type="button" onClick={() => scrollToId('hero')}>Back to top ↑</button>
          <Link to="/projects/plantpulse" className="hidden md:inline">Latest: PlantPulse →</Link>
        </div>
      </div>
    </section>
  )
}
