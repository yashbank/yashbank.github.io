import { motion } from 'framer-motion'
import { WHY_HIRE } from '@/assets/content'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function WhyHire() {
  return (
    <section id="why-hire" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-28 lg:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Partnership"
          title="Why hire me"
          subtitle="Traits teams mention after we work together — not buzzwords, just how I operate."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {WHY_HIRE.map((point, i) => (
            <motion.div
              key={point.title}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ ...fadeInUp.transition, delay: i * 0.06 }}
              className="glass-card rounded-2xl border border-white/[0.07] p-8"
            >
              <h3 className="font-display text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-400">{point.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
