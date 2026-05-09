import { motion } from 'framer-motion'
import { TECH_STACK_SECTION } from '@/assets/content'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { TechDock } from '@/components/TechDock'
import { fadeInUp } from '@/lib/motion'

export function TechStack() {
  return (
    <section
      id="stack"
      className="group/section relative scroll-mt-20 py-24 sm:py-28 md:py-36 lg:py-40"
    >
      <SectionBackdrop tone="stack" />
      <div className="tech-dock-top-hairline pointer-events-none absolute inset-x-0 top-0 z-[1] h-px w-full" aria-hidden />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow={TECH_STACK_SECTION.eyebrow}
          title={TECH_STACK_SECTION.title}
          subtitle={TECH_STACK_SECTION.subtitle}
        />
        <motion.div
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ ...fadeInUp.transition, delay: 0.08 }}
          className="relative z-10 mt-10 w-[100vw] max-w-[100vw] ml-[calc(50%-50vw)] md:mt-14"
        >
          <TechDock />
        </motion.div>
      </div>
    </section>
  )
}
