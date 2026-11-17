import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { SITE } from '@/assets/content'
import { Magnetic } from '@/components/luxe/Magnetic'
import { SplitText } from '@/components/luxe/SplitText'
import { scrollToId } from '@/hooks/useLenis'
import { useIstClock } from '@/hooks/useIstClock'

const Hero3D = lazy(() => import('@/components/luxe/Hero3D').then((m) => ({ default: m.Hero3D })))

export function ObHero({ ready }: { ready: boolean }) {
  const time = useIstClock()
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
      }}
    >
      <div className="ob-spot pointer-events-none absolute inset-0" />
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08080a]/30 via-transparent to-[#08080a]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 md:px-10">
        <motion.p initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ delay: 0.3, duration: 1 }} className="ob-label mb-6">
          Portfolio — {new Date().getFullYear()}
        </motion.p>
        <h1 className="font-display text-[clamp(4.6rem,16.5vw,17rem)] font-normal leading-[0.82] tracking-[-0.03em] text-[#f6efe0]">
          <SplitText text="Yash" active={ready} delay={0.35} />
          <br />
          <SplitText text="Bankar" active={ready} delay={0.6} className="ob-gold italic" />
        </h1>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 1.3, duration: 1.1 }} className="mt-10 grid gap-10 border-t border-white/10 pb-8 pt-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-white/70 md:col-span-6 md:text-xl">
            AI-native product engineer. <span className="text-white/45">{SITE.tagline}</span>
          </p>
          <div className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end">
            <Magnetic><button type="button" className="ob-btn" onClick={() => scrollToId('work')}>Selected work <span aria-hidden>↓</span></button></Magnetic>
            <Magnetic><button type="button" className="ob-btn-ghost" onClick={() => scrollToId('contact')}>Contact</button></Magnetic>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-y-4 border-t border-white/10 py-5 text-[11px] md:grid-cols-4">
          <p className="ob-label !text-white/45">Based in <span className="block pt-1 text-white/85">{SITE.location}</span></p>
          <p className="ob-label !text-white/45">Local time <span className="block pt-1 tnum text-white/85">{time} IST</span></p>
          <p className="ob-label !text-white/45">Focus <span className="block pt-1 text-white/85">AI · Product · Automation</span></p>
          <p className="ob-label !text-white/45">Studio <span className="block pt-1 text-white/85">Crestline Technologies</span></p>
        </div>
      </div>
    </section>
  )
}
