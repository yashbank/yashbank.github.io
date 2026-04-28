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
    <div className="mb-14 max-w-2xl md:mb-20">
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
        className="font-display text-4xl font-semibold tracking-[-0.025em] text-white md:text-5xl lg:text-[3.25rem] lg:leading-[1.12]"
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          initial={fadeInUp.initial}
          whileInView={fadeInUp.animate}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...t, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg leading-[1.72] text-gray-300 md:text-xl"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}
