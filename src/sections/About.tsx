import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { ABOUT } from '@/assets/content'
import { SITE_IMAGES } from '@/assets/siteImages'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    const glow = glowRef.current
    if (!section || !glow) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glow,
        { scale: 0.85, opacity: 0.4 },
        {
          scale: 1.05,
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        },
      )
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="group/section relative scroll-mt-20 overflow-hidden px-6 py-28 md:px-10 md:py-36 lg:py-40"
    >
      <SectionBackdrop
        desktop={SITE_IMAGES.about.desktop}
        mobile={SITE_IMAGES.about.mobile}
        imageOpacity={0.14}
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/12 via-violet-500/8 to-vermillion/[0.06] blur-[100px]"
        aria-hidden
      />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="About"
          title="Code with clarity. Design with intent."
          subtitle="I partner with teams who want velocity without sacrificing quality."
        />
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {ABOUT.paragraphs.map((p, i) => (
            <motion.p
              key={p}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...fadeInUp.transition, delay: i * 0.12 }}
              className="text-lg leading-relaxed text-gray-400"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
