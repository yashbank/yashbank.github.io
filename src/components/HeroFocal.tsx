import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { HERO_FOCAL } from '@/assets/content'

const spring = { stiffness: 280, damping: 32, mass: 0.6 }

/**
 * Single hero focal: depth, glass, and restrained parallax — not scattered 3D props.
 */
export function HeroFocal() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smx = useSpring(mx, spring)
  const smy = useSpring(my, spring)
  const rotateX = useTransform(smy, [-140, 140], [5.2, -5.2])
  const rotateY = useTransform(smx, [-140, 140], [-6, 6])
  const glowX = useTransform(smx, [-160, 160], [18, 82])
  const glowY = useTransform(smy, [-160, 160], [20, 80])
  const spotlight = useMotionTemplate`radial-gradient(460px circle at ${glowX}% ${glowY}%, rgba(159,143,255,0.098), transparent 58%)`

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion) return
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set(e.clientX - (r.left + r.width / 2))
    my.set(e.clientY - (r.top + r.height / 2))
  }

  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[min(100%,420px)] select-none lg:mx-0"
      onMouseMove={reduceMotion ? undefined : onMove}
      onMouseLeave={reduceMotion ? undefined : onLeave}
    >
      <div
        className="pointer-events-none absolute -inset-5 rounded-[1.85rem] bg-gradient-to-br from-accent/[0.038] via-transparent to-sky-500/[0.022] blur-[1.2rem]"
        aria-hidden
      />
      <motion.div
        style={{ perspective: 1200 }}
        className="relative aspect-[4/5] w-full max-md:max-h-[min(340px,52vh)] md:aspect-[5/6]"
      >
        <motion.div
          style={
            reduceMotion
              ? { transformStyle: 'preserve-3d' as const }
              : { rotateX, rotateY, transformStyle: 'preserve-3d' as const }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.006 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          className="hero-focal-card relative flex h-full w-full flex-col overflow-hidden rounded-[1.65rem] border border-white/[0.09] bg-white/[0.036] p-6 shadow-[0_22px_64px_-36px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-[14px] supports-[backdrop-filter]:bg-white/[0.03] md:p-7"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{ background: spotlight }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.11]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              maskImage: 'radial-gradient(ellipse 88% 72% at 50% 32%, black 8%, transparent 75%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.055]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-5 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/22 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[38%] rounded-b-[inherit] bg-gradient-to-t from-white/[0.055] via-transparent to-transparent opacity-50 mix-blend-overlay"
            aria-hidden
          />

          <div className="relative z-[1] flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-accent/85">
                {HERO_FOCAL.label}
              </p>
              <p className="hero-focal-title mt-2.5 font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.02em] text-white md:text-lg">
                {HERO_FOCAL.title}
              </p>
              <p className="hero-focal-body mt-3 max-w-[17.5rem] text-[13px] leading-[1.62] text-gray-400 md:text-[13.5px]">
                {HERO_FOCAL.micro}
              </p>
            </div>
            <div
              className="hidden h-[3.25rem] w-[3.25rem] shrink-0 rounded-xl border border-white/[0.07] bg-gradient-to-br from-white/[0.06] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:flex sm:items-center sm:justify-center"
              style={{ transform: 'translateZ(20px)' }}
              aria-hidden
            >
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-accent/80">
                YB
              </span>
            </div>
          </div>

          <div
            className="relative z-[1] mt-6 flex min-h-0 flex-1 flex-col md:mt-7"
            style={{ transform: 'translateZ(8px)' }}
          >
            <div className="hero-focal-divider h-px w-full shrink-0 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
            <p className="hero-focal-proof mt-4 shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-500">
              {HERO_FOCAL.proof}
            </p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {HERO_FOCAL.chips.map((t) => (
                <span
                  key={t}
                  className="hero-focal-chip rounded-md border border-white/[0.07] bg-surface/35 px-2.5 py-1 text-[10px] font-medium tracking-wide text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
