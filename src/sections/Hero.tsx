import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { SITE } from '@/assets/content'
import { Magnetic } from '@/components/luxe/Magnetic'
import { SplitText } from '@/components/luxe/SplitText'
import { scrollToId } from '@/hooks/useLenis'

const Hero3D = lazy(() => import('@/components/luxe/Hero3D').then((m) => ({ default: m.Hero3D })))

export function Hero({ ready }: { ready: boolean }) {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 md:items-center md:pb-0">
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/40" />

      <div className="container-site relative z-10 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.2, duration: 0.9 }}
          className="luxe-label flex items-center gap-4"
        >
          <span className="luxe-rule w-10" /> Portfolio · {new Date().getFullYear()}
        </motion.p>

        <h1 className="mt-6 font-display text-[clamp(4.25rem,10.5vw,9.5rem)] font-light leading-[0.92] tracking-tight text-white">
          <SplitText text="Yash" active={ready} delay={0.3} />
          <br />
          <SplitText text="Bankar" active={ready} delay={0.55} className="italic text-gradient" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 max-w-xl font-display text-2xl font-light italic leading-snug text-gray-200 md:text-3xl"
        >
          AI-native product engineer.
          <span className="mt-2 block font-body text-sm not-italic leading-relaxed text-gray-400 md:text-base">
            {SITE.tagline}
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.35, duration: 1 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <button type="button" className="btn-primary" onClick={() => scrollToId('work')}>
              View selected work
            </button>
          </Magnetic>
          <Magnetic>
            <button type="button" className="btn-ghost" onClick={() => scrollToId('contact')}>
              Start a conversation
            </button>
          </Magnetic>
        </motion.div>
      </div>

      <div className="luxe-label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span className="absolute inset-x-0 top-0 h-1/2 bg-[#d9b877]" animate={{ y: ['-100%', '200%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </div>
    </section>
  )
}
