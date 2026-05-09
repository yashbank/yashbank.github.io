import { motion } from 'framer-motion'
import { HERO } from '@/assets/content'

export function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="availability-pill glass inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] leading-snug text-gray-400"
    >
      <span className="relative flex h-2 w-2">
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_0_3px_rgba(159,143,255,0.12)]" />
      </span>
      {HERO.availabilityPill}
    </motion.div>
  )
}
