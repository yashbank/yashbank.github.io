import { useRef } from 'react'
import { motion } from 'framer-motion'
import type { ProjectItem } from '@/assets/content'
import { LazyImage } from '@/components/LazyImage'
import { fadeInUp } from '@/lib/motion'

type Props = {
  project: ProjectItem
  index: number
}

export function ProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isProduction = project.tier === 'production'

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const cx = r.width / 2
    const cy = r.height / 2
    const maxTilt = 5
    const rx = ((y - cy) / cy) * -maxTilt
    const ry = ((x - cx) / cx) * maxTilt
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0) scale(1.015)`
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (el) el.style.transform = ''
  }

  return (
    <motion.article
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...fadeInUp.transition, delay: index * 0.06 }}
      className="group relative flex h-full min-h-0 w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`glass-card relative flex h-full w-full flex-col overflow-hidden rounded-2xl will-change-transform sm:rounded-[1.35rem] ${
          isProduction
            ? 'ring-1 ring-white/[0.08] shadow-glow shadow-[0_0_0_1px_rgba(159,143,255,0.08)_inset]'
            : 'ring-1 ring-white/[0.04]'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative shrink-0 aspect-[16/10] overflow-hidden bg-surface-elevated">
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-accent/[0.06] via-transparent to-indigo-500/[0.07] mix-blend-screen"
            aria-hidden
          />
          <LazyImage
            src={project.image}
            alt={project.imageAlt}
            width={1600}
            height={1000}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover object-top transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-surface via-surface/25 to-transparent opacity-[0.94]" />
          <span
            className={`absolute left-3 top-3 z-[3] rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md ${
              isProduction
                ? 'border border-accent/40 bg-surface/90 text-accent shadow-[0_0_22px_rgba(159,143,255,0.14)]'
                : 'border border-white/12 bg-surface/85 text-gray-300'
            }`}
          >
            {isProduction ? 'Live · Vercel' : 'Shipped / team'}
          </span>
        </div>

        <div className="flex min-h-[260px] flex-1 flex-col p-6 sm:p-7">
          <h3 className="shrink-0 font-display text-lg font-semibold leading-snug tracking-[-0.02em] text-white sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-gray-300">
            {project.description}
          </p>

          <div className="mt-auto flex flex-col gap-4 border-t border-white/[0.06] pt-5">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium tracking-wide text-gray-300/95"
                >
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-accent via-violet-400 to-sky-400 px-4 py-2.5 text-sm font-semibold text-surface shadow-glow-sm transition duration-300 hover:scale-[1.02] hover:shadow-glow-lg hover:brightness-[1.04]"
              >
                Live
              </a>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/95 backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-accent/35 hover:bg-white/[0.07] hover:text-accent"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
