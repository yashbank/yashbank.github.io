import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mask } from '@/components/luxe/Reveal'
import { SELECTED_PROJECTS, type PortfolioProject } from '@/data/projects'
import { publicAssetUrl } from '@/lib/publicAsset'

const projects = SELECTED_PROJECTS

/** Mobile: cards stack and shrink as the next one slides over. */
function StackCard({ p, i }: { p: PortfolioProject; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.35])
  return (
    <div ref={ref} className="h-[88svh]">
      <motion.div style={{ scale, top: 84 + i * 10 }} className="sticky origin-top">
        <Link to={`/projects/${p.slug}`} className="relative block overflow-hidden border border-[#15120e] bg-[#f1ebdf] p-3">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#15120e]/5">
            {p.imageSrc ? <img src={publicAssetUrl(p.imageSrc)} alt={p.imageAlt ?? p.title} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: p.previewImageObjectPosition ?? 'top' }} /> : null}
          </div>
          <div className="flex items-start justify-between gap-4 px-1 pb-2 pt-4">
            <div>
              <p className="iv-label">{String(i + 1).padStart(2, '0')} — {p.category}</p>
              <h3 className="mt-2 font-display text-[2.6rem] font-light leading-[0.95]">{p.title}</h3>
            </div>
            <span className="mt-1 text-2xl text-[#962e1b]">↗</span>
          </div>
          <p className="px-1 pb-1 text-sm leading-relaxed opacity-70">{p.cardLead}</p>
          <motion.span style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#15120e]" />
        </Link>
      </motion.div>
    </div>
  )
}

export function IvWork() {
  const [hover, setHover] = useState<PortfolioProject | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 160, damping: 20 })
  const sy = useSpring(my, { stiffness: 160, damping: 20 })

  return (
    <section id="work" className="scroll-mt-16 px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between border-b border-[#15120e] pb-6 md:mb-16">
          <h2 className="font-display text-[clamp(3.2rem,9vw,9rem)] font-light leading-[0.85] tracking-[-0.035em]">
            <Mask>Selected</Mask>
            <Mask delay={0.1}><span className="italic text-[#962e1b]">work</span></Mask>
          </h2>
          <p className="iv-label pb-2">({String(projects.length).padStart(2, '0')})</p>
        </div>

        {/* desktop index list with cursor-following preview */}
        <div className="hidden md:block" onPointerMove={(e) => { mx.set(e.clientX); my.set(e.clientY) }} onPointerLeave={() => setHover(null)}>
          {projects.map((p, i) => (
            <Link key={p.slug} to={`/projects/${p.slug}`} onPointerEnter={() => setHover(p)} className="iv-ink-hover grid grid-cols-[4rem_1fr_16rem_12rem] items-baseline gap-6 border-b border-[#15120e] px-3 py-7 lg:py-9">
              <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-[clamp(2.4rem,4.6vw,5.2rem)] font-light leading-none tracking-[-0.03em]">{p.title}</span>
              <span className="iv-label !opacity-100">{p.category}</span>
              <span className="text-right font-mono text-xs opacity-70">{p.tech.slice(0, 2).join(' · ')}</span>
            </Link>
          ))}
          <AnimatePresence>
            {hover?.imageSrc ? (
              <motion.div key={hover.slug} style={{ x: sx, y: sy }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} transition={{ duration: 0.35 }} className="pointer-events-none fixed left-0 top-0 z-40 -ml-[210px] -mt-[140px] h-[280px] w-[420px] overflow-hidden border-[6px] border-[#f1ebdf] shadow-[0_40px_80px_-30px_rgba(21,18,14,0.6)]">
                <img src={publicAssetUrl(hover.imageSrc)} alt="" className="h-full w-full object-cover object-top" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* mobile sticky stack */}
        <div className="md:hidden">
          {projects.map((p, i) => <StackCard key={p.slug} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
