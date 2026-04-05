import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] w-full bg-white/[0.04]"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-accent/90 via-teal-300/80 to-cyan-400/70 opacity-90 will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
