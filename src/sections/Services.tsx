import { motion } from 'framer-motion'
import { SERVICES } from '@/assets/content'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function Services() {
  return (
    <section
      id="services"
      className="group/section relative scroll-mt-20 overflow-hidden py-24 sm:py-28 md:py-36 lg:py-40"
    >
      <SectionBackdrop />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="Services"
          title="Outcomes, not ticket buckets"
          subtitle="Engagements framed around what your business needs live in the browser — whether that is revenue, operations, or a validated MVP."
        />

        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={fadeInUp.initial}
              whileInView={fadeInUp.animate}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...fadeInUp.transition, delay: i * 0.08 }}
              className="glass-card group flex h-full flex-col rounded-2xl p-7 sm:p-8"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-sm font-bold text-accent">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-lg font-semibold leading-snug text-white">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-300 transition duration-300 group-hover:text-gray-100">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
