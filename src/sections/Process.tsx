import { motion } from 'framer-motion'
import { PROCESS } from '@/assets/content'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function Process() {
  return (
    <section
      id="process"
      className="group/section relative scroll-mt-20 overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40"
    >
      <SectionBackdrop />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Process"
          title="How we work together"
          subtitle="Direct communication, scoped milestones, and delivery you can show to leadership or investors without apology."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {PROCESS.map((point, i) => (
            <motion.div
              key={point.title}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ...fadeInUp.transition, delay: i * 0.06 }}
              className="glass-card rounded-2xl p-8 transition duration-200 ease-out hover:border-white/[0.11]"
            >
              <h3 className="font-display text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-300">{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
