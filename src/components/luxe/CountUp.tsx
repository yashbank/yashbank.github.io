import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1900
    const s = performance.now()
    let raf = 0
    const f = (t: number) => {
      const p = Math.min(1, (t - s) / dur)
      setV(Math.round((1 - Math.pow(1 - p, 4)) * to))
      if (p < 1) raf = requestAnimationFrame(f)
    }
    raf = requestAnimationFrame(f)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return (
    <span ref={ref} className="tnum">
      {v}
      {suffix}
    </span>
  )
}
