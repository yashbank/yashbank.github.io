import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { EXPERIENCE, PROOF_INTRO } from '@/assets/content'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const line = lineRef.current
    const section = sectionRef.current
    if (!line || !section) return

    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 40%',
          scrub: 0.5,
        },
      },
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="group/section relative scroll-mt-20 overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40"
    >
      <SectionBackdrop />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Proof"
          title="Delivery you can underwrite"
          subtitle="Enterprise and regulated environments teach a specific habit: ship work that holds up in review — technical, design, and stakeholder."
        />

        <motion.p
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: '-40px' }}
          transition={fadeInUp.transition}
          className="mt-10 max-w-3xl text-lg leading-relaxed text-gray-400"
        >
          {PROOF_INTRO}
        </motion.p>

        <div className="relative z-10 mt-16">
          <div
            className="absolute left-[11px] top-0 z-0 hidden h-full w-px bg-white/10 md:block"
            aria-hidden
          />
          <div
            ref={lineRef}
            className="absolute left-[11px] top-0 z-0 hidden h-full w-px origin-top bg-gradient-to-b from-accent to-accent/20 md:block"
            aria-hidden
          />

          <ul className="space-y-12 md:space-y-16 md:pl-12">
            {EXPERIENCE.map((job, i) => (
              <motion.li
                key={`${job.company}-${job.label}`}
                initial={fadeInUp.initial}
                whileInView={fadeInUp.animate}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
                className="relative z-10"
              >
                <span className="absolute -left-[3px] top-2 z-[1] hidden h-3 w-3 rounded-full border-2 border-accent bg-surface md:block" />
                <div className="glass-card rounded-2xl p-6 transition duration-200 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">{job.label}</p>
                  <h3 className="font-display mt-2 text-xl font-semibold text-white md:text-2xl">{job.role}</h3>
                  <p className="mt-1 text-sm text-gray-400">{job.company}</p>
                  <p className="mt-4 leading-relaxed text-gray-300">{job.summary}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
