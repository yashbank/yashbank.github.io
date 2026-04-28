import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] w-full bg-white/[0.04]"
      aria-hidden
    >
      <div
        className="h-full w-full origin-left bg-gradient-to-r from-accent/95 via-violet-300/85 to-sky-400/75 opacity-90 will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
