import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { SITE } from '@/assets/content'
import { Mask } from '@/components/luxe/Reveal'
import { scrollToId } from '@/hooks/useLenis'
import { publicAssetUrl } from '@/lib/publicAsset'

const SHOTS = [
  { src: 'projects/plantpulse-dashboard.png', alt: 'PlantPulse factory dashboard', cls: 'right-[3%] top-[9%] w-[30vw] max-w-[520px] rotate-[2deg]', speed: -90 },
  { src: 'projects/codekraft-cover.png', alt: 'CodeKraft marketplace', cls: 'right-[3%] top-[47%] w-[19vw] max-w-[330px] -rotate-[4deg]', speed: -170 },
  { src: 'projects/tradeflow-cover.png', alt: 'TradeFlow invoicing platform', cls: 'right-[21%] top-[15%] w-[13vw] max-w-[230px] rotate-[6deg]', speed: -40 },
] as const

function Shot({ s, i, y }: { s: (typeof SHOTS)[number]; i: number; y: MotionValue<number> }) {
  return (
    <motion.figure style={{ y }} className={`absolute hidden bg-[#f1ebdf] p-1.5 shadow-[0_40px_80px_-30px_rgba(21,18,14,0.45)] md:block ${s.cls}`} initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.4, delay: 0.5 + i * 0.18, ease: [0.76, 0, 0.24, 1] }}>
      <img src={publicAssetUrl(s.src)} alt={s.alt} className="aspect-[16/10] w-full object-cover object-top" draggable={false} />
    </motion.figure>
  )
}

export function IvHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y0 = useTransform(scrollYProgress, [0, 1], [0, SHOTS[0].speed])
  const y1 = useTransform(scrollYProgress, [0, 1], [0, SHOTS[1].speed])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, SHOTS[2].speed])
  const ys = [y0, y1, y2]
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section id="hero" ref={ref} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[72px] text-[#15120e]">
      <div className="flex items-start justify-between px-5 pt-6 md:px-10">
        <p className="iv-label">Index — {new Date().getFullYear()}</p>
        <p className="iv-label text-right">AI engineer<br />Product builder</p>
      </div>

      {SHOTS.map((s, i) => <Shot key={s.src} s={s} i={i} y={ys[i]} />)}

      {/* rotating badge */}
      <div className="absolute right-5 top-[22%] hidden h-32 w-32 md:right-[40%] md:top-[26%] md:block" aria-hidden>
        <svg viewBox="0 0 200 200" className="h-full w-full animate-[iv-spin_22s_linear_infinite] motion-reduce:animate-none">
          <defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <text fontSize="14" letterSpacing="5" fill="#962e1b" fontFamily="var(--f-mono)"><textPath href="#circ">AVAILABLE FOR AI ROLES · 2026 ·</textPath></text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-3xl italic text-[#962e1b]">✦</span>
      </div>

      <motion.div style={{ y: nameY }} className="relative z-10 px-5 md:px-10">
        <h1 className="font-display text-[clamp(5.2rem,21vw,21rem)] font-light leading-[0.78] tracking-[-0.045em]">
          <Mask>Yash</Mask>
          <Mask delay={0.12} className="text-right md:text-left md:pl-[8vw]"><span className="italic text-[#962e1b]">Bankar</span></Mask>
        </h1>
      </motion.div>

      <div className="relative z-10 mt-10 grid gap-8 border-t border-[#15120e] px-5 py-6 md:grid-cols-12 md:px-10">
        <p className="max-w-md text-base leading-relaxed md:col-span-5 md:text-lg">
          An AI-native product engineer. {SITE.tagline}
        </p>
        <div className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
          <button type="button" className="iv-btn" onClick={() => scrollToId('work')}>See the work <span aria-hidden>↓</span></button>
          <button type="button" className="iv-btn-ghost" onClick={() => scrollToId('contact')}>Get in touch</button>
        </div>
      </div>

      {/* mobile collage */}
      <div className="no-scrollbar -mt-2 flex snap-x gap-4 overflow-x-auto px-5 pb-8 md:hidden">
        {SHOTS.map((s, i) => (
          <img key={s.src} src={publicAssetUrl(s.src)} alt={s.alt} loading="eager" className={`aspect-[16/10] w-[74vw] shrink-0 snap-center bg-[#f1ebdf] object-cover object-top p-1 shadow-[0_24px_50px_-24px_rgba(21,18,14,0.5)] ${i % 2 ? '-rotate-2' : 'rotate-2'}`} />
        ))}
      </div>
    </section>
  )
}
