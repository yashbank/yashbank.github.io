import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { DOCK_TOOLS, type StackTool, type StackToolId } from '@/data/stackRows'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

function markColor(hex: string): string {
  return `color-mix(in srgb, ${hex} 78%, #a1a1aa 22%)`
}

const BRAND_ICONS: Partial<Record<StackToolId, IconType>> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  framer: SiFramer,
  node: SiNodedotjs,
  express: SiExpress,
  postman: SiPostman,
  supabase: SiSupabase,
  firebase: SiFirebase,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  docker: SiDocker,
  github: SiGithub,
  vercel: SiVercel,
  gcp: SiGooglecloud,
  openai: SiOpenai,
  git: SiGit,
  figma: SiFigma,
}

const OFFSCREEN = -8000

function DockGlyph({ tool }: { tool: StackTool }) {
  if (tool.id === 'gsap') {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0c0c0f] text-[11px] font-bold tracking-tight md:h-9 md:w-9"
        style={{ color: markColor('#88CE02') }}
        aria-hidden
      >
        G
      </span>
    )
  }
  if (tool.id === 'cursor') {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-[#0e0e12] text-[12px] font-semibold md:h-9 md:w-9"
        style={{ color: markColor(tool.color) }}
        aria-hidden
      >
        ⌘
      </span>
    )
  }
  const Icon = BRAND_ICONS[tool.id]
  if (!Icon) return null
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center md:h-9 md:w-9" aria-hidden>
      <Icon className="h-[1.35rem] w-[1.35rem] md:h-[1.45rem] md:w-[1.45rem]" style={{ color: markColor(tool.color) }} />
    </span>
  )
}

function DockItem({
  tool,
  centerX,
  mouseX,
  magnify,
  itemRef,
}: {
  tool: StackTool
  centerX: number
  mouseX: MotionValue<number>
  magnify: boolean
  itemRef: (el: HTMLDivElement | null) => void
}) {
  const scale = useTransform(mouseX, (x) => {
    if (!magnify || x < -5000) return 1
    const d = Math.abs(x - centerX)
    const sigma = 92
    return 1 + 0.46 * Math.exp(-((d / sigma) * (d / sigma)) * 0.65)
  })
  const lift = useTransform(scale, (s) => -Math.max(0, s - 1) * 12)
  const z = useTransform(scale, (s) => Math.max(0, Math.min(28, Math.round((s - 1) * 52))))

  return (
    <motion.div
      ref={itemRef}
      style={magnify ? { scale, y: lift, zIndex: z } : undefined}
      className="tech-dock-item group/item flex shrink-0 flex-col items-center justify-end gap-1.5 pb-0.5 md:gap-2"
    >
      <div className="tech-dock-icon-surface flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.04] px-2.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,box-shadow,background-color] duration-200 ease-out group-hover/item:border-white/[0.1] group-hover/item:bg-white/[0.055] md:px-3 md:py-2.5">
        <DockGlyph tool={tool} />
      </div>
      <span className="tech-dock-label max-w-[4.5rem] truncate text-center text-[10px] font-medium tracking-tight text-gray-400 md:max-w-[5.5rem] md:text-[11px]">
        {tool.label}
      </span>
    </motion.div>
  )
}

/**
 * Dock-style tool strip: spring-smoothed cursor proximity (dock-like magnification), no belts.
 */
export function TechDock() {
  const stripRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduced = usePrefersReducedMotion()
  const [centers, setCenters] = useState<number[]>([])
  const [finePointer, setFinePointer] = useState(false)

  const pointerX = useMotionValue(OFFSCREEN)
  const mouseX = useSpring(pointerX, { stiffness: 420, damping: 34, mass: 0.45 })

  const magnify = finePointer && !reduced

  useLayoutEffect(() => {
    if (reduced) pointerX.set(OFFSCREEN)
  }, [reduced, pointerX])

  useLayoutEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFinePointer(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const measureCenters = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return
    const sr = strip.getBoundingClientRect()
    const next = DOCK_TOOLS.map((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return 0
      const r = el.getBoundingClientRect()
      return r.left + r.width / 2 - sr.left
    })
    setCenters(next)
  }, [])

  useLayoutEffect(() => {
    measureCenters()
    window.addEventListener('resize', measureCenters)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureCenters) : null
    if (ro && stripRef.current) ro.observe(stripRef.current)
    return () => {
      window.removeEventListener('resize', measureCenters)
      ro?.disconnect()
    }
  }, [measureCenters])

  const setLocalX = (clientX: number | null) => {
    const strip = stripRef.current
    if (!strip || clientX == null) {
      pointerX.set(OFFSCREEN)
      return
    }
    const sr = strip.getBoundingClientRect()
    pointerX.set(clientX - sr.left)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!magnify) return
    if (e.pointerType === 'mouse') setLocalX(e.clientX)
  }

  const onPointerLeave = () => {
    pointerX.set(OFFSCREEN)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!magnify) return
    const t = e.touches[0]
    if (t) setLocalX(t.clientX)
  }

  return (
    <div className="relative w-full">
      <div
        ref={stripRef}
        className="tech-dock-strip no-scrollbar mx-auto flex max-w-[100vw] items-end justify-center gap-1.5 overflow-x-auto px-4 pb-1 pt-2 sm:gap-2 sm:px-6 md:overflow-visible md:px-10 lg:px-14"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onTouchMove={onTouchMove}
        onTouchEnd={onPointerLeave}
      >
        {DOCK_TOOLS.map((tool, i) => (
          <DockItem
            key={tool.id}
            tool={tool}
            centerX={centers[i] ?? 0}
            mouseX={mouseX}
            magnify={magnify}
            itemRef={(el) => {
              itemRefs.current[i] = el
            }}
          />
        ))}
      </div>
    </div>
  )
}
