import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { HERO } from '@/assets/content'
import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { HeroBackdrop } from '@/components/HeroBackdrop'
import { HeroFocal } from '@/components/HeroFocal'
import { fadeInUp } from '@/lib/motion'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const ambientRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const heroFocalRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger)
      const section = sectionRef.current
      if (!section) return

      const st = { trigger: section, start: 'top top', end: 'bottom top', scrub: 1.05 }

      gsap.to(ambientRef.current, {
        y: 96,
        ease: 'none',
        scrollTrigger: st,
      })
      gsap.to(gridRef.current, {
        opacity: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '55% top',
          scrub: true,
        },
      })

      const backdropImg = section.querySelector('.hero-backdrop-photo')
      if (backdropImg) {
        gsap.fromTo(
          backdropImg,
          { y: 0, scale: 1.02 },
          {
            y: 44,
            scale: 1.04,
            transformOrigin: '50% 22%',
            ease: 'none',
            scrollTrigger: st,
          },
        )
      }

      if (heroCopyRef.current) {
        gsap.to(heroCopyRef.current, {
          y: 32,
          ease: 'none',
          scrollTrigger: st,
        })
      }
      if (heroFocalRef.current) {
        gsap.to(heroFocalRef.current, {
          y: -36,
          ease: 'none',
          scrollTrigger: st,
        })
      }
    },
    { scope: sectionRef, dependencies: [] },
  )

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="group/hero relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-28 pt-12 sm:pb-24 sm:pt-14 md:px-10 md:pb-32 md:pt-20"
    >
      <HeroBackdrop />
      <div
        ref={ambientRef}
        className="pointer-events-none absolute left-1/2 top-[38%] z-[1] h-[min(46vw,400px)] w-[min(84vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/[0.028] via-violet-600/[0.018] to-sky-500/[0.01] blur-[88px]"
        aria-hidden
      />
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.045]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 70% 56% at 48% 40%, black 14%, transparent 72%)',
        }}
        aria-hidden
      />

      <div className="container-site relative z-10 max-w-[72rem]">
        <AvailabilityBadge />

        <div className="mt-10 grid items-center gap-12 sm:mt-11 sm:gap-14 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          <div ref={heroCopyRef} className="will-change-transform lg:col-span-7">
            <motion.h1
              initial={fadeInUp.initial}
              animate={fadeInUp.animate}
              transition={{ ...fadeInUp.transition, delay: 0.06 }}
              className="hero-headline font-display max-w-[42rem] text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-[2.65rem] md:text-[3rem] lg:text-[3.15rem]"
            >
              {HERO.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="hero-subhead mt-6 max-w-xl text-base leading-[1.72] text-gray-400 md:mt-7 md:text-lg md:leading-[1.75]"
            >
              {HERO.subhead}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="hero-trust mt-7 max-w-2xl border-l border-accent/30 pl-4 text-[13px] leading-relaxed text-gray-500 md:mt-8 md:pl-5 md:text-sm"
            >
              {HERO.trustLine}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="btn-primary focus-ring min-h-[48px] min-w-[11.5rem] px-9 py-3.5 text-[0.9375rem] sm:min-w-[12.5rem]"
              >
                View selected work
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="btn-ghost focus-ring min-h-[48px] border-white/[0.1] px-8 py-3.5 text-[0.9375rem] font-semibold transition duration-200 ease-out"
              >
                Start a project
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.55 }}
              className="hero-footnote mt-12 flex items-center gap-3 text-[13px] text-gray-500 sm:mt-14"
            >
              <span className="h-px w-9 bg-gradient-to-r from-transparent to-accent/45 sm:w-10" />
              Selected work below
            </motion.div>
          </div>

          <motion.div
            ref={heroFocalRef}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-md:pt-1 will-change-transform lg:col-span-5 lg:justify-self-end"
          >
            <HeroFocal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
