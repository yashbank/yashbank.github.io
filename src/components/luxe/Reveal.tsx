import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Fade + rise on enter viewport. */
export function Reveal({ children, delay = 0, y = 40, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Text that rises out of a mask. Observes the wrapper (a clipped child never reports as visible). */
export function Mask({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })
  return (
    <span ref={ref} className={`block overflow-hidden pb-[0.06em] -mb-[0.06em] ${className}`}>
      <motion.span className="block" initial={{ y: '108%' }} animate={{ y: inView ? '0%' : '108%' }} transition={{ duration: 1.15, delay, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  )
}
