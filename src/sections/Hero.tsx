import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { SITE } from '@/assets/content'
import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { HeroBackdrop } from '@/components/HeroBackdrop'
import { fadeInUp } from '@/lib/motion'

const TITLE = SITE.title

/** Full-screen hero: GSAP parallax + gradient type line + premium CTAs. */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const blobA = useRef<HTMLDivElement>(null)
  const blobB = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [typed, setTyped] = useState('')

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      const section = sectionRef.current
      if (!section) return

      gsap.to(blobA.current, {
        y: 140,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      })
      gsap.to(blobB.current, {
        y: -100,
        x: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        },
      })
      gsap.to(gridRef.current, {
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [] },
  )

  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setTyped(TITLE.slice(0, i))
      if (i >= TITLE.length) window.clearInterval(id)
    }, 55)
    return () => window.clearInterval(id)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="group/hero relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-24 pt-14 md:px-10 md:pb-32 md:pt-20"
    >
      <HeroBackdrop />
      <div
        ref={blobA}
        className="pointer-events-none absolute -left-32 top-1/4 z-[1] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-accent/14 via-violet-500/10 to-transparent blur-[140px]"
        aria-hidden
      />
      <div
        ref={blobB}
        className="pointer-events-none absolute -right-20 bottom-1/4 z-[1] h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-vermillion/10 via-fuchsia-500/8 to-indigo-600/10 blur-[130px]"
        aria-hidden
      />
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.18]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Hanko-inspired frame + vertical copy — decorative */}
      <div
        className="pointer-events-none absolute left-5 top-28 z-[3] h-8 w-8 rounded border border-vermillion/15 md:left-10 md:top-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-28 right-5 z-[3] hidden flex-col items-center gap-3 md:flex md:right-10"
        aria-hidden
      >
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-vermillion/30 to-transparent" />
        <p className="font-jp text-[10px] font-medium leading-[1.9] tracking-[0.5em] text-white/[0.09] [writing-mode:vertical-rl]">
          作品集
        </p>
      </div>

      <div className="container-site relative z-10 max-w-[68rem]">
        <AvailabilityBadge />

        <motion.h1
          initial={fadeInUp.initial}
          animate={fadeInUp.animate}
          transition={{ ...fadeInUp.transition, delay: 0.05 }}
          className="font-display mt-10 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">{SITE.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 min-h-[1.4em] text-2xl md:text-3xl"
        >
          <span className="text-gradient-accent">{typed}</span>
          <span className="ml-1 inline-block h-8 w-0.5 animate-pulse bg-accent align-middle md:h-9" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-lg leading-[1.75] text-gray-400/95 md:text-xl"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button type="button" onClick={() => scrollTo('projects')} className="btn-primary">
            View work
          </button>
          <button type="button" onClick={() => scrollTo('contact')} className="btn-ghost">
            Hire me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-16 flex items-center gap-3 text-sm text-gray-500"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-accent/60" />
          Scroll to explore
        </motion.div>
      </div>
    </section>
  )
}
