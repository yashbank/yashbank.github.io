import { motion } from 'framer-motion'
import { SERVICES } from '@/assets/content'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-6 py-24 md:px-10 md:py-28 lg:py-32">
      <div className="container-site">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          subtitle="Focused engagements — from greenfield builds to rescuing tricky production issues."
        />

        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...fadeInUp.transition, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              className="glass-card group rounded-2xl p-8"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-lg font-bold text-accent">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400 transition duration-300 group-hover:text-gray-300">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
