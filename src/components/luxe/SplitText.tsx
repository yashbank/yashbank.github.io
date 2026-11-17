import { motion } from 'framer-motion'

type Props = {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'div'
  active?: boolean
}

/** Reveals text character by character with a masked rise. Keeps an aria-label for screen readers. */
export function SplitText({ text, className = '', delay = 0, active = true }: Props) {
  const words = text.split(' ')
  let i = 0
  return (
    <span className={className} aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden>
          {w.split('').map((c) => {
            const idx = i++
            return (
              <span key={idx} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%', rotate: 6 }}
                  animate={active ? { y: '0%', rotate: 0 } : undefined}
                  transition={{ duration: 1.05, delay: delay + idx * 0.035, ease: [0.16, 1, 0.3, 1] }}
                >
                  {c}
                </motion.span>
              </span>
            )
          })}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
