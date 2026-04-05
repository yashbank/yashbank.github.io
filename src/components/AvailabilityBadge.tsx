import { motion } from 'framer-motion'

export function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-gray-400"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      Available for freelance work
    </motion.div>
  )
}
