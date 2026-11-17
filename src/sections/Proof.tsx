import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { n: 74, label: 'Data models in PlantPulse' },
  { n: 107, label: 'Pages shipped in one MIS' },
  { n: 540, suffix: '+', label: 'Test files guarding it' },
  { n: 8, label: 'Role-based access levels' },
]

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const dur = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 1800
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
  return <span ref={ref}>{v}{suffix}</span>
}

export function Proof() {
  return (
    <section id="proof" className="container-site max-w-6xl scroll-mt-20 py-24 md:py-40">
      <p className="luxe-label mb-5 flex items-center gap-4"><span className="luxe-rule w-10" />By the numbers</p>
      <h2 className="max-w-3xl font-display text-4xl font-light text-white md:text-6xl">
        Scale you can <span className="italic text-gradient">verify</span> in the code.
      </h2>
      <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[#d9b877]/15 bg-[#d9b877]/10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0b0b0e] p-6 md:p-10">
            <p className="font-display text-5xl font-light text-gradient md:text-7xl"><Count to={s.n} suffix={s.suffix} /></p>
            <p className="mt-3 text-xs leading-relaxed text-gray-400 md:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
