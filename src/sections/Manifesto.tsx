import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const TEXT =
  'I build complete products, not demos. Factory floors that run on my software, a marketplace that moves real money, and AI workflows that stay under human control, all designed and engineered by one pair of hands.'

export function Manifesto() {
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.mw')
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(words, { opacity: 1 })
        return
      }
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.06, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 45%', scrub: true } },
      )
    }, root)
    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [])
  return (
    <section ref={root} className="container-site max-w-6xl py-28 md:py-44">
      <p className="luxe-label mb-8 flex items-center gap-4"><span className="luxe-rule w-10" />Philosophy</p>
      <p className="font-display text-[clamp(1.9rem,4.6vw,4rem)] font-light leading-[1.15] text-white">
        {TEXT.split(' ').map((w, i) => (
          <span key={i} className="mw inline-block pr-[0.28em]">{w}</span>
        ))}
      </p>
    </section>
  )
}
