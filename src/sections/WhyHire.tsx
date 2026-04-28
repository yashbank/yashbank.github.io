import { motion } from 'framer-motion'
import { WHY_HIRE } from '@/assets/content'
import { SITE_IMAGES } from '@/assets/siteImages'
import { SectionBackdrop } from '@/components/SectionBackdrop'
import { SectionHeading } from '@/components/SectionHeading'
import { fadeInUp } from '@/lib/motion'

export function WhyHire() {
  return (
    <section
      id="why-hire"
      className="group/section relative scroll-mt-20 overflow-hidden px-6 py-28 md:px-10 md:py-36 lg:py-40"
    >
      <SectionBackdrop
        desktop={SITE_IMAGES.whyHire.desktop}
        mobile={SITE_IMAGES.whyHire.mobile}
        imageOpacity={0.09}
      />
      <div className="container-site relative z-10">
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
              className="glass-card rounded-2xl border border-white/[0.07] p-8 transition duration-500 hover:-translate-y-0.5 hover:border-white/[0.1] hover:shadow-[0_20px_44px_-24px_rgba(0,0,0,0.45)]"
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
