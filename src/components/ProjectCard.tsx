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
        className={`glass-card relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] will-change-transform ${
          isProduction ? 'ring-1 ring-accent/15 shadow-glow' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative shrink-0 aspect-[16/10] overflow-hidden bg-surface-elevated">
          <LazyImage
            src={project.image}
            alt=""
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent opacity-95" />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
              isProduction
                ? 'border border-accent/35 bg-surface/85 text-accent'
                : 'border border-white/10 bg-surface/80 text-gray-400'
            }`}
          >
            {isProduction ? 'Live · Vercel' : 'Team build'}
          </span>
        </div>

        <div className="flex min-h-[280px] flex-1 flex-col p-6">
          <h3 className="shrink-0 font-display text-lg font-semibold leading-snug text-white sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-gray-400">
            {project.description}
          </p>

          <div className="mt-auto flex flex-col gap-4 border-t border-white/5 pt-5">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
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
                className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-accent to-teal-400 px-4 py-2.5 text-sm font-semibold text-surface shadow-glow transition duration-300 hover:scale-[1.02] hover:shadow-glow-lg"
              >
                Live
              </a>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:scale-[1.02] hover:border-accent/40 hover:text-accent"
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
