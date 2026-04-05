import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function SectionHeading({ eyebrow, title, subtitle }: Props) {
  const t = fadeInUp.transition

  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      {eyebrow ? (
        <motion.p
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...t, delay: 0 }}
          className="font-display mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent/80"
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <motion.h2
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ ...t, delay: 0.05 }}
        className="font-display text-4xl font-semibold tracking-[-0.02em] text-white/95 md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...t, delay: 0.1 }}
          className="mt-5 max-w-2xl text-lg leading-[1.65] text-gray-500"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}
